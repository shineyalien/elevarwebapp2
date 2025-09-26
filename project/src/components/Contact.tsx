import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=140",
        end: "bottom top+=140",
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo(infoRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(formRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    
    // Animate button feedback
    const submitBtn = e.currentTarget.querySelector('button[type="submit"]');
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-orbitron"
        >
          <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Connect
          </span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Let's Elevate What's Next
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Ready to lift your brand into its next chapter? Our performance marketing team 
                builds elevation plans that carry your business higher with every sprint.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 p-3 rounded-lg">
                  <Mail className="text-pink-400" size={24} />
                </div>
                <div>
                  <div className="text-white font-semibold">Email</div>
                  <div className="text-gray-300">hello@elevars.agency</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-3 rounded-lg">
                  <Phone className="text-cyan-400" size={24} />
                </div>
                <div>
                  <div className="text-white font-semibold">Phone</div>
                  <div className="text-gray-300">+1 (555) 123-ELVR</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg">
                  <MapPin className="text-purple-400" size={24} />
                </div>
                <div>
                  <div className="text-white font-semibold">Location</div>
                  <div className="text-gray-300">Silicon Valley, CA & Global</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-cyan-500/10 p-6 rounded-xl border border-gradient-to-r from-pink-500/20 to-cyan-500/20">
              <h4 className="text-xl font-bold mb-2 text-white">Response Time</h4>
              <p className="text-gray-300">
                We typically respond within 24 hours. For time-sensitive launches,
                call us so we can mobilize the right crew instantly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project and goals..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;