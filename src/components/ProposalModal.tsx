import React from 'react';
import { X, CheckCircle2, Building2, ShieldCheck, Download, Printer, Phone } from 'lucide-react';

interface ProposalModalProps {
  isOpen: boolean;
  logoUrl: string;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, logoUrl, onClose, onOpenQuote }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <div className="w-14 h-14 bg-white p-0.5 rounded-xl shrink-0 border border-emerald-300">
              <img 
                src={logoUrl} 
                alt="Gunny's Garbage Squad" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-forest tracking-widest uppercase block">
                HOA BOARD PRESENTATION BRIEF
              </span>
              <h3 className="text-2xl font-black text-gray-900 font-outfit">
                Gunny’s Garbage Squad — Valet Service Proposal
              </h3>
            </div>
          </div>

          {/* Proposal Highlights */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-gray-200 space-y-4">
            <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <Building2 className="w-5 h-5 text-forest" />
              <span>Summary for HOA Board & Community Managers</span>
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Gunny’s Garbage Squad provides a full-service trash and recycling bin valet amenity for master-planned communities, gated neighborhoods, and active adult subdivisions throughout the Phoenix Valley.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-gray-800 pt-2">
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero resident effort on trash day</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cleaner streets & uniform bin placement</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Background-checked, insured staff</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>$7.25/wk (1x) or $9.75/wk (twice weekly)</span>
              </div>
            </div>

            {/* Board Rate Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-forest text-white p-4 rounded-xl border border-emerald-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Once-Weekly Plan</p>
                <p className="text-xl font-black font-outfit text-white">$7.25 <span className="text-xs font-normal text-emerald-200">/ home / week</span></p>
                <p className="text-[11px] text-emerald-200 mt-1">1 pickup day/week for trash & recycling</p>
              </div>

              <div className="bg-forest-dark text-white p-4 rounded-xl border border-emerald-700">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Twice-Weekly Plan</p>
                <p className="text-xl font-black font-outfit text-white">$9.75 <span className="text-xs font-normal text-emerald-200">/ home / week</span></p>
                <p className="text-[11px] text-emerald-200 mt-1">2 pickup days/week for active communities</p>
              </div>
            </div>
          </div>

          {/* Steps for Board Approval */}
          <div className="space-y-2">
            <h5 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 font-outfit">
              3 Steps to Implementation
            </h5>
            <ol className="list-decimal list-inside text-xs text-gray-600 space-y-1.5 pl-1">
              <li><strong>Walkthrough & Proposal:</strong> Gunny’s completes a quick community perimeter review.</li>
              <li><strong>Resident Onboarding:</strong> We provide intro packets, gate coordination, and schedule guides.</li>
              <li><strong>Launch:</strong> Uniformed squad begins weekly trash-can valet operations.</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={() => window.print()}
              className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border border-gray-300"
            >
              <Printer className="w-4 h-4" />
              <span>Print Brief for Board Meeting</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="px-6 py-3 bg-forest hover:bg-forest-light text-white text-xs font-extrabold rounded-xl shadow border border-emerald-900 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Request Full Customized Proposal</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
