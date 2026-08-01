"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";

interface MarkerData {
  id: string;
  position: [number, number];
  title: string;
  type: "parking" | "ev" | "cng" | "mechanic" | "user";
  status?: "available" | "occupied";
  price?: number;
  info?: string;
}

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  markers: MarkerData[];
  onMarkerClick?: (marker: MarkerData) => void;
}

export default function LeafletMap({ center, zoom, markers, onMarkerClick }: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      }).setView(center, zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.setView(center, zoom);
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Create marker icons based on type
    markers.forEach((item) => {
      let iconColor = "bg-blue-500";
      let statusDot = "";

      if (item.type === "parking") {
        iconColor = item.status === "available" ? "bg-emerald-500" : "bg-rose-500";
        statusDot = `<div class="absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white ${
          item.status === "available" ? "bg-emerald-400" : "bg-rose-400"
        } animate-ping"></div>`;
      } else if (item.type === "ev") {
        iconColor = "bg-indigo-500";
      } else if (item.type === "cng") {
        iconColor = "bg-amber-500";
      } else if (item.type === "mechanic") {
        iconColor = "bg-orange-500";
      } else if (item.type === "user") {
        iconColor = "bg-sky-500 ring-4 ring-sky-500/30";
      }

      // Create a premium custom HTML icon using Leaflet DivIcon
      const customIcon = L.divIcon({
        className: "custom-map-icon",
        html: `
          <div class="relative w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg border border-white dark:border-slate-800 ${iconColor} font-outfit text-xs font-semibold hover:scale-110 transition-transform">
            ${item.type === "parking" && item.price ? `₹${item.price}` : ""}
            ${item.type === "ev" ? "⚡" : ""}
            ${item.type === "cng" ? "⛽" : ""}
            ${item.type === "mechanic" ? "🔧" : ""}
            ${item.type === "user" ? "📍" : ""}
            ${statusDot}
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker(item.position, { icon: customIcon }).addTo(map);

      // Create Popup template
      const popupContent = `
        <div class="p-2 font-sans text-slate-800 dark:text-slate-100">
          <h4 class="font-semibold text-sm font-outfit text-slate-950 dark:text-white">${item.title}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${item.info || ""}</p>
          ${
            item.type === "parking"
              ? `
              <div class="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                <span class="text-xs font-semibold text-accent dark:text-accent-dark">₹${item.price}/hr</span>
                <span class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">${item.status}</span>
              </div>
            `
              : ""
          }
        </div>
      `;

      marker.bindPopup(popupContent);

      // Click callback
      if (onMarkerClick) {
        marker.on("click", () => {
          onMarkerClick(item);
        });
      }

      markersRef.current.push(marker);
    });

    // Cleanup on component unmount
    return () => {
      if (!markers.length) {
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
      }
    };
  }, [center, zoom, markers, onMarkerClick]);

  // Handle map instance removal on complete unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full min-h-[400px] rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-md overflow-hidden" />;
}
