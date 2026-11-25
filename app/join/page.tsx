import Link from "next/link";
import {redirect} from "next/navigation";
import { MarketingShell, MarketingIcon } from "../components/MarketingShell";

export const metadata = {
  title: "Join Kommee | Early access",
  description: "Join your hospitality team on Kommee or explore a demonstration.",
};

const planNames:Record<string,string>={starter:'Starter',professional:'Professional',group:'Group'};
export default function JoinPage({searchParams}:{searchParams:{plan?:string}}) {
  const plan=typeof searchParams.plan==='string'&&Object.prototype.hasOwnProperty.call(planNames,searchParams.plan)?planNames[searchParams.plan]:null;
  if(plan)redirect("/signup?plan="+searchParams.plan);
  return <MarketingShell>
    <main className="km-container km-secondary-main km-join-main">
      <p className="km-eyebrow"><span className="km-kicker-line"/> GET STARTED</p>
      <h1>A place for your kitchen<span className="km-dot">.</span></h1>
      <p className="km-secondary-lead">New kitchens will join through a subscription. Team members join a kitchen through an invitation from its administrator.</p>
      <div className="km-join-grid">
        <div className="km-join-card">
          <MarketingIcon name="team" size={33}/>
          <h2>Joining a team?</h2>
          <p>Ask your restaurant’s Kommee administrator to invite you, then follow the invitation email to set your password. If you already have a login, sign in.</p>
          <Link className="km-btn km-btn-dark" href="/login?next=%2Frestaurants">Sign in to join <MarketingIcon name="arrow" size={17}/></Link>
        </div>
        <div className="km-join-card">
          <MarketingIcon name="store" size={33}/>
          <h2>{plan ? plan+' subscription' : 'Running your own kitchen?'}</h2>
          <p>{plan ? 'You have selected '+plan+'. Checkout is not yet available, and no account, subscription or charge has been created.' : 'Choose a subscription plan for your kitchen. Checkout is not yet open.'}</p>
          <Link className="km-btn km-btn-dark" href="/signup">{plan?'Compare plans':'View subscription plans'} <MarketingIcon name="arrow" size={17}/></Link>
          <Link className="km-btn km-btn-outline" href="/demo">Explore the demo <MarketingIcon name="arrow" size={17}/></Link>
        </div>
      </div>
    </main>
  </MarketingShell>;
}
