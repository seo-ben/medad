import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Smartphone,
  UserCheck,
  MessageSquare
} from 'lucide-react';

interface Step {
  id: number;
  num: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  delay: string;
  keyPoints: string[];
  highlight: string;
  highlightSub: string;
  ctaText: string;
}

const STEPS: Step[] = [
  {
    id: 0,
    num: '01',
    badge: 'Étape 1 • En 2 minutes',
    title: 'Exprimez votre besoin',
    subtitle: 'En agence, par téléphone ou directement sur WhatsApp',
    description: 'Pas de dossier lourd ni de formalités complexes. Dites-nous simplement quel est votre projet : achat de stock pour votre commerce, renouvellement d’outillage ou épargne tontine.',
    delay: '2 min',
    keyPoints: [
      'Simple pièce d’identité (CNI, passeport ou carte d\'électeur)',
      'Aucun frais d’ouverture de dossier caché',
      'Écoute attentive adaptée à votre secteur d’activité'
    ],
    highlight: '0 F CFA',
    highlightSub: 'de frais de dossier préliminaire',
    ctaText: 'Faire une demande express'
  },
  {
    id: 1,
    num: '02',
    badge: 'Étape 2 • Sous 24 heures',
    title: 'Rencontre avec votre conseiller',
    subtitle: 'Nous venons directement à votre commerce ou atelier',
    description: 'Nos agents de terrain se déplacent à votre rencontre (marché d’Agoè, Adidogomé, Grand Marché, etc.) pour évaluer la réalité de votre activité en toute bienveillance.',
    delay: '24h',
    keyPoints: [
      'Visite sur votre lieu de travail sans fermer votre boutique',
      'Évaluation personnalisée de votre capacité de remboursement',
      'Conseil sur-mesure pour protéger vos marges'
    ],
    highlight: '100% Terrain',
    highlightSub: 'présence directe dans tous les quartiers de Lomé',
    ctaText: 'Prendre rendez-vous'
  },
  {
    id: 2,
    num: '03',
    badge: 'Étape 3 • 48h chrono',
    title: 'Validation & Décaissement',
    subtitle: 'Vos fonds disponibles instantanément',
    description: 'Dès validation de votre dossier par le comité, les fonds sont immédiatement mis à votre disposition selon votre convenance : en espèces au guichet ou directement sur votre compte mobile.',
    delay: '48h',
    keyPoints: [
      'Versement instantané sur TMoney ou Moov Money (Flooz)',
      'Retrait possible dans l’une de nos 7 agences du Grand Lomé',
      'Échéancier clair et transparent sans surprise'
    ],
    highlight: '48 Heures',
    highlightSub: 'délai moyen constaté entre la demande et le virement',
    ctaText: 'Obtenir mon financement'
  }
];

interface HowItWorksProps {
  onOpenPreApproval?: (data?: any) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenPreApproval }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = STEPS[activeStep];

  return (
    <section 
      id="comment-ca-marche"
      style={{ 
        backgroundColor: '#ffffff', 
        padding: '6rem 0 5rem 0',
        position: 'relative'
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <style>{`
        .hiw-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* En-tête */
        .hiw-header {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 4rem auto;
        }

        .hiw-title {
          font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 800;
          color: #0f241d;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin: 0 0 1rem 0;
        }

        .hiw-subtitle {
          font-size: 1.15rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        /* Ligne de progression / Stepper horizontal sans card */
        .hiw-stepper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          position: relative;
          margin-bottom: 4rem;
        }

        .hiw-stepper-btn {
          background: none;
          border: none;
          padding: 1rem 0.5rem 1.5rem 0.5rem;
          text-align: left;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          border-top: 3px solid #e2e8f0;
        }

        .hiw-stepper-btn.active {
          border-top-color: #065f46;
        }

        .hiw-stepper-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
          color: #cbd5e1;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hiw-stepper-btn.active .hiw-stepper-num {
          color: #065f46;
        }

        .hiw-stepper-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 0.35rem;
        }

        .hiw-stepper-btn.active .hiw-stepper-tag {
          color: #059669;
        }

        .hiw-stepper-label {
          font-size: 1.15rem;
          font-weight: 700;
          color: #334155;
          transition: color 0.3s ease;
        }

        .hiw-stepper-btn.active .hiw-stepper-label {
          color: #0f241d;
        }

        /* Contenu actif détaillé - Présentation ouverte et aérée */
        .hiw-content-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4.5rem;
          align-items: center;
        }

        @keyframes hiwSlideIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hiw-panel {
          animation: hiwSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hiw-badge-tag {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #059669;
          margin-bottom: 0.75rem;
        }

        .hiw-panel-title {
          font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
          font-size: clamp(1.8rem, 2.8vw, 2.5rem);
          font-weight: 800;
          color: #0f241d;
          line-height: 1.2;
          margin: 0 0 1rem 0;
        }

        .hiw-panel-desc {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.7;
          margin: 0 0 2rem 0;
        }

        .hiw-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Petit indicateur de cycle interactif */
        .hiw-dots {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hiw-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #cbd5e1;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .hiw-dot.active {
          width: 24px;
          background-color: #065f46;
        }

        .hiw-list-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-size: 1.05rem;
          color: #1e293b;
          font-weight: 500;
        }

        .hiw-list-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #ecfdf5;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Colonne Droite : Impact & Chiffre */
        .hiw-stat-side {
          display: flex;
          flex-direction: column;
          padding-left: 2.5rem;
          border-left: 2px solid #f1f5f9;
        }

        .hiw-stat-big {
          font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          font-weight: 900;
          color: #065f46;
          line-height: 1;
          letter-spacing: -0.04em;
          margin-bottom: 0.5rem;
        }

        .hiw-stat-sub {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0 0 2.5rem 0;
        }

        .hiw-action-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }

        .hiw-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #065f46;
          color: #ffffff;
          padding: 0.95rem 1.8rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(6, 95, 70, 0.25);
        }

        .hiw-primary-btn:hover {
          background-color: #044e39;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(6, 95, 70, 0.35);
        }

        .hiw-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: transparent;
          color: #065f46;
          padding: 0.95rem 1.5rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.95rem;
          border: 1.5px solid #cbd5e1;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .hiw-secondary-btn:hover {
          border-color: #065f46;
          background-color: #f0fdf4;
        }

        /* 4 points de confiance en bas, ultra épuré */
        .hiw-trust-strip {
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 1px solid #f1f5f9;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .hiw-trust-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .hiw-trust-icon {
          color: #059669;
          flex-shrink: 0;
        }

        .hiw-trust-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: #0f241d;
          margin-bottom: 0.15rem;
        }

        .hiw-trust-desc {
          font-size: 0.82rem;
          color: #64748b;
          margin: 0;
        }

        @media (max-width: 960px) {
          .hiw-content-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hiw-stat-side {
            padding-left: 0;
            border-left: none;
            border-top: 2px solid #f1f5f9;
            padding-top: 2rem;
          }
          .hiw-trust-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .hiw-stepper {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .hiw-trust-strip {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>

      <div className="hiw-container">
        
        {/* Titre */}
        <div className="hiw-header">
          <h2 className="hiw-title">
            Obtenez votre financement en 3 étapes simples
          </h2>
          <p className="hiw-subtitle">
            Un processus rapide, transparent et adapté au rythme quotidien des entrepreneurs de Lomé.
          </p>
        </div>

        {/* Stepper horizontal sans card */}
        <div className="hiw-stepper">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                type="button"
                className={`hiw-stepper-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveStep(idx);
                  setIsAutoPlaying(false);
                }}
              >
                <div className="hiw-stepper-num">
                  <span>{step.num}</span>
                  <Clock size={16} style={{ opacity: isActive ? 1 : 0.4 }} />
                </div>
                <div className="hiw-stepper-tag">{step.badge}</div>
                <div className="hiw-stepper-label">{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Panneau animé de l'étape active */}
        <div key={current.id} className="hiw-content-grid hiw-panel">
          
          {/* Côté gauche : Explications & Points clés */}
          <div>
            <h3 className="hiw-panel-title">{current.title}</h3>
            <p className="hiw-panel-desc">{current.description}</p>

            <ul className="hiw-list">
              {current.keyPoints.map((pt, i) => (
                <li key={i} className="hiw-list-item">
                  <span className="hiw-list-icon">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="hiw-action-row">
              <button
                type="button"
                className="hiw-primary-btn"
                onClick={() => onOpenPreApproval && onOpenPreApproval()}
              >
                <span>{current.ctaText}</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="https://wa.me/22897317825"
                target="_blank"
                rel="noopener noreferrer"
                className="hiw-secondary-btn"
              >
                <MessageSquare size={16} />
                <span>Assistance WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Côté droit : Gros chiffre & indicateur visuel */}
          <div className="hiw-stat-side">
            <div className="hiw-stat-big">{current.highlight}</div>
            <p className="hiw-stat-sub">{current.highlightSub}</p>

            <div className="hiw-dots">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`hiw-dot ${activeStep === i ? 'active' : ''}`}
                  onClick={() => {
                    setActiveStep(i);
                    setIsAutoPlaying(false);
                  }}
                  title={`Étape ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Bandeau de garanties institutionnelles en 4 points */}
        <div className="hiw-trust-strip">
          <div className="hiw-trust-item">
            <Clock className="hiw-trust-icon" size={28} />
            <div>
              <div className="hiw-trust-title">Déblocage 48h</div>
              <p className="hiw-trust-desc">Décaissement express après instruction</p>
            </div>
          </div>

          <div className="hiw-trust-item">
            <ShieldCheck className="hiw-trust-icon" size={28} />
            <div>
              <div className="hiw-trust-title">Taux réglementé</div>
              <p className="hiw-trust-desc">Conformité stricte norme BCEAO &lt; 24%</p>
            </div>
          </div>

          <div className="hiw-trust-item">
            <UserCheck className="hiw-trust-icon" size={28} />
            <div>
              <div className="hiw-trust-title">Agent dédié</div>
              <p className="hiw-trust-desc">Accompagnement physique à votre commerce</p>
            </div>
          </div>

          <div className="hiw-trust-item">
            <Smartphone className="hiw-trust-icon" size={28} />
            <div>
              <div className="hiw-trust-title">Paiement Mobile</div>
              <p className="hiw-trust-desc">100% compatible TMoney &amp; Moov Money</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
