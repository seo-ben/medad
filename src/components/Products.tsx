import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Props ──────────────────────────────────────────────────────────── */
interface ProductsProps {
  onSelectProduct: (productId: string) => void;
  onOpenPreApproval: (productId: string) => void;
}

/* ─── Données produits ───────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'tresorerie',
    label: 'Trésorerie',
    accent: '#c9e23a',
    image: '/3d-tresorerie.jpg',
    bigNum: '48',
    unit: 'h',
    legend: 'pour recevoir votre argent',
    headline: 'Financez vos stocks et ventes dès aujourd\'hui.',
    description: 'Virement direct Mixx ou Flooz, sans paperasse ni garantie.',
    infos: [
      { val: '3\u202f000\u202f000\u00a0F', label: 'plafond' },
      { val: '1,5\u00a0%/mois', label: 'taux' },
      { val: '0\u00a0F', label: 'frais cachés' },
    ],
  },
  {
    id: 'equipement',
    label: 'Équipement',
    accent: '#6cc4ff',
    image: '/3d-equipement.jpg',
    bigNum: '24',
    unit: '\u00a0mois',
    legend: 'pour rembourser \u00e0 votre rythme',
    headline: 'Modernisez votre atelier. Sans sacrifier votre trésorerie.',
    description: 'Achetez le matériel qu\'il vous faut, avec un différé de remboursement.',
    infos: [
      { val: '5\u202f000\u202f000\u00a0F', label: 'montant maximum' },
      { val: 'Différé', label: 'de remboursement' },
      { val: 'Taux bonifié', label: 'conditions avantageuses' },
    ],
  },
  {
    id: 'tontine',
    label: 'Tontine',
    accent: '#c39bff',
    image: '/artisan-craftsman.jpg',
    bigNum: '500',
    unit: '\u00a0F/jour',
    legend: 'pour commencer',
    headline: 'La tontine que vous connaissez, avec la sécurité en plus.',
    description: 'Chaque cotisation vous vaut un SMS de confirmation automatique.',
    infos: [
      { val: '100\u00a0%', label: 'sécurisé' },
      { val: 'SMS', label: 'reçu automatique' },
      { val: '3\u00a0mois', label: 'pour accéder au crédit' },
    ],
  },
  {
    id: 'epargne',
    label: 'Épargne',
    accent: '#ffc94d',
    image: '/hero-african-entrepreneur.jpg',
    bigNum: '5\u202f000',
    unit: '\u00a0F',
    legend: 'pour ouvrir votre compte',
    headline: 'Faites travailler votre argent. En toute sécurité.',
    description: 'Épargnez de 3 \u00e0 12 mois, avec la protection de la BCEAO.',
    infos: [
      { val: '3\u201312\u00a0mois', label: 'de durée' },
      { val: 'CAS-IMEC', label: 'tutelle' },
      { val: 'BCEAO', label: 'protection' },
    ],
  },
] as const;

/* ─── Composant ──────────────────────────────────────────────────────── */
export const Products: React.FC<ProductsProps> = ({ onSelectProduct: _onSelectProduct, onOpenPreApproval }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number | null>(null);

  const [activeIndex, setActiveIndex]   = useState(0);
  const [contentKey, setContentKey]     = useState(0);   // force re-mount pour animation
  const [showScrollHint, setShowScrollHint] = useState(true);

  const product = PRODUCTS[activeIndex];

  /* prefers-reduced-motion */
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  /* ── Scroll handler ─────────────────────────────────────────────── */
  const onScroll = useCallback(() => {
    if (!trackRef.current) return;
    const rect     = trackRef.current.getBoundingClientRect();
    const trackH   = trackRef.current.offsetHeight;
    const vh       = window.innerHeight;
    const raw      = -rect.top / (trackH - vh);
    const p        = Math.max(0, Math.min(0.9999, raw));
    const newIndex = Math.floor(p * 4);

    setActiveIndex(prev => {
      if (prev !== newIndex) {
        setContentKey(k => k + 1);
        if (newIndex > 0) setShowScrollHint(false);
        return newIndex;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const schedule = () => {
      rafRef.current = requestAnimationFrame(() => {
        onScroll();
      });
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  /* ── Clic sur titre → scroll vers ce segment ────────────────────── */
  const scrollToProduct = (i: number) => {
    if (!trackRef.current) return;
    const trackTop = trackRef.current.offsetTop;
    const trackH   = trackRef.current.offsetHeight;
    const vh       = window.innerHeight;
    const target   = trackTop + ((i + 0.5) / 4) * (trackH - vh);
    window.scrollTo({ top: target, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  /* ── Forme 1 (grande, couleur accent) ───────────────────────────── */
  const shape1Style: React.CSSProperties = {
    position: 'absolute',
    width: 620,
    height: 620,
    borderRadius: '50% 0 50% 50%',
    background: product.accent,
    opacity: 0.08,
    top: -180,
    right: -160,
    transition: prefersReduced
      ? 'none'
      : 'background 0.6s ease, transform 0.9s cubic-bezier(.7,0,.2,1)',
    transform: `rotate(${activeIndex * 22}deg) scale(${1 + activeIndex * 0.04})`,
    pointerEvents: 'none',
  };

  /* ── Forme 2 (petite, fixe) ─────────────────────────────────────── */
  const shape2Style: React.CSSProperties = {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: '50% 0 50% 50%',
    background: '#0b7a45',
    opacity: 0.14,
    bottom: -200,
    right: 120,
    transition: prefersReduced ? 'none' : 'transform 0.9s cubic-bezier(.7,0,.2,1)',
    transform: `rotate(${-10 + activeIndex * 18}deg) translateY(${activeIndex * -15}px)`,
    pointerEvents: 'none',
  };

  /* ── Animation contenu ──────────────────────────────────────────── */
  const contentAnim: React.CSSProperties = prefersReduced ? {} : {
    animation: 'prod-enter 0.6s ease forwards',
  };

  return (
    <>
      {/* Google Font + Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&display=swap');

        @keyframes prod-enter {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .prod-tab {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
          font-family: 'Bricolage Grotesque', system-ui, sans-serif;
          font-size: clamp(1.9rem, 3.6vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.15;
          color: rgba(242,248,238,0.25);
          transition: ${prefersReduced ? 'none' : 'color 0.3s, transform 0.3s'};
          transform: translateX(0);
          outline: none;
        }
        .prod-tab[aria-selected="true"] {
          color: #f2f8ee;
          transform: translateX(14px);
        }
        .prod-tab:focus-visible {
          outline: 3px solid var(--prod-accent, #c9e23a);
          outline-offset: 4px;
          border-radius: 4px;
        }

        @media (max-width: 820px) {
          .prod-tab {
            font-size: 1.3rem;
            transform: none !important;
            white-space: nowrap;
          }
          .prod-tab[aria-selected="true"] { color: #f2f8ee; }
          .prod-cards-col { display: none !important; }
        }
      `}</style>

      {/* ── Track 400vh ─────────────────────────────────────────────── */}
      <div ref={trackRef} style={{ height: '400vh', position: 'relative' }} id="produits">

        {/* ── Sticky panel ────────────────────────────────────────────── */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          overflow: 'hidden',
          background: '#062a20',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          /* Compensation navbar (~64px) + petit padding bas */
          paddingTop: 'clamp(60px, 8vh, 80px)',
          paddingBottom: 'clamp(1rem, 3vh, 2rem)',
          boxSizing: 'border-box',
          ['--prod-accent' as string]: product.accent,
        }}>

          {/* ── Image de fond plein-écran par produit ───────────────────── */}
          {PRODUCTS.map((p, i) => (
            <img
              key={p.id}
              src={p.image}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: i === activeIndex ? 0.22 : 0,
                transition: prefersReduced ? 'none' : 'opacity 0.9s ease',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          ))}

          {/* Overlay sombre + gradient directionnel pour lisibilité */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: [
                'linear-gradient(to right, #062a20 38%, rgba(6,42,32,0.55) 100%)',
                'linear-gradient(to top,   #062a20 0%,  rgba(6,42,32,0.0)  55%)',
              ].join(', '),
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Decorative shapes */}
          <div style={shape1Style} aria-hidden="true" />
          <div style={shape2Style} aria-hidden="true" />

          {/* Inner layout */}
          <div style={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 4vw, 3rem)',
            position: 'relative',
            zIndex: 1,
          }}>

            {/* Desktop: 2-col grid | Mobile: 1-col */}
            <div className="prod-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(200px, 26vw, 320px) 1fr',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'center',
            }}>

              {/* ── LEFT: tab list ──────────────────────────────────── */}
              <div>

                <div
                  role="tablist"
                  aria-label="Produits Medad"
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
                  className="prod-tablist"
                >
                  {PRODUCTS.map((p, i) => (
                    <button
                      key={p.id}
                      role="tab"
                      aria-selected={i === activeIndex}
                      aria-controls="prod-panel"
                      id={`prod-tab-${p.id}`}
                      className="prod-tab"
                      onClick={() => scrollToProduct(i)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Scroll hint */}
                <p style={{
                  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                  fontSize: '0.8rem',
                  color: '#9fb9ad',
                  marginTop: '2.5rem',
                  opacity: showScrollHint ? 1 : 0,
                  transition: prefersReduced ? 'none' : 'opacity 0.5s ease',
                  pointerEvents: 'none',
                  letterSpacing: '0.04em',
                }} className="prod-hint">
                  Faites défiler ↓
                </p>
              </div>

              {/* ── RIGHT: active product content ───────────────────── */}
              <div
                id="prod-panel"
                role="tabpanel"
                aria-labelledby={`prod-tab-${product.id}`}
                aria-live="polite"
                aria-atomic="true"
              >
                <div key={contentKey} style={contentAnim}>

                  {/* Giant number */}
                  <div style={{
                    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                    fontSize: 'clamp(5rem, 13vw, 11rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.06em',
                    lineHeight: 0.88,
                    color: product.accent,
                    marginBottom: 'clamp(0.3rem, 1vh, 0.6rem)',
                    transition: prefersReduced ? 'none' : 'color 0.4s ease',
                  }}>
                    {product.bigNum}
                    <span style={{
                      fontSize: '0.28em',
                      color: '#f2f8ee',
                      letterSpacing: '-0.02em',
                      fontWeight: 600,
                    }}>
                      {product.unit}
                    </span>
                  </div>

                  {/* Legend */}
                  <p style={{
                    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                    fontSize: '0.85rem',
                    color: '#9fb9ad',
                    fontWeight: 400,
                    marginBottom: 'clamp(0.9rem, 2vh, 1.5rem)',
                    letterSpacing: '0.01em',
                  }}>
                    {product.legend}
                  </p>

                  {/* Product title */}
                  <h3 style={{
                    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                    fontSize: 'clamp(1.3rem, 2.4vw, 2rem)',
                    fontWeight: 600,
                    color: '#f2f8ee',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.25,
                    marginBottom: 'clamp(0.5rem, 1.2vh, 0.85rem)',
                    maxWidth: '36ch',
                  }}>
                    {product.headline}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                    fontSize: '0.95rem',
                    color: '#9fb9ad',
                    lineHeight: 1.6,
                    marginBottom: 'clamp(0.9rem, 2vh, 1.75rem)',
                    maxWidth: '44ch',
                  }}>
                    {product.description}
                  </p>

                  {/* 3 infos */}
                  <div style={{
                    display: 'flex',
                    gap: 'clamp(1.25rem, 3.5vw, 2.5rem)',
                    flexWrap: 'wrap',
                    marginBottom: 'clamp(1rem, 2.5vh, 2rem)',
                  }}>
                    {product.infos.map((info, i) => (
                      <div key={i}>
                        <div style={{
                          fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: '#f2f8ee',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                        }}>
                          {info.val}
                        </div>
                        <div style={{
                          fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                          fontSize: '0.75rem',
                          color: '#9fb9ad',
                          marginTop: '3px',
                          letterSpacing: '0.01em',
                        }}>
                          {info.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <button
                    type="button"
                    onClick={() => onOpenPreApproval(product.id)}
                    style={{
                      fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 1.8rem',
                      borderRadius: '999px',
                      background: product.accent,
                      color: '#06281f',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '-0.01em',
                      transition: prefersReduced ? 'none' : 'filter 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => {
                      if (!prefersReduced) {
                        e.currentTarget.style.filter = 'brightness(1.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.filter = 'brightness(1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onFocus={e => {
                      e.currentTarget.style.outline = `3px solid ${product.accent}`;
                      e.currentTarget.style.outlineOffset = '4px';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.outline = 'none';
                    }}
                  >
                    Faire une demande
                    <span aria-hidden="true" style={{ fontSize: '1.1em', lineHeight: 1 }}>→</span>
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile + responsive styles ─────────────────────────────── */}
      <style>{`
        @media (max-width: 820px) {
          .prod-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .prod-hint    { display: none !important; }
          .prod-tablist {
            flex-direction: row !important;
            gap: 0.1rem !important;
            overflow-x: auto !important;
            padding-bottom: 0.5rem !important;
            scrollbar-width: none !important;
          }
          .prod-tablist::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </>
  );
};
