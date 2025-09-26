import { Heart, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent font-orbitron mb-4">
              ELEVARS
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Elevating bold brands with performance marketing that turns ambition into lasting lift.
              We align human imagination with intelligent systems so every campaign climbs higher.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Search Marketing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Social Advertising</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Performance Analytics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Mobile Campaigns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-pink-400 transition-colors">About</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-cyan-400 transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Elevars Performance Marketing. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart className="text-pink-400" size={16} fill="currentColor" />
            <span>in the digital realm</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
