import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Building2, Users, Settings } from 'lucide-react';
import { FAQ_ITEMS } from '../data/hoaData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'All' | 'HOA Boards' | 'Residents' | 'Operations'>('All');

  const filteredFaqs = activeCategory === 'All' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-300">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight font-outfit">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Everything you need to know about Gunny’s Garbage Squad HOA valet operations and contracts.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(['All', 'HOA Boards', 'Residents', 'Operations'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIdx(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-forest text-white shadow'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={faq.question}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-gray-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1 rounded-md shrink-0">
                      {faq.category}
                    </span>
                    <span className="font-extrabold text-gray-900 text-base sm:text-lg font-outfit">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gray-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-forest" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-gray-100 bg-emerald-50/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
