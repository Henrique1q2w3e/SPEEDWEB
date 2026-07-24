"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/site-config";
import { PackageTiers } from "./PackageTiers";
import { LeadForm, type LeadFormEstimate } from "./LeadForm";

const INFO_ITEMS = [
  { title: "Resposta Rápida", text: "Respondemos em até 24h" },
  { title: "Orçamento Grátis", text: "Sem compromisso" },
  { title: "Garantia", text: "100% de satisfação" },
];

export function BudgetAndLeadFlow() {
  const [estimate, setEstimate] = useState<LeadFormEstimate | undefined>();

  return (
    <>
      <Section
        eyebrow="Investimento"
        title="Planos para cada estágio do seu negócio"
        subtitle="Escolha a linha que mais combina com o seu projeto. Depois de entender sua necessidade, te enviamos um orçamento personalizado — sem valores genéricos."
        align="center"
      >
        <PackageTiers onSelect={setEstimate} />
      </Section>

      <section id="quote" className="border-t border-ink-border py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
              Contato
            </span>
            <h2 className="mt-4 font-serif text-4xl font-light text-ivory sm:text-5xl">
              Vamos conversar?
            </h2>
            <p className="mt-4 text-base text-ink-muted">
              Preencha o formulário e nossa equipe retorna com uma proposta
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-ink-muted">
              {INFO_ITEMS.map((item, i) => (
                <span key={item.title} className="flex items-center gap-2">
                  {i > 0 && <span className="hidden text-ink-border sm:inline">·</span>}
                  <span className="text-ivory">{item.title}</span> — {item.text}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-sm text-ink-muted">
              <span className="h-px w-8 bg-ink-border" aria-hidden="true" />
              <span>ou, se preferir</span>
              <span className="h-px w-8 bg-ink-border" aria-hidden="true" />
            </div>
            <a
              href={whatsappLink("Olá! Prefiro conversar direto por aqui sobre um orçamento de site.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-brand-gold hover:text-brand-gold-light"
            >
              <WhatsAppIcon size={16} /> Prefiro conversar pelo WhatsApp
            </a>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 text-left">
            <LeadForm estimate={estimate} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
