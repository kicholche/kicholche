import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function login(f: FormData) {
  "use server";
  const s = await createClient();
  const locale = String(f.get("locale") || "bn");
  const email = String(f.get("email") || "").trim();
  const password = String(f.get("password") || "");
  const { error } = await s.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?locale=${locale}&error=1`);
  redirect(`/account?locale=${locale}`);
}

async function signup(f: FormData) {
  "use server";
  const s = await createClient();
  const locale = String(f.get("locale") || "bn");
  const email = String(f.get("email") || "").trim();
  const password = String(f.get("password") || "");
  const name = String(f.get("name") || "").trim();
  const { data, error } = await s.auth.signUp({ email, password, options: { data: { display_name: name } } });
  if (error) redirect(`/login?locale=${locale}&error=1`);
  if (data.session) redirect(`/account?locale=${locale}`);
  redirect(`/login?locale=${locale}&registered=1`);
}

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string; registered?: string; locale?: string }> }) {
  const p = await searchParams;
  const locale = ["bn", "hi", "en"].includes(p.locale || "") ? p.locale! : "bn";
  return <main className="placeholder-page">
    <Link href={`/${locale}`}>← Kicholche</Link>
    <h1>Account</h1>
    {p.error && <p className="auth-error">Login or registration failed. Please check your email/password or use another email.</p>}
    {p.registered && <p className="auth-success">Account created. If email confirmation is enabled, confirm your email first, then log in.</p>}
    <form action={login} className="admin-form">
      <h2>Sign in</h2><input type="hidden" name="locale" value={locale}/>
      <label>Email<input name="email" type="email" autoComplete="email" required/></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required/></label>
      <button className="admin-btn" type="submit">Log in</button>
    </form>
    <form action={signup} className="admin-form">
      <h2>Create account</h2><input type="hidden" name="locale" value={locale}/>
      <label>Name<input name="name" autoComplete="name"/></label>
      <label>Email<input name="email" type="email" autoComplete="email" required/></label>
      <label>Password<input name="password" type="password" autoComplete="new-password" minLength={6} required/></label>
      <button className="admin-btn light" type="submit">Register</button>
    </form>
  </main>;
}
