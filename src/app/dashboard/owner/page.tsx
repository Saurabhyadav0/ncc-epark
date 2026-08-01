"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { 
  PlusCircle, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Sparkles,
  CheckCircle,
  Inbox
} from "lucide-react";
import toast from "react-hot-toast";

export default function OwnerPortal() {
  const [spots, setSpots] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Driveway");
  const [newRate, setNewRate] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/owner");
      if (res.ok) {
        const data = await res.json();
        setSpots(data.spots);
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newRate || !newAddress || !newPhone) return;
    setIsSubmitting(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          submitSpot(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Could not get location. Falling back to default Rohtak coordinates.");
          submitSpot(28.8955 + (Math.random() - 0.5) * 0.02, 76.5892 + (Math.random() - 0.5) * 0.02);
        }
      );
    } else {
      submitSpot(28.8955 + (Math.random() - 0.5) * 0.02, 76.5892 + (Math.random() - 0.5) * 0.02);
    }
  };

  const submitSpot = async (lat: number, lng: number) => {
    try {
      const res = await fetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newType,
          address: newAddress,
          phone: newPhone,
          price: newRate,
          latitude: lat,
          longitude: lng
        })
      });

      if (res.ok) {
        setNewTitle("");
        setNewRate("");
        setNewAddress("");
        setNewPhone("");
        toast.success("Spot created successfully!");
        fetchData();
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(`Failed to create spot: ${errorData.error || res.statusText}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting spot");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookingAction = async (bookingId: string, status: "ACCEPTED" | "REJECTED") => {
    try {
      const res = await fetch("/api/booking/accept", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status })
      });
      if (res.ok) {
        toast.success(`Booking ${status.toLowerCase()}!`);
        fetchData();
      } else {
        toast.error("Failed to update booking status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating booking");
    }
  };

  const pendingBookings = bookings.filter(b => b.status === "PENDING");
  const acceptedBookings = bookings.filter(b => b.status === "ACCEPTED" || b.status === "PAID");

  const totalEarnings = acceptedBookings.reduce((sum, item) => sum + item.amount, 0);
  const totalBookingsCount = acceptedBookings.length;

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
              <p className="text-xs text-slate-400 mt-1">From accepted & paid bookings.</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Accepted Bookings</span>
              <Clock className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold font-outfit text-slate-950 dark:text-white">{totalBookingsCount}</div>
              <p className="text-xs text-slate-400 mt-1">Drivers successfully hosted.</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Listings</span>
              <TrendingUp className="h-5 w-5 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold font-outfit text-slate-950 dark:text-white">{spots.length}</div>
              <p className="text-xs text-slate-400 mt-1">Total parking spots you have created.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* Incoming Requests Panel */}
            <Card className="border-2 border-amber-500/30 shadow-lg shadow-amber-500/10">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2 text-amber-500">
                  <Inbox className="h-5 w-5" />
                  <span>Incoming Booking Requests</span>
                </CardTitle>
                <CardDescription>Drivers waiting for your approval to park</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingBookings.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-sm">
                    No pending requests at the moment.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingBookings.map(b => (
                      <div key={b.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 gap-4">
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 dark:text-white">{b.spot.title}</h4>
                          <div className="text-xs text-slate-500 space-x-3">
                            <span>License: <strong className="text-slate-700 dark:text-slate-300">{b.licensePlate}</strong></span>
                            <span>Duration: <strong className="text-slate-700 dark:text-slate-300">{b.hours} hrs</strong></span>
                          </div>
                          <div className="text-xs font-bold text-accent">Payout: ₹{b.amount}</div>
                        </div>
                        <div className="flex space-x-2 w-full sm:w-auto">
                          <Button 
                            variant="outline" 
                            className="flex-1 text-rose-500 hover:bg-rose-50"
                            onClick={() => handleBookingAction(b.id, "REJECTED")}
                          >
                            Reject
                          </Button>
                          <Button 
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                            onClick={() => handleBookingAction(b.id, "ACCEPTED")}
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl">Your Registered Parking Spots</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-xs uppercase font-bold">
                      <th className="py-3 px-2">Spot Details</th>
                      <th className="py-3 px-2">Address</th>
                      <th className="py-3 px-2">Rate</th>
                      <th className="py-3 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spots.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-slate-500">No spots listed yet.</td>
                      </tr>
                    )}
                    {spots.map((l) => (
                      <tr key={l.id} className="border-b border-slate-100 dark:border-slate-900 last:border-0 text-slate-700 dark:text-slate-300">
                        <td className="py-4 px-2 font-medium text-slate-950 dark:text-white">{l.title}</td>
                        <td className="py-4 px-2 text-xs truncate max-w-[200px]">{l.address}</td>
                        <td className="py-4 px-2 font-semibold">₹{l.price}/hr</td>
                        <td className="py-4 px-2 text-center">
                          <Badge variant={l.status === "AVAILABLE" ? "success" : "secondary"}>
                            {l.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

          </div>

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
                    <label className="text-xs font-semibold text-slate-500">Exact Address (Shared securely)</label>
                    <Input
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="e.g. House 412, Sector 14, Faridabad"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Host Phone Number</label>
                    <Input
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="e.g. +91 9999999999"
                      required
                    />
                    <p className="text-[10px] text-slate-400">Only shared with drivers *after* you accept their booking.</p>
                  </div>

                  <Button type="submit" variant="accent" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent-dark font-semibold mt-2">
                    {isSubmitting ? "Publishing..." : "Publish Spot Live"}
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
