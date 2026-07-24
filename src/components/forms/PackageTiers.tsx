"use client";

import { Check } from "lucide-react";
import { PACKAGES, type Package } from "@/lib/packages";
import type { LeadFormEstimate } from "./LeadForm";

type PackageTiersProps = {
  onSelect?: (estimate: LeadFormEstimate) => void;
};

export function PackageTiers({ onSelect }: PackageTiersProps) {
  const handleSelect = (pkg: Package) => {
    onSelect?.({
      type: pkg.mappedType,
      pages: pkg.mappedPages,
      features: pkg.mappedFeatures,
      total: pkg.priceFrom,
      packageName: pkg.name,
    });
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {PACKAGES.map((pkg) => (
        <div
          key={pkg.id}
          className={`flex flex-col border p-8 ${
            pkg.highlighted ? "border-brand-gold" : "border-ink-border"
          }`}
        >
          {pkg.highlighted && (
            <span className="mb-4 inline-block w-fit text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold">
              Mais escolhido
            </span>
          )}
          <h3 className="font-serif text-2xl font-light text-ivory">{pkg.name}</h3>
          <p className="mt-2 text-sm text-ink-muted">{pkg.tagline}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.1em] text-ink-muted">
            Prazo estimado: {pkg.deliveryDays} dias
          </p>

          <ul className="mt-8 flex-1 space-y-3">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-ink-muted">
                <Check size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                {feature}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => handleSelect(pkg)}
            className={`mt-8 w-full py-3.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
              pkg.highlighted
                ? "bg-brand-gold text-ink hover:bg-brand-gold-light"
                : "border border-ink-border text-ivory hover:border-brand-gold hover:text-brand-gold"
            }`}
          >
            Solicitar Orçamento
          </button>
        </div>
      ))}
    </div>
  );
}
