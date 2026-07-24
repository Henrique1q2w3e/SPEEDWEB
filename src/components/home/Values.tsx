import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const VALUES = [
  {
    title: "Transparência",
    description: "Processos claros e comunicação direta em cada etapa do projeto.",
  },
  {
    title: "Inovação",
    description: "Buscamos constantemente novas formas de fazer melhor.",
  },
  {
    title: "Compromisso",
    description: "Comprometidos com a excelência de cada projeto.",
  },
  {
    title: "Resultados",
    description: "Focamos no que impulsiona o crescimento do seu negócio.",
  },
];

export function Values() {
  return (
    <Section eyebrow="Nossa Cultura" title="Valores" align="center">
      <div className="relative mx-auto max-w-xl">
        <div
          className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-brand-gold to-transparent"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-12">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1} className="relative flex gap-6 pl-0">
              <span className="relative z-10 mt-2 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-brand-gold bg-ink" />
              <div>
                <h3 className="font-serif text-2xl italic font-light text-brand-gold">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
