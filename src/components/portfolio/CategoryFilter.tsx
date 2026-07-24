import { CATEGORIES, type TemplateCategory } from "@/lib/templates";

type CategoryFilterProps = {
  active: TemplateCategory | "all";
  onChange: (category: TemplateCategory | "all") => void;
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="-my-2 flex flex-wrap gap-x-6 gap-y-1 border-b border-ink-border pb-6 sm:gap-x-8 sm:pb-8">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
            active === category.id ? "text-brand-gold" : "text-ink-muted hover:text-ivory"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
