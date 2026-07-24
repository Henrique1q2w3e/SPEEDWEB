"use client";

import { useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function Field({
  label,
  icon,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  icon: ReactNode;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="group relative block">
      <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-ink-muted">
        {label}
      </span>
      <div className="flex items-center gap-3 border-b border-ink-border pb-2.5">
        <span className="text-ink-muted transition-colors group-focus-within:text-brand-gold">
          {icon}
        </span>
        <input
          type={type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-ivory outline-none placeholder:text-ink-muted/50"
          placeholder={placeholder}
        />
      </div>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brand-gold transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
    </label>
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    searchParams.get("error") === "unauthorized"
      ? "Essa conta não tem acesso ao painel administrativo."
      : ""
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push(searchParams.get("redirect") || "/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm border border-ink-border p-7 sm:p-10">
      <Field
        label="E-mail"
        icon={<Mail size={16} />}
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="voce@speedweb.com"
      />

      <div className="mt-6">
        <Field
          label="Senha"
          icon={<Lock size={16} />}
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={16} /> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center gap-2 bg-brand-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink hover:bg-brand-gold-light disabled:opacity-60"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
