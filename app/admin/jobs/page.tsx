import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { translateFields, type Locale } from "@/lib/translation";

async function createJob(f: FormData) {
 "use server";
 const s=await createClient();
 const title=String(f.get("title")||"").trim(), slug=String(f.get("slug")||"").trim();
 const source=String(f.get("source_locale")||"bn") as Locale;
 const description=String(f.get("description")||"").trim();
 if(!title||!slug||!["bn","hi","en"].includes(source)) return;
 const t=await translateFields({title,description},source);
 const {data,error}=await s.from("jobs").insert({
  slug, original_locale:source, job_type:String(f.get("job_type")||"Government Job"),
  company:String(f.get("company")||""), location:String(f.get("location")||""),
  qualification:String(f.get("qualification")||""), age_text:String(f.get("age_text")||""),
  salary_text:String(f.get("salary")||""), vacancies:f.get("vacancies")?Number(f.get("vacancies")):null,
  apply_start:f.get("apply_start")||null, apply_end:f.get("apply_end")||null,
  official_url:String(f.get("official_url")||""), status:"draft"
 }).select("id").single();
 if(error||!data) throw new Error(error?.message||"Could not create job notice");
 const rows=(Object.keys(t) as Locale[]).map(locale=>({job_id:data.id,locale,title:t[locale].title,description:t[locale].description}));
 const {error:translationError}=await s.from("job_translations").insert(rows);
 if(translationError){await s.from("jobs").delete().eq("id",data.id);throw new Error(translationError.message)}
 revalidatePath("/admin/jobs");
}
async function setStatus(f:FormData){"use server";const s=await createClient();await s.from("jobs").update({status:String(f.get("status"))}).eq("id",String(f.get("id")));revalidatePath("/admin/jobs");revalidatePath("/bn");revalidatePath("/hi");revalidatePath("/en")}
export default async function JobsAdmin(){
 const s=await createClient();
 const {data}=await s.from("jobs").select("id,slug,job_type,company,location,status,created_at,original_locale,job_translations(title,locale)").order("created_at",{ascending:false});
 return <main className="admin-page"><div className="admin-title"><small>JOB INFORMATION</small><h1>চাকরির খবর</h1><p>চাকরি আমরা দিই না—সরকারি ও private চাকরির তথ্য, আবেদন পদ্ধতি ও official link প্রকাশ করি।</p></div>
 <form action={createJob} className="admin-form"><h2>নতুন চাকরির তথ্য</h2><div className="admin-form-grid">
 <label>Source Language<select name="source_locale" defaultValue="bn"><option value="bn">বাংলা</option><option value="hi">हिन्दी</option><option value="en">English</option></select></label>
 <label>Title<input name="title" required/></label><label>Slug<input name="slug" required/></label>
 <label>Type<select name="job_type" defaultValue="Government Job"><option>Government Job</option><option>Private Job</option><option>Local Job</option><option>Internship</option><option>Exam / Admit Card</option><option>Result</option></select></label>
 <label>Company / Organisation<input name="company"/></label><label>Location<input name="location"/></label><label>Qualification<input name="qualification"/></label><label>Age Limit<input name="age_text"/></label><label>Salary / Pay<input name="salary"/></label><label>Vacancies<input name="vacancies" type="number" min="0"/></label>
 <label>Application Start<input name="apply_start" type="date"/></label><label>Application Last Date<input name="apply_end" type="date"/></label>
 <label className="wide">Official Application / Notice URL<input name="official_url" type="url" placeholder="https://official-website..." /></label>
 <label className="wide">Description / How to Apply<textarea name="description"/></label></div>
 <div className="admin-actions"><button className="admin-btn">Create Draft + Auto Translate</button></div></form>
 <table className="admin-table"><thead><tr><th>Title</th><th>Type</th><th>Organisation</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead><tbody>
 {(data||[]).map((j:any)=><tr key={j.id}><td>{j.job_translations?.find((x:any)=>x.locale===j.original_locale)?.title||j.slug}</td><td>{j.job_type}</td><td>{j.company}</td><td>{j.location}</td><td>{j.status}</td><td><form action={setStatus} style={{display:"inline"}}><input type="hidden" name="id" value={j.id}/><select name="status" defaultValue={j.status}><option>draft</option><option>review</option><option>approved</option><option>published</option><option>archived</option></select><button className="admin-btn light">Save</button></form></td></tr>)}</tbody></table></main>
}