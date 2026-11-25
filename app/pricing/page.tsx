import Link from "next/link";
import { MarketingShell, MarketingIcon } from "../components/MarketingShell";

const plans = [
  {
    name: "Starter", price: "£29", summary: "The essentials for a smaller independent kitchen.",
    features: ["Invoices and spending", "Stock management", "Recipe records", "Basic reporting", "One kitchen site"],
  },
  {
    name: "Professional", price: "£59", summary: "A little more control for a busy, growing team.",
    features: ["Everything in Starter", "Orders and suppliers", "Menu and recipe costings", "Compliance checks and logs", "Advanced reports", "Up to three sites"],
    featured: true,
  },
  {
    name: "Group", price: "£119", summary: "A clear view across several kitchens and teams.",
    features: ["Everything in Professional", "Multi-site management", "Team access and permissions", "Custom checklists", "Onboarding support", "Integration options"],
  },
];

export const metadata = {
  title: "Plans & pricing | Kommee",
  description: "Explore illustrative subscription options for independent kitchens and hospitality groups.",
};

export default function PricingPage() {
  return (
    <MarketingShell active="pricing">
      <main className="km-pricing-main">
        <section className="km-container km-pricing-intro">
          <p className="km-eyebrow"><span className="km-kicker-line" /> SIMPLE, FLEXIBLE PRICING</p>
          <h1>A plan for every kind<br className="km-desktop-only" /> of kitchen<span className="km-dot">.</span></h1>
          <p>Whether you run one bustling restaurant or a growing group, we want Kommee to make sense for your kitchen.</p>
          <div className="km-pricing-note"><MarketingIcon name="spark" size={18} /> Seven-day free trial planned for every subscription. Register your interest now; checkout is not yet open. Prices are indicative.</div>
        </section>

        <section className="km-container km-pricing-grid" aria-label="Example subscription plans">
          {plans.map((plan) => (
            <article key={plan.name} className={plan.featured ? "km-plan km-plan-featured" : "km-plan"}>
              {plan.featured && <span className="km-plan-badge">RECOMMENDED · EXAMPLE</span>}
              <h2>{plan.name}</h2>
              <p className="km-plan-description">{plan.summary}</p>
              <div className="km-plan-price">{plan.price}<span> / month</span></div>
              <p className="km-plan-small">Indicative monthly price after trial</p>
              <div className="km-plan-divider" />
              <ul>{plan.features.map((feature)=><li key={feature}><MarketingIcon name="check" size={17}/>{feature}</li>)}</ul>
              <Link className={plan.featured ? "km-btn km-btn-accent km-plan-cta" : "km-btn km-btn-outline km-plan-cta"} href={`/signup?plan=${plan.name.toLowerCase()}`}>
                Choose plan <MarketingIcon name="arrow" size={17}/>
              </Link>
            </article>
          ))}
        </section>
        <section className="km-container km-pricing-bottom">
          <div><strong>Not sure which fits?</strong><p>Take a look around before you decide. There’s no checkout or billing active during this preview.</p></div>
          <Link href="/demo" className="km-btn km-btn-dark"><MarketingIcon name="play" size={20}/> Explore the demo</Link>
        </section>
      </main>
    </MarketingShell>
  );
}
