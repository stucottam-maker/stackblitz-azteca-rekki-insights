import Link from "next/link";
import { MarketingShell } from "../components/MarketingShell";
import {findPlan,subscriptionPlans,TRIAL_DAYS} from "../lib/subscriptionPlans";
import SignupForm from "./SignupForm";
export const metadata={title:"Sign up | Kommee",description:"Register your kitchen for Kommee and choose your subscription."};
export default function SignupPage({searchParams}:{searchParams:{plan?:string}}){
 const plan=findPlan(searchParams.plan);
 const isTest=process.env.VERCEL_ENV==="preview" && process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/,"")==="https://zfkzpqqyzjizjxijmpde.supabase.co";
 return <MarketingShell active="pricing"><main className="km-container km-secondary-main" style={{maxWidth:720}}>
 <p className="km-eyebrow"><span className="km-kicker-line"/> GET STARTED</p>
 <h1 style={{fontSize:"clamp(2rem,5vw,3.5rem)"}}>Sign up to Kommee<span className="km-dot">.</span></h1>
 <p className="km-secondary-lead">Your kitchen, a little simpler. Choose a plan for your business. New subscriptions are coming soon.</p>
 {!plan?<div className="km-join-card"><h2>Choose your plan</h2>{subscriptionPlans.map(p=><Link key={p.id} className="km-btn km-btn-outline" style={{display:"flex",justifyContent:"space-between",marginTop:12}} href={"/signup?plan="+p.id}>{p.name} · £{p.price}/month</Link>)}</div>:<>
 <section className="km-join-card" style={{marginBottom:18}}>
 <p className="km-eyebrow">YOUR SELECTED PLAN</p><h2>{plan.name}</h2>
 <div style={{fontSize:32,fontWeight:750,color:"#174f3c"}}>£0 <span style={{fontSize:16,fontWeight:500}}>during the {TRIAL_DAYS}-day trial</span></div>
 <p>Then £{plan.price} per month at the agreed launch price · {plan.sites}. Checkout is not yet open.</p>
 <p>Once checkout is enabled, you will add a payment method and explicitly agree to recurring billing. Cancel before your trial ends to avoid the first subscription charge.</p>
 <Link href="/pricing" className="km-btn km-btn-outline">Change plan</Link>
 </section>
 {isTest?<section className="km-join-card"><h2>Tell us about your kitchen</h2><p>Test preview only. Use sample details. No trial or subscription starts.</p><SignupForm key={plan.id} planId={plan.id}/></section>:<section className="km-join-card"><h2>Checkout coming soon</h2><p>Online subscriptions are being tested. No account, trial or payment can be started here yet.</p><Link className="km-btn km-btn-outline" href="/demo">Explore the demo</Link></section>}
 </>}
 <p style={{marginTop:20}}>Already a customer? <Link href="/login" style={{fontWeight:700,textDecoration:"underline"}}>Sign in</Link></p>
 </main></MarketingShell>;
}
