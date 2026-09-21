import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, ArrowRight } from 'lucide-react';

const SERVICE_LABELS: Record<string, string> = {
  'credit-tresorerie': 'Microcrédit Trésorerie & Stocks (Commerçants)',
  'credit-equipement': 'Crédit Équipement & Outillage (Artisans)',
  'tontine': 'Tontine Sécurisée avec reçu SMS',
  'epargne': "Livret d'Épargne Rémunérée",
  'autre': 'Autre demande / Renseignement général'
};

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    neighborhood: '',
    serviceType: 'credit-tresorerie',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabel = SERVICE_LABELS[formData.serviceType] || formData.serviceType;

    // Construction du message WhatsApp soigné et structuré
    const messageLines = [
      "Bonjour Medad Microfinance,",
      "",
      "Je souhaite être recontacté(e) pour un accompagnement :",
      `👤 Nom & Prénoms : ${formData.fullName}`,
      `📞 Téléphone : ${formData.phone}`,
      `📍 Quartier : ${formData.neighborhood}`,
      `💼 Service souhaité : ${serviceLabel}`,
      formData.message ? `📝 Détails du projet : ${formData.message}` : "",
      "",
      "_Message envoyé depuis le site web Medad Microfinance_"
    ].filter(Boolean).join("\n");

    const whatsappUrl = `https://wa.me/22897317825?text=${encodeURIComponent(messageLines)}`;
    setLastWhatsappUrl(whatsappUrl);
    setIsSubmitted(true);

    // Ouvre directement WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section
      id="contact"
      style={{
        padding: '6rem 0',
        backgroundColor: '#faf8f5',
        position: 'relative',
        borderTop: '1px solid #efe8df'
      }}
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Titre Principal sans aucun label au-dessus */}
        <div style={{ maxWidth: '750px', marginBottom: '3.5rem' }}>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', 'Outfit', sans-serif",
              fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#0f241d',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1rem'
            }}
          >
            Parlons de votre projet dès aujourd'hui
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
              color: '#475569',
              lineHeight: 1.7,
              margin: 0
            }}
          >
            Besoin d’un financement rapide, d’un renseignement sur la tontine ou d’un rendez-vous sur votre lieu de travail ? Nos agents vous répondent immédiatement par téléphone, WhatsApp ou directement en agence.
          </p>
        </div>

        {/* Grille : Coordonnées Officielles (Gauche) + Formulaire Rapide (Droite) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* Colonne Gauche : Coordonnées & Horaires */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Carte Siège Social */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f241d', margin: '0 0 0.4rem 0' }}>
                    Siège & Agence Principale
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                    Boulevard Faure Gnassingbé, Agoè Cacavéli<br />
                    (Face à l'ex-restaurant 20/20, à côté de la maison royale)<br />
                    <strong>06 BP 61390 Lomé, Togo</strong>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Clock size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f241d', margin: '0 0 0.4rem 0' }}>
                    Horaires d'Ouverture
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                    <strong>Lundi au Vendredi :</strong> 07:30 – 19:00 (Journée continue)<br />
                    <strong>Samedi & Dimanche :</strong> Fermé (Permanence WhatsApp active)
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f241d', margin: '0 0 0.4rem 0' }}>
                    Lignes Directes
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                    Fixe : <a href="tel:+22823353559" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>+228 23 35 35 59</a><br />
                    Mobile / Agence : <a href="tel:+22870453555" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>+228 70 45 35 55</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton d'Assistance WhatsApp Officiel */}
            <a
              href="https://wa.me/22897317825"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.75rem',
                backgroundColor: '#22c55e',
                color: '#ffffff',
                borderRadius: '18px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.05rem',
                boxShadow: '0 8px 20px -4px rgba(34, 197, 94, 0.4)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MessageSquare size={24} />
                <div>
                  <div>Échanger sur WhatsApp</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#dcfce7' }}>Réponse rapide en Mina, Éwé ou Français</div>
                </div>
              </div>
              <ArrowRight size={20} />
            </a>

          </div>

          {/* Colonne Droite : Formulaire de Message Direct */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '2.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px -8px rgba(15, 36, 29, 0.08)'
            }}
          >
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#0f241d',
                marginBottom: '0.5rem'
              }}
            >
              Envoyez-nous un message direct
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '2rem' }}>
              Remplissez ce formulaire et un agent de votre quartier vous contactera sous 24h.
            </p>

            {isSubmitted ? (
              <div
                style={{
                  padding: '2.5rem 1.75rem',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '20px',
                  textAlign: 'center',
                  color: '#065f46'
                }}
              >
                <CheckCircle2 size={46} style={{ margin: '0 auto 0.85rem auto', display: 'block', color: '#16a34a' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#0f241d' }}>
                  Demande transmise avec succès !
                </h4>
                <p style={{ fontSize: '0.94rem', color: '#166534', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                  Merci pour votre confiance. Votre message a bien été préparé. Si la transmission ne s'est pas lancée automatiquement, cliquez sur le bouton ci-dessous :
                </p>
                <a
                  href={lastWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.95rem 1.8rem',
                    backgroundColor: '#065f46',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 18px rgba(6, 95, 70, 0.25)'
                  }}
                >
                  <Send size={18} />
                  <span>Finaliser l'envoi de mon message</span>
                </a>
                <div style={{ marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        neighborhood: '',
                        serviceType: 'credit-tresorerie',
                        message: ''
                      });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#047857',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    Nom & Prénoms *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Abla Mensah"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Numéro de téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+228 90 XX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.95rem',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Quartier (Lomé) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Agoè, Adidogomé..."
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.95rem',
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    Type de demande
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      color: '#0f172a',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="credit-tresorerie">Microcrédit Trésorerie & Stocks (Commerçants)</option>
                    <option value="credit-equipement">Crédit Équipement & Outillage (Artisans)</option>
                    <option value="tontine">Tontine Sécurisée avec reçu SMS</option>
                    <option value="epargne">Livret d'Épargne Rémunérée</option>
                    <option value="autre">Autre demande / Renseignement général</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    Votre message ou activité
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Décrivez brièvement votre projet ou votre boutique..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    padding: '1rem 2rem',
                    borderRadius: '9999px',
                    backgroundColor: '#065f46',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(6, 95, 70, 0.25)',
                    transition: 'all 0.2s ease',
                    marginTop: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#044e39';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#065f46';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Send size={18} />
                  <span>Envoyer ma demande</span>
                </button>
                <span style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center', display: 'block', marginTop: '0.25rem' }}>
                  Un conseiller de proximité prendra contact avec vous dans les plus brefs délais.
                </span>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
