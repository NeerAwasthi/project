import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechPulse — AI Developer & Tech Intelligence Platform",
  description: "AI-powered developer intelligence for GitHub activity and learning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-[#07111f] antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#07111f] text-slate-100">{children}
        <Toaster richColors position="top-right" theme="dark" />
      </body>
    </html>
  );
}
