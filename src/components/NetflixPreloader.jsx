import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MinimalPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressRef = useRef(null);
  const lineRef = useRef(null);
  const ringOneRef = useRef(null);
  const ringTwoRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const content = contentRef.current;
    const logo = logoRef.current;
    const subtitle = subtitleRef.current;
    const progress = progressRef.current;
    const line = lineRef.current;
    const ringOne = ringOneRef.current;
    const ringTwo = ringTwoRef.current;
    const glow = glowRef.current;

    if (
      !preloader ||
      !content ||
      !logo ||
      !subtitle ||
      !progress ||
      !line ||
      !ringOne ||
      !ringTwo ||
      !glow
    ) {
      return;
    }

    const letters = logo.querySelectorAll('.logo-letter');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      gsap.set(preloader, {
        autoAlpha: 1,
        backgroundColor: '#08050F',
      });

      gsap.set(content, {
        opacity: 1,
        scale: 1,
      });

      gsap.set(letters, {
        opacity: 0,
        y: 35,
        rotateX: -90,
        transformOrigin: '50% 100%',
      });

      gsap.set([subtitle, progress, line], {
        opacity: 0,
      });

      gsap.set([ringOne, ringTwo], {
        scale: 0.2,
        opacity: 0,
        transformOrigin: '50% 50%',
      });

      gsap.set(glow, {
        opacity: 0,
        scale: 0.7,
      });

      gsap.set(progress, {
        width: '0%',
      });

      tl.to(glow, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      })
        .to(
          ringOne,
          {
            opacity: 0.8,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=1'
        )
        .to(
          ringTwo,
          {
            opacity: 0.45,
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
          },
          '-=1'
        )
        .to(
          letters,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(
          subtitle,
          {
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          line,
          {
            opacity: 1,
            duration: 0.4,
          },
          '-=0.3'
        )
        .to(
          progress,
          {
            width: '100%',
            duration: 1.8,
            ease: 'power2.inOut',
          },
          '-=0.2'
        )
        .to(
          content,
          {
            scale: 1.04,
            opacity: 0,
            filter: 'blur(12px)',
            duration: 0.7,
            ease: 'power3.in',
            delay: 0.35,
          }
        )
        .to(
          [ringOne, ringTwo],
          {
            scale: 2.5,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in',
          },
          '<'
        )
        .to(
          preloader,
          {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '-=0.35'
        );
    }, preloaderRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#08050F] select-none"
    >
      {/* Ambient cinematic background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12),transparent_42%)]" />

      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Expanding cinematic rings */}
      <div
        ref={ringOneRef}
        className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full border border-purple-500/30"
      />

      <div
        ref={ringTwoRef}
        className="absolute w-[360px] h-[360px] md:w-[560px] md:h-[560px] rounded-full border border-purple-400/10"
      />

      {/* Central glow */}
      <div
        ref={glowRef}
        className="absolute w-[260px] h-[260px] md:w-[420px] md:h-[420px] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none"
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Top technical label */}
        <div className="mb-8 flex items-center gap-3 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.45em] text-purple-300/60">
          <span className="h-px w-8 bg-purple-500/50" />
          <span>Initializing Experience</span>
          <span className="h-px w-8 bg-purple-500/50" />
        </div>

        {/* Animated logo */}
        <h1
          ref={logoRef}
          className="flex perspective-[600px] text-4xl md:text-6xl font-black uppercase tracking-[0.16em] text-white"
          style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            textShadow: '0 0 35px rgba(139,92,246,0.35)',
          }}
        >
          {'SHIV SHANKAR'.split('').map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={`logo-letter inline-block ${
                letter === ' ' ? 'w-3 md:w-5' : ''
              }`}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-5 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.38em] text-white/45"
        >
          Full-Stack Developer // Creative Engineer
        </p>

        {/* Progress line */}
        <div
          ref={lineRef}
          className="mt-10 h-px w-48 md:w-64 overflow-hidden bg-white/10"
        >
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-purple-700 via-purple-400 to-white shadow-[0_0_12px_rgba(139,92,246,0.9)]"
          />
        </div>

        {/* Bottom loading information */}
        <div
          className="mt-4 flex w-48 md:w-64 justify-between text-[8px] font-mono uppercase tracking-[0.25em] text-white/30"
        >
          <span>Loading Assets</span>
          <span className="text-purple-300/60">2026</span>
        </div>
      </div>

      {/* Corner cinematic marks */}
      <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-purple-500/30" />
      <div className="absolute right-6 top-6 h-8 w-8 border-r border-t border-purple-500/30" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-purple-500/30" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-purple-500/30" />

      {/* Scanning beam */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px animate-[scan_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

      <style>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MinimalPreloader;