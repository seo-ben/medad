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
  // ── NOS PRODUITS CRÉDITS ──────────────────────────────────────────
  {
    id: 'credit-ordinaire',
    title: 'Crédit Ordinaire',
    tagline: 'Fonds de roulement, stocks et investissement commercial',
    category: 'credit',
    targetAudience: 'Commerçants, demi-grossistes, détaillants et micro-entrepreneurs du Grand Lomé',
    amountRange: '100 000 à 5 000 000 F CFA',
    duration: '3 à 18 mois (échéances hebdomadaires ou mensuelles)',
    rateInfo: 'Taux légal garanti < 21% l\'an (strictement conforme BCEAO, usure max 24%)',
    features: [
      'Déblocage express sous 48h sur compte Mixx ou Moov Money',
      'Échéancier transparent sans frais cachés ni commissions imprévues',
      'Accompagnement par un conseiller de crédit attitré',
      'Renouvellement rapide avec augmentation de plafond pour clients assidus'
    ],
    documents: [
      'Pièce d\'identité valide (CNI, Passeport, Carte d\'électeur ou e-ID)',
      'Preuve d\'activité commerciale ou localisation de l\'étal/boutique',
      'Caution solidaire ou garantie adaptée'
    ],
    ctaLabel: 'Demander un Crédit Ordinaire',
    color: '#065f46'
  },
  {
    id: 'credit-miawezon',
    title: 'Crédit Miawezon',
    tagline: 'Le crédit de bienvenue pour bien démarrer chez Medad',
    category: 'credit',
    targetAudience: 'Nouveaux adhérents, petits revendeurs de proximité, marchandes d\'étal',
    amountRange: '50 000 à 500 000 F CFA',
    duration: '2 à 6 mois',
    rateInfo: 'Conditions d\'amorçage très douces et formalités simplifiées',
    features: [
      'Idéal pour un premier accès au microcrédit sans historique préalable',
      'Instruction accélérée sur le lieu de vente par nos agents de zone',
      'Déblocage direct sur portefeuille mobile',
      'Étape tremplin vers les lignes de financement supérieures'
    ],
    documents: [
      'Pièce d\'identité officielle',
      'Numéro de téléphone mobile actif',
      'Localisation de l\'activité à Agoè, Adidogomé ou marchés de Lomé'
    ],
    ctaLabel: 'Souscrire au Crédit Miawezon',
    color: '#047857'
  },
  {
    id: 'credit-scolaire',
    title: 'Crédit Scolaire',
    tagline: 'Assurez la scolarité et l\'avenir de vos enfants sans stress',
    category: 'credit',
    targetAudience: 'Parents d\'élèves, commerçantes, artisans et salariés du Grand Lomé',
    amountRange: '50 000 à 1 500 000 F CFA',
    duration: '3 à 10 mois (calqué sur le calendrier académique)',
    rateInfo: 'Taux social préférentiel d\'appui éducatif',
    features: [
      'Financement direct des frais de scolarité, tenues et manuels',
      'Paiement possible directement aux établissements scolaires',
      'Mensualités réduites adaptées à vos cycles de trésorerie',
      'Déblocage d\'urgence pour éviter toute interruption de cours'
    ],
    documents: [
      'Pièce d\'identité du souscripteur',
      'Attestation de scolarité, certificat d\'inscription ou reçu de scolarité',
      'Justificatif d\'activité ou bulletin de salaire'
    ],
    ctaLabel: 'Simuler le Crédit Scolaire',
    color: '#1d4ed8'
  },
  {
    id: 'credit-class',
    title: 'Crédit CLASS',
    tagline: 'Ligne de crédit structurée pour professionnels et PME',
    category: 'credit',
    targetAudience: 'Commerces formalisés, ateliers structurés, grossistes et prestataires de services',
    amountRange: '500 000 à 10 000 000 F CFA',
    duration: '6 à 24 mois avec possibilité de différé partiel',
    rateInfo: 'Taux corporate bonifié développement UEMOA',
    features: [
      'Étude personnalisée de votre cycle d\'exploitation',
      'Ligne de trésorerie renouvelable selon vos commandes',
      'Conseiller financier entreprise dédié à votre établissement',
      'Suivi de conformité et optimisation de gestion'
    ],
    documents: [
      'Registre de commerce (RCCM) ou carte d\'opérateur économique',
      'Pièce d\'identité des gérants et justificatifs de bilans ou cahier de caisse',
      'Garantie matérielle, nantissement ou caution solvable'
    ],
    ctaLabel: 'Découvrir le Crédit CLASS',
    color: '#0f766e'
  },
  {
    id: 'credit-tontine',
    title: 'Crédit Tontine',
    tagline: 'Avance de trésorerie adossée à vos versements réguliers',
    category: 'credit',
    targetAudience: 'Cotisants actifs à la Tontine Sécurisée Medad',
    amountRange: 'Jusqu\'à 3x le volume moyen de cotisation mensuelle',
    duration: '1 à 6 mois',
    rateInfo: 'Taux ultra-préférentiel réservé aux épargnants assidus',
    features: [
      'Aucune garantie hypothécaire exigée : vos cotisations vous cautionnent',
      'Décaissement immédiat sous 24h sur validation de votre historique',
      'Remboursement fluide combiné aux passages de l\'agent collecteur',
      'Accompagnement continu pour maintenir votre capital'
    ],
    documents: [
      'Compte tontine actif chez Medad depuis au moins 2 mois',
      'Pièce d\'identité officielle',
      'Numéro de téléphone récepteur des SMS de quittance'
    ],
    ctaLabel: 'Demander un Crédit Tontine',
    color: '#c59b27'
  },
  {
    id: 'credit-groupements',
    title: 'Crédit aux Groupements',
    tagline: 'Financement solidaire pour coopératives et associations féminines',
    category: 'credit',
    targetAudience: 'Groupements de femmes commerçantes, associations de quartier, coopératives d\'artisans',
    amountRange: '200 000 à 8 000 000 F CFA par groupe',
    duration: '3 à 12 mois',
    rateInfo: 'Taux solidaire dégressif UEMOA',
    features: [
      'Cautionnement solidaire mutuel entre membres du groupement',
      'Distribution équitable des fonds selon les besoins de chaque adhérente',
      'Séances gratuites d\'éducation financière collective',
      'Passage d\'un agent de suivi lors des réunions périodiques du groupe'
    ],
    documents: [
      'Statuts ou règlement intérieur du groupement (ou PV de réunion)',
      'Liste des membres avec pièces d\'identité respectives',
      'Engagement conjoint des responsables (présidente, secrétaire, trésorière)'
    ],
    ctaLabel: 'Financer notre Groupement',
    color: '#854d0e'
  },
  {
    id: 'credit-work-and-pay',
    title: 'Crédit Work and Pay',
    tagline: 'Vos équipements et véhicules remboursés par leur propre rendement',
    category: 'credit',
    targetAudience: 'Conducteurs de taxi-motos (Zemidjan), tricycles de livraison, mécaniciens, menuisiers',
    amountRange: '300 000 à 4 500 000 F CFA',
    duration: '6 à 24 mois (versements quotidiens ou hebdomadaires)',
    rateInfo: 'Barème leasing solidaire sans pénalité de remboursement anticipé',
    features: [
      'Acquisition directe de motos, tricycles de fret, machines-outils neuves',
      'Droit d\'exploitation immédiat pour générer du revenu dès le 1er jour',
      'Transfert de propriété intégrale dès la dernière échéance honorée',
      'Assurance et assistance incluses avec nos partenaires concessionnaires'
    ],
    documents: [
      'Pièce d\'identité et permis de conduire (pour véhicules)',
      'Justificatif de domicile à Lomé (plan ou quittance CEET/TdE)',
      'Caution morale d\'un tiers de confiance'
    ],
    ctaLabel: 'Postuler au Work and Pay',
    color: '#b45309'
  },
  {
    id: 'credit-decouverts',
    title: 'Crédits Découverts & d’Opportunité',
    tagline: 'Facilité de caisse urgente pour ne rater aucun arrivage de marchandise',
    category: 'credit',
    targetAudience: 'Commerçants et artisans face à une opportunité d\'achat ou décalage de trésorerie',
    amountRange: '50 000 à 2 000 000 F CFA',
    duration: '15 à 60 jours',
    rateInfo: 'Frais clairs calculés au prorata temporis',
    features: [
      'Déblocage express sous 24h pour saisir un stock à prix bradé',
      'Remboursement dès l\'encaissement des ventes de la marchandise',
      'Sécurise votre relation avec vos grossistes et fournisseurs',
      'Disponible en continu pour les clients ayant un compte actif'
    ],
    documents: [
      'Compte actif ou historique de ventes vérifiable',
      'Pièce d\'identité valide',
      'Justificatif de l\'opportunité ou bon de commande fournisseur'
    ],
    ctaLabel: 'Demander un Découvert d\'Urgence',
    color: '#991b1b'
  },

  // ── NOS PRODUITS ÉPARGNE ──────────────────────────────────────────
  {
    id: 'epargne-tontine',
    title: 'Épargne Tontine',
    tagline: 'La collecte journalière digitalisée avec reçu SMS instantané',
    category: 'epargne',
    targetAudience: 'Revendeuses ambulantes, commerces de quartier, marchands quotidiens et artisans',
    amountRange: 'À partir de 500 F CFA / jour',
    duration: 'Cycles mensuels renouvelables ou épargne à terme',
    rateInfo: '0% de risque de perte • Sécurisation intégrale CAS-IMEC',
    features: [
      'Passage quotidien d\'un agent collecteur Medad accrédité à votre étal',
      'SMS instantané confirmant chaque franc déposé sur votre compte',
      'Fin définitive des carnets manuscrits égarés ou contestés',
      'Ouvre droit en priorité à nos crédits de trésorerie'
    ],
    documents: [
      'Numéro de téléphone mobile actif (YAS Mixx ou Moov)',
      'Pièce d\'identité ou carte d\'électeur'
    ],
    ctaLabel: 'Adhérer à la Tontine Medad',
    color: '#0284c7'
  },
  {
    id: 'epargne-dav',
    title: 'Épargne DAV (Dépôt à Vue)',
    tagline: 'Votre compte courant d\'épargne disponible à tout moment',
    category: 'epargne',
    targetAudience: 'Particuliers, salariés, artisans, commerçants et ménages',
    amountRange: 'Ouverture dès 5 000 F CFA',
    duration: 'Libre, sans engagement de durée',
    rateInfo: 'Disponibilité immédiate des fonds, zéro frais d\'agios abusifs',
    features: [
      'Dépôts et retraits libres aux guichets de nos agences ou par Mobile Money',
      'Relevé de compte clair et transparent à la demande',
      'Interfaçage direct avec Mixx (TMoney) et Flooz pour gérer vos fonds 24/7',
      'Sécurité totale des avoirs sous supervision prudentielle UEMOA'
    ],
    documents: [
      'Pièce d\'identité officielle valide',
      '2 photos d\'identité récentes',
      'Plan de localisation ou facture CEET/TdE'
    ],
    ctaLabel: 'Ouvrir un Compte DAV',
    color: '#0d9488'
  },
  {
    id: 'epargne-dat',
    title: 'Épargne DAT (Dépôt à Terme)',
    tagline: 'Faites fructifier votre capital avec un taux d\'intérêt garanti',
    category: 'epargne',
    targetAudience: 'Épargnants prévoyants, entrepreneurs et commerçants ayant une réserve de trésorerie',
    amountRange: 'À partir de 50 000 F CFA',
    duration: '3, 6, 12 ou 24 mois bloqués au choix',
    rateInfo: 'Rémunération contractuelle bonifiée et réglementée',
    features: [
      'Délivrance d\'un certificat de dépôt officiel attestant le capital et les intérêts',
      'Rendement garanti à l\'échéance sans risque de fluctuation',
      'Possibilité de nantissement pour obtenir un crédit sans débloquer l\'épargne',
      'Renouvellement automatique ou virement sur compte mobile à l\'échéance'
    ],
    documents: [
      'Pièce d\'identité officielle',
      'Formulaire de souscription de DAT complété en agence',
      'Versement initial par virement, espèces ou Mobile Money'
    ],
    ctaLabel: 'Souscrire un Dépôt à Terme',
    color: '#047857'
  },
  {
    id: 'domiciliation-salaires',
    title: 'Domiciliation de Salaires',
    tagline: 'Recevez votre rémunération en toute sérénité et accédez au crédit',
    category: 'epargne',
    targetAudience: 'Salariés du secteur privé, fonctionnaires, contractuels et employés d\'entreprises',
    amountRange: 'Dès le premier virement de paie',
    duration: 'Permanente',
    rateInfo: 'Frais de tenue de compte très économiques',
    features: [
      'Alerte SMS immédiate lors de la réception de votre salaire',
      'Facilité d\'avance sur salaire jusqu\'à 50% avant la fin du mois',
      'Accès prioritaire aux crédits scolaires et d\'équipement',
      'Attestation bancaire et relevé de compte certifié'
    ],
    documents: [
      'Pièce d\'identité officielle valide',
      'Attestation de travail ou contrat d\'engagement',
      '3 derniers bulletins de paie et lettre d\'engagement de l\'employeur'
    ],
    ctaLabel: 'Domicilier mon Salaire',
    color: '#4338ca'
  },
  {
    id: 'epargne-groupement',
    title: 'Épargne Groupement',
    tagline: 'Gestion sécurisée et transparente pour associations et tontines collectives',
    category: 'epargne',
    targetAudience: 'Associations de commerçants, groupements féminins, mutuelles communautaires',
    amountRange: 'Dépôt initial dès 10 000 F CFA',
    duration: 'Cycle annuel ou pluri-annuel',
    rateInfo: 'Taux bonifié spécial compte collectif',
    features: [
      'Système de co-signature sécurisé (présidente, trésorière, secrétaire)',
      'Reçus électroniques envoyés aux gestionnaires du groupement',
      'Rapprochement comptable simplifié pour vos assemblées générales',
      'Ouvre droit au Crédit aux Groupements de Medad'
    ],
    documents: [
      'Statuts ou PV de constitution du groupement',
      'Pièces d\'identité des mandataires désignés',
      'Spécimens de signature des représentantes officielles'
    ],
    ctaLabel: 'Ouvrir un Compte Groupement',
    color: '#6b21a8'
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
    address: 'Agoè Cacavéli, non loin du siège Bâtir, Lomé',
    phone: '+228 70 45 35 59',
    isHeadquarter: true,
    hours: 'Lun - Ven : 07h30 - 17h30 | Sam : 08h00 - 12h30'
  },
  {
    name: 'Point de Service Legbassito',
    district: 'Legbassito',
    address: 'Derrière le marché Légbassimé',
    phone: '(+228) 70 44 50 76',
    hours: 'Lun - Ven : 08h00 - 17h00'
  },
  {
    name: 'Point de Service Zanguera Klikamé',
    district: 'Zanguera Klikamé',
    address: 'En face du CEG',
    phone: '(+228) 70 68 80 80',
    hours: 'Lun - Ven : 08h00 - 17h00'
  },
  {
    name: 'Point de Collecte Kégué',
    district: 'Kégué',
    address: 'Sur la route de Kpatcha, non loin de SOMAYAF',
    phone: '+228 93 62 61 09',
    hours: 'Lun - Ven : 08h00 - 17h00'
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
