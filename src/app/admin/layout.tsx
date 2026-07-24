import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { isAdminEmail } from "@/lib/admin";
import { Logo } from "@/components/ui/Logo";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/admin");

  if (!isAdminEmail(user.email)) {
    await supabase.auth.signOut();
    redirect("/login?error=unauthorized");
  }

  return (
    <div className="min-h-dvh">
      <header className="border-b border-ink-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden text-xs uppercase tracking-[0.15em] text-ink-muted sm:inline">
              Painel Admin
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.15em] text-ink-muted hover:text-brand-gold sm:flex"
            >
              <ExternalLink size={14} /> Ver site
            </Link>
            <span className="hidden text-sm text-ink-muted lg:inline">{user.email}</span>
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
      <main className="mx-auto max-w-6xl px-6 py-14 sm:px-10">{children}</main>
    </div>
  );
}
