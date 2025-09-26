import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const sphereRef = useRef<HTMLDivElement>(null);
  const floatingShapes = useMemo(() => (
    Array.from({ length: 6 }).map((_, i) => ({
      className: `absolute w-4 h-4 bg-gradient-to-r from-pink-500 to-cyan-400 opacity-20 transform rotate-45 animate-float-${i + 1}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${i * 0.5}s`
    }))
  ), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sphere = sphereRef.current;
    let spherePulse: gsap.core.Tween | undefined;

    if (sphere) {
      gsap.set(sphere, {
        opacity: 0,
        scale: 0.9,
        transformOrigin: '50% 50%',
        css: {
          '--x': '50%',
          '--y': '50%',
        },
      });

      gsap.to(sphere, {
        opacity: 0.85,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.3,
      });

      spherePulse = gsap.to(sphere, {
        scale: 1.05,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.5,
      });
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.color = Math.random() > 0.5 ? '#FF006E' : '#06FFA5';
        this.alpha = 1;
        this.life = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.01;
        this.alpha = this.life;
        this.size *= 0.98;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.restore();
      }
    }

    // Grid system
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 0, 110, 0.1)';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (sphere) {
        const { innerWidth, innerHeight } = window;
        const offsetX = (e.clientX / innerWidth - 0.5) * 60;
        const offsetY = (e.clientY / innerHeight - 0.5) * 40;
        const gradientX = 50 + (e.clientX / innerWidth - 0.5) * 20;
        const gradientY = 50 + (e.clientY / innerHeight - 0.5) * 15;
        const intensity =
          0.75 +
          (Math.abs(e.clientX / innerWidth - 0.5) +
            Math.abs(e.clientY / innerHeight - 0.5)) *
            0.15;

        gsap.to(sphere, {
          duration: 1.2,
          ease: 'expo.out',
          x: offsetX,
          y: offsetY,
          opacity: intensity,
          overwrite: 'auto',
          css: {
            '--x': `${gradientX}%`,
            '--y': `${gradientY}%`,
          },
        });
      }
      
      // Create particles at mouse position
      for (let i = 0; i < 3; i++) {
        const particle = new Particle(
          e.clientX + (Math.random() - 0.5) * 20,
          e.clientY + (Math.random() - 0.5) * 20
        );
        particlesRef.current.push(particle);
        if (particlesRef.current.length > 360) {
          particlesRef.current.splice(0, particlesRef.current.length - 360);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return particle.life > 0;
      });
      
      requestAnimationFrame(animate);
    };
    animate();

    // Hero text animations
    const tl = gsap.timeline();
    tl.fromTo('.hero-title',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo('.hero-subtitle',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('.hero-cta',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (spherePulse) {
        spherePulse.kill();
      }
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      gsap.to(window, {
        scrollTo: { y: aboutSection.offsetTop - 80, autoKill: false },
        duration: 1,
        ease: 'power2.out'
      });
    }
  };

  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden'>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 z-0'
      />

      <div className='absolute inset-0 flex items-center justify-center pointer-events-none z-[5]'>
        <div
          ref={sphereRef}
          className='hero-sphere'
        >
          <div className='hero-sphere-rings'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='hero-sphere-ring'
                style={{ animationDelay: `${i * 2.5}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className='relative z-10 text-center px-6'>
        <h1 className='hero-title text-6xl md:text-8xl font-black font-orbitron mb-6'>
          <span className='bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse'>
            ELEVARS
          </span>
        </h1>
        
        <p className='hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
          We lift ambitious brands with{' '}
          <span className='text-pink-400 font-semibold'>intelligent performance marketing</span>{' '}
          that elevates every customer moment far beyond expectation.
        </p>
        
        <div className='hero-cta space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center'>
          <button 
            onClick={scrollToAbout}
            className='block md:inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25'
          >
            Begin Your Ascent
          </button>
          
          <button className='block md:inline-block border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105'>
            See Elevation Stories
          </button>
        </div>
      </div>

      <button 
        onClick={scrollToAbout}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 text-pink-400 hover:text-cyan-400 transition-colors animate-bounce'
      >
        <ChevronDown size={32} />
      </button>

      {/* Floating geometric shapes */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {floatingShapes.map((shape, index) => (
          <div
            key={index}
            className={shape.className}
            style={{ left: shape.left, top: shape.top, animationDelay: shape.animationDelay }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

