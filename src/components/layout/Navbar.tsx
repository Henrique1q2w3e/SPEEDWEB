"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "./nav-links";
import { MobileNav } from "./MobileNav";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-ink-border bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/">
          <Logo />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-ink-muted transition-colors hover:text-brand-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className="border-b border-ivory/30 pb-0.5 text-xs font-medium uppercase tracking-[0.15em] text-ivory transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            Área do Cliente
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          className="-mr-2 p-2 text-ivory md:hidden"
        >
          <Menu size={24} />
        </button>
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
