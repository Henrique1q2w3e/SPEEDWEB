import type { Metadata } from "next";
import { ExternalLink, Clock, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { listOwnLeads } from "@/lib/leads";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/site-config";
import type { Lead, LeadStatus } from "@/types/database.types";

export const metadata: Metadata = {
  title: "Área do Cliente",
  robots: { index: false, follow: false },
};

const STATUS_COPY: Record<LeadStatus, { label: string; description: string }> = {
  new: {
    label: "Recebemos seu pedido",
    description: "Nossa equipe já está analisando os detalhes que você enviou.",
  },
  contacted: {
    label: "Em conversa com nossa equipe",
    description: "Alguém do nosso time já entrou em contato sobre o seu projeto.",
  },
  qualified: {
    label: "Preparando seu orçamento",
    description: "Estamos organizando os detalhes do seu projeto e do orçamento.",
  },
  won: {
    label: "Projeto fechado",
    description: "Seu projeto está confirmado com a gente. Obrigado pela confiança!",
  },
  lost: {
    label: "Pedido encerrado",
    description: "Esse pedido não seguiu adiante. Qualquer dúvida, é só chamar a gente.",
  },
};

export default async function ClientePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const leads = user?.email ? await listOwnLeads(user.email) : [];

  return (
    <div>
      <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
        Seus pedidos
      </span>
      <h1 className="mt-4 font-serif text-3xl font-light text-ivory sm:text-4xl">
        Acompanhe seu projeto
      </h1>

      {leads.length === 0 ? (
        <p className="mt-8 border border-ink-border p-6 text-sm text-ink-muted">
          Nenhum pedido encontrado com esse e-mail ainda. Se você acabou de enviar o formulário,
          pode levar alguns instantes para aparecer aqui.
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const status = STATUS_COPY[lead.status];

  return (
    <div className="border border-ink-border p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-light text-ivory">{lead.company_name}</h2>
          <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ink-muted">
            {lead.project_type}
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.1em] text-ink-muted">
          <Clock size={12} />
          {new Date(lead.created_at).toLocaleDateString("pt-BR")}
        </span>
      </div>

      <div className="mt-5 border-t border-ink-border pt-5">
        <p className="font-medium text-ivory">{status.label}</p>
        <p className="mt-1 text-sm text-ink-muted">{status.description}</p>
      </div>

      {lead.preview_url && (
        <a
          href={
            lead.preview_url.startsWith("http") ? lead.preview_url : `https://${lead.preview_url}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-between border border-brand-gold/40 bg-brand-gold/10 px-5 py-4 text-brand-gold transition-colors hover:bg-brand-gold/15"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles size={16} /> Seu site está pronto — ver agora
          </span>
          <ExternalLink size={16} />
        </a>
      )}

      <a
        href={whatsappLink(`Olá! Quero falar sobre o meu pedido (${lead.company_name}).`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted hover:text-brand-gold"
      >
        <WhatsAppIcon size={14} /> Falar sobre esse pedido
      </a>
    </div>
  );
}
