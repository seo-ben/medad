import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Smartphone, Send } from 'lucide-react';

interface PreApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export const PreApprovalModal: React.FC<PreApprovalModalProps> = ({ isOpen, onClose, initialData }) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Agoè Cacavéli');
  const [activity, setActivity] = useState('Commerce de détail / Gros');
  const [amount, setAmount] = useState(initialData?.amount ? String(initialData.amount) : '500000');
  const [mobileOperator, setMobileOperator] = useState<'mixx' | 'flooz'>('mixx');
  const [consentIPDCP, setConsentIPDCP] = useState(false); // Strictement NON pré-cochée selon la loi IPDCP

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentIPDCP) {
      alert('Veuillez accepter les conditions de traitement de données pour soumettre votre demande.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const formatCFA = (val: string) => {
    const num = Number(val);
    return isNaN(num) ? val : new Intl.NumberFormat('fr-FR').format(num) + ' F CFA';
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '560px',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-light)',
        animation: 'fadeIn 0.25s ease-out',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header Modal */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: 'linear-gradient(135deg, var(--primary) 0%, #064e2b 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#a7f3d0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Service Gratuit sans frais • Étape {step} sur 3
            </div>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
              Pré-approbation Express de Financement
            </h3>
          </div>
          <button
            onClick={handleReset}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Barre de Progression */}
        <div style={{ height: '4px', background: '#e2e8f0', width: '100%' }}>
          <div style={{
            height: '100%',
            width: isSubmitted ? '100%' : `${(step / 3) * 100}%`,
            background: 'var(--secondary)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Corps du Formulaire */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              {/* ÉTAPE 1 : Identité & Activité */}
              {step === 1 && (
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                    1. Votre identité et votre activité
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Ces informations permettent à votre conseiller de secteur de vous contacter rapidement.
                  </p>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Nom et Prénom complets *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Afiwa DAGBE"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Numéro de Téléphone actif (Togo) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex : +228 90 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Secteur d'Activité *
                    </label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.9rem',
                        background: '#ffffff'
                      }}
                    >
                      <option value="Commerce de détail / Gros">Commerce de détail / Gros (marché, pagnes, vivres...)</option>
                      <option value="Artisanat & Métiers d'art">Artisanat & Métiers d'art (menuiserie, couture, ferronnerie)</option>
                      <option value="Restauration & Alimentation">Restauration & Alimentation de proximité</option>
                      <option value="Prestation de services & Transport">Prestation de services & Transport</option>
                      <option value="Autre activité génératrice de revenus">Autre activité génératrice de revenus</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Quartier / Marché de rattachement (Grand Lomé) *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.9rem',
                        background: '#ffffff'
                      }}
                    >
                      <option value="Agoè Cacavéli">Agoè Cacavéli (Siège)</option>
                      <option value="Adidogomé">Adidogomé (Assiyéyé)</option>
                      <option value="Vakpossito">Vakpossito</option>
                      <option value="Zanguera">Zanguera</option>
                      <option value="Legbassito">Legbassito</option>
                      <option value="Kégué - Attiégou">Kégué - Attiégou</option>
                      <option value="Hédzranawoé">Hédzranawoé</option>
                      <option value="Autre quartier du Grand Lomé">Autre quartier du Grand Lomé</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      disabled={!fullName || !phone}
                      onClick={() => setStep(2)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        background: !fullName || !phone ? '#cbd5e1' : 'var(--primary)',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        border: 'none',
                        cursor: !fullName || !phone ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>Continuer vers le Financement</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 2 : Financement & Réseau Mobile */}
              {step === 2 && (
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                    2. Modalités de financement souhaitées
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Indiquez le besoin estimé pour le réapprovisionnement de votre étal ou vos équipements.
                  </p>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Montant approximatif désiré (en Francs CFA) *
                    </label>
                    <input
                      type="number"
                      required
                      min="50000"
                      max="5000000"
                      step="25000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--primary)'
                      }}
                    />
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Soit environ : <strong>{formatCFA(amount)}</strong>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      Opérateur Mobile Money préféré pour le déblocage :
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => setMobileOperator('mixx')}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '12px',
                          border: mobileOperator === 'mixx' ? '2px solid #0072ce' : '1px solid var(--border-light)',
                          background: mobileOperator === 'mixx' ? '#eff6ff' : '#ffffff',
                          color: mobileOperator === 'mixx' ? '#0072ce' : 'var(--text-primary)',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <Smartphone size={18} color="#0072ce" />
                        <span>Mixx (YAS)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMobileOperator('flooz')}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '12px',
                          border: mobileOperator === 'flooz' ? '2px solid #f6821f' : '1px solid var(--border-light)',
                          background: mobileOperator === 'flooz' ? '#fff7ed' : '#ffffff',
                          color: mobileOperator === 'flooz' ? '#c2410c' : 'var(--text-primary)',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <Smartphone size={18} color="#f6821f" />
                        <span>Moov Money (Flooz)</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-light)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <ArrowLeft size={16} />
                      <span>Retour</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        background: 'var(--primary)',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>Vérifier & Valider</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 3 : Rassurance IPDCP & Confirmation */}
              {step === 3 && (
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                    3. Confirmation & Consentement Réglementaire
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Récapitulatif de votre demande avant instruction gratuite par nos équipes.
                  </p>

                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    border: '1px solid var(--border-light)',
                    marginBottom: '1.25rem',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Demandeur :</span>
                      <strong>{fullName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Téléphone :</span>
                      <strong>{phone}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Localisation :</span>
                      <strong>{district}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Activité :</span>
                      <span>{activity}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0', marginTop: '0.5rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Montant souhaité :</span>
                      <strong style={{ color: 'var(--primary)', fontSize: '1rem' }}>{formatCFA(amount)}</strong>
                    </div>
                  </div>

                  {/* Règle stricte IPDCP (Loi n° 2019-014) - Case non pré-cochée */}
                  <div style={{
                    background: '#f0fdf4',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #bbf7d0',
                    marginBottom: '1.5rem'
                  }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      <input
                        type="checkbox"
                        checked={consentIPDCP}
                        onChange={(e) => setConsentIPDCP(e.target.checked)}
                        style={{ marginTop: '2px', accentColor: 'var(--primary)', width: '16px', height: '16px', flexShrink: 0 }}
                      />
                      <span>
                        J'autorise expressément Medad Microfinance à traiter mes coordonnées pour l'étude préalable de ma demande, conformément à la 
                        <strong> Loi n° 2019-014 (IPDCP Togo)</strong>. Mes données restent strictement confidentielles et ne seront jamais cédées à des tiers.
                      </span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-light)',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Retour
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !consentIPDCP}
                      style={{
                        padding: '0.85rem 1.75rem',
                        borderRadius: '10px',
                        background: isSubmitting || !consentIPDCP ? '#cbd5e1' : 'linear-gradient(135deg, var(--secondary) 0%, #b45309 100%)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.92rem',
                        border: 'none',
                        cursor: isSubmitting || !consentIPDCP ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)'
                      }}
                    >
                      <Send size={16} />
                      <span>{isSubmitting ? 'Envoi en cours...' : 'Soumettre Ma Demande'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* Écran de Confirmation Réussie */
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <CheckCircle2 size={36} color="#16a34a" />
              </div>

              <h4 style={{ fontSize: '1.4rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                Demande transmise avec succès !
              </h4>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                Merci <strong>{fullName}</strong>. Un conseiller commercial de votre secteur (<strong>{district}</strong>) vous contactera 
                au <strong>{phone}</strong> d'ici 24h pour finaliser sans frais l'instruction de votre dossier.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a
                  href={`https://wa.me/22897317825?text=Bonjour%20Medad%20Microfinance,%20je%20viens%20de%20soumettre%20une%20demande%20de%20pr%C3%A9-approbation%20pour%20${encodeURIComponent(fullName)}%20(${encodeURIComponent(amount)}%20F%20CFA)%20pour%20la%20zone%20de%20${encodeURIComponent(district)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.85rem',
                    borderRadius: '10px',
                    background: '#22c55e',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>Accélérer le traitement sur WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '10px',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-light)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
