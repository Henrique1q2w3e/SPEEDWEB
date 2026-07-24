import { createClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/types/database.types";
import type { LeadInput } from "@/lib/validations/lead";

export async function insertLead(input: LeadInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    ...input,
    project_description: input.project_description || null,
    social_link: input.social_link || null,
    target_audience: input.target_audience || null,
    design_preferences: input.design_preferences || null,
    color_scheme: input.color_scheme || null,
    deadline: input.deadline || null,
    budget_range: input.budget_range || null,
    additional_info: input.additional_info || null,
    estimated_price: input.estimated_price ?? null,
  });

  if (error) throw error;
}

export async function listLeads() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function updateLeadNotes(id: string, adminNotes: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ admin_notes: adminNotes || null })
    .eq("id", id);
  if (error) throw error;
}
