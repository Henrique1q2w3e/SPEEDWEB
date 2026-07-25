export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type Lead = {
  id: string;
  created_at: string;
  status: LeadStatus;

  company_name: string;
  contact_name: string;
  email: string;
  phone: string;

  project_type: string;
  project_description: string | null;
  social_link: string | null;
  target_audience: string | null;

  design_preferences: string | null;
  color_scheme: string | null;
  features: string[];

  deadline: string | null;
  budget_range: string | null;
  estimated_price: number | null;
  additional_info: string | null;

  admin_notes: string | null;
  preview_url: string | null;
};

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "created_at" | "status" | "admin_notes" | "preview_url"> &
          Partial<Pick<Lead, "status" | "admin_notes" | "preview_url">>;
        Update: Partial<Omit<Lead, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
