import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import MediaUploader from "@/components/admin/MediaUploader";

async function uploadMedia(formData: FormData) {
  "use server";
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) throw new Error("Authentication required.");
  const file = formData.get("file");
  if (!(file instanceof File) || !file.size) throw new Error("Image is required.");
  if (file.size > 3 * 1024 * 1024 || file.type !== "image/webp") throw new Error("Optimized WebP image is required and must be under 3 MB.");
  const purpose = String(formData.get("purpose") || "news_feature");
  const width = Number(formData.get("width") || 0); const height = Number(formData.get("height") || 0);
  const originalSize = Number(formData.get("originalSize") || file.size); const originalType = String(formData.get("originalType") || file.type);
  const optimizedSize = file.size; const ratio = originalSize > 0 ? Number((optimizedSize / originalSize * 100).toFixed(2)) : 100;
  const path = "uploads/" + Date.now() + "-" + crypto.randomUUID() + ".webp";
  const { error: uploadError } = await s.storage.from("media").upload(path, await file.arrayBuffer(), { contentType: "image/webp", upsert: false });
  if (uploadError) throw new Error(uploadError.message);
  const { error: dbError } = await s.from("media").insert({ storage_path: path, mime_type: "image/webp", original_mime_type: originalType, original_size: originalSize, optimized_size: optimizedSize, optimization_ratio: ratio, purpose, width: width || null, height: height || null, alt_text: String(formData.get("alt") || "").trim() || null, caption: String(formData.get("caption") || "").trim() || null, created_by: user.id });
  if (dbError) { await s.storage.from("media").remove([path]); throw new Error(dbError.message); }
  revalidatePath("/admin/media");
}
async function deleteMedia(formData: FormData) {
  "use server"; const s = await createClient(); const id = String(formData.get("id") || ""); const path = String(formData.get("path") || "");
  if (!id || !path) return; await s.storage.from("media").remove([path]); await s.from("media").delete().eq("id", id); revalidatePath("/admin/media");
}
export default async function Media() {
  const s = await createClient();
  const { data } = await s.from("media").select("id,storage_path,alt_text,caption,mime_type,width,height,purpose,original_size,optimized_size,optimization_ratio,created_at").order("created_at", { ascending: false });
  return <main className="admin-page"><div className="admin-title"><small>ASSETS</small><h1>Media Library</h1><p>Image ব্যবহারের জায়গা অনুযায়ী browser-এই resize/compress হয়ে optimized WebP হিসেবে Storage-এ যায়। Original file রাখা হয় না।</p></div>
    <MediaUploader uploadAction={uploadMedia} />
    <table className="admin-table"><thead><tr><th>Preview</th><th>Purpose</th><th>Size</th><th>Dimensions</th><th>Alt</th><th>Created</th><th>Action</th></tr></thead><tbody>
      {(data || []).map(x => { const url = s.storage.from("media").getPublicUrl(x.storage_path).data.publicUrl; return <tr key={x.id}>
        <td><img src={url} alt={x.alt_text || ""} style={{ width: 64, height: 44, objectFit: "cover", borderRadius: 6 }} /></td><td>{x.purpose || "—"}</td>
        <td>{x.optimized_size ? Math.round(x.optimized_size / 1024) + " KB" : "—"}</td><td>{x.width && x.height ? x.width + "×" + x.height : "—"}</td><td>{x.alt_text || "—"}</td>
        <td>{new Date(x.created_at).toLocaleDateString("en-IN")}</td><td><form action={deleteMedia}><input type="hidden" name="id" value={x.id} /><input type="hidden" name="path" value={x.storage_path} /><button className="admin-btn danger">Delete</button></form></td>
      </tr> })}</tbody></table></main>;
}
