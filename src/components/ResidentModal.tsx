import React, { useState } from 'react';
import { X, Search, CheckCircle2, Home, MapPin, Send } from 'lucide-react';
import { ARIZONA_CITIES } from '../data/hoaData';

interface ResidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ResidentModal: React.FC<ResidentModalProps> = ({ isOpen, onClose, onOpenQuote }) => {
  const [zipOrCity, setZipOrCity] = useState('');
  const [statusResult, setStatusResult] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [community, setCommunity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipOrCity.trim()) return;
    const query = zipOrCity.toLowerCase();
    const isFound = ARIZONA_CITIES.some(c => 
      c.name.toLowerCase().includes(query) || 
      c.zipCodes.some(z => z.includes(query))
    );

    if (isFound) {
      setStatusResult(`Good news! Gunny’s Garbage Squad operates in your area (${zipOrCity.toUpperCase()}).`);
    } else {
      setStatusResult(`We are expanding near ${zipOrCity.toUpperCase()}! Nominate your community below.`);
    }
  };

  const handleNominate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/resident-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          residentName: name,
          communityName: community,
          email,
          city: zipOrCity || 'Phoenix Valley'
        })
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-gray-200 p-6 sm:p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-5">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900 font-outfit">
                Homeowner Service Lookup
              </h3>
              <p className="text-xs text-gray-500">Check if Gunny’s serves your HOA community</p>
            </div>
          </div>

          {/* Quick Search */}
          <form onSubmit={handleCheck} className="flex gap-2">
            <input 
              type="text"
              value={zipOrCity}
              onChange={(e) => setZipOrCity(e.target.value)}
              placeholder="Enter City or Zip Code (e.g. 85255)..."
              className="flex-1 px-4 py-2.5 bg-slate-100 border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-forest text-white text-xs font-bold rounded-xl hover:bg-forest-light shrink-0"
            >
              Check
            </button>
          </form>

          {statusResult && (
            <div className="p-3 bg-emerald-50 text-emerald-900 text-xs font-semibold rounded-xl border border-emerald-200">
              {statusResult}
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Nominate Your Community
            </p>
            
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-xs text-emerald-900">Request Sent!</p>
                <p className="text-[11px] text-gray-600">We will present Gunny’s valet amenity to your HOA board.</p>
              </div>
            ) : (
              <form onSubmit={handleNominate} className="space-y-3">
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs"
                />
                <input 
                  type="text"
                  required
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  placeholder="HOA Community Name (e.g. Las Sendas HOA)"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs"
                />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-forest text-white font-bold text-xs rounded-xl hover:bg-forest-light shadow"
                >
                  Submit HOA Nomination
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
