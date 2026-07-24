import { z } from "zod";

export const leadSchema = z.object({
  company_name: z.string().trim().min(2, "Informe o nome da empresa"),
  contact_name: z.string().trim().min(2, "Informe seu nome"),
  email: z.string().trim().email("E-mail inválido"),
  phone: z.string().trim().min(8, "Telefone inválido"),

  project_type: z.enum(["institucional", "ecommerce", "landing"], {
    message: "Selecione o tipo de projeto",
  }),
  project_description: z.string().trim().max(2000).optional().or(z.literal("")),
  social_link: z.string().trim().max(300).optional().or(z.literal("")),
  target_audience: z.string().trim().max(500).optional().or(z.literal("")),

  design_preferences: z.string().trim().max(500).optional().or(z.literal("")),
  color_scheme: z.string().trim().max(200).optional().or(z.literal("")),
  features: z.array(z.string()).default([]),

  deadline: z.string().trim().max(200).optional().or(z.literal("")),
  budget_range: z.string().trim().max(200).optional().or(z.literal("")),
  estimated_price: z.number().nonnegative().optional(),
  additional_info: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
