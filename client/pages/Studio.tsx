import { useState } from "react";
import { AudioLines, Languages, LogIn, Mail, Menu, Mic, Search, Sparkles, WandSparkles, X } from "lucide-react";
import { Link } from "react-router-dom";

function Mark() { return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />; }
const sampleMemory = "My grandmother used to say that every recipe begins with a story. When the monsoon came, she would make a pot of khichdi and call every neighbour home.";

export default function Studio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [memory, setMemory] = useState("");
  const [dialect, setDialect] = useState("English");
  const [recording, setRecording] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("virasya-user") || "null"); } catch { return null; }
  });
  const closeMenu = () => setMenuOpen(false);
  const processStory = () => { if (memory.trim()) setProcessed(true); };
  return <main className="site-shell studio-page">
    <header className="site-header"><div className="container header-inner"><Link className="wordmark" to="/" onClick={closeMenu}><Mark /><span>VIRASYA</span></Link><nav className={menuOpen ? "main-nav is-open" : "main-nav"}><Link to="/stories" onClick={closeMenu}>Explore stories</Link><Link to="/hosts" onClick={closeMenu}>Meet the hosts</Link><Link className="nav-link-active" to="/studio" aria-current="page" onClick={closeMenu}>AI story studio</Link><Link to="/search" className="header-icon-button" onClick={closeMenu} aria-label="Search"><Search size={16} /></Link>{user ? <Link to="/dashboard" className="header-user-button" onClick={closeMenu}><span className="header-user-avatar">{user.avatar ? <img src={user.avatar} className="header-user-avatar-image" alt="Profile" /> : user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}</span>{user.name.split(" ")[0]}</Link> : <Link to="/login" className="header-login-button" onClick={closeMenu}><LogIn size={14} strokeWidth={1.6} />Log in</Link>}<Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story ↗</Link></nav><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div></header>
    <section className="studio-hero container"><div><p className="eyebrow">The story studio · 04</p><h1>Keep the voice.<br /><em>Find the thread.</em></h1><p className="studio-hero-description">Bring a voice note or a memory in your own words. We’ll help you turn the raw telling into something you can return to.</p></div></section>
    <section className="container studio-workspace">
      <div className="studio-input-panel"><div className="panel-topline"><div><p className="eyebrow">Step 01 · Bring the memory</p><h2>Start with a voice.</h2></div><span className="mocked-badge"><Sparkles size={12} /> Mocked AI preview</span></div><div className="record-row"><button className={recording ? "record-button is-recording" : "record-button"} onClick={() => setRecording(!recording)}><Mic size={18} />{recording ? "Stop recording" : "Record a memory"}</button><span>or write it below</span></div><label className="studio-textarea-label"><span className="sr-only">Your memory</span><textarea value={memory} onChange={(event) => { setMemory(event.target.value); setProcessed(false); }} placeholder="My grandmother used to say..." rows={9} /></label><div className="studio-input-footer"><button className="text-button" onClick={() => { setMemory(sampleMemory); setProcessed(false); }}>Use a sample memory</button><label className="dialect-field">Dialect<select value={dialect} onChange={(event) => setDialect(event.target.value)}><option>English</option><option>Hindi</option><option>Odia</option><option>Gujarati</option></select></label></div><button className="button studio-process-button" onClick={processStory} disabled={!memory.trim()}><WandSparkles size={16} />Transcribe this memory</button></div>
      <div className="studio-output-panel"><div className="panel-topline"><div><p className="eyebrow">Step 02 · Hold the thread</p><h2>Your story, clearer.</h2></div><Languages className="panel-language-icon" size={20} /></div>{processed ? <div className="studio-result"><p className="result-label">Transcript · {dialect}</p><p className="result-copy">{memory}</p><div className="result-divider" /><p className="result-label">Archive note</p><p className="result-copy">A remembered ritual, held in the language of home. This story keeps the people, place, and feeling at its centre.</p></div> : <div className="studio-empty"><div className="empty-orbit"><AudioLines size={28} /></div><h3>Nothing is lost here.</h3><p>Your transcript and translated archive note will appear here, with the people and place kept at the centre.</p></div>}</div>
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
  </main>;
}
