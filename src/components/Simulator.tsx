import React, { useState, useId } from 'react';
import { Calculator, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface SimulatorProps {
  onOpenPreApproval: (data?: any) => void;
}

export const Simulator: React.FC<SimulatorProps> = ({ onOpenPreApproval }) => {
  const [activeMode, setActiveMode] = useState<'credit' | 'tontine'>('credit');

  // Paramètres Crédit
  const [amount, setAmount] = useState<number>(500000); // 500 000 F CFA
  const [durationMonths, setDurationMonths] = useState<number>(6); // 6 mois
  const [frequency, setFrequency] = useState<'monthly' | 'weekly'>('monthly');
  const annualInterestRate = 0.18; // 18% l'an (strictement inférieur au plafond de 24% BCEAO)

  // Paramètres Tontine
  const [dailyAmount, setDailyAmount] = useState<number>(1000); // 1 000 F CFA / jour
  const tontineDays = 30; // 30 jours (1 mois)

  const amountInputId = useId();
  const durationInputId = useId();
  const dailyInputId = useId();

  // Formule d'amortissement constante : E = C * (i/k) / (1 - (1 + i/k)^(-n))
  const calculatePeriodicPayment = () => {
    const C = amount;
    const i = annualInterestRate;
    const k = frequency === 'monthly' ? 12 : 52;
    const n = frequency === 'monthly' ? durationMonths : Math.round(durationMonths * 4.33);

    const periodicRate = i / k;
    const payment = (C * periodicRate) / (1 - Math.pow(1 + periodicRate, -n));
    const totalRepaid = payment * n;
    const totalInterest = totalRepaid - C;

    return {
      periodicPayment: Math.round(payment),
      totalRepaid: Math.round(totalRepaid),
      totalInterest: Math.round(totalInterest),
      totalPeriods: n,
      teg: (annualInterestRate * 100).toFixed(1)
    };
  };

  const results = calculatePeriodicPayment();

  // Calcul tontine
  const totalTontine = dailyAmount * tontineDays;

  const formatCFA = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' F CFA';
  };

  return (
    <section id="simulateur" style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            background: '#dcfce7',
            color: '#166534',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}>
            <Calculator size={14} />
            <span>MOTEUR DE CALCUL CERTIFIÉ SANS FRAIS CACHÉS</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--dark)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Simulez votre financement en toute transparence
          </h2>

          <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Chez Medad Microfinance, chaque franc est justifié. Vos mensualités sont calculées selon la formule réglementaire 
            de l'<strong>UEMOA</strong>, avec un taux effectif global (TEG) toujours en dessous du plafond légal de 24 % l'an.
          </p>

          {/* Sélecteur de mode (Crédit vs Tontine) */}
          <div style={{
            display: 'inline-flex',
            background: '#ffffff',
            padding: '0.3rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            marginTop: '1.25rem'
          }}>
            <button
              onClick={() => setActiveMode('credit')}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeMode === 'credit' ? 'var(--primary)' : 'transparent',
                color: activeMode === 'credit' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Simulateur de Crédit
            </button>
            <button
              onClick={() => setActiveMode('tontine')}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeMode === 'tontine' ? 'var(--primary)' : 'transparent',
                color: activeMode === 'tontine' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Simulateur de Tontine Sécurisée
            </button>
          </div>
        </div>

        {/* Bloc Principal du Simulateur */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
          maxWidth: '1020px',
          margin: '0 auto'
        }}>
          {activeMode === 'credit' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 0
            }} className="sim-grid">
              {/* Formulaire Sliders */}
              <div style={{ padding: '2.5rem 2rem', borderRight: '1px solid var(--border-light)' }}>
                {/* Montant désiré */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <label htmlFor={amountInputId} style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--dark)' }}>
                      Montant du Financement :
                    </label>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {formatCFA(amount)}
                    </span>
                  </div>
                  <input
                    id={amountInputId}
                    type="range"
                    min={50000}
                    max={3000000}
                    step={25000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: 'var(--primary)',
                      height: '8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    <span>50 000 F CFA</span>
                    <span>1 500 000 F CFA</span>
                    <span>3 000 000 F CFA</span>
                  </div>
                </div>

                {/* Durée */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <label htmlFor={durationInputId} style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--dark)' }}>
                      Durée de remboursement :
                    </label>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--secondary)' }}>
                      {durationMonths} mois
                    </span>
                  </div>
                  <input
                    id={durationInputId}
                    type="range"
                    min={3}
                    max={24}
                    step={1}
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: 'var(--secondary)',
                      height: '8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    <span>3 mois</span>
                    <span>12 mois</span>
                    <span>24 mois</span>
                  </div>
                </div>

                {/* Fréquence de remboursement */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.92rem', color: 'var(--dark)', marginBottom: '0.6rem' }}>
                    Fréquence des échéances :
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: frequency === 'monthly' ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                        background: frequency === 'monthly' ? 'var(--primary-light)' : '#ffffff',
                        color: frequency === 'monthly' ? 'var(--primary)' : 'var(--text-primary)',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      Mensuelle (recommandée)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('weekly')}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: frequency === 'weekly' ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                        background: frequency === 'weekly' ? 'var(--primary-light)' : '#ffffff',
                        color: frequency === 'weekly' ? 'var(--primary)' : 'var(--text-primary)',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      Hebdomadaire (marchés)
                    </button>
                  </div>
                </div>

                {/* Info Usure & Sécurité */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  color: '#15803d',
                  background: '#f0fdf4',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '8px',
                  border: '1px solid #bbf7d0'
                }}>
                  <ShieldCheck size={16} color="#16a34a" />
                  <span>Taux appliqué : <strong>1,5% / mois (18% l'an)</strong>, sous le seuil d'usure de 24% UEMOA.</span>
                </div>
              </div>

              {/* Résumé du Calcul & Déclencheur Pré-approbation */}
              <div style={{
                background: '#073d25',
                color: '#ffffff',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: '#a7f3d0', fontWeight: 700, letterSpacing: '0.05em' }}>
                      Échéance estimée
                    </span>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      color: '#fef08a'
                    }}>
                      Amortissement constant
                    </span>
                  </div>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <div style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
                      {formatCFA(results.periodicPayment)}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#86efac', marginTop: '0.25rem' }}>
                      par {frequency === 'monthly' ? 'mois' : 'semaine'} pendant {results.totalPeriods} {frequency === 'monthly' ? 'mois' : 'semaines'}
                    </div>
                  </div>

                  {/* Tableau des détails */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginBottom: '1.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: '#cbd5e1' }}>Capital emprunté :</span>
                      <span style={{ fontWeight: 700 }}>{formatCFA(amount)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: '#cbd5e1' }}>Intérêts totaux :</span>
                      <span style={{ fontWeight: 700, color: '#fef08a' }}>{formatCFA(results.totalInterest)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: '#cbd5e1' }}>Frais de dossier :</span>
                      <span style={{ fontWeight: 700, color: '#86efac' }}>0 F CFA</span>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.15)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>Total à rembourser :</span>
                      <span style={{ fontWeight: 800, color: '#ffffff' }}>{formatCFA(results.totalRepaid)}</span>
                    </div>
                  </div>
                </div>

                {/* Bouton d'Action */}
                <div>
                  <button
                    onClick={() => onOpenPreApproval({ amount, duration: durationMonths, periodicPayment: results.periodicPayment, frequency })}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '1rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 8px 20px rgba(217, 119, 6, 0.35)',
                      transition: 'transform 0.15s'
                    }}
                  >
                    <span>Demander une Pré-approbation Gratuite</span>
                    <ArrowRight size={18} />
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.74rem', color: '#a7f3d0' }}>
                    Sans engagement juridique • Réponse sous 24h ouvrées
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mode Tontine */
            <div style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Sparkles size={28} color="#0284c7" />
              </div>

              <h3 style={{ fontSize: '1.5rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                Estimez votre collecte journalière sécurisée
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                L'agent collecteur Medad passe à votre commerce tous les jours et enregistre votre cotisation avec un reçu SMS instantané.
              </p>

              <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label htmlFor={dailyInputId} style={{ fontWeight: 700, fontSize: '0.9rem' }}>Votre cotisation quotidienne :</label>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{formatCFA(dailyAmount)} / jour</span>
                </div>
                <input
                  id={dailyInputId}
                  type="range"
                  min={500}
                  max={25000}
                  step={500}
                  value={dailyAmount}
                  onChange={(e) => setDailyAmount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  <span>500 F CFA</span>
                  <span>10 000 F CFA</span>
                  <span>25 000 F CFA</span>
                </div>
              </div>

              <div style={{
                background: 'var(--primary-light)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #bbf7d0',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Total épargné après 30 jours de tontine :
                </div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary)', margin: '0.3rem 0' }}>
                  {formatCFA(totalTontine)}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Traçabilité numérique à 100% • Débloqué selon vos besoins ou reconductible</span>
                </div>
              </div>

              <button
                onClick={() => onOpenPreApproval({ product: 'tontine', dailyAmount })}
                style={{
                  padding: '0.9rem 2rem',
                  borderRadius: '12px',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Commencer ma Tontine avec un agent de quartier
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .sim-grid {
            grid-template-columns: 1.15fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
