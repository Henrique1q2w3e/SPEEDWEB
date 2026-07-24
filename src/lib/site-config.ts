export const SITE_CONFIG = {
  name: "SPEEDWEB",
  url: "https://speedweb.com.br",
  description:
    "Criação de sites profissionais, rápidos e modernos para impulsionar sua presença online.",
  email: "speedweb26@gmail.com",
  phoneDisplay: "(19) 98104-2293",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5519981042293",
  instagramUrl:
    "https://www.instagram.com/speed_web_sites?igsh=MTMzMXZ3Z2lpYnp5dQ%3D%3D&utm_source=qr",
  location: "São Paulo, SP - Brasil",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
