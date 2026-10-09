import React from 'react';
import { Phone, Mail, MapPin, Award, Shield, ArrowUp, ChevronRight } from 'lucide-react';

interface FooterProps {
  logoUrl: string;
  onOpenQuote: () => void;
  onOpenResidentModal: () => void;
  onOpenAdminEmailLogs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl, onOpenQuote, onOpenResidentModal, onOpenAdminEmailLogs }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-gray-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-0.5 border border-emerald-400 flex items-center justify-center shrink-0">
                <img 
                  src={logoUrl} 
                  alt="Gunny's Garbage Squad Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white block leading-tight font-outfit">
                  GUNNY'S <span className="text-emerald-400">GARBAGE SQUAD</span>
                </span>
                <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase block">
                  HOA TRASH-CAN VALET SERVICES
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Gunny’s Garbage Squad provides reliable, professional trash-can valet service for HOA communities throughout the Phoenix Valley and surrounding Arizona cities.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Veteran & Family Owned • Local Arizona Business</span>
              </div>

              {onOpenAdminEmailLogs && (
                <button
                  onClick={onOpenAdminEmailLogs}
                  className="inline-flex items-center gap-1.5 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700 text-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Lead & Email Hub (gunnysgarbagesquad@gmail.com)</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Navigation</p>
            <ul className="space-y-2 text-sm text-gray-300 font-medium">
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#for-hoas" className="hover:text-emerald-400 transition-colors">For HOA Boards & Managers</a></li>
              <li><a href="#why-gunnys" className="hover:text-emerald-400 transition-colors">Why Gunny’s Garbage Squad</a></li>
              <li><a href="#service-area" className="hover:text-emerald-400 transition-colors">Phoenix Valley Service Area</a></li>
              <li><a href="#quote-section" className="hover:text-emerald-400 transition-colors">HOA Pricing ($7.25 / Week)</a></li>
              <li><a href="#residents" className="hover:text-emerald-400 transition-colors">For Homeowners & Residents</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Contact Gunny’s</p>
            <div className="space-y-3 text-sm text-gray-300">
              <a href="tel:6077672852" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                <div className="w-8 h-8 rounded bg-forest flex items-center justify-center text-emerald-300 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>(607) 767-2852</span>
              </a>

              <a href="mailto:gunnysgarbagesquad@gmail.com" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                <div className="w-8 h-8 rounded bg-forest flex items-center justify-center text-emerald-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>gunnysgarbagesquad@gmail.com</span>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-forest flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs">Phoenix Valley Headquarters</p>
                  <p className="text-xs text-gray-400">Serving Phoenix, Scottsdale, Mesa, Gilbert, Chandler, Glendale, Peoria, Surprise, Goodyear & All Valley HOAs</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={onOpenQuote}
                className="px-4 py-2 bg-forest hover:bg-forest-light text-white text-xs font-bold rounded-lg shadow border border-emerald-600"
              >
                Request HOA Quote
              </button>
              <button
                onClick={onOpenResidentModal}
                className="px-4 py-2 bg-gray-900 text-gray-300 hover:text-white border border-gray-800 text-xs font-bold rounded-lg"
              >
                Resident Lookup
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Gunny’s Garbage Squad LLC. All rights reserved. Serving Phoenix Metro & Surrounding Arizona Communities.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-emerald-400 font-bold transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
