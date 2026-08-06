import { FadeIn } from "../ui/FadeIn";
import { InfiniteMarquee } from "../ui/InfiniteMarquee";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="pt-24 bg-background relative border-t border-white/5 pb-0">
      <div className="container mx-auto px-6 md:px-12 mb-24">
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                I am a Computer Science graduate (MTI University, 2026) who builds
                AI-assisted, full-stack applications — from mobile UI through backend
                infrastructure.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                I care about building things that work under real constraints, with
                real users and real data, not just in a tutorial. Whether it's
                integrating real-time syncing for multiplayer apps, leveraging AI
                for complex tasks, or architecting robust backends, I bring ideas to
                life with clean, maintainable code.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="relative aspect-square max-w-md mx-auto group">
              {/* Decorative backgrounds */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent/30 to-purple-500/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="absolute inset-0 border-2 border-accent/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <Image
                  src="/tony.jpeg"
                  alt="Antony Saleeb"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      
      {/* Infinite Scrolling Tech Marquee */}
      <InfiniteMarquee />
    </section>
  );
}
