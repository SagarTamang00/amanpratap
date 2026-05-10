import React, { useEffect, useState, useRef } from 'react';

const FILMS = [
  { year: '2021', title: 'Maato Manche', role: 'Director' },
  { year: '2022', title: 'Paral', role: 'Writer / Director' },
  { year: '2023', title: 'Antim Yatra', role: 'Director' },
  { year: '2024', title: 'Bhrikuti', role: 'Director / Producer' },
];

const QUOTE = '"Cinema is not a mirror. It is a hammer."';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Jagged line animation
  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    const styleId = 'jagged-line-anim';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes jaggedFlow {
          0%   { stroke-dashoffset: ${len}; }
          100% { stroke-dashoffset: ${-len}; }
        }
        @keyframes filmRow {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .jagged-animated {
          stroke-dasharray: ${len * 0.45} ${len * 0.55};
          animation: jaggedFlow 6s linear infinite;
        }
        .jagged-glow {
          stroke-dasharray: ${len * 0.45} ${len * 0.55};
          animation: jaggedFlow 6s linear infinite;
        }
        .film-row-enter {
          opacity: 0;
          animation: filmRow 0.5s ease forwards;
        }
      `;
      document.head.appendChild(style);
    }
    pathRef.current.classList.add('jagged-animated');
    if (glowRef.current) glowRef.current.classList.add('jagged-glow');
  }, []);

  return (
    <>
      <section
        className="relative w-full h-screen overflow-hidden bg-transparent"
      >
{/* ── LEFT: Name block ── */}
<div className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none mt-12 md:mt-0">
  <div className="pointer-events-auto pl-4 sm:pl-10 lg:pl-28">

    {/* Name */}
    <h1
      className="leading-[0.83] flex flex-col font-black uppercase mb-3 md:mb-5 w-fit"
style={{
  fontFamily: '"Outfit", sans-serif',
  fontSize: 'clamp(2.5rem,8vw,9.5rem)',
}}
    >
      {/* AMAN PRATAP — added mb-2 md:mb-4 for gap */}
      <div className="flex flex-wrap md:flex-nowrap gap-x-[0.2em] gap-y-[0.1em] drop-shadow-xl mb-2 md:mb-4">
        <span
          className={`animate__animated ${isLoaded ? 'animate__bounceInLeft' : 'opacity-0'} block`}
          style={{ color: 'var(--color-text,#22D3EE)', animationDelay: '0.3s' }}
          data-cursor="large"
        >
          Aman
        </span>
        <span
          className={`animate__animated ${isLoaded ? 'animate__bounceInRight' : 'opacity-0'} block`}
          style={{ color: 'var(--color-text,#22D3EE)', animationDelay: '0.5s' }}
          data-cursor="large"
        >
          Pratap
        </span>
      </div>

<div style={{ opacity: 0.72 }}>
  <span
    className={`animate__animated ${
      isLoaded ? 'animate__bounceInUp' : 'opacity-0'
    } block`}
    style={{
      color: 'transparent',
      WebkitTextStroke: '2px var(--color-text,#22D3EE)',
      letterSpacing: '0.04em',
      animationDelay: '0.7s',
    }}
    data-cursor="large"
  >
    Adhikary
  </span>
</div>
    </h1>

    {/* Arrow + subtitle */}
    <div
      className={`flex items-center gap-2 md:gap-4 mt-6 md:mt-8 animate__animated ${isLoaded ? 'animate__fadeInUp' : 'opacity-0'}`}
      style={{ animationDelay: '0.9s' }}
    >
      <svg width="24" height="8" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse shrink-0 md:w-9 md:h-3">
        <path d="M0 6H38M38 6L33 1M38 6L33 11"
          stroke="var(--color-accent,#A855F7)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h2
        className="text-[0.65rem] sm:text-xs md:text-base uppercase font-semibold tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em]"
        style={{ color: 'var(--color-accent,#A855F7)', fontFamily: '"League Spartan", sans-serif' }}
      >
        Nepali Film Director
      </h2>
    </div>

    {/* Gold rule */}
    <div
      className={`h-px mt-4 md:mt-6 mb-6 transition-all duration-1000 ease-out delay-700 ${isLoaded ? 'opacity-100 w-24 md:w-40' : 'opacity-0 w-0'}`}
      style={{ background: 'linear-gradient(to right, var(--color-accent,#A855F7), transparent)' }}
    />

  </div>
</div>



        {/* ── Scroll hint ── */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 animate__animated ${isLoaded ? 'animate__fadeInUp' : 'opacity-0'}`}
          style={{ animationDelay: '1.4s' }}
        >
          <span
            className="text-[0.48rem] uppercase tracking-[0.4em]"
            style={{ color: 'var(--color-accent,#C084FC)', fontFamily: 'var(--font-heading,sans-serif)' }}
          >
            Scroll
          </span>
          <div
            className="w-px h-9 animate-pulse"
            style={{ background: 'linear-gradient(to bottom, var(--color-accent,#C084FC), transparent)' }}
          />
        </div>

      </section>
    </>
  );
};

export default Hero;