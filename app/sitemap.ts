import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base="https://kicholche.com";
  const paths=["","/news","/jobs","/trending","/education","/results","/government","/weather","/sports","/business","/entertainment","/ai-tools","/account","/about","/contact","/privacy","/terms"];
  const out: MetadataRoute.Sitemap=["bn","hi","en"].flatMap(locale=>paths.map(path=>({url:base+"/"+locale+path,lastModified:new Date(),changeFrequency:"daily" as const,priority:path===""?1:.7})));
  const s=await createClient();
  const [{data:a},{data:j}]=await Promise.all([s.from("articles").select("slug,publish_at").eq("status","published"),s.from("jobs").select("slug,created_at").eq("status","published")]);
  for(const x of a||[]) for(const l of ["bn","hi","en"]) out.push({url:base+"/article?slug="+encodeURIComponent(x.slug)+"&locale="+l,lastModified:x.publish_at?new Date(x.publish_at):new Date(),changeFrequency:"daily",priority:.8});
  for(const x of j||[]) for(const l of ["bn","hi","en"]) out.push({url:base+"/job?slug="+encodeURIComponent(x.slug)+"&locale="+l,lastModified:x.created_at?new Date(x.created_at):new Date(),changeFrequency:"daily",priority:.8});
  return out;
}
