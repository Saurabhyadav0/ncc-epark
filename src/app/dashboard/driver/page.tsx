"use client";

import React, { useState } from "react";
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

interface ParkingSpot {
  id: string;
  position: [number, number];
  title: string;
  type: "parking";
  status: "available" | "occupied";
  price: number;
  info: string;
}

const mockSpots: ParkingSpot[] = [
  {
    id: "spot-1",
    position: [28.4089, 77.3178], // Center
    title: "Sec-14 Main Market Plaza",
    type: "parking",
    status: "available",
    price: 40,
    info: "Adjacent to Central Park. 24/7 CCTV surveillance, gate entry.",
  },
  {
    id: "spot-2",
    position: [28.4110, 77.3210],
    title: "Metro Station Parking Slot 4B",
    type: "parking",
    status: "available",
    price: 30,
    info: "Fast access to metro ticketing gates. Fully covered basement.",
  },
  {
    id: "spot-3",
    position: [28.4055, 77.3140],
    title: "P2P Residential Driveway",
    type: "parking",
    status: "available",
    price: 25,
    info: "Monetized residential slot. Hosted by Manish. Safe, quiet street.",
  },
  {
    id: "spot-4",
    position: [28.4125, 77.3120],
    title: "Crown Plaza Mall Outdoor Lot",
    type: "parking",
    status: "occupied",
    price: 50,
    info: "Open-air plaza park. Electric charging ports available on spot.",
  },
  {
    id: "spot-5",
    position: [28.4020, 77.3230],
    title: "Bata Chowk Commercial Lot",
    type: "parking",
    status: "available",
    price: 45,
    info: "Secured office block compound. Available for public parking after 6 PM.",
  },
];

export default function DriverPortal() {
  const [searchQuery, setSearchQuery] = useState("Faridabad Sector 14");
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [hours, setHours] = useState(2);
  const [licensePlate, setLicensePlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate centring or finding spots
  };

  const handleSpotSelect = (marker: any) => {
    // Cast to ParkingSpot if type is parking
    if (marker.type === "parking") {
      setSelectedSpot(marker as ParkingSpot);
    }
  };

  const executeRazorpayCheckout = async (orderId: string, amount: number) => {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mockkeyid12345";

    const options = {
      key: keyId,
      amount: amount * 100, // In paise
      currency: "INR",
      name: "epark Mobility",
      description: `Parking booking for ${selectedSpot?.title}`,
      order_id: orderId,
      handler: async function (response: any) {
        setIsLoading(true);
        try {
          const res = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const result = await res.json();
          if (result.success) {
            setBookingDetails({
              spotTitle: selectedSpot?.title,
              hours,
              amount,
              licensePlate: licensePlate || "MH-12-AB-3456",
              paymentId: response.razorpay_payment_id,
            });
            setSuccessModalOpen(true);
            setSelectedSpot(null);
            setLicensePlate("");
          } else {
            alert("Payment verification failed! Please try again.");
          }
        } catch (err) {
          console.error(err);
          alert("Error verifying payment.");
        } finally {
          setIsLoading(false);
        }
      },
      prefill: {
        name: "Test Driver",
        email: "driver@epark.in",
        contact: "9999999999",
      },
      theme: {
        color: "#10b981", // Accent color
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handlePay = async (isMock: boolean = false) => {
    if (!selectedSpot) return;
    setIsLoading(true);

    const totalAmount = selectedSpot.price * hours;

    if (isMock) {
      // Simulate API call and payment delay
      setTimeout(() => {
        setBookingDetails({
          spotTitle: selectedSpot.title,
          hours,
          amount: totalAmount,
          licensePlate: licensePlate || "MH-12-AB-3456",
          paymentId: "pay_mock_" + Math.random().toString(36).substring(7),
        });
        setIsLoading(false);
        setSuccessModalOpen(true);
        setSelectedSpot(null);
        setLicensePlate("");
      }, 1500);
      return;
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          spotId: selectedSpot.id,
        }),
      });

      const order = await response.json();

      if (order.id) {
        await executeRazorpayCheckout(order.id, totalAmount);
      } else {
        alert("Failed to create order, using mock checkout instead.");
        handlePay(true); // Fallback to mock
      }
    } catch (err) {
      console.error(err);
      alert("Error initiating Razorpay checkout, falling back to mock flow.");
      handlePay(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar />
      
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <main className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Side: Booking & Search Controls */}
        <div className="w-full md:w-5/12 lg:w-4/12 p-6 flex flex-col space-y-6 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
          
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white">Driver Booking Panel</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any green marker on the map to configure hours and reserve.
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="flex gap-2">
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

          {/* Spot Config Details Panel */}
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

                {/* Booking duration & plate input */}
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

                    {/* Total billing summary */}
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg flex justify-between items-center border border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Total Amount</div>
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white">₹{selectedSpot.price * hours}</div>
                      </div>
                      <div className="text-[10px] text-slate-400 text-right">
                        Includes GST & fees
                      </div>
                    </div>

                    {/* Pay button with mock option */}
                    <div className="flex flex-col gap-2 pt-2">
                      <Button
                        onClick={() => handlePay(false)}
                        disabled={isLoading}
                        className="w-full bg-accent hover:bg-accent-dark text-white space-x-2 font-semibold"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>{isLoading ? "Processing..." : "Pay via Razorpay"}</span>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handlePay(true)}
                        disabled={isLoading}
                        className="w-full text-xs"
                      >
                        ⚡ Test Booking (Bypass payment key)
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
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
              <Car className="h-10 w-10 text-slate-300 dark:text-slate-700 animate-pulse" />
              <h4 className="font-outfit font-semibold text-slate-700 dark:text-slate-300 text-sm">No Spot Selected</h4>
              <p className="text-xs text-slate-400 max-w-[200px]">
                Click on any marker on the map to view coordinates, check pricing, and lock bookings.
              </p>
            </div>
          )}

          {/* Secure transaction notice */}
          <div className="text-[10px] text-slate-400 flex items-center space-x-2 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200/40 dark:border-slate-800/40 mt-auto">
            <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>Payments verified securely by Razorpay. Zero liability encryption activated.</span>
          </div>

        </div>

        {/* Right Side: Maps Frame */}
        <div className="flex-1 min-h-[450px] md:min-h-0 relative">
          <Map
            center={[28.4089, 77.3178]} // Faridabad center
            zoom={14}
            markers={mockSpots}
            onMarkerClick={handleSpotSelect}
          />
        </div>

      </main>

      {/* Success Dialog */}
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogHeader>
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="h-6 w-6 animate-bounce" />
          </div>
          <DialogTitle className="text-center text-xl">Booking Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Your parking space has been successfully reserved.
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
            <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2 font-medium">
              <span className="text-slate-400">Total Paid:</span>
              <span className="font-extrabold text-accent dark:text-accent-dark text-base">₹{bookingDetails.amount}</span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
              <span>Receipt Ref:</span>
              <span>{bookingDetails.paymentId}</span>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          <Button onClick={() => setSuccessModalOpen(false)} className="w-full bg-accent hover:bg-accent-dark">
            Dismiss Receipt
          </Button>
        </DialogFooter>
      </Dialog>

      <Footer />
    </div>
  );
}
