import { ExternalLink, Code, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TiltLogo } from "./TiltLogo";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  metric?: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  imageDisplay?: "cover" | "contain";
}

export function ProjectCard({
  slug,
  title,
  description,
  tags,
  metric,
  liveUrl,
  githubUrl,
  image,
  imageDisplay = "cover",
}: ProjectCardProps) {
  return (
    <div className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_10px_30px_rgba(0,191,255,0.15)] h-full">
      {/* Image Placeholder wrapped in Link */}
      <Link href={`/projects/${slug}`} className="block h-48 bg-gradient-to-br from-white/5 to-white/10 relative overflow-hidden shrink-0 group/img" data-cursor="hover">
        {imageDisplay === 'contain' ? (
          image && <TiltLogo src={image} alt={title} />
        ) : image ? (
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-foreground/20 font-medium">Project Preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 pointer-events-none"></div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        {metric && (
          <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold border border-accent/30 w-fit">
            {metric}
          </div>
        )}
        
        <Link href={`/projects/${slug}`} className="inline-block w-fit" data-cursor="hover">
          <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
            {title}
            <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h3>
        </Link>
        
        <p className="text-foreground/70 text-sm mb-6 flex-grow">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-white/10 text-foreground/80 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-auto">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              data-cursor="hover"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              data-cursor="hover"
            >
              <Code size={16} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
