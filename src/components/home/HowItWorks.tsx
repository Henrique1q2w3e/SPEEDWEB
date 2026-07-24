import { Send, Code2, Presentation, Handshake, Rocket } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const INTAKE_STEP = {
  icon: Send,
  title: "Você conta a ideia",
  description: "Envie referências, sua identidade de marca e como você imagina o site — do seu jeito.",
};

const RISK_FREE_STEPS = [
  {
    icon: Code2,
    title: "A gente cria",
    description: "Desenvolvemos o site completo, do zero — sem cobrar nada ainda.",
  },
  {
    icon: Presentation,
    title: "Apresentamos pronto",
    description: "Você vê o site finalizado junto com o orçamento, sem surpresas.",
  },
  {
    icon: Handshake,
    title: "Você decide",
    description: "Gostou? Fechamos negócio. Não gostou? Sem custo, sem compromisso.",
  },
];

const OUTCOME_STEP = {
  icon: Rocket,
  title: "Site no ar",
  description: "Publicação otimizada, pronta para vender por você.",
};

function StepCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Send;
  title: string;
  description: string;
}) {
  return (
    <div className="flex-1">
      <Icon size={22} className="text-brand-gold" />
      <h3 className="mt-4 font-serif text-xl font-light text-ivory">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="Processo"
      title="Como Funciona"
      subtitle="Você só decide depois de ver o site pronto — sem compromisso, sem letra miúda."
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-6">
        <Reveal className="lg:w-56 lg:shrink-0">
          <StepCard {...INTAKE_STEP} />
        </Reveal>

        <Reveal delay={0.1} className="relative flex-1 border border-brand-gold/40 p-6 sm:p-8">
          <span className="absolute -top-3 left-6 bg-ink px-3 text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
            Risco zero pra você
          </span>
          <div className="grid gap-8 sm:grid-cols-3">
            {RISK_FREE_STEPS.map((step) => (
              <StepCard key={step.title} {...step} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="lg:w-56 lg:shrink-0">
          <StepCard {...OUTCOME_STEP} />
        </Reveal>
      </div>
    </Section>
  );
}
