import { useState } from "react";
import { ArrowRight, Headphones, LogIn, Mail, MapPin, Menu, Radio, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

const hosts = [
  { name: "Meera Rao", firstName: "Meera", role: "Oral historian", region: "Puri, Odisha", description: "Keeps the songs and small rituals of a coastal neighbourhood alive.", image: "https://images.unsplash.com/photo-1546360521-3bd663cc4374?auto=format&fit=crop&w=900&q=85" },
  { name: "Bhura Bhai", firstName: "Bhura", role: "Master weaver", region: "Kutch, Gujarat", description: "Reads family histories in colour, thread, and the rhythm of the loom.", image: "https://images.pexels.com/photos/13784080/pexels-photo-13784080.jpeg?auto=compress&cs=tinysrgb&w=900" },
  { name: "Sarla Devi", firstName: "Sarla", role: "Folklore keeper", region: "Jaisalmer, Rajasthan", description: "Her dusk-time tales carry desert wisdom from one generation to the next.", image: "https://images.pexels.com/photos/16543272/pexels-photo-16543272.jpeg?auto=compress&cs=tinysrgb&w=900" },
];
function Mark() { return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />; }

export default function Hosts() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const [connected, setConnected] = useState<string | null>(null);
  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("virasya-user") || "null"); } catch { return null; }
  });
  const closeMenu = () => setMenuOpen(false);
  return <main className="site-shell hosts-page">
    <header className="site-header"><div className="container header-inner"><Link className="wordmark" to="/" onClick={closeMenu}><Mark /><span>VIRASYA</span></Link><nav className={menuOpen ? "main-nav is-open" : "main-nav"}><Link to="/stories" onClick={closeMenu}>Explore stories</Link><Link className="nav-link-active" to="/hosts" aria-current="page" onClick={closeMenu}>Meet the hosts</Link><Link to="/studio" onClick={closeMenu}>AI story studio</Link><Link to="/search" className="header-icon-button" onClick={closeMenu} aria-label="Search"><Search size={16} /></Link>{user ? <Link to="/dashboard" className="header-user-button" onClick={closeMenu}><span className="header-user-avatar">{user.avatar ? <img src={user.avatar} className="header-user-avatar-image" alt="Profile" /> : user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}</span>{user.name.split(" ")[0]}</Link> : <Link to="/login" className="header-login-button" onClick={closeMenu}><LogIn size={14} strokeWidth={1.6} />Log in</Link>}<Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story ↗</Link></nav><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div></header>
    <section className="hosts-hero container"><div><p className="eyebrow">The people behind the stories · 02</p><h1>Meet the<br /><em>story keepers.</em></h1><p className="hosts-hero-description">The people who remember the details, hold the rhythm, and make room for a story to be heard.</p></div><div className="hosts-status"><Radio size={18} /><p>3 active hosts<br /><b>across 2 regions</b></p></div></section>
    <section className="container hosts-grid-section"><div className="hosts-section-topline"><p className="eyebrow">Living traditions</p><p>Tap a host to hear a fragment</p></div><div className="hosts-grid">{hosts.map((host) => <article className="host-card" key={host.name}><div className="host-card-image" style={{ backgroundImage: `url(${host.image})` }}><span className="host-region"><MapPin size={12} />{host.region}</span><button className={playing === host.name ? "host-audio-button is-playing" : "host-audio-button"} onClick={() => setPlaying(playing === host.name ? null : host.name)} aria-label={`${playing === host.name ? "Pause" : "Listen to"} ${host.name}`}><Headphones size={15} />{playing === host.name ? "Playing" : "Listen"}</button></div><div className="host-card-content"><p className="eyebrow">{host.role}</p><h2>{host.name}</h2><p>{host.description}</p><button className={connected === host.name ? "inline-arrow-link is-connected" : "inline-arrow-link"} onClick={() => setConnected(connected === host.name ? null : host.name)}>{connected === host.name ? `Request sent to ${host.firstName}` : `Connect with ${host.firstName}`} <ArrowRight size={15} /></button></div></article>)}</div></section>
    <section className="container hosts-quote"><blockquote>“A story is not an object we own. It is a light we agree to keep passing.”</blockquote><p>— Virāsaya field note, 2026</p></section>
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
  </main>;
}
