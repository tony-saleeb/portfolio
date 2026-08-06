"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../ui/FadeIn";
import { ProjectCard } from "../ui/ProjectCard";
import { projectsData } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="py-24 relative border-t border-white/5 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Projects</h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
          </div>
        </FadeIn>

        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-8 mt-12"
        >
          <AnimatePresence mode="popLayout">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
