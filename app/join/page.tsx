import Link from "next/link";
import { MarketingShell, MarketingIcon } from "../components/MarketingShell";

export const metadata = {
  title: "Join Kommee | Early access",
  description: "Join your hospitality team on Kommee or explore a demonstration.",
};

export default function JoinPage() {
  return <MarketingShell>
    <main className="km-container km-secondary-main km-join-main">
      <p className="km-eyebrow"><span className="km-kicker-line"/> GET STARTED</p>
      <h1>A place for your kitchen<span className="km-dot">.</span></h1>
      <p className="km-secondary-lead">Kommee is in early access. Your login and your restaurant membership are separate: an account alone does not give access to kitchen data.</p>
      <div className="km-join-grid">
        <div className="km-join-card">
          <MarketingIcon name="team" size={33}/>
          <h2>Joining a team?</h2>
          <p>Ask your restaurant’s Kommee administrator to invite you. Sign in or create an account using the invited email address.</p>
          <Link className="km-btn km-btn-dark" href="/login?next=%2Frestaurants">Sign in to join <MarketingIcon name="arrow" size={17}/></Link>
        </div>
        <div className="km-join-card">
          <MarketingIcon name="store" size={33}/>
          <h2>Running your own kitchen?</h2>
          <p>New kitchen subscriptions and self-service setup are being prepared. Until then, explore the demo and see what’s coming.</p>
          <Link className="km-btn km-btn-outline" href="/demo">Explore the demo <MarketingIcon name="arrow" size={17}/></Link>
        </div>
      </div>
    </main>
  </MarketingShell>;
}
