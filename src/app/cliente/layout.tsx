import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { Logo } from "@/components/ui/Logo";

export default async function ClienteLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/cliente");

  return (
    <div className="min-h-dvh">
      <header className="border-b border-ink-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5 sm:px-10">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden text-xs uppercase tracking-[0.15em] text-ink-muted sm:inline">
              Área do Cliente
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.15em] text-ink-muted hover:text-brand-gold sm:flex"
            >
              <ExternalLink size={14} /> Ver site
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-ink-muted hover:text-brand-gold"
              >
                <LogOut size={14} /> Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-14 sm:px-10">{children}</main>
    </div>
  );
}
