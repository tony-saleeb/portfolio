import { FadeIn } from "../ui/FadeIn";
import { Layout, Server, Smartphone, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="text-accent mb-4" size={32} />,
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: <Server className="text-accent mb-4" size={32} />,
    skills: ["Python", "FastAPI", "Node.js", "REST APIs"],
  },
  {
    title: "Mobile",
    icon: <Smartphone className="text-accent mb-4" size={32} />,
    skills: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "Tools",
    icon: <Wrench className="text-accent mb-4" size={32} />,
    skills: ["Git", "GitHub", "Supabase", "CI/CD"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative border-t border-white/5 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Technical Skills</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto md:mx-0"></div>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <FadeIn key={category.title} delay={index * 0.1} direction="up" className="h-full">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors">
                {category.icon}
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
