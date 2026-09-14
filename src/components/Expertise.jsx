import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: '01',
    title: 'Frontend Development',
    text: 'Building responsive, user-friendly interfaces with React, JavaScript ES6+, Redux Toolkit, Tailwind CSS, and modern UI interactions.',
    tag: 'UI / UX & INTERACTION',
    gradient: 'from-[#1b0d2b] via-[#121212] to-[#0a0a0a]',
  },
  {
    number: '02',
    title: 'Backend Development',
    text: 'Developing secure REST APIs and scalable backend services using Java, Spring Boot, Node.js, Express.js, JWT authentication, and MongoDB.',
    tag: 'API & ARCHITECTURE',
    gradient: 'from-[#180d2b] via-[#111111] to-[#090909]',
  },
  {
    number: '03',
    title: 'AI & Real-Time Systems',
    text: 'Integrating AI-powered features, OpenAI APIs, speech-to-text workflows, Socket.io communication, and WebRTC-based real-time applications.',
    tag: 'INTELLIGENCE & REAL-TIME',
    gradient: 'from-[#220d35] via-[#131313] to-[#0a0a0a]',
  },
  {
    number: '04',
    title: 'Cloud & Deployment',
    text: 'Learning and applying Docker fundamentals, AWS basics, GitHub Actions, and CI/CD practices to build, deploy, and maintain reliable applications.',
    tag: 'DEVOPS & CLOUD',
    gradient: 'from-[#1d0b2d] via-[#101010] to-[#080808]',
  },
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);

      if (!cards.length) return;

      /*
       * Initial state
       */
      gsap.set(cards, {
        y: 100,
        opacity: 0,
        scale: 0.96,
      });

      /*
       * Smooth card entrance
       */
      cards.forEach((card, index) => {
        const tag = card.querySelector('.expertise-tag');
        const number = card.querySelector('.expertise-number');
        const title = card.querySelector('.expertise-title');
        const description = card.querySelector(
          '.expertise-description'
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 1.2,
          },
        });

        timeline
          .to(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          })
          .fromTo(
            [tag, number],
            {
              opacity: 0,
              y: -20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.6'
          )
          .fromTo(
            title,
            {
              opacity: 0,
              x: -30,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.3'
          )
          .fromTo(
            description,
            {
              opacity: 0,
              x: 30,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.35'
          );
      });

      /*
       * Mouse spotlight and subtle tilt
       */
      const handleMouseMove = (event, card) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 5;
        const rotateX = ((y / rect.height) - 0.5) * -5;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: true,
        });
      };

      const handleMouseLeave = (card) => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: true,
        });
      };

      cards.forEach((card) => {
        const mouseMoveListener = (event) => {
          handleMouseMove(event, card);
        };

        const mouseLeaveListener = () => {
          handleMouseLeave(card);
        };

        card.addEventListener('mousemove', mouseMoveListener);
        card.addEventListener('mouseleave', mouseLeaveListener);

        card._mouseMoveListener = mouseMoveListener;
        card._mouseLeaveListener = mouseLeaveListener;
      });

      return () => {
        cards.forEach((card) => {
          card.removeEventListener(
            'mousemove',
            card._mouseMoveListener
          );

          card.removeEventListener(
            'mouseleave',
            card._mouseLeaveListener
          );
        });
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (element) => {
    if (element && !cardRefs.current.includes(element)) {
      cardRefs.current.push(element);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#05030A] px-6 py-20 text-white select-none md:px-12"
    >
      {/* Ambient Purple Glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 pb-2 md:flex-row md:items-end">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded border border-purple-600/40 bg-black/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white shadow-xl backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-purple-600" />

              <span className="font-bold text-purple-400">
                EPISODE 02
              </span>

              <span className="text-white/40">|</span>

              <span>CORE COMPETENCIES</span>
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
            WHAT I BUILD
              <br />

              <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(139,92,246,0.35)]">
                TECHNICAL CAPABILITIES.
              </span>
            </h2>
          </div>

          <p className="max-w-xs text-xs font-light leading-relaxed text-white/60 md:text-sm">
            Combining full-stack engineering, Java backend development,
            real-time systems, and cloud deployment fundamentals into
            production-ready applications.
          </p>
        </div>

        {/* Sticky Overlay Card Stack */}
        <div className="relative pb-[20vh]">
          {expertiseData.map((item, index) => (
            <div
              key={item.number}
              ref={addToRefs}
              className={`group sticky mb-8 flex min-h-[270px] w-full transform-gpu flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-colors duration-300 hover:border-purple-600/50 md:min-h-[300px] md:p-10 ${item.gradient}`}
              style={{
                top: `${110 + index * 12}px`,
                zIndex: index + 1,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Mouse Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(139,92,246,0.2), transparent 70%)',
                }}
              />

              {/* Top Accent */}
              <div className="absolute left-1/2 top-0 z-10 h-[2px] w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

              {/* Card Header */}
              <div className="relative z-10 mb-8 flex w-full items-center justify-between">
                <span className="expertise-tag rounded border border-purple-600/25 bg-purple-600/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-purple-400">
                  {item.tag}
                </span>

                <span className="expertise-number font-mono text-3xl font-black text-white/20 md:text-5xl">
                  {item.number}
                </span>
              </div>

              {/* Card Content */}
              <div className="relative z-10 my-auto grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <h3 className="expertise-title text-3xl font-black leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-purple-400 md:text-5xl">
                    {item.title}
                  </h3>
                </div>

                <div className="lg:col-span-7">
                  <p className="expertise-description max-w-xl text-sm font-light leading-relaxed text-white/70 md:text-base">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 mt-8 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                  Scroll to explore
                </span>

                <div className="h-2 w-2 rounded-full bg-purple-500 transition-all duration-300 group-hover:shadow-[0_0_18px_#8B5CF6]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;