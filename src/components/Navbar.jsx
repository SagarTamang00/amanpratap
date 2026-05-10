import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Me", path: "/about" },
  { label: "News & Blogs", path: "/news" },
  { label: "Contact Me", path: "/contact" },
];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen
      ? "hidden"
      : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-500 ${
          scrolled
            ? "shadow-[0_2px_20px_rgba(27,42,74,0.09)] py-5"
            : "shadow-none py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="text-3xl lg:text-4xl font-black tracking-tight"
            style={{ color: "var(--color-heading)" }}
          >
            Aman
            <span style={{ color: "var(--color-accent)" }}>
              Pratap
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14">
            {NAV_LINKS.map((item) => {
              const isActive =
                location.pathname === item.path;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="relative text-base lg:text-lg font-semibold group"
                  style={{
                    color: isActive
                      ? "var(--color-accent)"
                      : "var(--color-heading)",
                  }}
                >
                  {item.label}

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                    style={{
                      backgroundColor:
                        "var(--color-accent-light)",
                    }}
                  />
                </Link>
              );
            })}
          </nav>


          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center"
          >
            <span
              className={`h-0.5 rounded transition-all ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-2"
                  : ""
              }`}
              style={{
                backgroundColor:
                  "var(--color-heading)",
              }}
            />

            <span
              className={`h-0.5 rounded transition-all ${
                isMobileMenuOpen
                  ? "opacity-0"
                  : "opacity-100"
              }`}
              style={{
                backgroundColor:
                  "var(--color-heading)",
              }}
            />

            <span
              className={`h-0.5 rounded transition-all ${
                isMobileMenuOpen
                  ? "-rotate-45 -translate-y-2"
                  : ""
              }`}
              style={{
                backgroundColor:
                  "var(--color-heading)",
              }}
            />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "var(--color-heading)",
        }}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((item, index) => {
            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className="text-l font-bold uppercase tracking-widest"
                style={{
                  color: isActive
                    ? "var(--color-accent-light)"
                    : "white",
                  transitionDelay: `${index * 0.08}s`,
                }}
              >
                {item.label}
              </Link>
            );
          })}

        </nav>
      </div>
    </>
  );
};

export default Navbar;