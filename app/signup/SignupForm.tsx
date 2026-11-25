"use client";
import {useState,type FormEvent} from "react";
import {findPlan} from "../lib/subscriptionPlans";
export default function SignupForm({planId}:{planId:string}){
 const plan=findPlan(planId);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 const [success,setSuccess]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy||!plan)return;
  const fields=new FormData(e.currentTarget);
  setBusy(true);setError("");
  try{
   const response=await fetch("/api/subscription-requests",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({plan:plan.id,contactName:fields.get("contactName"),businessName:fields.get("businessName"),email:fields.get("email"),siteCount:Number(fields.get("siteCount")),website:fields.get("website"),consent:fields.get("consent")==="on"})});
   const data=await response.json();
   if(!response.ok)throw new Error(data.error||"Could not submit your request.");
   setSuccess(true);
  }catch(err){setError(err instanceof Error?err.message:"Please try again.");}finally{setBusy(false);}
 }
 if(!plan)return null;
 if(success)return <div role="status" className="login-success"><strong>Trial request received.</strong><p>No account or payment has been created. Your seven-day trial has not started. You will need to complete checkout when it becomes available.</p></div>;
 return <form className="login-form" onSubmit={submit}>
 <label className="login-field"><span>Full name</span><input name="contactName" autoComplete="name" maxLength={100} required placeholder="Your name"/></label>
 <label className="login-field"><span>Restaurant or business name</span><input name="businessName" autoComplete="organization" maxLength={160} required placeholder="Your kitchen"/></label>
 <label className="login-field"><span>Work email</span><input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@restaurant.co.uk"/></label>
 <label className="login-field"><span>Number of kitchen sites</span><input name="siteCount" type="number" min={1} max={plan.maxSites} step={1} defaultValue={1} required/></label>
 <div hidden aria-hidden="true"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <label style={{display:"flex",alignItems:"flex-start",gap:10,fontSize:14,lineHeight:1.5}}><input name="consent" type="checkbox" required style={{marginTop:4}}/><span>I agree to be contacted about my trial request. This does not authorise any payment or start a subscription.</span></label>
 {error&&<div className="login-error" role="alert">{error}</div>}
 <button type="submit" disabled={busy} className="primary-button login-button">{busy?"Submitting…":"Request seven-day trial"}</button>
 <p style={{fontSize:13,lineHeight:1.5,color:"#52665d"}}>We use your details to process this request. No card details are collected on this page.</p>
 </form>;
}
