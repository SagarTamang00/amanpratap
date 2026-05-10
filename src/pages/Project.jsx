import React, { useEffect, useState, useRef } from 'react';

const projects = [
    {
        id: 1,
        title: 'Echoes of the Himalayas',
        category: 'Feature Film',
        year: '2024',
        duration: '1h 42min',
        preview: 'https://www.w3schools.com/html/mov_bbb.mp4', // replace with your video
        youtube: 'dQw4w9WgXcQ', // replace with your YouTube ID
    },
    {
        id: 2,
        title: 'The Silent Valley',
        category: 'Short Film',
        year: '2023',
        duration: '24min',
        preview: 'https://www.w3schools.com/html/movie.mp4', // replace with your video
        youtube: 'dQw4w9WgXcQ',
    },
    {
        id: 3,
        title: 'Before the Monsoon',
        category: 'Documentary',
        year: '2023',
        duration: '58min',
        preview: 'https://www.w3schools.com/html/mov_bbb.mp4',
        youtube: 'dQw4w9WgXcQ',
    },
    {
        id: 4,
        title: 'Red Clay',
        category: 'Short Film',
        year: '2022',
        duration: '18min',
        preview: 'https://www.w3schools.com/html/movie.mp4',
        youtube: 'dQw4w9WgXcQ',
    },
    {
        id: 5,
        title: 'Dust & Light',
        category: 'Commercial',
        year: '2022',
        duration: '3min',
        preview: 'https://www.w3schools.com/html/mov_bbb.mp4',
        youtube: 'dQw4w9WgXcQ',
    },
];

// Split into rows: alternating [2, 1, 2, 1...] or [1, 2, 1, 2...]
const buildRows = (items) => {
    const rows = [];
    let i = 0;
    let bigFirst = true;
    while (i < items.length) {
        if (bigFirst) {
            rows.push({ type: 'double', items: items.slice(i, i + 2) });
            i += 2;
        } else {
            rows.push({ type: 'single', items: items.slice(i, i + 1) });
            i += 1;
        }
        bigFirst = !bigFirst;
    }
    return rows;
};

const VideoCard = ({ project, onOpen, isDouble }) => {
    const videoRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, []);

    return (
        <div
            className={`relative group cursor-pointer overflow-hidden w-full ${isDouble ? 'md:flex-1 aspect-video md:aspect-video' : 'md:w-full aspect-video md:aspect-21/9'
                }`}
            style={{
                borderRadius: '16px',
                background: 'transparent',
                border: '1px solid rgba(201,168,76,0.12)',
                boxShadow: hovered
                    ? '0 24px 64px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.08)'
                    : '0 8px 32px rgba(0,0,0,0.5)',
                transition: 'box-shadow 0.5s ease, transform 0.5s ease',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onOpen(project)}
            data-cursor="large"
        >
            {/* Autoplay muted video */}
            <video
                ref={videoRef}
                src={project.preview}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                style={{
                    transform: hovered ? 'scale(1.04)' : 'scale(1)',
                    filter: hovered ? 'brightness(0.7) grayscale(10%)' : 'brightness(0.6) grayscale(10%)',
                    transition: 'transform 0.7s ease, filter 0.5s ease',
                }}
            />

            {/* Gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to top, rgba(9,8,6,0.7) 0%, rgba(9,8,6,0.2) 50%, transparent 100%)',
                    borderRadius: '16px',
                }}
            />

            {/* Corner accents */}
            <div
                className="absolute top-4 left-4 w-5 h-5 pointer-events-none transition-opacity duration-300 hidden sm:block"
                style={{
                    borderTop: '1px solid rgba(201,168,76,0.6)',
                    borderLeft: '1px solid rgba(201,168,76,0.6)',
                    opacity: hovered ? 1 : 0.3,
                }}
            />
            <div
                className="absolute bottom-4 right-4 w-5 h-5 pointer-events-none transition-opacity duration-300 hidden sm:block"
                style={{
                    borderBottom: '1px solid rgba(201,168,76,0.6)',
                    borderRight: '1px solid rgba(201,168,76,0.6)',
                    opacity: hovered ? 1 : 0.3,
                }}
            />

            {/* Category badge */}
            <div className="absolute top-4 sm:top-5 right-4 sm:right-5">
                <span
                    className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] px-2 sm:px-3 py-1"
                    style={{
                        background: 'rgba(9,8,6,0.7)',
                        border: '1px solid rgba(201,168,76,0.25)',
                        color: '#c9a84c',
                        fontFamily: 'var(--font-body, "EB Garamond", serif)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: '2px',
                    }}
                >
                    {project.category}
                </span>
            </div>

            {/* Play button — appears on hover */}
            <div
                className="absolute inset-0 items-center justify-center pointer-events-none transition-all duration-400 hidden sm:flex"
                style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.85)' }}
            >
                <div
                    className="flex items-center justify-center"
                    style={{
                        width: '64px',
                        height: '64px',
                        border: '1px solid rgba(201,168,76,0.7)',
                        borderRadius: '50%',
                        background: 'rgba(9,8,6,0.5)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <div
                        style={{
                            width: 0,
                            height: 0,
                            borderTop: '10px solid transparent',
                            borderBottom: '10px solid transparent',
                            borderLeft: '18px solid #c9a84c',
                            marginLeft: '4px',
                        }}
                    />
                </div>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                        <p
                            className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] mb-1 sm:mb-2"
                            style={{ color: 'rgba(201,168,76,0.6)', fontFamily: 'var(--font-body, "EB Garamond", serif)' }}
                        >
                            {project.year} · {project.duration}
                        </p>
                        <h3
                            className="font-black uppercase leading-none"
                            style={{
                                fontFamily: 'var(--font-heading, "Bebas Neue", "Impact", sans-serif)',
                                fontSize: isDouble ? 'clamp(20px, 3vw, 34px)' : 'clamp(24px, 4vw, 48px)',
                                color: '#f5f0e8',
                                letterSpacing: '0.02em',
                            }}
                        >
                            {project.title}
                        </h3>
                    </div>

                    {/* Watch on YouTube hint */}
                    <div
                        className="flex items-center gap-2 transition-all duration-300"
                        style={{ opacity: hovered ? 1 : 0.7, transform: hovered ? 'translateY(0)' : 'translateY(0)' }}
                    >
                        <span
                            className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em]"
                            style={{ color: '#c9a84c', fontFamily: 'var(--font-body, "EB Garamond", serif)' }}
                        >
                            Watch
                        </span>
                        <div className="h-px w-4 sm:w-6" style={{ background: '#c9a84c', opacity: 0.6 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// YouTube Modal
const YoutubeModal = ({ project, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 flex flex-col items-center justify-center z-50 p-4 sm:p-8"
            style={{ background: 'rgb(43 43 43 / 96%)', backdropFilter: 'blur(12px)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full flex flex-col"
                style={{ maxWidth: '1000px' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header Row: Info & Close */}
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span
                            className="text-[9px] uppercase tracking-[0.4em] px-3 py-1 w-max"
                            style={{
                                border: '1px solid rgba(201,168,76,0.3)',
                                color: '#c9a84c',
                                fontFamily: 'var(--font-body, "EB Garamond", serif)',
                                borderRadius: '2px',
                            }}
                        >
                            {project.category}
                        </span>
                        <h2
                            className="font-black uppercase leading-none"
                            style={{
                                fontFamily: 'var(--font-heading, "Bebas Neue", "Impact", sans-serif)',
                                fontSize: 'clamp(20px, 4vw, 28px)',
                                color: '#f5f0e8',
                                letterSpacing: '0.05em',
                            }}
                        >
                            {project.title}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 shrink-0 group pt-1"
                        data-cursor="large"
                    >
                        <span
                            className="hidden sm:inline text-[10px] uppercase tracking-[0.35em] transition-colors duration-300"
                            style={{ color: 'rgba(245,240,232,0.4)', fontFamily: 'var(--font-body, "EB Garamond", serif)' }}
                        >
                            Close
                        </span>
                        <div
                            className="transition-colors duration-300 group-hover:text-[#c9a84c]"
                            style={{ color: 'rgba(245,240,232,0.4)', fontSize: '20px', lineHeight: 1 }}
                        >
                            ✕
                        </div>
                    </button>
                </div>

                {/* YouTube iframe */}
                <div
                    className="relative w-full overflow-hidden"
                    style={{
                        aspectRatio: '16/9',
                        borderRadius: '12px',
                        border: '1px solid rgba(201,168,76,0.15)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.9)',
                    }}
                >
                    <iframe
                        src={`https://www.youtube.com/embed/${project.youtube}?autoplay=1&rel=0&modestbranding=1`}
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};


const Projects = () => {
    const [activeProject, setActiveProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const rows = buildRows(projects);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    return (
        <>
            <section
                ref={sectionRef}
                id="projects"
                className="relative w-full min-h-screen bg-(--color-bg,#1F4959) py-24 overflow-hidden"
            >
                {/* Ambient */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
                    }}
                />

                <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10">

                    {/* Header */}
                    <div
                        className="mb-16"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                            transition: 'all 0.9s ease',
                        }}
                    >
                        <div className="flex items-center gap-4 mb-5">
                            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #c9a84c)' }} />
                            <span
                                className="text-[10px] uppercase tracking-[0.4em]"
                                style={{ color: '#c9a84c', fontFamily: 'var(--font-body, "EB Garamond", serif)' }}
                            >
                                Selected Works
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <h2
                                className="font-black uppercase leading-none"
                                style={{
                                    fontFamily: 'var(--font-heading, "Bebas Neue", "Impact", sans-serif)',
                                    fontSize: 'clamp(48px, 9vw, 96px)',
                                    color: '#f5f0e8',
                                }}
                            >
                                The{' '}
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: 'linear-gradient(to right, #c9a84c, #e6d38e)' }}
                                >
                                    Movies
                                </span>
                            </h2>
                            <p
                                className="text-sm pb-2"
                                style={{
                                    color: 'rgba(245,240,232,0.35)',
                                    fontFamily: 'var(--font-body, "EB Garamond", serif)',
                                    fontStyle: 'italic',
                                }}
                            >
                                Click any film to watch on YouTube
                            </p>
                        </div>

                        <div
                            className="mt-8 h-px"
                            style={{
                                background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)',
                                width: isVisible ? '100%' : '0%',
                                transition: 'width 1.2s ease 0.3s',
                            }}
                        />
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-5">
                        {rows.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="flex flex-col md:flex-row gap-5"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                    transition: `opacity 0.7s ease ${0.2 + rowIndex * 0.15}s, transform 0.7s ease ${0.2 + rowIndex * 0.15}s`,
                                }}
                            >
                                {row.items.map((project) => (
                                    <VideoCard
                                        key={project.id}
                                        project={project}
                                        onOpen={setActiveProject}
                                        isDouble={row.type === 'double'}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {activeProject && (
                <YoutubeModal
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                />
            )}
        </>
    );
};

export default Projects;