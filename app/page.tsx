"use client";

import { Button } from "@nextui-org/button";
import {
  GithubIcon,
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/icons";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";

// Water Droplet Ripple Effect
interface RippleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const WaterDropletRipple = ({
  children,
  className = "",
  delay = 0,
}: RippleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations with surface tension feel
  const x = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.5 });
  const y = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const createRipple = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now() + Math.random(),
    };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative group cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={createRipple}
    >
      {/* Hover glow effect */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: x,
            top: y,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-2xl"
          />
        </motion.div>
      )}

      {/* Water droplet ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/* Multiple expanding circles for realistic water effect */}
            {[0, 0.3, 0.6].map((delay, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{
                  scale: [0, 1.5, 2.5],
                  opacity: [0.6, 0.3, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`absolute w-16 h-16 rounded-full border-2 ${
                  index === 0
                    ? "border-purple-400/60"
                    : index === 1
                      ? "border-blue-400/40"
                      : "border-cyan-300/20"
                }`}
                style={{
                  transformOrigin: "center",
                }}
              />
            ))}

            {/* Center droplet impact */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 0.8, 0], opacity: [1, 0.8, 0] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Optimized Section Component
const Section = ({ children, className = "", delay = 0 }: RippleProps) => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay }}
    className={`w-full ${className}`}
  >
    {children}
  </motion.section>
);

// Pirate Map Journey Experience Section
const experiences = [
  {
    title: "Fullstack Software Engineering Intern",
    company: "Energy Queensland",
    date: "Nov 2024 - Feb 2025",
    location: "Australia · On-site",
    description: [
      "Independently led the development of a geospatial application to optimize inspections of electrical infrastructure asset conductor lines and poles.",
      "Frontend: Built an interactive map interface with React, TypeScript, Redux, Tailwind CSS, and Leaflet, enabling users to query infrastructure data in a unique interactive and intuitive manner.",
      "Backend: Developed a FastAPI backend leveraging H3, Shapely, GeoPandas and GeoJSON to process geospatial data efficiently.",
      "Data Visualization: Implemented features to display queried assets on the map, highlight data dynamically, and export results as CSV files.",
      "Agile Practices: Worked within a CI/CD pipeline, utilizing Jira, Confluence, and structured sprints to deliver high-quality features.",
    ],
    icon: "🗺️",
  },
  {
    title: "Retail Salesperson",
    company: "JB Hi-Fi",
    date: "Aug 2023 - Dec 2023",
    location: "Ipswich, Queensland, Australia · On-site",
    description: [
      "Highly adaptive and motivated Salesperson with a friendly and patient attitude towards customer service.",
      "Supplied over 200 customers with extremely helpful knowledge and sales service.",
      "Integrated within the floor plan and team within 3 days of starting.",
    ],
    icon: "💿",
  },
  {
    title: "Crew Member",
    company: "McDonald's",
    date: "Mar 2023 - Jun 2023",
    location: "Redbank Plains, Queensland, Australia",
    description: [
      "Worked as a contract crew member, quickly adapting to fast-paced service.",
      "Provided friendly and efficient service to customers.",
    ],
    icon: "🍔",
  },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const updateMousePosition = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Track scroll progress
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden relative font-sans"
      style={{
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Ambient purple/blue glow that follows mouse */}
      <motion.div
        className="fixed w-[600px] h-[600px] pointer-events-none z-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 69, 255, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          filter: "blur(60px)",
        }}
      />

      {/* Tech-focused scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Side scroll dots with tech theme */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 mix-blend-difference">
        {[
          "hero",
          "about",
          "education",
          "skills",
          "experience",
          "projects",
          "contact",
        ].map((section, i) => (
          <motion.div
            key={section}
            className="w-2 h-2 rounded-full bg-white cursor-pointer relative"
            style={{
              opacity:
                scrollProgress >= i * 14 && scrollProgress <= (i + 1) * 14 + 5
                  ? 1
                  : 0.3,
              scale:
                scrollProgress >= i * 14 && scrollProgress <= (i + 1) * 14 + 5
                  ? 1.3
                  : 1,
            }}
            whileHover={{ scale: 1.5 }}
            onClick={() => {
              const sectionEl = document.getElementById(section);
              if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {scrollProgress >= i * 14 && scrollProgress <= (i + 1) * 14 + 5 && (
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ opacity: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* HERO SECTION - Creative, edge-to-edge with tech elements */}
      <Section
        id="hero"
        className="relative w-full min-h-[100vh] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Tech background elements */}
          <div className="absolute w-full h-full">
            {/* Grid lines with pulsing nodes */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`h-${i}`}
                  className="absolute h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                  style={{ top: `${i * 5}%`, transform: "translateY(-50%)" }}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`v-${i}`}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                  style={{ left: `${i * 5}%`, transform: "translateX(-50%)" }}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{
                    duration: 4,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Intersection nodes */}
              {Array.from({ length: 10 }).map((_, i) =>
                Array.from({ length: 10 }).map((_, j) => (
                  <motion.div
                    key={`node-${i}-${j}`}
                    className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
                    style={{
                      top: `${i * 10 + 5}%`,
                      left: `${j * 10 + 5}%`,
                      transform: "translate(-50%, -50%)",
                      opacity: 0.2,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      delay: (i + j) * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))
              )}
            </div>

            {/* Floating code particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`code-particle-${i}`}
                className="absolute text-[10px] font-mono opacity-10"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: 0,
                }}
                animate={{
                  y: [null, "80%", "20%", "90%", "10%", null],
                  opacity: [0, 0.2, 0.3, 0.2, 0, 0],
                }}
                transition={{
                  duration: 15 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }}
              >
                {
                  [
                    "</",
                    "{",
                    "}",
                    "/>",
                    "()",
                    "[]",
                    "&&",
                    "||",
                    "==",
                    "===",
                    "!=",
                    "!==",
                    "=>",
                  ][Math.floor(Math.random() * 13)]
                }
              </motion.div>
            ))}

            {/* Animated glowing orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-700/10 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            <motion.div
              className="absolute top-2/3 right-1/3 w-72 h-72 rounded-full bg-cyan-700/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Code brackets decoration */}
            <div className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2 text-7xl font-light text-purple-500/30 -rotate-12">{`{`}</div>
            <div className="hidden md:block absolute -right-16 top-1/2 -translate-y-1/2 text-7xl font-light text-purple-500/30 rotate-12">{`}`}</div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-center leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                ROHAAN
              </span>
              <br />
              <span className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-300">
                AHMED
              </span>
            </h1>

            {/* Dynamic typing animation */}
            <div className="h-12 my-6 flex justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative h-full flex items-center font-mono text-lg sm:text-xl"
              >
                <span className="text-purple-400">&gt;</span>
                <span className="text-blue-300 mx-2">developer</span>
                <span className="text-purple-400">@</span>
                <span className="text-green-400 ml-2">fullstack</span>
                <span className="ml-1 w-2 h-5/6 bg-blue-400 opacity-75 animate-pulse"></span>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center text-lg">
              <a
                href="mailto:Rohaanerodasahmed@gmail.com"
                className="text-gray-300 hover:text-purple-300 transition-colors"
              >
                <span className="text-purple-400 mr-2">✉</span>
                Rohaanerodasahmed@gmail.com
              </a>
              <span className="text-blue-500/60">|</span>
              <span className="text-gray-300">
                <span className="text-blue-400 mr-2">📍</span>Queensland,
                Australia
              </span>
              <span className="text-blue-500/60">|</span>
              <span className="text-gray-300">
                <span className="text-cyan-400 mr-2">📞</span>+61 450074058
              </span>
            </div>

            <div className="mt-6 flex justify-center gap-6">
              <motion.a
                href="https://www.linkedin.com/in/rohaan-erodas-ahmed/"
                target="_blank"
                rel="noopener"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-br from-blue-900/40 to-blue-700/20 rounded-lg border border-blue-700/40 shadow-md group"
              >
                <LinkedInIcon className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </motion.a>
              <motion.a
                href="https://github.com/crushr3sist"
                target="_blank"
                rel="noopener"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-br from-gray-800/40 to-purple-900/20 rounded-lg border border-gray-700/40 shadow-md group"
              >
                <GithubIcon className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors" />
              </motion.a>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-2">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center pt-1"
              >
                <motion.div
                  animate={{ height: [6, 12, 6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 bg-blue-400 rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SUMMARY SECTION - Terminal/code-themed */}
      <Section
        id="about"
        delay={0.05}
        className="w-full flex flex-col items-center py-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl w-full relative"
        >
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-purple-900/50 rounded-t-lg px-4 py-1 border-t border-l border-r border-purple-500/30 z-10">
            <span className="font-mono text-sm text-blue-300">about.tsx</span>
          </div>

          <div className="bg-[#0f111a]/70 backdrop-blur-md rounded-lg p-6 border border-blue-900/40 shadow-[0_4px_20px_rgba(59,130,246,0.2)]">
            <div className="font-mono text-sm text-gray-400 mb-4">
              <span className="text-pink-400">import</span>{" "}
              <span className="text-blue-400">&#123;</span> Developer{" "}
              <span className="text-blue-400">&#125;</span>{" "}
              <span className="text-pink-400">from</span>{" "}
              <span className="text-green-400">'./Rohaan'</span>
              <span className="text-gray-500">;</span>
            </div>

            <div className="text-xl md:text-2xl mb-4 leading-relaxed tracking-wide text-gray-200 font-light">
              <span className="text-yellow-400">// </span>
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Aspiring Full-Stack Developer
              </span>
              <span> with a deep passion for </span>
              <span className="text-cyan-400">Web Development</span>
              <span> and </span>
              <span className="text-blue-400">Software Engineering</span>.
            </div>

            <div className="text-lg text-gray-300 font-light mb-6 leading-relaxed">
              Currently pursuing a{" "}
              <span className="text-purple-400 font-medium">
                Bachelor of Computer Science
              </span>{" "}
              and boasting a practical and proficient skill set in both{" "}
              <span className="text-green-400 font-medium">backend</span> and{" "}
              <span className="text-blue-400 font-medium">frontend</span>{" "}
              technologies. Experienced in deploying robust applications using
              modern tech stacks and methodologies. Seeking a dynamic role as a
              Backend, Frontend, or Full-Stack Engineer where I can leverage my
              skills to contribute to innovative and impactful projects.
            </div>

            <div className="font-mono text-sm text-gray-400 mt-4">
              <span className="text-pink-400">export default</span>{" "}
              <span className="text-blue-400">function</span>{" "}
              <span className="text-yellow-400">AboutMe</span>
              <span className="text-blue-400">() &#123;</span>
              <div className="ml-4 mt-1">
                <span className="text-pink-400">return</span>{" "}
                <span className="text-blue-400">&#40;</span>
                <span className="text-purple-400">passion</span> &&{" "}
                <span className="text-purple-400">innovation</span>
                <span className="text-blue-400">&#41;</span>
                <span className="text-gray-500">;</span>
              </div>
              <span className="text-blue-400">&#125;</span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-purple-500/40 rounded-bl-lg"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-purple-500/40 rounded-br-lg"></div>
          <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-purple-500/40 rounded-tl-lg"></div>
          <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-purple-500/40 rounded-tr-lg"></div>
        </motion.div>
      </Section>

      {/* EDUCATION SECTION - Tech dashboard style */}
      <Section
        id="education"
        delay={0.1}
        className="w-full flex flex-col items-center py-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl w-full relative"
        >
          <div className="bg-[#12122a]/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/40 shadow-[0_0_30px_rgba(139,92,246,0.2)] overflow-hidden">
            {/* Circuit board background */}
            <div className="absolute inset-0 opacity-5">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <pattern
                  id="circuit"
                  patternUnits="userSpaceOnUse"
                  width="60"
                  height="60"
                  patternTransform="scale(0.5) rotate(0)"
                >
                  <path
                    d="M0 30 L30 30 L30 0"
                    fill="none"
                    stroke="rgb(139, 92, 246)"
                    strokeWidth="1"
                  />
                  <path
                    d="M60 30 L30 30 L30 60"
                    fill="none"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="1"
                  />
                  <circle cx="30" cy="30" r="2" fill="rgb(139, 92, 246)" />
                  <circle cx="30" cy="0" r="2" fill="rgb(59, 130, 246)" />
                  <circle cx="30" cy="60" r="2" fill="rgb(59, 130, 246)" />
                </pattern>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#circuit)"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  &lt;Education&gt;
                </h2>
                <div className="ml-auto flex items-center">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse mr-1"></span>
                  <span className="text-xs font-mono text-green-400">
                    ACTIVE
                  </span>
                </div>
              </div>

              <div className="bg-[#0f111a]/70 backdrop-blur-md rounded-xl p-5 border border-blue-900/40 mb-4">
                <div className="flex flex-wrap justify-between items-start">
                  <div className="mb-2 md:mb-0">
                    <div className="text-lg text-purple-300 font-semibold mb-1">
                      University of Southern Queensland, Australia
                    </div>
                    <div className="text-gray-300">
                      Bachelors of ICT (Data Science and Artificial Intelligence
                      & App Development)
                    </div>
                  </div>

                  <div className="bg-[#1a1b2e] px-3 py-1 rounded-lg border border-blue-900/30">
                    <div className="text-xs font-mono text-gray-400 mb-1">
                      STATUS
                    </div>
                    <div className="text-sm text-blue-300">In Progress</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#1a1b2e] p-3 rounded-lg border border-purple-900/30">
                    <div className="text-xs font-mono text-gray-400 mb-1">
                      GRADUATION
                    </div>
                    <div className="text-sm flex items-center">
                      <span className="text-blue-300 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-300">December 2025</span>
                    </div>
                  </div>

                  <div className="bg-[#1a1b2e] p-3 rounded-lg border border-purple-900/30">
                    <div className="text-xs font-mono text-gray-400 mb-1">
                      GPA
                    </div>
                    <div className="text-sm flex items-center">
                      <span className="text-blue-300 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </span>
                      <span className="text-purple-300 font-medium">6.6</span>
                      <span className="text-gray-400">/7.0</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-400">Completion</span>
                    <span className="text-cyan-400">64%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "64%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
              </div>

              <div className="text-right font-mono text-blue-400 text-sm">
                &lt;/Education&gt;
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* SKILLS SECTION - Terminal/code style interface */}
      <Section id="skills" delay={0.15} className="w-full py-20">
        <div className="max-w-6xl w-full mx-auto">
          {/* Terminal-style container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-purple-900/40"
          >
            {/* Terminal header */}
            <div className="bg-[#1e1e2e] border-b border-purple-900/50 p-3 flex items-center">
              <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-center flex-grow font-mono text-gray-400 text-sm">
                skills.tsx
              </div>
            </div>

            {/* Terminal content */}
            <div className="bg-[#0f111a] p-6 font-mono text-sm">
              <div className="mb-4">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-300">developer</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-purple-400">&#123;</span>
              </div>

              {/* Languages */}
              <div className="ml-6 mb-3">
                <span className="text-blue-300">languages</span>
                <span className="text-white">:</span>{" "}
                <span className="text-purple-400">&#91;</span>
                {["Python", "JavaScript", "TypeScript", "Java", "C++"].map(
                  (lang, i, arr) => (
                    <span key={lang}>
                      <span className="text-green-400">"{lang}"</span>
                      {i < arr.length - 1 ? (
                        <span className="text-white">,</span>
                      ) : (
                        ""
                      )}{" "}
                    </span>
                  )
                )}
                <span className="text-purple-400">&#93;</span>
                <span className="text-white">,</span>
              </div>

              {/* Frameworks */}
              <div className="ml-6 mb-3 flex flex-wrap">
                <span className="text-blue-300">frameworks</span>
                <span className="text-white">:</span>{" "}
                <span className="text-purple-400">&#91;</span>
                {[
                  "React",
                  "Tailwind CSS",
                  "SASS",
                  "CSS",
                  "Django",
                  "FastAPI",
                  "Flask",
                  "Node.js",
                  "SpringBoot",
                ].map((fw, i, arr) => (
                  <motion.span
                    key={fw}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex"
                  >
                    <span className="text-green-400">"{fw}"</span>
                    {i < arr.length - 1 ? (
                      <span className="text-white">,</span>
                    ) : (
                      ""
                    )}{" "}
                  </motion.span>
                ))}
                <span className="text-purple-400">&#93;</span>
                <span className="text-white">,</span>
              </div>

              {/* Databases */}
              <div className="ml-6 mb-3">
                <span className="text-blue-300">databases</span>
                <span className="text-white">:</span>{" "}
                <span className="text-purple-400">&#91;</span>
                {["PostgreSQL", "MongoDB", "DuckDB"].map((db, i, arr) => (
                  <span key={db}>
                    <span className="text-green-400">"{db}"</span>
                    {i < arr.length - 1 ? (
                      <span className="text-white">,</span>
                    ) : (
                      ""
                    )}{" "}
                  </span>
                ))}
                <span className="text-purple-400">&#93;</span>
                <span className="text-white">,</span>
              </div>

              {/* DevOps & Tools */}
              <div className="ml-6 mb-3">
                <span className="text-blue-300">devOps</span>
                <span className="text-white">:</span>{" "}
                <span className="text-purple-400">&#123;</span>
                <div className="ml-6">
                  <span className="text-blue-300">containerization</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-green-400">"Docker, Kubernetes"</span>
                  <span className="text-white">,</span>
                </div>
                <div className="ml-6">
                  <span className="text-blue-300">ci_cd</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-green-400">
                    "Git, CircleCI, GitHub Actions"
                  </span>
                  <span className="text-white">,</span>
                </div>
                <div className="ml-6">
                  <span className="text-blue-300">cloud</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-green-400">"DigitalOcean, AWS"</span>
                  <span className="text-white">,</span>
                </div>
                <div className="ml-6">
                  <span className="text-blue-300">other</span>
                  <span className="text-white">:</span>{" "}
                  <span className="text-green-400">
                    "Postman, Redis, RabbitMQ, Kafka, WebSocket"
                  </span>
                </div>
                <span className="ml-0 text-purple-400">&#125;</span>
                <span className="text-white">,</span>
              </div>

              {/* Practices */}
              <div className="ml-6 mb-3">
                <span className="text-blue-300">practices</span>
                <span className="text-white">:</span>{" "}
                <span className="text-purple-400">&#91;</span>
                {["OOP", "Write-Through/Write-Behind Caching", "Linux"].map(
                  (pr, i, arr) => (
                    <span key={pr}>
                      <span className="text-green-400">"{pr}"</span>
                      {i < arr.length - 1 ? (
                        <span className="text-white">,</span>
                      ) : (
                        ""
                      )}{" "}
                    </span>
                  )
                )}
                <span className="text-purple-400">&#93;</span>
              </div>

              <div className="text-purple-400">&#125;</div>

              {/* Blinking cursor */}
              <div className="flex mt-2">
                <span className="text-blue-400">&#62; </span>
                <div className="w-2 h-5 bg-blue-400 animate-pulse ml-1"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* EXPERIENCE SECTION - Futuristic tech-focused design */}
      <Section
        id="experience"
        delay={0.2}
        className="w-full px-4 md:px-8 py-24 relative min-h-[80vh]"
      >
        {/* Dynamic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Tech grid background */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`hg-${i}`}
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                style={{ top: `${i * 3.33}%` }}
              />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`vg-${i}`}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                style={{ left: `${i * 3.33}%` }}
              />
            ))}
          </div>

          {/* Glow effects */}
          <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-purple-900/10 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[25vw] h-[25vw] rounded-full bg-blue-900/10 blur-[80px]" />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent"
            >
              Work Experience
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-gray-400 text-lg"
            >
              Professional journey & contributions
            </motion.div>
          </div>

          {/* Futuristic experience timeline */}
          <div className="relative">
            {/* Tech-inspired connection line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-400 transform -translate-x-1/2 z-0">
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-purple-500 rounded-full transform -translate-x-1/2 glow-purple-400"></div>
              <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-1/2 glow-cyan-300"></div>
            </div>

            {/* Experience point - Fullstack Software Engineering Intern */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10 mb-32"
            >
              <div className="flex flex-col md:flex-row items-center">
                {/* Illuminated node */}
                <div className="flex justify-center md:justify-end md:w-1/2 mb-6 md:mb-0 md:pr-12">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)] z-20">
                      <span className="text-2xl">🗺️</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-500/20 rounded-full blur-xl -z-10"></div>
                    {/* Animated pulse effect */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-blue-500/70 z-10 animate-ping-slow"></div>
                  </div>
                </div>

                {/* Experience card */}
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-[#12122a]/80 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6 md:p-8 shadow-[0_0_25px_rgba(59,130,246,0.2)]">
                    <div className="flex flex-wrap justify-between mb-3">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Fullstack Software Engineering Intern
                      </div>
                      <div className="text-cyan-400 font-mono">
                        Nov 2024 - Feb 2025
                      </div>
                    </div>

                    <div className="mb-2 text-blue-300">
                      Energy Queensland Advanced Analytics
                    </div>
                    <div className="text-sm text-gray-400 mb-4">
                      Australia · On-site
                    </div>

                    <div className="space-y-2">
                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[
                          "React",
                          "TypeScript",
                          "Redux",
                          "Tailwind",
                          "FastAPI",
                          "H3",
                          "GeoJSON",
                          "Three.js",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-blue-900/30 border border-blue-700/30 rounded text-xs text-blue-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Experience bullet points - with code syntax highlighting */}
                      <div className="space-y-3 font-mono text-sm">
                        <div className="text-gray-300">
                          <span className="text-purple-400">• </span>
                          Led development of a geospatial application for
                          statewide electrical infrastructure inspection, with
                          full ownership of design and implementation
                        </div>
                        <div className="text-gray-300">
                          <span className="text-purple-400">• </span>
                          Engineered React/TypeScript frontend with Leaflet maps
                          integration, enabling intuitive infrastructure data
                          querying while maintaining
                          <span className="text-cyan-400"> &lt;40MB </span>
                          package size
                        </div>
                        <div className="text-gray-300">
                          <span className="text-purple-400">• </span>
                          Developed FastAPI backend with H3/GeoJSON processing
                          and
                          <span className="text-green-400"> Redis </span>
                          caching, optimizing geospatial queries for thousands
                          of infrastructure assets
                        </div>
                        <div className="text-gray-300">
                          <span className="text-purple-400">• </span>
                          Implemented
                          <span className="text-blue-400"> Three.js</span>
                          -based LiDAR visualization system with intelligent
                          denoising for classified Laz/Parquet files
                        </div>
                        <div className="text-gray-300">
                          <span className="text-purple-400">• </span>
                          Drove full development lifecycle using CI/CD, Jira,
                          and Confluence, delivering features through structured
                          sprints based on user feedback
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* PROJECTS SECTION - Advanced tech visualization design */}
      <Section
        id="projects"
        delay={0.3}
        className="w-full px-4 md:px-8 py-24 relative min-h-[100vh]"
      >
        {/* Neural network/tech background with animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            {/* Animated neural network nodes */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`node-${i}`}
                className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                style={{
                  width: Math.random() * 6 + 4 + "px",
                  height: Math.random() * 6 + 4 + "px",
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Animated neural connections */}
            <svg
              width="100%"
              height="100%"
              className="absolute inset-0 opacity-10"
            >
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                </linearGradient>
                <mask id="fadeMask">
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                  <radialGradient
                    id="fadeGradient"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="50%"
                    fy="50%"
                  >
                    <stop offset="70%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#fadeGradient)"
                  />
                </mask>
              </defs>

              {/* Grid base */}
              <pattern
                id="neural-net"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="2" className="fill-purple-400/70" />
                <circle cx="70" cy="70" r="2" className="fill-blue-400/70" />
                <circle cx="70" cy="10" r="2" className="fill-cyan-400/70" />
                <circle cx="10" cy="70" r="2" className="fill-blue-400/70" />
                <line
                  x1="10"
                  y1="10"
                  x2="70"
                  y2="70"
                  stroke="url(#lineGradient)"
                  strokeWidth="0.7"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="100"
                    to="0"
                    dur="15s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="70"
                  y1="10"
                  x2="10"
                  y2="70"
                  stroke="url(#lineGradient)"
                  strokeWidth="0.7"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="100"
                    to="0"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </line>
              </pattern>

              {/* Grid with mask for fade effect */}
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#neural-net)"
                mask="url(#fadeMask)"
              />

              {/* Animated data pulses */}
              {Array.from({ length: 5 }).map((_, i) => (
                <g key={`pulse-${i}`}>
                  <circle className="fill-blue-500/30">
                    <animate
                      attributeName="cx"
                      values={`${10 + Math.random() * 30}%;${40 + Math.random() * 40}%`}
                      dur={`${5 + Math.random() * 10}s`}
                      repeatCount="indefinite"
                      begin={`${Math.random() * 5}s`}
                    />
                    <animate
                      attributeName="cy"
                      values={`${10 + Math.random() * 30}%;${40 + Math.random() * 40}%`}
                      dur={`${5 + Math.random() * 10}s`}
                      repeatCount="indefinite"
                      begin={`${Math.random() * 5}s`}
                    />
                    <animate
                      attributeName="r"
                      values="2;4;2"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${Math.random() * 3}s`}
                    />
                  </circle>
                </g>
              ))}
            </svg>
          </div>

          {/* Animated glow spots */}
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/3 left-1/5 w-[20vw] h-[20vw] rounded-full bg-purple-900/10 blur-[80px]"
          />
          <motion.div
            animate={{
              opacity: [0.1, 0.15, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/5 w-[25vw] h-[25vw] rounded-full bg-blue-900/10 blur-[100px]"
          />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-black text-center mb-12 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent"
          >
            Selected Projects
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project 1: NucleiSystems */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-1 h-full"
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(139, 92, 246, 0.15), 0 10px 10px -5px rgba(139, 92, 246, 0.1)",
              }}
            >
              <div className="h-full bg-[#12122a]/80 backdrop-blur-sm rounded-2xl border border-purple-900/50 overflow-hidden group relative">
                {/* Animated tech particles */}
                <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={`p1-particle-${i}`}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, 30, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Tech visualization header */}
                <div className="h-16 bg-gradient-to-r from-purple-900/80 to-blue-900/80 flex items-center justify-between px-4 border-b border-purple-700/30 relative overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden opacity-10">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={`p1-header-line-${i}`}
                        className="absolute h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                        style={{ top: `${i * 14 + 2}%` }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="font-mono text-xs text-gray-400">
                    IPFS-Storage-System.tsx
                  </div>
                  <div className="w-6"></div>
                </div>

                {/* Project content */}
                <div className="p-6 relative">
                  <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    NucleiSystems | Digital Asset Storage
                  </div>

                  {/* Tech visualization - storage system diagram with animation */}
                  <div className="h-36 mb-4 bg-[#0e0e20] rounded-lg flex items-center justify-center overflow-hidden relative">
                    {/* Background grid */}
                    <div className="absolute inset-0">
                      <svg width="100%" height="100%">
                        <pattern
                          id="ipfs-grid"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <rect
                            width="20"
                            height="20"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="0.3"
                            strokeOpacity="0.15"
                          />
                        </pattern>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#ipfs-grid)"
                        />
                      </svg>
                    </div>

                    <div className="w-full h-full p-3 flex items-center">
                      {/* IPFS diagram with animation */}
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 200 80"
                        className="opacity-90 relative z-10"
                      >
                        {/* Component boxes */}
                        <rect
                          x="10"
                          y="25"
                          width="30"
                          height="30"
                          rx="3"
                          fill="#8b5cf6"
                          fillOpacity="0.3"
                          stroke="#a78bfa"
                        >
                          <animate
                            attributeName="opacity"
                            values="0.3;0.5;0.3"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <text
                          x="25"
                          y="43"
                          fontSize="8"
                          textAnchor="middle"
                          fill="#d8b4fe"
                        >
                          IPFS
                        </text>

                        <rect
                          x="85"
                          y="10"
                          width="30"
                          height="20"
                          rx="3"
                          fill="#3b82f6"
                          fillOpacity="0.3"
                          stroke="#60a5fa"
                        />
                        <text
                          x="100"
                          y="23"
                          fontSize="8"
                          textAnchor="middle"
                          fill="#93c5fd"
                        >
                          Redis
                        </text>

                        <rect
                          x="85"
                          y="40"
                          width="30"
                          height="20"
                          rx="3"
                          fill="#3b82f6"
                          fillOpacity="0.3"
                          stroke="#60a5fa"
                        />
                        <text
                          x="100"
                          y="53"
                          fontSize="8"
                          textAnchor="middle"
                          fill="#93c5fd"
                        >
                          DB
                        </text>

                        <rect
                          x="160"
                          y="25"
                          width="30"
                          height="30"
                          rx="3"
                          fill="#06b6d4"
                          fillOpacity="0.3"
                          stroke="#22d3ee"
                        />
                        <text
                          x="175"
                          y="43"
                          fontSize="8"
                          textAnchor="middle"
                          fill="#67e8f9"
                        >
                          Client
                        </text>

                        {/* Data flow animations */}
                        <line
                          x1="40"
                          y1="40"
                          x2="85"
                          y2="20"
                          stroke="#a78bfa"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="100;0"
                            dur="5s"
                            repeatCount="indefinite"
                          />
                        </line>

                        <line
                          x1="40"
                          y1="40"
                          x2="85"
                          y2="50"
                          stroke="#a78bfa"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="100;0"
                            dur="7s"
                            repeatCount="indefinite"
                          />
                        </line>

                        <line
                          x1="115"
                          y1="20"
                          x2="160"
                          y2="40"
                          stroke="#60a5fa"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="100;0"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </line>

                        <line
                          x1="115"
                          y1="50"
                          x2="160"
                          y2="40"
                          stroke="#60a5fa"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="100;0"
                            dur="6s"
                            repeatCount="indefinite"
                          />
                        </line>

                        {/* Data packets */}
                        <circle cx="50" cy="30" r="1.5" fill="#a78bfa">
                          <animate
                            attributeName="cx"
                            values="40;85"
                            dur="5s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            values="40;20"
                            dur="5s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="5s"
                            repeatCount="indefinite"
                          />
                        </circle>

                        <circle cx="140" cy="35" r="1.5" fill="#60a5fa">
                          <animate
                            attributeName="cx"
                            values="115;160"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            values="20;40"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </svg>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {[
                      "IPFS-Kubo",
                      "Redis",
                      "Self-Managing FS",
                      "Multi-Layer Cache",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-purple-900/30 border border-purple-700/30 rounded-md text-xs text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project bullets */}
                  <ul className="text-xs text-gray-300 space-y-2 font-mono mb-5">
                    <li className="flex">
                      <span className="text-purple-400 mr-2">❯</span>
                      <span>
                        Built custom IPFS-Kubo binary bindings to replace
                        abandoned official library
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-purple-400 mr-2">❯</span>
                      <span>
                        Engineered self-managing filesystem for automated asset
                        fetching and cleaning
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-purple-400 mr-2">❯</span>
                      <span>
                        Implemented multi-layer caching architecture with Redis
                        and secondary database
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-purple-400 mr-2">❯</span>
                      <span>
                        Developed sustainable backend architecture for scalable
                        asset storage
                      </span>
                    </li>
                  </ul>

                  {/* Project link */}
                  <div className="absolute bottom-4 left-6">
                    <a
                      href="https://github.com/NucleiSystems/backend_stable"
                      target="_blank"
                      rel="noopener"
                      className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                    >
                      <span className="mr-1.5">View Source</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 2: r3almX */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1"
            >
              <div className="h-full bg-[#12122a]/80 backdrop-blur-sm rounded-2xl border border-blue-900/50 overflow-hidden group relative">
                {/* Tech visualization header */}
                <div className="h-16 bg-gradient-to-r from-blue-900/80 to-purple-900/80 flex items-center justify-between px-4 border-b border-blue-700/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="font-mono text-xs text-gray-400">
                    WebSocket-System.tsx
                  </div>
                  <div className="w-6"></div>
                </div>

                {/* Project content */}
                <div className="p-6 relative">
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    r3almX | Real-Time Communications
                  </div>

                  {/* Tech visualization - WebSocket system */}
                  <div className="h-28 mb-4 bg-[#0e0e20] rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full p-3 flex items-center">
                      {/* WebSocket system diagram */}
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 200 70"
                        className="opacity-80"
                      >
                        {/* Clients */}
                        <circle
                          cx="20"
                          cy="20"
                          r="10"
                          fill="#3b82f6"
                          fillOpacity="0.3"
                          stroke="#60a5fa"
                        />
                        <circle
                          cx="20"
                          cy="50"
                          r="10"
                          fill="#3b82f6"
                          fillOpacity="0.3"
                          stroke="#60a5fa"
                        />
                        <text
                          x="20"
                          y="23"
                          fontSize="8"
                          textAnchor="middle"
                          fill="#93c5fd"
                        >
                          C1
                        </text>
                        <text
                          x="20"
                          y="53"
                          fontSize="8"
                          textAnchor="middle"
                          fill="#93c5fd"
                        >
                          C2
                        </text>

                        {/* WebSocket */}
                        <rect
                          x="60"
                          y="10"
                          width="40"
                          height="50"
                          rx="3"
                          fill="#8b5cf6"
                          fillOpacity="0.3"
                          stroke="#a78bfa"
                        />
                        <text
                          x="80"
                          y="38"
                          fontSize="8"
                          textAnchor="middle"
                          fill="#d8b4fe"
                        >
                          WebSocket
                        </text>

                        {/* RabbitMQ */}
                        <rect
                          x="130"
                          y="25"
                          width="35"
                          height="20"
                          rx="3"
                          fill="#06b6d4"
                          fillOpacity="0.3"
                          stroke="#22d3ee"
                        />
                        <text
                          x="148"
                          y="38"
                          fontSize="7"
                          textAnchor="middle"
                          fill="#67e8f9"
                        >
                          RabbitMQ
                        </text>

                        {/* Connections */}
                        <line
                          x1="30"
                          y1="20"
                          x2="60"
                          y2="20"
                          stroke="#60a5fa"
                          strokeWidth="1"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="100"
                            to="0"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </line>
                        <line
                          x1="30"
                          y1="50"
                          x2="60"
                          y2="50"
                          stroke="#60a5fa"
                          strokeWidth="1"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="100"
                            to="0"
                            dur="4s"
                            repeatCount="indefinite"
                          />
                        </line>
                        <line
                          x1="100"
                          y1="35"
                          x2="130"
                          y2="35"
                          stroke="#a78bfa"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="100"
                            to="0"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </line>
                      </svg>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {["WebSockets", "RabbitMQ", "ORM", "Python", "Java"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-900/30 border border-blue-700/30 rounded-md text-xs text-blue-300"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>

                  {/* Project bullets */}
                  <ul className="text-xs text-gray-300 space-y-2 font-mono mb-5">
                    <li className="flex">
                      <span className="text-blue-400 mr-2">❯</span>
                      <span>
                        Engineered high-throughput WebSocket system with
                        RabbitMQ for messaging
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-blue-400 mr-2">❯</span>
                      <span>
                        Developed separate WebSocket for custom
                        push-notifications system
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-blue-400 mr-2">❯</span>
                      <span>
                        Implemented dynamic table generation with custom ORM
                        modifications
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-blue-400 mr-2">❯</span>
                      <span>
                        Created extensible plugin system for frontend room
                        customization
                      </span>
                    </li>
                  </ul>

                  {/* Project link */}
                  <div className="absolute bottom-4 left-6">
                    <a
                      href="https://github.com/crushr3sist/r3almX-backend"
                      target="_blank"
                      rel="noopener"
                      className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                    >
                      <span className="mr-1.5">View Source</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 3: BlockFrame */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-1"
            >
              <div className="h-full bg-[#12122a]/80 backdrop-blur-sm rounded-2xl border border-cyan-900/50 overflow-hidden group relative">
                {/* Tech visualization header */}
                <div className="h-16 bg-gradient-to-r from-cyan-900/80 to-blue-900/80 flex items-center justify-between px-4 border-b border-cyan-700/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="font-mono text-xs text-gray-400">
                    Chunking-System.tsx
                  </div>
                  <div className="w-6"></div>
                </div>

                {/* Project content */}
                <div className="p-6 relative">
                  <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    BlockFrame | File Chunking Library
                  </div>

                  {/* Tech visualization - Chunking system */}
                  <div className="h-28 mb-4 bg-[#0e0e20] rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full p-3 flex items-center">
                      {/* File chunking visualization */}
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 200 70"
                        className="opacity-80"
                      >
                        {/* File */}
                        <rect
                          x="10"
                          y="20"
                          width="40"
                          height="30"
                          rx="2"
                          fill="#06b6d4"
                          fillOpacity="0.3"
                          stroke="#22d3ee"
                        />
                        <text
                          x="30"
                          y="38"
                          fontSize="8"
                          textAnchor="middle"
                          fill="#67e8f9"
                        >
                          File
                        </text>

                        {/* Chunking arrow */}
                        <line
                          x1="50"
                          y1="35"
                          x2="70"
                          y2="35"
                          stroke="#22d3ee"
                          strokeWidth="1"
                          strokeDasharray="3,1"
                        />
                        <polygon points="70,35 65,33 65,37" fill="#22d3ee" />

                        {/* Chunks */}
                        <rect
                          x="80"
                          y="15"
                          width="15"
                          height="10"
                          rx="1"
                          fill="#8b5cf6"
                          fillOpacity="0.3"
                          stroke="#a78bfa"
                        />
                        <rect
                          x="80"
                          y="30"
                          width="15"
                          height="10"
                          rx="1"
                          fill="#8b5cf6"
                          fillOpacity="0.3"
                          stroke="#a78bfa"
                        />
                        <rect
                          x="80"
                          y="45"
                          width="15"
                          height="10"
                          rx="1"
                          fill="#8b5cf6"
                          fillOpacity="0.3"
                          stroke="#a78bfa"
                        />
                        <text
                          x="87"
                          y="22"
                          fontSize="6"
                          textAnchor="middle"
                          fill="#d8b4fe"
                        >
                          C1
                        </text>
                        <text
                          x="87"
                          y="37"
                          fontSize="6"
                          textAnchor="middle"
                          fill="#d8b4fe"
                        >
                          C2
                        </text>
                        <text
                          x="87"
                          y="52"
                          fontSize="6"
                          textAnchor="middle"
                          fill="#d8b4fe"
                        >
                          C3
                        </text>

                        {/* Storage arrows */}
                        <line
                          x1="95"
                          y1="20"
                          x2="115"
                          y2="20"
                          stroke="#a78bfa"
                          strokeWidth="1"
                          strokeDasharray="2,1"
                        />
                        <line
                          x1="95"
                          y1="35"
                          x2="115"
                          y2="35"
                          stroke="#a78bfa"
                          strokeWidth="1"
                          strokeDasharray="2,1"
                        />
                        <line
                          x1="95"
                          y1="50"
                          x2="115"
                          y2="50"
                          stroke="#a78bfa"
                          strokeWidth="1"
                          strokeDasharray="2,1"
                        />

                        {/* DB */}
                        <rect
                          x="125"
                          y="10"
                          width="40"
                          height="50"
                          rx="3"
                          fill="#3b82f6"
                          fillOpacity="0.3"
                          stroke="#60a5fa"
                        />
                        <line
                          x1="125"
                          y1="25"
                          x2="165"
                          y2="25"
                          stroke="#60a5fa"
                          strokeWidth="0.5"
                        />
                        <line
                          x1="125"
                          y1="40"
                          x2="165"
                          y2="40"
                          stroke="#60a5fa"
                          strokeWidth="0.5"
                        />
                        <text
                          x="145"
                          y="19"
                          fontSize="7"
                          textAnchor="middle"
                          fill="#93c5fd"
                        >
                          ORM Table
                        </text>
                        <text
                          x="145"
                          y="34"
                          fontSize="7"
                          textAnchor="middle"
                          fill="#93c5fd"
                        >
                          Chunks
                        </text>
                        <text
                          x="145"
                          y="49"
                          fontSize="7"
                          textAnchor="middle"
                          fill="#93c5fd"
                        >
                          Vector Index
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {[
                      "ORM",
                      "Vector Search",
                      "Façade Pattern",
                      "Chunking System",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-cyan-900/30 border border-cyan-700/30 rounded-md text-xs text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project bullets */}
                  <ul className="text-xs text-gray-300 space-y-2 font-mono mb-5">
                    <li className="flex">
                      <span className="text-cyan-400 mr-2">❯</span>
                      <span>
                        Developed ORM-based asset management system with
                        customizable table models
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-cyan-400 mr-2">❯</span>
                      <span>
                        Implemented Façade pattern for simplified integration
                        across use cases
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-cyan-400 mr-2">❯</span>
                      <span>
                        Created vectorized search system with database caching
                        for file chunks
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-cyan-400 mr-2">❯</span>
                      <span>
                        Built highly configurable chunking system with settings
                        management
                      </span>
                    </li>
                  </ul>

                  {/* Project link */}
                  <div className="absolute bottom-4 left-6">
                    <a
                      href="https://github.com/crushr3sist/BlockFrame"
                      target="_blank"
                      rel="noopener"
                      className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                    >
                      <span className="mr-1.5">View Source</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CONTACT SECTION - Tech-focused, futuristic interface */}
      <Section
        id="contact"
        delay={0.4}
        className="w-full px-4 md:px-8 py-24 relative"
      >
        {/* Tech background with interactive elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated binary background */}
          <div className="absolute inset-0 opacity-5 font-mono text-[8px] select-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`binary-${i}`}
                className="absolute whitespace-nowrap"
                initial={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.3,
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {Array.from({ length: 30 }).map((_, j) => (
                  <span key={j}>{Math.round(Math.random())}</span>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Advanced circuit board pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  id="circuitGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0.4)" />
                </linearGradient>

                <pattern
                  id="circuit-pattern"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 50 H100 M50 0 V100 M25 0 V30 M75 70 V100 M0 25 H30 M70 75 H100"
                    stroke="url(#circuitGradient)"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="3"
                    fill="rgba(139, 92, 246, 0.2)"
                  />
                  <circle
                    cx="25"
                    cy="30"
                    r="2"
                    fill="rgba(59, 130, 246, 0.2)"
                  />
                  <circle
                    cx="75"
                    cy="70"
                    r="2"
                    fill="rgba(59, 130, 246, 0.2)"
                  />
                  <circle cx="30" cy="25" r="2" fill="rgba(6, 182, 212, 0.2)" />
                  <circle cx="70" cy="75" r="2" fill="rgba(6, 182, 212, 0.2)" />

                  {/* Blinking node effect */}
                  <circle
                    cx="50"
                    cy="50"
                    r="1.5"
                    fill="rgba(139, 92, 246, 0.6)"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.2;0.6;0.2"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="25" cy="30" r="1" fill="rgba(59, 130, 246, 0.6)">
                    <animate
                      attributeName="opacity"
                      values="0.1;0.5;0.1"
                      dur="4s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                  </circle>
                  <circle cx="75" cy="70" r="1" fill="rgba(6, 182, 212, 0.6)">
                    <animate
                      attributeName="opacity"
                      values="0.1;0.5;0.1"
                      dur="5s"
                      repeatCount="indefinite"
                      begin="2s"
                    />
                  </circle>
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#circuit-pattern)"
              />

              {/* Data flow pulses */}
              <line
                x1="10%"
                y1="50%"
                x2="90%"
                y2="50%"
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="0.5"
                strokeDasharray="5,5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="100;0"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </line>
              <line
                x1="50%"
                y1="10%"
                x2="50%"
                y2="90%"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="0.5"
                strokeDasharray="5,5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="100;0"
                  dur="15s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>
          </div>

          {/* Interactive glow effects */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-gradient-radial from-purple-900/10 to-transparent blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-gradient-radial from-blue-900/10 to-transparent blur-[100px]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent mb-4">
              Connect()
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Want to collaborate, chat, or just say hi? Drop me a message or
              connect on any platform below!
            </p>
          </motion.div>

          {/* Terminal-style contact container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#12122a]/90 backdrop-blur-md rounded-xl overflow-hidden border border-blue-900/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            whileHover={{ boxShadow: "0 0 40px rgba(59,130,246,0.3)" }}
          >
            {/* Terminal header with animated elements */}
            <div className="bg-[#1e1e2e] border-b border-blue-900/50 py-3 px-4 flex items-center justify-between relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5 overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`header-line-${i}`}
                    className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    style={{ top: `${i * 20 + 10}%` }}
                  />
                ))}
              </div>

              <div className="flex gap-2 z-10">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-3 h-3 rounded-full bg-red-500"
                ></motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-3 h-3 rounded-full bg-yellow-500"
                ></motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-3 h-3 rounded-full bg-green-500"
                ></motion.div>
              </div>

              <div className="font-mono text-sm text-gray-400 flex items-center">
                <span className="mr-1 text-blue-400">~/</span>
                contact.sh
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-1 inline-block w-1.5 h-3.5 bg-gray-400"
                ></motion.span>
              </div>

              <div className="w-12 flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono relative">
              {/* Matrix-style falling characters in background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={`matrix-${i}`}
                    className="absolute text-[8px] text-green-500/10 font-mono"
                    style={{
                      top: -20,
                      left: `${i * 10 + Math.random() * 5}%`,
                    }}
                    animate={{
                      top: ["0%", "100%"],
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{
                      duration: 5 + Math.random() * 10,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5,
                    }}
                  >
                    {Array.from({ length: 10 }).map((_, j) => (
                      <div key={j}>
                        {String.fromCharCode(
                          33 + Math.floor(Math.random() * 90)
                        )}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col space-y-4 relative z-10">
                {/* Interactive command line */}
                <div className="flex items-center text-sm">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-green-500 mr-2 font-bold"
                  >
                    rohaan@portfolio:~$
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-white inline-block overflow-hidden whitespace-nowrap"
                  >
                    ./contact-rohaan --init
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      delay: 1.3,
                      duration: 1,
                      repeat: 3,
                      repeatType: "reverse",
                    }}
                    className="ml-1 inline-block w-2 h-4 bg-blue-400"
                  ></motion.span>
                </div>

                {/* Animated response with typing effect */}
                <motion.div
                  className="text-sm text-gray-400 space-y-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {/* Loading animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="flex items-center mb-3"
                  >
                    <span className="mr-2">Initializing contact protocols</span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: 2,
                        repeatType: "loop",
                      }}
                      className="inline-block"
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: 2,
                        repeatType: "loop",
                        delay: 0.3,
                      }}
                      className="inline-block"
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: 2,
                        repeatType: "loop",
                        delay: 0.6,
                      }}
                      className="inline-block"
                    >
                      .
                    </motion.span>
                  </motion.div>

                  {/* Animated connection progress bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="mb-3"
                  >
                    <div className="mb-1 flex justify-between text-xs">
                      <span>Establishing secure connection</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5 }}
                      >
                        Complete
                      </motion.span>
                    </div>
                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 2.8, duration: 1.5 }}
                      ></motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.5 }}
                    className="mb-3 text-cyan-400"
                  >
                    Connection established. Select your preferred method:
                  </motion.div>
                </motion.div>

                {/* Contact buttons - enhanced with tech elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 5 }}
                  className="flex flex-wrap gap-4 justify-center"
                >
                  <motion.a
                    href="mailto:Rohaanerodasahmed@gmail.com"
                    className="group relative"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 5.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 animate-pulse"></div>
                    <button className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/80 to-blue-900/80 rounded-lg border border-purple-500/30 text-white overflow-hidden">
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 opacity-20">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={`email-line-${i}`}
                              className="absolute h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
                              style={{ top: `${i * 45 + 10}%`, left: 0 }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-purple-400 relative z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      <span className="font-medium relative z-10">
                        Email Me
                      </span>
                    </button>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/rohaan-erodas-ahmed/"
                    target="_blank"
                    rel="noopener"
                    className="group relative"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 5.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 animate-pulse"></div>
                    <button className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-900/80 to-blue-800/80 rounded-lg border border-blue-500/30 text-white overflow-hidden">
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 opacity-20">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={`linkedin-line-${i}`}
                              className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
                              style={{ top: `${i * 45 + 10}%`, left: 0 }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-blue-400 relative z-10">
                        <LinkedInIcon className="h-5 w-5" />
                      </span>
                      <span className="font-medium relative z-10">
                        LinkedIn
                      </span>
                    </button>
                  </motion.a>

                  <motion.a
                    href="https://github.com/crushr3sist"
                    target="_blank"
                    rel="noopener"
                    className="group relative"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 5.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 animate-pulse"></div>
                    <button className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-lg border border-gray-500/30 text-white overflow-hidden">
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 opacity-20">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={`github-line-${i}`}
                              className="absolute h-px w-full bg-gradient-to-r from-transparent via-gray-500/40 to-transparent"
                              style={{ top: `${i * 45 + 10}%`, left: 0 }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-400 relative z-10">
                        <GithubIcon className="h-5 w-5" />
                      </span>
                      <span className="font-medium relative z-10">GitHub</span>
                    </button>
                  </motion.a>

                  <motion.a
                    href="https://x.com/ronnyisethereal"
                    target="_blank"
                    rel="noopener"
                    className="group relative"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 5.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 animate-pulse"></div>
                    <button className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-900/80 to-blue-800/80 rounded-lg border border-blue-500/30 text-white overflow-hidden">
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 opacity-20">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={`twitter-line-${i}`}
                              className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
                              style={{ top: `${i * 45 + 10}%`, left: 0 }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-blue-400 relative z-10">
                        <TwitterIcon className="h-5 w-5" />
                      </span>
                      <span className="font-medium relative z-10">
                        Twitter/X
                      </span>
                    </button>
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/ronnyisalreadydead/"
                    target="_blank"
                    rel="noopener"
                    className="group relative"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 5.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 animate-pulse"></div>
                    <button className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-900/80 to-purple-900/80 rounded-lg border border-pink-500/30 text-white overflow-hidden">
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 opacity-20">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={`insta-line-${i}`}
                              className="absolute h-px w-full bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"
                              style={{ top: `${i * 45 + 10}%`, left: 0 }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-pink-400 relative z-10">
                        <InstagramIcon className="h-5 w-5" />
                      </span>
                      <span className="font-medium relative z-10">
                        Instagram
                      </span>
                    </button>
                  </motion.a>
                </motion.div>

                {/* Simulated interactive terminal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 5.7 }}
                  className="mt-6 pt-3 border-t border-gray-800/40 text-sm"
                >
                  <div className="flex items-center mb-1">
                    <span className="text-green-500 mr-2">
                      rohaan@portfolio:~$
                    </span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      transition={{ delay: 6, duration: 1 }}
                      className="overflow-hidden whitespace-nowrap text-white"
                    >
                      systemctl status contact-protocol
                    </motion.span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 7.2 }}
                    className="bg-[#0a0a1a] p-2 rounded-md mt-2 text-xs overflow-auto"
                  >
                    <div className="flex">
                      <span className="text-green-400">●</span>
                      <span className="ml-2 text-cyan-300">
                        contact-protocol.service - Rohaan's Contact Management
                        System
                      </span>
                    </div>
                    <div className="ml-4 text-gray-400">
                      Loaded: loaded
                      (/etc/systemd/system/contact-protocol.service; enabled;
                      preset: enabled)
                    </div>
                    <div className="ml-4 text-gray-400">
                      Active:{" "}
                      <span className="text-green-400">active (running)</span>{" "}
                      since Tue 2025-06-03 14:23:15 AEST; 2min ago
                    </div>
                    <div className="ml-4 text-gray-400">
                      Main PID: 6789 (node)
                    </div>
                    <div className="ml-4 text-gray-400">Memory: 32.5M</div>
                    <div className="ml-4 text-gray-400">CPU: 234ms</div>
                    <div className="ml-4 text-gray-400">Tasks: 12</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 7.8 }}
                    className="mt-4 flex items-center"
                  >
                    <span className="text-green-500 mr-2">
                      rohaan@portfolio:~$
                    </span>
                    <span className="text-white flex items-center">
                      <motion.span
                        animate={{ opacity: [0, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="inline-block w-2.5 h-5 bg-blue-400"
                      ></motion.span>
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Footer with binary/circuit art */}
      <div className="w-full py-10 bg-black/70 border-t border-gray-800/30 text-center text-xs relative overflow-hidden">
        {/* Circuit pattern background */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="footer-circuit"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 25 H50 M25 0 V50"
                stroke="#8b5cf6"
                strokeWidth="0.5"
              />
              <circle cx="25" cy="25" r="1.5" fill="#8b5cf6" />
              <circle cx="0" cy="25" r="1" fill="#60a5fa" />
              <circle cx="50" cy="25" r="1" fill="#60a5fa" />
              <circle cx="25" cy="0" r="1" fill="#06b6d4" />
              <circle cx="25" cy="50" r="1" fill="#06b6d4" />
            </pattern>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#footer-circuit)"
            />
          </svg>
        </div>

        {/* Back to top interactive tech element */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-8 bottom-8 w-12 h-12 flex items-center justify-center group"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-70 transition-opacity"></div>
          <div className="absolute inset-0 rounded-full border border-purple-500/30 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`top-circle-${i}`}
                  className="absolute w-full h-0.5 bg-cyan-500/30"
                  style={{ top: `${i * 33 + 15}%` }}
                  animate={{
                    left: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="relative z-10 text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>

          {/* Animated radar ping */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-500/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.button>

        <div className="relative z-10">
          {/* Animated binary trail */}
          <div className="flex justify-center mb-2">
            <div className="relative h-6 w-80 overflow-hidden">
              <motion.div
                animate={{ x: [-50, -800] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute whitespace-nowrap font-mono text-xs text-purple-500/40"
              >
                01010010 01101111 01101000 01100001 01100001 01101110 00100000
                01000001 01101000 01101101 01100101 01100100
              </motion.div>
            </div>
          </div>

          <div className="text-gray-500 font-mono flex flex-col items-center">
            <div className="mb-1 flex items-center">
              <span className="text-blue-500/50">&lt;</span>
              <span className="mx-1">
                © 2025 Rohaan Ahmed • Full-Stack Developer • Portfolio Site
              </span>
              <span className="text-blue-500/50">/&gt;</span>
            </div>

            <div className="text-[10px] text-gray-600 mt-1">
              <span className="text-purple-500/50">const</span>{" "}
              <span className="text-blue-500/50">future</span> ={" "}
              <span className="text-green-500/50">await</span>{" "}
              <span className="text-blue-500/50">rohaan</span>.
              <span className="text-purple-500/50">createAwesomeThings</span>()
              <span className="text-gray-500">;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
