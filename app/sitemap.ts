import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kicholche.com";
  const paths = ["","/news","/jobs","/trending","/education","/results","/government","/weather","/sports","/business","/entertainment","/ai-tools","/account","/about","/contact","/privacy","/terms"];
  return ["bn","hi","en"].flatMap(locale => paths.map(path => ({ url: base + "/" + locale + path, lastModified: new Date(), changeFrequency: "daily" as const, priority: path === "" ? 1 : .7 })));
}
