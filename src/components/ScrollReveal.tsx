import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Milliseconds
  duration?: number; // Milliseconds
  direction?: 'up' | 'none';
  distance?: number; // Pixels
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 600,
  direction = 'up',
  distance = 24,
  threshold = 0.1,
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  });

  const getTransform = () => {
    if (direction === 'none') return 'none';
    return isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${distance}px, 0)`;
  };

  return (
    <div
      ref={ref}
      className={`will-change-[transform,opacity] transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
};
