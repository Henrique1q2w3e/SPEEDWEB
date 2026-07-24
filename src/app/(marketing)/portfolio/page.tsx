import type { Metadata } from "next";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Portfólio de Templates",
  description: "Explore nossa coleção de templates modernos para diferentes tipos de negócios.",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-40 sm:px-10 sm:pt-48">
      <Reveal className="mb-16 max-w-2xl">
        <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
          Portfólio
        </span>
        <h1 className="mt-4 font-serif text-5xl font-light leading-tight text-ivory sm:text-6xl">
          {TEMPLATES.length} modelos, {TEMPLATES.length} identidades <em className="text-brand-gold not-italic">diferentes</em>
        </h1>
        <p className="mt-5 text-lg text-ink-muted">
          Nada de layout genérico reaproveitado — cada projeto abaixo foi pensado com paleta,
          tipografia e composição próprias para o negócio que representa.
        </p>
        <p className="mt-4 text-sm text-ink-muted/70">
          Atenção: os sites abaixo são demonstrações meramente ilustrativas, criadas para fins
          de portfólio — nomes, marcas e dados exibidos não pertencem a empresas reais.
        </p>
      </Reveal>

      <PortfolioExplorer />
    </div>
  );
}
