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
import { ScrollReveal } from './components/ScrollReveal';
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
      {/* Navigation */}
      <Navbar
        onOpenAudio={() => setIsAudioOpen(true)}
        onOpenPreApproval={() => handleOpenPreApproval()}
      />

      {/* Main Content : Animations bidirectionnelles au scroll (montant & descendant) */}
      <main style={{ flex: 1 }}>
        {/* 1. Hero Section (Accueil) */}
        <ScrollReveal direction="fade" distance={20}>
          <Hero
            onOpenAudio={() => setIsAudioOpen(true)}
            onOpenPreApproval={() => handleOpenPreApproval()}
          />
        </ScrollReveal>

        {/* 2. Nos services (Gamme de Produits & Crédits - Défilement interactif fluide 400vh) */}
        <Products
          onSelectProduct={handleSelectProduct}
          onOpenPreApproval={(prodId) => handleOpenPreApproval({ productId: prodId })}
        />

        {/* 3. Finance Digitale : décaissez et remboursez directement sur votre téléphone */}
        <ScrollReveal>
          <MobileMoneySection />
        </ScrollReveal>

        {/* 4. Agences & Points de Service */}
        <ScrollReveal>
          <NetworkMap />
        </ScrollReveal>

        {/* 5. À Propos (Bâtir l'avenir économique des entrepreneurs du Togo) */}
        <ScrollReveal>
          <AboutSection onOpenPreApproval={() => handleOpenPreApproval()} />
        </ScrollReveal>

        {/* 6. Témoignages & Preuve Sociale */}
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>

        {/* 7. Foire Aux Questions (FAQ) */}
        <ScrollReveal>
          <FaqSection />
        </ScrollReveal>

        {/* 8. Contact & Siège */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
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
