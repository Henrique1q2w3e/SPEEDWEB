import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const DIFFERENTIALS = [
  {
    number: "01",
    title: "Velocidade e Eficiência",
    text: "Desenvolvemos soluções rápidas, entregues no prazo e sem retrabalho.",
  },
  {
    number: "02",
    title: "Design Responsivo",
    text: "Sites que se adaptam perfeitamente a qualquer dispositivo.",
  },
  {
    number: "03",
    title: "Segurança Garantida",
    text: "Melhores práticas para proteger seu site e os dados dos seus usuários.",
  },
];

export function Differentials() {
  return (
    <Section eyebrow="Por que a Speedweb" title="O que nos diferencia">
      <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
        {DIFFERENTIALS.map((item, i) => (
          <Reveal key={item.number} delay={i * 0.1}>
            <span className="font-serif text-6xl font-light text-brand-gold/25">
              {item.number}
            </span>
            <h3 className="mt-4 font-serif text-2xl font-light text-ivory">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
