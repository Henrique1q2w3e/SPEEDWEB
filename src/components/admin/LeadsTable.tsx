"use client";

import { useState } from "react";
import type { Lead } from "@/types/database.types";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { LeadDrawer } from "./LeadDrawer";
import { formatPrice } from "@/lib/pricing";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [selected, setSelected] = useState<Lead | null>(null);

  if (leads.length === 0) {
    return (
      <div className="border border-dashed border-ink-border p-16 text-center text-ink-muted">
        Nenhum pedido encontrado.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto border border-ink-border">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-ink-border text-xs uppercase tracking-[0.1em] text-ink-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Contato</th>
              <th className="px-5 py-3 font-medium">Projeto</th>
              <th className="px-5 py-3 font-medium">Estimativa</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Recebido</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelected(lead)}
                className="cursor-pointer border-b border-ink-border last:border-0 transition-colors hover:bg-ink-surface/60"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-gold/30 text-xs font-semibold text-brand-gold">
                      {initials(lead.contact_name)}
                    </span>
                    <div>
                      <p className="font-medium text-ivory">{lead.company_name}</p>
                      <p className="text-xs text-ink-muted">{lead.contact_name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-ink-muted capitalize">{lead.project_type}</td>
                <td className="px-5 py-4 text-ink-muted">
                  {lead.estimated_price != null ? formatPrice(lead.estimated_price) : "—"}
                </td>
                <td className="px-5 py-4">
                  <LeadStatusBadge status={lead.status} />
                </td>
                <td className="px-5 py-4 text-ink-muted">
                  {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LeadDrawer lead={selected} onClose={() => setSelected(null)} />
    </>
  );
}
