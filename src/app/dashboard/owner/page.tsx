"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { 
  PlusCircle, 
  MapPin, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Sparkles,
  CheckCircle,
  Building,
  Home
} from "lucide-react";

interface Listing {
  id: string;
  title: string;
  type: string;
  rate: number;
  earnings: number;
  bookings: number;
  status: "Active" | "Inactive";
}

const initialListings: Listing[] = [
  {
    id: "list-1",
    title: "Manish's Sec-14 Residential Driveway",
    type: "Driveway",
    rate: 25,
    earnings: 3250,
    bookings: 14,
    status: "Active",
  },
  {
    id: "list-2",
    title: "Sector 15 Covered Garage Space",
    type: "Garage",
    rate: 35,
    earnings: 1600,
    bookings: 10,
    status: "Active",
  }
];

export default function OwnerPortal() {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Driveway");
  const [newRate, setNewRate] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleAddSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newRate) return;

    const newListing: Listing = {
      id: "list-" + (listings.length + 1),
      title: newTitle,
      type: newType,
      rate: Number(newRate),
      earnings: 0,
      bookings: 0,
      status: "Active"
    };

    setListings([newListing, ...listings]);
    setNewTitle("");
    setNewRate("");
    setNewAddress("");
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 4000);
  };

  const toggleStatus = (id: string) => {
    setListings(
      listings.map((l) =>
        l.id === id ? { ...l, status: l.status === "Active" ? "Inactive" : "Active" } : l
      )
    );
  };

  // Calculate stats
  const totalEarnings = listings.reduce((sum, item) => sum + item.earnings, 0);
  const totalBookings = listings.reduce((sum, item) => sum + item.bookings, 0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10 space-y-10">
        
        {/* Welcome Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 dark:text-white">P2P Host Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monetize your empty space and earn passive income hosting local drivers.
          </p>
        </div>

        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="flex items-center space-x-3 p-4 bg-emerald-100/10 border border-emerald-500/30 text-emerald-500 text-sm rounded-xl font-medium animate-in fade-in">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <span>Success! Your driveway parking spot has been registered and is now listed LIVE on our map.</span>
          </div>
        )}

        {/* Host Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Host Earnings</span>
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold font-outfit text-slate-950 dark:text-white">₹{totalEarnings}</div>
              <p className="text-xs text-slate-400 mt-1">Direct payout transfer on 1st of every month.</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Cars Hosted</span>
              <Clock className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold font-outfit text-slate-950 dark:text-white">{totalBookings}</div>
              <p className="text-xs text-slate-400 mt-1">Representing {totalBookings * 2} hours total occupied time.</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Passive Growth</span>
              <TrendingUp className="h-5 w-5 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold font-outfit text-slate-950 dark:text-white">+28%</div>
              <p className="text-xs text-slate-400 mt-1">Increase in parking demand in your area this week.</p>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Dual Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Columns: Listing Management & Analytics */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl">Your Registered Parking Spots</CardTitle>
                <CardDescription>Manage active states and hourly billing rates</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-xs uppercase font-bold">
                      <th className="py-3 px-2">Spot Details</th>
                      <th className="py-3 px-2">Type</th>
                      <th className="py-3 px-2">Rate</th>
                      <th className="py-3 px-2">Total Income</th>
                      <th className="py-3 px-2 text-center">Status</th>
                      <th className="py-3 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((l) => (
                      <tr key={l.id} className="border-b border-slate-100 dark:border-slate-900 last:border-0 text-slate-700 dark:text-slate-300">
                        <td className="py-4 px-2 font-medium text-slate-950 dark:text-white">{l.title}</td>
                        <td className="py-4 px-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {l.type}
                          </span>
                        </td>
                        <td className="py-4 px-2 font-semibold">₹{l.rate}/hr</td>
                        <td className="py-4 px-2 font-bold text-accent dark:text-accent-dark">₹{l.earnings}</td>
                        <td className="py-4 px-2 text-center">
                          <Badge variant={l.status === "Active" ? "success" : "secondary"}>
                            {l.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStatus(l.id)}
                            className="text-xs text-blue-500 hover:text-blue-600"
                          >
                            Toggle State
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Income Analytics bar graph using pure CSS Flexboxes */}
            <Card className="border border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl">Weekly Earnings Analytics</CardTitle>
                <CardDescription>Visualizing host revenue streams by weekday</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex flex-col justify-end">
                <div className="flex items-end justify-between h-48 px-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                  {[
                    { day: "Mon", amt: 350, h: "h-[30%]" },
                    { day: "Tue", amt: 490, h: "h-[45%]" },
                    { day: "Wed", amt: 650, h: "h-[60%]" },
                    { day: "Thu", amt: 200, h: "h-[18%]" },
                    { day: "Fri", amt: 890, h: "h-[85%]" },
                    { day: "Sat", amt: 1100, h: "h-[100%]" },
                    { day: "Sun", amt: 980, h: "h-[90%]" },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 space-y-2 group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-1.5 rounded -mt-8 absolute font-bold z-10">
                        ₹{bar.amt}
                      </div>
                      <div className={`w-8 ${bar.h} bg-accent dark:bg-accent-dark rounded-t-md hover:opacity-85 transition-opacity`}></div>
                      <span className="text-xs text-slate-400">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column: Add New Space Register Form */}
          <div className="space-y-6">
            <Card className="border border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <PlusCircle className="h-5 w-5 text-accent" />
                  <span>List New Space</span>
                </CardTitle>
                <CardDescription>Fill out the fields to publish your slot on epark map.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSpace} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Listing Spot Title</label>
                    <Input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. My Secure Office Driveway"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Hourly Price (INR)</label>
                    <Input
                      type="number"
                      value={newRate}
                      onChange={(e) => setNewRate(e.target.value)}
                      placeholder="e.g. 30"
                      min="10"
                      max="200"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Spot Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100"
                    >
                      <option value="Driveway">🏡 Driveway</option>
                      <option value="Garage">🚗 Garage Space</option>
                      <option value="Open Plot">🌳 Open Plot</option>
                      <option value="Commercial Lot">🏢 Commercial Lot</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Full Coordinates / Address</label>
                    <Input
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="e.g. House 412, Sector 14, Faridabad"
                    />
                  </div>

                  <Button type="submit" variant="accent" className="w-full bg-accent hover:bg-accent-dark font-semibold mt-2">
                    Publish Spot Live
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border border-slate-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Sparkles className="h-5 w-5" />
                  <h4 className="font-bold font-outfit text-sm">Host Premium Tips</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Setting your rate around <strong className="text-white">₹25-₹35/hr</strong> is shown to capture over 80% of booking matches in residential areas. Add clear access instructions for higher ratings!
                </p>
              </CardContent>
            </Card>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
