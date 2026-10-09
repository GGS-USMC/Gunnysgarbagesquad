import React, { useState } from 'react';
import { Truck, Trash2, RotateCcw, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/hoaData';

interface HowItWorksProps {
  onOpenQuote: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenQuote }) => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck': return <Truck className="w-8 h-8 text-emerald-400" />;
      case 'Trash2': return <Trash2 className="w-8 h-8 text-emerald-400" />;
      case 'RotateCcw': return <RotateCcw className="w-8 h-8 text-emerald-400" />;
      default: return <Truck className="w-8 h-8 text-emerald-400" />;
    }
  };

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            SIMPLE & SEAMLESS 3-STEP PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight font-outfit">
            We Handle the Heavy Lifting.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            From side garage walkways to the curb and back, Gunny’s Garbage Squad takes complete care of trash day for your entire HOA community.
          </p>
        </div>

        {/* 3 Step Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl p-8 transition-all duration-300 relative border flex flex-col justify-between ${
                  isActive
                    ? 'bg-forest text-white border-forest shadow-xl scale-[1.02] ring-2 ring-emerald-500/50'
                    : 'bg-slate-50 text-gray-900 border-gray-200 hover:border-emerald-300 hover:bg-slate-100 shadow-sm'
                }`}
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${
                    isActive ? 'bg-forest-dark border-emerald-500/60' : 'bg-emerald-100/80 border-emerald-200'
                  }`}>
                    {getStepIcon(step.icon)}
                  </div>
                  <span className={`text-2xl font-extrabold font-outfit tracking-widest ${
                    isActive ? 'text-emerald-300' : 'text-gray-400'
                  }`}>
                    STEP {step.stepNumber}
                  </span>
                </div>

                {/* Step Content */}
                <div className="space-y-3">
                  <h3 className={`text-2xl font-bold font-outfit ${isActive ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${
                    isActive ? 'text-emerald-100' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>

                {/* Detail Box */}
                <div className={`mt-6 pt-4 border-t text-xs font-semibold flex items-center gap-2 ${
                  isActive ? 'border-emerald-700/80 text-emerald-200' : 'border-gray-200 text-gray-500'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-700'}`} />
                  <span>{step.detail}</span>
                </div>

              </div>
            );
          })}

        </div>

        {/* Process Guarantee Banner */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-900 shadow-md">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg text-white">100% Reliable HOA Service Guarantee</p>
              <p className="text-xs sm:text-sm text-gray-300">
                Our squad never misses a scheduled run. Bins are always handled with care and returned neatly.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenQuote}
            className="shrink-0 px-6 py-3 bg-forest hover:bg-forest-light text-white font-bold rounded-xl shadow transition-all text-sm flex items-center gap-2 border border-emerald-600"
          >
            <span>Setup Service for Your HOA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
