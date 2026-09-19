import { useMemo, useState } from "react";
import { Bookmark, Clock3, LogIn, Mail, MapPin, Menu, Play, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

const stories = [
  { id: 1, category: "Oral history", image: "https://images.unsplash.com/photo-1649074705058-9d1579429e37?auto=format&fit=crop&w=1200&q=85", region: "Puri, Odisha", duration: "08 min", title: "Rath Yatra Memories", excerpt: "Every monsoon, the lanes around our home became a river of bells, colour, and names we still carry.", language: "Odia · 2026", featured: true },
  { id: 2, category: "Craft & song", image: "https://images.unsplash.com/photo-1712210332599-0cb76e647e43?auto=format&fit=crop&w=1200&q=85", region: "Kutch, Gujarat", duration: "12 min", title: "The Weaver's Song", excerpt: "The loom keeps time. My grandmother's song keeps the pattern from disappearing.", language: "Gujarati · 2025" },
  { id: 3, category: "Folklore", image: "https://images.pexels.com/photos/16543272/pexels-photo-16543272.jpeg?auto=compress&cs=tinysrgb&w=1200", region: "Jaisalmer, Rajasthan", duration: "06 min", title: "Under the Ber Tree", excerpt: "At dusk, the children gathered beneath the old tree, waiting for the story that knew their names.", language: "Hindi · 2024" },
  { id: 4, category: "Food heritage", image: "https://images.unsplash.com/photo-1610192770281-9b1d9bf5b31d?auto=format&fit=crop&w=1200&q=85", region: "Chettinad, TN", duration: "14 min", title: "Spice & Memory", excerpt: "The grinding stone in our courtyard holds the echoes of three generations of women making the perfect masala.", language: "Tamil · 2026" },
  { id: 5, category: "Oral history", image: "https://images.unsplash.com/photo-1590050752112-9c8c9b3a0c44?auto=format&fit=crop&w=1200&q=85", region: "Majuli, Assam", duration: "10 min", title: "River's Edge", excerpt: "Before the river took our old village, we used to sit on the banks and listen to the boatmen sing of the rains.", language: "Assamese · 2023" },
  { id: 6, category: "Folklore", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=85", region: "Alappuzha, Kerala", duration: "18 min", title: "Monsoon Lullabies", excerpt: "The backwaters swell, and so do the songs that keep the children asleep while the storm rages outside.", language: "Malayalam · 2026" },
  { id: 7, category: "Craft & song", image: "https://images.unsplash.com/photo-1621884022802-9a5c8df5f171?auto=format&fit=crop&w=1200&q=85", region: "Varanasi, UP", duration: "09 min", title: "Threads of Gold", excerpt: "A Banarasi sari takes months to weave, but the songs the weavers sing have survived for centuries.", language: "Hindi · 2025" },
  { id: 8, category: "Oral history", image: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?auto=format&fit=crop&w=1200&q=85", region: "Leh, Ladakh", duration: "21 min", title: "Mountain Echoes", excerpt: "Winter stories are different from summer stories. The snow makes everything quiet, except for the memories.", language: "Ladakhi · 2024" },
  { id: 9, category: "Food heritage", image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1200&q=85", region: "Hyderabad, TS", duration: "11 min", title: "The Royal Kitchen", excerpt: "The secret to the perfect biryani isn't just the spices—it's the patience that my grandfather taught me.", language: "Telugu · 2026" }
];
const categories = ["All stories", "Oral history", "Craft & song", "Folklore", "Food heritage"];

function Mark() { return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />; }

export default function Stories() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All stories");
  const [saved, setSaved] = useState<number[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const [selectedStory, setSelectedStory] = useState<any | null>(null);
  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("virasya-user") || "null"); } catch { return null; }
  });
  const allStories = useMemo(() => {
    try {
      const custom = JSON.parse(localStorage.getItem("virasaya-custom-stories") || "[]");
      return [...custom, ...stories];
    } catch {
      return stories;
    }
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const visibleStories = useMemo(() => allStories.filter((story) => {
    const matchesCategory = category === "All stories" || story.category === category;
    const text = `${story.title} ${story.region} ${story.category} ${story.excerpt}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase());
  }), [category, query, allStories]);

  return <main className="site-shell stories-page">
    <header className="site-header"><div className="container header-inner"><Link className="wordmark" to="/" onClick={closeMenu}><Mark /><span>VIRASYA</span></Link><nav className={menuOpen ? "main-nav is-open" : "main-nav"}><Link className="nav-link-active" to="/stories" aria-current="page" onClick={closeMenu}>Explore stories</Link><Link to="/hosts" onClick={closeMenu}>Meet the hosts</Link><Link to="/studio" onClick={closeMenu}>AI story studio</Link><Link to="/search" className="header-icon-button" onClick={closeMenu} aria-label="Search"><Search size={16} /></Link>{user ? <Link to="/dashboard" className="header-user-button" onClick={closeMenu}><span className="header-user-avatar">{user.avatar ? <img src={user.avatar} className="header-user-avatar-image" alt="Profile" /> : user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}</span>{user.name.split(" ")[0]}</Link> : <Link to="/login" className="header-login-button" onClick={closeMenu}><LogIn size={14} strokeWidth={1.6} />Log in</Link>}<Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story ↗</Link></nav><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div></header>

    <section className="stories-hero container"><div><p className="eyebrow">The archive · 01</p><h1>Stories that<br /><em>stay with you.</em></h1><p className="stories-hero-description">Oral histories, songs, recipes, and small acts of remembrance — shared by the people who carry them.</p></div></section>

    <section className="container stories-explorer"><div className="explorer-toolbar"><label className="search-wrap"><Search size={16} /><span className="sr-only">Search stories</span><input aria-label="Search stories" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a place, person, or tradition" /></label><div className="filter-pills" role="group" aria-label="Filter stories by tradition">{categories.map((item) => <button key={item} className={category === item ? "filter-pill filter-pill-active" : "filter-pill"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div></div><div className="stories-status-row">{visibleStories.length} {visibleStories.length === 1 ? "story" : "stories"} in the collection</div>
      {visibleStories.length ? <div className="stories-grid">{visibleStories.map((story) => <article className={story.featured ? "story-card story-card-featured" : "story-card"} key={story.id} onClick={() => setSelectedStory(story)} style={{ cursor: 'pointer' }}><div className="story-card-image" style={{ backgroundImage: `url(${story.image})` }}><span className="story-badge">{story.category}</span><button className={playing === story.id ? "play-button is-playing" : "play-button"} aria-label={`Play ${story.title}`} onClick={(e) => { e.stopPropagation(); setPlaying(playing === story.id ? null : story.id); }}><Play size={15} fill="currentColor" /></button></div><div className="story-card-content"><div className="story-metadata"><span><MapPin size={13} />{story.region}</span><span><Clock3 size={13} />{story.duration}</span></div><h2>{story.title}</h2><p>{story.excerpt}</p><div className="story-card-footer"><span>{story.language}</span><button className={saved.includes(story.id) ? "save-button is-saved" : "save-button"} aria-pressed={saved.includes(story.id)} onClick={(e) => { e.stopPropagation(); setSaved(saved.includes(story.id) ? saved.filter((id) => id !== story.id) : [...saved, story.id]); }}><Bookmark size={15} fill={saved.includes(story.id) ? "currentColor" : "none"} />{saved.includes(story.id) ? "Saved" : "Save"}</button></div></div></article>)}</div> : <div className="stories-empty">No stories match that thread yet. Try another place, person, or tradition.</div>}
    </section>

    {selectedStory && (
      <div className="story-modal-overlay" onClick={() => setSelectedStory(null)}>
        <div className="story-modal" onClick={e => e.stopPropagation()}>
          <button className="story-modal-close" onClick={() => setSelectedStory(null)}><X size={20} /></button>
          <img src={selectedStory.image} alt={selectedStory.title} className="story-modal-image" />
          <div className="story-modal-content">
            <div className="story-modal-meta">
              <span><MapPin size={15} />{selectedStory.region}</span>
              <span><Clock3 size={15} />{selectedStory.duration}</span>
            </div>
            <h2>{selectedStory.title}</h2>
            <div className="story-modal-author">Shared by {selectedStory.storyteller || "Community member"}</div>
            <div className="story-modal-body">
              {selectedStory.story || selectedStory.excerpt}
            </div>
          </div>
        </div>
      </div>
    )}

    <section className="container stories-bottom-cta"><div><p className="eyebrow">Your turn to add a thread</p><h2>What story do<br /><em>you carry?</em></h2></div><Link className="button" to="/preserve">Preserve a story <span>→</span></Link></section>
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
