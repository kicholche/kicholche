import Link from "next/link";

const nav = ["হোম","খবর","চাকরির খবর","শিক্ষা","সরকারি আপডেট","সিলিগুড়ি","ক্যাটাগরি"];
const latest = [
  ["Government Job","পশ্চিমবঙ্গ পুলিশ কনস্টেবল পদে নিয়োগ – আবেদন শুরু","Apr 22, 2025"],
  ["Private Job","TCS-তে বিভিন্ন পদে নিয়োগ – অনলাইনে আবেদন শুরু","Apr 21, 2025"],
  ["Education","WB Board Result 2025 – কবে প্রকাশ হবে?","Apr 21, 2025"],
  ["Local News","সিলিগুড়িতে নতুন ফ্লাইওভার নির্মাণের কাজ শুরু","Apr 20, 2025"],
];
const jobs = [
  ["পশ্চিমবঙ্গ পুলিশ কনস্টেবল নিয়োগ 2025","Government Job","West Bengal"],
  ["TCS বিভিন্ন পদে নিয়োগ 2025","Private Job","Multiple Location"],
  ["IBPS PO Recruitment 2025","Government Job","All India"],
  ["Siliguri Municipal Corporation Recruitment","Local Job","Siliguri"],
];
const categories = [
  ["Government Jobs","সরকারি চাকরি","45","▣"],
  ["Private Jobs","বেসরকারি চাকরি","32","▤"],
  ["Education","শিক্ষা ও পরীক্ষা","28","▥"],
  ["Exam / Admit Card","পরীক্ষা ও অ্যাডমিট কার্ড","18","▦"],
  ["Results","ফলাফল","16","▧"],
  ["Siliguri / North Bengal","সিলিগুড়ি ও উত্তরবঙ্গ","12","⌖"],
  ["Government Updates","সরকারি বিজ্ঞপ্তি","10","▩"],
];
const important = ["সরকারি চাকরির অফিসিয়াল ওয়েবসাইট","আবেদন করার নিয়ম (Step by Step)","চাকরির বিজ্ঞপ্তি (PDF)","Admit Card Download","Result / Merit List","সিলিগুড়ি ও উত্তরবঙ্গের খবর"];

function Logo() {
  return <Link className="k-logo" href="/bn"><span className="k-mark">K</span><span><b>Kicholche</b><small>News · Jobs · Updates</small></span></Link>;
}

export default function LocaleHomePage() {
  return <main className="site-shell">
    <div className="desktop-only top-strip"><div className="top-inner"><span>● Siliguri, West Bengal</span><span>Apr 22, 2025</span><span>আজকের আপডেট</span><span className="top-spacer"/><span>🟢 BN বাংলা</span><span>🇮🇳 HI हिन्दी</span><span>EN English⌄</span><span>☾</span><span>●</span></div></div>
    <header className="desktop-only desktop-header">
      <div className="header-main"><Logo/><form className="big-search" action="/search"><input name="q" placeholder="খবর, চাকরি, অফিসিয়াল লিংক, কিছু খুঁজুন..." /><button>⌕</button></form><div className="header-tools"><button>☀</button><button>◉</button></div></div>
      <nav className="main-nav"><div>{nav.map((x,i)=><Link className={i===0?"active":""} key={x} href={i===1?"/bn/news":i===2?"/bn/jobs":"#"}>{x}{x==="ক্যাটাগরি"?"⌄":""}</Link>)}</div><Link href="/account">● Account⌄</Link></nav>
    </header>

    <header className="mobile-only mobile-header"><button className="menu-btn">☰</button><Logo/><div><button>☼</button><button>●</button></div></header>
    <div className="mobile-only mobile-search"><form action="/search"><input name="q" placeholder="খবর, চাকরি, অফিসিয়াল লিংক..." /><button>⌕</button></form></div>

    <div className="page-wrap">
      <section className="hero-grid">
        <article className="hero-card">
          <div className="hero-image"><span className="featured">★ Featured</span><div className="hero-overlay"><h1>Siliguri-তে নতুন কর্মসংস্থানের সুযোগ – 2025 সালের বড় আপডেট</h1><p>সিলিগুড়ি ও উত্তরবঙ্গের বিভিন্ন সরকারি ও বেসরকারি চাকরির খবর, আবেদন পদ্ধতি এবং গুরুত্বপূর্ণ তারিখ সম্পর্কে বিস্তারিত জানুন।</p><Link href="/bn/news">আরও পড়ুন →</Link></div></div>
        </article>
        <aside className="hero-latest">{latest.slice(0,3).map(([tag,title,date],i)=><Link className="hero-latest-item" href="/article" key={title}><div className={"mini-art mini-"+i}>{i===0?"♛":i===1?"TCS":"▣"}</div><div><span>{tag}</span><h3>{title}</h3><small>{date}</small></div></Link>)}</aside>
      </section>

      <section className="section-block latest-section"><div className="section-title"><h2>🔥 সর্বশেষ খবর</h2><Link href="/bn/news">সব দেখুন →</Link></div><div className="latest-grid">{latest.map(([tag,title,date],i)=><Link className="latest-card" href="/article" key={title}><div className={"news-image news-"+i}><span>{tag}</span></div><h3>{title}</h3><small>{date}<b> · </b>{i+3} min read</small></Link>)}</div></section>

      <section className="lower-grid">
        <div className="section-block jobs-panel"><div className="section-title"><h2>💼 চাকরির খবর</h2><Link href="/bn/jobs">সব দেখুন →</Link></div>{jobs.map(([title,type,place])=><Link className="job-row" href="/job" key={title}><div className="job-icon">{type==="Private Job"?"T":"◉"}</div><div><h3>{title}</h3><span className={"pill "+(type==="Private Job"?"pink":"orange")}>{type}</span><span className="pill pale">{place}</span></div><small>Apr {22-jobs.indexOf([title,type,place])}, 2025</small></Link>)}</div>
        <div className="section-block links-panel"><div className="section-title"><h2>▣ গুরুত্বপূর্ণ লিংক</h2></div>{important.map(x=><Link href="#" key={x}><span>▧</span>{x}<b>›</b></Link>)}<div className="follow-box"><span>🔔</span><div><b>নতুন কোনো চাকরির খবর মিস করবেন না!</b><small>আমাদের সাথে থাকুন</small></div><button>Follow Now</button></div></div>
        <div className="section-block category-panel"><div className="section-title"><h2>❖ জনপ্রিয় ক্যাটাগরি</h2></div>{categories.map(([name,sub,count,icon])=><Link href="#" key={name}><span className="cat-icon">{icon}</span><div><b>{name}</b><small>{sub}</small></div><strong>{count}</strong></Link>)}</div>
      </section>

      <section className="mountain-banner"><div><h2>সঠিক তথ্য, সঠিক সময়</h2><p>সিলিগুড়ি, উত্তরবঙ্গ ও সারাদেশের দরকারি খবর এক জায়গায়।</p><Link href="/bn/news">Explore All Categories →</Link></div></section>
    </div>

    <footer className="desktop-only footer"><div><Logo/><p>সঠিক তথ্য, সঠিক সময়।<br/>সিলিগুড়ি, উত্তরবঙ্গ ও সারাদেশের দরকারি খবর।</p></div><div><b>Quick Links</b><p>About Us<br/>Contact<br/>Privacy Policy<br/>Terms & Conditions</p></div><div><b>Follow Us</b><p>● Facebook &nbsp; ● YouTube &nbsp; ● Instagram</p></div><div><b>Stay Connected</b><p>Get latest updates in your inbox</p><div className="subscribe"><input placeholder="Enter your email"/><button>Subscribe</button></div></div><small>© 2025 Kicholche. All rights reserved.</small></footer>

    <section className="mobile-only mobile-content">
      <div className="mobile-hero"><div className="hero-image"><span className="featured">★ Featured</span><div className="hero-overlay"><h1>Siliguri-তে নতুন কর্মসংস্থানের সুযোগ – 2025 সালের বড় আপডেট</h1><p>সিলিগুড়ি ও উত্তরবঙ্গের বিভিন্ন সরকারি ও বেসরকারি চাকরির খবর, আবেদন পদ্ধতি এবং গুরুত্বপূর্ণ তারিখ সম্পর্কে বিস্তারিত জানুন।</p><Link href="/bn/news">আরও পড়ুন →</Link></div></div></div>
      <section className="mobile-section"><div className="section-title"><h2>🔥 সর্বশেষ খবর</h2><Link href="/bn/news">সব দেখুন →</Link></div>{latest.map(([tag,title,date],i)=><Link className="mobile-news-row" href="/article" key={title}><div className={"news-image news-"+i}/><div><span>{tag}</span><h3>{title}</h3><small>{date} · {i+3} min read</small></div></Link>)}</section>
      <section className="mobile-section"><div className="section-title"><h2>💼 চাকরির খবর</h2><Link href="/bn/jobs">সব দেখুন →</Link></div>{jobs.slice(0,3).map(([title,type,place])=><Link className="job-row" href="/job" key={title}><div className="job-icon">{type==="Private Job"?"T":"◉"}</div><div><h3>{title}</h3><span className={"pill "+(type==="Private Job"?"pink":"orange")}>{type}</span><span className="pill pale">{place}</span></div></Link>)}</section>
    </section>
    <nav className="mobile-only bottom-nav"><Link className="active" href="/bn">⌂<span>Home</span></Link><Link href="/bn/jobs">▣<span>Jobs</span></Link><Link href="/bn/news">▤<span>News</span></Link><Link href="#">▦<span>Categories</span></Link><Link href="/account">●<span>Account</span></Link></nav>
  </main>;
}