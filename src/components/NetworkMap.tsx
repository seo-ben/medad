import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Building2, 
  Navigation, 
  Store, 
  MessageSquare, 
  ArrowUpRight,
  Languages,
  CheckCircle2,
  Car
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface AgencySocial {
  id: string;
  name: string;
  district: string;
  type: 'headquarter' | 'market' | 'craftsman';
  typeLabel: string;
  tag: string;
  address: string;
  zemidjanGuide: string; // Indication pour le taxi-moto
  onSiteGuide: string;   // Repère physique une fois sur place
  socialContext: string; // Pourquoi cette agence existe pour ce public
  languages: string[];
  hours: string;
  phone: string;
  phoneRaw: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
}

const SOCIAL_AGENCIES: AgencySocial[] = [
  {
    id: 'cacaveli',
    name: 'Siège Central & Agence Principale',
    district: 'Agoè Cacavéli',
    type: 'headquarter',
    typeLabel: 'Direction & Guichets Centraux',
    tag: 'Siège',
    address: 'Boulevard Faure Gnassingbé, Immeuble Medad, face station Sanol, Lomé',
    zemidjanGuide: '« Agoè Cacavéli, Carrefour 2 Lions, Immeuble Medad en face de la station Sanol »',
    onSiteGuide: 'Au Carrefour 2 Lions : grand Immeuble Medad, directement en face de la station-service Sanol.',
    socialContext: 'Guichet principal climatisé, comités d\'octroi de crédit, accueil des groupements et micro-entreprises formalisées.',
    languages: ['Français', 'Mina', 'Éwé', 'Kabyè'],
    hours: 'Lun - Ven : 07h30 - 17h30 • Sam : 08h00 - 12h30',
    phone: '+228 97 31 78 25',
    phoneRaw: '+22897317825',
    lat: 6.2085,
    lng: 1.1895,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=6.2085,1.1895'
  },
  {
    id: 'adidogome',
    name: 'Agence Marché Assiyéyé',
    district: 'Adidogomé Assiyéyé',
    type: 'market',
    typeLabel: 'Pôle Marché & Revendeuses',
    tag: 'Marché',
    address: 'Marché d\'Adidogomé Assiyéyé, axe carrefour Douane, Lomé',
    zemidjanGuide: '« Adidogomé Assiyéyé, grand marché vers le carrefour Douane »',
    onSiteGuide: 'Face au marché Assiyéyé, sur l\'axe menant au carrefour Douane, à côté de la pharmacie.',
    socialContext: 'Implantée au contact immédiat des marchandes de vivres, pagnes et demi-grossistes pour des versements rapides sans quitter le marché.',
    languages: ['Mina', 'Éwé', 'Français'],
    hours: 'Lun - Ven : 07h30 - 17h30 • Sam : 08h00 - 13h00 (Jour de marché)',
    phone: '+228 97 31 78 25',
    phoneRaw: '+22897317825',
    lat: 6.1725,
    lng: 1.1632,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=6.1725,1.1632'
  },
  {
    id: 'hedzranawoe',
    name: 'Point Conseil Friperies & Commerce',
    district: 'Hédzranawoé',
    type: 'market',
    typeLabel: 'Pôle Friperies & Négoce',
    tag: 'Friperies',
    address: 'À 50m de l\'entrée principale du Grand Marché des Friperies, Lomé',
    zemidjanGuide: '« Hédzranawoé, entrée principale du marché des friperies »',
    onSiteGuide: 'À 50 mètres de la porte d\'entrée principale du Grand Marché de Friperies d\'Hédzranawoé.',
    socialContext: 'Dédié aux commerçants de balles de friperie, grossistes et détaillants avec des solutions de crédit de trésorerie sur rotation rapide.',
    languages: ['Mina', 'Éwé', 'Français', 'Kotokoli'],
    hours: 'Lun - Ven : 08h00 - 17h00 • Sam : 08h00 - 12h30',
    phone: '+228 97 31 78 25',
    phoneRaw: '+22897317825',
    lat: 6.1685,
    lng: 1.2580,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=6.1685,1.2580'
  },
  {
    id: 'vakpossito',
    name: 'Point d\'Appui Vakpossito',
    district: 'Vakpossito',
    type: 'market',
    typeLabel: 'Point de Collecte & Tontine',
    tag: 'Tontine',
    address: 'Carrefour central de Vakpossito, à proximité du marché, Lomé',
    zemidjanGuide: '« Carrefour central de Vakpossito, non loin du marché »',
    onSiteGuide: 'Au grand carrefour central de Vakpossito, à 80m de l\'entrée du marché de quartier.',
    socialContext: 'Proximité des commerces de quartier et des femmes maraîchères. Collecteurs de tontine disponibles pour les cotisations journalières.',
    languages: ['Éwé', 'Mina', 'Français'],
    hours: 'Lun - Ven : 08h00 - 17h00 • Sam : 08h00 - 12h00',
    phone: '+228 97 31 78 25',
    phoneRaw: '+22897317825',
    lat: 6.2310,
    lng: 1.1780,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=6.2310,1.1780'
  },
  {
    id: 'zanguera',
    name: 'Antenne Artisans & Producteurs',
    district: 'Zanguera',
    type: 'craftsman',
    typeLabel: 'Pôle Artisanal & Périurbain',
    tag: 'Artisans',
    address: 'Route Nationale N°5 (RN5), en face du marché artisanal de Zanguera',
    zemidjanGuide: '« Zanguera sur la route de Kpalimé (RN5), face au marché artisanal »',
    onSiteGuide: 'Sur la RN5 (axe Lomé-Kpalimé) : directement en face du marché artisanal de Zanguera.',
    socialContext: 'Pensé pour les artisans du bois, mécaniciens, soudeurs et constructeurs qui financent leurs équipements et machines de travail.',
    languages: ['Éwé', 'Mina', 'Français'],
    hours: 'Lun - Ven : 08h00 - 17h00',
    phone: '+228 97 31 78 25',
    phoneRaw: '+22897317825',
    lat: 6.1820,
    lng: 1.1080,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=6.1820,1.1080'
  },
  {
    id: 'legbassito',
    name: 'Antenne Legbassito',
    district: 'Legbassito',
    type: 'craftsman',
    typeLabel: 'Point Proximité Nord',
    tag: 'Nord Lomé',
    address: 'Grand Carrefour Legbassito, axe commercial vers Mission-Tové',
    zemidjanGuide: '« Carrefour Legbassito, axe principal Mission-Tové »',
    onSiteGuide: 'Au rond-point / grand carrefour de Legbassito, sur l\'axe commercial principal.',
    socialContext: 'Soutien aux activités maraîchères, boutiques familiales et artisans du secteur Nord de l\'agglomération loméenne.',
    languages: ['Éwé', 'Mina', 'Français'],
    hours: 'Lun - Ven : 08h00 - 17h00',
    phone: '+228 97 31 78 25',
    phoneRaw: '+22897317825',
    lat: 6.2550,
    lng: 1.1920,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=6.2550,1.1920'
  },
  {
    id: 'kegue',
    name: 'Antenne Kégué & Attiégou',
    district: 'Kégué - Attiégou',
    type: 'market',
    typeLabel: 'Point Est & Proximité',
    tag: 'Est Lomé',
    address: 'Zone Stade de Kégué, axe vers Attiégou, Lomé',
    zemidjanGuide: '« Kégué, non loin du grand Stade, axe vers Attiégou »',
    onSiteGuide: 'Dans la zone du Stade de Kégué, le long de l\'axe commerçant menant à Attiégou.',
    socialContext: 'Financement des revendeurs de denrées, salons de coiffure, ateliers de couture et prestataires de services de la zone Est.',
    languages: ['Mina', 'Éwé', 'Français'],
    hours: 'Lun - Ven : 08h00 - 17h00',
    phone: '+228 97 31 78 25',
    phoneRaw: '+22897317825',
    lat: 6.1950,
    lng: 1.2520,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=6.1950,1.2520'
  }
];

export const NetworkMap: React.FC = () => {
  const [selectedAgency, setSelectedAgency] = useState<AgencySocial>(SOCIAL_AGENCIES[0]);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [selectedAgency.lat, selectedAgency.lng],
      zoom: 15,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.flyTo([selectedAgency.lat, selectedAgency.lng], 15, {
      animate: true,
      duration: 1.0,
    });

    // Nettoyer les marqueurs existants
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    SOCIAL_AGENCIES.forEach((agency) => {
      const isCurrent = agency.id === selectedAgency.id;
      
      const pinIcon = L.divIcon({
        className: 'medad-pin-wrapper',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: translate(-50%, -100%);">
            ${isCurrent ? `
              <div style="position: absolute; bottom: 0; width: 44px; height: 44px; background: rgba(6, 95, 70, 0.28); border-radius: 50%; transform: translate(0, 10px); animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;"></div>
            ` : ''}
            <div style="
              background: ${isCurrent ? '#065f46' : '#ffffff'};
              color: ${isCurrent ? '#ffffff' : '#065f46'};
              border: 3px solid ${isCurrent ? '#ffffff' : '#065f46'};
              width: ${isCurrent ? '42px' : '30px'};
              height: ${isCurrent ? '42px' : '30px'};
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 6px 16px rgba(0, 0, 0, ${isCurrent ? '0.35' : '0.15'});
              transition: all 0.25s ease;
            ">
              <div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">
                <svg width="${isCurrent ? '20' : '14'}" height="${isCurrent ? '20' : '14'}" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            </div>
            ${isCurrent ? `
              <div style="
                margin-top: 6px;
                background: #0f241d;
                color: #ffffff;
                font-size: 11px;
                font-weight: 800;
                padding: 4px 10px;
                border-radius: 9999px;
                white-space: nowrap;
                box-shadow: 0 4px 12px rgba(0,0,0,0.25);
                border: 1px solid rgba(255,255,255,0.2);
              ">
                ${agency.district}
              </div>
            ` : ''}
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([agency.lat, agency.lng], { 
        icon: pinIcon, 
        zIndexOffset: isCurrent ? 1000 : 100 
      })
        .addTo(map)
        .on('click', () => {
          setSelectedAgency(agency);
        });

      markersRef.current[agency.id] = marker;
    });
  }, [selectedAgency]);

  return (
    <section 
      id="agences" 
      style={{ 
        padding: '6.5rem 0 6rem 0', 
        backgroundColor: '#faf8f5',
        position: 'relative',
        borderTop: '1px solid #efe8df'
      }}
    >
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0.9; }
          50% { transform: scale(1.3); opacity: 0.35; }
          100% { transform: scale(1.7); opacity: 0; }
        }

        .snm-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Barre d'onglets horizontale pour les 7 zones */
        .snm-tabs-bar {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          overflow-x: auto;
          padding-bottom: 0.75rem;
          margin-bottom: 2rem;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .snm-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.75rem 1.25rem;
          border-radius: 9999px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #334155;
          font-weight: 700;
          font-size: 0.92rem;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          flex-shrink: 0;
        }

        .snm-tab-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #0f172a;
          transform: translateY(-2px);
        }

        .snm-tab-btn.active {
          background: #065f46;
          color: #ffffff;
          border-color: #065f46;
          box-shadow: 0 6px 18px rgba(6, 95, 70, 0.25);
          transform: translateY(-2px);
        }

        .snm-tab-tag {
          font-size: 0.7rem;
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .snm-tab-btn.active .snm-tab-tag {
          background: rgba(255, 255, 255, 0.22);
          color: #ffffff;
        }

        .snm-tab-btn:not(.active) .snm-tab-tag {
          background: #f1f5f9;
          color: #64748b;
        }

        /* Disposition fluide à 2 colonnes sans effet de card englobante */
        .snm-dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.75rem;
          align-items: stretch;
        }

        /* Cadre de la carte interactive */
        .snm-map-container {
          display: flex;
          flex-direction: column;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          box-shadow: 0 10px 30px -6px rgba(15, 36, 29, 0.07);
          height: 100%;
          min-height: 480px;
        }

        .snm-map-canvas {
          flex: 1;
          width: 100%;
          min-height: 420px;
          display: block;
          z-index: 1;
        }

        .leaflet-container {
          font-family: inherit;
        }

        @media (max-width: 992px) {
          .snm-dashboard-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .snm-map-canvas {
            min-height: 340px;
          }
        }
      `}</style>

      <div className="snm-container">
        
        {/* EN-TÊTE ÉPURÉ ET IMPACTANT */}
        <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
          <h2 
            style={{ 
              fontFamily: "'Bricolage Grotesque', 'Outfit', sans-serif",
              fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', 
              fontWeight: 800,
              color: '#0f241d', 
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '0.85rem' 
            }}
          >
            Des agences et agents au plus près de vos commerces
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
            Sélectionnez votre quartier ci-dessous pour repérer votre agence physique sur la carte ou demander la visite d'un conseiller à votre commerce.
          </p>
        </div>

        {/* 1. SÉLECTEUR HORIZONTAL DES 7 ZONES (ACCÈS RAPIDE D'UN CLIC) */}
        <div className="snm-tabs-bar">
          {SOCIAL_AGENCIES.map((agency) => {
            const isActive = selectedAgency.id === agency.id;
            return (
              <button
                key={agency.id}
                type="button"
                className={`snm-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedAgency(agency)}
              >
                {agency.type === 'headquarter' ? (
                  <Building2 size={16} />
                ) : (
                  <Store size={16} />
                )}
                <span>{agency.district}</span>
                <span className="snm-tab-tag">{agency.tag}</span>
              </button>
            );
          })}
        </div>

        {/* 2. LE DASHBOARD UNIFIÉ : DÉTAILS SOCIAUX À GAUCHE & VRAIE CARTE À DROITE */}
        <div className="snm-dashboard-grid">
          
          {/* COLONNE GAUCHE : TOUS LES DÉTAILS D'ACCÈS TERRAIN & CONTACTS */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
            
            <div>
              <h3 
                style={{ 
                  fontFamily: "'Bricolage Grotesque', 'Outfit', sans-serif",
                  fontSize: '1.65rem', 
                  fontWeight: 800, 
                  color: '#0f241d',
                  margin: '0 0 1rem 0',
                  lineHeight: 1.2
                }}
              >
                {selectedAgency.name}
              </h3>

              {/* ENCADRÉ SOCIAL 1 : GUIDAGE ZÉMIDJAN (TAXI-MOTO) */}
              <div 
                style={{ 
                  backgroundColor: '#f0fdf4', 
                  borderRadius: '16px', 
                  padding: '1.1rem 1.25rem', 
                  border: '1px solid #bbf7d0',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.76rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                  <Car size={15} color="#166534" />
                  <span>Ce qu'il faut dire au taxi-moto (Zémidjan) :</span>
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f241d', fontStyle: 'italic', lineHeight: 1.5 }}>
                  {selectedAgency.zemidjanGuide}
                </div>
              </div>

              {/* ENCADRÉ SOCIAL 2 : REPÈRE EXACT UNE FOIS ARRIVÉ SUR PLACE */}
              <div 
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1rem 1.25rem', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  <MapPin size={14} color="#065f46" />
                  <span>Repère physique sur place</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#0f241d', fontWeight: 700, lineHeight: 1.45 }}>
                  {selectedAgency.onSiteGuide}
                </div>
              </div>

              {/* GRILLE DES DÉTAILS PRATIQUES : HORAIRES & LANGUES */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                
                {/* Horaires */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    <Clock size={14} color="#065f46" />
                    <span>Horaires d'accueil</span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#0f241d', fontWeight: 600, lineHeight: 1.4 }}>
                    {selectedAgency.hours}
                  </div>
                </div>

                {/* Langues parlées */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    <Languages size={14} color="#065f46" />
                    <span>Langues parlées</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                    {selectedAgency.languages.map((lang) => (
                      <span 
                        key={lang} 
                        style={{ 
                          fontSize: '0.72rem', 
                          backgroundColor: '#f1f5f9', 
                          border: '1px solid #e2e8f0', 
                          padding: '0.15rem 0.5rem', 
                          borderRadius: '6px',
                          fontWeight: 700,
                          color: '#334155'
                        }}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Vocation sociale du pôle */}
              <div style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.55 }}>
                <strong style={{ color: '#0f241d' }}>Vocation sociale :</strong> {selectedAgency.socialContext}
              </div>
            </div>

            {/* BOUTONS D'ACTION IMMÉDIATS (PARFAITEMENT VISIBLES SANS SCROLLER) */}
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
              
              {/* Bouton GPS Itinéraire Google Maps */}
              <a
                href={selectedAgency.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: '200px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.55rem',
                  backgroundColor: '#065f46',
                  color: '#ffffff',
                  padding: '0.85rem 1.4rem',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  boxShadow: '0 6px 18px rgba(6, 95, 70, 0.22)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#044e39';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#065f46';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Navigation size={17} />
                <span>Itinéraire GPS</span>
                <ArrowUpRight size={15} />
              </a>

              {/* Bouton WhatsApp de quartier */}
              <a
                href={`https://wa.me/22897317825?text=Bonjour%20Medad%20Microfinance,%20je%20souhaite%20des%20renseignements%20pour%20l'agence%20de%20${encodeURIComponent(selectedAgency.district)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  backgroundColor: '#ffffff',
                  color: '#065f46',
                  border: '1.5px solid #065f46',
                  padding: '0.85rem 1.35rem',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0fdf4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <MessageSquare size={16} color="#065f46" />
                <span>WhatsApp</span>
              </a>

              {/* Bouton Appel direct */}
              <a
                href={`tel:${selectedAgency.phoneRaw}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#0f241d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.color = '#475569';
                }}
              >
                <Phone size={15} />
                <span>{selectedAgency.phone}</span>
              </a>

            </div>

          </div>

          {/* COLONNE DROITE : CARTE INTERACTIVE AVEC LE VRAI POINT DE LOCALISATION DE L'AGENCE */}
          <div className="snm-map-container">
            
            {/* Barre de contrôle supérieure de la carte */}
            <div 
              style={{ 
                backgroundColor: '#0f241d', 
                color: '#ffffff', 
                padding: '0.75rem 1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                zIndex: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <MapPin size={16} color="#34d399" />
                <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>
                  Point de localisation : {selectedAgency.district}
                </span>
              </div>

              <a
                href={selectedAgency.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#065f46',
                  color: '#ffffff',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#044e39';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#065f46';
                }}
              >
                <span>Google Maps GPS</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Carte Leaflet interactive avec le point de localisation pointé */}
            <div 
              ref={mapContainerRef} 
              className="snm-map-canvas"
            />

            {/* Barre de localisation au sol */}
            <div 
              style={{ 
                backgroundColor: '#ffffff', 
                padding: '0.75rem 1.15rem', 
                borderTop: '1px solid #e2e8f0',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: '#475569',
                zIndex: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={15} color="#16a34a" />
                <span style={{ fontWeight: 600, color: '#0f241d' }}>
                  Position exacte pointée sur la carte • {selectedAgency.name}
                </span>
              </div>
              <span style={{ color: '#065f46', fontWeight: 700 }}>Grand Lomé • Togo</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
