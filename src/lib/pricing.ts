import { Building2, ShoppingCart, Rocket, Rss, Mail, Images, Search, Smartphone, LineChart } from "lucide-react";

export type SiteType = "institucional" | "ecommerce" | "landing";
export type FeatureId = "blog" | "form" | "gallery" | "seo" | "responsive" | "analytics";

export const SITE_TYPES: { id: SiteType; label: string; description: string; icon: typeof Building2 }[] = [
  { id: "institucional", label: "Institucional", description: "Site para sua empresa ou organização", icon: Building2 },
  { id: "ecommerce", label: "E-commerce", description: "Loja virtual completa", icon: ShoppingCart },
  { id: "landing", label: "Landing Page", description: "Página única para conversão", icon: Rocket },
];

export const FEATURES: { id: FeatureId; label: string; price: number; icon: typeof Rss }[] = [
  { id: "blog", label: "Blog", price: 100, icon: Rss },
  { id: "form", label: "Formulário de Contato", price: 250, icon: Mail },
  { id: "gallery", label: "Galeria de Imagens", price: 250, icon: Images },
  { id: "seo", label: "Otimização SEO", price: 100, icon: Search },
  { id: "responsive", label: "Design Responsivo", price: 100, icon: Smartphone },
  { id: "analytics", label: "Email Marketing", price: 500, icon: LineChart },
];

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
