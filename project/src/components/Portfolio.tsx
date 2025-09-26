import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ExternalLink, TrendingUp, Users, DollarSign } from 'lucide-react';

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: "Medical Testing Company Scale",
      category: "healthcare",
      description: "Delivered $940K in revenue from $220K ad spend on Facebook for a medical testing company by optimizing funnel flows, audience segmentation, and pixel tracking.",
      metrics: {
        growth: "427%",
        revenue: "$940K",
        roas: "427%"
      },
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Facebook Ads", "Funnel Optimization", "Medical"]
    },
    {
      title: "Apparel Brand Transformation",
      category: "ecommerce",
      description: "Transformed a $30K/month ad budget into $150K profitably on Facebook for an apparel brand by restructuring campaigns and running A/B creative tests.",
      metrics: {
        growth: "500%",
        revenue: "$150K",
        roas: "Profitable"
      },
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Facebook Ads", "A/B Testing", "Fashion"]
    },
    {
      title: "High-End Audio Product Success",
      category: "electronics",
      description: "Increased monthly sales of a $1,200+ high-end electronic audio product from 20 to 150 units via Facebook ads while cutting CPA from $700 to $100.",
      metrics: {
        growth: "750%",
        units: "150/month",
        cpa: "-86%"
      },
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Facebook Ads", "UGC", "Electronics"]
    },
    {
      title: "Google Ads E-commerce Win",
      category: "ecommerce",
      description: "Achieved $360K in sales from $82K spend on Google ads for an e-commerce brand through precise bid management, retargeting, and CTR optimization.",
      metrics: {
        revenue: "$360K",
        spend: "$82K",
        roas: "439%"
      },
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Google Ads", "E-commerce", "Retargeting"]
    },
    {
      title: "Finance App 10x Growth",
      category: "fintech",
      description: "Increased revenue tenfold for a finance app by redesigning the business model and executing a multi-channel strategy.",
      metrics: {
        growth: "1000%",
        channels: "Multi",
        model: "Redesigned"
      },
      image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Multi-channel", "Strategy", "FinTech"]
    },
    {
      title: "Shopify Shoe Brand Launch",
      category: "ecommerce",
      description: "Scaled a small scale Shopify shoe brand on Facebook from scratch to $500/day in sales in 3 months, leveraging UGC and constant product page optimization.",
      metrics: {
        growth: "From $0",
        daily: "$500",
        time: "3 months"
      },
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Facebook Ads", "UGC", "Shopify"]
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'fintech', label: 'FinTech' }
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
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
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

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-orbitron"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            Elevation Stories
          </span>
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:text-pink-400 border border-gray-700 hover:border-pink-500/40'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-pink-500/40 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute top-4 right-4">
                  <ExternalLink className="text-white/80 hover:text-pink-400 transition-colors cursor-pointer" size={20} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <TrendingUp className="text-pink-400" size={20} />
                    </div>
                    <div className="text-pink-400 font-bold text-lg">
                      {project.metrics.growth || project.metrics.revenue || project.metrics.units}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {project.metrics.growth ? 'Growth' : project.metrics.revenue ? 'Revenue' : 'Units'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <DollarSign className="text-cyan-400" size={20} />
                    </div>
                    <div className="text-cyan-400 font-bold text-lg">
                      {project.metrics.roas || project.metrics.spend || project.metrics.daily}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {project.metrics.roas ? 'ROAS' : project.metrics.spend ? 'Spend' : 'Daily Sales'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <Users className="text-purple-400" size={20} />
                    </div>
                    <div className="text-purple-400 font-bold text-lg">
                      {project.metrics.cpa || project.metrics.channels || project.metrics.time}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {project.metrics.cpa ? 'CPA Change' : project.metrics.channels ? 'Strategy' : 'Timeline'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 text-pink-300 text-sm rounded-full border border-pink-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/50 p-8 rounded-xl border border-gradient-to-r from-pink-500/20 to-cyan-500/20 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Ready to Join Them?
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-6">
              These are real results from actual campaigns. With 10+ years of experience managing $50K-$150K+ monthly ad budgets 
              and generating $5M+ in client sales, your brand deserves proven performance marketing expertise.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;