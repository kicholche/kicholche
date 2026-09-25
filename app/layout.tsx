import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/lib/analytics/tracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://kicholche.com"),
  title: { default: "Kicholche | কী চলছে", template: "%s | Kicholche" },
  description: "News, jobs, education, results, government updates and useful tools.",
  alternates: { canonical: "https://kicholche.com/bn" },
  openGraph: { title: "Kicholche | কী চলছে", description: "News, jobs, education, results, government updates and useful tools.", url: "https://kicholche.com/bn", siteName: "Kicholche", type: "website", locale: "bn_IN" },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn" suppressHydrationWarning><body><AnalyticsTracker />{children}</body></html>;
}