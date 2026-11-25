"use client";
import {useState,type FormEvent} from "react";
import Link from "next/link";
import {findPlan,TRIAL_DAYS} from "../lib/subscriptionPlans";
import {MarketingIcon} from "../components/MarketingShell";

export default function CheckoutPreview({planId}:{planId:string}){
 const plan=findPlan(planId);
 const [step,setStep]=useState<2|3>(2);
 const [sites,setSites]=useState("1");
 if(!plan)return null;
 function next(e:FormEvent<HTMLFormElement>){e.preventDefault();setStep(3);}
 return <div className="kc">
  <div className="kc-notice"><MarketingIcon name="spark" size={17}/> Interactive design preview · Use fictional details only. Nothing is saved or charged.</div>
  <nav aria-label="Checkout progress" className="kc-steps">
   <Link href="/pricing"><span className="kc-done">✓</span> Plan</Link>
   <span className="kc-step" aria-current={step===2?"step":undefined}><span className={step===2?"kc-current-step":"kc-done"}>{step===3?"✓":"2"}</span> Your details</span>
   <span className="kc-step" aria-current={step===3?"step":undefined}><span className={step===3?"kc-current-step":"kc-number"}>3</span> Payment</span>
  </nav>
  <div className="kc-grid">
   <section className="kc-summary" aria-label="Subscription summary">
    <div className="kc-summary-top"><span className="kc-kicker">YOUR SELECTED PLAN</span><Link href="/pricing">Change</Link></div>
    <h2>Kommee {plan.name}</h2><p>{plan.sites}</p>
    <div className="kc-trial"><small>7-DAY FREE TRIAL</small><strong>£0.00</strong><span>Due today</span></div>
    <div className="kc-line"><span>Monthly subscription</span><strong>£{plan.price}.00</strong></div>
    <div className="kc-line"><span>Trial discount today</span><strong>−£{plan.price}.00</strong></div>
    <div className="kc-line kc-total"><span>Total today</span><strong>£0.00</strong></div>
    <div className="kc-after"><strong>After your trial</strong><p>£{plan.price}/month, billed monthly unless cancelled before the trial ends.</p></div>
    <ul><li><MarketingIcon name="check" size={18}/> Full {plan.name} plan during trial</li><li><MarketingIcon name="check" size={18}/> No charge for the first {TRIAL_DAYS} days</li><li><MarketingIcon name="check" size={18}/> Cancel before the first payment</li></ul>
   </section>
   <section className="kc-form">
    {step===2?<><span className="kc-kicker">STEP 2 OF 3</span><h2>Set up your kitchen</h2><p className="kc-muted">A few details before we take you to secure checkout.</p>
     <form onSubmit={next} className="kc-fields">
      <label>Full name<input required maxLength={100} placeholder="e.g. Alex Smith" autoComplete="off"/></label>
      <label>Business name<input required maxLength={160} placeholder="e.g. The Sample Kitchen" autoComplete="off"/></label>
      <label>Work email<input required type="email" maxLength={254} placeholder="alex@example.com" autoComplete="off"/></label>
      <label>Number of sites<input type="number" min={1} max={plan.maxSites} required value={sites} onChange={e=>setSites(e.target.value)}/></label>
      <label className="kc-agreement"><input required type="checkbox"/><span>I understand the planned subscription is £{plan.price} per month after a seven-day trial, unless cancelled before it ends. This preview does not authorise billing.</span></label>
      <button type="submit" className="kc-cta"><MarketingIcon name="shield" size={20}/> Continue to Stripe <MarketingIcon name="arrow" size={19}/></button>
      <div className="kc-secure">Secure payment planned via <strong>stripe</strong></div>
      <p className="kc-footnote">Card details will be entered on Stripe’s own hosted checkout, never on this page.</p>
     </form></>:<div role="status" className="kc-handoff">
      <div className="kc-shield"><MarketingIcon name="shield" size={37}/></div><span className="kc-kicker">STEP 3 OF 3 · DEMO</span>
      <h2>Ready for secure checkout</h2><p className="kc-muted">In the finished journey, Stripe Checkout opens here to collect your payment method securely.</p>
      <div className="kc-review"><span>Due today<strong>£0.00</strong></span><span>After 7 days<strong>£{plan.price}/month</strong></span></div>
      <p className="kc-footnote">No account or subscription has been created. No information has been sent to Stripe.</p>
      <button type="button" className="kc-cta" onClick={()=>setStep(2)}>Back to your details</button><Link className="kc-back" href="/pricing">Choose a different plan</Link>
     </div>}
   </section>
  </div>
  <style jsx>{`
   .kc{color:#173e2e;margin-top:24px}
   .kc-notice{display:flex;align-items:center;gap:8px;padding:12px 15px;border:1px solid #ead8b9;background:#fff8e8;border-radius:10px;color:#69532b;font-size:12px;line-height:1.5}
   .kc-steps{display:flex;gap:12px;justify-content:space-between;margin:25px 0 20px;font-size:13px;font-weight:700}
   .kc-steps>a,.kc-step{display:flex;align-items:center;gap:7px}
   .kc-number,.kc-current-step,.kc-done{width:27px;height:27px;border-radius:50%;display:grid;place-items:center;background:#e8eae4;color:#617267}
   .kc-current-step{background:#17432f;color:white}.kc-done{background:#dcece0;color:#17432f}
   .kc-grid{display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.1fr);gap:24px;align-items:start}
   .kc-summary,.kc-form{border:1px solid #e4ded2;background:#fffdf9;border-radius:20px;padding:28px;box-shadow:0 10px 25px #453b2310;min-width:0}
   .kc-summary-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
   .kc-summary-top a,.kc-back{font-size:13px;font-weight:700;text-decoration:underline}
   .kc-kicker{font-size:11px;letter-spacing:1.3px;font-weight:800;color:#587365}
   h2{font-size:27px;letter-spacing:-.6px;margin:8px 0;line-height:1.15}
   .kc-summary>p,.kc-muted{font-size:14px;color:#627266;line-height:1.6;margin:0 0 19px}
   .kc-trial{border-radius:13px;background:#17432f;color:#fff;display:grid;gap:3px;padding:20px;margin:21px 0 14px}
   .kc-trial small{font-size:11px;letter-spacing:1px;color:#c1dbc7;font-weight:700}
   .kc-trial strong{font-size:40px;letter-spacing:-1.5px;line-height:1.2}
   .kc-trial span{font-size:13px;color:#dceadf}
   .kc-line{display:flex;justify-content:space-between;gap:10px;font-size:14px;line-height:1.4;padding:10px 0;color:#54665a}
   .kc-total{border-top:1px solid #e4ded2;margin-top:4px;color:#17432f;font-size:17px;font-weight:700}
   .kc-after{background:#edf3eb;border-radius:10px;margin-top:12px;padding:14px;font-size:13px}.kc-after p{margin:4px 0 0;line-height:1.5}
   ul{padding:0;margin:20px 0 0;list-style:none;display:grid;gap:11px}li{display:flex;align-items:center;gap:8px;font-size:13px}
   .kc-fields{display:grid;gap:15px}.kc-fields label:not(.kc-agreement){display:grid;gap:6px;font-size:13px;font-weight:700}
   .kc-fields input:not([type=checkbox]){width:100%;min-width:0;min-height:47px;border:1px solid #d7ddd4;background:white;color:#173e2e;border-radius:9px;padding:10px 12px;font-size:16px;box-sizing:border-box}
   .kc-fields input:focus-visible,.kc-cta:focus-visible{outline:3px solid #83ac8e;outline-offset:2px}
   .kc-agreement{display:flex;align-items:flex-start;gap:10px;font-size:12px;line-height:1.6;color:#52665d}
   .kc-agreement input{width:18px;height:18px;flex-shrink:0;accent-color:#17432f;margin-top:2px}
   .kc-cta{border:0;display:flex;align-items:center;justify-content:center;gap:10px;background:#17432f;color:white;border-radius:10px;padding:13px 16px;min-height:51px;width:100%;font-size:15px;font-weight:750;cursor:pointer}
   .kc-secure{font-size:12px;text-align:center;color:#637267;display:flex;align-items:center;justify-content:center;gap:6px}.kc-secure strong{color:#635bff;font-size:23px;letter-spacing:-1.1px}
   .kc-footnote{font-size:12px;color:#65756a;line-height:1.55;margin:0;text-align:center}
   .kc-handoff{text-align:center;display:grid;gap:14px;justify-items:center}.kc-handoff h2,.kc-handoff .kc-muted{margin:0}
   .kc-shield{display:grid;place-items:center;background:#e1eee4;border-radius:50%;height:74px;width:74px;color:#17432f}
   .kc-review{width:100%;border-radius:12px;padding:15px;background:#edf3eb;display:grid;gap:12px}.kc-review span{display:flex;justify-content:space-between;font-size:13px}
   @media(max-width:760px){.kc-grid{grid-template-columns:1fr;gap:16px}.kc-summary,.kc-form{padding:20px}.kc-steps{font-size:12px;gap:6px}.kc-summary h2,.kc-form h2{font-size:24px}.kc-trial{padding:15px}}
  `}</style>
 </div>;
}
