"use client";

import React from "react";
import dynamic from "next/dynamic";

interface MarkerData {
  id: string;
  position: [number, number];
  title: string;
  type: "parking" | "ev" | "cng" | "mechanic";
  status?: "available" | "occupied";
  price?: number;
  info?: string;
}

interface MapProps {
  center: [number, number];
  zoom: number;
  markers: MarkerData[];
  onMarkerClick?: (marker: MarkerData) => void;
}

// Dynamically import LeafletMap with SSR disabled
const MapComponent = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl animate-pulse">
      <div className="text-slate-400 dark:text-slate-500 font-medium">Loading Interactive Maps...</div>
      <div className="text-xs text-slate-400/80 dark:text-slate-500/80 mt-1">Free OpenStreetMap & Leaflet Integration</div>
    </div>
  ),
});

export default function Map({ center, zoom, markers, onMarkerClick }: MapProps) {
  return <MapComponent center={center} zoom={zoom} markers={markers} onMarkerClick={onMarkerClick} />;
}
