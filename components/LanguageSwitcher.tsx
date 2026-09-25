"use client";
import {useEffect,useState} from "react";
import {usePathname,useRouter} from "next/navigation";
const locales=["bn","hi","en"] as const;
const labels={bn:"বাংলা",hi:"हिन्दी",en:"English"};
export default function LanguageSwitcher(){
 const path=usePathname();const router=useRouter();const [value,setValue]=useState<"bn"|"hi"|"en">("bn");
 useEffect(()=>{const match=path.match(/^\/(bn|hi|en)(?:\/|$)/)?.[1];const q=new URLSearchParams(window.location.search).get("locale");const saved=localStorage.getItem("kicholche_locale");const current=(match||q||"bn") as "bn"|"hi"|"en";if(!match&&!q&&saved&&locales.includes(saved as any)&&path==="/"){router.replace("/"+saved);setValue(saved as any);return;}setValue(current);document.documentElement.lang=current;},[path,router]);
 function change(next:"bn"|"hi"|"en"){setValue(next);localStorage.setItem("kicholche_locale",next);document.documentElement.lang=next;const match=path.match(/^\/(bn|hi|en)(?=\/|$)/);if(match){router.push(path.replace(/^\/(bn|hi|en)(?=\/|$)/,"/"+next));return;}if(path==="/"){router.push("/"+next);return;}const params=new URLSearchParams(window.location.search);params.set("locale",next);router.push(path+"?"+params.toString());}
 return <select className="locale-switcher" value={value} onChange={e=>change(e.target.value as any)} aria-label="Change language"><option value="bn">{labels.bn}</option><option value="hi">{labels.hi}</option><option value="en">{labels.en}</option></select>;
}