import React from 'react';
import { Phone, Mail, MapPin, Scale, Lock, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#072b1b', color: '#cbd5e1', paddingTop: '4.5rem', paddingBottom: '2.5rem', fontSize: '0.88rem' }}>
      <div className="container">
        
        {/* Grille Principale */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          
          {/* Colonne 1 : Identité & Tutelle */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img
                src="/medad-emblem-transparent.png"
                alt="Medad Microfinance Togo"
                style={{ width: '48px', height: '48px', objectFit: 'contain' }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: '#ffffff' }}>
                  MEDAD MICROFINANCE
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Système Financier Décentralisé Agréé
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Établissement mutualiste et d'inclusion financière au Togo, régulé par les autorités prudentielles de l'UEMOA. 
              Dédié à l'émancipation économique des commerçantes, artisans et micro-entrepreneurs.
            </p>

            
          </div>

          {/* Colonne 2 : Produits & Services */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1.25rem', fontWeight: 700 }}>
              Nos Solutions
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <a href="#produits" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>
                  Microcrédit de Trésorerie & Stocks
                </a>
              </li>
              <li>
                <a href="#produits" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>
                  Crédit d'Équipement Artisanal
                </a>
              </li>
              <li>
                <a href="#tontine" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>
                  Tontine Moderne Sécurisée (SMS)
                </a>
              </li>
              <li>
                <a href="#produits" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>
                  Livret d'Épargne & Dépôt à Terme (DAT)
                </a>
              </li>
              <li>
                <a href="#simulateur" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>
                  Simulateur d'Échéances Réglementaire
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Siège & Contacts Grand Lomé */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1.25rem', fontWeight: 700 }}>
              Siège Social & Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Bd. Faure Gnassingbé (face ex-restaurant 20/20, à côté de la Maison Royale), Agoè-Cacavéli, 06 BP 61390 Lomé</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Phone size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div>
                    <a href="tel:+22897317825" style={{ color: '#ffffff', fontWeight: 700 }}>
                      +228 97 31 78 25
                    </a>
                    <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}> (WhatsApp / Mobile)</span>
                  </div>
                  <div style={{ marginTop: '0.2rem' }}>
                    <a href="tel:+22823353559" style={{ color: '#cbd5e1', fontWeight: 600 }}>
                      +228 23 35 35 59
                    </a>
                    <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}> (Fixe)</span>
                    <span style={{ color: '#64748b' }}> • </span>
                    <a href="tel:+22870453555" style={{ color: '#cbd5e1', fontWeight: 600 }}>
                      +228 70 45 35 55
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Mail size={18} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>contact@medadmicrofinance-tg.com</span>
              </div>

              <div style={{ marginTop: '0.5rem', color: '#94a3b8' }}>
                Couverture : Agoè-Cacavéli, Vakpossito, Zanguéra, Legbassito, Adidogomé, Kégué, Attiégou, Hédzranawoé.
              </div>
            </div>
          </div>

          {/* Colonne 4 : Protection & Médiation Réglementaire */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '1.25rem', fontWeight: 700 }}>
              Cadre Prudentiel & Recours
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Scale size={18} color="#f59e0b" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#ffffff' }}>Médiation OQSF-Togo :</strong>
                  <div>En cas de litige non résolu, accès gratuit à la médiation de l'Observatoire de la Qualité des Services Financiers.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Lock size={18} color="#38bdf8" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#ffffff' }}>Conformité IPDCP (Loi 2019-014) :</strong>
                  <div>Traitement rigoureux des données nominatives. DPO basé à Agoè Cacavéli.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <HeartHandshake size={18} color="#4ade80" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#ffffff' }}>Plafond Usure BCEAO :</strong>
                  <div>Taux d'usure strictement respecté et plafonné à 24 % l'an.</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mentions Légales & Copyright */}
        <div style={{
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} Medad Microfinance Togo. Tous droits réservés. Système Financier Décentralisé (SFD) enregistré.
          </div>

          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span style={{ color: '#94a3b8' }}>Agrément CAS-IMEC / UEMOA</span>
            <span style={{ color: '#94a3b8' }}>Loi n° 2019-014 IPDCP</span>
            <span style={{ color: '#94a3b8' }}>Médiation OQSF-Togo</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
