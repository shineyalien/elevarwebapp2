import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  isReady: boolean;
}

const Preloader = ({ isReady }: PreloaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isReady && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => setIsVisible(false),
      });
    }
  }, [isReady]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="preloader-overlay fixed inset-0 z-[999] flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="preloader-core">
        <div className="preloader-spinner" aria-hidden="true" />
        <div className="preloader-orbit preloader-orbit-one" aria-hidden="true" />
        <div className="preloader-orbit preloader-orbit-two" aria-hidden="true" />
        <div className="preloader-glow" aria-hidden="true" />
        <span className="preloader-wordmark font-orbitron">Elevars</span>
      </div>
    </div>
  );
};

export default Preloader;
