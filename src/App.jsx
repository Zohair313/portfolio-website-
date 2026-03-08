import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import './App.css';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Email Animation State
  const [showMailAnimation, setShowMailAnimation] = useState(false);
  const [mailAnimationOpen, setMailAnimationOpen] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    setShowMailAnimation(true);

    setTimeout(() => {
      setMailAnimationOpen(true);
    }, 100);

    setTimeout(() => {
      window.location.href = "mailto:zohairhussain.tms@gmai.dev";
      setMailAnimationOpen(false);
      setShowMailAnimation(false);
    }, 2000);
  };

  // Smooth spring physics for the custom cursor
  const cursorX = useSpring(0, { stiffness: 2000, damping: 60 });
  const cursorY = useSpring(0, { stiffness: 2000, damping: 60 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Vanta JS Animation Setup
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.TRUNK({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x39787A,
          chaos: 3.50,
          backgroundColor: 0x0 /* transparent backgroud to blend */
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Project Row component
  const ProjectRow = ({ title, role, description, year, link, tags }) => (
    <div
      className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-8 md:py-12 border-b border-[var(--border-color)] items-start transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="md:col-span-1 text-[var(--text-muted)] text-sm font-medium pt-1">
        {year}
      </div>
      <div className="md:col-span-3">
        <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-main)] mb-1 group-hover:pl-2 transition-all duration-300">{title}</h3>
        <p className="text-sm text-[var(--text-muted)] group-hover:pl-2 transition-all duration-300">{role}</p>
      </div>
      <div className="md:col-span-5 text-[var(--text-muted)] text-lg font-light leading-relaxed pr-8">
        {description}
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="px-3 py-1 bg-white/10 text-xs rounded-full text-[var(--text-main)] border border-white/5 backdrop-blur-sm">{t}</span>
          ))}
        </div>
      </div>
      <div className="md:col-span-3 flex md:justify-end mt-4 md:mt-0">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-color)] text-[var(--text-main)] hover:bg-white hover:text-black transition-all duration-300"
        >
          <span className="text-sm font-medium">View Project</span>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-main)] font-sans antialiased pb-32 overflow-x-hidden">

      {/* Sleek Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full pointer-events-none z-50 hidden md:block mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 2 : 1,
          opacity: isHovered ? 0.8 : 1
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 }, opacity: { duration: 0.2 } }}
      />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center py-6 md:py-10 px-6 md:px-24 z-20">
        <div className="font-semibold text-xl tracking-tight text-white">Zohair-Hussain</div>
        <div className="flex gap-4 sm:gap-10 text-sm font-medium text-white/90">
          <a href="#work" className="hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Work</a>
          <a href="#about" className="hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About</a>
          <a href="#contact" className="hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact</a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="w-full">

        {/* Hero Section */}
        <section
          id="hero-section"
          className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center md:justify-between overflow-hidden px-6 md:px-24 pt-28 md:pt-0"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}img.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-black/60 -z-10"></div>

          <motion.div
            className="max-w-4xl relative z-10 w-full md:w-3/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="plus-jakarta-sans font-bold tracking-tighter mb-8 max-w-4xl">
              {/* Line 1: Primary Role */}
              <span className="block text-white text-[40px] md:text-[65px] lg:text-[85px] leading-[0.95]">
                Junior MERN Stack
              </span>

              {/* Line 2: The Core Skill */}
              <span className="block text-white text-[40px] md:text-[65px] lg:text-[85px] leading-[0.95] mb-4">
                Developer
              </span>

              {/* Line 3: The Sub-text (Secondary Focus) */}
              <span className="block text-white/40 text-[26px] sm:text-[30px] md:text-[50px] lg:text-[70px] leading-[1]">
                Scalable Web Architectures.
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl mb-12">
              Focused on building high-availability backends and seamless full-stack interfaces. Transforming complex business logic into efficient, scalable digital solutions using MERN and .NET.            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#work"
                className="px-8 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-xl text-sm"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                View Selected Work
              </a>
              <div className="flex gap-3">
                <a href="https://github.com/Zohair313" target="_blank" className="p-2.5 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md text-white">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/zohair-hussain-b4a92a370" target="_blank" className="p-2.5 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md text-white">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Vanta Animation Container */}
          <div
            ref={vantaRef}
            className="absolute top-1/2 right-[-20%] -translate-y-1/2 z-0 w-[110vw] h-[80vh] md:right-[-10%] md:w-[65vw] md:h-[120vh] opacity-30 md:opacity-100 mix-blend-screen pointer-events-none"
          ></div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Selected Work */}
          <section id="work" className="mb-40 scroll-mt-32 pt-20 relative">

            {/* Section Number */}
            <div className="mb-20 space-y-4">
              {/* Section Tag - Chota aur Fade rakha hai */}
              <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[var(--text-muted)] opacity-40">
                01 / Selected Work
              </h2>

              {/* Description - Isko bada aur impactful kiya hai */}
              <p className="text-xl md:text-3xl lg:text-4xl text-white/90 font-light leading-[1.3] max-w-4xl plus-jakarta-sans tracking-tight">
                From architectural design to live deployment. These
                <span className="text-white font-semibold italic"> systems are fully operational, </span>
                demonstrating high-performance backend logic.
              </p>
            </div>
            <div className="border-t border-[var(--border-color)]">
              <ProjectRow
                year="2026"
                title="Training Mania Mastery"
                role="MERN Stack Developer Trainee"
                company="Techmire Solutions"
                description="Engineered a series of end-to-end web applications focusing on RESTful API design and scalable database schemas. Mastered the MERN ecosystem through hands-on projects, implementing secure authentication, modern state management, and an automated SMTP mail engine for real-time alerts. Developed an AI-powered chatbot capable of context-aware responses based on user-provided PDF content."
                tags={["React", "tailwindCSS", "SQL", "Node.js"]}
                link="https://zohair313.github.io/TrainingMania-/"
              />
              <ProjectRow
                year="2025"
                title="Smart Campus Management System"
                role="Full Stack Developer"
                description="Smart Campus Management System is a web-based application built to digitize campus operations through dedicated Student and Admin portals. Students can access profiles, courses, and announcements, while administrators manage student records and academic data via a centralized dashboard, improving communication and operational efficiency across the campus."
                tags={["HTML", "CSS", "Python", "Django", "Javascript"]}
                link="https://zohair313.github.io/tms-portal-for-student-admin/"
              />
              <ProjectRow
                year="2025"
                title="DHM — Hosting Infrastructure Suite"
                role="Full-Stack Developer"
                description="Developed a unified management ecosystem to eliminate fragmented infrastructure tracking. Architected a centralized dashboard to synchronize multi-provider domain and hosting assets, featuring automated SMTP expiry alerts and service lifecycle monitoring."
                tags={["HTML", "TailwindCSS", "JavaScript", "SMTP"]}
                link="https://zohair313.github.io/DHM-V2/"
              />
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mb-40 scroll-mt-32 relative">

            <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)] relative z-10 mb-12">02 / About</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              <div className="text-2xl md:text-4xl font-medium tracking-tight leading-snug">
                Engineering robust solutions with unwavering consistency. I believe in rapid execution and delivering scalable architectures that meet deadlines without compromising on quality.              </div>

              <div className="text-lg text-[var(--text-muted)] font-light leading-relaxed space-y-6">
                <p>
                  My journey into engineering started with a simple goal: <span className="text-white">automating the repetitive</span>.
                  Today, that has evolved into a career focused on full-stack development, bridging the gap between
                  heavy-duty backends and pristine user interfaces.</p>
                <p>
                  Currently, I am refining my expertise in <span className="text-white">distributed systems</span> at Teknoloje Solutions,
                  ensuring every line of code is built to scale while keeping the user experience seamless and high-performing.
                </p>

                <div className="pt-8">
                  <h3 className="text-white font-semibold mb-4">Core Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'tailwindCSS', 'React', 'Node.js', 'express.js', 'mongodb', 'Angular', 'Next.js', 'SQL Server', 'ASP.Net Core', 'Git', 'GitHub'].map(skill => (
                      <span key={skill} className="px-4 py-2 bg-white/10 text-white border border-white/5 rounded-md text-sm font-medium backdrop-blur-sm">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="scroll-mt-32 border-t border-[var(--border-color)] pt-32 relative">

            <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tighter mb-8 px-4">Let's build something together.</h2>
              <p className="text-lg sm:text-xl text-[var(--text-muted)] font-light mb-12 px-4">
                Feel free to reach out for collaborations, new opportunities, or just to say hello.
              </p>
              <a
                href="mailto:zohairhussain.tms@gmai.dev"
                onClick={handleEmailClick}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Mail size={20} />
                @zohair.dev
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Email Modal Overlay */}
      {showMailAnimation && (
        <div className={`email-modal-overlay ${showMailAnimation ? 'visible' : ''}`}>
          <div className={`letter-image ${mailAnimationOpen ? 'is-open' : ''}`}>
            <div className="animated-mail">
              <div className="back-fold"></div>
              <div className="letter">
                <div className="letter-border"></div>
                <div className="letter-title"></div>
                <div className="letter-context"></div>
                <div className="letter-stamp">
                  <div className="letter-stamp-inner"></div>
                </div>
              </div>
              <div className="top-fold"></div>
              <div className="body"></div>
              <div className="left-fold"></div>
            </div>
            <div className="shadow"></div>
          </div>
        </div>
      )}

    </div>
  );
}
