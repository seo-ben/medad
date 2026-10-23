import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <style>{`
        .scroll-to-top-btn {
          position: fixed;
          bottom: 92px;
          right: 28px;
          z-index: 89;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #ffffff;
          color: #065f46;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transform: translateY(14px) scale(0.9);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-to-top-btn.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0) scale(1);
        }

        .scroll-to-top-btn:hover {
          background: #065f46;
          color: #ffffff;
          border-color: #065f46;
          box-shadow: 0 6px 22px rgba(6, 95, 70, 0.35);
          transform: translateY(-3px) scale(1.05);
        }

        .scroll-to-top-btn:active {
          transform: translateY(0) scale(0.95);
        }

        @media (max-width: 480px) {
          .scroll-to-top-btn {
            bottom: 82px !important;
            right: 20px !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>

      <button
        type="button"
        onClick={scrollToTop}
        className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
        aria-label="Remonter en haut de page"
        title="Remonter en haut"
      >
        <ArrowUp size={22} strokeWidth={2.5} />
      </button>
    </>
  );
};
