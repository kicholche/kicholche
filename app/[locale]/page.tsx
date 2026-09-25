import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";

type Locale = "bn" | "hi" | "en";
const locales: Locale[] = ["bn","hi","en"];
const copy = {
 bn:{location:"শিলিগুড়ি, পশ্চিমবঙ্গ",date:"২৫ সেপ্টেম্বর ২০২৬",today:"আজকের আপডেট",search:"খবর, চাকরি, রেজাল্ট বা যেকোনো কিছু খুঁজুন...",searchBtn:"খুঁজুন",news:"খবর",jobs:"চাকরি",education:"শিক্ষা",results:"রেজাল্ট",government:"সরকারি আপডেট",siliguri:"সিলিগুড়ি",north:"উত্তরবঙ্গ",india:"ভারত",world:"বিশ্ব",tools:"AI Tools",breaking:"ব্রেকিং নিউজ",latest:"সর্বশেষ খবর",all:"আরও দেখুন →",trending:"ট্রেন্ডিং নিউজ",weather:"শিলিগুড়ির আবহাওয়া",jobsTitle:"চাকরির আপডেট",banner:"উত্তরবঙ্গের সব খবর, এক জায়গায়",stay:"আমাদের সঙ্গে থাকুন",stayText:"প্রতিদিনের গুরুত্বপূর্ণ আপডেট মিস করবেন না।",follow:"আমাদের অনুসরণ করুন",quick:"দ্রুত লিংক",info:"তথ্য",home:"হোম",categories:"বিভাগ",account:"অ্যাকাউন্ট",read:"বিস্তারিত পড়ুন →",hours:"ঘণ্টা আগে",minutes:"মিনিট আগে",desc:"গুরুত্বপূর্ণ তথ্য, বিস্তারিত আপডেট এবং প্রয়োজনীয় লিংক এক জায়গায়।",weatherText:"হালকা মেঘলা",humidity:"আর্দ্রতা ৭২%"}, 
 hi:{location:"सिलीगुड़ी, पश्चिम बंगाल",date:"25 सितंबर 2026",today:"आज के अपडेट",search:"समाचार, नौकरी, परिणाम या कुछ भी खोजें...",searchBtn:"खोजें",news:"समाचार",jobs:"नौकरियाँ",education:"शिक्षा",results:"परिणाम",government:"सरकारी अपडेट",siliguri:"सिलीगुड़ी",north:"उत्तर बंगाल",india:"भारत",world:"विश्व",tools:"AI टूल्स",breaking:"ब्रेकिंग न्यूज़",latest:"ताज़ा खबरें",all:"और देखें →",trending:"ट्रेंडिंग न्यूज़",weather:"सिलीगुड़ी का मौसम",jobsTitle:"नौकरी अपडेट",banner:"उत्तर बंगाल की हर खबर, एक जगह",stay:"हमसे जुड़े रहें",stayText:"हर दिन के महत्वपूर्ण अपडेट न चूकें।",follow:"हमें फॉलो करें",quick:"त्वरित लिंक",info:"जानकारी",home:"होम",categories:"श्रेणियाँ",account:"खाता",read:"विस्तार से पढ़ें →",hours:"घंटे पहले",minutes:"मिनट पहले",desc:"महत्वपूर्ण जानकारी, विस्तृत अपडेट और उपयोगी लिंक एक जगह।",weatherText:"हल्के बादल",humidity:"नमी 72%"}, 
 en:{location:"Siliguri, West Bengal",date:"25 September 2026",today:"Today's updates",search:"Search news, jobs, results or anything...",searchBtn:"Search",news:"News",jobs:"Jobs",education:"Education",results:"Results",government:"Government Updates",siliguri:"Siliguri",north:"North Bengal",india:"India",world:"World",tools:"AI Tools",breaking:"BREAKING NEWS",latest:"Latest News",all:"View more →",trending:"Trending News",weather:"Siliguri Weather",jobsTitle:"Job Updates",banner:"All North Bengal news, in one place",stay:"Stay connected",stayText:"Don't miss important daily updates.",follow:"Follow Us",quick:"Quick Links",info:"Information",home:"Home",categories:"Categories",account:"Account",read:"Read full story →",hours:"hours ago",minutes:"minutes ago",desc:"Important information, detailed updates and useful links in one place.",weatherText:"Partly cloudy",humidity:"Humidity 72%"}
} as const;

const demoArticles = [
 {title:{bn:"দার্জিলিং-এ নতুন পর্যটন নীতি, আরও উন্নত হবে পর্যটক সুবিধা",hi:"दार्जिलिंग में नई पर्यटन नीति, पर्यटकों को मिलेंगी बेहतर सुविधाएं",en:"New tourism policy for Darjeeling to improve visitor facilities"},tag:{bn:"উত্তরবঙ্গ",hi:"उत्तर बंगाल",en:"North Bengal"},visual:"mountain"},
 {title:{bn:"কেন্দ্রীয় সরকারের নতুন নিয়োগ বিজ্ঞপ্তি প্রকাশ",hi:"केंद्र सरकार की नई भर्ती अधिसूचना जारी",en:"New central government recruitment notice released"},tag:{bn:"সরকারি আপডেট",hi:"सरकारी अपडेट",en:"Government"},visual:"building"},
 {title:{bn:"মাধ্যমিক পরীক্ষার ফলাফল ২০২৫ প্রকাশিত",hi:"माध्यमिक परीक्षा परिणाम 2025 जारी",en:"Madhyamik examination results 2025 published"},tag:{bn:"শিক্ষা",hi:"शिक्षा",en:"Education"},visual:"students"},
 {title:{bn:"নতুন সরকারি চাকরিতে আবেদন শুরু, জেনে নিন যোগ্যতা",hi:"नई सरकारी भर्ती के आवेदन शुरू, योग्यता जानें",en:"Applications open for a new government recruitment"},tag:{bn:"চাকরি",hi:"नौकरी",en:"Jobs"},visual:"office"},
 {title:{bn:"রেজাল্ট দেখার পদ্ধতি ও অফিসিয়াল লিংক",hi:"परिणाम देखने का तरीका और आधिकारिक लिंक",en:"How to check results and official links"},tag:{bn:"রেজাল্ট",hi:"परिणाम",en:"Results"},visual:"result"},
 {title:{bn:"শিলিগুড়িতে নতুন গুরুত্বপূর্ণ আপডেট",hi:"सिलीगुड़ी में नया महत्वपूर्ण अपडेट",en:"Important new update from Siliguri"},tag:{bn:"সিলিগুড়ি",hi:"सिलीगुड़ी",en:"Siliguri"},visual:"city"}
];
const demoJobs = [
 {title:{bn:"WB Police Constable Recruitment 2025",hi:"WB Police Constable Recruitment 2025",en:"WB Police Constable Recruitment 2025"},type:"Government Job"},
 {title:{bn:"Indian Railways Group D 2025",hi:"Indian Railways Group D 2025",en:"Indian Railways Group D 2025"},type:"Government Job"},
 {title:{bn:"SBI Clerk 2025",hi:"SBI Clerk 2025",en:"SBI Clerk 2025"},type:"Government Job"},
 {title:{bn:"TCS Recruitment 2025",hi:"TCS Recruitment 2025",en:"TCS Recruitment 2025"},type:"Private Job"}
];

function titleOf(row:any, locale:Locale){const list=row?.article_translations||row?.job_translations||[];return list.find((x:any)=>x.locale===locale)?.title||list.find((x:any)=>x.locale==="bn")?.title||list[0]?.title||row?.slug||"";}
function excerptOf(row:any, locale:Locale){const list=row?.article_translations||[];return list.find((x:any)=>x.locale===locale)?.excerpt||list.find((x:any)=>x.locale==="bn")?.excerpt||"";}
function categoryName(row:any, locale:Locale, fallback=""){const c=Array.isArray(row?.categories)?row.categories[0]:row?.categories;return c?.["name_"+locale]||c?.name_bn||fallback;}
function publicMedia(s:any, media:any, purpose:string){const item=media.find((x:any)=>x.purpose===purpose);return item?s.storage.from("media").getPublicUrl(item.storage_path).data.publicUrl:"";}
function Logo({locale}:{locale:Locale}){return <Link href={"/"+locale} className="brand"><span className="brand-mark">K</span><span className="brand-word">Kicholche</span><small>সঠিক তথ্য, সবার আগে</small></Link>;}
function Visual({kind="mountain",src,alt=""}:{kind?:string;src?:string;alt?:string}){return src?<img className="visual-img" src={src} alt={alt} loading="lazy"/>:<div className={"visual visual-"+kind} aria-hidden="true"><span/></div>;}
export default async function LocaleHomePage({params}:{params:Promise<{locale:string}>}) {
 const {locale:raw}=await params; const locale=(locales.includes(raw as Locale)?raw:"bn") as Locale; const t=copy[locale]; const prefix="/"+locale;
 const s=await createClient();
 const [{data:articles},{data:jobs},{data:media},{data:sections}]=await Promise.all([
  s.from("articles").select("id,slug,publish_at,featured,breaking,trending,featured_media_id,article_translations(title,excerpt,locale),categories(slug,name_bn,name_hi,name_en)").eq("status","published").order("publish_at",{ascending:false,nullsFirst:false}).limit(12),
  s.from("jobs").select("id,slug,job_type,location,job_translations(title,locale)").eq("status","published").order("created_at",{ascending:false}).limit(6),
  s.from("media").select("storage_path,purpose,alt_text,caption,created_at").in("purpose",["homepage","news_feature","news_thumb","trending","job"]).order("created_at",{ascending:false}),
  s.from("homepage_sections").select("section_key,enabled").order("sort_order")
 ]);
 const realArticles=articles||[]; const realJobs=jobs||[]; const mediaRows=media||[];
 const enabled=new Set((sections||[]).filter((x:any)=>x.enabled).map((x:any)=>x.section_key));
 const show=(key:string)=>!sections?.length||enabled.has(key);
 const hero=realArticles.find((x:any)=>x.featured)||realArticles[0];
 const latest=realArticles.length?realArticles.slice(0,8):demoArticles;
 const trending=realArticles.filter((x:any)=>x.trending).length?realArticles.filter((x:any)=>x.trending).slice(0,5):latest.slice(0,5);
 const jobRows=realJobs.length?realJobs:demoJobs;
 const heroMedia=hero?.featured_media_id?mediaRows.find((m:any)=>m.id===hero.featured_media_id):null;
 const heroUrl=heroMedia?s.storage.from("media").getPublicUrl(heroMedia.storage_path).data.publicUrl:publicMedia(s,mediaRows,"news_feature");
 const homepageUrl=publicMedia(s,mediaRows,"homepage"); const trendUrl=publicMedia(s,mediaRows,"trending"); const jobUrl=publicMedia(s,mediaRows,"job");
 const heroTitle=hero?titleOf(hero,locale):demoArticles[0].title[locale]; const heroExcerpt=hero?excerptOf(hero,locale):t.desc;
 const heroTag=categoryName(hero,locale,demoArticles[0].tag[locale]);
 const carouselSlides=(realArticles.length?realArticles.slice(0,6):demoArticles).map((row:any,i:number)=>{const demo=realArticles.length?null:demoArticles[i%demoArticles.length];const rowMedia=row?.featured_media_id?mediaRows.find((m:any)=>m.id===row.featured_media_id):null;const image=rowMedia?s.storage.from("media").getPublicUrl(rowMedia.storage_path).data.publicUrl:(realArticles.length?"":(i===0?homepageUrl:""));return {id:row?.id||String(i),title:titleOf(row,locale)||demo?.title[locale]||"",excerpt:excerptOf(row,locale)||t.desc,tag:categoryName(row,locale,demo?.tag[locale]||t.news),href:row?.slug?"/article?slug="+encodeURIComponent(row.slug)+"&locale="+locale:prefix+"/news",image:image||undefined,alt:rowMedia?.alt_text||titleOf(row,locale)}});
 return <main className="kc">
  <div className="topbar"><div className="topbar-inner"><span>● {t.location}</span><span>{t.date}</span><span>{t.today}</span><i/><LanguageSwitcher/><ThemeToggle/></div></div>
  <header className="desktop-header"><div className="head-main"><Logo locale={locale}/><form className="search" action="/search"><input type="hidden" name="locale" value={locale}/><input name="q" placeholder={t.search}/><button aria-label={t.searchBtn}>⌕</button></form><div className="head-actions"><Link href={prefix+"/news"}>◉</Link><Link href={"/account?locale="+locale}>♙</Link></div></div>
   <nav>{[["",t.home],["/news",t.news],["/jobs",t.jobs],["/news?category=education",t.education],["/news?category=government",t.government],["/news?category=all",t.siliguri],["/news?category=all",t.north],["/news",t.india],["/news",t.world],["/ai-tools",t.tools]].map(([href,label])=><Link href={prefix+href} key={label}>{label}</Link>)}</nav>
  </header>
  <div className="mobile-head"><MobileMenu locale={locale}/><Logo locale={locale}/><div className="mobile-actions"><ThemeToggle/><Link href={"/account?locale="+locale}>♙</Link></div><LanguageSwitcher/></div>
  <div className="mobile-search"><form action="/search"><input type="hidden" name="locale" value={locale}/><input name="q" placeholder={t.search}/><button>{t.searchBtn}</button></form></div>
  {show("breaking")&&<div className="ticker"><b>⚡ {t.breaking}</b><span>{heroTitle}</span><strong>›</strong></div>}
  <div className="wrap">
   {show("hero")&&<section className="hero"><HomeHeroCarousel slides={carouselSlides}/>
    <aside className="latest-side"><div className="section-head"><h2>{t.latest}</h2><Link href={prefix+"/news"}>{t.all}</Link></div>{latest.slice(0,4).map((row:any,i:number)=>{const title=titleOf(row,locale);const demo=realArticles.length?null:demoArticles[i];return <Link className="side-story" href={row.slug?"/article?slug="+encodeURIComponent(row.slug)+"&locale="+locale:prefix+"/news"} key={row.id||i}><Visual kind={demo?.visual||["building","students","office","result"][i]} src={!realArticles.length?undefined:(i===0?heroUrl:"")} /><div><small>{categoryName(row,locale,demo?.tag[locale])}</small><h3>{title}</h3><span>{20+i*3} {t.minutes}</span></div></Link>})}</aside>
   </section>}
   <section className="quick-grid">
    {[["latest","▣",t.latest,"blue"],["government","♜",t.government,"green"],["education","🎓",t.education,"orange"],["results","▤",t.results,"purple"],["jobs","▣",t.jobs,"teal"],["north","⌖",t.north,"red"]].map(([key,icon,label,tone])=><Link href={prefix+(key==="jobs"?"/jobs":"/news?category="+(key==="north"?"all":key))} className={"quick-card "+tone} key={key}><b>{icon}</b><span>{label}</span><small>{key==="jobs"?"নিয়োগ ও সুযোগ":key==="government"?"নোটিশ ও বিজ্ঞপ্তি":key==="education"?"পড়াশোনা ও পরীক্ষা":key==="results"?"ফলাফল ও লিংক":key==="north"?"সিলিগুড়ি ও উত্তরবঙ্গ":"সবার আগে খবর"}</small></Link>)}
   </section>
   <section className="content-grid">
    <div className="main-col">
     {show("latest")&&<><div className="section-head section-title"><h2>{t.latest}</h2><Link href={prefix+"/news"}>{t.all}</Link></div><div className="news-list">{latest.slice(0,5).map((row:any,i:number)=>{const demo=realArticles.length?null:demoArticles[i%demoArticles.length];const title=titleOf(row,locale);return <Link className="news-row" href={row.slug?"/article?slug="+encodeURIComponent(row.slug)+"&locale="+locale:prefix+"/news"} key={row.id||i}><Visual kind={demo?.visual||"city"} src={!realArticles.length?undefined:(i===0?heroUrl:"")} alt={title}/><div><small>{categoryName(row,locale,demo?.tag[locale])} · {i+2} {t.hours}</small><h3>{title}</h3><p>{realArticles.length?excerptOf(row,locale):t.desc}</p></div></Link>})}</div></>}
     {show("trending")&&<><div className="section-head section-title trending-title"><h2><span className="flame">🔥</span>{t.trending}</h2><Link href={prefix+"/trending"}>{t.all}</Link></div><div className="trending-list">{trending.map((row:any,i:number)=>{const demo=realArticles.length?null:demoArticles[i%demoArticles.length];const title=titleOf(row,locale);return <Link href={row.slug?"/article?slug="+encodeURIComponent(row.slug)+"&locale="+locale:prefix+"/trending"} className="trend-row" key={row.id||i}><b>{i+1}</b><Visual kind={demo?.visual||"city"} src={!realArticles.length?undefined:(i===0?trendUrl:"")} /><span>{title}</span><em>🔥</em></Link>})}</div></>}
    </div>
    <aside className="right-col">
     {show("weather")&&<div className="weather-card"><div><small>{t.weather}</small><b>26°C</b><span>☁️ {t.weatherText}</span></div><strong>💧<br/><small>{t.humidity}</small></strong></div>}
     {show("jobs")&&<div className="side-box"><div className="section-head"><h2>{t.jobsTitle}</h2><Link href={prefix+"/jobs"}>{t.all}</Link></div>{jobRows.slice(0,4).map((j:any,i:number)=><Link className="job-row" href={j.slug?"/job?slug="+encodeURIComponent(j.slug)+"&locale="+locale:prefix+"/jobs"} key={j.id||i}><Visual kind="building" src={!realJobs.length?undefined:jobUrl}/><div><b>{j.title?.[locale]||titleOf(j,locale)}</b><small>{j.job_type||"Government Job"} · {j.location||t.location}</small></div></Link>)}</div>}
     {show("social")&&<div className="follow-box"><h2>{t.stay}</h2><p>{t.stayText}</p><div><a href="https://www.youtube.com/" target="_blank" rel="noreferrer">▶ YouTube</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">f Facebook</a></div></div>}
    </aside>
   </section>
   {show("important-dates")&&<section className="banner" style={homepageUrl?{backgroundImage:"linear-gradient(90deg,#06264ae8,#06264a60),url('"+homepageUrl+"')"}:undefined}><div><h2>{t.banner}</h2><p>{t.desc}</p></div><Link href={prefix+"/news"}>{t.all}</Link></section>}
  </div>
  <footer><div className="footer-main"><div><Logo locale={locale}/><p>{t.desc}</p></div><div><b>{t.quick}</b><p>{t.news}<br/>{t.jobs}<br/>{t.education}<br/>{t.results}</p></div><div><b>{t.info}</b><p>{t.government}<br/>Privacy · Terms<br/>Contact</p></div><div><b>{t.follow}</b><p>YouTube · Facebook<br/>Instagram · X<br/>Telegram</p></div></div><small>© 2026 Kicholche. All Rights Reserved.</small></footer>
  <nav className="bottom-nav"><Link className="active" href={prefix}>⌂<span>{t.home}</span></Link><Link href={prefix+"/jobs"}>▣<span>{t.jobs}</span></Link><Link href={prefix+"/news"}>▤<span>{t.news}</span></Link><Link href={prefix+"/news?category=all"}>▦<span>{t.categories}</span></Link><Link href={"/account?locale="+locale}>♙<span>{t.account}</span></Link></nav>
 </main>;
}
