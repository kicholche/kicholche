"use client";
import {usePathname} from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
export default function GlobalLanguageSwitcher(){const path=usePathname();if(/^\/(bn|hi|en)\/?$/.test(path))return null;return <div className="global-controls"><LanguageSwitcher/><ThemeToggle/></div>;}