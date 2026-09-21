import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { 
  CheckCircle2, 
  ArrowDownLeft, 
  ArrowUpRight, 
  FileText, 
  Download,
  Check,
  Building2,
  Receipt
} from 'lucide-react';

type OperationMode = 'decaissement' | 'remboursement';

export const MobileMoneySection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<OperationMode>('decaissement');

  return (
    <section 
      id="mobile-money" 
      style={{ 
        padding: '7.5rem 0 6.5rem 0', 
        backgroundColor: '#faf8f5', 
        color: '#0f241d',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #efe8df',
        borderBottom: '1px solid #efe8df'
      }}
    >
      {/* Styles scoped pour la grille et le smartphone Android pro */}
      <style>{`
        .mm-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .mm-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 5rem;
        }

        /* Conteneur 3D avec perspective */
        .android-wrapper {
          perspective: 1400px;
          display: flex;
          justifyContent: center;
          align-items: center;
          position: relative;
          padding: 1rem 0;
        }

        /* Coque de smartphone Android haut de gamme (Style Pixel / Galaxy) avec inclinaison 3D accentuée */
        .android-device {
          width: 100%;
          max-width: 370px;
          margin: 0 auto;
          background: #0d1117;
          border-radius: 46px;
          padding: 10px;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateY(-18deg) rotateX(9deg) rotateZ(3deg);
          box-shadow: 
            -28px 32px 65px -12px rgba(15, 23, 42, 0.32),
            -12px 14px 26px -6px rgba(0, 0, 0, 0.18),
            inset 0 0 0 2px #2f3742,
            inset 0 0 0 4px #1a1f26;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .android-device:hover {
          transform: rotateY(-8deg) rotateX(4deg) rotateZ(1.5deg) translateY(-8px);
          box-shadow: 
            -32px 40px 75px -12px rgba(15, 23, 42, 0.36),
            -14px 18px 30px -6px rgba(0, 0, 0, 0.22),
            inset 0 0 0 2px #3e4856,
            inset 0 0 0 4px #1a1f26;
        }

        /* Boutons physiques sur la tranche droite */
        .android-device::before {
          content: '';
          position: absolute;
          right: -4px;
          top: 130px;
          width: 3px;
          height: 52px;
          background: #2b333e;
          border-radius: 0 3px 3px 0;
          box-shadow: 1px 0 2px rgba(0, 0, 0, 0.35);
        }

        .android-device::after {
          content: '';
          position: absolute;
          right: -4px;
          top: 200px;
          width: 3px;
          height: 38px;
          background: #2b333e;
          border-radius: 0 3px 3px 0;
          box-shadow: 1px 0 2px rgba(0, 0, 0, 0.35);
        }

        /* Ombre douce au sol sous le smartphone incliné */
        .android-shadow {
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-40%) rotateY(-18deg);
          width: 350px;
          height: 35px;
          background: radial-gradient(ellipse at center, rgba(15, 23, 42, 0.28) 0%, rgba(15, 23, 42, 0) 72%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(7px);
        }

        /* Écran AMOLED Android */
        .android-screen {
          background: #f4f6f8;
          border-radius: 38px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 640px;
          position: relative;
        }

        /* Reflet spéculaire de verre sur l'écran */
        .android-glass-reflection {
          position: absolute;
          inset: 0;
          background: linear-gradient(125deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 50%);
          border-radius: 38px;
          pointer-events: none;
          z-index: 20;
        }

        /* Barre d'état Android avec punch-hole strictement centré */
        .android-status-bar {
          padding: 0.85rem 1.35rem 0.55rem 1.35rem;
          display: flex;
          justifyContent: space-between;
          align-items: center;
          background: #ffffff;
          border-bottom: 1px solid #eef2f6;
          position: relative;
          min-height: 42px;
        }

        .android-punch-hole {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #000000;
          border-radius: 50%;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5), inset 0 0 2px rgba(255, 255, 255, 0.4);
          z-index: 10;
        }

        /* Sélecteurs de mode propres */
        .mm-mode-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.9rem 1.6rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid transparent;
        }

        .mm-mode-btn.active {
          background: #065f46;
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(6, 95, 70, 0.28);
        }

        .mm-mode-btn.inactive {
          background: #ffffff;
          color: #475569;
          border-color: #e2e8f0;
        }

        .mm-mode-btn.inactive:hover {
          background: #f1f5f9;
          color: #0f241d;
        }

        /* Cartes des 3 piliers avec grandes icônes en arrière-plan */
        .mm-pillar-card {
          position: relative;
          background: #ffffff;
          border-radius: 22px;
          padding: 2.25rem 2rem;
          border: 1px solid #efe8df;
          box-shadow: 0 6px 20px -4px rgba(15, 36, 29, 0.04);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        .mm-pillar-card:hover {
          transform: translateY(-5px);
          border-color: #d1fae5;
          box-shadow: 0 16px 36px -8px rgba(6, 95, 70, 0.12);
        }

        .mm-pillar-bg-icon {
          position: absolute;
          right: -15px;
          bottom: -20px;
          color: #065f46;
          opacity: 0.06;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }

        .mm-pillar-card:hover .mm-pillar-bg-icon {
          transform: scale(1.1) rotate(-6deg);
          opacity: 0.11;
        }

        .mm-pillar-num {
          font-size: 0.82rem;
          font-weight: 800;
          color: #059669;
          letter-spacing: 0.08em;
          margin-bottom: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          z-index: 2;
          position: relative;
        }

        .mm-pillar-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f241d;
          line-height: 1.25;
          margin-bottom: 0.75rem;
          z-index: 2;
          position: relative;
        }

        .mm-pillar-text {
          font-size: 0.94rem;
          color: #475569;
          line-height: 1.65;
          margin: 0;
          z-index: 2;
          position: relative;
        }

        @media (max-width: 992px) {
          .mm-main-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
        }
      `}</style>

      <div className="mm-container">
        
        {/* GRILLE PRINCIPALE : NARRATION + SMARTPHONE ANDROID PRO */}
        <div className="mm-main-grid">
          
          {/* COLONNE GAUCHE : Storytelling clair & Partenaires Officiels */}
          <ScrollReveal direction="left" distance={65} duration={0.9}>
            <div>
              <h2 
                style={{ 
                  fontFamily: "'Bricolage Grotesque', 'Outfit', sans-serif",
                  fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)', 
                  fontWeight: 800,
                  color: '#0f241d', 
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.5rem' 
                }}
              >
                Finance Digitale : décaissez et remboursez directement sur votre téléphone
              </h2>

              <p 
                style={{ 
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.18rem)', 
                  color: '#475569', 
                  lineHeight: 1.7,
                  marginBottom: '2.5rem',
                  maxWidth: '620px'
                }}
              >
                Ne perdez plus votre temps dans les transports ni dans les files d'attente au siège. 
                Grâce à l’interconnexion directe de Medad avec <strong>Mixx (YAS)</strong> et <strong>Moov Money</strong>, 
                vos financements et vos remboursements s'effectuent en toute sécurité depuis votre boutique ou atelier.
              </p>

              {/* Sélecteur de mode en boutons pill épurés */}
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <button 
                  type="button"
                  className={`mm-mode-btn ${activeMode === 'decaissement' ? 'active' : 'inactive'}`}
                  onClick={() => setActiveMode('decaissement')}
                >
                  <ArrowDownLeft size={18} />
                  <span>Recevoir mon crédit (Décaissement)</span>
                </button>

                <button 
                  type="button"
                  className={`mm-mode-btn ${activeMode === 'remboursement' ? 'active' : 'inactive'}`}
                  onClick={() => setActiveMode('remboursement')}
                >
                  <ArrowUpRight size={18} />
                  <span>Payer mes échéances & Épargner</span>
                </button>
              </div>

            </div>
          </ScrollReveal>

          {/* COLONNE DROITE : VRAI SMARTPHONE ANDROID HAUTE-FIDÉLITÉ PENCHÉ EN 3D */}
          <ScrollReveal direction="right" distance={65} duration={0.9} delay={100} style={{ width: '100%' }}>
            <div className="android-wrapper">
              <div className="android-shadow" />
              <div className="android-device">
              <div className="android-screen">
                <div className="android-glass-reflection" />
                
                {/* 1. Barre de statut système Android avec heure à gauche, punch hole au centre et réseau en haut à droite */}
                <div className="android-status-bar">
                  {/* Heure à gauche */}
                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                      10:14
                    </span>
                  </div>

                  {/* Punch-hole caméra au centre exact */}
                  <div className="android-punch-hole" />

                  {/* Réseau & Batterie en haut à droite (sans le texte YAS) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginLeft: 'auto', zIndex: 1 }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#334155', letterSpacing: '0.02em' }}>
                      4G+
                    </span>

                    {/* Barres réseau cellulaires */}
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" style={{ display: 'block' }}>
                      <rect x="0.5" y="8" width="2" height="2.5" rx="0.5" fill="#0f172a" />
                      <rect x="4" y="5.5" width="2" height="5" rx="0.5" fill="#0f172a" />
                      <rect x="7.5" y="3" width="2" height="7.5" rx="0.5" fill="#0f172a" />
                      <rect x="11" y="0.5" width="2" height="10" rx="0.5" fill="#0f172a" />
                    </svg>

                    {/* Icône batterie avec jauge 94% */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0f172a' }}>94%</span>
                      <div style={{ 
                        width: '18px', 
                        height: '10px', 
                        border: '1.2px solid #0f172a', 
                        borderRadius: '2.5px', 
                        padding: '1px', 
                        display: 'flex', 
                        alignItems: 'center',
                        position: 'relative'
                      }}>
                        <div style={{ width: '85%', height: '100%', backgroundColor: '#10b981', borderRadius: '1px' }} />
                        <div style={{ position: 'absolute', right: '-3px', top: '2.5px', width: '1.5px', height: '3px', backgroundColor: '#0f172a', borderRadius: '0 1px 1px 0' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Notification Push Native Android (Material You) */}
                <div style={{ padding: '0.85rem 1rem 0.4rem 1rem' }}>
                  <div 
                    style={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '16px', 
                      padding: '0.85rem 1rem', 
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <div 
                          style={{ 
                            width: '20px', 
                            height: '20px', 
                            borderRadius: '5px', 
                            backgroundColor: '#065f46', 
                            color: '#ffffff', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            fontWeight: 900
                          }}
                        >
                          M
                        </div>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0f172a' }}>
                          {activeMode === 'decaissement' ? 'Mixx (YAS)' : 'Moov Money Flooz'}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>À l'instant</span>
                    </div>

                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.15rem' }}>
                      {activeMode === 'decaissement' 
                        ? 'Transfert reçu : + 350.000 FCFA' 
                        : 'Paiement effectué : 35.000 FCFA'}
                    </div>

                    <p style={{ fontSize: '0.74rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                      {activeMode === 'decaissement'
                        ? 'Crédit MEDAD SFD validé. Vos fonds sont immédiatement disponibles sur votre compte mobile Mixx.'
                        : 'Échéance de crédit validée avec succès auprès de MEDAD SFD. Quittance #QC-2026.'}
                    </p>
                  </div>
                </div>

                {/* 3. Corps de l'application mobile Medad */}
                <div style={{ padding: '0.75rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  
                  {/* En-tête profil adhérent dans l'application */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Bienvenue,</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>Akossiwa K.</div>
                    </div>

                    <span 
                      style={{ 
                        fontSize: '0.7rem', 
                        backgroundColor: '#ecfdf5', 
                        color: '#065f46', 
                        padding: '0.25rem 0.6rem', 
                        borderRadius: '9999px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Check size={12} />
                      Adhérente Vérifiée
                    </span>
                  </div>

                  {/* Grande Carte d'Opération Android */}
                  {activeMode === 'decaissement' ? (
                    <div 
                      style={{ 
                        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', 
                        borderRadius: '20px', 
                        padding: '1.35rem', 
                        color: '#ffffff',
                        boxShadow: '0 8px 20px -4px rgba(6, 95, 70, 0.35)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#a7f3d0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Microcrédit Décaissé
                        </span>
                        <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                          Mixx
                        </span>
                      </div>

                      <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
                        + 350 000 <span style={{ fontSize: '1rem', fontWeight: 600 }}>FCFA</span>
                      </div>

                      <div style={{ fontSize: '0.76rem', color: '#d1fae5', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
                        <CheckCircle2 size={14} color="#34d399" />
                        <span>Fonds utilisables sans déplacement</span>
                      </div>

                      <div style={{ fontSize: '0.7rem', color: '#a7f3d0', paddingTop: '0.65rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Réf: #MD-8921-TG</span>
                        <span>Comité de crédit approuvé</span>
                      </div>
                    </div>
                  ) : (
                    <div 
                      style={{ 
                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
                        borderRadius: '20px', 
                        padding: '1.35rem', 
                        color: '#ffffff',
                        boxShadow: '0 8px 20px -4px rgba(15, 23, 42, 0.35)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Échéance Réglée
                        </span>
                        <span style={{ fontSize: '0.7rem', backgroundColor: '#f6821f', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                          Flooz
                        </span>
                      </div>

                      <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
                        - 35 000 <span style={{ fontSize: '1rem', fontWeight: 600 }}>FCFA</span>
                      </div>

                      <div style={{ fontSize: '0.76rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
                        <FileText size={14} color="#f6821f" />
                        <span>Quittance #QC-2026-44 enregistrée</span>
                      </div>

                      <div style={{ fontSize: '0.7rem', color: '#cbd5e1', paddingTop: '0.65rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Code Marchand : MEDAD-FLOOZ</span>
                        <span>0 FCFA de pénalité</span>
                      </div>
                    </div>
                  )}

                  {/* Mini historique d'opérations récentes dans l'app */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '0.9rem', border: '1px solid #e8edf2' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                      Activité récente du compte
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <Receipt size={14} color="#065f46" />
                          <span style={{ color: '#0f172a', fontWeight: 600 }}>Cotisation Tontine</span>
                        </div>
                        <span style={{ color: '#16a34a', fontWeight: 700 }}>+ 2 000 F</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <Building2 size={14} color="#0284c7" />
                          <span style={{ color: '#0f172a', fontWeight: 600 }}>Agence Agoè Cacavéli</span>
                        </div>
                        <span style={{ color: '#64748b' }}>Validé</span>
                      </div>
                    </div>
                  </div>

                  {/* Bouton d'action rapide dans l'app */}
                  <div 
                    style={{ 
                      marginTop: 'auto',
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      padding: '0.65rem 0.85rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.75rem',
                      color: '#065f46',
                      fontWeight: 700
                    }}
                  >
                    <span>Télécharger la quittance électronique</span>
                    <Download size={14} color="#065f46" />
                  </div>

                </div>

                {/* 4. Barre de navigation gestuelle Android en bas */}
                <div style={{ padding: '0.55rem 0 0.75rem 0', display: 'flex', justifyContent: 'center', backgroundColor: '#f4f6f8' }}>
                  <div style={{ width: '90px', height: '4px', backgroundColor: '#94a3b8', borderRadius: '2px' }} />
                </div>

              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
