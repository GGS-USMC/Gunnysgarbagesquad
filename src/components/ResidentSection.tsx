import React, { useState } from 'react';
import { Home, Sparkles, CheckCircle2, UserCheck, ArrowRight, Send, Heart, MapPin } from 'lucide-react';
import { ResidentRequestFormData } from '../types';

interface ResidentSectionProps {
  onOpenQuote: () => void;
}

export const ResidentSection: React.FC<ResidentSectionProps> = ({ onOpenQuote }) => {
  const [showNominateForm, setShowNominateForm] = useState(false);
  const [formData, setFormData] = useState<ResidentRequestFormData>({
    residentName: '',
    communityName: '',
    email: '',
    phone: '',
    city: 'Scottsdale',
    zipCode: '',
    hoaBoardContact: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/resident-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="residents" className="py-16 lg:py-24 bg-white border-b border-gray-200 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-forest via-forest-dark to-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-emerald-800">
          
          {/* Subtle Background Accent */}
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/90 px-3.5 py-1.5 rounded-full border border-emerald-700">
                <Home className="w-4 h-4 text-emerald-400" /> FOR HOMEOWNERS & RESIDENTS
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-outfit text-white">
                Your Trash Day Just Got Easier.
              </h2>

              <p className="text-gray-200 text-base sm:text-xl font-normal leading-relaxed">
                No more dragging heavy trash cans across the driveway. No more remembering to bring them back in. Gunny’s handles it for you for just <strong className="text-white">$7.25 a week</strong>.
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2 text-sm sm:text-base text-emerald-100 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Never rush out at 6:00 AM in your pajamas to catch the trash truck.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Avoid summer heat, heavy bin lifting, and driveway scuffs.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/50">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Affordable rates: $7.25/week (once-weekly) or $9.75/week (twice-weekly).</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onOpenQuote}
                  className="px-7 py-4 bg-white text-gray-900 font-extrabold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-base flex items-center justify-center gap-2"
                >
                  <span>Get a Quote ($7.25/Wk)</span>
                  <ArrowRight className="w-5 h-5 text-forest" />
                </button>

                <button
                  onClick={() => setShowNominateForm(!showNominateForm)}
                  className="px-6 py-4 bg-emerald-900/80 hover:bg-emerald-900 text-emerald-100 font-bold rounded-xl border border-emerald-600 transition-all text-base flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 text-emerald-400" />
                  <span>{showNominateForm ? 'Hide Form' : 'Nominate My HOA Community'}</span>
                </button>
              </div>

            </div>

            {/* Right Interactive Box / Nomination Form */}
            <div className="lg:col-span-5">
              <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-emerald-300">
                <h3 className="text-xl font-extrabold font-outfit mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  Want Gunny's in Your HOA?
                </h3>
                <p className="text-xs text-gray-600 mb-6">
                  Fill out this quick form and we’ll reach out to your HOA board with an official amenity presentation!
                </p>

                {submitted ? (
                  <div className="bg-emerald-50 p-6 rounded-xl text-center space-y-3 border border-emerald-300">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-extrabold text-lg text-forest font-outfit">Request Logged!</h4>
                    <p className="text-xs text-gray-700">
                      We’ve logged your request for {formData.communityName || 'your HOA'}. Our squad will contact your community management team!
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-emerald-800 font-bold underline pt-2"
                    >
                      Submit for another community
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.residentName}
                        onChange={(e) => setFormData({ ...formData, residentName: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                        HOA Community Name *
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.communityName}
                        onChange={(e) => setFormData({ ...formData, communityName: e.target.value })}
                        placeholder="e.g. Vistancia Master Association"
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Email *
                        </label>
                        <input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. sarah@gmail.com"
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                          City
                        </label>
                        <input 
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Peoria"
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-forest hover:bg-forest-light text-white font-bold rounded-lg shadow text-xs flex items-center justify-center gap-2 border border-emerald-900"
                    >
                      {loading ? 'Submitting...' : 'Bring Gunny’s To My Community'}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
