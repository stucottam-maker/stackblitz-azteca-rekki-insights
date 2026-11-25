"use client";
import {useState} from "react";
import {supabase} from "../lib/supabase";

export default function SandboxCheckoutButton({plan,sessionId}:{plan:string;sessionId?:string}) {
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  async function checkout(){
    if(busy)return;
    setBusy(true);setError("");
    try{
      const {data:{session}}=await supabase.auth.getSession();
      if(!session){
        window.location.assign("/login?next="+encodeURIComponent("/pricing"));
        return;
      }
      const response=await fetch(sessionId?"/api/billing/sandbox-portal":"/api/billing/sandbox-checkout",{
        method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+session.access_token},
        body:JSON.stringify(sessionId?{sessionId}:{plan})
      });
      const data=await response.json();
      if(!response.ok||typeof data.url!=="string")throw Error(data.error||"Checkout unavailable");
      const url=new URL(data.url);
      if(url.protocol!=="https:"||url.hostname!==(sessionId?"billing.stripe.com":"checkout.stripe.com"))throw Error("Invalid checkout URL");
      window.location.assign(url.href);
    }catch(e){setError(e instanceof Error?e.message:"Checkout unavailable");}
    finally{setBusy(false);}
  }
  return <div>
    <button type="button" onClick={checkout} disabled={busy} className="km-btn km-btn-accent km-plan-cta">{busy?"Opening test checkout…":sessionId?"Manage test subscription":"Test seven-day trial"}</button>
    <p className="km-plan-small">Sandbox only. Use a test account and test card. No real charges or workspace access.</p>
    {error&&<p role="alert" className="login-error">{error}</p>}
  </div>;
}
