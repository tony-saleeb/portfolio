import { FadeIn } from "../ui/FadeIn";
import { GraduationCap, Briefcase } from "lucide-react";

const timelineData = [
  {
    type: "education",
    title: "B.Sc. in Computer Science",
    organization: "MTI University",
    date: "Expected 2026",
    description: "Focusing on software engineering, artificial intelligence, and building scalable full-stack applications. Active participant in coding competitions and hackathons.",
    icon: <GraduationCap size={20} className="text-accent" />,
  },
  {
    type: "experience",
    title: "Freelance Full-Stack Developer",
    organization: "Self-Employed",
    date: "2023 - Present",
    description: "Developing custom web and mobile applications for clients. Built everything from real-time event platforms to AI-enhanced mobile tools.",
    icon: <Briefcase size={20} className="text-accent" />,
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative border-t border-white/5 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Experience & Education</h2>
            <div className="w-20 h-1 bg-accent rounded-full"></div>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-white/10 ml-3 md:ml-0 md:pl-0">
            {timelineData.map((item, index) => (
              <FadeIn key={index} delay={index * 0.2} direction="up">
                <div className="mb-12 relative pl-8 md:pl-0 md:flex md:items-start group">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-9px] md:left-[50%] md:ml-[-9px] top-0 md:top-1 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_10px_rgba(0,191,255,0.5)]"></div>
                  
                  {/* Left Side (Date on Desktop) */}
                  <div className="md:w-1/2 md:pr-12 md:text-right md:pt-1">
                    <span className="text-accent font-semibold tracking-wide text-sm uppercase hidden md:block">
                      {item.date}
                    </span>
                  </div>

                  {/* Right Side (Content) */}
                  <div className="md:w-1/2 md:pl-12 relative">
                    {/* Icon floating next to content */}
                    <div className="absolute -left-12 top-0 md:left-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-md hidden md:flex">
                      {item.icon}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                      <span className="text-accent font-semibold tracking-wide text-sm uppercase block md:hidden mb-2">
                        {item.date}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <h4 className="text-foreground/70 font-medium mb-4">
                        {item.organization}
                      </h4>
                      <p className="text-foreground/60 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
