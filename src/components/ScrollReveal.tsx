import React, { useEffect, useRef, useState } from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';
  distance?: number;
  rootMargin?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  style = {},
  threshold = 0.08,
  delay = 0,
  duration = 0.85,
  direction = 'up',
  distance = 50,
  rootMargin = '0px 0px -40px 0px',
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
        // Animation bidirectionnelle : se déclenche en descendant ET en montant
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Se réinitialise dès qu'il quitte l'écran pour rejouer l'effet au scroll retour
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const getHiddenTransform = () => {
    switch (direction) {
      case 'left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(0.985)`;
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(0.985)`;
      case 'zoom':
        return 'scale(0.92)';
      case 'fade':
      default:
        return 'scale(0.99)';
    }
  };

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-item ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getHiddenTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
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
