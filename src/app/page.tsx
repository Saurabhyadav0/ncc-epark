"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  MapPin,
  CreditCard,
  Compass,
  Wrench,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  BatteryCharging,
  ArrowRight,
  UserCheck,
  CheckCircle,
  FileText,
  School,
  Award
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Navbar />

      {/* Main Hero Section */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center border-b border-slate-900">
        {/* Decorative Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl z-0"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium tracking-wide">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span>Transforming Mobility in Tier 2 & 3 Cities</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-outfit max-w-5xl mx-auto leading-tight">
            epark: Revolutionizing{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400">
              Urban Mobility
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed">
            A unified companion transforming the parking experience, enabling peer-to-peer space monetization, and locating EV, CNG, and mechanics on-the-go.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto font-semibold space-x-2 bg-accent hover:bg-accent-dark">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto font-semibold space-x-2 bg-accent hover:bg-accent-dark">
                  <span>Get Started Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            <Link href="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-slate-100 hover:text-white border-slate-800 hover:bg-slate-900">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Student/NCC Verification Info Panel */}
      <section className="w-full py-8 bg-slate-100 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-1 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">PROJECT ASSIGNMENT</span>
            <h4 className="text-base font-bold font-outfit text-slate-800 dark:text-slate-200">Academic Submission</h4>
          </div>
          <div className="md:col-span-3 flex flex-wrap justify-center md:justify-around gap-6 items-center text-xs text-slate-600 dark:text-slate-400 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center space-x-2.5">
              <UserCheck className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Saurabh Yadav</p>
                <p className="text-[10px] text-slate-400">Enroll: HR2024SDIA5640781</p>
              </div>
            </div>
            <div className="flex items-center space-x-2.5">
              <School className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">UIET - MDU & IIT Madras</p>
                <p className="text-[10px] text-slate-400">BCA & BS (Data Science)</p>
              </div>
            </div>
            <div className="flex items-center space-x-2.5">
              <Award className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">1HR BATTALION NCC</p>
                <p className="text-[10px] text-slate-400">Division Credit Project</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="w-full py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase font-extrabold text-rose-500 tracking-wider">The Challenge</span>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit">The Urban Parking Predicament</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              India's rapid urbanization and increasing vehicle ownership, especially in Tier 2 and 3 cities, have led to a severe shortage of organized parking space. This creates daily chaos, impacts road safety, and leaves vast amounts of private parking spaces unused.
            </p>
            <ul className="space-y-3">
              {[
                "Traffic congestion & air/noise pollution",
                "Wasted driver time & building frustration",
                "Illegal parking & hefty challan fines",
                "Severe lack of organized EV charging infrastructure",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-video flex items-center justify-center">
            {/* Visual placeholder mimicking the urban congestion image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 to-slate-900 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-500 animate-pulse text-2xl font-bold">🚨</div>
              <h4 className="font-outfit font-bold text-lg text-white">Daily Traffic Chaos</h4>
              <p className="text-xs text-slate-400 max-w-sm">Illegal street parking blocks critical lanes, leading to wasted hours and constant stress for commuters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Solution Overview */}
      <section id="features" className="w-full py-20 bg-slate-100 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs uppercase font-extrabold text-accent dark:text-accent-dark tracking-wider">Solution</span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-slate-900 dark:text-white">Complete Mobility Ecosystem</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              epark is a unified web and mobile application designed to address every pain point of modern urban drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: "Find & Book Parking",
                description: "Real-time availability map for booking both formal lots and informal private driveways.",
                color: "text-emerald-500 bg-emerald-500/10",
              },
              {
                icon: CreditCard,
                title: "Digital Payments",
                description: "Seamless and secure transaction system powered by Razorpay for instant checkout.",
                color: "text-blue-500 bg-blue-500/10",
              },
              {
                icon: Compass,
                title: "Integrated Navigation",
                description: "Dynamic route directions straight to your designated and reserved parking spot.",
                color: "text-indigo-500 bg-indigo-500/10",
              },
              {
                icon: Wrench,
                title: "Vehicle Services Hub",
                description: "Quickly locate nearby EV charging ports, CNG stations, and local vehicle mechanics.",
                color: "text-amber-500 bg-amber-500/10",
              },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Card key={idx} className="border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6 space-y-4 text-left">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold font-outfit text-slate-950 dark:text-white">{feat.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{feat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Peer-to-Peer Highlights */}
      <section className="w-full py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-video flex items-center justify-center order-last lg:order-first">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 text-accent text-2xl font-bold">💰</div>
              <h4 className="font-outfit font-bold text-lg text-white">Passive Rental Income</h4>
              <p className="text-xs text-slate-400 max-w-sm">Manage dynamic pricing hourly, customize calendar listings, and track secure earnings directly into your linked bank account.</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase font-extrabold text-accent dark:text-accent-dark tracking-wider">P2P Monetization</span>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-950 dark:text-white">Monetize Your Driveway</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              epark empowers local homeowners and businesses with unused spaces, driveways, or empty garages to list and lease their land to drivers needing parking, providing critical supply where traditional space is lacking.
            </p>
            <ul className="space-y-3">
              {[
                { title: "Easy Listing", desc: "Publish parking availability in less than 5 minutes." },
                { title: "Dynamic Pricing", desc: "Set custom hourly prices depending on peak schedules." },
                { title: "Earn Rental Income", desc: "Gain a steady secondary stream of passive household revenue." },
                { title: "Smarter Cities", desc: "Contribute to clearing street congestions by hosting cars." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-950 dark:text-white font-medium">{item.title}:</strong>{" "}
                    <span className="text-slate-500 dark:text-slate-400">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Full Service Ecosystem breakdown */}
      <section className="w-full py-20 bg-slate-100 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs uppercase font-extrabold text-blue-500 tracking-wider">Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-900 dark:text-white">Beyond Parking: Full-Service</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We provide a complete vehicle companion system to support drivers on every step of their daily journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "Challan & Safety Alerts",
                description: "Avoid high-risk parking zones, double check traffic challan tickets, and receive safe parking tips.",
                color: "text-rose-500 bg-rose-500/10",
              },
              {
                icon: BatteryCharging,
                title: "Fuel & EV charging locator",
                description: "Instantly pinpoint nearby electric vehicle (EV) charging stations and local CNG stations on the map.",
                color: "text-indigo-500 bg-indigo-500/10",
              },
              {
                icon: Wrench,
                title: "Mechanic & Roadside Finder",
                description: "Access trusted roadside assistance services and local mechanics in close proximity during breakdowns.",
                color: "text-orange-500 bg-orange-500/10",
              },
            ].map((eco, idx) => {
              const Icon = eco.icon;
              return (
                <div key={idx} className="flex flex-col items-center p-6 space-y-4 bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${eco.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold font-outfit text-slate-950 dark:text-white">{eco.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">{eco.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact & Future Vision */}
      <section className="w-full py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase font-extrabold text-indigo-500 tracking-wider">Vision</span>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-950 dark:text-white">Impact & Future scope</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Reduced Congestion", desc: "Less time cruising for parking spots leads to smoother traffic flows and reduced greenhouse gas emissions." },
              { title: "Economic Empowerment", desc: "Homeowners and local stores can extract passive income from unused assets (monetizing driveways)." },
              { title: "Enhanced Experience", desc: "Stress-free driving, digital payments verification, and instant mechanic assistance under a single portal." },
              { title: "Smart City Alignment", desc: "Integrates with modern IoT sensors, supports heavy EV charging demands, and unlocks future micro-mobility expansions." }
            ].map((v, idx) => (
              <div key={idx} className="flex space-x-4 p-5 rounded-xl border border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-900/20">
                <CheckCircle className="h-6 w-6 text-accent shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-950 dark:text-white font-outfit text-base">{v.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-950 z-0"></div>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold font-outfit leading-tight">Drive Smarter with epark</h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Register today to find the nearest parking lot or start earning rent on your empty driveway. Your journey, simplified.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent-dark font-semibold">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent-dark font-semibold">
                  Get Started for Free
                </Button>
              </SignInButton>
            </SignedOut>
            <Link href="#features">
              <Button variant="ghost" className="w-full sm:w-auto hover:bg-slate-800 text-slate-300">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
