import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Smartphone, MessageSquare, HelpCircle } from 'lucide-react';
import { MedadLogo } from './MedadLogo';

interface NavbarProps {
  onOpenAudio?: () => void;
  onOpenPreApproval: () => void;
}

// Toutes les sections observables (primary + dropdown)
const ALL_SECTION_IDS = [
  'accueil',
  'produits',
  'mobile-money',
  'agences',
  'apropos',
  'temoignages',
  'faq',
  'contact',
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenPreApproval: _onOpenPreApproval }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('accueil');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track manual click to avoid instant IntersectionObserver override
  const manualSetRef = useRef<boolean>(false);

  // IntersectionObserver: met à jour activeLink en fonction des sections visibles
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // On veut savoir quelle section occupe le plus la fenêtre
    // Strategy: track which sections are intersecting, pick topmost one
    const visibleSections = new Map<string, number>();

    const updateActive = () => {
      if (manualSetRef.current) return;
      if (visibleSections.size === 0) return;
      // Pick the section with highest ratio that is visible
      let bestId = 'accueil';
      let bestRatio = 0;
      visibleSections.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });
      setActiveLink(bestId);
    };

    ALL_SECTION_IDS.forEach((id) => {
      const el = id === 'accueil' ? document.getElementById('hero') || document.querySelector('section') : document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio);
            } else {
              visibleSections.delete(id);
            }
            updateActive();
          });
        },
        {
          // Déclenche quand la section est dans les 20% du haut/bas de l'écran
          rootMargin: '-10% 0px -60% 0px',
          threshold: [0, 0.1, 0.25, 0.5, 1.0],
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Réinitialise le verrou manuel après 1.2s (laisse le temps de scroller)
  const handleNavClick = (id: string) => {
    setActiveLink(id);
    manualSetRef.current = true;
    setTimeout(() => {
      manualSetRef.current = false;
    }, 1200);
  };

  // 5 Liens Principaux Directs Demandés
  const primaryNavItems: { id: string; label: string; href: string }[] = [
    { id: 'accueil', label: 'Accueil', href: '#' },
    { id: 'produits', label: 'Nos services', href: '#produits' },
    { id: 'agences', label: 'Agences', href: '#agences' },
    { id: 'apropos', label: 'À propos', href: '#apropos' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  // Le reste dans le Menu Déroulant (au niveau de Contact)
  const dropdownItems = [
    {
      id: 'mobile-money',
      label: 'Finance Digitale',
      href: '#mobile-money',
      icon: Smartphone,
      description: 'Transferts Mixx (TMoney) & Flooz'
    },
    {
      id: 'temoignages',
      label: 'Témoignages',
      href: '#temoignages',
      icon: MessageSquare,
      description: 'Expériences clients & réussites'
    },
    {
      id: 'faq',
      label: 'FAQ',
      href: '#faq',
      icon: HelpCircle,
      description: 'Questions fréquentes & démarches'
    },
  ];

  const isDropdownItemActive = dropdownItems.some((item) => item.id === activeLink);

  // Fermeture automatique au clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      boxShadow: '0 2px 12px -2px rgba(0, 0, 0, 0.04)'
    }}>
      {/* Barre Principale de Navigation */}
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '84px',
        gap: '1rem'
      }}>
        {/* Logo Medad */}
        <a href="#" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <MedadLogo size={42} />
        </a>

        {/* Liens Centraux Desktop (Accueil, Nos services, Agence, Apropos, Contact + Menu Déroulant) */}
        <nav style={{ display: 'none', alignItems: 'center', gap: 'clamp(0.8rem, 1.4vw, 1.6rem)' }} className="desktop-menu">
          {primaryNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleNavClick(item.id)}
              style={{
                fontWeight: activeLink === item.id ? 700 : 500,
                fontSize: '0.92rem',
                color: activeLink === item.id ? '#065f46' : '#334155',
                padding: '0.5rem 0',
                position: 'relative',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#065f46')}
              onMouseLeave={(e) => (e.currentTarget.style.color = activeLink === item.id ? '#065f46' : '#334155')}
            >
              <span>{item.label}</span>
              {activeLink === item.id && (
                <span style={{
                  position: 'absolute',
                  bottom: '0px',
                  left: '0',
                  right: '0',
                  height: '2px',
                  background: '#065f46',
                  borderRadius: '2px'
                }} />
              )}
            </a>
          ))}

          {/* Menu Déroulant pour le Reste (Mobile Money, Témoignages, FAQ) au niveau de Contact */}
          <div
            ref={dropdownRef}
            style={{ position: 'relative' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: isDropdownItemActive ? '#ecfdf5' : 'transparent',
                border: isDropdownItemActive ? '1px solid #a7f3d0' : '1px solid transparent',
                borderRadius: '999px',
                padding: '0.4rem 0.75rem',
                fontWeight: isDropdownItemActive ? 700 : 500,
                fontSize: '0.92rem',
                color: isDropdownItemActive ? '#065f46' : '#334155',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (!isDropdownItemActive) e.currentTarget.style.color = '#065f46';
              }}
              onMouseLeave={(e) => {
                if (!isDropdownItemActive) e.currentTarget.style.color = '#334155';
              }}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <span>Découvrir</span>
              <ChevronDown
                size={15}
                style={{
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              />
            </button>

            {/* Panneau Déroulant Flottant */}
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '290px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 12px 36px -6px rgba(15, 36, 29, 0.14), 0 4px 12px rgba(0, 0, 0, 0.04)',
                  padding: '0.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  zIndex: 110,
                  animation: 'dropdownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {dropdownItems.map((subItem) => {
                  const Icon = subItem.icon;
                  const isCurrent = activeLink === subItem.id;
                  return (
                    <a
                      key={subItem.id}
                      href={subItem.href}
                      onClick={() => {
                        handleNavClick(subItem.id);
                        setDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        backgroundColor: isCurrent ? '#f0fdf4' : 'transparent',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isCurrent ? '#f0fdf4' : 'transparent')}
                    >
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '10px',
                          backgroundColor: isCurrent ? '#d1fae5' : '#ecfdf5',
                          color: '#065f46',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f241d' }}>
                          {subItem.label}
                        </span>
                        <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                          {subItem.description}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Toggle Menu Mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: mobileMenuOpen ? '#f1f5f9' : '#ffffff',
              border: '1.5px solid #e2e8f0',
              color: '#0f241d',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* TIROIR MOBILE PLEIN ÉCRAN FLUIDE */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '72px',
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px',
              padding: '1.5rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              maxHeight: 'calc(100vh - 90px)',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Principale Mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
              {primaryNavItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    handleNavClick(item.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: activeLink === item.id ? '#065f46' : '#1e293b',
                    backgroundColor: activeLink === item.id ? '#f0fdf4' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={16} color={activeLink === item.id ? '#065f46' : '#94a3b8'} />
                </a>
              ))}
            </div>

            {/* Rubriques Complémentaires Mobile */}
            <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.06em', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
                Autres Services & Infos
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        handleNavClick(item.id);
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 0.85rem',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: '#334155',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '10px',
                          backgroundColor: '#f1f5f9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#065f46',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f241d' }}>
                          {item.label}
                        </span>
                        <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                          {item.description}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -6px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @media (min-width: 900px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
