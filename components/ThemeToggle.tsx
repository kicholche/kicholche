"use client";
import {useEffect,useState} from "react";
export default function ThemeToggle(){const [dark,setDark]=useState(false);
 useEffect(()=>{const sync=()=>{const value=localStorage.getItem("kicholche_theme")==="dark";setDark(value);document.documentElement.dataset.theme=value?"dark":"light";};sync();window.addEventListener("kicholche-theme-change",sync);return()=>window.removeEventListener("kicholche-theme-change",sync);},[]);
 function toggle(){const next=!dark;localStorage.setItem("kicholche_theme",next?"dark":"light");document.documentElement.dataset.theme=next?"dark":"light";setDark(next);window.dispatchEvent(new Event("kicholche-theme-change"));}
 return <button type="button" className="theme-toggle" onClick={toggle} aria-label={dark?"Switch to light theme":"Switch to dark theme"} title={dark?"Light theme":"Dark theme"}>{dark?"☀":"☾"}</button>;
}