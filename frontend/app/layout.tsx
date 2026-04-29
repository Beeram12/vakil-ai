import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vakil AI — Indian Legal Assistant",
  description: "Ask questions about Indian law, get cited answers with landmark judgments and actionable steps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
