import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface AboutSectionProps {
  onOpenPreApproval?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenPreApproval }) => {
  return (
    <section
      id="apropos"
      style={{
        padding: '5.5rem 0',
        backgroundColor: '#ffffff',
        position: 'relative',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
        {/* Titre Principal sans aucun label au-dessus */}
        <ScrollReveal direction="down" distance={25} duration={0.8}>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', 'Outfit', sans-serif",
              fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              color: '#0f241d',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem'
            }}
          >
            Bâtir l'avenir économique des entrepreneurs du Togo
          </h2>
        </ScrollReveal>

        {/* Texte officiel */}
        <ScrollReveal direction="fade" distance={20} delay={100} duration={0.85}>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.3vw, 1.22rem)',
              color: '#475569',
              lineHeight: 1.8,
              maxWidth: '840px',
              margin: '0 auto 2.25rem auto'
            }}
          >
            Medad Microfinance est une institution financière mutualiste de proximité, agréée par le Ministère de l’Économie et des Finances du Togo (CAS-IMEC) et supervisée selon les règles prudentielles de la BCEAO. Nous finançons l'économie réelle en soutenant directement commerçantes, artisans et petites entreprises.
          </p>
        </ScrollReveal>

        {/* Bouton CTA */}
        {onOpenPreApproval && (
          <ScrollReveal direction="up" distance={30} delay={180} duration={0.8}>
            <div>
              <button
                type="button"
                onClick={onOpenPreApproval}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.95rem 2.25rem',
                  borderRadius: '9999px',
                  backgroundColor: '#065f46',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(6, 95, 70, 0.22)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#044e39';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#065f46';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Faire une demande de crédit</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
