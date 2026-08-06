"use client";
import { useState } from "react";
import { FadeIn } from "../ui/FadeIn";
import { Code, Briefcase, Mail, Send, Loader2 } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/5 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Something Together</h2>
            <p className="text-xl text-foreground/70">
              Open to full-stack, mobile, and applied AI roles.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent text-background font-semibold rounded-xl hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </button>
              
              {submitStatus === "success" && (
                <p className="text-green-400 text-center text-sm mt-4">Message sent successfully!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-center text-sm mt-4">Failed to send message. Please try the email link below.</p>
              )}
            </form>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-16 flex flex-col items-center">
            <p className="text-foreground/60 mb-6 text-sm uppercase tracking-wider">Or connect directly</p>
            <div className="flex gap-8">
              <a
                href="mailto:tonysaleeb23@gmail.com"
                className="flex flex-col items-center gap-2 text-foreground/80 hover:text-accent transition-colors"
              >
                <div className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-accent/50 transition-colors">
                  <Mail size={24} />
                </div>
                <span className="text-sm font-medium">Email</span>
              </a>
              <a
                href="https://github.com/tony-saleeb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-foreground/80 hover:text-accent transition-colors"
              >
                <div className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-accent/50 transition-colors">
                  <Code size={24} />
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/antony-saleeb-2588a625a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-foreground/80 hover:text-accent transition-colors"
              >
                <div className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-accent/50 transition-colors">
                  <Briefcase size={24} />
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
