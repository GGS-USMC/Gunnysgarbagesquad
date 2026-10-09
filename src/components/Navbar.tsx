import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ShieldCheck, ChevronRight, Award, Mail } from 'lucide-react';

interface NavbarProps {
  logoUrl: string;
  onOpenQuote: () => void;
  onOpenResidentModal: () => void;
  onOpenAdminEmailLogs?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ logoUrl, onOpenQuote, onOpenResidentModal, onOpenAdminEmailLogs }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-200">
      {/* Top Banner */}
      <div className="bg-forest-dark text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded font-semibold text-[11px] uppercase tracking-wider">
              <Award className="w-3 h-3" /> Veteran & Family Owned
            </span>
            <span className="hidden sm:inline text-gray-300">
              Serving Phoenix, Scottsdale, Mesa, Gilbert, Chandler & Surrounding Valley Communities
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-200 font-medium ml-auto">
            {onOpenAdminEmailLogs && (
              <button 
                onClick={onOpenAdminEmailLogs}
                className="hidden md:inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-2.5 py-0.5 rounded text-[11px] font-bold border border-emerald-600 transition-colors cursor-pointer"
                title="View incoming quote sign-ups and dispatched email alerts"
              >
                <Mail className="w-3 h-3 text-emerald-300" />
                <span>Email Alert Hub</span>
              </button>
            )}
            <a href="tel:6077672852" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>(607) 767-2852</span>
            </a>
            <button 
              onClick={onOpenResidentModal}
              className="text-xs text-emerald-300 hover:text-white underline underline-offset-2 hidden md:inline cursor-pointer"
            >
              Homeowner Sign-up
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white border-b transition-all duration-200 ${
        scrolled ? 'shadow-md border-gray-200 py-2.5' : 'border-gray-100 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-white p-0.5 shadow-sm flex items-center justify-center overflow-hidden border border-emerald-300">
              <img 
                src={logoUrl} 
                alt="Gunny's Garbage Squad Logo" 
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-gray-900 block leading-tight font-outfit">
                GUNNY'S <span className="text-forest">GARBAGE SQUAD</span>
              </span>
              <span className="text-[11px] font-bold tracking-widest text-emerald-800 uppercase block">
                HOA TRASH-CAN VALET SERVICES
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <a href="#how-it-works" className="hover:text-forest transition-colors">How It Works</a>
            <a href="#for-hoas" className="hover:text-forest transition-colors">For HOA Boards</a>
            <a href="#why-gunnys" className="hover:text-forest transition-colors">Why Gunny's</a>
            <a href="#service-area" className="hover:text-forest transition-colors">Service Area</a>
            <a href="#quote-section" className="hover:text-forest transition-colors">Pricing ($7.25/Wk)</a>
            <a href="#faq" className="hover:text-forest transition-colors">FAQ</a>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenResidentModal}
              className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition-all"
            >
              Resident Lookup
            </button>
            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 text-sm font-bold text-white bg-forest hover:bg-forest-light rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-emerald-900"
            >
              <span>Get HOA Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-forest rounded shadow"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-forest hover:bg-gray-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-forest"
            >
              How It Works
            </a>
            <a 
              href="#for-hoas" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-forest"
            >
              For HOA Boards & Communities
            </a>
            <a 
              href="#why-gunnys" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-forest"
            >
              Why Gunny's Garbage Squad
            </a>
            <a 
              href="#service-area" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-forest"
            >
              Phoenix Valley Service Area
            </a>
            <a 
              href="#quote-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-forest"
            >
              HOA Pricing ($7.25 / Week)
            </a>
            <a 
              href="#residents" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-forest"
            >
              For Homeowners & Residents
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-forest"
            >
              Frequently Asked Questions
            </a>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 text-center text-sm font-bold text-white bg-forest hover:bg-forest-light rounded-lg shadow"
              >
                Request HOA Service
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResidentModal();
                }}
                className="w-full py-3 text-center text-sm font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300"
              >
                Resident "Bring Gunny's to My HOA"
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
