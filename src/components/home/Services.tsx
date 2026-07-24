import { Layout, ShoppingBag, TrendingUp, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const PILLARS = [
  {
    icon: Layout,
    title: "Presença Digital",
    description:
      "Sites institucionais rápidos, com design autoral e responsivo — sua marca com a cara que ela merece.",
    items: ["Sites Institucionais", "Design Exclusivo", "100% Responsivo"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Lojas virtuais completas, prontas para vender 24 horas por dia, todos os dias da semana.",
    items: ["Catálogo & Carrinho", "Pagamentos Integrados", "Painel de Gestão"],
  },
  {
    icon: TrendingUp,
    title: "Performance & Crescimento",
    description:
      "Seu site otimizado para ser encontrado, converter visitantes e trazer clientes de volta.",
    items: ["SEO Otimizado", "Análise de Dados", "Email Marketing"],
  },
];

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="O que fazemos"
      title="Serviços"
      subtitle="Três frentes, um único objetivo: transformar sua presença digital em resultado."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.1}>
            <a
              href="#quote"
              className="group relative flex h-full flex-col overflow-hidden border border-ink-border p-10 transition-colors hover:border-brand-gold"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />

              <pillar.icon size={28} className="text-brand-gold" />

              <h3 className="mt-6 font-serif text-2xl font-light text-ivory sm:text-[1.75rem]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {pillar.items.map((item) => (
                  <li
                    key={item}
                    className="border border-ink-border px-3 py-1 text-xs text-ink-muted transition-colors group-hover:border-brand-gold/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-ivory transition-colors group-hover:text-brand-gold">
                Solicitar orçamento <ArrowUpRight size={14} />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
