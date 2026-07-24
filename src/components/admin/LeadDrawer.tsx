"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Phone, Building2, Check } from "lucide-react";
import { useState, useTransition } from "react";
import type { Lead, LeadStatus } from "@/types/database.types";
import { changeLeadStatus, saveLeadNotes } from "@/app/actions/leads";
import { STATUS_OPTIONS } from "./LeadStatusBadge";
import { formatPrice } from "@/lib/pricing";

type LeadDrawerProps = {
  lead: Lead | null;
  onClose: () => void;
};

export function LeadDrawer({ lead, onClose }: LeadDrawerProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <AnimatePresence>
      {lead && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key={lead.id}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-ink-border bg-ink-surface p-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-light text-ivory">
                {lead.company_name}
              </h3>
              <button onClick={onClose} className="text-ink-muted hover:text-brand-gold">
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-2 text-sm text-ink-muted">
              <p className="flex items-center gap-2">
                <Building2 size={14} className="text-brand-gold" /> {lead.contact_name}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-brand-gold" />
                <a href={`mailto:${lead.email}`} className="hover:text-brand-gold">{lead.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-brand-gold" />
                <a href={`tel:${lead.phone}`} className="hover:text-brand-gold">{lead.phone}</a>
              </p>
            </div>

            <div className="mt-6">
              <span className="mb-2 block text-xs uppercase tracking-wide text-ink-muted/70">Status</span>
              <select
                defaultValue={lead.status}
                disabled={isPending}
                onChange={(e) =>
                  startTransition(() => changeLeadStatus(lead.id, e.target.value as LeadStatus))
                }
                className="w-full border border-ink-border bg-ink px-3 py-2 text-sm text-ivory focus:border-brand-gold focus:outline-none"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              <Detail label="Tipo de projeto" value={lead.project_type} />
              {lead.estimated_price != null && (
                <Detail label="Estimativa" value={formatPrice(lead.estimated_price)} />
              )}
              {lead.project_description && (
                <Detail label="Descrição do projeto" value={lead.project_description} />
              )}
              {lead.social_link && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-muted/70">
                    Redes sociais
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={
                        lead.social_link.startsWith("http")
                          ? lead.social_link
                          : `https://${lead.social_link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-gold hover:text-brand-gold-light"
                    >
                      {lead.social_link}
                    </a>
                  </dd>
                </div>
              )}
              {lead.target_audience && <Detail label="Público-alvo" value={lead.target_audience} />}
              {lead.design_preferences && (
                <Detail label="Preferências de design" value={lead.design_preferences} />
              )}
              {lead.color_scheme && <Detail label="Esquema de cores" value={lead.color_scheme} />}
              {lead.features.length > 0 && (
                <Detail label="Funcionalidades" value={lead.features.join(", ")} />
              )}
              {lead.deadline && <Detail label="Prazo" value={lead.deadline} />}
              {lead.budget_range && <Detail label="Faixa de orçamento" value={lead.budget_range} />}
              {lead.additional_info && (
                <Detail label="Informações adicionais" value={lead.additional_info} />
              )}
              <Detail label="Recebido em" value={new Date(lead.created_at).toLocaleString("pt-BR")} />
            </dl>

            <NotesField leadId={lead.id} initialValue={lead.admin_notes ?? ""} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NotesField({ leadId, initialValue }: { leadId: string; initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleBlur = () => {
    if (value === initialValue) return;
    startTransition(async () => {
      await saveLeadNotes(leadId, value);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="mt-8 border-t border-ink-border pt-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-ink-muted/70">Notas internas</span>
        {isPending && <span className="text-xs text-ink-muted">Salvando...</span>}
        {saved && !isPending && (
          <span className="flex items-center gap-1 text-xs text-brand-gold">
            <Check size={12} /> Salvo
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        rows={4}
        placeholder="Anotações visíveis só para a equipe (ex: já respondeu no WhatsApp, aguardando confirmação...)"
        className="w-full border border-ink-border bg-ink px-3 py-2.5 text-sm text-ivory placeholder:text-ink-muted/50 focus:border-brand-gold focus:outline-none"
      />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-muted/70">{label}</dt>
      <dd className="mt-1 text-ivory">{value}</dd>
    </div>
  );
}
