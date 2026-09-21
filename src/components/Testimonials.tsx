import React, { useRef, useState } from 'react';
import { TESTIMONIALS, type Testimonial } from '../data/content';
import { Quote, MapPin, TrendingUp, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Testimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dupliquer les 7 témoignages pour permettre un défilement infini fluide
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="temoignages"
      style={{ 
        padding: '1.5rem 0 5rem 0', 
        background: '#ffffff',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <style>{`
        .testimonials-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 3rem auto;
          padding: 0 1.5rem;
        }

        .testimonials-track-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 1rem 0;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }

        .testimonials-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marqueeScroll 45s linear infinite;
        }

        .testimonials-track.paused {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .testimonial-card {
          width: 380px;
          background: #f8fafc;
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          flex-shrink: 0;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: 0 12px 24px -10px rgba(6, 95, 70, 0.12);
        }

        @media (max-width: 640px) {
          .testimonial-card {
            width: 300px;
            padding: 1.5rem;
          }
        }

        .carousel-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .control-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .control-btn:hover {
          background: #065f46;
          color: #ffffff;
          border-color: #065f46;
        }
      `}</style>

      <ScrollReveal direction="down" distance={25} duration={0.8}>
        <div className="testimonials-header">
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', 'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 3.8vw, 3rem)',
            fontWeight: 800,
            color: '#0f241d',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            marginBottom: '1rem'
          }}>
            Ils développent leurs activités avec Medad Microfinance
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            Découvrez les retours concrets de nos membres à travers les 7 communes et marchés du Grand Lomé.
          </p>
        </div>
      </ScrollReveal>

      {/* Carrousel infini */}
      <ScrollReveal direction="up" distance={35} delay={120} duration={0.85}>
        <div 
          className="testimonials-track-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
        <div className={`testimonials-track ${isPaused ? 'paused' : ''}`} ref={scrollRef}>
          {duplicatedTestimonials.map((item: Testimonial, idx: number) => (
            <div key={`${item.name}-${idx}`} className="testimonial-card">
              <Quote 
                size={34} 
                color="#065f46" 
                style={{ opacity: 0.15, position: 'absolute', top: '20px', right: '20px' }} 
              />

              <div>
                {/* Badge Produit & Impact */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    background: '#dcfce7',
                    color: '#15803d'
                  }}>
                    {item.badge}
                  </span>

                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#047857'
                  }}>
                    <TrendingUp size={14} />
                    {item.growth}
                  </span>
                </div>

                <p style={{
                  fontSize: '0.94rem',
                  color: '#1e293b',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  marginBottom: '1.75rem',
                  minHeight: '4.5rem'
                }}>
                  « {item.quote} »
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                borderTop: '1px solid #e2e8f0',
                paddingTop: '1.25rem'
              }}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(6, 95, 70, 0.2)'
                  }}>
                    {item.name.charAt(0)}
                  </div>
                )}

                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f241d' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    {item.role}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.74rem', color: '#059669', fontWeight: 600 }}>
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boutons de contrôle (Pause / Lecture / Navigation) */}
      <div className="carousel-controls">
        <button
          type="button"
          className="control-btn"
          onClick={() => handleManualScroll('left')}
          aria-label="Témoignage précédent"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          className="control-btn"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Reprendre le défilement" : "Mettre en pause"}
          title={isPaused ? "Lecture" : "Pause"}
        >
          {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
        </button>

        <button
          type="button"
          className="control-btn"
          onClick={() => handleManualScroll('right')}
          aria-label="Témoignage suivant"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      </ScrollReveal>
    </section>
  );
};
