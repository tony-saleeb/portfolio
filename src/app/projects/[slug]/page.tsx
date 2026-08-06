import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { TiltLogo } from "@/components/ui/TiltLogo";

export function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors mb-12"
          data-cursor="hover"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <FadeIn>
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground/80 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-accent text-background font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
                  data-cursor="hover"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-white/20 text-foreground font-semibold hover:bg-white/5 transition-colors flex items-center gap-2"
                  data-cursor="hover"
                >
                  <Code size={18} />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Hero Image Placeholder / Actual Image */}
        <FadeIn delay={0.2}>
          <div className="w-full h-64 md:h-96 bg-[#050505] rounded-3xl border border-white/10 mb-16 relative overflow-hidden shadow-2xl">
            {project.imageDisplay === 'contain' ? (
              project.image && <TiltLogo src={project.image} alt={project.title} />
            ) : project.image ? (
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105" 
                priority 
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-foreground/30 text-xl font-medium">Hero Image for {project.title}</span>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
              </div>
            )}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <FadeIn delay={0.3}>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {project.fullDescription}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <h2 className="text-2xl font-bold mb-4">Challenges</h2>
              <ul className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="w-2 h-2 mt-2 rounded-full bg-accent shrink-0"></span>
                    <span className="text-foreground/80 leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div className="space-y-8">
            <FadeIn delay={0.5}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-4">Architecture</h3>
                <ul className="space-y-3">
                  {project.architecture.map((item, i) => (
                    <li key={i} className="text-foreground/70 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-24 mb-16">
            <FadeIn delay={0.6}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Gallery</h2>
                <div className="flex items-center gap-2 text-foreground/50 text-sm tracking-wider uppercase">
                  <span>Scroll</span>
                  <ArrowRight size={16} className="animate-pulse" />
                </div>
              </div>
              
              <div className="flex overflow-x-auto gap-8 pb-12 pt-4 px-4 -mx-4 snap-x snap-mandatory hide-scrollbar">
                {project.gallery.map((img, i) => (
                  <div 
                    key={i} 
                    className="relative flex-none w-[75vw] sm:w-[320px] snap-center rounded-[2.5rem] overflow-hidden border-[8px] border-white/5 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:-translate-y-2 transition-all duration-500"
                  >
                    <Image 
                      src={img} 
                      alt={`${project.title} screenshot ${i + 1}`} 
                      width={600}
                      height={1200}
                      className="w-full h-auto transform group-hover:scale-[1.03] transition-transform duration-700 ease-out" 
                      sizes="(max-width: 768px) 75vw, 320px" 
                    />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </div>
  );
}
