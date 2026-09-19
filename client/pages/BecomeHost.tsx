import { FormEvent, useState, useEffect } from "react";
import { ArrowRight, CircleHelp, FileAudio, LogIn, Mail, Menu, Search, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Mark() {
  return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />;
}

export default function BecomeHost() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isDetailsFocused, setIsDetailsFocused] = useState(false);
  const [detailsText, setDetailsText] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("virasya-user") || "null"); } catch { return null; }
  });
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!detailsText.trim() || detailsText.length < 5) {
      setAiSuggestion(null);
      return;
    }
    
    setIsGenerating(true);
    const timeout = setTimeout(() => {
      const lowerText = detailsText.toLowerCase();
      let suggestion = " and it is a deeply meaningful part of our heritage.";
      
      if (lowerText.endsWith("years")) suggestion = " of preserving this beautiful craft.";
      else if (lowerText.endsWith("grandmother") || lowerText.endsWith("grandfather")) suggestion = " who passed down these intricate techniques to me.";
      else if (lowerText.endsWith("tradition")) suggestion = " that dates back several centuries in our region.";
      else if (lowerText.includes("weave") || lowerText.includes("weaving")) suggestion = " using traditional looms and locally sourced organic cotton.";
      else if (detailsText.length > 25) suggestion = " I want to ensure these unique skills are not lost to time.";

      setAiSuggestion(suggestion);
      setIsGenerating(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [detailsText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && aiSuggestion) {
      e.preventDefault();
      setDetailsText((prev) => prev + aiSuggestion);
      setAiSuggestion(null);
    }
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const submission = {
      title: String(form.get("title")),
      storyteller: String(form.get("storyteller")),
      region: String(form.get("region")),
      story: String(form.get("story")),
      email,
      audio: fileName,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem("virasaya-preserve-submission", JSON.stringify(submission));
    setFeedback("Your story has been placed in the archive. Thank you for carrying it forward.");
    event.currentTarget.reset();
    setFileName("");
  }

  return (
    <main className="site-shell preserve-page">
      <header className="site-header">
        <div className="container header-inner">
          <Link className="wordmark" to="/" onClick={closeMenu}><Mark /><span>VIRASYA</span></Link>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
            <Link to="/stories" onClick={closeMenu}>Explore stories</Link>
            <Link to="/hosts" onClick={closeMenu}>Meet the hosts</Link>
            <Link to="/studio" onClick={closeMenu}>AI story studio</Link>
            <Link to="/search" className="header-icon-button" onClick={closeMenu} aria-label="Search"><Search size={16} /></Link>
            {user ? (
              <Link to="/dashboard" className="header-user-button" onClick={closeMenu}><span className="header-user-avatar">{user.avatar ? <img src={user.avatar} className="header-user-avatar-image" alt="Profile" /> : user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}</span>{user.name.split(" ")[0]}</Link>
            ) : (
              <Link to="/login" className="header-login-button" onClick={closeMenu}><LogIn size={14} strokeWidth={1.6} />Log in</Link>
            )}
            <Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story <ArrowRight size={14} /></Link>
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <section className="preserve-hero container">
        <div className="preserve-hero-copy">
          <p className="eyebrow">Community Hosts · 04</p>
          <h1>Become a<br /><em>cultural host.</em></h1>
          <p className="preserve-lede">Share your living traditions, craft, or oral history with the world. We provide all the required tools and support.</p>
        </div>
      </section>

      <section className="container preserve-layout">
        <aside className="preserve-aside preserve-tutorial">
          <p className="eyebrow">Tutorial</p>
          <h3>How to become a host</h3>
          <p className="tutorial-intro">Hosting is a beautiful way to keep traditions alive. Follow these steps to join our community.</p>
          
          <ul className="tutorial-steps">
            <li>
              <strong>1. Share your heritage</strong>
              <p>Tell us about the tradition, craft, or history you carry. This helps us understand your cultural background.</p>
            </li>
            <li>
              <strong>2. Provide your details</strong>
              <p>Fill out your name, region, and contact info so we can reach out with the next steps.</p>
            </li>
            <li>
              <strong>3. We send the toolkit</strong>
              <p>Once approved, we provide all required things—recording tools, guidelines, and community support.</p>
            </li>
          </ul>
          
          <div className="mock-notice"><CircleHelp size={17} /><p><strong>Demo mode</strong>Submission is stored locally. Email notification is mocked.</p></div>
        </aside>

        <form className="preserve-form" onSubmit={handleSubmit} aria-describedby="preserve-feedback">
          <div id="preserve-feedback" className={feedback ? "interaction-feedback visible" : "interaction-feedback"} role="status" aria-live="polite">{feedback}</div>
          <p className="eyebrow">Start your journey</p>
          <h2>Tell us about<br /><em>your traditions.</em></h2>
          <div className="form-divider" />
          <div className="form-grid">
            <label className="form-field">Your Name<input name="name" required placeholder="Full Name" /></label>
            <label className="form-field">Heritage Type<input name="heritage" required placeholder="e.g. Master Weaver, Oral Historian" /></label>
            <label className="form-field">Where are you from?<input name="region" required placeholder="Town or Region" /></label>
            <label className="form-field">Your email<input name="email" type="email" required placeholder="So we can send the toolkit" /></label>
          </div>
          <div className="form-field story-field" style={{ position: 'relative' }}>
            <label htmlFor="details">
              Details <small>Tell us more about the culture you want to share</small>
            </label>
            <textarea 
              id="details" 
              name="details" 
              required 
              rows={5} 
              placeholder="I have been practicing..." 
              value={detailsText}
              onChange={(e) => setDetailsText(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsDetailsFocused(true)} 
              onBlur={() => {
                // Short timeout to allow clicking the AI suggestion before it hides
                setTimeout(() => setIsDetailsFocused(false), 200);
              }} 
            />
            {isDetailsFocused && !aiSuggestion && !isGenerating && detailsText.length === 0 && (
              <div className="story-suggestions" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '8px',
                padding: '16px',
                background: 'rgba(26,13,9,0.98)',
                border: '1px solid var(--gold)',
                borderRadius: '7px',
                color: 'var(--cream)',
                fontSize: '13px',
                zIndex: 10,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ margin: '0 0 10px 0', color: 'var(--gold)', fontWeight: 500, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Story Suggestions</p>
                <ul style={{ margin: 0, paddingLeft: '18px', display: 'grid', gap: '6px', color: 'var(--dim)', lineHeight: 1.5 }}>
                  <li><strong>Origin:</strong> Where does this tradition come from?</li>
                  <li><strong>Journey:</strong> How did you personally learn or inherit it?</li>
                  <li><strong>Process:</strong> What materials, tools, or techniques are used?</li>
                  <li><strong>Meaning:</strong> Why is it important to preserve this today?</li>
                </ul>
              </div>
            )}

            {isDetailsFocused && (aiSuggestion || isGenerating) && (
              <div className="ai-suggestion-dropdown" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '8px',
                padding: '12px 16px',
                background: 'rgba(26,13,9,0.98)',
                border: '1px solid var(--gold)',
                borderRadius: '7px',
                color: 'var(--cream)',
                fontSize: '13px',
                zIndex: 10,
                boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                cursor: aiSuggestion ? 'pointer' : 'default',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                if (aiSuggestion) {
                  setDetailsText(prev => prev + aiSuggestion);
                  setAiSuggestion(null);
                  document.getElementById("details")?.focus();
                }
              }}>
                <Sparkles size={18} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px', animation: isGenerating ? 'pulse 1.5s infinite' : 'none' }} />
                <div style={{ flex: 1 }}>
                  {isGenerating ? (
                    <span style={{ color: 'var(--dim)', fontStyle: 'italic' }}>AI is thinking...</span>
                  ) : (
                    <>
                      <span style={{ color: 'var(--dim)' }}>...{aiSuggestion}</span>
                      <div style={{ marginTop: '8px', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ padding: '2px 6px', border: '1px solid var(--gold)', borderRadius: '4px' }}>Tab</span> to accept
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <label className="upload-field"><FileAudio size={20} /><span><strong>Add a voice note introduction</strong><small>{fileName || "Optional · audio upload is MOCKED in this preview"}</small></span><input name="audio" type="file" accept="audio/*" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} /></label>
          <div className="form-footer" style={{ marginTop: 40 }}><p>By joining, you agree to Virāsaya's terms for cultural hosts.</p><button className="button" type="submit">Submit Application <ArrowRight size={16} /></button></div>
        </form>
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
