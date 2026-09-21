export interface Product {
  id: string;
  title: string;
  tagline: string;
  category: 'credit' | 'epargne' | 'tontine';
  targetAudience: string;
  amountRange: string;
  duration: string;
  rateInfo: string;
  features: string[];
  documents: string[];
  ctaLabel: string;
  color: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'tresorerie',
    title: 'Microcrédit de Trésorerie',
    tagline: 'Fonds de roulement & stock pour commerçants',
    category: 'credit',
    targetAudience: 'Commerçantes de marché, revendeurs, demi-grossistes (Agoè, Adidogomé, Grand Marché...)',
    amountRange: '50 000 à 3 000 000 F CFA',
    duration: '3 à 12 mois (échéances hebdomadaires ou mensuelles)',
    rateInfo: 'Taux plafonné < 21% l\'an (strictement conforme BCEAO, usure max 24%)',
    features: [
      'Déblocage express sous 48h après instruction',
      'Versement direct sur compte Mixx ou Moov Money',
      'Zéro frais dissimulés ou commission surprise',
      'Accompagnement par un conseiller commercial dédié'
    ],
    documents: [
      'Pièce d\'identité valide (CNI, Carte d\'électeur ou e-ID biométrique)',
      'Preuve d\'activité commerciale ou localisation de l\'étal/boutique',
      'Caution solidaire ou garantie adaptée'
    ],
    ctaLabel: 'Simuler ce crédit',
    color: '#0b5e39'
  },
  {
    id: 'equipement',
    title: 'Crédit Équipement Artisanal',
    tagline: 'Modernisez vos machines, outils et ateliers',
    category: 'credit',
    targetAudience: 'Artisans, mécaniciens, menuisiers, couturiers, transformateurs agroalimentaires',
    amountRange: '200 000 à 5 000 000 F CFA',
    duration: '6 à 24 mois avec différé possible',
    rateInfo: 'Taux bonifié de développement artisanal (conforme BCEAO)',
    features: [
      'Financement direct d\'équipements neufs ou reconditionnés',
      'Amortissement adapté au cycle de production',
      'Possibilité de co-financement avec fournisseurs partenaires',
      'Renforcement de votre capacité de production locale'
    ],
    documents: [
      'Pièce d\'identité officielle',
      'Devis proforma de l\'équipement ciblé',
      'Carnet d\'artisan ou attestation de qualification professionnelle'
    ],
    ctaLabel: 'Demander un devis',
    color: '#b45309'
  },
  {
    id: 'tontine',
    title: 'Tontine Moderne Sécurisée',
    tagline: 'L\'épargne quotidienne digitalisée avec reçu SMS',
    category: 'tontine',
    targetAudience: 'Revendeuses ambulantes, commerces de quartier, marchands quotidiens',
    amountRange: 'À partir de 500 F CFA / jour',
    duration: 'Cycles mensuels renouvelables ou épargne à terme',
    rateInfo: '0% de risque de perte • Sécurisation intégrale',
    features: [
      'Passage quotidien d\'un agent collecteur Medad certifié',
      'Notification SMS instantanée confirmant chaque versement',
      'Fin définitive des carnets papier égarés ou contestés',
      'Accès prioritaire à un microcrédit après 3 mois réguliers'
    ],
    documents: [
      'Numéro de téléphone mobile actif (YAS ou Moov)',
      'Pièce d\'identité ou certificat de résidence'
    ],
    ctaLabel: 'Adhérer à la Tontine',
    color: '#0284c7'
  },
  {
    id: 'epargne',
    title: 'Épargne Rémunérée & DAT',
    tagline: 'Faites fructifier vos réserves en toute sérénité',
    category: 'epargne',
    targetAudience: 'Ménages, micro-entrepreneurs formalisés, salariés et tontiniers',
    amountRange: 'Ouverture dès 5 000 F CFA',
    duration: 'Libre (vue) ou Dépôt à Terme (DAT de 3 à 12 mois)',
    rateInfo: 'Intérêts créditeurs garantis et réglementés',
    features: [
      'Fonds protégés sous surveillance prudentielle CAS-IMEC',
      'Disponibilité rapide de vos fonds en agence ou Mobile Money',
      'Relevé électronique transparent et régulier',
      'Pas de frais de tenue de compte abusifs'
    ],
    documents: [
      'Pièce d\'identité officielle',
      '2 photos d\'identité récentes',
      'Plan de localisation ou facture CEET/TdE'
    ],
    ctaLabel: 'Ouvrir un compte',
    color: '#0d9488'
  }
];

export interface Agency {
  name: string;
  district: string;
  address: string;
  phone: string;
  isHeadquarter?: boolean;
  hours: string;
}

export const AGENCIES: Agency[] = [
  {
    name: 'Siège Central & Agence Principale',
    district: 'Agoè Cacavéli',
    address: 'Boulevard Faure Gnassingbé, Immeuble Medad, Agoè Cacavéli',
    phone: '+228 97 31 78 25',
    isHeadquarter: true,
    hours: 'Lun - Ven : 07h30 - 17h30 | Sam : 08h00 - 12h30'
  },
  {
    name: 'Point d\'Appui Vakpossito',
    district: 'Vakpossito',
    address: 'Près du grand marché de Vakpossito, carrefour central',
    phone: '+228 97 31 78 25',
    hours: 'Lun - Ven : 08h00 - 17h00 | Sam : 08h00 - 12h00'
  },
  {
    name: 'Point d\'Appui Zanguera',
    district: 'Zanguera',
    address: 'Route Nationale N°5, en face du marché artisanal',
    phone: '+228 97 31 78 25',
    hours: 'Lun - Ven : 08h00 - 17h00'
  },
  {
    name: 'Antenne Legbassito',
    district: 'Legbassito',
    address: 'Carrefour Legbassito, axe commercial principal',
    phone: '+228 97 31 78 25',
    hours: 'Lun - Ven : 08h00 - 17h00'
  },
  {
    name: 'Agence Adidogomé',
    district: 'Adidogomé',
    address: 'Non loin du marché d\'Adidogomé Assiyéyé',
    phone: '+228 97 31 78 25',
    hours: 'Lun - Ven : 07h30 - 17h30 | Sam : 08h00 - 13h00'
  },
  {
    name: 'Antenne Kégué & Attiégou',
    district: 'Kégué - Attiégou',
    address: 'Zone Stade de Kégué, axe vers Attiégou',
    phone: '+228 97 31 78 25',
    hours: 'Lun - Ven : 08h00 - 17h00'
  },
  {
    name: 'Point Conseil Hédzranawoé',
    district: 'Hédzranawoé',
    address: 'À proximité du marché de friperie d\'Hédzranawoé',
    phone: '+228 97 31 78 25',
    hours: 'Lun - Ven : 08h00 - 17h00 | Sam : 08h00 - 12h30'
  }
];

export interface AudioScript {
  lang: 'fr' | 'mina' | 'ewe';
  label: string;
  sublabel: string;
  title: string;
  text: string;
}

export const AUDIO_SCRIPTS: AudioScript[] = [
  {
    lang: 'fr',
    label: 'Français',
    sublabel: 'Langue officielle',
    title: 'Présentation de Medad Microfinance Togo',
    text: 'Bienvenue chez Medad Microfinance. Nous sommes une institution financière décentralisée agréée, basée à Agoè Cacavéli. Nous finançons les commerçantes de nos marchés et les artisans du Grand Lomé avec des taux clairs et plafonnés, sans frais cachés. Déposez votre épargne en toute sécurité et recevez vos fonds directement par Mixx ou Flooz.'
  },
  {
    lang: 'mina',
    label: 'Mina',
    sublabel: 'Gbé gbagbé le Lomé',
    title: 'Medad Microfinance le Mina me',
    text: 'Mianwoé zɔ le Medad Microfinance gbɔ ! Míele Agoè Cacavéli le Lomé. Míedoa alɔ asitsalawo kple alɔnuwɔlawo kple gbedoxɔxɔ si me fukpekpe mele o. Ga si nèbia la, ewoa akɔnta nyuie, ga gbadzaa mebɔ o. Nèkpɔ ga le Mixx alo Flooz dzi kaba. Va do gbe na mí le WhatsApp alo kpo mí le cacavéli !'
  },
  {
    lang: 'ewe',
    label: 'Éwé',
    sublabel: 'Eʋegbe gɔmesese',
    title: 'Medad Microfinance le Eʋegbe me',
    text: 'Medad Microfinance nye habɔbɔ gã si dzi dziɖuɖu da asi ɖo le Togo. Míenaa gadodo asitsalawo le asime, kple nuwɔlawo katã le Grand Lomé. Dzidodo kple kpekpeɖeŋu nyui míenaa mi, tontine si dzi woatsɔ gbeɖiɖi kple SMS ana kpeɖodzi mi. Ga yeye nava miawo ƒe asi me kaba !'
  }
];

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  badge: string;
  growth: string;
  image?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Afiwa D.',
    role: 'Grossiste en Pagnes & Tissus',
    location: 'Agoè Cacavéli',
    quote: 'Avant Medad, j\'avais peur des microfinances à cause des frais cachés. Chez Medad, tout est écrit noir sur blanc. J\'ai obtenu 1 500 000 F CFA en 48h par Flooz pour renouveler mon stock avant les fêtes. Aujourd\'hui mon commerce a doublé.',
    badge: 'Crédit Trésorerie',
    growth: '+120% de stock',
    image: '/hero-african-entrepreneur.jpg'
  },
  {
    name: 'Komlan E.',
    role: 'Maître Artisan & Ébéniste',
    location: 'Adidogomé Assiyéyé',
    quote: 'Avec le crédit d\'équipement Medad, j\'ai pu acheter une combinée à bois moderne. Les mensualités sont adaptées au rythme de mes chantiers. Mon atelier emploie désormais 4 apprentis et 2 ouvriers réguliers.',
    badge: 'Crédit Équipement',
    growth: '4 nouveaux emplois',
    image: '/artisan-craftsman.jpg'
  },
  {
    name: 'Mawuto S.',
    role: 'Commerçante en Vivriers',
    location: 'Marché de Vakpossito',
    quote: 'La tontine sécurisée me change la vie : l\'agent passe tous les matins, et mon téléphone sonne tout de suite avec le SMS de confirmation. Pas de risque de perte, et au bout de 6 mois, j\'ai pu ouvrir un livret rémunéré.',
    badge: 'Tontine Reçu SMS',
    growth: 'Épargne 100% sécurisée'
  },
  {
    name: 'Kokou M.',
    role: 'Mécanicien & Vendeur de Pièces',
    location: 'Zanguera',
    quote: 'J\'avais besoin d\'un coup de pouce pour acheter un stock de pièces détachées importées. Grâce à l\'agence de Zanguera, les formalités ont été bouclées en 2 jours et j\'ai reçu le virement sur mon compte TMoney.',
    badge: 'Crédit Express',
    growth: '+85% de chiffre d\'affaires'
  },
  {
    name: 'Adjovi K.',
    role: 'Restauratrice & Traiteur',
    location: 'Hédzranawoé',
    quote: 'Grâce à l\'épargne progressive et à la souplesse des remboursements hebdomadaires, j\'ai pu ouvrir un deuxième restaurant près du grand marché. Les conseillers Medad sont respectueux et disponibles.',
    badge: 'Épargne & Crédit',
    growth: '2e restaurant ouvert'
  },
  {
    name: 'Messan A.',
    role: 'Commerçant en Matériaux',
    location: 'Legbassito',
    quote: 'Medad respecte les commerçants de terrain. Leurs taux sont clairs et respectent la réglementation de la BCEAO. Pas de mauvaises surprises au remboursement, ce qui m\'a permis de bâtir une vraie relation de confiance.',
    badge: 'Fonds de Roulement',
    growth: '+150% de trésorerie'
  },
  {
    name: 'Dédé B.',
    role: 'Coiffeuse & Esthéticienne',
    location: 'Kégué - Attiégou',
    quote: 'La collecte de tontine quotidienne directement dans mon salon me fait gagner un temps précieux. Avec le crédit d\'équipement accordé après 4 mois, j\'ai modernisé tout mon matériel de coiffure.',
    badge: 'Tontine & Équipement',
    growth: 'Salon entièrement rénové'
  }
];
