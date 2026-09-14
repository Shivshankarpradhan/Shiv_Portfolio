import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const directions = {
      up: { y: 70, x: 0 },
      down: { y: -70, x: 0 },
      left: { y: 0, x: -70 },
      right: { y: 0, x: 70 },
    };

    const initialPosition = directions[direction] || directions.up;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: initialPosition.y,
          x: initialPosition.x,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [delay, direction]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;