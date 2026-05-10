import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    level: "Chapter I — Schooling",
    title: "Secondary Education",
    school: "XYZ Secondary School",
    year: "2008 – 2020",
    meta: { label: "GPA", value: "3.8" },
    description:
      "Foundation years mastering core disciplines — science, mathematics, and humanities.",
    bg: "/xavier.jpg",
  },
  {
    level: "Chapter II — Higher Secondary",
    title: "+2 Science / Arts",
    school: "ABC Higher Secondary",
    year: "2020 – 2022",
    meta: { label: "Stream", value: "Management" },
    description:
      "The turning point — where storytelling met technical curiosity.",
    bg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
  },
  {
    level: "Chapter III — Bachelor's",
    title: "Bachelor of Arts in Film",
    school: "Tribhuvan University",
    year: "2022 – 2026",
    meta: { label: "Honours", value: "Distinction" },
    description:
      "Where vision met craft through cinematic theory and production.",
    bg: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200",
  },
];

const MetaItem = ({ label, value }) => (
  <div className="flex flex-col min-w-0">
    <p className="text-[#b89d64] text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold mb-1">
      {label}
    </p>
    <p className="text-white text-xs sm:text-sm font-medium break-words">
      {value}
    </p>
  </div>
);

const Academic = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".edu-card");

      // ✅ INITIAL STATE: Use autoAlpha (opacity + visibility) and pointerEvents to kill "black bleed"
      gsap.set(cards, {
        yPercent: 35,
        autoAlpha: 0,
        scale: 0.92,
        pointerEvents: "none",
      });

      // ✅ First card must be visible immediately
      gsap.set(cards[0], {
        yPercent: 0,
        autoAlpha: 1,
        scale: 1,
        pointerEvents: "auto",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".stack-wrapper",
          start: "top top",
          end: `+=${cards.length * 120}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const prevCard = cards[index - 1];

        // Current card enters: Fade in and enable interactions
        tl.to(
          card,
          {
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            pointerEvents: "auto",
            duration: 1,
            ease: "power2.out",
          },
          index
        );

        // Previous card shrinks underneath and becomes non-interactive
        tl.to(
          prevCard,
          {
            scale: 0.94,
            filter: "brightness(0.55)",
            pointerEvents: "none",
            duration: 1,
            ease: "power2.out",
          },
          index
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#f5f1ea]"
      style={{ isolation: "isolate" }}
    >
      {/* HEADER */}
      <div
        ref={headerRef}
        className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-20"
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-neutral-500 mb-4 font-medium">
            Portfolio
          </p>
          <h2
            className="font-black text-[#1F4891] leading-tight"
            style={{ fontSize: "clamp(32px, 7vw, 72px)" }}
          >
            Academic <span className="text-[#b89d64]">Journey</span>
          </h2>
          <p className="mt-5 text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
            Scroll ↓
          </p>
        </div>
      </div>

      {/* STACK WRAPPER */}
      <div className="stack-wrapper relative h-screen overflow-hidden">
        {educationData.map((item, index) => (
          <div
            key={index}
            className="edu-card absolute inset-0 flex items-center justify-center px-4 sm:px-6"
            style={{ zIndex: educationData.length - index }}
          >
            <div
              className="w-full max-w-5xl will-change-transform"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              {/* CARD */}
              <div className="card-shell overflow-hidden rounded-[2rem] border border-[#b89d64]/20 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">

                {/* IMAGE */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "clamp(220px, 34vw, 360px)" }}
                >
                  <div
                    className="absolute inset-0 scale-105"
                    style={{
                      backgroundImage: `
                        linear-gradient(
                          to bottom,
                          transparent 50%,
                          rgba(0,0,0,0.6) 100%
                        ),
                        url(${item.bg})
                      `,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* cinematic vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.35)_100%)]" />
                  {/* ✅ Removed the h-32 solid black bleed div */}
                </div>

                {/* BODY */}
                <div className="card-content bg-[#111111] p-6 sm:p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:justify-between gap-8">

                    {/* LEFT */}
                    <div className="flex-1">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#b89d64] mb-3 font-semibold">
                        {item.level}
                      </p>
                      <h2
                        className="font-black text-white leading-tight mb-5"
                        style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
                      >
                        {item.title}
                      </h2>
                      <div className="w-16 h-[2px] bg-[#b89d64] mb-5" />
                      <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-row md:flex-col gap-6 md:min-w-[180px]">
                      <MetaItem label="Institution" value={item.school} />
                      <MetaItem label="Year" value={item.year} />
                      <MetaItem label={item.meta.label} value={item.meta.value} />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Academic;