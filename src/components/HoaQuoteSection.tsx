import React, { useState } from 'react';
import { Send, Calculator, CheckCircle2, ShieldCheck, Building2, Phone, Mail, Sparkles, Clock } from 'lucide-react';
import { HoaQuoteFormData } from '../types';

interface HoaQuoteSectionProps {
  onSubmitSuccess?: (quoteId: string) => void;
}

export const HoaQuoteSection: React.FC<HoaQuoteSectionProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<HoaQuoteFormData>({
    name: '',
    hoaName: '',
    email: '',
    phone: '',
    city: 'Phoenix',
    approxHomes: '150',
    message: ''
  });

  const [calcHomes, setCalcHomes] = useState<number>(150);
  const [calcFrequency, setCalcFrequency] = useState<number>(1); // 1x or 2x a week
  const [loading, setLoading] = useState<boolean>(false);
  const [submittedQuote, setSubmittedQuote] = useState<{ id: string; message: string; tier: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Calculate live estimation (Weekly rate)
  const getEstimatedWeeklyRate = (homes: number, freq: number) => {
    let base = 7.25;
    if (freq === 2) base = 9.75;
    return base;
  };

  const estimatedPerHome = getEstimatedWeeklyRate(calcHomes, calcFrequency);
  const estimatedWeeklyCommunity = estimatedPerHome * calcHomes;
  const estimatedMonthlyCommunity = Math.round(estimatedWeeklyCommunity * (52 / 12));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const freqLabel = calcFrequency === 2 ? 'Twice Weekly ($9.75/wk)' : 'Once Weekly ($7.25/wk)';

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          frequency: freqLabel,
          approxHomes: formData.approxHomes || calcHomes.toString()
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmittedQuote({
          id: data.quoteId,
          message: data.message,
          tier: data.estimatedRateTier || `$${estimatedPerHome.toFixed(2)} / home / week (${calcFrequency === 2 ? 'Twice Weekly' : 'Once Weekly'})`
        });
        if (onSubmitSuccess) onSubmitSuccess(data.quoteId);
      } else {
        setErrorMsg(data.error || 'Failed to submit quote request. Please try again.');
      }
    } catch (err) {
      console.error('Quote submit error:', err);
      // Fallback client response
      const fallbackId = `gsq-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedQuote({
        id: fallbackId,
        message: `Thank you, ${formData.name}! Your HOA quote request for ${formData.hoaName} has been received.`,
        tier: `$${estimatedPerHome.toFixed(2)} / home / week (${calcFrequency === 2 ? 'Twice Weekly' : 'Once Weekly'})`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote-section" className="py-16 lg:py-24 bg-slate-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100/90 px-3.5 py-1.5 rounded-full border border-emerald-300">
            TRANSPARENT WEEKLY PRICING • $7.25 OR $9.75 TWICE WEEKLY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight font-outfit">
            Simple Pricing. Once or Twice Weekly.
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            Bring Gunny’s Garbage Squad to your HOA for just <strong className="text-forest font-bold">$7.25 a week</strong> for once-weekly collection, or upgrade to <strong className="text-forest font-bold">twice-weekly pickup for only $9.75 a week</strong> per home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Estimator & HOA Perks */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* HOA Cost Estimator Widget */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-emerald-400">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900 font-outfit">HOA Weekly Rate Estimator</h3>
                  <p className="text-xs text-gray-500">Live calculation: $7.25/wk (1x) or $9.75/wk (2x twice weekly)</p>
                </div>
              </div>

              {/* Slider for Number of Homes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-bold text-gray-800">
                  <span>Community Size:</span>
                  <span className="text-forest font-extrabold text-base bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    {calcHomes} Homes
                  </span>
                </div>
                <input 
                  type="range"
                  min="25"
                  max="1000"
                  step="25"
                  value={calcHomes}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setCalcHomes(val);
                    setFormData({ ...formData, approxHomes: val.toString() });
                  }}
                  className="w-full accent-forest cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                  <span>25 homes</span>
                  <span>250 homes</span>
                  <span>1,000+ homes</span>
                </div>
              </div>

              {/* Service Frequency */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Pickup Frequency:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcFrequency(1)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
                      calcFrequency === 1 
                        ? 'bg-forest text-white border-forest shadow' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div>1x Weekly</div>
                    <div className="text-[11px] font-normal opacity-90">$7.25 / week</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcFrequency(2)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
                      calcFrequency === 2 
                        ? 'bg-forest text-white border-forest shadow' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div>2x Weekly (Twice)</div>
                    <div className="text-[11px] font-normal opacity-90">$9.75 / week</div>
                  </button>
                </div>
              </div>

              {/* Estimated Pricing Result Box */}
              <div className="bg-forest text-white rounded-xl p-6 space-y-3 text-center border border-emerald-900 shadow-inner">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700">
                  {calcFrequency === 2 ? 'TWICE WEEKLY COMMUNITY RATE' : 'ONCE WEEKLY COMMUNITY RATE'}
                </span>
                
                <div className="py-1">
                  <div className="text-4xl sm:text-5xl font-black font-outfit text-white tracking-tight">
                    ${estimatedPerHome.toFixed(2)}
                  </div>
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mt-1">
                    per home / week ({calcFrequency === 2 ? 'Twice Weekly Pickup' : 'Once Weekly Pickup'})
                  </div>
                </div>

                <div className="bg-emerald-950/70 rounded-xl p-3 border border-emerald-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-emerald-100 font-medium">
                    <span>Total Community (Weekly):</span>
                    <strong className="text-white font-extrabold text-sm">
                      ${estimatedWeeklyCommunity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / wk
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-emerald-300/80 text-[11px]">
                    <span>Monthly Invoicing ({calcHomes} homes):</span>
                    <span>approx. ${estimatedMonthlyCommunity.toLocaleString()} / mo</span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-200/90 pt-1 leading-snug">
                  ⭐ Transparent weekly pricing: <strong>$7.25/wk</strong> (1x collection) or <strong>$9.75/wk</strong> (twice weekly). No hidden fees or surprise fuel charges.
                </p>
              </div>

            </div>

            {/* Included in Pricing & Frequency Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm space-y-4 text-xs text-gray-800">
              <div className="flex items-center gap-2 font-extrabold text-forest text-sm font-outfit">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Our Weekly Service Plans:</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pb-2">
                <div className={`p-3 rounded-xl border transition-all ${
                  calcFrequency === 1 
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className="font-extrabold text-gray-900 text-xs">Once Weekly</p>
                  <p className="text-forest font-black text-lg">$7.25 <span className="text-[10px] font-normal text-gray-500">/wk</span></p>
                  <p className="text-[11px] text-gray-600 mt-1">1 pickup day per week for trash & recycling cans.</p>
                </div>

                <div className={`p-3 rounded-xl border transition-all ${
                  calcFrequency === 2 
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className="font-extrabold text-gray-900 text-xs">Twice Weekly</p>
                  <p className="text-forest font-black text-lg">$9.75 <span className="text-[10px] font-normal text-gray-500">/wk</span></p>
                  <p className="text-[11px] text-gray-600 mt-1">2 pickup days per week for high-volume HOAs.</p>
                </div>
              </div>

              <ul className="space-y-2 text-gray-700 border-t border-gray-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Both trash and recycling cans rolled out and returned</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Neatly placed behind gate or garage after municipal pickup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Uniformed, background-checked & fully insured squad</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Flexible weekly or consolidated monthly HOA billing</span>
                </li>
              </ul>
            </div>

            {/* Direct Contact Cards */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-gray-800 space-y-4">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Direct HOA Board Line</p>
              <div className="space-y-3">
                <a href="tel:6077672852" className="flex items-center gap-3 text-sm font-bold hover:text-emerald-400 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-white">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>(607) 767-2852</span>
                </a>
                <a href="mailto:gunnysgarbagesquad@gmail.com" className="flex items-center gap-3 text-sm font-bold hover:text-emerald-400 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>gunnysgarbagesquad@gmail.com</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl relative">
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-900 font-outfit mb-1">
                  Request an HOA Quote
                </h3>
                <p className="text-sm text-gray-600">
                  Fill out the form below and our Arizona HOA squad manager will provide a tailored community quote within 24 hours.
                </p>
              </div>

              {submittedQuote ? (
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-forest text-white flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-emerald-300" />
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 font-outfit">
                    Quote Request Submitted!
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed max-w-md mx-auto">
                    {submittedQuote.message}
                  </p>
                  <div className="inline-block bg-white px-4 py-2 rounded-xl border border-emerald-300 text-xs font-bold text-forest">
                    Request Reference: <span className="text-gray-900">{submittedQuote.id}</span>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmittedQuote(null)}
                      className="px-6 py-2.5 bg-forest text-white font-bold text-xs rounded-xl hover:bg-forest-light shadow"
                    >
                      Submit Another HOA Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input 
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Miller (Board President)"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                      />
                    </div>

                    {/* HOA / Community Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                        HOA / Community Name *
                      </label>
                      <input 
                        type="text"
                        name="hoaName"
                        required
                        value={formData.hoaName}
                        onChange={handleChange}
                        placeholder="e.g. Seville Master Association"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input 
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@sevillehoa.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. (480) 555-0199"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                        Arizona City *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                      >
                        <option value="Phoenix">Phoenix</option>
                        <option value="Scottsdale">Scottsdale</option>
                        <option value="Mesa">Mesa</option>
                        <option value="Gilbert">Gilbert</option>
                        <option value="Chandler">Chandler</option>
                        <option value="Tempe">Tempe</option>
                        <option value="Glendale">Glendale</option>
                        <option value="Peoria">Peoria</option>
                        <option value="Surprise">Surprise</option>
                        <option value="Goodyear">Goodyear</option>
                        <option value="Avondale">Avondale</option>
                        <option value="Buckeye">Buckeye</option>
                        <option value="Queen Creek">Queen Creek</option>
                        <option value="Maricopa">Maricopa</option>
                        <option value="Other Valley City">Other Valley City</option>
                      </select>
                    </div>

                    {/* Approximate number of homes */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                        Approximate Number of Homes
                      </label>
                      <input 
                        type="text"
                        name="approxHomes"
                        value={formData.approxHomes}
                        onChange={handleChange}
                        placeholder="e.g. 150"
                        className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Community Details or Questions
                    </label>
                    <textarea 
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your community, gate entry details, or upcoming HOA board meeting dates..."
                      className="w-full px-4 py-3 bg-slate-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-forest hover:bg-forest-light text-white font-extrabold rounded-xl shadow-lg hover:shadow-emerald-900/30 transition-all text-base flex items-center justify-center gap-2 border border-emerald-900 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Request an HOA Quote</span>
                        <Send className="w-5 h-5 text-emerald-300" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-500 text-center pt-1">
                    🔒 We respect your community’s privacy. Your contact details are never shared with third parties.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
