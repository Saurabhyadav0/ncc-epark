import React from "react";
import Link from "next/link";
import { MapPin, ShieldAlert, Award, School } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Column */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2 text-slate-900 dark:text-slate-50 font-outfit text-xl font-bold">
            <MapPin className="h-6 w-6 text-accent dark:text-accent-dark" />
            <span>e<span className="text-accent dark:text-accent-dark">park</span></span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            A comprehensive urban mobility ecosystem designed for Tier 2 and Tier 3 Indian cities. Simplifying parking finder, navigation, secure digital payments, P2P space monetization, and roadside assistance locator.
          </p>
        </div>

        {/* Links Column */}
        <div className="space-y-4">
          <h4 className="text-slate-900 dark:text-slate-200 font-semibold font-outfit">Project Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">
                Home / Landing
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-primary dark:hover:text-accent transition-colors">
                Dashboard Portal
              </Link>
            </li>
            <li>
              <Link href="/dashboard/driver" className="hover:text-primary dark:hover:text-accent transition-colors">
                Book Dynamic Parking
              </Link>
            </li>
            <li>
              <Link href="/dashboard/owner" className="hover:text-primary dark:hover:text-accent transition-colors">
                Monetize Idle Space
              </Link>
            </li>
            <li>
              <Link href="/dashboard/services" className="hover:text-primary dark:hover:text-accent transition-colors">
                Vehicle Services Finder
              </Link>
            </li>
          </ul>
        </div>

        {/* Academic / Submission Metadata Column */}
        <div className="space-y-4 rounded-xl p-5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h4 className="text-slate-900 dark:text-slate-200 font-semibold font-outfit flex items-center space-x-2">
            <Award className="h-5 w-5 text-blue-500" />
            <span>Submission Info</span>
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start space-x-2">
              <span className="font-semibold text-slate-800 dark:text-slate-300 min-w-[70px]">Developer:</span>
              <span className="text-slate-600 dark:text-slate-400">Saurabh Yadav (HR2024SDIA5640781)</span>
            </div>
            <div className="flex items-start space-x-2">
              <School className="h-4 w-4 text-slate-400 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-300">Institute Details:</p>
                <p className="text-slate-500 dark:text-slate-400">MDU (UIET - B.Tech Computer Science)</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <ShieldAlert className="h-4 w-4 text-amber-500 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-300">Unit / Division:</p>
                <p className="text-slate-500 dark:text-slate-400">1HR BATTALION NCC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Under footer */}
      <div className="w-full bg-slate-100 dark:bg-slate-950 py-4 px-4 border-t border-slate-200 dark:border-slate-900 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} epark Mobility Project. Created for academic evaluation & NCC submission.
      </div>
    </footer>
  );
}
