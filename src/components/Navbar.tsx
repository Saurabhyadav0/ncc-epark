"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Sun, Moon, MapPin, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Sync with html tag initialized in layout.tsx
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200">
      {/* Student Submission Banner */}
      <div className="w-full bg-slate-900 text-slate-100 text-xs py-2 px-4 flex flex-wrap justify-between items-center border-b border-slate-800 font-sans tracking-wide">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">PROJECT</span>
          <span className="font-semibold text-slate-200">epark: Urban Mobility System</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline text-slate-400">Developer: <strong className="text-white font-medium">Manish</strong> (HR23SDA011018)</span>
          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono">1HR BATTALION NCC</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full glass-navbar border-b border-slate-200/20 dark:border-slate-800/35 px-4 md:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-slate-900 dark:text-slate-50 font-outfit text-xl font-bold">
          <MapPin className="h-6 w-6 text-accent dark:text-accent-dark" />
          <span>
            e<span className="text-accent dark:text-accent-dark">park</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">
            Home
          </Link>
          <SignedIn>
            <Link href="/dashboard" className="hover:text-primary dark:hover:text-accent transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/driver" className="hover:text-primary dark:hover:text-accent transition-colors">
              Book Parking
            </Link>
            <Link href="/dashboard/owner" className="hover:text-primary dark:hover:text-accent transition-colors">
              List Space
            </Link>
            <Link href="/dashboard/services" className="hover:text-primary dark:hover:text-accent transition-colors">
              Services
            </Link>
          </SignedIn>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="w-9 h-9 p-0 rounded-full text-slate-700 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Authentication */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm" className="hidden sm:inline-flex">Sign In</Button>
            </SignInButton>
          </SignedOut>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 p-0 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-3 flex flex-col text-sm font-medium animate-in slide-in-from-top-4">
          <span className="md:hidden text-[10px] text-slate-400 font-mono tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            SUBMISSION BY MANISH • 1HR BATTALION NCC
          </span>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-accent py-1.5 transition-colors"
          >
            Home
          </Link>
          <SignedIn>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-accent py-1.5 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/driver"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-accent py-1.5 transition-colors"
            >
              Book Parking
            </Link>
            <Link
              href="/dashboard/owner"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-accent py-1.5 transition-colors"
            >
              List Space
            </Link>
            <Link
              href="/dashboard/services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-accent py-1.5 transition-colors"
            >
              Services
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="w-full mt-2" size="sm">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      )}
    </header>
  );
}
