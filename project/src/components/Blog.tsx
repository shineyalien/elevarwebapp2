import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const posts = useMemo(() => ([
    {
      title: 'Elevating LTV with Predictive Creative Testing',
      slug: '#',
      excerpt:
        'How Elevars pairs machine intelligence with human insight to continually raise lifetime value across acquisition funnels.',
      date: '2025-08-12',
      readTime: '6 min read',
      category: 'Growth Intelligence'
    },
    {
      title: 'The Uplift Playbook for Launching Into New Markets',
      slug: '#',
      excerpt:
        'A step-by-step framework for lifting brands into fresh territories without losing momentum with their core audience.',
      date: '2025-07-28',
      readTime: '8 min read',
      category: 'Expansion Strategy'
    },
    {
      title: 'Designing Customer Journeys that Keep Rising',
      slug: '#',
      excerpt:
        'Mapping the elevated experiences that transform curious prospects into long-term advocates who keep climbing with you.',
      date: '2025-06-30',
      readTime: '7 min read',
      category: 'Experience Design'
    }
  ]), []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top bottom-=140',
            end: 'bottom top+=140',
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=120',
              end: 'bottom top+=120',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Elevars Insights',
    'description': 'Perspectives from Elevars on uplifting performance marketing, intelligent growth, and elevated customer experiences.',
    'url': typeof window !== 'undefined' ? window.location.origin : 'https://elevars.agency',
    'blogPost': posts.map((post) => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'abstract': post.excerpt,
      'datePublished': post.date,
      'author': {
        '@type': 'Organization',
        'name': 'Elevars'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Elevars',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://elevars.agency/logo.png'
        }
      },
      'url': post.slug === '#' ? (typeof window !== 'undefined' ? window.location.origin + '/blog' : 'https://elevars.agency/blog') : post.slug
    }))
  }), [posts]);

  return (
    <section id="blog" ref={sectionRef} className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-orbitron"
        >
          <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Elevars Insights
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.title}
              ref={addToRefs}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-pink-500/40 transition-all duration-300 group"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span className="uppercase tracking-wide text-pink-400">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300" itemProp="headline">
                {post.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6" itemProp="description">
                {post.excerpt}
              </p>
              <a
                href={post.slug}
                className="inline-flex items-center text-pink-400 hover:text-cyan-400 transition-colors font-semibold"
                itemProp="url"
              >
                Keep reading
                <span className="ml-2 transition-transform group-hover:translate-x-1">-&gt;</span>
              </a>
              <meta itemProp="datePublished" content={post.date} />
              <meta itemProp="author" content="Elevars" />
            </article>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </section>
  );
};

export default Blog;
