import type { Metadata } from "next";
import { listLeads } from "@/lib/leads";
import { LeadsDashboard } from "@/components/admin/LeadsDashboard";

export const metadata: Metadata = {
  title: "Painel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const leads = await listLeads();

  return (
    <div>
      <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
        Painel
      </span>
      <h1 className="mt-3 font-serif text-4xl font-light text-ivory">Pedidos de Orçamento</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Acompanhe e gerencie os pedidos recebidos pelo site
      </p>
      <div className="mt-10">
        <LeadsDashboard leads={leads} />
      </div>
    </div>
  );
}
