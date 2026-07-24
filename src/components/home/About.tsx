import { Reveal } from "@/components/ui/Reveal";
import { AboutScene } from "./AboutScene";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:gap-16 sm:px-10 lg:grid-cols-[1fr_0.8fr]">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
            Quem Somos
          </span>
          <p className="mt-6 font-serif text-3xl font-light leading-snug text-ivory sm:text-4xl">
            A Speedweb nasceu com uma missão clara:{" "}
            <span className="italic text-brand-gold">criar sites rápidos, modernos e eficientes</span>{" "}
            que transformam a presença digital dos nossos clientes.
          </p>
          <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              Combinamos conhecimento técnico avançado com design intuitivo para entregar
              sites que impressionam visualmente e carregam em tempo recorde.
            </p>
            <p>
              Acreditamos que um bom site deve ser rápido, responsivo e, acima de tudo,
              eficaz em converter visitantes em clientes.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="relative mx-auto aspect-square w-full max-w-xs">
          <AboutScene />
        </Reveal>
      </div>
    </section>
  );
}
