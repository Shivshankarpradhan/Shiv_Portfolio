import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const marquee = marqueeRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !marquee) return;

    const ctx = gsap.context(() => {
      /*
       * Background marquee
       *
       * The content is duplicated twice.
       * Moving -50% creates a continuous loop.
       */
      const marqueeAnimation = gsap.to(marquee, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1,
      });

      /*
       * Card entrance animation
       */
      gsap.fromTo(
        cards,
        {
          y: 80,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /*
       * Mouse-following spotlight
       */
      const listeners = [];

      cards.forEach((card) => {
        const handleMouseMove = (event) => {
          const rect = card.getBoundingClientRect();

          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        };

        card.addEventListener('mousemove', handleMouseMove);

        listeners.push({
          card,
          handleMouseMove,
        });
      });

      return () => {
        marqueeAnimation.kill();

        listeners.forEach(({ card, handleMouseMove }) => {
          card.removeEventListener('mousemove', handleMouseMove);
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (element) => {
    if (element && !cardRefs.current.includes(element)) {
      cardRefs.current.push(element);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[#05030A] px-6 py-32 text-white select-none md:px-12"
    >
      {/* =========================================
          BACKGROUND MARQUEE
      ========================================== */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden opacity-[0.045]">
        <div
          ref={marqueeRef}
          className="flex w-max whitespace-nowrap"
        >
          {/* First Marquee Group */}
          <div className="flex shrink-0 items-center">
            <span className="mr-24 text-[clamp(7rem,18vw,18rem)] font-black uppercase leading-none tracking-tighter text-white">
              FULL STACK ENGINEER
            </span>

            <span className="mr-24 text-[clamp(7rem,18vw,18rem)] font-black uppercase leading-none tracking-tighter text-purple-500">
              FULL STACK ENGINEER
            </span>

            <span className="mr-24 text-[clamp(7rem,18vw,18rem)] font-black uppercase leading-none tracking-tighter text-white">
              FULL STACK ENGINEER
            </span>
          </div>

          {/* Duplicate Group For Seamless Loop */}
          <div className="flex shrink-0 items-center">
            <span className="mr-24 text-[clamp(7rem,18vw,18rem)] font-black uppercase leading-none tracking-tighter text-white">
              FULL STACK ENGINEER
            </span>

            <span className="mr-24 text-[clamp(7rem,18vw,18rem)] font-black uppercase leading-none tracking-tighter text-purple-500">
              FULL STACK ENGINEER
            </span>

            <span className="mr-24 text-[clamp(7rem,18vw,18rem)] font-black uppercase leading-none tracking-tighter text-white">
              FULL STACK ENGINEER
            </span>
          </div>
        </div>
      </div>

      {/* Purple Ambient Glow */}
      <div className="pointer-events-none absolute left-10 top-1/4 z-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[160px]" />

      <div className="pointer-events-none absolute bottom-10 right-10 z-0 h-[500px] w-[500px] rounded-full bg-violet-900/10 blur-[160px]" />

      {/* =========================================
          MAIN CONTENT
      ========================================== */}
      <div className="relative z-10 mx-auto w-full max-w-7xl space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 rounded border border-purple-600/40 bg-black/80 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white shadow-2xl backdrop-blur-2xl">
            <span className="h-2 w-2 animate-ping rounded-full bg-purple-600" />

            <span className="font-bold text-purple-400">
              EPISODE 01
            </span>

            <span className="text-white/40">|</span>

            <span>ABOUT THE ENGINEER</span>
          </div>

          <h2 className="text-4xl font-black leading-tight tracking-tighter text-white md:text-6xl">
            INTRODUCTION
            <br />

            <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              WHO I AM & WHAT I BUILD.
            </span>
          </h2>
        </div>

        {/* =========================================
            BENTO GRID
        ========================================== */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* About Card */}
          <div
            ref={addToRefs}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#14111C]/90 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-purple-600/60 md:col-span-7 md:p-12"
          >
            {/* Mouse Spotlight */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(139,92,246,0.15), transparent 70%)',
              }}
            />

            {/* Background Number */}
            <div className="pointer-events-none absolute right-0 top-0 z-0 p-8 font-mono text-7xl font-black text-white/5">
              01
            </div>

            <div className="relative z-10 space-y-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-purple-400">
                Cast & Background
              </h3>

              <p className="text-lg font-medium leading-relaxed text-white/90 md:text-xl">
                I am{' '}
                <span className="font-bold text-white drop-shadow">
                  Shiv Shankar Pradhan
                </span>
                , a Computer Science undergraduate and Full-Stack MERN
                Developer focused on building practical, scalable software.
              </p>

              <p className="text-sm font-light leading-relaxed text-white/60 md:text-base">
                My technical journey combines data structures and
                problem-solving with full-stack development. I am
                strengthening my backend engineering skills through Java
                and Spring Boot, while learning Docker, AWS fundamentals,
                and CI/CD practices to build and deploy reliable
                applications.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 pt-8">
              <span className="rounded border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/80">
                Full-Stack MERN
              </span>

              <span className="rounded border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/80">
                Java & DSA
              </span>

              <span className="rounded border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/80">
                AI & Real-Time Systems
              </span>
            </div>
          </div>

          {/* Achievements Card */}
          <div
            ref={addToRefs}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#14111C]/90 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-purple-600/60 md:col-span-5 md:p-12"
          >
            {/* Mouse Spotlight */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(139,92,246,0.15), transparent 70%)',
              }}
            />

            {/* Background Number */}
            <div className="pointer-events-none absolute right-0 top-0 z-0 p-8 font-mono text-7xl font-black text-white/5">
              02
            </div>

            <div className="relative z-10 space-y-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-purple-400">
                Milestones & Accolades
              </h3>

              <ul className="space-y-3.5 text-sm font-light text-white/80">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-purple-400">›</span>

                  <span>
                    Solved more than{' '}
                    <strong className="text-white">
                      250+ DSA problems
                    </strong>{' '}
                    across LeetCode and GeeksforGeeks.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-purple-400">›</span>

                  <span>
                    Selected as a{' '}
                    <strong className="text-white">
                      Semi-Finalist in EY Techathon 2025
                    </strong>
                    .
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-purple-400">›</span>

                  <span>
                    Participated in the{' '}
                    <strong className="text-white">
                      BPUT Hackathon 2025
                    </strong>
                    .
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-purple-400">›</span>

                  <span>
                    Completed a{' '}
                    <strong className="text-white">
                      Web Development Internship
                    </strong>{' '}
                    at ApexPlanet Software Pvt. Ltd.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-purple-400">›</span>

                  <span>
                    Currently working as an{' '}
                    <strong className="text-white">
                      SDE Trainee Intern at KodNest
                    </strong>
                    .
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-6 font-mono text-xs text-white/40">
              // SEASON_01 HIGHLIGHTS
            </div>
          </div>

          {/* Technical Stack Card */}
          <div
            ref={addToRefs}
            className="group relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#14111C]/90 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-purple-600/60 md:col-span-12 md:flex-row md:p-12"
          >
            {/* Mouse Spotlight */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(139,92,246,0.15), transparent 70%)',
              }}
            />

            <div className="relative z-10 space-y-2 text-left">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-purple-400">
                Production Tech Stack
              </h3>

              <p className="text-base font-semibold text-white md:text-lg">
                Equipped with practical tools for building reliable,
                scalable applications.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-start gap-3 md:justify-end">
              {[
                'Java',
                'Spring Boot',
                'React',
                'Node.js',
                'Express',
                'MongoDB',
                'Socket.io',
                'WebRTC',
                'Docker',
                'AWS Basics',
                'CI/CD',
                'JavaScript',
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white shadow-inner transition-all hover:scale-105 hover:border-purple-600/40 hover:bg-purple-600/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;