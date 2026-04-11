import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { COMPANY } from "@/lib/constants";
import { FloatingButtons, FloatingWhatsApp } from "@/components/public/FloatingButtons";

export const metadata: Metadata = {
  title: `${COMPANY.name} | ${COMPANY.tagline}`,
  description: COMPANY.description,
  keywords: ["outsourced accounting", "bookkeeping", "CPA support", "financial services", "tax preparation", "payroll services"],
  openGraph: {
    title: `${COMPANY.name} | ${COMPANY.tagline}`,
    description: COMPANY.description,
    type: "website",
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page-shell min-h-screen flex flex-col">
      <Navbar />
      <main className="relative z-10 flex-1">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <FloatingButtons />
    </div>
  );
}
