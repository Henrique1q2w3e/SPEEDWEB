"use client";

import { useMemo, useState } from "react";
import { TEMPLATES, type TemplateCategory } from "@/lib/templates";
import { CategoryFilter } from "./CategoryFilter";
import { TemplateCard } from "./TemplateCard";
import { TemplateModal } from "./TemplateModal";

export function PortfolioExplorer() {
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [previewId, setPreviewId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (category === "all" ? TEMPLATES : TEMPLATES.filter((t) => t.category === category)),
    [category]
  );

  const previewTemplate = TEMPLATES.find((t) => t.id === previewId) ?? null;

  return (
    <div>
      <CategoryFilter active={category} onChange={setCategory} />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template, i) => (
          <TemplateCard
            key={template.id}
            template={template}
            featured={i === 0}
            onPreview={() => setPreviewId(template.id)}
          />
        ))}
      </div>

      <TemplateModal template={previewTemplate} onClose={() => setPreviewId(null)} />
    </div>
  );
}
