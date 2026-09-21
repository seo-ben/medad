import React, { useState } from 'react';
import { Plus, Minus, Search, MessageSquare, PhoneCall, HelpCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FaqItem {
  id: string;
  category: 'credit' | 'tontine' | 'mobile' | 'general';
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: '1',
    category: 'credit',
    question: "Quelles sont les conditions pour obtenir un crédit chez Medad ?",
    answer: "Il suffit d'exercer une activité génératrice de revenus (commerce, artisanat, atelier) dans le Grand Lomé, de disposer d'une pièce d'identité en cours de validité (CNI, passeport ou carte d'électeur) et d'un garant ou caution solidaire. Aucun titre foncier ni caution hypothécaire n'est exigé pour nos microcrédits de proximité."
  },
  {
    id: '2',
    category: 'credit',
    question: "En combien de temps le prêt est-il débloqué ?",
    answer: "Après la visite de notre conseiller sur votre lieu de travail et la vérification de votre dossier, la décision du comité intervient sous 24 heures. Dès signature, les fonds sont décaissés immédiatement (sous 48 heures au total), en espèces à nos guichets ou sur votre compte TMoney / Moov Money."
  },
  {
    id: '3',
    category: 'credit',
    question: "Quels sont les taux d'intérêt pratiqués ?",
    answer: "Conformément à la réglementation de la BCEAO et sous l'agrément du Ministère de l'Économie et des Finances, tous nos taux respectent scrupuleusement le plafond légal de l'usure fixé à 24% l'an. Aucun frais dissimulé n'est prélevé : votre échéancier détaille le capital et les intérêts dès le premier jour."
  },
  {
    id: '4',
    category: 'mobile',
    question: "Comment effectuer mes remboursements avec TMoney ou Moov Money ?",
    answer: "Plus besoin de quitter votre commerce ! Vous pouvez régler vos échéances 24h/24 et 7j/7 depuis votre téléphone mobile via notre code marchand dédié. Dès le paiement validé, vous recevez un SMS de confirmation instantané et votre compte Medad est automatiquement crédité."
  },
  {
    id: '5',
    category: 'tontine',
    question: "Comment fonctionne la Tontine Sécurisée Medad ?",
    answer: "Un collecteur Medad accrédité et géolocalisé passe chaque jour à votre stand ou atelier. À chaque dépôt, un reçu numérique vous est immédiatement transmis par SMS. Fini les carnets papier perdus ou contestés. Vos économies sont garanties et vous ouvrent l'accès prioritaire à nos crédits."
  },
  {
    id: '6',
    category: 'general',
    question: "Où se trouvent les agences Medad à Lomé ?",
    answer: "Notre siège et agence principale sont situés à Agoè Cacavéli (Boulevard Faure Gnassingbé). Nous disposons également de points d'appui et antennes à Vakpossito, Zanguera, Legbassito, Adidogomé Assiyéyé, Kégué-Attiégou et Hédzranawoé."
  },
  {
    id: '7',
    category: 'tontine',
    question: "Puis-je ouvrir un compte d'épargne simple sans demander de crédit ?",
    answer: "Tout à fait ! Notre Livret d'Épargne est accessible dès 5 000 F CFA. Il rémunère vos liquidités avec des intérêts créditeurs garantis. Vous pouvez effectuer des retraits et dépôts en agence ou directement par votre portefeuille mobile."
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Toutes les questions' },
  { id: 'credit', label: 'Crédits & Prêts' },
  { id: 'tontine', label: 'Épargne & Tontine' },
  { id: 'mobile', label: 'Remboursement Mobile' },
  { id: 'general', label: 'Agences & Adhésion' }
];

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '1': true, // Première question ouverte par défaut
    '2': false
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="faq" 
      style={{ 
        backgroundColor: '#ffffff', 
        padding: '5rem 0 1.5rem 0',
        position: 'relative'
      }}
    >
      <style>{`
        .faq-wrap {
          max-width: 980px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .faq-title {
          font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 800;
          color: #0f241d;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin: 0 0 1rem 0;
        }

        .faq-subtitle {
          font-size: 1.15rem;
          color: #64748b;
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Barre de recherche sobre */
        .faq-search-box {
          position: relative;
          max-width: 580px;
          margin: 2.5rem auto 2rem auto;
        }

        .faq-search-input {
          width: 100%;
          padding: 0.95rem 1.25rem 0.95rem 3rem;
          border-radius: 9999px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.95rem;
          color: #0f241d;
          outline: none;
          transition: all 0.2s ease;
        }

        .faq-search-input:focus {
          border-color: #065f46;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(6, 95, 70, 0.08);
        }

        .faq-search-icon {
          position: absolute;
          left: 1.1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        /* Filtres catégories horizontaux épurés */
        .faq-filter-list {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .faq-filter-chip {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #475569;
          padding: 0.5rem 1.1rem;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-filter-chip:hover {
          border-color: #065f46;
          color: #065f46;
        }

        .faq-filter-chip.active {
          background-color: #065f46;
          border-color: #065f46;
          color: #ffffff;
        }

        /* Lignes Accordéon - Sans carte, avec séparateurs fins */
        .faq-accordion-list {
          border-top: 1px solid #e2e8f0;
        }

        .faq-row {
          border-bottom: 1px solid #e2e8f0;
          transition: background-color 0.2s ease;
        }

        .faq-row-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0.5rem;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          gap: 1.5rem;
        }

        .faq-question {
          font-family: 'Bricolage Grotesque', 'Outfit', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f241d;
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        .faq-row-trigger:hover .faq-question,
        .faq-row.is-open .faq-question {
          color: #065f46;
        }

        .faq-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background-color: #f1f5f9;
          color: #334155;
          transition: all 0.25s ease;
        }

        .faq-row.is-open .faq-icon-btn {
          background-color: #065f46;
          color: #ffffff;
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 0.5rem 1.6rem 0.5rem;
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.7;
          max-width: 850px;
        }

        /* Bloc d'aide directe WhatsApp / Tel en bas */
        .faq-support {
          margin-top: 2.5rem;
          padding: 1.5rem 0 0 0;
          text-align: center;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .faq-support-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f241d;
          margin: 0;
        }

        .faq-support-text {
          font-size: 1rem;
          color: #64748b;
          margin: 0;
          max-width: 540px;
        }

        .faq-support-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .faq-btn-wa {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #22c55e;
          color: #ffffff;
          padding: 0.8rem 1.6rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .faq-btn-wa:hover {
          background-color: #16a34a;
        }

        .faq-btn-tel {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #ffffff;
          color: #0f241d;
          border: 1px solid #cbd5e1;
          padding: 0.8rem 1.6rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .faq-btn-tel:hover {
          border-color: #065f46;
          color: #065f46;
        }
      `}</style>

      <div className="faq-wrap">
        
        {/* Titre & Sous-titre */}
        <ScrollReveal direction="down" distance={25} duration={0.8}>
          <div className="faq-header">
            <h2 className="faq-title">Trouvez solution à vos questions</h2>
            <p className="faq-subtitle">
              Tout ce que vous devez savoir sur nos offres de crédit, notre tontine sécurisée et nos services financiers à Lomé.
            </p>

            {/* Recherche rapide */}
            <div className="faq-search-box">
              <Search className="faq-search-icon" size={18} />
              <input
                type="text"
                className="faq-search-input"
                placeholder="Posez une question (ex: documents, délai, tontine, taux...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Rechercher une question"
              />
            </div>

            {/* Filtres par thématique */}
            <div className="faq-filter-list" role="tablist">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`faq-filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Liste Accordéon avec bordures douces et sans cartes */}
        <ScrollReveal direction="up" distance={35} delay={100} duration={0.85}>
          <div className="faq-accordion-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];
                return (
                  <div key={faq.id} className={`faq-row ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-row-trigger"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question">{faq.question}</span>
                      <span className="faq-icon-btn">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    
                    {isOpen && (
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                <HelpCircle size={36} style={{ margin: '0 auto 0.75rem auto', color: '#94a3b8' }} />
                <p style={{ margin: 0, fontSize: '1rem' }}>
                  Aucune question ne correspond à votre recherche « <strong>{searchQuery}</strong> ».
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Section contact direct en dessous */}
        <ScrollReveal direction="up" distance={30} delay={150} duration={0.85}>
          <div className="faq-support">
            <h3 className="faq-support-title">Vous ne trouvez pas votre réponse ?</h3>
            <p className="faq-support-text">
              Nos agents de crédit et conseillers clientèle sont à votre écoute pour vous renseigner sans engagement.
            </p>
            <div className="faq-support-actions">
              <a
                href="https://wa.me/22897317825?text=Bonjour%20Medad,%20j%27ai%20une%20question%20sur%20vos%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="faq-btn-wa"
              >
                <MessageSquare size={17} />
                <span>Poser ma question sur WhatsApp</span>
              </a>
              <a href="tel:+22897317825" className="faq-btn-tel">
                <PhoneCall size={17} />
                <span>Appeler le +228 97 31 78 25</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
