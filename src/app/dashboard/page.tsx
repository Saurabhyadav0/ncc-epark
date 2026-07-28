"use client";

import React from "react";
import Link from "next/link";
import { 
  Car, 
  MapPin, 
  PlusCircle, 
  BatteryCharging, 
  Wrench, 
  CreditCard, 
  ArrowRight,
  TrendingUp,
  Activity,
  History
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function Dashboard() {
  // Mock Stats
  const stats = [
    { label: "Active Booking", value: "1 Spot", desc: "Sec-14 Market, Faridabad", icon: Car, color: "text-blue-500" },
    { label: "Lifetime Bookings", value: "24", desc: "18 hrs total parked time", icon: History, color: "text-indigo-500" },
    { label: "P2P Earnings", value: "₹4,850", desc: "From your listed driveway", icon: TrendingUp, color: "text-emerald-500" },
    { label: "My Listed Spaces", value: "1 Active", desc: "Generating passive income", icon: MapPin, color: "text-amber-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10 space-y-10">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold font-outfit text-slate-900 dark:text-white">Workspace Dashboard</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back, driver! Manage your bookings, spaces, and mobility services.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            <Activity className="h-4 w-4 text-emerald-500 animate-pulse mr-1" />
            <span>SYSTEM STATUS: NORMAL</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card key={idx} className="border border-slate-200 dark:border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{s.label}</span>
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="text-2xl font-bold font-outfit text-slate-950 dark:text-white">{s.value}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Selection Hub */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">Choose Your Workspace Mode</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Driver Card */}
            <Card className="border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2">
                  <Car className="h-6 w-6" />
                </div>
                <CardTitle>Driver Portal</CardTitle>
                <CardDescription>Search and book parking spots in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Access our interactive map to find parking spots (formal and P2P driveways). Reserve your spot instantly and pay safely via Razorpay integration.
                </p>
                <Link href="/dashboard/driver">
                  <Button className="w-full justify-between mt-2">
                    <span>Find & Book Spot</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Owner Card */}
            <Card className="border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <CardTitle>P2P Land Owner</CardTitle>
                <CardDescription>Monetize driveways, garages, and vacant plots</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  List your idle residential or commercial spaces. Set custom hourly pricing, define availability slots, and track passive household earnings.
                </p>
                <Link href="/dashboard/owner">
                  <Button variant="accent" className="w-full justify-between mt-2 bg-accent hover:bg-accent-dark">
                    <span>Manage Listings</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Services Card */}
            <Card className="border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
                  <BatteryCharging className="h-6 w-6" />
                </div>
                <CardTitle>Vehicle Services</CardTitle>
                <CardDescription>Locate nearby EV charger ports, CNG, and mechanics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Out on a road trip? Check locations of EV charging grids, local CNG pumps, and top-rated vehicle breakdown mechanics on a map.
                </p>
                <Link href="/dashboard/services">
                  <Button variant="secondary" className="w-full justify-between mt-2">
                    <span>Locate Services</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Current Active Booking Details panel */}
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Reservation Status</CardTitle>
            <CardDescription>Real-time countdown and navigation coordinates</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <div className="text-xs font-bold text-blue-500 uppercase tracking-wider">Spot Reference</div>
              <div className="font-bold text-slate-900 dark:text-white text-base">Sec-14 Block B, P2P Driveway</div>
              <p className="text-xs text-slate-400">Reserved for: MH-12-AB-3456 (SUV)</p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Time Remaining</div>
              <div className="font-bold text-slate-900 dark:text-white text-base">01h 42m remaining</div>
              <p className="text-xs text-slate-400">Expires at 01:15 AM (Today)</p>
            </div>
            <div className="flex justify-start md:justify-end">
              <Link href="https://www.google.com/maps" target="_blank">
                <Button size="sm" variant="outline" className="space-x-1">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Start Navigation</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </main>

      <Footer />
    </div>
  );
}
