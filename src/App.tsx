import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { HoaSection } from './components/HoaSection';
import { WhyGunnys } from './components/WhyGunnys';
import { ServiceArea } from './components/ServiceArea';
import { HoaQuoteSection } from './components/HoaQuoteSection';
import { ResidentSection } from './components/ResidentSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProposalModal } from './components/ProposalModal';
import { ResidentModal } from './components/ResidentModal';
import { AdminEmailLogsModal } from './components/AdminEmailLogsModal';

import logoImg from './assets/images/gunnys_user_logo_1786424630848.jpg';
import heroImg from './assets/images/hoa_neighborhood_1786422555129.jpg';

export function App() {
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [residentModalOpen, setResidentModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const scrollToQuote = () => {
    const el = document.getElementById('quote-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-emerald-800 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar 
        logoUrl={logoImg} 
        onOpenQuote={scrollToQuote} 
        onOpenResidentModal={() => setResidentModalOpen(true)}
        onOpenAdminEmailLogs={() => setAdminModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero 
          logoUrl={logoImg} 
          heroImageUrl={heroImg} 
          onRequestService={scrollToQuote} 
          onGetQuote={scrollToQuote}
        />

        {/* How It Works (3 Steps) */}
        <HowItWorks onOpenQuote={scrollToQuote} />

        {/* HOA-Focused Section */}
        <HoaSection 
          onOpenQuote={scrollToQuote} 
          onOpenProposalModal={() => setProposalModalOpen(true)}
        />

        {/* Why Gunny's Garbage Squad? (6 Cards) */}
        <WhyGunnys onOpenQuote={scrollToQuote} />

        {/* Service Area Map & City List */}
        <ServiceArea 
          onOpenQuote={scrollToQuote} 
          onOpenResidentModal={() => setResidentModalOpen(true)}
        />

        {/* HOA Pricing & Quote Section */}
        <HoaQuoteSection />

        {/* Homeowner & Resident Section */}
        <ResidentSection onOpenQuote={scrollToQuote} />

        {/* Frequently Asked Questions */}
        <FaqSection />

      </main>

      {/* Footer */}
      <Footer 
        logoUrl={logoImg} 
        onOpenQuote={scrollToQuote} 
        onOpenResidentModal={() => setResidentModalOpen(true)}
        onOpenAdminEmailLogs={() => setAdminModalOpen(true)}
      />

      {/* Modals */}
      <ProposalModal 
        isOpen={proposalModalOpen} 
        logoUrl={logoImg} 
        onClose={() => setProposalModalOpen(false)} 
        onOpenQuote={scrollToQuote}
      />

      <ResidentModal 
        isOpen={residentModalOpen} 
        onClose={() => setResidentModalOpen(false)} 
        onOpenQuote={scrollToQuote}
      />

      <AdminEmailLogsModal 
        isOpen={adminModalOpen} 
        onClose={() => setAdminModalOpen(false)}
      />

    </div>
  );
}

export default App;

