import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kicholche | কী চলছে",
  description: "News, jobs, education, results, government updates and useful tools.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}