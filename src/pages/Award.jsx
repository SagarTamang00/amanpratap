import { useEffect, useRef, useState } from "react";
import { Award, Trophy, MapPin, Calendar, Sparkles } from "lucide-react";

/* ============================================================
 * Self-contained Awards section.
 * All styling lives in this file (inline <style> + inline styles)
 * so it does not depend on tailwind config or external CSS tokens.
 * ============================================================ */

const COLORS = {
  bg: "#FFFFFF",
  fg: "#1F4891",
  gold: "#c9a84c",
  goldSoft: "#e6d38e",
};

const FONT_DISPLAY = '"Bebas Neue", "Impact", sans-serif';
const FONT_BODY = '"EB Garamond", Georgia, serif';

const awardsData = [
  {
    year: "2024",
    title: "Best Director",
    festival: "Kathmandu International Mountain Film Festival",
    film: "Echoes of the Himalayas",
    location: "Kathmandu, Nepal",
    type: "Winner",
  },
  {
    year: "2024",
    title: "Special Jury Prize",
    festival: "South Asian Film Festival",
    film: "The Silent Valley",
    location: "Mumbai, India",
    type: "Winner",
  },
  {
    year: "2023",
    title: "Best Cinematography",
    festival: "Dharamshala International Film Festival",
    film: "Echoes of the Himalayas",
    location: "Dharamshala, India",
    type: "Winner",
  },
  {
    year: "2023",
    title: "Best Feature Film",
    festival: "Nepal Film Award",
    film: "The Silent Valley",
    location: "Kathmandu, Nepal",
    type: "Nominee",
  },
  {
    year: "2022",
    title: "Grand Jury Award",
    festival: "Busan International Film Festival",
    film: "Before the Monsoon",
    location: "Busan, South Korea",
    type: "Winner",
  },
  {
    year: "2021",
    title: "Best Short Film",
    festival: "DIFF — Durban International Film Festival",
    film: "Red Clay",
    location: "Durban, South Africa",
    type: "Winner",
  },
];

const styles = `
.awards-section {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: ${COLORS.bg};
  padding: 5rem 0;
  font-family: ${FONT_BODY};
  color: ${COLORS.fg};
}
@media (min-width: 640px) { .awards-section { padding: 7rem 0; } }
@media (min-width: 1024px) { .awards-section { padding: 8rem 0; } }

.awards-glow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 70%);
}
.awards-line {
  position: absolute; left: 0; right: 0; height: 1px; pointer-events: none;
  background: linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent);
}
.awards-line.top { top: 0; }
.awards-line.bottom { bottom: 0; opacity: 0.5; }

.awards-ghost {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  pointer-events: none; user-select: none; overflow: hidden;
}
.awards-ghost span {
  font-family: ${FONT_DISPLAY};
  font-weight: 900; text-transform: uppercase; line-height: 1;
  white-space: nowrap; letter-spacing: -0.02em;
  color: rgba(201,168,76,0.04);
  font-size: 28vw;
}
@media (min-width: 640px) { .awards-ghost span { font-size: 22vw; } }
@media (min-width: 1024px) { .awards-ghost span { font-size: 18vw; } }

.awards-container {
  position: relative; z-index: 10;
  max-width: 1280px; margin: 0 auto;
  padding: 0 1.25rem;
}
@media (min-width: 640px) { .awards-container { padding: 0 2.5rem; } }
@media (min-width: 1024px) { .awards-container { padding: 0 5rem; } }

.awards-header { margin-bottom: 3.5rem; }
@media (min-width: 640px) { .awards-header { margin-bottom: 5rem; } }

.awards-eyebrow {
  display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem;
}
.awards-eyebrow .bar {
  height: 1px; width: 2.5rem;
  background: linear-gradient(to right, transparent, ${COLORS.gold});
}
@media (min-width: 640px) { .awards-eyebrow .bar { width: 3.5rem; } }
.awards-eyebrow .label {
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.4em; color: ${COLORS.gold};
}

.awards-title-row {
  display: flex; flex-direction: column; gap: 2rem;
}
@media (min-width: 1024px) {
  .awards-title-row { flex-direction: row; align-items: flex-end; justify-content: space-between; }
}

.awards-title {
  font-family: ${FONT_DISPLAY};
  font-weight: 900; text-transform: uppercase;
  line-height: 0.9; letter-spacing: -0.01em;
  color: ${COLORS.fg};
  font-size: clamp(2.75rem, 9vw, 6rem);
  margin: 0;
}
.awards-title .accent {
  background: linear-gradient(to right, ${COLORS.gold}, ${COLORS.goldSoft});
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

.awards-stats { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 1.5rem; }
@media (min-width: 640px) { .awards-stats { gap: 2rem; } }
.awards-stat { display: flex; align-items: flex-end; gap: 0.5rem; }
.awards-stat .value {
  font-family: ${FONT_DISPLAY}; font-weight: 900; line-height: 1;
  font-size: clamp(2.5rem, 5vw, 4rem);
}
.awards-stat .label {
  padding-bottom: 0.5rem; font-size: 0.75rem;
  text-transform: uppercase; letter-spacing: 0.2em;
  color: rgba(245,240,232,0.3);
}
.awards-stat-divider {
  display: none; height: 3rem; width: 1px; background: rgba(201,168,76,0.2);
}
@media (min-width: 640px) { .awards-stat-divider { display: block; } }

.awards-rule {
  margin-top: 2.5rem; height: 1px;
  background: linear-gradient(to right, rgba(201,168,76,0.4), transparent);
  transition: width 1.2s ease 0.3s;
}

.awards-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }

.award-item { position: relative; }
.award-bg {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to right, rgba(201,168,76,0.06), rgba(201,168,76,0.02), transparent);
  transition: opacity 0.5s ease;
}
.award-accent {
  position: absolute; left: 0; top: 50%; height: 3rem; width: 2px;
  background: linear-gradient(to bottom, transparent, ${COLORS.gold}, transparent);
  pointer-events: none; transition: all 0.5s ease;
}

.award-row {
  position: relative;
  display: grid; grid-template-columns: 1fr; gap: 0.75rem;
  border-bottom: 1px solid rgba(201,168,76,0.1);
  padding: 1.5rem 1rem;
}
@media (min-width: 640px) {
  .award-row {
    grid-template-columns: 5rem 1fr;
    column-gap: 1.5rem;
    padding: 1.75rem 1rem;
  }
}
@media (min-width: 1024px) {
  .award-row {
    grid-template-columns: 5rem 7rem 1fr auto;
    column-gap: 2rem;
    align-items: center;
    padding: 2rem 1rem;
  }
}

.award-year {
  display: flex; align-items: center; gap: 0.5rem;
  color: rgba(201,168,76,0.6);
  transition: color 0.3s ease;
  font-family: ${FONT_DISPLAY};
  font-size: 0.875rem; font-weight: 700; letter-spacing: 0.15em;
}
.award-item:hover .award-year { color: ${COLORS.gold}; }

.award-badge {
  display: inline-flex; align-items: center; gap: 0.375rem;
  border: 1px solid rgba(201,168,76,0.4);
  border-radius: 9999px;
  padding: 0.25rem 0.625rem;
  font-size: 9px; text-transform: uppercase; letter-spacing: 0.3em;
  color: ${COLORS.gold};
  transition: all 0.3s ease;
}
.award-badge.nominee {
  border-color: rgba(245,240,232,0.15);
  color: rgba(245,240,232,0.4);
}

.award-title {
  font-family: ${FONT_DISPLAY};
  font-weight: 900; text-transform: uppercase;
  line-height: 1.1; letter-spacing: 0.02em;
  font-size: clamp(1.25rem, 2.4vw, 1.75rem);
  margin: 0;
  color: rgba(245,240,232,0.78);
  transition: color 0.3s ease;
}
.award-film {
  margin: 0; font-size: 0.875rem; font-style: italic;
  color: rgba(245,240,232,0.45);
  transition: color 0.3s ease;
}
.award-item:hover .award-film { color: rgba(245,240,232,0.7); }

.award-meta {
  display: flex; flex-direction: column; gap: 0.25rem;
  transition: all 0.5s ease;
}
@media (min-width: 1024px) { .award-meta { max-width: 20rem; text-align: right; } }
.award-festival {
  margin: 0; font-size: 0.75rem;
  text-transform: uppercase; letter-spacing: 0.2em;
  color: rgba(201,168,76,0.85);
}
.award-location {
  margin: 0; font-size: 0.75rem;
  color: rgba(245,240,232,0.4);
  display: flex; align-items: center; gap: 0.375rem;
}
@media (min-width: 1024px) { .award-location { justify-content: flex-end; } }

.year-cal-icon { display: inline; }
@media (min-width: 640px) { .year-cal-icon { display: none; } }

.awards-footer {
  margin-top: 3rem; padding-top: 1.5rem;
  border-top: 1px solid rgba(201,168,76,0.1);
  display: flex; flex-direction: column; align-items: flex-start;
  justify-content: space-between; gap: 1rem;
}
@media (min-width: 640px) {
  .awards-footer { margin-top: 4rem; flex-direction: row; align-items: center; }
}
.awards-footer p {
  margin: 0; font-size: 10px;
  text-transform: uppercase; letter-spacing: 0.3em;
  color: rgba(245,240,232,0.25);
}
.awards-footer .sig { display: flex; align-items: center; gap: 0.75rem; }
.awards-footer .sig .bar { height: 1px; width: 2rem; background: rgba(201,168,76,0.3); }
`;

const Awards = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setRevealedCount(count);
            if (count >= awardsData.length) clearInterval(interval);
          }, 140);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  const winners = awardsData.filter((a) => a.type === "Winner").length;

  return (
    <section ref={sectionRef} id="awards" className="awards-section">
      <style>{styles}</style>

      <div className="awards-glow" />
      <div className="awards-line top" />
      <div className="awards-line bottom" />

      <div className="awards-ghost">
        <span>Honours</span>
      </div>

      <div className="awards-container">
        {/* Header */}
        <div
          className="awards-header"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease",
          }}
        >
          <div className="awards-eyebrow">
            <div className="bar" />
            <Sparkles size={14} color={COLORS.gold} strokeWidth={1.5} />
            <span className="label">Recognition</span>
          </div>

          <div className="awards-title-row">
            <h2 className="awards-title">
              Awards &amp; <span className="accent">Honours</span>
            </h2>

            <div className="awards-stats">
              <div className="awards-stat">
                <span className="value" style={{ color: COLORS.gold }}>
                  {String(revealedCount).padStart(2, "0")}
                </span>
                <span className="label">
                  / {String(awardsData.length).padStart(2, "0")} Total
                </span>
              </div>
              <div className="awards-stat-divider" />
              <div className="awards-stat">
                <span className="value" style={{ color: "rgba(245,240,232,0.85)" }}>
                  {String(winners).padStart(2, "0")}
                </span>
                <span className="label">Wins</span>
              </div>
            </div>
          </div>

          <div
            className="awards-rule"
            style={{ width: isVisible ? "100%" : "0%" }}
          />
        </div>

        {/* List */}
        <ul className="awards-list">
          {awardsData.map((award, i) => {
            const isActive = activeIndex === i;
            const isWinner = award.type === "Winner";
            return (
              <li
                key={`${award.year}-${award.title}-${i}`}
                className="award-item"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
                style={{
                  opacity: i < revealedCount ? 1 : 0,
                  transform:
                    i < revealedCount ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`,
                }}
              >
                <div className="award-bg" style={{ opacity: isActive ? 1 : 0 }} />
                <div
                  className="award-accent"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: `translateY(-50%) scaleY(${isActive ? 1 : 0.4})`,
                  }}
                />

                <div className="award-row">
                  <div className="award-year">
                    <span className="year-cal-icon">
                      <Calendar size={14} strokeWidth={1.5} />
                    </span>
                    <span>{award.year}</span>
                  </div>

                  <div>
                    <span
                      className={`award-badge ${isWinner ? "" : "nominee"}`}
                      style={{
                        background:
                          isActive && isWinner
                            ? "rgba(201,168,76,0.1)"
                            : "transparent",
                      }}
                    >
                      {isWinner ? (
                        <Trophy size={10} strokeWidth={2} />
                      ) : (
                        <Award size={10} strokeWidth={2} />
                      )}
                      {award.type}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <h3
                      className="award-title"
                      style={{
                        color: isActive ? COLORS.fg : "rgba(245,240,232,0.78)",
                      }}
                    >
                      {award.title}
                    </h3>
                    <p className="award-film">{award.film}</p>
                  </div>

                  <div
                    className="award-meta"
                    style={{
                      opacity: isActive ? 1 : 0.55,
                      transform: `translateX(${isActive ? 0 : 6}px)`,
                    }}
                  >
                    <p className="award-festival">{award.festival}</p>
                    <p className="award-location">
                      <MapPin size={12} strokeWidth={1.5} />
                      {award.location}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div
          className="awards-footer"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s ease 1s",
          }}
        >
          <p>International Recognition · 2021 — Present</p>
          <div className="sig">
            <div className="bar" />
            <p>Aman Pratap Adhikary</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;