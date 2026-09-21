import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'fade';
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  style = {},
  threshold = 0.08,
  delay = 0,
  direction = 'up',
  distance = 36,
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Animation bidirectionnelle : se déclenche en montant ET en descendant
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Se réinitialise quand l'élément quitte l'écran pour réanimer au retour
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    if (direction === 'fade') return 'scale(0.99)';
    if (direction === 'down') return `translate3d(0, -${distance}px, 0) scale(0.985)`;
    return `translate3d(0, ${distance}px, 0) scale(0.985)`;
  };

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-container ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
