import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Search, Share2, BarChart3, Smartphone, Mail, Users } from 'lucide-react';

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const services = [
    {
      icon: Search,
      title: "Search Engine Marketing",
      description: "AI-powered SEM campaigns that dominate search results and drive qualified traffic to your digital presence.",
      color: "pink"
    },
    {
      icon: Share2,
      title: "Social Media Advertising",
      description: "Strategic social campaigns across all platforms, designed to create viral moments and build communities.",
      color: "cyan"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Deep-dive data analysis with predictive modeling to optimize every aspect of your marketing funnel.",
      color: "purple"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Campaigns",
      description: "Native mobile experiences that engage users in their pocket-sized digital worlds.",
      color: "pink"
    },
    {
      icon: Mail,
      title: "Email Automation",
      description: "Hyper-personalized email sequences that nurture leads through intelligent behavioral triggers.",
      color: "cyan"
    },
    {
      icon: Users,
      title: "Influencer Networks",
      description: "Connections with digital tastemakers who amplify your brand message to engaged audiences.",
      color: "purple"
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

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

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { y: 100, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'pink':
        return {
          border: 'border-pink-500/20 hover:border-pink-500/40',
          text: 'text-pink-400',
          gradient: 'from-pink-500/10 to-pink-500/5'
        };
      case 'cyan':
        return {
          border: 'border-cyan-500/20 hover:border-cyan-500/40',
          text: 'text-cyan-400',
          gradient: 'from-cyan-500/10 to-cyan-500/5'
        };
      case 'purple':
        return {
          border: 'border-purple-500/20 hover:border-purple-500/40',
          text: 'text-purple-400',
          gradient: 'from-purple-500/10 to-purple-500/5'
        };
      default:
        return {
          border: 'border-pink-500/20 hover:border-pink-500/40',
          text: 'text-pink-400',
          gradient: 'from-pink-500/10 to-pink-500/5'
        };
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-orbitron"
        >
          <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Digital Services
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color);
            const IconComponent = service.icon;
            
            return (
              <div
                key={index}
                ref={addToRefs}
                className={`bg-gradient-to-br ${colorClasses.gradient} backdrop-blur-sm p-8 rounded-xl border ${colorClasses.border} transition-all duration-300 hover:transform hover:scale-105 group`}
              >
                <div className={`${colorClasses.text} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/50 p-8 rounded-xl border border-gradient-to-r from-pink-500/20 to-cyan-500/20 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Integrated Approach
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Our services work in harmony to create a unified digital ecosystem that steadily lifts your brand.
              From the first click to sustained loyalty, we orchestrate experiences that stay human while driving measurable altitude.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;