import React from 'react';
import { Shield, CheckCircle2, ArrowRight, MapPin, Building, Sparkles } from 'lucide-react';

interface HeroProps {
  logoUrl: string;
  heroImageUrl: string;
  onRequestService: () => void;
  onGetQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ logoUrl, heroImageUrl, onRequestService, onGetQuote }) => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-forest-dark text-white overflow-hidden pt-8 pb-16 lg:py-20 border-b border-gray-800">
      
      {/* Background Image with Dark Forest Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
        <img 
          src={heroImageUrl} 
          alt="Phoenix Valley HOA Neighborhood" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-emerald-950/80"></div>
      </div>

      {/* Subtle Grid Accent Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#133c27_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-600/50 text-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Phoenix Valley HOA Trash Valet</span>
              <span className="text-gray-400">|</span>
              <span className="text-white flex items-center gap-1 font-bold">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Arizona Local
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-emerald-300 font-extrabold bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-600/60">
                $7.25 / Wk (1x) • $9.75 / Wk (2x)
              </span>
            </div>

            {/* Prominent Logo & Headline */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 pt-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl p-1.5 shadow-2xl border-2 border-emerald-500 shrink-0">
                  <img 
                    src={logoUrl} 
                    alt="Gunny's Garbage Squad Badge" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-emerald-400 font-extrabold tracking-wider text-xs sm:text-sm uppercase block font-outfit">
                    GUNNY’S GARBAGE SQUAD LLC
                  </span>
                  <span className="text-gray-300 text-xs sm:text-sm font-medium">
                    Neighborhood Trash-Can Valet Services
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none font-outfit">
                Never Drag Your Trash Cans to the Curb Again.
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl">
              Gunny’s Garbage Squad provides reliable trash-can valet service for HOA communities throughout the Phoenix Valley and surrounding Arizona cities.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onRequestService}
                className="px-7 py-4 bg-forest hover:bg-forest-light text-white font-extrabold rounded-xl shadow-lg hover:shadow-emerald-900/50 transition-all text-base text-center flex items-center justify-center gap-3 border border-emerald-500"
              >
                <span>Request HOA Service</span>
                <ArrowRight className="w-5 h-5 text-emerald-300" />
              </button>

              <button
                onClick={onGetQuote}
                className="px-7 py-4 bg-white hover:bg-gray-100 text-gray-900 font-extrabold rounded-xl shadow-md transition-all text-base text-center border border-gray-300 flex items-center justify-center gap-2"
              >
                <span>Get a Quote ($7.25/Wk)</span>
                <Sparkles className="w-4 h-4 text-emerald-700" />
              </button>
            </div>

            {/* Trust Bullet Items */}
            <div className="pt-6 border-t border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Uniformed & Insured Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Guaranteed On-Time Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>$7.25/Wk (1x) • $9.75/Wk (2x Twice)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transparent Weekly Billing</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card Column */}
          <div className="lg:col-span-5">
            <div className="bg-gray-900/90 border-2 border-emerald-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative">
              
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-gray-700 shadow-inner group">
                <img 
                  src={heroImageUrl} 
                  alt="HOA Community Trash Valet Service" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80"></div>
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-gray-900/90 border border-emerald-500/40 rounded-lg p-3 backdrop-blur-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                    <div>
                      <p className="text-xs font-bold text-white">Active Valet Service</p>
                      <p className="text-[11px] text-gray-300">Phoenix Valley HOA Neighborhoods</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-forest text-emerald-200 px-2 py-1 rounded">
                    100% On Time
                  </span>
                </div>
              </div>

              {/* Quick Feature Callouts below Hero Card */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-left">
                <div className="bg-gray-950/70 p-3 rounded-lg border border-gray-800">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">HOA Board Perk</p>
                  <p className="text-xs text-gray-300 mt-0.5">Keeps driveways clean & organized every week.</p>
                </div>
                <div className="bg-gray-950/70 p-3 rounded-lg border border-gray-800">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Resident Favorite</p>
                  <p className="text-xs text-gray-300 mt-0.5">No more dragging cans in 110° Arizona heat.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
