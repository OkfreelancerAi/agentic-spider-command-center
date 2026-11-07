import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Agentic Spider Command Center",
  description: "Owner-locked agentic intel + Genius Strategy — 0xF4BAaf1D85753A857Aa9C4AeBa877D7864bE48aA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
