import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Infrastructure Consulting | Production-Ready K8s for AI Workloads",
  description:
    "Self-host AI models on Kubernetes — deployed in weeks, not months. Architecture review, build & deploy, and managed retainer services for companies running AI at scale.",
  keywords: [
    "Kubernetes AI",
    "self-hosted LLM",
    "GPU infrastructure",
    "MLOps consulting",
    "vLLM deployment",
    "AI infrastructure",
    "K8s GPU",
  ],
  openGraph: {
    title: "AI Infrastructure Consulting | Production-Ready K8s for AI",
    description:
      "Self-host AI models on Kubernetes — deployed in weeks, not months.",
    type: "website",
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Infrastructure Consulting",
    description:
      "Self-host AI models on Kubernetes — deployed in weeks, not months.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
