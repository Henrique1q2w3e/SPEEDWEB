"use client";

import { useMemo, useState } from "react";
import type { Lead, LeadStatus } from "@/types/database.types";
import { LeadsTable } from "./LeadsTable";
import { STATUS_OPTIONS } from "./LeadStatusBadge";

type FilterValue = LeadStatus | "all";

export function LeadsDashboard({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const counts = useMemo(() => {
    const byStatus: Record<LeadStatus, number> = {
      new: 0,
      contacted: 0,
      qualified: 0,
      won: 0,
      lost: 0,
    };
    leads.forEach((lead) => {
      byStatus[lead.status] += 1;
    });
    return byStatus;
  }, [leads]);

  const stats = [
    { label: "Total", value: leads.length },
    { label: "Novos", value: counts.new },
    { label: "Em andamento", value: counts.contacted + counts.qualified },
    { label: "Ganhos", value: counts.won },
  ];

  const filtered = filter === "all" ? leads : leads.filter((lead) => lead.status === filter);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-ink-border p-5">
            <span className="font-serif text-3xl font-light text-ivory">{stat.value}</span>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-b border-ink-border pb-6">
        <button
          onClick={() => setFilter("all")}
          className={`text-xs uppercase tracking-[0.15em] transition-colors ${
            filter === "all" ? "text-brand-gold" : "text-ink-muted hover:text-ivory"
          }`}
        >
          Todos ({leads.length})
        </button>
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`text-xs uppercase tracking-[0.15em] transition-colors ${
              filter === option.value ? "text-brand-gold" : "text-ink-muted hover:text-ivory"
            }`}
          >
            {option.label} ({counts[option.value]})
          </button>
        ))}
      </div>

      <div className="mt-8">
        <LeadsTable leads={filtered} />
      </div>
    </div>
  );
}
