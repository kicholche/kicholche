"use client";
import {useState} from "react";
import Link from "next/link";
export type NotificationItem={id:string;title:string;href:string;type:string};
export default function NotificationBell({items,locale}:{items:NotificationItem[];locale:string}){
 const [open,setOpen]=useState(false);
 return <div className="notification-wrap"><button type="button" className="notification-bell" aria-label="Notifications" onClick={()=>setOpen(v=>!v)}><span className="bell-icon">&#128276;</span>{items.length>0&&<span className="notification-count">{items.length>9?"9+":items.length}</span>}</button>{open&&<><button className="notification-scrim" aria-label="Close notifications" onClick={()=>setOpen(false)}/><div className="notification-panel"><div className="notification-head"><b>Notifications</b><small>{items.length?`${items.length} new updates`:"No new updates"}</small></div>{items.length?<div className="notification-list">{items.map(n=><Link key={n.id} href={n.href} onClick={()=>setOpen(false)}><strong>{n.type}</strong><span>{n.title}</span></Link>)}</div>:<div className="notification-empty">Log in to receive your latest Kicholche updates here.</div>}</div></>}</div>;
}
