import "server-only";

export type Locale = "bn" | "hi" | "en";

const ENDPOINT = "https://api.mymemory.translated.net/get";
const CONTACT = "kicholche2026@gmail.com";

function splitUtf8(text: string, maxBytes = 450): string[] {
  const out: string[] = [];
  let current = "";
  for (const word of text.split(/(\s+)/)) {
    const next = current + word;
    if (new TextEncoder().encode(next).length > maxBytes && current.trim()) {
      out.push(current);
      current = word;
    } else current = next;
  }
  if (current) out.push(current);
  return out;
}

async function translateChunk(text: string, source: Locale, target: Locale) {
  if (!text.trim() || source === target) return text;
  const url = new URL(ENDPOINT);
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `${source}|${target}`);
  url.searchParams.set("de", CONTACT);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Translation service returned ${res.status}`);
  const data = await res.json();
  if (data?.quotaFinished) throw new Error("Translation daily limit reached");
  const value = data?.responseData?.translatedText;
  if (!value || /MYMEMORY WARNING/i.test(value)) throw new Error("Translation service returned no usable translation");
  return value as string;
}

export async function translateText(text: string, source: Locale, target: Locale) {
  if (!text.trim() || source === target) return text;
  const paragraphs = text.split(/\n\n+/);
  const translated: string[] = [];
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) { translated.push(""); continue; }
    const chunks = splitUtf8(paragraph);
    const result: string[] = [];
    for (const chunk of chunks) result.push(await translateChunk(chunk, source, target));
    translated.push(result.join(""));
  }
  return translated.join("\n\n");
}

export async function translateToAllLocales(text: string, source: Locale) {
  const targets = (["bn", "hi", "en"] as Locale[]).filter((locale) => locale !== source);
  const results = await Promise.all(targets.map(async (target) => [target, await translateText(text, source, target)] as const));
  return Object.fromEntries([[source, text], ...results]) as Record<Locale, string>;
}

export async function translateFields(fields: Record<string, string>, source: Locale) {
  const locales = ["bn", "hi", "en"] as Locale[];
  const output = {} as Record<Locale, Record<string, string>>;
  for (const locale of locales) {
    output[locale] = {};
    for (const [key, value] of Object.entries(fields)) {
      output[locale][key] = locale === source ? value : await translateText(value, source, locale);
    }
  }
  return output;
}
