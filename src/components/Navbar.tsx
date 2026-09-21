import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Smartphone, MessageSquare, HelpCircle } from 'lucide-react';
import { MedadLogo } from './MedadLogo';

interface NavbarProps {
  onOpenAudio?: () => void;
  onOpenPreApproval: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPreApproval }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('accueil');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
              onClick={() => setActiveLink(item.id)}
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
                        setActiveLink(subItem.id);
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

        {/* Boutons d'Action à Droite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          {/* Bouton Pill « Devenir client → » */}
          <button
            type="button"
            onClick={onOpenPreApproval}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.7rem 1.45rem',
              borderRadius: '9999px',
              background: '#065f46',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(6, 95, 70, 0.25)',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#044e39';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#065f46';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Devenir client</span>
            <ArrowRight size={16} />
          </button>

          {/* Toggle Menu Mobile */}
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
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              color: '#1e293b',
              cursor: 'pointer'
            }}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Déroulant */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          borderTop: '1px solid #f1f5f9',
          padding: '1.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* 5 Liens Principaux */}
            {primaryNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveLink(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  fontWeight: activeLink === item.id ? 700 : 600,
                  color: activeLink === item.id ? '#065f46' : '#334155',
                  fontSize: '1rem',
                  textDecoration: 'none'
                }}
              >
                {item.label}
              </a>
            ))}

            {/* Séparateur pour le Reste */}
            <div style={{
              margin: '0.4rem 0 0.2rem 0',
              paddingTop: '0.8rem',
              borderTop: '1px solid #f1f5f9',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#94a3b8'
            }}>
              Découvrir aussi
            </div>

            {dropdownItems.map((subItem) => {
              const Icon = subItem.icon;
              return (
                <a
                  key={subItem.id}
                  href={subItem.href}
                  onClick={() => {
                    setActiveLink(subItem.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontWeight: activeLink === subItem.id ? 700 : 500,
                    color: activeLink === subItem.id ? '#065f46' : '#475569',
                    fontSize: '0.94rem',
                    textDecoration: 'none'
                  }}
                >
                  <Icon size={18} color="#065f46" />
                  <span>{subItem.label}</span>
                </a>
              );
            })}

            <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPreApproval();
                }}
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  borderRadius: '9999px',
                  background: '#065f46',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Devenir client</span>
                <ArrowRight size={16} />
              </button>
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

