import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type EventRow = {
  event_name: string;
  route: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

function countBy(rows: EventRow[], key: (row: EventRow) => string) {
  const map = new Map<string, number>();
  for (const row of rows) {
    const value = key(row) || "(unknown)";
    map.set(value, (map.get(value) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile || !["ADMIN", "MANAGER"].includes(profile.role)) redirect("/");

  const params = await searchParams;
  const days = Math.min(Math.max(Number(params.days || 7) || 7, 1), 90);
  const start = new Date(Date.now() - days * 86400000).toISOString();
  const { data: events, error } = await supabase
    .from("analytics_events")
    .select("event_name,route,metadata,created_at")
    .gte("created_at", start)
    .order("created_at", { ascending: false })
    .limit(10000);

  if (error) throw new Error(error.message);
  const rows = (events || []) as EventRow[];
  const pageViews = rows.filter((r) => r.event_name === "page_view");
  const clicks = rows.filter((r) => r.event_name === "click");
  const heartbeats = rows.filter((r) => r.event_name === "visitor_heartbeat");
  const sessions = new Set(pageViews.map((r) => String(r.metadata?.session_id || ""))).size;
  const online = new Set(heartbeats.filter((r) => Date.now() - new Date(r.created_at).getTime() <= 5 * 60000).map((r) => String(r.metadata?.session_id || ""))).size;
  const topPages = countBy(pageViews, (r) => r.route || "/");
  const topClicks = countBy(clicks, (r) => String(r.metadata?.label || r.metadata?.href || "Unnamed"));
  const locales = countBy(pageViews, (r) => String(r.metadata?.locale || "unknown"));

  return <main className="admin-analytics">
    <div className="analytics-head">
      <div><span className="analytics-kicker">ADMIN ANALYTICS</span><h1>ট্রাফিক ও এনগেজমেন্ট</h1><p>কোন পেজ কতবার দেখা হচ্ছে এবং কোন লিংক/বাটনে বেশি ক্লিক হচ্ছে—সব এক জায়গায়।</p></div>
      <div className="analytics-filters">{[1,7,30,90].map((n)=><a className={n===days?"active":""} href={n===7?"/admin/analytics":"/admin/analytics?days="+n} key={n}>{n === 1 ? "আজ" : n+" দিন"}</a>)}</div>
    </div>
    <section className="analytics-cards">
      <article><small>Unique Visitors</small><strong>{sessions.toLocaleString("en-IN")}</strong></article>
      <article><small>Page Views</small><strong>{pageViews.length.toLocaleString("en-IN")}</strong></article>
      <article><small>Total Clicks</small><strong>{clicks.length.toLocaleString("en-IN")}</strong></article>
      <article><small>Online Now</small><strong>{online.toLocaleString("en-IN")}</strong></article>
    </section>
    <section className="analytics-grid">
      <div className="analytics-panel"><h2>সবচেয়ে বেশি দেখা পেজ</h2>{topPages.slice(0,15).map(([name,count],i)=><div className="analytics-row" key={name}><b>{i+1}</b><span>{name}</span><strong>{count}</strong></div>)}{!topPages.length&&<p>এখনও কোনো page-view data নেই।</p>}</div>
      <div className="analytics-panel"><h2>সবচেয়ে বেশি ক্লিক</h2>{topClicks.slice(0,15).map(([name,count],i)=><div className="analytics-row" key={name+"-"+i}><b>{i+1}</b><span title={name}>{name}</span><strong>{count}</strong></div>)}{!topClicks.length&&<p>এখনও কোনো click data নেই।</p>}</div>
      <div className="analytics-panel"><h2>ভাষা অনুযায়ী ট্রাফিক</h2>{locales.map(([name,count])=><div className="analytics-row" key={name}><b>•</b><span>{name}</span><strong>{count}</strong></div>)}</div>
      <div className="analytics-panel"><h2>ডাটা স্ট্যাটাস</h2><p>সময়সীমা: শেষ {days} দিন</p><p>Raw events loaded: {rows.length.toLocaleString("en-IN")}</p><p>Heartbeat: প্রতি ৬০ সেকেন্ডে। Online count: শেষ ৫ মিনিটের active sessions.</p></div>
    </section>
  </main>;
}
