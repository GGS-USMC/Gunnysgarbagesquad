import React from 'react';
import { CalendarCheck, ThumbsUp, Sun, BadgeCheck, Users, Award, Shield, Check } from 'lucide-react';
import { WHY_GUNNYS_CARDS } from '../data/hoaData';

interface WhyGunnysProps {
  onOpenQuote: () => void;
}

export const WhyGunnys: React.FC<WhyGunnysProps> = ({ onOpenQuote }) => {
  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'CalendarCheck': return <CalendarCheck className="w-7 h-7 text-emerald-400" />;
      case 'ThumbsUp': return <ThumbsUp className="w-7 h-7 text-emerald-400" />;
      case 'Sun': return <Sun className="w-7 h-7 text-emerald-400" />;
      case 'BadgeCheck': return <BadgeCheck className="w-7 h-7 text-emerald-400" />;
      case 'Users': return <Users className="w-7 h-7 text-emerald-400" />;
      case 'Award': return <Award className="w-7 h-7 text-amber-400" />;
      default: return <Shield className="w-7 h-7 text-emerald-400" />;
    }
  };

  return (
    <section id="why-gunnys" className="py-16 lg:py-24 bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800">
            LOCAL ARIZONA COMMITMENT & EXCELLENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-outfit text-white">
            Why Gunny’s Garbage Squad?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Built on reliability, respect, and local pride — we treat every neighborhood like our own home.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_GUNNYS_CARDS.map((card) => {
            const isVeteranCard = card.badge !== undefined;
            return (
              <div 
                key={card.id}
                className={`rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between border relative overflow-hidden ${
                  isVeteranCard
                    ? 'bg-gradient-to-br from-gray-900 via-forest-dark to-slate-900 border-amber-500/60 shadow-xl ring-1 ring-amber-500/30'
                    : 'bg-gray-950/80 hover:bg-gray-800/90 border-gray-800 hover:border-emerald-600/60 shadow-md'
                }`}
              >
                {/* Special Veteran Badge */}
                {card.badge && (
                  <div className="absolute top-4 right-4 bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{card.badge}</span>
                  </div>
                )}

                <div>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border ${
                    isVeteranCard ? 'bg-amber-950/60 border-amber-500/50' : 'bg-forest border-emerald-700/80'
                  }`}>
                    {getCardIcon(card.iconName)}
                  </div>

                  <h3 className="text-2xl font-bold font-outfit text-white mb-3">
                    {card.title}
                  </h3>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Gunny’s Quality Promise</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenQuote}
            className="px-8 py-4 bg-forest hover:bg-forest-light text-white font-extrabold rounded-xl shadow-xl transition-all text-base border border-emerald-500 inline-flex items-center gap-3"
          >
            <span>Get Started with Gunny's</span>
            <Shield className="w-5 h-5 text-emerald-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
