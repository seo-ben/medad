import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { Products } from './components/Products';
import { MobileMoneySection } from './components/MobileMoneySection';
import { NetworkMap } from './components/NetworkMap';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AudioPlayerModal } from './components/AudioPlayerModal';
import { PreApprovalModal } from './components/PreApprovalModal';

export const App: React.FC = () => {
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isPreApprovalOpen, setIsPreApprovalOpen] = useState(false);
  const [preApprovalInitialData, setPreApprovalInitialData] = useState<any>(null);

  const handleOpenPreApproval = (data?: any) => {
    if (data) {
      setPreApprovalInitialData(data);
    }
    setIsPreApprovalOpen(true);
  };

  const handleSelectProduct = (_productId: string) => {
    // Navigation vers la section services
    const element = document.getElementById('produits');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-light)' }}>
      {/* Navigation & Barre Réglementaire */}
      <Navbar
        onOpenAudio={() => setIsAudioOpen(true)}
        onOpenPreApproval={() => handleOpenPreApproval()}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* 1. Hero Section (Accueil) */}
        <Hero
          onOpenAudio={() => setIsAudioOpen(true)}
          onOpenPreApproval={() => handleOpenPreApproval()}
        />

        {/* 2. Nos services (Gamme de Produits & Crédits) */}
        <Products
          onSelectProduct={handleSelectProduct}
          onOpenPreApproval={(prodId) => handleOpenPreApproval({ productId: prodId })}
        />

        {/* 3. Finance Digitale : décaissez et remboursez directement sur votre téléphone */}
        <MobileMoneySection />

        {/* 4. Agences & Points de Service */}
        <NetworkMap />

        {/* 5. À Propos (Bâtir l'avenir économique des entrepreneurs du Togo) */}
        <AboutSection onOpenPreApproval={() => handleOpenPreApproval()} />

        {/* 6. Témoignages & Preuve Sociale */}
        <Testimonials />

        {/* 7. Foire Aux Questions (FAQ) */}
        <FaqSection />

        {/* 8. Contact & Siège */}
        <ContactSection />
      </main>

      {/* Footer Institutionnel & Mentions Légales */}
      <Footer />

      {/* Bouton Flottant WhatsApp Fixe (+228 97 31 78 25) */}
      <FloatingWhatsApp />

      {/* Modale d'Écoute Multimodale (Mina, Éwé, Français) */}
      <AudioPlayerModal
        isOpen={isAudioOpen}
        onClose={() => setIsAudioOpen(false)}
      />

      {/* Modale de Pré-approbation en 3 étapes */}
      <PreApprovalModal
        isOpen={isPreApprovalOpen}
        onClose={() => setIsPreApprovalOpen(false)}
        initialData={preApprovalInitialData}
      />
    </div>
  );
};

export default App;
