"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";
import { Search, MapPin, Clock, CreditCard, ShieldCheck, Car } from "lucide-react";
import toast from "react-hot-toast";

interface ParkingSpot {
  id: string;
  position: [number, number];
  title: string;
  type: "parking";
  status: "available" | "occupied";
  price: number;
  info: string;
}

export default function DriverPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.8955, 76.5892]);
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [hours, setHours] = useState(2);
  const [licensePlate, setLicensePlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    // Fetch spots from database
    const fetchSpots = async () => {
      try {
        const res = await fetch("/api/spots", { cache: "no-store" });
        if (res.ok) {
          const dbSpots = await res.json();
          const mappedSpots = dbSpots.map((s: any) => ({
            id: s.id,
            position: [s.latitude, s.longitude],
            title: s.title,
            type: "parking",
            status: s.status.toLowerCase(),
            price: s.price,
            info: s.description || "No details provided.",
          }));
          setSpots(mappedSpots);
        }
      } catch (err) {
        console.error("Failed to fetch spots", err);
      }
    };
    fetchSpots();

    const fetchMyBookings = async () => {
      try {
        const res = await fetch("/api/booking");
        if (res.ok) {
          const data = await res.json();
          setMyBookings(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyBookings();

    // Automatically get user location on load
    handleGetLocation();
  }, []);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
          setMapCenter(coords);
          setUserLocation(coords);
          setSearchQuery("Current Location");
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSpotSelect = (marker: any) => {
    if (marker.type === "parking") {
      setSelectedSpot(marker as ParkingSpot);
    }
  };

  const handleRequestBooking = async () => {
    if (!selectedSpot) return;
    
    if (!licensePlate) {
      toast.error("Please enter a license plate number.");
      return;
    }

    setIsLoading(true);

    const totalAmount = selectedSpot.price * hours;

    try {
      const response = await fetch("/api/booking/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spotId: selectedSpot.id,
          hours,
          amount: totalAmount,
          licensePlate
        }),
      });

      const result = await response.json();

      if (result.success) {
        setBookingDetails({
          spotTitle: selectedSpot.title,
          hours,
          amount: totalAmount,
          licensePlate: licensePlate,
          status: "PENDING",
        });
        setSuccessModalOpen(true);
        setSelectedSpot(null);
        setLicensePlate("");
        
        // Refresh bookings
        const res = await fetch("/api/booking");
        if (res.ok) {
          setMyBookings(await res.json());
        }
      } else {
        toast.error("Failed to request booking: " + result.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error requesting booking.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar />
      
      <main className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Side: Booking & Search Controls */}
        <div className="w-full md:w-5/12 lg:w-4/12 p-6 flex flex-col space-y-6 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
          
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white">Driver Booking Panel</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any green marker on the map to configure hours and reserve.
            </p>
          </div>

          <div className="flex gap-2">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search area..."
                  className="pl-9"
                />
              </div>
              <Button type="submit" variant="secondary" className="px-3">
                Search
              </Button>
            </form>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleGetLocation}
              title="Use Current Location"
              className="px-3 text-accent border-accent/30 hover:bg-accent/10"
            >
              <MapPin className="h-5 w-5" />
            </Button>
          </div>

          {selectedSpot ? (
            <Card className="border border-slate-200 dark:border-slate-800 animate-in fade-in-40 slide-in-from-bottom-2">
              <CardHeader className="pb-3 flex flex-row justify-between items-start space-y-0">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant={selectedSpot.status === "available" ? "success" : "danger"}>
                      {selectedSpot.status === "available" ? "Available" : "Occupied"}
                    </Badge>
                    <span className="text-[10px] text-slate-400 font-mono">P2P Host</span>
                  </div>
                  <CardTitle className="text-lg font-bold">{selectedSpot.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedSpot.info}</p>
                
                <div className="flex justify-between items-center text-sm border-y border-slate-100 dark:border-slate-800 py-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-500">Hourly Rate</span>
                  </div>
                  <span className="font-bold text-accent dark:text-accent-dark">₹{selectedSpot.price}/hr</span>
                </div>

                {selectedSpot.status === "available" ? (
                  <div className="space-y-4 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">License Plate Number</label>
                      <Input
                         value={licensePlate}
                         onChange={(e) => setLicensePlate(e.target.value)}
                         placeholder="e.g. HR-26-XX-1234"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-500">
                        <span>Duration (hours)</span>
                        <span>{hours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg flex justify-between items-center border border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Total Amount</div>
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">₹{selectedSpot.price * hours}</div>
                      </div>
                      <div className="text-[10px] text-slate-400 text-right">
                        Includes GST & fees
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <Button
                        onClick={handleRequestBooking}
                        disabled={isLoading}
                        className="w-full bg-accent hover:bg-accent-dark text-white space-x-2 font-semibold"
                      >
                        <Car className="h-4 w-4" />
                        <span>{isLoading ? "Requesting..." : "Request Booking"}</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-100/10 border border-rose-500/20 text-rose-500 text-xs rounded-lg text-center font-medium">
                    This parking spot is currently occupied. Please select an available slot on the map.
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="flex-1 flex flex-col space-y-3 overflow-y-auto pr-2 pb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Available Parking Spots</h3>
              {spots.length > 0 ? (
                spots.map(spot => (
                  <Card 
                    key={spot.id} 
                    className="cursor-pointer hover:border-accent transition-colors border border-slate-200 dark:border-slate-800" 
                    onClick={() => { setSelectedSpot(spot); setMapCenter(spot.position); }}
                  >
                    <CardContent className="p-4 flex flex-col space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{spot.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{spot.info}</p>
                        </div>
                        <Badge variant="success">Available</Badge>
                      </div>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <span className="text-xs text-slate-500">Tap to book</span>
                        <span className="font-bold text-accent dark:text-accent-dark">₹{spot.price}/hr</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                  <Car className="h-10 w-10 text-slate-300 dark:text-slate-700 animate-pulse" />
                  <h4 className="font-outfit font-semibold text-slate-700 dark:text-slate-300 text-sm">No Spots Found</h4>
                  <p className="text-xs text-slate-400 max-w-[200px]">
                    No available spots in your area currently.
                  </p>
                </div>
              )}
            </div>
          )}
          {myBookings.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white">Your Bookings</h3>
              {myBookings.map((b) => (
                <Card key={b.id} className="border border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{b.spot.title}</h4>
                        <p className="text-xs text-slate-500">License: {b.licensePlate}</p>
                      </div>
                      <Badge variant={b.status === "ACCEPTED" ? "success" : b.status === "PENDING" ? "warning" : "secondary"}>
                        {b.status}
                      </Badge>
                    </div>
                    
                    {b.status === "ACCEPTED" && (
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3 rounded-lg space-y-2 mt-2">
                        <div className="text-xs text-emerald-800 dark:text-emerald-300 font-bold mb-1 flex items-center space-x-1">
                          <ShieldCheck className="h-4 w-4" />
                          <span>Host Contact Info Unlocked</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-600 dark:text-slate-400">Address:</span>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">{b.spot.address || "No address provided"}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-slate-600 dark:text-slate-400">Phone Number:</span>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">{b.spot.phone || "No phone provided"}</span>
                        </div>
                      </div>
                    )}
                    
                    {b.status === "PENDING" && (
                      <p className="text-xs text-amber-600">Waiting for host to accept...</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Maps Frame */}
        <div className="flex-1 min-h-[450px] md:min-h-0 relative">
          <Map
            center={mapCenter}
            zoom={14}
            markers={[
              ...spots,
              ...(userLocation ? [{ id: "user-loc", position: userLocation, title: "Your Location", type: "user" as const }] : [])
            ]}
            onMarkerClick={handleSpotSelect}
          />
        </div>
      </main>

      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogHeader>
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="h-6 w-6 animate-pulse" />
          </div>
          <DialogTitle className="text-center text-xl">Request Sent to Host!</DialogTitle>
          <DialogDescription className="text-center">
            Your booking request is pending. The host will review and accept it shortly.
          </DialogDescription>
        </DialogHeader>

        {bookingDetails && (
          <div className="my-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Spot:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{bookingDetails.spotTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">License Plate:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">{bookingDetails.licensePlate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Duration:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{bookingDetails.hours} Hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status:</span>
              <Badge variant="warning" className="text-amber-500 border-amber-500">PENDING</Badge>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2 font-medium">
              <span className="text-slate-400">Amount to Pay (Once Accepted):</span>
              <span className="font-extrabold text-accent dark:text-accent-dark text-base">₹{bookingDetails.amount}</span>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          <Button onClick={() => setSuccessModalOpen(false)} className="w-full bg-accent hover:bg-accent-dark">
            Dismiss
          </Button>
        </DialogFooter>
      </Dialog>

      <Footer />
    </div>
  );
}
