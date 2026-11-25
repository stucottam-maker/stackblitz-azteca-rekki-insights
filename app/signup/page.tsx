import Link from "next/link";
import {MarketingShell} from "../components/MarketingShell";
import {findPlan,subscriptionPlans} from "../lib/subscriptionPlans";
import CheckoutPreview from "./CheckoutPreview";
export const metadata={title:"Start your free trial | Kommee",robots:{index:false,follow:false}};
export default function SignupPage({searchParams}:{searchParams:{plan?:string}}){
 const plan=findPlan(searchParams.plan);
 return <MarketingShell active="pricing"><main className="km-container km-secondary-main" style={{maxWidth:1000}}>
 <p className="km-eyebrow"><span className="km-kicker-line"/> GET STARTED</p>
 <h1 style={{fontSize:"clamp(2rem,5vw,3.5rem)"}}>Your kitchen starts here<span className="km-dot">.</span></h1>
 <p className="km-secondary-lead">Seven days to see how Kommee works for your kitchen.</p>
 {plan?<CheckoutPreview key={plan.id} planId={plan.id}/>:<div className="km-join-card" style={{marginTop:24}}><h2>Choose your plan</h2>{subscriptionPlans.map(p=><Link key={p.id} className="km-btn km-btn-outline" style={{width:"100%",justifyContent:"space-between"}} href={"/signup?plan="+p.id}>{p.name} · £{p.price}/month</Link>)}</div>}
 <p style={{marginTop:20}}>Already a customer? <Link href="/login" style={{fontWeight:700,textDecoration:"underline"}}>Sign in</Link></p>
 </main></MarketingShell>;
}
