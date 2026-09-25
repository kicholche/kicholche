[Reading 33 lines from start (total: 33 lines, 0 remaining)]

import Link from "next/link";

const latest = [
  ["রাজ্য","পশ্চিমবঙ্গে আগামী ৪৮ ঘণ্টায় ভারী বৃষ্টির সম্ভাবনা, সতর্কতা জারি"],
  ["চাকরি","নতুন সরকারি নিয়োগে আবেদন শুরু, জেনে নিন যোগ্যতা ও শেষ তারিখ"],
  ["শিক্ষা","মাধ্যমিক পরীক্ষার্থীদের জন্য গুরুত্বপূর্ণ নতুন নির্দেশিকা"],
  ["দেশ","নতুন শিক্ষানীতি নিয়ে একাধিক গুরুত্বপূর্ণ আপডেট"],
];
const jobs = ["SSC নিয়োগ ২০২৫","মাধ্যমিক ২০২৫ ফলাফল","ভারত-পাকিস্তান ম্যাচ","আবহাওয়া আপডেট","চাকরির আবেদনের শেষ তারিখ"];
const categories = ["খবর","চাকরি","শিক্ষা","রেজাল্ট","সরকারি"];
const lower = ["মাধ্যমিক ২০২৫: পরীক্ষার গুরুত্বপূর্ণ তথ্য","আজ প্রকাশিত নতুন সরকারি বিজ্ঞপ্তি","রেজাল্ট দেখার পদ্ধতি ও অফিসিয়াল লিংক"];

function Logo(){return <Link href="/bn" className="brand"><span className="brand-mark">কি</span><b>চলে</b></Link>;}
function Placeholder({className=""}:{className?:string}){return <div className={"photo-placeholder "+className}/>;}

export default function LocaleHomePage(){
 return <main className="kc">
  <div className="topbar"><div className="topbar-inner"><span>● Siliguri, West Bengal</span><span>২৫ সেপ্টেম্বর ২০২৬</span><span>আজকের আপডেট</span><i/><span>বাংলা</span><span>☾</span><span>☰</span></div></div>
  <header className="head"><div className="head-main"><Logo/><form className="search" action="/search"><input name="q" placeholder="খবর, চাকরি, রেজাল্ট বা যেকোনো কিছু খুঁজুন..." /><button>সার্চ</button></form><div className="head-icons"><span>🔔</span><span>☾</span><span>☰</span></div></div><nav>{["খবর","চাকরি","শিক্ষা","রেজাল্ট","সরকারি আপডেট","সিলিগুড়ি","উত্তরবঙ্গ","দেশ","ভারত","বিশ্ব","AI Tools"].map((x,i)=><Link key={x} href={i===0?"/bn/news":i===1?"/bn/jobs":"#"}>{x}</Link>)}<Link className="lang" href="#">বাংলা⌄</Link></nav></header>
  <div className="mobile-head"><button>☰</button><Logo/><div><button>☾</button><button>●</button></div></div><div className="mobile-search"><form action="/search"><input name="q" placeholder="খবর, চাকরি, অফিসিয়াল লিংক..." /><button>⌕</button></form></div>
  <div className="ticker"><b>⚡ চাকরি আপডেট</b><span>পশ্চিমবঙ্গে আগামী ৪৮ ঘণ্টায় ভারী বৃষ্টির সম্ভাবনা — সতর্ক থাকুন</span><strong>›</strong></div>
  <div className="wrap">
   <section className="hero"><article className="hero-main"><Placeholder/><div className="hero-copy"><small>রাজ্য · ২ ঘণ্টা আগে</small><h1>পশ্চিমবঙ্গে আগামী ৪৮ ঘণ্টায় ভারী বৃষ্টির সম্ভাবনা, সতর্কতা জারি</h1><p>আবহাওয়া দপ্তরের নতুন আপডেট ও জেলার ভিত্তিতে সতর্কতার বিস্তারিত তথ্য এক জায়গায়।</p><Link href="/bn/news">বিস্তারিত পড়ুন →</Link></div></article><aside><div className="aside-title"><h2>সর্বশেষ খবর</h2><Link href="/bn/news">সব দেখুন →</Link></div>{latest.map(([tag,title],i)=><Link className="aside-item" href="/bn/news" key={title}><small>{tag}</small><h3>{title}</h3><span>২০ মিনিট আগে</span></Link>)}</aside></section>
   <section className="chips">{categories.map((x,i)=><Link href="#" key={x}><span>{["▣","▰","🎓","▤","♜"][i]}</span>{x}</Link>)}</section>
   <section className="content-grid"><div className="main-col"><div className="section-head"><h2>আজকের ট্রেন্ডিং</h2><Link href="#">দেখুন সব →</Link></div><div className="trending">{jobs.map((x,i)=><Link href="/bn/news" key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span><em>↑ Trending</em></Link>)}</div><div className="section-head latest-head"><h2>লেটেস্ট নিউজ</h2><Link href="/bn/news">সব খবর →</Link></div><div className="latest-list">{[...latest,...latest].map(([tag,title],i)=><Link className="news-row" href="/bn/news" key={i}><Placeholder/><div><small>{tag} · {i+2} ঘণ্টা আগে</small><h3>{title}</h3><p>গুরুত্বপূর্ণ তথ্য, বিস্তারিত আপডেট এবং প্রয়োজনীয় লিংক এক জায়গায় পাবেন।</p></div></Link>)}</div></div>
    <aside className="right-col"><div className="weather"><small>আজকের আবহাওয়া</small><b>☀️ 28°</b><span>Siliguri · হালকা মেঘলা</span><em>আর্দ্রতা 72%</em></div><div className="side-box"><div className="side-title"><h2>চাকরির আপডেট</h2><Link href="/bn/jobs">সব →</Link></div>{jobs.slice(0,3).map(x=><Link href="/bn/jobs" key={x}><b>{x}</b><small>📍 পশ্চিমবঙ্গ · নতুন</small></Link>)}</div><div className="side-box follow"><h2>কি চলে-এ থাকুন</h2><p>প্রতিদিনের গুরুত্বপূর্ণ আপডেট মিস করবেন না।</p><div><button>▶ YouTube</button><button>f Facebook</button></div></div></aside>
   </section>
   <section className="lower"><div className="section-head"><h2>শিক্ষা · রেজাল্ট · সরকারি আপডেট</h2><Link href="#">সব দেখুন →</Link></div><div className="lower-grid">{lower.map((x,i)=><Link href="/bn/news" key={x}><div><b>0{i+1}</b></div><h3>{x}</h3><p>প্রয়োজনীয় তথ্য এবং অফিসিয়াল লিংক এক জায়গায়।</p></Link>)}</div></section>
  </div>
  <footer><div><Logo/><p>West Bengal-এর প্রতিদিনের দরকারি খবর ও আপডেট।</p></div><div><b>কুইক লিংক</b><p>খবর · চাকরি · রেজাল্ট · শিক্ষা<br/>সরকারি আপডেট · সিলিগুড়ি</p></div><div><b>তথ্য</b><p>আবহাওয়া আপডেট · যোগাযোগ<br/>গোপনীয়তা নীতি · ব্যবহারের শর্ত</p></div><div><b>Follow Us</b><p>▶ YouTube · f Facebook<br/>Instagram · X</p></div><small>© ২০২৬ Kicholche. All Rights Reserved.</small></footer>
  <nav className="bottom-nav"><Link className="active" href="/bn">⌂<span>Home</span></Link><Link href="/bn/jobs">▣<span>Jobs</span></Link><Link href="/bn/news">▤<span>News</span></Link><Link href="#">▦<span>Categories</span></Link><Link href="/account">●<span>Account</span></Link></nav>
 </main>;
}

[executed on device: DESKTOP-R4EIOQN (2c64c727-0f9e-4db1-8d42-1bcb315452e0)]