import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Peça seu Orçamento",
  description: "Conte sobre o seu projeto e receba um orçamento personalizado da Speedweb.",
};

export default function OrcamentoPage() {
  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col items-center px-6 py-16 sm:py-24">
      <Link href="/" className="mb-10">
        <Logo />
      </Link>

      <div className="text-center">
        <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
          Orçamento
        </span>
        <h1 className="mt-4 font-serif text-3xl font-light text-ivory sm:text-4xl">
          Conte sobre o seu projeto
        </h1>
        <p className="mt-4 text-sm text-ink-muted sm:text-base">
          Preencha os campos abaixo e nossa equipe retorna com um orçamento personalizado
          em até 24h.
        </p>
      </div>

      <div className="mt-10 w-full text-left">
        <LeadForm />
      </div>
    </div>
  );
}
