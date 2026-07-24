import type { LeadStatus } from "@/types/database.types";

const STATUS_META: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: "Novo", className: "border-brand-gold/50 text-brand-gold" },
  contacted: { label: "Contatado", className: "border-sky-400/40 text-sky-300" },
  qualified: { label: "Qualificado", className: "border-violet-400/40 text-violet-300" },
  won: { label: "Ganho", className: "border-emerald-400/40 text-emerald-300" },
  lost: { label: "Perdido", className: "border-ink-border text-ink-muted" },
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const meta = STATUS_META[status];
  return (
    <span className={`inline-flex items-center border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.08em] ${meta.className}`}>
      {meta.label}
    </span>
  );
}

export const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contatado" },
  { value: "qualified", label: "Qualificado" },
  { value: "won", label: "Ganho" },
  { value: "lost", label: "Perdido" },
];
