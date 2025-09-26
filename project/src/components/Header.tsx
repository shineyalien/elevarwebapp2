import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const headerRef = useRef<HTMLHeaderElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element.offsetTop - 80, autoKill: false },
        duration: 1,
        ease: "power2.out"
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-pink-500/20"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent font-orbitron">
          ELEVARS
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {['about', 'services', 'portfolio', 'blog', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-gray-300 hover:text-pink-400 transition-all duration-300 hover:glow-pink relative group"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-pink-400 hover:text-cyan-400 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-lg border-b border-pink-500/20 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="px-6 py-4 space-y-4">
          {['about', 'services', 'portfolio', 'blog', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="block w-full text-left text-gray-300 hover:text-pink-400 transition-colors py-2"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;