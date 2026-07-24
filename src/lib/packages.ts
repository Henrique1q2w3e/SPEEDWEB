import type { FeatureId, SiteType } from "./pricing";

export type Package = {
  id: string;
  name: string;
  tagline: string;
  priceFrom: number;
  deliveryDays: number;
  highlighted?: boolean;
  features: string[];
  mappedType: SiteType;
  mappedPages: number;
  mappedFeatures: FeatureId[];
};

export const PACKAGES: Package[] = [
  {
    id: "essencial",
    name: "Essencial",
    tagline: "Landing pages e presença digital rápida",
    priceFrom: 1200,
    deliveryDays: 10,
    mappedType: "landing",
    mappedPages: 3,
    mappedFeatures: ["responsive", "form"],
    features: [
      "Até 3 páginas",
      "Design responsivo",
      "Formulário de contato",
      "Otimização SEO básica",
    ],
  },
  {
    id: "profissional",
    name: "Profissional",
    tagline: "Sites institucionais completos",
    priceFrom: 2800,
    deliveryDays: 20,
    highlighted: true,
    mappedType: "institucional",
    mappedPages: 8,
    mappedFeatures: ["responsive", "form", "blog", "seo"],
    features: [
      "Até 8 páginas",
      "Blog integrado",
      "SEO avançado + Analytics",
      "Design exclusivo",
      "Suporte por 30 dias",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "E-commerce e projetos sob medida",
    priceFrom: 4900,
    deliveryDays: 35,
    mappedType: "ecommerce",
    mappedPages: 15,
    mappedFeatures: ["responsive", "form", "seo", "analytics", "gallery"],
    features: [
      "Páginas ilimitadas",
      "Loja virtual completa",
      "Email marketing integrado",
      "Painel administrativo",
      "Suporte prioritário por 90 dias",
    ],
  },
];
