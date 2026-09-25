"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

function getSessionId() {
  const key = "kicholche_analytics_session";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}

export default function AnalyticsTracker() {
  const lastPath = useRef("");
  useEffect(() => {
    const supabase = createClient();
    const sessionId = getSessionId();
    const send = (eventName: string, metadata: Record<string, unknown> = {}) =>
      supabase.from("analytics_events").insert({
        event_name: eventName,
        route: window.location.pathname,
        metadata: { session_id: sessionId, ...metadata },
      }).then(() => undefined);

    const path = window.location.pathname;
    if (lastPath.current !== path) {
      lastPath.current = path;
      void send("page_view", { referrer: document.referrer || null, locale: path.split("/")[1] || "bn" });
    }
    void send("visitor_heartbeat");

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a,button") as HTMLElement | null;
      if (!target) return;
      const link = target.closest("a") as HTMLAnchorElement | null;
      void send("click", {
        label: (target.textContent || "").trim().slice(0, 120),
        href: link?.getAttribute("href") || null,
        element: target.tagName.toLowerCase(),
      });
    };
    document.addEventListener("click", onClick);
    const heartbeat = window.setInterval(() => void send("visitor_heartbeat"), 60000);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearInterval(heartbeat);
    };
  }, []);
  return null;
}
