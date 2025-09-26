import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll setup
    const smoother = gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 1,
      ease: "power2.out"
    });

    // Page load animation
    gsap.fromTo(mainRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-gray-900 text-white overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;