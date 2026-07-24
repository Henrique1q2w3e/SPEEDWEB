import { Reveal } from "@/components/ui/Reveal";

const TECHS = ["React & Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"];

export function TechStack() {
  return (
    <section id="technologies" className="border-y border-ink-border py-14">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
            Nossa Stack
          </span>
          {TECHS.map((tech) => (
            <span key={tech} className="font-serif text-lg italic font-light text-ink-muted">
              {tech}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
