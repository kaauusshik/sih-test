import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Camera, Headphones, LogIn, Mail, Menu, Mic, Quote, Search, Sparkles, X } from "lucide-react";

const sections = [
  { id: "begin", label: "Begin" },
  { id: "voices", label: "Voices" },
  { id: "archive", label: "Archive" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Mark() {
  return (
    <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />
  );
}

function SectionCue({ children, href }: { children: string; href: string }) {
  return (
    <a className="section-cue" href={href}>
      <span>{children}</span>
      <span className="cue-icon"><ArrowDown size={14} strokeWidth={1.5} /></span>
    </a>
  );
}

const cultureThreads = [
  { id: "north", zone: "North", places: "Kashmir · Punjab · Himachal", title: "Songs carried by the mountains", detail: "Sufi poetry, mountain ballads, harvest songs, and the warmth of a shared langar.", thread: "voice", accent: "saffron" },
  { id: "west", zone: "West", places: "Gujarat · Rajasthan · Maharashtra", title: "Colour, craft, and desert rhythm", detail: "Bandhani, bhajans, garba, and stories stitched into every mirror and thread.", thread: "craft", accent: "terracotta" },
  { id: "east", zone: "East", places: "Bengal · Odisha · Bihar", title: "Rivers that remember", detail: "Pattachitra, monsoon rituals, boat songs, and recipes passed down by the water.", thread: "ritual", accent: "ochre" },
  { id: "south", zone: "South", places: "Kerala · Tamil Nadu · Karnataka", title: "Rhythms of the living temple", detail: "Kolam at the threshold, Carnatic morning notes, spice routes, and festival drums.", thread: "place", accent: "copper" },
  { id: "central", zone: "Central", places: "Madhya Pradesh · Chhattisgarh", title: "The forest has a language", detail: "Gond lines, seed songs, fireside folklore, and knowledge held by the old trees.", thread: "land", accent: "leaf" },
  { id: "northeast", zone: "Northeast", places: "Assam · Nagaland · Meghalaya", title: "Rain, bamboo, and belonging", detail: "Weaving, living root bridges, spring festivals, and songs that travel through rain.", thread: "belonging", accent: "indigo" },
];

function CultureAtlas() {
  const [activeId, setActiveId] = useState("north");
  const activeCulture = cultureThreads.find((culture) => culture.id === activeId) ?? cultureThreads[0];
  return (
    <div className="culture-atlas" aria-label="Interactive map of cultural traditions across India">
      <div className="atlas-map" aria-label="Choose a region">
        <div className="atlas-silhouette" aria-hidden="true"><img className="india-map-image" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fba737cfe760344218c4976b6bd0df365?format=webp&width=800&height=1200" alt="" /></div>
        {cultureThreads.map((culture) => <button key={culture.id} className={`atlas-node atlas-node-${culture.id} ${activeId === culture.id ? "is-active" : ""}`} onClick={() => setActiveId(culture.id)} aria-pressed={activeId === culture.id}><i /><span>{culture.zone}</span></button>)}
        <span className="atlas-label atlas-label-north">01</span><span className="atlas-label atlas-label-west">02</span><span className="atlas-label atlas-label-east">03</span><span className="atlas-label atlas-label-south">04</span>
      </div>
      <div className={`culture-detail detail-${activeCulture.accent}`}>
        <div className="culture-detail-top"><span className="culture-index">0{cultureThreads.findIndex((culture) => culture.id === activeId) + 1}</span><span className="culture-thread">{activeCulture.thread}</span></div>
        <p className="culture-places">{activeCulture.places}</p><h3>{activeCulture.title}</h3><p>{activeCulture.detail}</p><button className="culture-next" onClick={() => setActiveId(cultureThreads[(cultureThreads.findIndex((culture) => culture.id === activeId) + 1) % cultureThreads.length].id)}>Discover the next thread <ArrowRight size={14} /></button>
      </div>
      <div className="atlas-legend"><span><i className="legend-dot" />Select a region</span><span>{cultureThreads.length} living threads</span></div>
    </div>
  );
}

const cultureCategories = [
  { id: "oral-histories", label: "Oral Histories", short: "Voices and lived memory" },
  { id: "food-recipes", label: "Food & Recipes", short: "The taste of home" },
  { id: "traditional-crafts", label: "Traditional Crafts", short: "Hands that keep making" },
  { id: "festivals", label: "Festivals", short: "Rituals in motion" },
  { id: "folk-music", label: "Folk Music", short: "Songs carried forward" },
  { id: "folklore", label: "Folklore", short: "Stories beneath the story" },
  { id: "dialects", label: "Dialects", short: "Language close to home" },
  { id: "family-knowledge", label: "Family Knowledge", short: "What elders pass on" },
  { id: "local-histories", label: "Local Histories", short: "Places with a memory" },
];

function CultureCatalog() {
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem("virasaya-culture-counts") || "{}") as Record<string, number>;
    } catch {
      return {};
    }
  });
  const [activeCategory, setActiveCategory] = useState(cultureCategories[0].id);
  const totalArtifacts = Object.values(counts).reduce((total, count) => total + count, 0);

  const addArtifact = (categoryId: string) => {
    setCounts((current) => {
      const next = { ...current, [categoryId]: (current[categoryId] || 0) + 1 };
      localStorage.setItem("virasaya-culture-counts", JSON.stringify(next));
      return next;
    });
  };

  return (
    <section className="culture-catalog section-rule" id="cultures">
      <div className="container">
        <div className="catalog-heading">
          <div><Eyebrow>Explore by culture</Eyebrow><h2>Every thread<br /><em>has a home.</em></h2></div>
          <div className="catalog-total"><strong>{totalArtifacts}</strong><span>artifacts<br />in the archive</span></div>
        </div>
        <p className="catalog-intro">Browse the traditions, voices, and everyday knowledge that make a place feel like home.</p>
        <div className="culture-category-grid">
          {cultureCategories.map((category, index) => {
            const count = counts[category.id] || 0;
            const isActive = activeCategory === category.id;
            return <button key={category.id} className={`culture-category-card ${isActive ? "is-active" : ""}`} onClick={() => setActiveCategory(category.id)} aria-pressed={isActive}>
              <span className="culture-category-number">0{index + 1}</span>
              <span className="culture-category-copy"><strong>{category.label}</strong><small>{category.short}</small></span>
              <span className="culture-category-count">{count} Artifacts</span>
            </button>;
          })}
        </div>
        <div className="catalog-actions">
          <p><strong>{cultureCategories.find((category) => category.id === activeCategory)?.label}</strong> currently has {counts[activeCategory] || 0} artifacts.</p>
          <button className="button button-small" type="button" onClick={() => addArtifact(activeCategory)}>Add an artifact <ArrowUpRight size={14} /></button>
        </div>
      </div>
    </section>
  );
}

function ProfileSection() {
  return <section className="profile-preview section-rule" id="profile">
    <div className="container profile-preview-inner">
      <div className="profile-preview-copy"><Eyebrow>Your archive profile</Eyebrow><h2>Carry your<br /><em>thread forward.</em></h2><p>Keep the stories you save, the cultures you follow, and the memories you choose to preserve in one place.</p></div>
      <Link className="button" to="/dashboard">Open profile <ArrowRight size={16} /></Link>
    </div>
  </section>;
}

function MemoryFigures() {
  return (
    <div className="memory-figures" aria-label="A gathering of people">
      <div className="figure figure-one"><span className="head" /><span className="body" /></div>
      <div className="figure figure-two"><span className="head" /><span className="body" /></div>
      <div className="figure figure-three"><span className="head" /><span className="body" /></div>
      <div className="figure figure-four"><span className="head" /><span className="body" /></div>
      <div className="figure figure-five"><span className="head" /><span className="body" /></div>
      <div className="figure-sun" />
    </div>
  );
}

function VoiceCard() {
  return (
    <div className="voice-card">
      <div className="portrait-panel">
        <Camera size={42} strokeWidth={1} />
        <span>Memory<br />portrait</span>
      </div>
      <div className="audio-panel">
        <Headphones size={18} strokeWidth={1.4} />
        <div className="waveform" aria-hidden="true">
          {[20, 34, 52, 27, 42, 65, 31, 50, 22, 38, 17, 29].map((height, index) => <i key={index} style={{ height }} />)}
        </div>
        <span className="audio-time">04:12</span>
      </div>
      <div className="card-caption"><span>Voice note</span><span>04:12</span></div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("begin");
  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("virasya-user") || "null"); } catch { return null; }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const observers = sections.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id);
      }, { rootMargin: "-35% 0px -55%" });
      observer.observe(element);
      return observer;
    });
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#begin" onClick={closeMenu}><Mark /> <span>VIRASYA</span></a>
          <nav id="primary-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
            <Link to="/stories" onClick={closeMenu}>Explore stories</Link>
            <Link to="/hosts" onClick={closeMenu}>Meet the hosts</Link>
            <Link to="/studio" onClick={closeMenu}>AI story studio</Link>
            <Link to="/search" className="header-icon-button" onClick={closeMenu} aria-label="Search"><Search size={16} /></Link>
            {user ? (
              <Link to="/dashboard" className="header-user-button" onClick={closeMenu}><span className="header-user-avatar">{user.avatar ? <img src={user.avatar} className="header-user-avatar-image" alt="Profile" /> : user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}</span>{user.name.split(" ")[0]}</Link>
            ) : (
              <Link to="/login" className="header-login-button" onClick={closeMenu}><LogIn size={14} strokeWidth={1.6} />Log in</Link>
            )}
            <Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story <ArrowUpRight size={14} /></Link>
          </nav>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <div className="progress-rail" aria-label="Page sections">
        {sections.map((section) => <a key={section.id} className={active === section.id ? "active" : ""} href={`#${section.id}`}><span className="rail-dot" /><span>{section.label}</span></a>)}
      </div>

      <section className="hero section-rule" id="begin">
        <div className="hero-art" aria-hidden="true"><div className="hero-dancers" /><div className="hero-hill" /><div className="hero-line line-one" /><div className="hero-line line-two" /></div>
        <div className="container hero-content">
          <Eyebrow>Real people. Living traditions.</Eyebrow>
          <h1>Every story<br /><em>begins at home.</em></h1>
          <p className="lede">It’s the stories we hear, the traditions we live, and the people who pass them on.</p>
          <SectionCue href="#voices">Scroll to begin</SectionCue>
        </div>
        <span className="hero-number">01 / 04</span>
      </section>

      <section className="voices section-rule" id="voices">
        <div className="container split-section">
          <div className="section-copy">
            <Eyebrow>The stories we keep</Eyebrow>
            <h2>India lives<br /><em>in its threads.</em></h2>
            <p>From the mountains to the coast, every region carries a different way of remembering. Tap a thread to travel through the living archive.</p>
            <SectionCue href="#memory">Keep going</SectionCue>
          </div>
          <CultureAtlas />
        </div>
      </section>

      <section className="memory section-rule" id="memory">
        <div className="container split-section reversed">
          <div className="memory-art">
            <img src="https://images.unsplash.com/photo-1605335028442-f04523c02d18?auto=format&fit=crop&w=800&q=80" alt="Grandmother telling stories to grandchildren" className="memory-art-image" style={{ objectFit: 'cover' }} />
          </div>
          <div className="section-copy">
            <Eyebrow>A living archive</Eyebrow>
            <h2>Time moved.<br /><em>The memories stayed.</em></h2>
            <p>We grew up, studied, moved away, met new people. But somewhere inside her stories were always there.</p>
            <SectionCue href="#archive">Remember</SectionCue>
          </div>
        </div>
      </section>

      <section className="archive section-rule" id="archive">
        <div className="container archive-inner">
          <div className="archive-intro">
            <div className="archive-icon"><Mic size={22} strokeWidth={1.2} /></div>
            <Eyebrow>From voice to living heritage.</Eyebrow>
            <h2>A story,<br /><em>held with care.</em></h2>
            <p>Your story is transcribed, translated, and preserved — with its context, place, and people.</p>
            <a className="button" href="/preserve">Open the story studio <ArrowRight size={16} /></a>
          </div>
          <div className="process">
            {[{ number: "01", icon: Mic, label: "Voice" }, { number: "02", icon: Quote, label: "Transcript" }, { number: "03", icon: Sparkles, label: "Context" }].map(({ number, icon: Icon, label }) => <div className="process-step" key={number}><span className="process-number">{number}</span><div className="process-icon"><Icon size={22} strokeWidth={1.2} /></div><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="explore-promo section-rule" id="explore">
        <div className="container split-section">
          <div className="section-copy">
            <Eyebrow>Discover the archive</Eyebrow>
            <h2>Uncover<br /><em>living history.</em></h2>
            <p>Dive into a growing collection of cultural artifacts, folklore, and memories preserved by the community.</p>
            <Link className="button" to="/stories">Explore stories <ArrowRight size={16} /></Link>
          </div>
          <div className="memory-art archive-hero-art">
            <img src="https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&w=800&q=80" alt="Ancient journal glowing with stories" className="memory-art-image" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <CultureCatalog />

      <ProfileSection />

      <section className="final-cta" id="preserve">
        <div className="container cta-inner">
          <div><Eyebrow>Some stories were never written down.</Eyebrow><h2>They were simply<br /><em>passed on.</em></h2><p>Virasya helps pass them forward, in the voices that made them matter.</p></div>
          <div className="cta-actions"><a className="button" href="/preserve">Preserve a story <ArrowRight size={16} /></a><Link className="button button-outline" to="/dashboard">View your profile</Link></div>
        </div>
      </section>

      <footer className="site-footer">
  <div className="container footer-inner">
    <div className="footer-top">
      <div className="footer-brand">
        <Link className="wordmark" to="/"><Mark /><span>VIRASYA</span></Link>
        <p>Living heritage, carried forward.</p>
        <a className="footer-email" href="mailto:hello@virasya.org"><Mail size={14} />hello@virasya.org</a>
      </div>
      <div className="footer-columns">
        <div className="footer-col">
          <span className="footer-heading">Explore</span>
          <div className="footer-links">
            <Link to="/stories">Stories</Link>
            <Link to="/hosts">Hosts</Link>
            <Link to="/preserve">Preserve</Link>
            <Link to="/studio">Studio</Link>
          </div>
        </div>
        <div className="footer-col">
          <span className="footer-heading">Follow</span>
          <div className="social-links">
            <a href="https://instagram.com" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://twitter.com" aria-label="X (Twitter)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span className="footer-note">© 2026 Virasya · Made with care in India</span>
      <div className="footer-legal">
        <Link to="#">Privacy Policy</Link>
        <Link to="#">Terms of Service</Link>
      </div>
    </div>
  </div>
</footer>
    </main>
  );
}
