import { useState } from "react";
import { ArrowRight, Bookmark, LogIn, LogOut, Mail, Menu, Search, Sparkles, UserRound, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Mark() {
  return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />;
}

function getUser(): { name: string; email: string; avatar?: string } | null {
  try {
    return JSON.parse(localStorage.getItem("virasya-user") || "null");
  } catch {
    return null;
  }
}

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(getUser);
  const navigate = useNavigate();
  const [artifactCount] = useState(() => {
    try {
      const counts = JSON.parse(localStorage.getItem("virasaya-culture-counts") || "{}") as Record<string, number>;
      return Object.values(counts).reduce((total, count) => total + count, 0);
    } catch {
      return 0;
    }
  });
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("virasya-user");
    navigate("/");
  };

  // If not logged in, redirect to login
  if (!user) {
    return (
      <main className="site-shell profile-page">
        <header className="site-header"><div className="container header-inner"><Link className="wordmark" to="/" onClick={closeMenu}><Mark /><span>VIRASYA</span></Link><nav id="profile-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation"><Link to="/stories" onClick={closeMenu}>Explore stories</Link><Link to="/hosts" onClick={closeMenu}>Meet the hosts</Link><Link to="/studio" onClick={closeMenu}>AI story studio</Link><Link to="/login" className="header-login-button" onClick={closeMenu}><LogIn size={14} strokeWidth={1.6} />Log in</Link><Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story <ArrowRight size={14} /></Link></nav><button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="profile-navigation">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div></header>

        <section className="container profile-empty" style={{ minHeight: "70vh" }}>
          <UserRound size={28} />
          <p className="eyebrow">Not signed in</p>
          <h2>Sign in to<br /><em>see your profile.</em></h2>
          <p>Create an account or sign in to save stories, follow cultures, and preserve your memories.</p>
          <Link className="button" to="/login">Sign in or create account <ArrowRight size={16} /></Link>
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

  const initials = getInitials(user.name);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedUser = { ...user, avatar: base64String };
        localStorage.setItem("virasya-user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  return <main className="site-shell profile-page">
    <header className="site-header"><div className="container header-inner"><Link className="wordmark" to="/" onClick={closeMenu}><Mark /><span>VIRASYA</span></Link><nav id="profile-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation"><Link to="/stories" onClick={closeMenu}>Explore stories</Link><Link to="/hosts" onClick={closeMenu}>Meet the hosts</Link><Link to="/studio" onClick={closeMenu}>AI story studio</Link><Link to="/search" className="header-icon-button" onClick={closeMenu} aria-label="Search"><Search size={16} /></Link><Link to="/dashboard" className="header-user-button" onClick={closeMenu}><span className="header-user-avatar">{user.avatar ? <img src={user.avatar} className="header-user-avatar-image" alt="Profile" /> : initials}</span>{user.name.split(" ")[0]}</Link><Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story <ArrowRight size={14} /></Link></nav><button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="profile-navigation">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div></header>

    <section className="profile-hero container">
      <div className="profile-hero-copy">
        <p className="eyebrow">Your living archive · Welcome back</p>
        <h1>Hello,<br /><em>{user.name.split(" ")[0]}.</em></h1>
        <p>Your stories, cultures, and memories — all in one place. Keep the thread going.</p>
      </div>
    </section>

    <section className="container profile-dashboard">
      <div className="profile-card profile-card-main">
        <div className="profile-card-top">
          <label className="profile-large-avatar" title="Upload profile picture">
            {user.avatar ? <img src={user.avatar} alt="Profile" className="profile-avatar-img" /> : initials}
            <input type="file" accept="image/*" onChange={handleAvatarUpload} className="sr-only" />
            <span className="profile-avatar-overlay">Upload</span>
          </label>
          <div>
            <p className="eyebrow">Archive member</p>
            <h2>{user.name}</h2>
            <p className="profile-muted">{user.email}</p>
          </div>
          <button className="profile-edit profile-logout" type="button" onClick={handleLogout}><LogOut size={13} /> Sign out</button>
        </div>
        <div className="profile-stats">
          <div><strong>{artifactCount}</strong><span>Artifacts added</span></div>
          <div><strong>0</strong><span>Stories saved</span></div>
          <div><strong>0</strong><span>Cultures followed</span></div>
        </div>
      </div>
      <div className="profile-card profile-card-side">
        <Sparkles size={19} />
        <p className="eyebrow">Start your archive</p>
        <h3>Every memory begins with one small detail.</h3>
        <Link className="text-link" to="/preserve">Preserve a story <ArrowRight size={16} /></Link>
      </div>
    </section>

    <section className="container dashboard-tabs">
      <div className="dashboard-tabs-nav">
        <button className="active">Saved stories (2)</button>
        <button>Archives (3)</button>
        <button>My recordings (1)</button>
      </div>

      <div className="dashboard-grid">
        <article className="story-card">
          <div className="story-card-image" style={{ backgroundImage: `url(https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2F8a1dd3f0ed6944da93498b5cd870c918)` }}>
            <span className="story-category">Crafts</span>
          </div>
          <div className="story-card-content">
            <p className="eyebrow">Gujarat · 3 min</p>
            <h3>Threads of memory</h3>
            <p>The intricate beadwork patterns passed down through five generations...</p>
          </div>
        </article>
        
        <article className="story-card">
          <div className="story-card-image" style={{ backgroundImage: `url(https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2F58971fce8d5349f78fec2db8fc3d02a9)` }}>
            <span className="story-category">Oral History</span>
          </div>
          <div className="story-card-content">
            <p className="eyebrow">Kerala · 7 min</p>
            <h3>Monsoon lullabies</h3>
            <p>A collection of songs sung by grandmothers when the rains arrive...</p>
          </div>
        </article>
      </div>

      <div className="dashboard-section-header">
        <h3>My Archives & Contributions</h3>
      </div>
      
      <div className="dashboard-archives-list">
        <div className="archive-item">
          <div className="archive-icon"><Bookmark size={16} /></div>
          <div className="archive-info">
            <h4>Grandmother's Pickle Recipe</h4>
            <p>Preserved on September 15, 2026 · Text and Audio</p>
          </div>
          <button className="button button-small">View</button>
        </div>
        <div className="archive-item">
          <div className="archive-icon"><Bookmark size={16} /></div>
          <div className="archive-info">
            <h4>Diwali Folk Song (Awadhi)</h4>
            <p>Preserved on August 22, 2026 · Audio Recording</p>
          </div>
          <button className="button button-small">View</button>
        </div>
        <div className="archive-item">
          <div className="archive-icon"><Bookmark size={16} /></div>
          <div className="archive-info">
            <h4>Field Notes: Terracotta Artisans</h4>
            <p>Preserved on July 10, 2026 · Text and Image</p>
          </div>
          <button className="button button-small">View</button>
        </div>
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
  </main>;
}
