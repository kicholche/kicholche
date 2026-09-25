"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const items = [
    ["Home", `/${locale}`], ["News", `/${locale}/news`], ["Jobs", `/${locale}/jobs`],
    ["Education", `/${locale}/news?category=education`], ["Results", `/${locale}/news?category=results`],
    ["Government", `/${locale}/news?category=government`], ["Account", `/account?locale=${locale}`]
  ];
  return <div className="mobile-menu-wrap">
    <button type="button" className="menu-toggle" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}>{open ? "✕" : "☰"}</button>
    {open && <><button className="menu-scrim" aria-label="Close menu" onClick={() => setOpen(false)}/><nav className="mobile-menu">{items.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav></>}
  </div>;
}
