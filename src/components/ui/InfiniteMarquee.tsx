"use client";
import { motion } from "framer-motion";

const techStack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", 
  "Python", "FastAPI", "PyTorch", "Flutter", "Dart", 
  "PostgreSQL", "Supabase", "Firebase", "Git", "Docker"
];

export function InfiniteMarquee() {
  return (
    <div className="w-full overflow-hidden flex whitespace-nowrap bg-white/5 py-4 border-y border-white/10 mt-16 relative">
      {/* Fade edges */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
      
      <motion.div
        className="flex space-x-12 px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Adjust speed
        }}
      >
        {/* Double the array to make the infinite scroll seamless */}
        {[...techStack, ...techStack].map((tech, index) => (
          <span 
            key={`${tech}-${index}`}
            className="text-foreground/70 font-bold text-xl uppercase tracking-widest opacity-80 hover:opacity-100 hover:text-accent transition-colors"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
