import Link from "next/link";
import { MarketingShell, MarketingIcon } from "../components/MarketingShell";

const features = [
  { icon: "cart", title: "Purchasing & orders" },
  { icon: "file", title: "Invoices & costs" },
  { icon: "stock", title: "Stock control" },
  { icon: "book", title: "Recipes & menus" },
  { icon: "shield", title: "Compliance" },
  { icon: "chart", title: "Reporting" },
];

export const metadata = {
  title: "Kommee | Your kitchen’s right hand",
  description: "Run your kitchen with fewer spreadsheets. Orders, invoices, stock, recipes, compliance and reporting in one simple place.",
};

export default function WelcomePage() {
  return (
    <MarketingShell>
      <main>
        <section className="km-hero">
          <div className="km-hero-inner km-container">
            <div className="km-hero-copy">
              <p className="km-eyebrow"><span className="km-kicker-line" /> RESTAURANT & KITCHEN MANAGEMENT</p>
              <h1>Your kitchen’s<br />right hand<span className="km-dot">.</span></h1>
              <p className="km-lead">Less admin. More cooking. Keep purchasing, invoices, stock, recipes and food safety beautifully organised in one place.</p>
              <div className="km-buttons">
                <Link className="km-btn km-btn-accent" href="/join">Get started <MarketingIcon name="arrow" size={18} /></Link>
                <Link className="km-btn km-btn-outline" href="/demo"><MarketingIcon name="play" size={19} /> Explore the demo</Link>
              </div>
              <p className="km-hero-footnote"><MarketingIcon name="check" size={15}/> Made for chefs, managers and independent hospitality teams</p>
            </div>
            <div className="km-hero-photo" role="img" aria-label="Chef cooking in a professional restaurant kitchen" />
          </div>
        </section>

        <section id="features" className="km-feature-band" aria-label="Kommee features">
          <div className="km-container km-feature-grid">
            {features.map((feature) => (
              <div className="km-feature" key={feature.title}>
                <MarketingIcon name={feature.icon} size={28} />
                <span>{feature.title}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="km-product-section">
          <div className="km-container km-product-grid">
            <div className="km-product-preview" aria-label="Illustrative preview of the Kommee dashboard">
              <div className="km-preview-desktop">
                <aside><div className="km-preview-logo">K<span>●</span> kommee.</div><i className="km-preview-active">⌂ &nbsp; Home</i><i>▤ &nbsp; Invoices</i><i>□ &nbsp; Stock</i><i>◇ &nbsp; Recipes</i><i>✓ &nbsp; Compliance</i><i>▥ &nbsp; Reports</i></aside>
                <div className="km-preview-main">
                  <span className="km-preview-caption">YOUR KITCHEN, AT A GLANCE</span>
                  <h3>Good to see you, Chef.</h3>
                  <small>Demo kitchen · Example dashboard</small>
                  <div className="km-preview-stats"><div>Monthly spend<strong>£4,280</strong></div><div>Stock value<strong>£8,420</strong></div><div>Food cost<strong>29.4%</strong></div></div>
                  <div className="km-preview-graph"><span>Supplier spend</span><div className="km-preview-bars">{[33,53,42,73,46,86,64,78,51,94,69,81].map((height,i)=><b key={i} style={{height:height+"%"}} />)}</div></div>
                </div>
              </div>
              <div className="km-preview-phone"><div className="km-preview-phone-top"><span>kommee.</span><small>Demo kitchen</small></div><div className="km-preview-phone-grid">{["Orders","Stock","Invoices","Recipes","Compliance","Reports"].map((name)=><span key={name}>{name}</span>)}</div></div>
              <span className="km-preview-disclaimer">Illustrative product preview</span>
            </div>
            <div className="km-product-copy" id="about">
              <p className="km-eyebrow">BUILT FOR REAL KITCHENS</p>
              <h2>Less paperwork.<br />More headspace<span className="km-dot">.</span></h2>
              <p>From the first delivery of the day to your last closing check, Kommee brings the important bits of running a kitchen together.</p>
              <ul className="km-check-list">
                <li><MarketingIcon name="check" size={19} /> Know what you spend and where</li>
                <li><MarketingIcon name="check" size={19} /> Keep recipes, stock and suppliers connected</li>
                <li><MarketingIcon name="check" size={19} /> Make daily compliance easier to manage</li>
              </ul>
              <Link href="/pricing" className="km-link">Explore our plans <MarketingIcon name="arrow" size={18} /></Link>
            </div>
          </div>
        </section>

        <section className="km-pos-section" aria-labelledby="km-pos-title">
          <div className="km-container km-pos-inner">
            <p className="km-eyebrow">CONNECTED HOSPITALITY</p>
            <h2 id="km-pos-title">Your systems. Working together<span className="km-dot">.</span></h2>
            <p className="km-pos-lead">Bring sales, purchasing, stock and kitchen operations into one clearer picture. We&apos;re exploring integrations with the POS platforms restaurants already use.</p>
            <div className="km-pos-panel">
              <strong>POS integrations on our roadmap</strong>
              <div className="km-pos-names" aria-label="Potential POS integration providers">
                {[
                  { name: "Lightspeed", domain: "lightspeedhq.com" },
                  { name: "Square", domain: "squareup.com" },
                  { name: "Epos Now", domain: "eposnow.com" },
                  { name: "Tevalis", domain: "tevalis.com" },
                  { name: "Toast", domain: "pos.toasttab.com" },
                  { name: "Clover", domain: "clover.com" },
                ].map((provider) => (
                  <span key={provider.name} className="km-pos-provider">
                    {/* Provider brand icon, not an indication of an active partnership. */}
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${provider.domain}&sz=128`}
                      alt=""
                      width="28"
                      height="28"
                      loading="lazy"
                    />
                    <span>{provider.name}</span>
                  </span>
                ))}
              </div>
              <p>Coming soon. These are planned integrations, not currently available connections. Availability will depend on provider access and your plan.</p>
            </div>
          </div>
        </section>

        <section id="teams" className="km-next">
          <div className="km-container km-next-inner">
            <div><p className="km-eyebrow km-light-kicker">GET STARTED</p><h2>Make room for better cooking<span className="km-dot">.</span></h2><p>A calmer way to run the busy bits of hospitality.</p></div>
            <div className="km-next-cards">
              <Link href="/join"><MarketingIcon name="team" size={29}/><strong>Join a kitchen</strong><span>For invited team members</span><MarketingIcon name="arrow" size={18}/></Link>
              <Link href="/demo"><MarketingIcon name="play" size={29}/><strong>Explore the demo</strong><span>See Kommee with sample data</span><MarketingIcon name="arrow" size={18}/></Link>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
