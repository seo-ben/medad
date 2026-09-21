import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 90,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px'
    }}>
      {showTooltip && (
        <div style={{
          background: '#ffffff',
          color: 'var(--slate-800)',
          padding: '0.65rem 0.95rem',
          borderRadius: '14px',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '0.82rem',
          fontWeight: 600,
          border: '1px solid var(--slate-200)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          maxWidth: '250px'
        }}>
          <span>Discuter avec un conseiller Medad à Lomé (+228 97 31 78 25)</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--slate-400)',
              padding: '2px',
              display: 'flex'
            }}
            aria-label="Fermer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <a
        href="https://wa.me/22897317825?text=Bonjour%20Medad%20Microfinance,%20je%20souhaite%20des%20informations%20sur%20vos%20services"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25d366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer',
          textDecoration: 'none'
        }}
        aria-label="Contacter Medad Microfinance sur WhatsApp"
      >
        <MessageCircle size={30} fill="#ffffff" color="#25d366" />
      </a>
    </div>
  );
};
