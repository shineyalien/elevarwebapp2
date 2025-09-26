import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Target, Zap, TrendingUp } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=140",
          end: "bottom top+=140",
        }
      }
    );

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=120",
              end: "bottom top+=120",
            }
          }
        );
      }
    });
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-orbitron"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            About Elevars
          </span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div ref={addToRefs} className="bg-gray-800/50 p-8 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 backdrop-blur-sm group">
            <div className="text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Target size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Precision Targeting</h3>
            <p className="text-gray-300 leading-relaxed">
              We use advanced algorithms and AI-driven insights to identify and reach your exact audience with surgical precision.
            </p>
          </div>
          
          <div ref={addToRefs} className="bg-gray-800/50 p-8 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm group">
            <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Lightning Speed</h3>
            <p className="text-gray-300 leading-relaxed">
              Rapid campaign deployment and real-time optimization ensure your brand stays ahead in the fast-paced digital realm.
            </p>
          </div>
          
          <div ref={addToRefs} className="bg-gray-800/50 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm group">
            <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Exponential Growth</h3>
            <p className="text-gray-300 leading-relaxed">
              Our data-driven strategies consistently deliver exponential returns on ad spend across all digital channels.
            </p>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Elevars is the lift beneath ambitious brands, translating complex data into upward action.
            We orchestrate journeys that feel human, spark loyalty, and keep growth climbing.
          </p>
          <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-8 rounded-xl border border-gradient-to-r from-pink-500/20 to-cyan-500/20">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Our Mission
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              To uplift organizations with strategies that unite human imagination and machine intelligence,
              guiding every initiative toward measurable, lasting lift.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;