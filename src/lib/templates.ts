export type TemplateCategory = "business" | "ecommerce" | "service" | "fitness" | "health";

export type Template = {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  thumbnail: string;
  demoPath: string;
  accent: string;
};

export const CATEGORIES: { id: TemplateCategory | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "business", label: "Negócios" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "service", label: "Serviços" },
  { id: "fitness", label: "Fitness" },
  { id: "health", label: "Saúde" },
];

export const TEMPLATES: Template[] = [
  {
    id: "barbearia",
    title: "Barbearia Moderna",
    description: "Template completo para barbearias com sistema de agendamento",
    category: "service",
    tags: ["Agendamento", "Responsivo", "Moderno"],
    thumbnail: "/templates/imagens/barbeiro.jpg",
    demoPath: "/templates/barbearia/index.html",
    accent: "#c17d3a",
  },
  {
    id: "ecommerce",
    title: "Cafeteria Gourmet",
    description: "Template de café gourmet com cardápio completo e experiência de compra",
    category: "ecommerce",
    tags: ["Profissional", "Moderno", "Responsivo"],
    thumbnail: "/templates/imagens/interno-cafeteria.png",
    demoPath: "/templates/ecommerce/index.html",
    accent: "#c1633f",
  },
  {
    id: "institucional",
    title: "Site Institucional",
    description: "Template profissional para empresas e organizações",
    category: "business",
    tags: ["Profissional", "SEO", "Moderno"],
    thumbnail: "/templates/imagens/equipe.jpg",
    demoPath: "/templates/institucional/index.html",
    accent: "#1f7a6c",
  },
  {
    id: "suplemento",
    title: "Loja de Suplementos",
    description: "E-commerce especializado em produtos fitness e suplementos",
    category: "health",
    tags: ["E-commerce", "Pagamentos", "Responsivo"],
    thumbnail: "/templates/imagens/banner-loja-de-suplemento.jpg",
    demoPath: "/templates/suplemento/index.html",
    accent: "#2e6bff",
  },
  {
    id: "academia",
    title: "Academia Fitness",
    description: "Template completo para academias com sistema de agendamento e controle de alunos",
    category: "fitness",
    tags: ["Agendamento", "Área do Aluno", "Moderno"],
    thumbnail: "/templates/imagens/bannar-academia.jpg",
    demoPath: "/templates/academia/index.html",
    accent: "#ff3d3d",
  },
  {
    id: "coach",
    title: "Coach Fitness",
    description: "Site profissional para personal trainers com área de membros e consultoria",
    category: "fitness",
    tags: ["Área do Cliente", "Consultoria", "Fichas Online"],
    thumbnail: "/templates/imagens/professor.jpg",
    demoPath: "/templates/coach/index.html",
    accent: "#b8874a",
  },
];
