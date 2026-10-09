import React, { useState } from 'react';
import { 
  Building2, CheckCircle2, ShieldCheck, Smile, Sparkles, Clock, 
  HeartHandshake, MapPin, ArrowRight, Download, FileText, ChevronRight 
} from 'lucide-react';
import { HOA_BENEFITS } from '../data/hoaData';

interface HoaSectionProps {
  onOpenQuote: () => void;
  onOpenProposalModal: () => void;
}

export const HoaSection: React.FC<HoaSectionProps> = ({ onOpenQuote, onOpenProposalModal }) => {
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile': return <Smile className="w-6 h-6 text-emerald-700" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-emerald-700" />;
      case 'Clock': return <Clock className="w-6 h-6 text-emerald-700" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-700" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-emerald-700" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-emerald-700" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-emerald-700" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-emerald-700" />;
      default: return <CheckCircle2 className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section id="for-hoas" className="py-16 lg:py-24 bg-slate-50 border-b border-gray-200 relative overflow-hidden">
      
      {/* Decorative Brand Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Section Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-300">
            <Building2 className="w-4 h-4 text-emerald-800" /> FOR HOA BOARDS & COMMUNITY MANAGERS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight font-outfit">
            A Better Amenity for Your Community.
          </h2>
          <p className="text-gray-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
            Gunny’s Garbage Squad helps HOA communities keep trash-can day organized, convenient, and looking cleaner. Our valet service gives residents one less chore to worry about while providing HOAs with a professional, reliable service their residents can appreciate.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {HOA_BENEFITS.map((benefit) => (
            <div 
              key={benefit.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-emerald-500"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 group-hover:bg-forest group-hover:text-white transition-colors">
                  {getBenefitIcon(benefit.iconName)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-outfit mb-2 group-hover:text-forest transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>HOA Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-900 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-4xl font-extrabold font-outfit">
              Ready to Upgrade Your HOA’s Neighborhood Amenity?
            </h3>
            <p className="text-emerald-100 text-base sm:text-lg">
              We work directly with HOA board members, property managers, and community leaders to present customized trash valet service agreements for communities of all sizes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-8 py-4 bg-white text-forest font-extrabold rounded-xl shadow-lg hover:bg-gray-100 transition-all text-base flex items-center justify-center gap-2"
              >
                <span>Bring Gunny’s to Your HOA</span>
                <ArrowRight className="w-5 h-5 text-forest" />
              </button>

              <button
                onClick={onOpenProposalModal}
                className="w-full sm:w-auto px-6 py-4 bg-forest-dark hover:bg-emerald-950 text-emerald-200 font-bold rounded-xl border border-emerald-600/60 transition-all text-base flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5 text-emerald-400" />
                <span>View HOA Board Pitch Deck</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
