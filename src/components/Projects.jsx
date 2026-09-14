import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project data based on your portfolio
const projectsData = [
  {
    title: 'GEARUPGPT',
    category: 'AI-Powered Web Application',
    description:
      'An AI-powered application that helps users explore personalized vehicle recommendations through an interactive React interface and OpenAI API integration.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
    match: '99%',
    episode: 'S01 E01',
  },
  {
    title: 'VIDESSAX',
    category: 'Real-Time Communication',
    description:
      'A real-time video communication platform using WebRTC and Socket.io for interactive video sessions and seamless peer-to-peer communication.',
    tags: ['React', 'WebRTC', 'Socket.io', 'Node.js'],
    match: '98%',
    episode: 'S01 E02',
  },
  {
    title: 'WANDERLUST',
    category: 'Full-Stack Travel Platform',
    description:
      'A full-stack travel listing platform with authentication, cloud image uploads, interactive maps, and location-based property exploration.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Passport', 'Cloudinary'],
    match: '97%',
    episode: 'S01 E03',
  },
  {
    title: 'NOTICE HUB',
    category: 'Campus Communication',
    description:
      'A centralized platform for university announcements that improves access to important notices and streamlines communication between students and institutions.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    match: '99%',
    episode: 'S01 E04',
  },
  {
    title: 'AI INTEGRATION LAB',
    category: 'Generative AI',
    description:
      'Experimental AI workflows focused on integrating generative AI, API-based intelligence, and automation features into modern web applications.',
    tags: ['JavaScript', 'OpenAI API', 'REST APIs', 'AI Integration'],
    match: '96%',
    episode: 'S01 E05',
  },
  {
    title: 'DSA PROBLEM SOLVER',
    category: 'Algorithmic Problem Solving',
    description:
      'A collection of optimized solutions covering data structures, algorithms, object-oriented programming, and core problem-solving patterns.',
    tags: ['Java', 'DSA', 'Algorithms', 'OOP'],
    match: '99%',
    episode: 'S01 E06',
  },
  {
    title: 'PORTFOLIO CINEMATICS',
    category: 'UI/UX & Animation',
    description:
      'A cinematic developer portfolio featuring immersive layouts, responsive interfaces, GSAP animations, and a purple visual identity.',
    tags: ['React', 'GSAP', 'Tailwind CSS', 'JavaScript'],
    match: '100%',
    episode: 'S01 E07',
  },
  {
    title: 'CLOUD CI/CD WORKFLOW',
    category: 'Cloud & DevOps',
    description:
      'Deployment-focused workflows exploring Docker fundamentals, GitHub Actions, CI/CD automation, and application hosting with modern cloud platforms.',
    tags: ['Docker', 'GitHub Actions', 'CI/CD', 'Render'],
    match: '98%',
    episode: 'S01 E08',
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial folder origins
      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(folderFrontRef.current, {
        transformOrigin: 'bottom center',
      });

      const getGridPos = (index) => {
        let row;
        let col;

        if (index < 3) {
          row = 0;
          col = index;
        } else if (index === 3) {
          row = 1;
          col = 0;
        } else if (index === 4) {
          row = 1;
          col = 2;
        } else {
          row = 2;
          col = index - 5;
        }

        return { row, col };
      };

      // Initial desktop card setup
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions;

          if (isDesktop) {
            let floatTween;

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 50%',
                end: 'bottom 50%',
                toggleActions: 'play reverse play reverse',
                onEnter: () => {
                  if (floatTween) floatTween.kill();
                },
                onEnterBack: () => {
                  if (floatTween) floatTween.kill();
                },
                onLeave: () => {
                  if (floatTween) floatTween.kill();
                },
                onLeaveBack: () => {
                  if (floatTween) floatTween.kill();
                },
              },
              onComplete: () => {
                floatTween = gsap.to(cardsRef.current, {
                  y: '+=12',
                  rotation: '+=1',
                  duration: 3.5,
                  yoyo: true,
                  repeat: -1,
                  ease: 'sine.inOut',
                  stagger: {
                    amount: 1.5,
                    from: 'random',
                  },
                });
              },
            });

            // 1. Open folder flap
            timeline.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 1.2,
              ease: 'power3.inOut',
            });

            // 2. Lift cards collectively
            timeline.to(
              cardsRef.current,
              {
                y: -140,
                scale: 0.9,
                zIndex: 70,
                duration: 0.6,
                stagger: 0.04,
                ease: 'back.out(1.2)',
              },
              '-=0.6'
            );

            // 3. Spread cards into a grid
            timeline.to(
              cardsRef.current,
              {
                x: (index) => {
                  const width =
                    Math.max(
                      ...cardsRef.current.map(
                        (card) => card?.offsetWidth || 0
                      )
                    ) || 360;

                  const gap = 40;
                  const { col } = getGridPos(index);

                  return (col - 1) * (width + gap);
                },
                y: (index) => {
                  const height =
                    Math.max(
                      ...cardsRef.current.map(
                        (card) => card?.offsetHeight || 0
                      )
                    ) || 240;

                  const gap = 40;
                  const { row } = getGridPos(index);

                  return (row - 1) * (height + gap);
                },
                rotation: () => gsap.utils.random(-3, 3),
                scale: 1,
                duration: 1.4,
                stagger: {
                  amount: 0.4,
                  from: 'center',
                },
                ease: 'expo.out',
              },
              '-=0.2'
            );
          }

          if (isMobile) {
            const cardWidth = window.innerWidth * 0.8;
            const gap = 20;

            mobileCardsRef.current.forEach((card, index) => {
              if (!card) return;

              gsap.set(card, {
                x: -(index * (cardWidth + gap)),
                y: 0,
                scale: 0.4,
                opacity: 0,
                rotation: gsap.utils.random(-15, 15),
              });
            });

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 60%',
              },
            });

            // 1. Open folder flap
            timeline.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 0.8,
              ease: 'power3.inOut',
            });

            // 2. Bring mobile cards upward
            timeline.to(
              mobileCardsRef.current,
              {
                y: -100,
                opacity: 1,
                scale: 0.85,
                duration: 0.6,
                stagger: 0.05,
                ease: 'back.out(1.2)',
              },
              '-=0.4'
            );

            // 3. Arrange mobile cards into swipe carousel
            timeline.to(
              mobileCardsRef.current,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: (index) => (index === 0 ? 1 : 0.92),
                opacity: (index) => (index === 0 ? 1 : 0.5),
                duration: 0.8,
                stagger: 0.08,
                ease: 'expo.out',
                onComplete: () => {
                  if (mobileCarouselRef.current) {
                    mobileCarouselRef.current.style.overflowX = 'auto';
                    mobileCarouselRef.current.style.pointerEvents = 'auto';
                  }
                },
              },
              '-=0.2'
            );
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#08050F] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none"
    >
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>

      {/* Ambient Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        <div className="relative w-0 h-0 transform-style-3d">
          {/* Folder Back */}
          <div
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#14111C] rounded-[24px] border border-purple-600/40 shadow-[0_20px_50px_rgba(139,92,246,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1D1729] rounded-t-xl border-t border-purple-600/30" />

            <div className="relative z-10 text-purple-400 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              PROJECT_ARCHIVE
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, index) => (
            <div
              key={index}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + index }}
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#14111C]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-purple-600 hover:shadow-[0_35px_80px_rgba(139,92,246,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-7 flex flex-col justify-between">
                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-purple-400 bg-purple-600/10 px-2.5 py-1 rounded border border-purple-600/20">
                    {project.episode}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-purple-400 font-bold">
                      {project.match} Match
                    </span>

                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">
                      HD
                    </span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-2 my-auto">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded border border-transparent group-hover:border-purple-600/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Purple Corner Accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-purple-600 group-hover:shadow-[0_0_15px_#8B5CF6] transition-all" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#211A2E] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-purple-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {projectsData.map((project, index) => (
          <div
            key={`mob-${index}`}
            ref={(element) => {
              mobileCardsRef.current[index] = element;
            }}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#14111C] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-purple-400 bg-purple-600/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>

                <span className="text-xs font-mono text-purple-400 font-bold">
                  {project.match} Match
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">
                  {project.title}
                </h3>

                <p className="text-xs text-white/70 font-light line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;