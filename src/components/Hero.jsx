import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/Shiv.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);
  const cinematicOverlayRef = useRef(null);
  const scanLineRef = useRef(null);
  const backgroundRef = useRef(null);

  const developerRoles = [
    'FEATURE FILM // FULL-STACK DEVELOPER',
    'ORIGINAL SERIES // AI & ML EXPLORER',
    'BLOCKBUSTER // REAL-TIME APPLICATIONS',
    'ACCLAIMED // ALGORITHMIC PROBLEM SOLVER',
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    const cinematicOverlay = cinematicOverlayRef.current;
    const scanLine = scanLineRef.current;
    const background = backgroundRef.current;

    if (!section || !card || !content) return;

    const header = section.querySelector('header');
    const heroItems = content.querySelectorAll('.hero-anim-item');
    const bottomTicker = section.querySelector('.hero-bottom-ticker');
    const lightSweep = section.querySelector('.cinematic-light-sweep');

    const ctx = gsap.context(() => {
      gsap.set(section, {
        opacity: 1,
      });

      gsap.set(cinematicOverlay, {
        opacity: 1,
        scaleX: 1,
        transformOrigin: 'left center',
      });

      gsap.set(background, {
        opacity: 0,
        scale: 1.08,
      });

      gsap.set(header, {
        y: -80,
        opacity: 0,
        filter: 'blur(10px)',
      });

      gsap.set(heroItems, {
        y: 70,
        opacity: 0,
        filter: 'blur(14px)',
      });

      gsap.set(card, {
        scale: 0.55,
        opacity: 0,
        rotationY: 35,
        rotationX: -20,
        y: 80,
        filter: 'blur(12px)',
        transformOrigin: 'center center',
      });

      gsap.set(scanLine, {
        opacity: 0,
        yPercent: -100,
      });

      gsap.set(bottomTicker, {
        y: 24,
        opacity: 0,
        filter: 'blur(8px)',
      });

      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
      });

      tl.to(background, {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: 'power2.out',
      })
        .to(
          cinematicOverlay,
          {
            scaleX: 0,
            duration: 1.4,
            ease: 'power4.inOut',
          },
          '-=1.2'
        )
        .to(
          scanLine,
          {
            opacity: 1,
            yPercent: 100,
            duration: 1.5,
            ease: 'power2.inOut',
          },
          '-=1.1'
        )
        .to(
          header,
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
          },
          '-=1'
        )
        .to(
          heroItems,
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: 0.13,
            ease: 'power4.out',
          },
          '-=0.65'
        )
        .to(
          card,
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            rotationX: 0,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.6,
            ease: 'back.out(1.25)',
          },
          '-=1.15'
        )
        .to(
          bottomTicker,
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.55'
        );

      // Purple cinematic light sweep
      if (lightSweep) {
        gsap.fromTo(
          lightSweep,
          {
            xPercent: -120,
            opacity: 0,
          },
          {
            xPercent: 120,
            opacity: 1,
            duration: 1.8,
            delay: 0.5,
            ease: 'power2.inOut',
          }
        );
      }

      // Floating poster animation
      gsap.to(card, {
        y: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.8,
      });

      // Custom cursor setup
      const cursorDot = cursorDotRef.current;
      const cursorRing = cursorRingRef.current;

      if (cursorDot && cursorRing) {
        gsap.set([cursorDot, cursorRing], {
          scale: 0.5,
          opacity: 0,
          transformOrigin: '50% 50%',
        });
      }

      const xToDot = gsap.quickTo(cursorDot, 'x', {
        duration: 0.05,
        ease: 'power2.out',
      });

      const yToDot = gsap.quickTo(cursorDot, 'y', {
        duration: 0.05,
        ease: 'power2.out',
      });

      const xToRing = gsap.quickTo(cursorRing, 'x', {
        duration: 0.15,
        ease: 'power3.out',
      });

      const yToRing = gsap.quickTo(cursorRing, 'y', {
        duration: 0.15,
        ease: 'power3.out',
      });

      const xTilt = gsap.quickTo(card, 'rotationY', {
        duration: 0.4,
        ease: 'power3.out',
      });

      const yTilt = gsap.quickTo(card, 'rotationX', {
        duration: 0.4,
        ease: 'power3.out',
      });

      const glareX = gsap.quickTo(glareRef.current, 'x', {
        duration: 0.3,
        ease: 'power2.out',
      });

      const glareY = gsap.quickTo(glareRef.current, 'y', {
        duration: 0.3,
        ease: 'power2.out',
      });

      const handleMouseMove = (event) => {
        const rect = section.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const dotSize = 12;
        const ringSize = 48;

        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(
            ${x - 300}px,
            ${y - 300}px,
            0
          )`;
        }

        xToDot(x - dotSize / 2);
        yToDot(y - dotSize / 2);

        xToRing(x - ringSize / 2);
        yToRing(y - ringSize / 2);

        const cardRect = card.getBoundingClientRect();

        const cardCenterX =
          cardRect.left + cardRect.width / 2 - rect.left;

        const cardCenterY =
          cardRect.top + cardRect.height / 2 - rect.top;

        const rotateX =
          -((y - cardCenterY) / (cardRect.height / 2)) * 16;

        const rotateY =
          ((x - cardCenterX) / (cardRect.width / 2)) * 16;

        xTilt(rotateY);
        yTilt(rotateX);

        if (glareRef.current) {
          glareX(
            x - cardRect.left - cardRect.width / 2
          );

          glareY(
            y - cardRect.top - cardRect.height / 2
          );
        }
      };

      const handleMouseEnter = () => {
        gsap.to([cursorDot, cursorRing], {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });

        if (spotlightRef.current) {
          gsap.to(spotlightRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to([cursorDot, cursorRing], {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.inOut',
        });

        if (spotlightRef.current) {
          gsap.to(spotlightRef.current, {
            opacity: 0,
            duration: 0.3,
          });
        }

        xTilt(0);
        yTilt(0);
      };

      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);

        tl.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#05030A] overflow-hidden flex flex-col justify-between select-none cursor-none"
    >
      <style>{`
        @keyframes heroMarquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes scanBeam {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes cinematicPulse {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 0.7;
          }
        }

        .hero-marquee {
          display: flex;
          width: max-content;
          min-width: max-content;
          animation: heroMarquee 35s linear infinite;
          will-change: transform;
        }

        .hero-marquee-group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .hero-marquee-text {
          display: inline-block;
          flex-shrink: 0;
          margin: 0 2rem;
          color: rgba(139, 92, 246, 0.28);
          font-size: clamp(4rem, 14vw, 14rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.08em;
          white-space: nowrap;
          text-transform: uppercase;
        }

        .hero-marquee-text b {
          color: rgba(217, 70, 239, 0.4);
          margin-left: 2rem;
        }

        .animate-scan-beam {
          animation: scanBeam 4s ease-in-out infinite;
        }

        .cinematic-pulse {
          animation: cinematicPulse 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee,
          .animate-scan-beam {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .hero-marquee-text {
            font-size: 5rem;
            margin: 0 1rem;
          }

          .hero-marquee-text b {
            margin-left: 1rem;
          }
        }
      `}</style>

      {/* Cinematic entrance overlay */}
      <div
        ref={cinematicOverlayRef}
        className="absolute inset-0 z-[60] pointer-events-none bg-[#08050F]"
      />

      {/* Cinematic scanning beam */}
      <div
        ref={scanLineRef}
        className="absolute inset-x-0 top-0 z-[55] h-32 pointer-events-none bg-gradient-to-b from-transparent via-purple-400/20 to-transparent blur-xl"
      />

      {/* Purple light sweep */}
      <div className="cinematic-light-sweep absolute top-0 bottom-0 left-0 z-[25] w-[35%] pointer-events-none bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-3xl" />

      {/* Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 bg-gradient-to-t from-[#05030A] via-black/90 to-[#05030A]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12),transparent_45%)]" />

        {/* Working background marquee */}
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <div className="hero-marquee">
            <div className="hero-marquee-group">
              {developerRoles.map((role, index) => (
                <span
                  key={`first-${index}`}
                  className="hero-marquee-text"
                >
                  {role} <b>•</b>
                </span>
              ))}
            </div>

            <div
              className="hero-marquee-group"
              aria-hidden="true"
            >
              {developerRoles.map((role, index) => (
                <span
                  key={`second-${index}`}
                  className="hero-marquee-text"
                >
                  {role} <b>•</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mouse tracking spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 z-10 w-[600px] h-[600px] rounded-full pointer-events-none opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-12"
      >
        {/* Top badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-purple-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />

            <span className="text-purple-400 font-bold tracking-wider">
              DEVELOPER PORTFOLIO SERIES
            </span>

            <span className="text-white/40">|</span>

            <span className="text-white/80">
              B.TECH CSE • 2027
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">
              FULL-STACK 4K
            </span>

            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">
              AI / ML EXPLORER
            </span>
          </div>
        </div>

        {/* Main cinematic stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">
          {/* Left content */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-purple-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(139,92,246,0.8)] animate-pulse">
                250+ DSA
              </span>

              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
                Full-Stack MERN Developer
              </span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              SHIV SHANKAR
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-600 drop-shadow-[0_0_35px_rgba(139,92,246,0.5)]">
                FULL-STACK DEV.
              </span>
            </h1>

            <div className="hero-anim-item flex items-center gap-3 text-xs font-mono text-purple-400 font-bold flex-wrap">
              <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded text-purple-400">
                Java
              </span>

              <span className="text-white/40">•</span>

              <span>React • Node.js • MongoDB</span>

              <span className="text-white/40">•</span>

              <span className="text-white/70">
                AI & WebRTC
              </span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              Computer Science undergraduate and Full-Stack MERN Developer
              building web applications, REST APIs, and real-time features.
              Solved 250+ DSA problems and participated in national-level
              hackathons.
            </p>

            <div className="hero-anim-item flex items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

                View Projects
              </a>

              <a
                href="#contact"
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-purple-500/30 font-bold text-xs uppercase tracking-widest rounded hover:bg-purple-950/50 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>

                Contact Me
              </a>
            </div>
          </div>

          {/* Center poster */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-600/70 via-fuchsia-600/40 to-indigo-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000" />

              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#14101c]/90 backdrop-blur-2xl rounded-2xl border border-purple-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                <div
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                />

                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-purple-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  FEATURED DEV
                </div>

                <img
                  src={pictureImg}
                  alt="Developer Portrait"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right technical specs */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs">
              <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-2">
                Core Stack & Achievements
              </h3>

              <p className="text-xs text-white/80 leading-relaxed font-light">
                Java | React | Node.js | MongoDB
                <br />
                250+ DSA Problems Solved
                <br />
                EY Techathon 2025 Semi-Finalist
                <br />
                Web Development Intern
              </p>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="hero-anim-item hero-bottom-ticker flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase opacity-0 translate-y-6">
          <span>ENGINEERED FOR REAL-WORLD SOFTWARE</span>

          <span>
            [ SHIV SHANKAR • PORTFOLIO v1.0 ]
          </span>
        </div>
      </div>

      {/* Custom cursor dot */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_#8B5CF6]"
      />

      {/* Custom cursor ring */}
      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-purple-500/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      />

      {/* Navbar */}
      <header className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <div className="text-2xl font-black text-purple-500 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(139,92,246,0.9)]">
          SHIV SHANKAR

          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a
            href="#home"
            className="hover:text-purple-400 transition-colors"
          >
            Home
          </a>

          <a
            href="#about"
            className="hover:text-purple-400 transition-colors"
          >
            About
          </a>

          <a
            href="#expertise"
            className="hover:text-purple-400 transition-colors"
          >
            Expertise
          </a>

          <a
            href="#skills"
            className="hover:text-purple-400 transition-colors"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="hover:text-purple-400 transition-colors"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="hover:text-purple-400 transition-colors"
          >
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="px-5 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95"
        >
          Hire Me
        </a>
      </header>
    </section>
  );
};

export default Hero;