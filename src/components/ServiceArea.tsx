import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { ARIZONA_CITIES } from '../data/hoaData';
import { CityServiceInfo } from '../types';

interface ServiceAreaProps {
  onOpenQuote: () => void;
  onOpenResidentModal: () => void;
}

export const ServiceArea: React.FC<ServiceAreaProps> = ({ onOpenQuote, onOpenResidentModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<CityServiceInfo | null>(ARIZONA_CITIES[0]);
  const [searchResult, setSearchResult] = useState<{ status: 'active' | 'expanding' | 'none'; message: string } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const matched = ARIZONA_CITIES.find(c => 
      c.name.toLowerCase().includes(query) || 
      c.zipCodes.some(zip => zip.includes(query)) ||
      c.popularCommunities.some(comm => comm.toLowerCase().includes(query))
    );

    if (matched) {
      setSelectedCity(matched);
      setSearchResult({
        status: matched.status === 'Active' ? 'active' : 'expanding',
        message: `Gunny’s Garbage Squad serves ${matched.name} (${matched.zipCodes.slice(0, 3).join(', ')}...)!`
      });
    } else {
      setSearchResult({
        status: 'expanding',
        message: `We are actively expanding near "${searchQuery}"! Request service now and we will notify your HOA board.`
      });
    }
  };

  return (
    <section id="service-area" className="py-16 lg:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            ARIZONA COVERAGE MAP & CITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight font-outfit">
            Serving the Phoenix Valley & Surrounding Communities
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Our squad operates daily throughout Maricopa and Pinal Counties, bringing reliable trash valet services to top HOA neighborhoods across the Valley.
          </p>
        </div>

        {/* Live Zip Code / City Checker Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 bg-slate-100 p-2 rounded-2xl border border-gray-300 shadow-sm">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter City, Zip Code (e.g., 85255, Gilbert, Scottsdale)..."
                className="w-full pl-11 pr-4 py-3 bg-white text-gray-900 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-forest hover:bg-forest-light text-white font-bold rounded-xl shadow transition-all text-sm shrink-0 flex items-center justify-center gap-2"
            >
              <span>Check Coverage</span>
              <Compass className="w-4 h-4 text-emerald-300" />
            </button>
          </form>

          {searchResult && (
            <div className={`mt-3 p-4 rounded-xl text-sm font-semibold flex items-center justify-between gap-3 ${
              searchResult.status === 'active' 
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300' 
                : 'bg-amber-50 text-amber-900 border border-amber-300'
            }`}>
              <div className="flex items-center gap-2">
                {searchResult.status === 'active' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <span>{searchResult.message}</span>
              </div>
              <button
                onClick={searchResult.status === 'active' ? onOpenQuote : onOpenResidentModal}
                className="text-xs underline font-extrabold shrink-0 hover:opacity-80"
              >
                {searchResult.status === 'active' ? 'Request HOA Quote' : 'Request Expansion'}
              </button>
            </div>
          )}
        </div>

        {/* Interactive Valley Map & City Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Interactive Map Graphic & Selected City Card */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-800 shadow-2xl relative overflow-hidden">
            
            {/* Arizona Map Visual Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-sm uppercase tracking-wider text-white">Phoenix Metro Service Zone</span>
              </div>
              <span className="text-xs bg-emerald-900 text-emerald-200 px-2.5 py-1 rounded-full font-bold">
                14+ Cities Active
              </span>
            </div>

            {/* Stylized Phoenix Valley Map Representation */}
            <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 relative mb-6">
              <div className="text-center space-y-1 mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">MARICOPA & PINAL COUNTIES</p>
                <p className="text-sm font-semibold text-gray-300">Click any city badge below to view coverage</p>
              </div>

              {/* City Map Badges Cluster */}
              <div className="flex flex-wrap gap-2 justify-center py-4">
                {ARIZONA_CITIES.map((city) => {
                  const isSelected = selectedCity?.name === city.name;
                  return (
                    <button
                      key={city.name}
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-forest text-white border-2 border-emerald-400 shadow-lg scale-105'
                          : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-emerald-600 hover:text-white'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${city.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      <span>{city.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details for Currently Selected City */}
            {selectedCity && (
              <div className="bg-forest-dark border border-emerald-700/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-white font-outfit">
                    {selectedCity.name}, AZ
                  </h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                    selectedCity.status === 'Active' ? 'bg-emerald-900 text-emerald-200 border border-emerald-600' : 'bg-amber-900 text-amber-200 border border-amber-600'
                  }`}>
                    {selectedCity.status} Service
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {selectedCity.description}
                </p>

                <div className="pt-2 border-t border-emerald-900/80">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    Featured HOA Neighborhoods:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCity.popularCommunities.map((comm) => (
                      <span key={comm} className="text-[11px] bg-gray-900 text-gray-200 px-2 py-0.5 rounded border border-gray-800">
                        {comm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Full City List Cards Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ARIZONA_CITIES.map((city) => (
                <div 
                  key={city.name}
                  onClick={() => setSelectedCity(city)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all text-left ${
                    selectedCity?.name === city.name 
                      ? 'bg-forest text-white border-forest shadow-md' 
                      : 'bg-slate-50 hover:bg-slate-100 text-gray-900 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm font-outfit">{city.name}</span>
                    <span className={`w-2 h-2 rounded-full ${city.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  </div>
                  <p className={`text-[11px] line-clamp-1 ${selectedCity?.name === city.name ? 'text-emerald-100' : 'text-gray-500'}`}>
                    {city.county} County
                  </p>
                </div>
              ))}
            </div>

            {/* Expansion Callout Footer */}
            <div className="mt-8 bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-3">
              <p className="font-extrabold text-gray-900 text-lg">
                “Don’t see your community? Contact us — we’re expanding throughout the Valley.”
              </p>
              <p className="text-xs text-gray-600">
                We onboard new Phoenix, East Valley, and West Valley HOA communities every week.
              </p>
              <div className="flex justify-center gap-3 pt-1">
                <button
                  onClick={onOpenQuote}
                  className="px-5 py-2.5 bg-forest hover:bg-forest-light text-white text-xs font-bold rounded-lg shadow"
                >
                  Request HOA Quote
                </button>
                <button
                  onClick={onOpenResidentModal}
                  className="px-5 py-2.5 bg-white text-gray-800 border border-gray-300 text-xs font-bold rounded-lg hover:bg-gray-50"
                >
                  Resident Expansion Signup
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
