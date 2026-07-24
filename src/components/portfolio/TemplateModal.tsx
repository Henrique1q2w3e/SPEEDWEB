"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Template } from "@/lib/templates";

type TemplateModalProps = {
  template: Template | null;
  onClose: () => void;
};

export function TemplateModal({ template, onClose }: TemplateModalProps) {
  return (
    <AnimatePresence>
      {template && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-surface"
          >
            <div className="flex items-center justify-between gap-4 border-b border-ink-border px-5 py-3">
              <div>
                <h3 className="font-serif text-lg font-light text-ivory">{template.title}</h3>
                <p className="text-xs text-ink-muted">Demonstração ilustrativa, não é uma empresa real</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={template.demoPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-ink-border px-4 py-2 text-sm text-ink-muted hover:border-brand-gold hover:text-brand-gold"
                >
                  <ExternalLink size={14} /> Abrir em nova aba
                </a>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="rounded-full border border-ink-border p-2 text-ink-muted hover:border-brand-gold hover:text-brand-gold"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe
              src={template.demoPath}
              title={`Preview: ${template.title}`}
              className="h-full w-full flex-1 bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
