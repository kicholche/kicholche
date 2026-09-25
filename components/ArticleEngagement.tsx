"use client";
import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";

type Props={articleId:string;locale:"bn"|"hi"|"en"};
type Counts={views:number;likes:number;shares:number};
const labels={bn:{view:"ভিউ",like:"লাইক",share:"শেয়ার"},hi:{view:"व्यू",like:"लाइक",share:"शेयर"},en:{view:"Views",like:"Like",share:"Share"}};
export default function ArticleEngagement({articleId,locale}:Props){
 const [c,setC]=useState<Counts>({views:0,likes:0,shares:0});const [liked,setLiked]=useState(false);const [busy,setBusy]=useState(false);const t=labels[locale];
 useEffect(()=>{const s=createClient();const key="kicholche-liked-"+articleId;setLiked(localStorage.getItem(key)==="1");(async()=>{const {data}=await s.from("article_engagement").select("views,likes,shares").eq("article_id",articleId).maybeSingle();if(data)setC(data as Counts);if(!sessionStorage.getItem("kicholche-viewed-"+articleId)){sessionStorage.setItem("kicholche-viewed-"+articleId,"1");const {data:next}=await s.rpc("bump_article_engagement",{p_article_id:articleId,p_metric:"views"});if(next)setC(next as Counts)}})();},[articleId]);
 async function bump(metric:"likes"|"shares"){if(busy)return;setBusy(true);const s=createClient();const {data}=await s.rpc("bump_article_engagement",{p_article_id:articleId,p_metric:metric});if(data)setC(data as Counts);setBusy(false)}
 async function like(){if(liked)return;localStorage.setItem("kicholche-liked-"+articleId,"1");setLiked(true);await bump("likes")}
 async function share(){try{if(navigator.share)await navigator.share({title:document.title,url:location.href});else{await navigator.clipboard.writeText(location.href);alert(locale==="bn"?"লিংক কপি হয়েছে":locale==="hi"?"लिंक कॉपी हो गया":"Link copied")}await bump("shares")}catch{}}
 return <div className="article-engagement"><span>👁 {c.views.toLocaleString()} {t.view}</span><button className={liked?"liked":""} onClick={like}>♥ {c.likes.toLocaleString()} {t.like}</button><button onClick={share}>↗ {c.shares.toLocaleString()} {t.share}</button></div>
}
