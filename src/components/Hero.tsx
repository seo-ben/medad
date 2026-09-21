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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section
      className="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        .hero-section {
          position: relative;
          background: #ffffff;
          overflow: hidden;
          min-height: calc(100vh - 110px);
          display: flex;
          align-items: center;
        }

        /* Calques d'images superposées avec fondu enchaîné */
        .hero-slides-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

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
            rgba(255, 255, 255, 0.98) 38%,
            rgba(255, 255, 255, 0.88) 50%,
            rgba(255, 255, 255, 0.35) 68%,
            rgba(255, 255, 255, 0) 84%
          );
          z-index: 2;
          pointer-events: none;
        }

        /* Conteneur de texte et actions */
        .hero-text-container {
          position: relative;
          z-index: 3;
          width: 100%;
          padding: 4.5rem 1.5rem;
        }

        .hero-text-content {
          max-width: 620px;
        }

        .hero-title {
          font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.12;
          color: #0f172a;
          margin: 0 0 1.25rem 0;
        }

        .hero-desc {
          font-size: clamp(1.02rem, 1.35vw, 1.18rem);
          color: #475569;
          line-height: 1.7;
          margin: 0 0 2.25rem 0;
          max-width: 520px;
          font-weight: 400;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          flex-wrap: wrap;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.95rem 2.1rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.96rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          justify-content: center;
        }

        .hero-btn-primary {
          background: #065f46;
          color: #ffffff;
          border: none;
          box-shadow: 0 8px 24px rgba(6, 95, 70, 0.28);
        }

        .hero-btn-primary:hover {
          background: #044e39;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(6, 95, 70, 0.35);
        }

        .hero-btn-secondary {
          background: #ffffff;
          color: #065f46;
          border: 2px solid #065f46;
        }

        .hero-btn-secondary:hover {
          background: #f0fdf4;
          transform: translateY(-2px);
        }

        /* Indicateurs et contrôles du slider ancrés dans le carousel */
        .hero-controls {
          position: absolute;
          bottom: 2rem;
          right: 3rem;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(8px);
          padding: 0.5rem 0.9rem;
          border-radius: 9999px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(226, 232, 240, 0.8);
          pointer-events: auto;
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

        /* RESPONSIVITÉ MOBILE & TABLETTE */
        @media (max-width: 900px) {
          .hero-section {
            min-height: auto !important;
            padding: 2rem 0 2.5rem 0 !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .hero-text-container {
            order: 1 !important;
            padding: 1rem 1.25rem 0 1.25rem !important;
          }

          .hero-desktop-br {
            display: none !important;
          }

          .hero-title {
            font-size: clamp(2rem, 7.5vw, 3rem) !important;
            line-height: 1.15 !important;
            margin-bottom: 1rem !important;
          }

          .hero-desc {
            font-size: 1rem !important;
            line-height: 1.65 !important;
            margin-bottom: 1.75rem !important;
          }

          /* Image slider en carte élégante sous le texte avec swipe */
          .hero-slides-wrapper {
            order: 2 !important;
            position: relative !important;
            width: calc(100% - 2.5rem) !important;
            max-width: 580px !important;
            height: 290px !important;
            margin: 2rem auto 0 auto !important;
            border-radius: 22px !important;
            overflow: hidden !important;
            box-shadow: 0 12px 32px -8px rgba(15, 36, 29, 0.16) !important;
          }

          .hero-slide-bg {
            border-radius: 22px !important;
            background-position: center center !important;
          }

          .hero-gradient-overlay {
            display: none !important;
          }

          .hero-controls {
            bottom: 1rem !important;
            right: 1rem !important;
            padding: 0.4rem 0.75rem !important;
            gap: 0.5rem !important;
          }

          .hero-arrow-btn {
            width: 28px !important;
            height: 28px !important;
          }

          .hero-slide-dot {
            width: 6px !important;
            height: 6px !important;
          }

          .hero-slide-dot.active {
            width: 20px !important;
          }
        }

        @media (max-width: 540px) {
          .hero-actions {
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.75rem !important;
          }

          .hero-btn {
            width: 100% !important;
            padding: 0.85rem 1.25rem !important;
            font-size: 0.94rem !important;
          }

          .hero-slides-wrapper {
            height: 250px !important;
            width: calc(100% - 2rem) !important;
            margin-top: 1.75rem !important;
          }
        }
      `}</style>

      {/* Contenu textuel et actions (prioritaire au-dessus sur mobile) */}
      <div className="hero-text-container container">
        <div className="hero-text-content">
          {/* Titre Principal */}
          <h1 className="hero-title">
            Avec <span style={{ color: '#065f46' }}>Medad</span>, <br className="hero-desktop-br" />
            vos projets prennent vie !
          </h1>

          {/* Sous-titre officiel */}
          <p className="hero-desc">
            Accédez à des solutions de financement simples, rapides et adaptées à vos besoins. Medad vous accompagne dans la réalisation de vos projets, aujourd'hui et demain.
          </p>

          {/* Boutons d'Action */}
          <div className="hero-actions">
            <button
              type="button"
              onClick={() => onOpenPreApproval()}
              className="hero-btn hero-btn-primary"
            >
              <ArrowRight size={18} />
              <span>Devenir client</span>
            </button>

            <a
              href="#produits"
              className="hero-btn hero-btn-secondary"
            >
              <span>Nos services</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Dégradé doux à gauche sur desktop */}
      <div className="hero-gradient-overlay" />

      {/* Carrousel d'images avec swipe tactile mobile */}
      <div
        className="hero-slides-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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

        {/* Contrôles du slider (Flèches et Points) intégrés sur l'image */}
        <div className="hero-controls">
          <button 
            type="button" 
            className="hero-arrow-btn" 
            onClick={handlePrev}
            aria-label="Diapositive précédente"
          >
            <ChevronLeft size={16} />
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
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
