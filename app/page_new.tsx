"use client";

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
} from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";

// Water Droplet Ripple Component
interface RippleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const WaterRipple = ({ children, className = "", delay = 0 }: RippleProps) => {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Water Surface Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 1.5 },
            }}
          >
            {/* Multiple concentric ripples for water effect */}
            <div className="relative">
              <div className="w-20 h-20 border-2 border-purple-400/30 rounded-full" />
              <motion.div
                className="absolute inset-0 w-20 h-20 border border-blue-400/20 rounded-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 w-20 h-20 border border-purple-300/10 rounded-full"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1.4 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <motion.div
        animate={{
          scale: isHovered ? 1.01 : 1,
          y: isHovered ? -2 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Floating particles background
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative font-inter">
      {/* Add Inter font */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
        body {
          font-family: "Inter", sans-serif;
        }
      `}</style>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Subtle mouse glow */}
      <motion.div
        className="fixed w-[600px] h-[600px] pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.03) 0%, transparent 70%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 relative">
        <WaterRipple className="w-full max-w-6xl">
          <div className="text-center space-y-8">
            {/* Main Name */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-2"
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  ROHAAN
                </span>
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-300 -mt-6">
                AHMED
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xl md:text-2xl text-purple-300 font-light tracking-wide"
            >
              Creative Developer & Digital Explorer
            </motion.p>

            {/* Location Bar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-lg"
            >
              <span>Queensland, Australia</span>
              <div className="w-1 h-1 bg-purple-400 rounded-full" />
              <a
                href="mailto:Rohaanerodasahmed@gmail.com"
                className="hover:text-purple-300 transition-colors"
              >
                Rohaanerodasahmed@gmail.com
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex justify-center gap-6 pt-8"
            >
              {[
                {
                  icon: GithubIcon,
                  href: "https://github.com/crushr3sist",
                  label: "GitHub",
                },
                {
                  icon: LinkedInIcon,
                  href: "https://www.linkedin.com/in/rohaan-erodas-ahmed/",
                  label: "LinkedIn",
                },
                {
                  icon: TwitterIcon,
                  href: "https://x.com/ronnyisethereal",
                  label: "Twitter",
                },
                {
                  icon: InstagramIcon,
                  href: "https://www.instagram.com/ronnyisalreadydead/",
                  label: "Instagram",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-400/30 hover:bg-purple-500/10 transition-all duration-300"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </WaterRipple>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-16 items-center">
            {/* Text Content */}
            <WaterRipple delay={0.1} className="md:col-span-3 space-y-8">
              <motion.h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Digital Explorer
              </motion.h2>
              <motion.p className="text-lg text-gray-300 leading-relaxed">
                I'm passionate about crafting digital experiences that push
                boundaries. Currently diving deep into Computer Science while
                building real-world applications that solve meaningful problems.
                My curiosity drives me to explore new technologies and create
                solutions that make a difference.
              </motion.p>
            </WaterRipple>

            {/* Education Card */}
            <WaterRipple delay={0.3} className="md:col-span-2">
              <div className="p-8 bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm border border-gray-800/50 rounded-3xl">
                <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                  Education
                </h3>
                <p className="text-white font-medium">
                  University of Southern Queensland
                </p>
                <p className="text-gray-400 mb-2">Bachelor of ICT</p>
                <p className="text-blue-400 font-semibold">GPA: 6.6/7.0</p>
                <p className="text-gray-500 text-sm mt-2">
                  Graduating Dec 2025
                </p>
              </div>
            </WaterRipple>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <WaterRipple
            delay={0.2}
            className="p-12 bg-gradient-to-br from-gray-900/30 to-black/20 backdrop-blur-sm border border-gray-800/30 rounded-[2rem]"
          >
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Professional Journey
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  Fullstack Engineering Intern
                </h3>
                <p className="text-purple-300 text-lg">Energy Queensland</p>
                <p className="text-gray-400">Nov 2024 – Feb 2025</p>
              </div>

              <div className="md:col-span-2 space-y-4">
                {[
                  "Led geospatial application development for electrical infrastructure",
                  "Built React/TypeScript frontend with advanced mapping",
                  "Engineered FastAPI backend with optimized data processing",
                  "Implemented 3D visualization systems for LiDAR data",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </WaterRipple>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Technical Toolkit
          </motion.h2>

          <WaterRipple delay={0.1}>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {[
                "Python",
                "JavaScript",
                "TypeScript",
                "Java",
                "C++",
                "React",
                "Next.js",
                "Tailwind",
                "Django",
                "FastAPI",
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "Docker",
                "AWS",
                "Git",
                "Linux",
                "WebSocket",
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center text-sm font-medium hover:border-purple-400/30 hover:bg-purple-500/10 transition-all cursor-pointer"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </WaterRipple>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Creative Projects
          </motion.h2>

          <div className="space-y-12">
            {[
              {
                name: "NucleiSystems",
                description: "Digital Asset Storage Platform",
                link: "https://github.com/NucleiSystems/backend_stable",
                tech: ["Python", "IPFS", "Redis", "Docker"],
                highlights: [
                  "Custom IPFS bindings",
                  "Self-managing filesystem",
                  "Multi-layer caching",
                ],
              },
              {
                name: "r3almX",
                description: "Real-Time Communications Platform",
                link: "https://github.com/crushr3sist/r3almX-backend",
                tech: ["WebSocket", "RabbitMQ", "React", "Python"],
                highlights: [
                  "High-throughput messaging",
                  "Dynamic table generation",
                  "Plugin architecture",
                ],
              },
              {
                name: "BlockFrame",
                description: "File Chunking Library",
                link: "https://github.com/crushr3sist/BlockFrame",
                tech: ["Python", "ORM", "Vector Search"],
                highlights: [
                  "Vectorized search",
                  "Façade pattern",
                  "Configurable chunking",
                ],
              },
            ].map((project, index) => (
              <WaterRipple key={project.name} delay={index * 0.1}>
                <div
                  className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:text-right" : ""}`}
                >
                  <div
                    className={`space-y-6 ${index % 2 === 1 ? "md:order-2" : ""}`}
                  >
                    <h3 className="text-3xl font-bold text-white">
                      {project.name}
                    </h3>
                    <p className="text-lg text-purple-300">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div
                      className={`flex flex-wrap gap-2 ${index % 2 === 1 ? "md:justify-end" : ""}`}
                    >
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul
                      className={`space-y-2 text-gray-300 ${index % 2 === 1 ? "md:text-right" : ""}`}
                    >
                      {project.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-3 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                        >
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                    >
                      Explore Project →
                    </motion.a>
                  </div>

                  <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="aspect-video bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 flex items-center justify-center">
                      <div className="text-6xl font-bold text-purple-400/30">
                        {project.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>
              </WaterRipple>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <WaterRipple>
            <motion.div className="space-y-12">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Let's Build Something Incredible
              </h2>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to explore new possibilities? Let's connect and create
                something amazing together.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  {
                    text: "Get In Touch",
                    href: "mailto:Rohaanerodasahmed@gmail.com",
                    gradient: "from-purple-500 to-blue-500",
                  },
                  {
                    text: "Call Me",
                    href: "tel:+61450074058",
                    gradient: "from-blue-500 to-cyan-500",
                  },
                  {
                    text: "Download Resume",
                    href: "/docs/RohaanAhmedFullstack2025.pdf",
                    gradient: "from-cyan-500 to-teal-500",
                  },
                  {
                    text: "Reference Letter",
                    href: "/docs/Reference_Ronny_Ahmed.pdf",
                    gradient: "from-teal-500 to-green-500",
                  },
                ].map((button, index) => (
                  <motion.a
                    key={button.text}
                    href={button.href}
                    target={button.href.startsWith("/") ? "_blank" : undefined}
                    download={
                      button.text.includes("Download") ? true : undefined
                    }
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-8 py-4 bg-gradient-to-r ${button.gradient} text-white font-medium rounded-xl hover:shadow-lg transition-all`}
                  >
                    {button.text}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </WaterRipple>
        </div>
      </section>

      {/* Footer */}
      <div className="h-20" />
    </div>
  );
}
