"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS } from "./nav-links";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-sm md:hidden"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="ml-auto flex h-full w-[85%] max-w-sm flex-col gap-2 overflow-y-auto border-l border-ink-border bg-ink-surface p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Fechar menu"
              className="-mr-2 mb-8 ml-auto p-2 text-ink-muted hover:text-brand-gold"
            >
              <X size={26} />
            </button>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="border-b border-ink-border py-4 font-serif text-2xl font-light text-ivory hover:text-brand-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={onClose}
              className="mt-8 inline-flex items-center justify-center bg-brand-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink"
            >
              Área do Cliente
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
