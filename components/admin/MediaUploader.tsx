"use client";
import { useState } from "react";
type Purpose = "news_feature" | "news_thumb" | "job" | "homepage" | "trending";
const PRESETS: Record<Purpose, { label: string; maxW: number; maxH: number; maxBytes: number }> = {
  news_feature: { label: "News featured", maxW: 1600, maxH: 900, maxBytes: 1800000 },
  news_thumb: { label: "News thumbnail", maxW: 900, maxH: 600, maxBytes: 700000 },
  job: { label: "Job / company", maxW: 1200, maxH: 900, maxBytes: 1000000 },
  homepage: { label: "Homepage / banner", maxW: 1920, maxH: 900, maxBytes: 2200000 },
  trending: { label: "Trending card", maxW: 900, maxH: 600, maxBytes: 700000 },
};
function loadImage(file: File) { return new Promise<HTMLImageElement>((resolve, reject) => { const url = URL.createObjectURL(file); const img = new Image(); img.onload = () => { URL.revokeObjectURL(url); resolve(img); }; img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image could not be read.")); }; img.src = url; }); }
async function optimize(file: File, purpose: Purpose) {
  const p = PRESETS[purpose]; const img = await loadImage(file); const scale = Math.min(1, p.maxW / img.naturalWidth, p.maxH / img.naturalHeight);
  const width = Math.max(1, Math.round(img.naturalWidth * scale)); const height = Math.max(1, Math.round(img.naturalHeight * scale)); const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Browser image processing is unavailable."); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high"; ctx.drawImage(img, 0, 0, width, height);
  let quality = 0.88; let blob: Blob | null = null;
  for (let i = 0; i < 8; i++) { blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/webp", quality)); if (!blob) throw new Error("Image compression failed."); if (blob.size <= p.maxBytes || quality <= 0.62) break; quality -= 0.04; }
  if (!blob) throw new Error("Image compression failed."); return { file: new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" }), width, height, originalSize: file.size, originalType: file.type, optimizedSize: blob.size };
}
export default function MediaUploader({ uploadAction }: { uploadAction: (formData: FormData) => Promise<void> }) {
  const [purpose, setPurpose] = useState<Purpose>("news_feature"); const [busy, setBusy] = useState(false); const [message, setMessage] = useState("");
  async function submit(formData: FormData) { const input = formData.get("file"); if (!(input instanceof File) || !input.size) return; setBusy(true); setMessage("Optimizing image…");
    try { if (!["image/jpeg", "image/png", "image/webp"].includes(input.type)) throw new Error("Please use JPG, PNG or WebP. Animated GIF is not optimized.");
      const result = await optimize(input, purpose); formData.set("file", result.file, result.file.name); formData.set("purpose", purpose); formData.set("width", String(result.width)); formData.set("height", String(result.height)); formData.set("originalSize", String(result.originalSize)); formData.set("optimizedSize", String(result.optimizedSize)); formData.set("originalType", result.originalType);
      setMessage("Uploading optimized image…"); await uploadAction(formData); setMessage("Done: " + Math.round(result.originalSize / 1024) + " KB → " + Math.round(result.optimizedSize / 1024) + " KB"); window.location.reload();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed."); } finally { setBusy(false); } }
  return <form onSubmit={e => { e.preventDefault(); void submit(new FormData(e.currentTarget)); }} className="admin-form" encType="multipart/form-data">
    <h2>Upload & auto-optimize</h2><div className="admin-form-grid"><label>Image purpose<select name="purpose" value={purpose} onChange={e => setPurpose(e.target.value as Purpose)}>{Object.entries(PRESETS).map(([key, p]) => <option key={key} value={key}>{p.label}</option>)}</select></label>
      <label className="wide">Image<input name="file" type="file" accept="image/jpeg,image/png,image/webp" required /></label><label>Alt text<input name="alt" placeholder="Accessible image description" /></label><label>Caption<input name="caption" placeholder="Optional caption" /></label></div>
    <p className="admin-muted">Original is not stored. Images are resized only when needed and converted to WebP to save storage.</p><div className="admin-actions"><button className="admin-btn" disabled={busy}>{busy ? "Processing…" : "Upload optimized image"}</button><span>{message}</span></div></form>;
}