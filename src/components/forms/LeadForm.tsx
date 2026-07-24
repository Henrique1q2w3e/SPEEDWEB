"use client";

import { useActionState, useState, type ReactNode } from "react";
import { Loader2, CheckCircle2, AlertCircle, Building2, User, Mail, Phone, Link2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { submitLead, type SubmitLeadState } from "@/app/actions/leads";
import { SITE_TYPES, FEATURES, type SiteType, type FeatureId } from "@/lib/pricing";
import { whatsappLink } from "@/lib/site-config";

export type LeadFormEstimate = {
  type: SiteType | "";
  pages: number;
  features: FeatureId[];
  total: number;
  packageName?: string;
};

type LeadFormProps = {
  estimate?: LeadFormEstimate;
};

const initialState: SubmitLeadState = { status: "idle" };

const TARGET_AUDIENCE_OPTIONS = [
  "Consumidor final (B2C)",
  "Outras empresas (B2B)",
  "Público jovem",
  "Público mais maduro",
  "Classe A/B",
  "Todos os públicos",
];

export function LeadForm({ estimate }: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);
  const [projectType, setProjectType] = useState<SiteType | "">(estimate?.type ?? "");
  const [features, setFeatures] = useState<FeatureId[]>(estimate?.features ?? []);
  const [typeError, setTypeError] = useState(false);
  const [targetAudience, setTargetAudience] = useState("");

  // Sync local selection when the calculator produces a new estimate, without
  // an extra effect render pass (react.dev/learn/you-might-not-need-an-effect).
  const [syncedEstimate, setSyncedEstimate] = useState(estimate);
  if (estimate && estimate !== syncedEstimate) {
    setSyncedEstimate(estimate);
    setProjectType(estimate.type);
    setFeatures(estimate.features);
  }

  const toggleFeature = (id: FeatureId) => {
    setFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  if (state.status === "success") {
    return (
      <div className="relative isolate">
        <GoldGlow />
        <div className="relative border border-brand-gold/40 bg-ink-surface/90 p-8 text-center sm:p-12">
          <CheckCircle2 size={32} className="mx-auto text-brand-gold" />
          <h3 className="mt-5 font-serif text-3xl font-light text-ivory">
            Recebemos seu pedido!
          </h3>
          <p className="mt-3 text-ink-muted">
            Vamos analisar o que você nos contou e entraremos em contato em até 24h com um
            orçamento personalizado. Se preferir, fale com a gente agora mesmo pelo WhatsApp.
          </p>
          <a
            href={whatsappLink("Olá! Acabei de enviar um pedido de orçamento pelo site.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-gold hover:text-brand-gold-light"
          >
            <WhatsAppIcon size={16} /> Fale Conosco pelo WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate">
      <GoldGlow />
      <form
        action={formAction}
        onSubmit={(e) => {
          if (!projectType) {
            e.preventDefault();
            setTypeError(true);
            document.getElementById("project-type-group")?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }}
        className="relative border border-brand-gold/20 bg-ink-surface/90 p-6 sm:p-12"
      >
        <input type="hidden" name="estimated_price" value={estimate?.total || ""} />

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Empresa"
            name="company_name"
            required
            placeholder="Nome da sua empresa"
            icon={<Building2 size={16} />}
          />
          <Field
            label="Seu nome"
            name="contact_name"
            required
            placeholder="Como podemos te chamar"
            icon={<User size={16} />}
          />
          <Field
            label="E-mail"
            name="email"
            type="email"
            required
            placeholder="voce@email.com"
            icon={<Mail size={16} />}
          />
          <Field
            label="Telefone / WhatsApp"
            name="phone"
            required
            placeholder="(19) 90000-0000"
            icon={<Phone size={16} />}
          />
        </div>

        <div className="mt-8" id="project-type-group">
          <span className="mb-3 block text-xs uppercase tracking-[0.15em] text-ink-muted">
            Tipo de projeto *
          </span>
          <div className="grid gap-2 sm:grid-cols-3">
            {SITE_TYPES.map((option) => (
              <label
                key={option.id}
                className={`cursor-pointer border p-3 text-center text-sm transition-colors ${
                  projectType === option.id
                    ? "border-brand-gold text-brand-gold"
                    : typeError
                      ? "border-red-400/60 text-ink-muted"
                      : "border-ink-border text-ink-muted hover:border-ink-muted"
                }`}
              >
                <input
                  type="radio"
                  name="project_type"
                  value={option.id}
                  checked={projectType === option.id}
                  onChange={() => {
                    setProjectType(option.id);
                    setTypeError(false);
                  }}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
          {typeError && (
            <p className="mt-2 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle size={14} /> Selecione o tipo de projeto antes de enviar.
            </p>
          )}
        </div>

        <div className="mt-8">
          <TextArea
            label="Conte um pouco sobre o projeto"
            name="project_description"
            placeholder="O que você precisa, objetivos do site, referências..."
          />
        </div>

        <div className="mt-8">
          <Field
            label="Link das redes sociais da empresa"
            name="social_link"
            placeholder="instagram.com/suaempresa"
            icon={<Link2 size={16} />}
          />
        </div>

        <div className="mt-8">
          <span className="mb-3 block text-xs uppercase tracking-[0.15em] text-ink-muted">
            Público-alvo
          </span>
          <div className="flex flex-wrap gap-2">
            {TARGET_AUDIENCE_OPTIONS.map((option) => (
              <label
                key={option}
                className={`cursor-pointer border px-3 py-1.5 text-xs transition-colors ${
                  targetAudience === option
                    ? "border-brand-gold text-brand-gold"
                    : "border-ink-border text-ink-muted hover:border-ink-muted"
                }`}
              >
                <input
                  type="radio"
                  name="target_audience"
                  value={option}
                  checked={targetAudience === option}
                  onChange={() => setTargetAudience(option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 max-w-xs">
          <Field label="Prazo desejado" name="deadline" placeholder="Ex: 30 dias" />
        </div>

        <div className="mt-8">
          <span className="mb-3 block text-xs uppercase tracking-[0.15em] text-ink-muted">
            Funcionalidades desejadas
          </span>
          <div className="flex flex-wrap gap-2">
            {FEATURES.map((feature) => {
              const checked = features.includes(feature.id);
              return (
                <label
                  key={feature.id}
                  className={`cursor-pointer border px-3 py-1.5 text-xs transition-colors ${
                    checked ? "border-brand-gold text-brand-gold" : "border-ink-border text-ink-muted hover:border-ink-muted"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="features"
                    value={feature.id}
                    checked={checked}
                    onChange={() => toggleFeature(feature.id)}
                    className="sr-only"
                  />
                  {feature.label}
                </label>
              );
            })}
          </div>
        </div>

        {estimate?.packageName && (
          <p className="mt-6 text-sm text-brand-gold">
            Pacote de referência: {estimate.packageName}
          </p>
        )}

        {state.status === "error" && (
          <p className="mt-6 flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} /> {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-10 flex w-full items-center justify-center gap-2 bg-brand-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-brand-gold-light disabled:opacity-60"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {isPending ? "Enviando..." : "Enviar Pedido de Orçamento"}
        </button>
      </form>
    </div>
  );
}

function GoldGlow() {
  return (
    <>
      <div
        className="pointer-events-none absolute -top-8 -left-8 -z-10 h-48 w-48 rounded-full bg-brand-gold/25 blur-[56px] sm:-top-16 sm:-left-16 sm:h-64 sm:w-64 sm:blur-[64px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-10 -right-6 -z-10 h-52 w-52 rounded-full bg-brand-gold/15 blur-[64px] sm:-bottom-20 sm:-right-10 sm:h-72 sm:w-72 sm:blur-[80px]"
        aria-hidden="true"
      />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  icon?: ReactNode;
}) {
  return (
    <label className="group relative block">
      <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-ink-muted">
        {label} {required && <span className="text-brand-gold">*</span>}
      </span>
      <div className="flex items-center gap-3 border-b border-ink-border pb-2">
        {icon && (
          <span className="text-ink-muted transition-colors group-focus-within:text-brand-gold">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-ivory outline-none placeholder:text-ink-muted/50"
        />
      </div>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brand-gold transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="group relative block">
      <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-ink-muted">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        className="w-full border-b border-ink-border bg-transparent py-2 text-sm text-ivory placeholder:text-ink-muted/50 outline-none"
      />
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brand-gold transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
    </label>
  );
}
