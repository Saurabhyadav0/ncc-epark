"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  BatteryCharging, 
  Wrench, 
  MapPin, 
  Filter, 
  PhoneCall, 
  Activity, 
  Zap, 
  Flame 
} from "lucide-react";

interface ServiceMarker {
  id: string;
  position: [number, number];
  title: string;
  type: "ev" | "cng" | "mechanic";
  info: string;
  status: "Online" | "Offline" | "Occupied";
  details?: string;
  contact?: string;
}

const mockServices: ServiceMarker[] = [
  {
    id: "ser-1",
    position: [28.4065, 77.3195],
    title: "Tata Power EZ Charge Station",
    type: "ev",
    info: "Dual CCS2 60kW DC Fast Chargers",
    status: "Online",
    details: "Charging rate: ₹18/unit. Open 24/7.",
  },
  {
    id: "ser-2",
    position: [28.4140, 77.3160],
    title: "Ather Grid Fast Charger",
    type: "ev",
    info: "Fast charger for Ather scooters",
    status: "Occupied",
    details: "1 slot occupied, 1 slot free. Open 24/7.",
  },
  {
    id: "ser-3",
    position: [28.4010, 77.3210],
    title: "Adani Gas CNG Station Bata Chowk",
    type: "cng",
    info: "Public CNG Dispenser Station",
    status: "Online",
    details: "Avg wait time: 10 mins. 4 active nozzles.",
  },
  {
    id: "ser-4",
    position: [28.4110, 77.3090],
    title: "Verma Auto Repair & Towing",
    type: "mechanic",
    info: "Vehicle Breakdown & Roadside Help",
    status: "Online",
    details: "Specializes in engine tune-ups, tire repair, and electricals.",
    contact: "+91 98765 43210",
  },
  {
    id: "ser-5",
    position: [28.4040, 77.3110],
    title: "Haryana Gas CNG Pump Sec-12",
    type: "cng",
    info: "Govt Authorized Refueling Pump",
    status: "Online",
    details: "Avg wait time: 5 mins. Open 6 AM to 11 PM.",
  },
  {
    id: "ser-6",
    position: [28.4080, 77.3245],
    title: "Singh Car Electrical & Mechanics",
    type: "mechanic",
    info: "Quick Brake & Battery Jumpstarts",
    status: "Online",
    details: "Emergency battery repair shop. Jumpstart service available.",
    contact: "+91 99999 88888",
  },
];

export default function ServicesPortal() {
  const [filter, setFilter] = useState<"all" | "ev" | "cng" | "mechanic">("all");
  const [selectedService, setSelectedService] = useState<ServiceMarker | null>(null);

  const filteredServices = mockServices.filter((s) => {
    if (filter === "all") return true;
    return s.type === filter;
  });

  const handleMarkerClick = (marker: any) => {
    const service = mockServices.find((s) => s.id === marker.id);
    if (service) {
      setSelectedService(service);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Side: Services lists & filters */}
        <div className="w-full md:w-5/12 lg:w-4/12 p-6 flex flex-col space-y-6 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
          
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white">Vehicle Services Hub</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Locate nearby EV charging stations, CNG points, and emergency breakdown mechanics.
            </p>
          </div>

          {/* Filter options */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Filter className="h-4.5 w-4.5 text-slate-500" />
              <span>Filter Service Type</span>
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Button
                variant={filter === "all" ? "primary" : "outline"}
                size="sm"
                onClick={() => { setFilter("all"); setSelectedService(null); }}
              >
                All Ecosystems
              </Button>
              <Button
                variant={filter === "ev" ? "primary" : "outline"}
                size="sm"
                onClick={() => { setFilter("ev"); setSelectedService(null); }}
                className="space-x-1"
              >
                <Zap className="h-3 w-3 shrink-0 text-indigo-400" />
                <span>EV Charging</span>
              </Button>
              <Button
                variant={filter === "cng" ? "primary" : "outline"}
                size="sm"
                onClick={() => { setFilter("cng"); setSelectedService(null); }}
                className="space-x-1"
              >
                <Flame className="h-3 w-3 shrink-0 text-amber-400" />
                <span>CNG Station</span>
              </Button>
              <Button
                variant={filter === "mechanic" ? "primary" : "outline"}
                size="sm"
                onClick={() => { setFilter("mechanic"); setSelectedService(null); }}
                className="space-x-1"
              >
                <Wrench className="h-3 w-3 shrink-0 text-orange-400" />
                <span>Mechanics</span>
              </Button>
            </div>
          </div>

          {/* Services List / Details panel */}
          {selectedService ? (
            <Card className="border border-slate-200 dark:border-slate-800 animate-in fade-in-40">
              <CardHeader className="pb-3 flex flex-row justify-between items-start space-y-0">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant={selectedService.status === "Online" ? "success" : "warning"}>
                      {selectedService.status}
                    </Badge>
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">{selectedService.type}</span>
                  </div>
                  <CardTitle className="text-lg font-bold">{selectedService.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{selectedService.info}</p>
                <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">{selectedService.details}</p>

                {selectedService.contact && (
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Emergency Contact</div>
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-slate-900 dark:text-white">{selectedService.contact}</span>
                      <a href={`tel:${selectedService.contact}`} className="text-xs text-accent dark:text-accent-dark flex items-center space-x-1 hover:underline">
                        <PhoneCall className="h-3 w-3" />
                        <span>Call Shop</span>
                      </a>
                    </div>
                  </div>
                )}

                <Button
                  variant="secondary"
                  onClick={() => setSelectedService(null)}
                  className="w-full text-xs"
                >
                  Clear Selection
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3 max-h-[350px] md:max-h-none">
              {filteredServices.map((ser) => (
                <div
                  key={ser.id}
                  onClick={() => setSelectedService(ser)}
                  className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-100/55 dark:hover:bg-slate-900/70 cursor-pointer transition-colors space-y-2 flex items-start space-x-3"
                >
                  <div className={`p-2.5 rounded-lg mt-0.5 shrink-0 ${
                    ser.type === "ev" ? "bg-indigo-500/10 text-indigo-500" :
                    ser.type === "cng" ? "bg-amber-500/10 text-amber-500" :
                    "bg-orange-500/10 text-orange-500"
                  }`}>
                    {ser.type === "ev" ? <BatteryCharging className="h-5 w-5" /> :
                     ser.type === "cng" ? <Zap className="h-5 w-5" /> : // visual flare
                     <Wrench className="h-5 w-5" />}
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{ser.title}</h4>
                    <p className="text-xs text-slate-400 truncate">{ser.info}</p>
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="text-[10px] font-mono text-slate-400 capitalize">{ser.type}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-350 dark:bg-slate-750"></span>
                      <span className="text-[10px] text-slate-500">{ser.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick status feed */}
          <div className="text-[10px] text-slate-400 flex items-center space-x-2 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200/40 dark:border-slate-800/40 mt-auto">
            <Activity className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>Map auto-updates active grids every 5 minutes. Source: OpenStreetMap & epark API.</span>
          </div>

        </div>

        {/* Right Side: Maps Frame */}
        <div className="flex-1 min-h-[450px] md:min-h-0 relative">
          <Map
            center={[28.4089, 77.3178]} // Faridabad coordinates
            zoom={14}
            markers={filteredServices as any}
            onMarkerClick={handleMarkerClick}
          />
        </div>

      </main>

      <Footer />
    </div>
  );
}
