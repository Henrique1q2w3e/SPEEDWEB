import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Template } from "@/lib/templates";

type TemplateCardProps = {
  template: Template;
  onPreview: () => void;
  featured?: boolean;
};

export function TemplateCard({ template, onPreview, featured = false }: TemplateCardProps) {
  return (
    <button
      onClick={onPreview}
      className={`group block w-full text-left ${featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden border border-ink-border ${
          featured ? "aspect-[4/3] sm:aspect-[16/11]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={template.thumbnail}
          alt={`Template ${template.title}`}
          fill
          sizes={
            featured
              ? "(min-width: 640px) 66vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <span className="absolute right-3 top-3 border border-ivory/25 bg-ink/60 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-ivory/80 backdrop-blur-sm">
          Ilustrativo
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: template.accent }}
              aria-hidden="true"
            />
            <h3 className={`font-serif font-light text-ivory ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
              {template.title}
            </h3>
          </div>
          <p className="mt-1 pl-4 text-sm text-ink-muted">{template.description}</p>
          <p className="mt-2 pl-4 text-xs uppercase tracking-[0.1em] text-ink-muted/70">
            {template.tags.join(" · ")}
          </p>
        </div>
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-ink-muted transition-colors group-hover:text-brand-gold"
        />
      </div>
    </button>
  );
}
