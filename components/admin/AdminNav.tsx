import Link from "next/link";
const items=[['/admin/dashboard','Dashboard'],['/admin/analytics','Analytics'],['/admin/posts','News'],['/admin/jobs','Jobs'],['/admin/categories','Categories'],['/admin/homepage','Homepage'],['/admin/media','Media'],['/admin/users','Users'],['/admin/settings','Settings']];
export default function AdminNav(){return <aside className="admin-nav">{items.map(([href,label])=><Link href={href} key={href}>{label}</Link>)}<Link href="/bn">← Website</Link></aside>}
