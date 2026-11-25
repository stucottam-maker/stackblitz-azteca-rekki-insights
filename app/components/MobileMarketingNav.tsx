"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {marketingLinks} from "../lib/marketingLinks";
export default function MobileMarketingNav(){
 const [open,setOpen]=useState(false);
 const root=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const path=usePathname();
 useEffect(()=>{setOpen(false)},[path]);
 useEffect(()=>{
  if(!open)return;
  function closeOutside(e:PointerEvent){if(!root.current?.contains(e.target as Node))setOpen(false)}
  function closeEscape(e:KeyboardEvent){if(e.key==="Escape"){setOpen(false);trigger.current?.focus()}}
  document.addEventListener("pointerdown",closeOutside);document.addEventListener("keydown",closeEscape);
  return ()=>{document.removeEventListener("pointerdown",closeOutside);document.removeEventListener("keydown",closeEscape)};
 },[open]);
 return <div className="km-mobile-navigation" ref={root}>
 <button ref={trigger} type="button" className="km-mobile-trigger" aria-expanded={open} aria-controls="km-mobile-menu" onClick={()=>setOpen(v=>!v)} aria-label={open?"Close navigation":"Open navigation"}>
 <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">{open?<path d="M6 6l12 12M18 6 6 18"/>:<path d="M4 6h16M4 12h16M4 18h16"/>}</svg><span>Menu</span></button>
 {open&&<nav id="km-mobile-menu" className="km-mobile-panel" aria-label="Mobile website navigation">
 {marketingLinks.map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)}>{item.label}</Link>)}
 <Link href="/join" onClick={()=>setOpen(false)}>Join a kitchen</Link>
 <Link href="/login" onClick={()=>setOpen(false)}>Log in</Link>
 <Link href="/join" className="km-mobile-signup" onClick={()=>setOpen(false)}>Get started</Link>
 </nav>}</div>
}
