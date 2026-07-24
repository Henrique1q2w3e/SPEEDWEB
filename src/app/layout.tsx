import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} - Criação de Sites Rápidos e Modernos`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "criação de sites",
    "desenvolvimento web",
    "sites institucionais",
    "e-commerce",
    "landing page",
    "design responsivo",
  ],
  icons: {
    icon: "/imagens/raio.png",
    apple: "/imagens/raio.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} - Criação de Sites Rápidos e Modernos`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [{ url: "/imagens/speed.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - Criação de Sites Rápidos e Modernos`,
    description: SITE_CONFIG.description,
    images: ["/imagens/speed.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink">{children}</body>
    </html>
  );
}
