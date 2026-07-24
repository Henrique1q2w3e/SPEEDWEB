import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginScene } from "@/components/auth/LoginScene";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Área do Cliente",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative min-h-svh lg:grid lg:grid-cols-2">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-ink lg:relative lg:inset-auto lg:z-auto lg:order-2 lg:border-l lg:border-ink-border">
        <LoginScene />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(10,10,9,0.85) 0%, rgba(10,10,9,0.5) 60%, rgba(10,10,9,0.2) 100%)",
          }}
        />
        <div className="hidden lg:block">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(10,10,9,0.15) 0%, rgba(10,10,9,0.65) 75%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-10 pb-16 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-gold">
              Speedweb
            </span>
            <p className="max-w-xs font-serif text-xl font-light italic text-ivory">
              Sites que aceleram seu negócio.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 py-16 lg:order-1 lg:min-h-0">
        <Link href="/" className="mb-10">
          <Logo />
        </Link>
        <h1 className="mb-2 font-serif text-3xl font-light text-ivory">Área do Cliente</h1>
        <p className="mb-10 text-sm text-ink-muted">Acesso exclusivo para clientes Speedweb</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
