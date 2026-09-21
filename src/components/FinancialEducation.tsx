import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  ArrowRight, 
  MessageSquare
} from 'lucide-react';

interface Advice {
  id: string;
  num: string;
  category: string;
  title: string;
  goldenRule: string;
  badHabit: string;
  goodPractice: string;
  metricNumber: string;
  metricUnit: string;
  metricLabel: string;
}

const ADVICES: Advice[] = [
  {
    id: 'caisse',
    num: '01',
    category: 'Discipline de caisse',
    title: 'Tenir son cahier de caisse',
    goldenRule: 'Chaque franc noté est un franc protégé.',
    badHabit: 'Dépenser les petites recettes de la journée sans les noter.',
    goodPractice: 'Enregistrer chaque vente et pointer la caisse chaque soir avant fermeture.',
    metricNumber: '+75 000',
    metricUnit: 'F CFA',
    metricLabel: 'de fuites de trésorerie évitées en moyenne chaque mois'
  },
  {
    id: 'separation',
    num: '02',
    category: 'Protection du stock',
    title: 'Séparer les deux poches',
    goldenRule: 'La dépense de la famille ne touche jamais au capital du commerce.',
    badHabit: 'Piocher directement dans la recette du jour pour régler les imprévus du foyer.',
    goodPractice: 'Se fixer un salaire hebdomadaire précis et sanctuariser le fonds de rotation.',
    metricNumber: '100%',
    metricUnit: 'sécurisé',
    metricLabel: 'du capital de réapprovisionnement préservé intact'
  },
  {
    id: 'credit',
    num: '03',
    category: 'Maîtrise du crédit',
    title: 'La règle des 30% d\'endettement',
    goldenRule: 'Le crédit doit enrichir votre activité, jamais l\'étouffer.',
    badHabit: 'Emprunter pour combler un retard de caisse ou des charges personnelles.',
    goodPractice: 'Garder les remboursements sous 30% du bénéfice net pour des stocks à vente assurée.',
    metricNumber: '≤ 30%',
    metricUnit: 'du bénéfice',
    metricLabel: 'remboursement maximum recommandé pour une croissance saine'
  },
  {
    id: 'anticipation',
    num: '04',
    category: 'Anticipation des cycles',
    title: 'Préparer la saison creuse',
    goldenRule: 'Les périodes de fête financent la sérénité des mois calmes.',
    badHabit: 'Tout dépenser en période de forte vente sans provisionner pour après.',
    goodPractice: 'Bloquer 15% de surplus sur un compte tontine pour couvrir 3 mois de charges.',
    metricNumber: '3 Mois',
    metricUnit: 'd\'avance',
    metricLabel: 'de trésorerie pour traverser les baisses d\'activité sans brader vos prix'
  }
];

export const FinancialEducation: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto progression douce toutes les 7 secondes si non survolé
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ADVICES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = ADVICES[activeIdx];

  return (
    <section 
      id="education" 
      style={{ 
        backgroundColor: '#ffffff', 
        padding: '5.5rem 0',
        position: 'relative'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        .fed-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* En-tête de section aérée */
        .fed-header {
          max-width: 760px;
          margin-bottom: 3.5rem;
        }

        .fed-title {
          font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
          font-size: clamp(2.1rem, 3.8vw, 3.2rem);
          font-weight: 800;
          color: #0f241d;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin: 0 0 1rem 0;
        }

        .fed-subtitle {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }

        /* Ligne de navigation horizontale fluide sans cadre */
        .fed-nav-track {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 3.5rem;
        }

        .fed-nav-tab {
          background: none;
          border: none;
          padding: 0 0 1.25rem 0;
          text-align: left;
          cursor: pointer;
          position: relative;
          transition: all 0.25s ease;
        }

        .fed-nav-tab::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 3px;
          background-color: #065f46;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fed-nav-tab.active::after {
          width: 100%;
        }

        .fed-nav-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.35rem;
          font-weight: 800;
          color: #94a3b8;
          display: block;
          margin-bottom: 0.35rem;
          transition: color 0.25s ease;
        }

        .fed-nav-tab.active .fed-nav-num {
          color: #065f46;
        }

        .fed-nav-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #64748b;
          line-height: 1.35;
          display: block;
          transition: color 0.25s ease;
        }

        .fed-nav-tab.active .fed-nav-title {
          color: #0f241d;
        }

        .fed-nav-tab:hover .fed-nav-title {
          color: #065f46;
        }

        /* Grille principale sans aucune card */
        .fed-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 5rem;
          align-items: center;
        }

        /* Animation d'apparition de contenu */
        @keyframes fedFadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fed-animated-content {
          animation: fedFadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Colonne de gauche */
        .fed-category {
          font-size: 0.82rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #059669;
          margin-bottom: 0.75rem;
        }

        .fed-golden-rule {
          font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
          font-size: clamp(1.8rem, 2.8vw, 2.5rem);
          font-weight: 800;
          color: #0f241d;
          line-height: 1.22;
          margin: 0 0 2.25rem 0;
          letter-spacing: -0.02em;
        }

        /* Comparaison directe sans cadre */
        .fed-comparison {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          margin-bottom: 2.5rem;
        }

        .fed-compare-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .fed-badge-bad {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: #fee2e2;
          color: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .fed-badge-good {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: #ecfdf5;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .fed-compare-text {
          font-size: 1.02rem;
          line-height: 1.5;
        }

        .fed-text-bad {
          color: #64748b;
          text-decoration: line-through;
          text-decoration-color: #f87171;
        }

        .fed-text-good {
          color: #0f241d;
          font-weight: 600;
        }

        /* Bouton conversationnel épuré */
        .fed-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background-color: #065f46;
          color: #ffffff;
          padding: 0.9rem 1.75rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(6, 95, 70, 0.25);
        }

        .fed-action-btn:hover {
          background-color: #044e39;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(6, 95, 70, 0.35);
        }

        /* Colonne droite : Grand chiffre géant animé */
        .fed-metric-pane {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 2rem;
          border-left: 2px solid #f1f5f9;
        }

        .fed-metric-value {
          font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
          font-size: clamp(3.2rem, 5.5vw, 5rem);
          font-weight: 900;
          color: #065f46;
          line-height: 1;
          letter-spacing: -0.04em;
          margin-bottom: 0.35rem;
        }

        .fed-metric-unit {
          font-size: 1.35rem;
          font-weight: 800;
          color: #059669;
          margin-left: 0.5rem;
        }

        .fed-metric-label {
          font-size: 1.05rem;
          color: #475569;
          font-weight: 500;
          line-height: 1.5;
          margin: 0 0 2rem 0;
          max-width: 380px;
        }

        /* Petit indicateur de cycle interactif */
        .fed-dots {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .fed-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #cbd5e1;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .fed-dot.active {
          width: 24px;
          background-color: #065f46;
        }

        @media (max-width: 960px) {
          .fed-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .fed-metric-pane {
            padding-left: 0;
            border-left: none;
            border-top: 2px solid #f1f5f9;
            padding-top: 2.5rem;
          }
          .fed-nav-track {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 600px) {
          .fed-nav-track {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="fed-wrapper">
        
        {/* Titre sans étiquette */}
        <div className="fed-header">
          <h2 className="fed-title">
            Des conseils concrets pour faire grandir vos bénéfices
          </h2>
          <p className="fed-subtitle">
            4 principes simples et éprouvés par les commerçants du Grand Lomé pour pérenniser leur commerce et éviter les pièges financiers.
          </p>
        </div>

        {/* Ligne de navigation épurée */}
        <div className="fed-nav-track" role="tablist">
          {ADVICES.map((item, index) => {
            const isActive = activeIdx === index;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                className={`fed-nav-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIdx(index)}
              >
                <span className="fed-nav-num">{item.num}</span>
                <span className="fed-nav-title">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Contenu principal - Sans aucune card */}
        <div key={current.id} className="fed-layout fed-animated-content">
          
          {/* Côté gauche : La règle et l'action */}
          <div>
            <div className="fed-category">{current.category}</div>
            <h3 className="fed-golden-rule">« {current.goldenRule} »</h3>

            <div className="fed-comparison">
              {/* Le piège courant */}
              <div className="fed-compare-item">
                <div className="fed-badge-bad">
                  <X size={15} strokeWidth={3} />
                </div>
                <div className="fed-compare-text fed-text-bad">
                  {current.badHabit}
                </div>
              </div>

              {/* Le bon réflexe */}
              <div className="fed-compare-item">
                <div className="fed-badge-good">
                  <Check size={15} strokeWidth={3} />
                </div>
                <div className="fed-compare-text fed-text-good">
                  {current.goodPractice}
                </div>
              </div>
            </div>

            {/* Bouton direct vers un conseiller WhatsApp */}
            <div style={{ marginTop: '2rem' }}>
              <a
                href={`https://wa.me/22897317825?text=Bonjour%20Medad,%20je%20souhaite%20un%20conseil%20pratique%20sur%20:%20${encodeURIComponent(current.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fed-action-btn"
              >
                <MessageSquare size={17} />
                <span>Demander conseil à un agent Medad</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Côté droit : Impact mesurable & Repères */}
          <div className="fed-metric-pane">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="fed-metric-value">{current.metricNumber}</span>
              <span className="fed-metric-unit">{current.metricUnit}</span>
            </div>
            <p className="fed-metric-label">{current.metricLabel}</p>

            {/* Pagination à points cliquables */}
            <div className="fed-dots">
              {ADVICES.map((_, i) => (
                <span
                  key={i}
                  className={`fed-dot ${activeIdx === i ? 'active' : ''}`}
                  onClick={() => setActiveIdx(i)}
                  title={`Conseil ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
