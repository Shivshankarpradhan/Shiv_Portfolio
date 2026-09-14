import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend Engineering',
    desc: 'Crafting responsive and interactive user interfaces using React, JavaScript ES6+, HTML5, CSS3, Redux Toolkit, and Tailwind CSS.',
    tag: 'UI / INTERACTION',
    skills: ['React', 'JavaScript', 'Redux Toolkit', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend & Databases',
    desc: 'Building secure REST APIs, authentication flows, and server-side applications using Java, Spring Boot, Node.js, Express.js, and MongoDB.',
    tag: 'API & ARCHITECTURE',
    skills: ['Java', 'Spring Boot', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT'],
  },
  {
    title: 'AI & Real-Time Systems',
    desc: 'Developing AI-powered applications and real-time communication features using OpenAI APIs, speech-to-text, Socket.io, and WebRTC.',
    tag: 'INTELLIGENCE & REAL-TIME',
    skills: ['OpenAI API', 'Generative AI', 'Speech-to-Text', 'Socket.io', 'WebRTC', 'AI Integration'],
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Learning and applying deployment fundamentals using Docker, AWS basics, GitHub Actions, and CI/CD workflows for reliable application delivery.',
    tag: 'INFRASTRUCTURE',
    skills: ['Docker', 'AWS Basics', 'GitHub Actions', 'CI/CD', 'Render', 'Vercel'],
  },
  {
    title: 'Algorithmic Problem Solving',
    desc: 'Strengthening problem-solving skills by practicing data structures, algorithms, and core computer science concepts across coding platforms.',
    tag: 'COMPETITIVE',
    skills: ['Data Structures', 'Algorithms', 'Java DSA', 'LeetCode', 'GeeksforGeeks', 'OOP'],
  },
  {
    title: 'Tools & Core CS',
    desc: 'Using modern development tools while building a strong foundation in databases, operating systems, computer networks, and software engineering.',
    tag: 'TOOLS & FUNDAMENTALS',
    skills: ['Git', 'GitHub', 'Postman', 'MySQL', 'DBMS', 'Operating Systems', 'Computer Networks'],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;

    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let activeIdx = 0;
    let minDiff = Infinity;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);

      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, {
          scale: i === activeIdx ? 1 : 0.9,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) {
        gsap.to(bg, {
          opacity: i === activeIdx ? 1 : 0,
          duration: 0.4,
          overwrite: 'auto',
        });
      }
    });

    textRefs.current.forEach((txt, i) => {
      if (txt) {
        gsap.to(txt, {
          opacity: i === activeIdx ? 1 : 0,
          duration: 0.4,
          overwrite: 'auto',
        });
      }
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const offset = i - p;

            const radius = 1800;
            const angleSpread = 18;

            const angle = offset * angleSpread;
            const rad = (angle * Math.PI) / 180;

            const x = Math.sin(rad) * radius;
            const y = radius - Math.cos(rad) * radius;
            const z = -Math.abs(offset) * 50;

            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle;
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x,
              y,
              z,
              scale,
              rotationZ: rotateZ,
              rotationY: 0,
              opacity,
              zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
            if (!bg) return;

            const itemOpacity = Math.max(0, 1 - Math.abs(i - p));

            gsap.set(bg, {
              opacity: itemOpacity,
            });

            if (textRefs.current[i]) {
              gsap.set(textRefs.current[i], {
                opacity: itemOpacity,
              });
            }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (skillCategories.length - 1);
            updateCards(p);
          },
        });
      });

      mm.add('(max-width: 768px)', () => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            gsap.set(card, {
              clearProps: 'x,y,z,rotation,scale,opacity,position',
            });

            gsap.set(card, {
              scale: i === 0 ? 1 : 0.9,
            });
          }
        });

        bgRefs.current.forEach((bg, i) => {
          if (bg) {
            gsap.set(bg, {
              clearProps: 'all',
              opacity: i === 0 ? 1 : 0,
            });
          }
        });

        textRefs.current.forEach((txt, i) => {
          if (txt) {
            gsap.set(txt, {
              clearProps: 'all',
              opacity: i === 0 ? 1 : 0,
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#08050F] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none"
    >
      {/* Dynamic Purple Dark Background Vignettes */}
      {skillCategories.map((_, i) => (
        <div
          key={i}
          ref={(el) => (bgRefs.current[i] = el)}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-[#160B25] to-black"
        />
      ))}

      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skillCategories.map((_, i) => (
          <h1
            key={`text-${i}`}
            ref={(el) => (textRefs.current[i] = el)}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{
              WebkitTextStroke: `2px ${
                i % 2 === 0
                  ? 'rgba(139,92,246,0.3)'
                  : 'rgba(255,255,255,0.15)'
              }`,
              opacity: 0,
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      {/* Carousel Container */}
      <div
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-[#14111C]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-purple-600/80 transition-colors duration-500"
          >
            {/* Inner Purple Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-purple-400 bg-purple-600/10 px-3 py-1 rounded border border-purple-600/20">
                {category.tag}
              </span>

              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-purple-400 transition-colors duration-300">
                {category.title}
              </h3>

              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-purple-600/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Purple Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-purple-600 group-hover:shadow-[0_0_15px_#8B5CF6] transition-all" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;