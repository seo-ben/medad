import React from 'react';

interface MedadLogoProps {
  size?: number;
  showTagline?: boolean;
}

export const MedadLogo: React.FC<MedadLogoProps> = ({ size = 44, showTagline = true }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
      {/* Emblème officiel Medad sans arrière-plan */}
      <img
        src="/medad-emblem-transparent.png"
        alt="Logo Medad Microfinance"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          flexShrink: 0,
          filter: 'drop-shadow(0 2px 6px rgba(6, 95, 70, 0.16))'
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
          fontWeight: 800,
          fontSize: '1.6rem',
          color: '#065f46',
          letterSpacing: '-0.025em',
          lineHeight: 1
        }}>
          Medad
        </span>
        {showTagline && (
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            color: '#c59b27',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginTop: '3px',
            lineHeight: 1
          }}>
            Microfinance Togo
          </span>
        )}
      </div>
    </div>
  );
};
