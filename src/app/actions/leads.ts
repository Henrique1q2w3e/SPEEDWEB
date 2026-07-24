"use server";

import { revalidatePath } from "next/cache";
import { leadSchema } from "@/lib/validations/lead";
import { insertLead, updateLeadStatus, updateLeadNotes } from "@/lib/leads";
import type { LeadStatus } from "@/types/database.types";

export type SubmitLeadState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitLead(
  _prevState: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  const raw = {
    company_name: formData.get("company_name"),
    contact_name: formData.get("contact_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    project_type: formData.get("project_type"),
    project_description: formData.get("project_description") ?? "",
    social_link: formData.get("social_link") ?? "",
    target_audience: formData.get("target_audience") ?? "",
    design_preferences: formData.get("design_preferences") ?? "",
    color_scheme: formData.get("color_scheme") ?? "",
    features: formData.getAll("features"),
    deadline: formData.get("deadline") ?? "",
    budget_range: formData.get("budget_range") ?? "",
    estimated_price: formData.get("estimated_price")
      ? Number(formData.get("estimated_price"))
      : undefined,
    additional_info: formData.get("additional_info") ?? "",
  };

  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Verifique os campos do formulário.",
    };
  }

  try {
    await insertLead(parsed.data);
    return { status: "success" };
  } catch (error) {
    console.error("submitLead insert failed:", error);
    return {
      status: "error",
      message: "Não foi possível enviar seu pedido agora. Tente novamente em instantes.",
    };
  }
}

export async function changeLeadStatus(id: string, status: LeadStatus) {
  await updateLeadStatus(id, status);
  revalidatePath("/admin");
}

export async function saveLeadNotes(id: string, adminNotes: string) {
  await updateLeadNotes(id, adminNotes);
  revalidatePath("/admin");
}
