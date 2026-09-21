import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenAudio?: () => void;
  onOpenPreApproval: (data?: any) => void;
}

interface Slide {
  id: number;
  image: string;
  alt: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 0,
    image: '/hero-slide-office.jpg',
    alt: 'Conseillers et services financiers dans les bureaux de Medad'
  },
  {
    id: 1,
    image: '/hero-banner-main.png',
    alt: 'Commerçante au marché de Lomé'
  },
  {
    id: 2,
    image: '/hero-slide-4.jpg',
    alt: 'Accueil et services aux entrepreneurs à Lomé'
  },
  {
    id: 3,
    image: '/hero-slide-2.jpg',
    alt: 'Artisan dans son atelier de production'
  },
  {
    id: 4,
    image: '/hero-slide-3.jpg',
    alt: 'Grossistes et commerçants de tissus'
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenPreApproval }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        background: '#ffffff',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        /* Calques d'images superposées avec fondu enchaîné */
        .hero-slide-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 6s ease-out;
          pointer-events: none;
          z-index: 1;
        }

        .hero-slide-bg.active {
          opacity: 1;
          transform: scale(1);
        }

        /* Dégradé de fondu doux à gauche pour garantir une lisibilité optimale */
        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0.98) 36%,
            rgba(255, 255, 255, 0.88) 48%,
            rgba(255, 255, 255, 0.35) 65%,
            rgba(255, 255, 255, 0) 80%
          );
          z-index: 2;
          pointer-events: none;
        }

        /* Indicateurs et contrôles du slider */
        .hero-controls {
          position: absolute;
          bottom: 2rem;
          right: 3rem;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.5rem 0.9rem;
          border-radius: 9999px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .hero-arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #ffffff;
          color: #0f241d;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        .hero-arrow-btn:hover {
          background: #065f46;
          color: #ffffff;
        }

        .hero-slide-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #cbd5e1;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .hero-slide-dot.active {
          width: 26px;
          background: #065f46;
        }

        @media (max-width: 900px) {
          .hero-section {
            min-height: auto !important;
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
            flex-direction: column !important;
          }
          .hero-slides-wrapper {
            position: relative !important;
            height: 340px !important;
            width: 100% !important;
            border-radius: 20px !important;
            overflow: hidden !important;
            margin-top: 2rem !important;
          }
          .hero-slide-bg {
            border-radius: 20px !important;
          }
          .hero-gradient-overlay {
            display: none !important;
          }
          .hero-controls {
            bottom: 1rem;
            right: 1.5rem;
          }
        }
      `}</style>

      {/* Ensemble des images superposées en arrière-plan */}
      <div className="hero-slides-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hero-slide-bg ${currentSlide === idx ? 'active' : ''}`}
            style={{
              backgroundImage: `url('${slide.image}')`
            }}
            aria-label={slide.alt}
          />
        ))}
      </div>

      {/* Dégradé doux à gauche */}
      <div className="hero-gradient-overlay" />

      {/* Contenu textuel et actions positionnés à gauche */}
      <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%', padding: '4.5rem 1.5rem' }}>
        <div style={{ maxWidth: '620px' }}>
          
          {/* Titre Principal sans aucun label au-dessus */}
          <h1 style={{
            fontFamily: "'Bricolage Grotesque', 'Outfit', sans-serif",
            fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.12,
            color: '#0f172a',
            marginBottom: '1.25rem'
          }}>
            Avec <span style={{ color: '#065f46' }}>Medad</span>,<br />
            vos projets prennent<br />
            vie !
          </h1>

          {/* Sous-titre officiel avec précision dynamique */}
          <p style={{
            fontSize: 'clamp(1.02rem, 1.35vw, 1.18rem)',
            color: '#475569',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '520px',
            fontWeight: 400
          }}>
            Accédez à des solutions de financement simples, rapides et adaptées à vos besoins. Medad vous accompagne dans la réalisation de vos projets, aujourd'hui et demain.
          </p>

          {/* Boutons d'Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {/* Bouton Primaire « → Devenir client » */}
            <button
              type="button"
              onClick={() => onOpenPreApproval()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.95rem 2.1rem',
                borderRadius: '9999px',
                background: '#065f46',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.96rem',
                border: 'none',
                boxShadow: '0 8px 24px rgba(6, 95, 70, 0.28)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#044e39';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(6, 95, 70, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#065f46';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(6, 95, 70, 0.28)';
              }}
            >
              <ArrowRight size={18} />
              <span>Devenir client</span>
            </button>

            {/* Bouton Secondaire « Nos services → » */}
            <a
              href="#produits"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.92rem 2.1rem',
                borderRadius: '9999px',
                background: '#ffffff',
                color: '#065f46',
                border: '2px solid #065f46',
                fontWeight: 700,
                fontSize: '0.96rem',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f0fdf4';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Nos services</span>
              <ArrowRight size={18} />
            </a>
          </div>

        </div>
      </div>

      {/* Contrôles du slider (Flèches et Points) */}
      <div className="hero-controls">
        <button 
          type="button" 
          className="hero-arrow-btn" 
          onClick={handlePrev}
          aria-label="Diapositive précédente"
        >
          <ChevronLeft size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-slide-dot ${currentSlide === i ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Aller à la diapositive ${i + 1}`}
            />
          ))}
        </div>

        <button 
          type="button" 
          className="hero-arrow-btn" 
          onClick={handleNext}
          aria-label="Diapositive suivante"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};
