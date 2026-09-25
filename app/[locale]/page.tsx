import Link from "next/link";

const nav = ["খবর","চাকরি","শিক্ষা","রেজাল্ট","সরকারি আপডেট","খেলাধুলা","আবহাওয়া","জেলা","ভারত","বিশ্ব"];
const trending = ["SSC নিয়োগ ২০২৫","মাধ্যমিক ২০২৬ রুটিন","ভারত-পাকিস্তান ম্যাচ","আবহাওয়া আপডেট","চাকরির আবেদন শেষ তারিখ"];
const latest = [
  ["রাজ্য","পশ্চিমবঙ্গে আগামী ৪৮ ঘণ্টায় ভারী বৃষ্টির সম্ভাবনা, সতর্কতা জারি"],
  ["চাকরি","নতুন সরকারি নিয়োগে আবেদন শুরু, জেনে নিন যোগ্যতা ও শেষ তারিখ"],
  ["শিক্ষা","মাধ্যমিক পরীক্ষার্থীদের জন্য গুরুত্বপূর্ণ নতুন নির্দেশিকা"],
  ["দেশ","নতুন শিক্ষানীতি নিয়ে একাধিক গুরুত্বপূর্ণ আপডেট"],
];
const jobs = ["সরকারি দপ্তরে নতুন নিয়োগ", "ব্যাংকে ক্লার্ক পদে আবেদন", "উত্তরবঙ্গে ফ্রেশারদের জন্য চাকরি"];
const categories = [
  ["খবর","📰"],["চাকরি","💼"],["শিক্ষা","🎓"],["রেজাল্ট","📋"],["সরকারি","🏛️"]
];

export default function LocaleHomePage() {
  return <main className="site-shell">
    <header className="desktop-header">
      <div className="topbar">
        <Link className="brand" href="/bn"><span className="brand-mark">কি</span><span className="brand-red">চলছে</span></Link>
        <div className="search"><span>⌕</span><input placeholder="খবর, চাকরি, রেজাল্ট বা যেকোনো কিছু খুঁজুন..." /><button>খুঁজুন</button></div>
        <div className="header-actions"><button>🔔</button><button>☾</button><button>☰</button></div>
      </div>
      <nav className="main-nav">{nav.map((x,i)=><Link key={x} href={i===0?"/bn/news":"#"}>{x}</Link>)}<Link href="/ai-tools">AI Tools</Link><button>বাংলা ▾</button></nav>
    </header>

    <header className="mobile-header">
      <button className="icon-btn">☰</button><Link className="mobile-brand" href="/bn"><span>কি</span><b>চলছে</b></Link><div className="mobile-actions"><button>⌕</button><button>🔔</button></div>
    </header>

    <div className="breaking"><strong>⚡ জরুরি আপডেট</strong><span>পশ্চিমবঙ্গে আগামীকাল থেকে ভারী বৃষ্টির সম্ভাবনা — সতর্ক থাকুন</span><b>›</b></div>

    <div className="desktop-layout">
      <section className="hero-grid">
        <article className="hero-card"><div className="hero-art"><span>পশ্চিমবঙ্গ</span></div><div className="hero-copy"><small>রাজ্য · ২ ঘণ্টা আগে</small><h1>দুর্যোগপূর্ণ আবহাওয়ার বার্তা: পশ্চিমবঙ্গে আগামী ৪৮ ঘণ্টায় ভারী বৃষ্টির সম্ভাবনা</h1><p>আবহাওয়া দফতরের নতুন আপডেট ও জেলার ভিত্তিতে সতর্কতার বিস্তারিত তথ্য এক জায়গায়।</p><Link href="/article">বিস্তারিত পড়ুন →</Link></div></article>
        <aside className="latest-panel"><div className="section-head"><h2>সর্বশেষ খবর</h2><Link href="/bn/news">সব দেখুন →</Link></div>{latest.map(([tag,title])=><Link className="latest-item" href="/article" key={title}><span>{tag}</span><h3>{title}</h3><small>৩০ মিনিট আগে</small></Link>)}</aside>
      </section>

      <section className="category-strip">{categories.map(([label,icon])=><Link href="#" key={label}><i>{icon}</i><span>{label}</span></Link>)}</section>

      <section className="content-grid">
        <div className="main-column">
          <div className="section-head"><h2>আজকের ট্রেন্ডিং</h2><Link href="/bn/trending">দেখুন সব →</Link></div>
          <div className="trend-list">{trending.map((x,i)=><Link href="/article" key={x}><strong>{String(i+1).padStart(2,"0")}</strong><span>{x}</span><em>↑ Trending</em></Link>)}</div>
          <div className="section-head latest-title"><h2>লেটেস্ট নিউজ</h2><Link href="/bn/news">সব খবর →</Link></div>
          <div className="news-cards">{latest.concat(latest).map(([tag,title],i)=><article className="news-card" key={i}><div className="thumb"><span>{tag}</span></div><div><small>{tag} · ১ ঘণ্টা আগে</small><h3>{title}</h3><p>গুরুত্বপূর্ণ তথ্য, বিস্তারিত আপডেট এবং প্রয়োজনীয় লিংক এখানে পাবেন।</p></div></article>)}</div>
        </div>
        <aside className="sidebar"><div className="side-card weather"><div><small>আজকের আবহাওয়া</small><strong>☀️ 28°</strong><span>Siliguri · হালকা মেঘলা</span></div><b>আর্দ্রতা 72%</b></div><div className="side-card"><div className="section-head"><h2>চাকরির আপডেট</h2><Link href="/bn/jobs">সব →</Link></div>{jobs.map(x=><Link className="job-mini" href="/job" key={x}><b>{x}</b><span>📍 উত্তরবঙ্গ · নতুন</span></Link>)}</div><div className="side-card follow"><h2>কী চলছে-এর সাথে থাকুন</h2><p>প্রতিদিনের দরকারি আপডেট সরাসরি পান।</p><div><button>▶ YouTube</button><button>f Facebook</button></div></div></aside>
      </section>

      <section className="wide-section"><div className="section-head"><h2>শিক্ষা · রেজাল্ট · সরকারি আপডেট</h2><Link href="/bn/education">সব দেখুন →</Link></div><div className="three-cards">{["মাধ্যমিক ২০২৬: পরীক্ষার গুরুত্বপূর্ণ তথ্য","আজ প্রকাশিত নতুন সরকারি বিজ্ঞপ্তি","রেজাল্ট দেখার পদ্ধতি ও অফিসিয়াল লিংক"].map((x,i)=><article key={x}><div className="small-art">0{i+1}</div><h3>{x}</h3><p>প্রয়োজনীয় তথ্য সহজ ভাষায় এক জায়গায়।</p></article>)}</div></section>
    </div>

    <div className="mobile-layout">
      <section className="mobile-hero"><div className="mobile-art"><span>রাজ্য</span></div><div className="mobile-hero-copy"><small>২ ঘণ্টা আগে · 12.4k</small><h1>দুর্যোগপূর্ণ আবহাওয়ার বার্তা: পশ্চিমবঙ্গে আগামী ৪৮ ঘণ্টায় ভারী বৃষ্টির সম্ভাবনা</h1></div></section>
      <section className="mobile-cats">{categories.map(([label,icon])=><Link href="#" key={label}><i>{icon}</i><b>{label}</b></Link>)}</section>
      <section className="mobile-section"><div className="section-head"><h2>আজকের ট্রেন্ডিং</h2><Link href="/bn/trending">দেখুন সব →</Link></div>{trending.map((x,i)=><Link className="mobile-trend" href="/article" key={x}><strong>{i+1}</strong><span>{x}</span><em>↑ Trending</em></Link>)}</section>
      <section className="mobile-section"><div className="section-head"><h2>লেটেস্ট নিউজ</h2><Link href="/bn/news">সব →</Link></div>{latest.map(([tag,title])=><Link className="mobile-news" href="/article" key={title}><div className="mobile-thumb"><span>{tag}</span></div><div><small>{tag} · ৩০ মিনিট আগে</small><h3>{title}</h3></div></Link>)}</section>
      <section className="mobile-section mobile-jobs"><div className="section-head"><h2>চাকরির আপডেট</h2><Link href="/bn/jobs">সব →</Link></div><div className="mobile-job-grid">{jobs.map(x=><Link href="/job" key={x}><b>{x}</b><span>📍 Siliguri</span></Link>)}</div></section>
    </div>

    <footer><div className="footer-brand"><Link className="brand" href="/bn"><span className="brand-mark">কি</span><span className="brand-red">চলছে</span></Link><p>West Bengal-এর প্রতিদিনের দরকারি সব আপডেট।</p></div><div><h3>দ্রুত লিঙ্ক</h3><p>খবর · চাকরি · রেজাল্ট · শিক্ষা<br/>সরকারি আপডেট · খেলাধুলা · জেলা</p></div><div><h3>তথ্য</h3><p>আমাদের সম্পর্কে · যোগাযোগ<br/>গোপনীয়তা নীতি · ব্যবহারের শর্ত</p></div><div><h3>Follow Us</h3><p>▶ YouTube · f Facebook<br/>Instagram · X</p></div><small className="copyright">© 2026 Kicholche. All Rights Reserved.</small></footer>
    <nav className="bottom-nav"><Link href="/bn">⌂<span>Home</span></Link><Link href="/bn/news">▤<span>News</span></Link><Link href="/bn/jobs">💼<span>Jobs</span></Link><Link href="/ai-tools">✦<span>Tools</span></Link><Link href="/account">◉<span>Account</span></Link></nav>
  </main>;
}