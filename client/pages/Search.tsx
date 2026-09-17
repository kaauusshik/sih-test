import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LogIn, Menu, Search as SearchIcon, X, MapPin, Play, Radio, Headphones } from "lucide-react";

const stories = [
  { id: 1, type: "story", category: "Oral history", image: "https://images.unsplash.com/photo-1649074705058-9d1579429e37?auto=format&fit=crop&w=1200&q=85", region: "Puri, Odisha", duration: "08 min", title: "Rath Yatra Memories", excerpt: "Every monsoon, the lanes around our home became a river of bells, colour, and names we still carry.", language: "Odia · 2026", featured: true },
  { id: 2, type: "story", category: "Craft & song", image: "https://images.unsplash.com/photo-1712210332599-0cb76e647e43?auto=format&fit=crop&w=1200&q=85", region: "Kutch, Gujarat", duration: "12 min", title: "The Weaver's Song", excerpt: "The loom keeps time. My grandmother's song keeps the pattern from disappearing.", language: "Gujarati · 2025" },
  { id: 3, type: "story", category: "Folklore", image: "https://images.pexels.com/photos/16543272/pexels-photo-16543272.jpeg?auto=compress&cs=tinysrgb&w=1200", region: "Rajasthan", duration: "06 min", title: "Under the Ber Tree", excerpt: "At dusk, the children gathered beneath the old tree, waiting for the story that knew their names.", language: "Hindi · 2024" },
];

const hosts = [
  { id: 4, type: "host", name: "Ananya Desai", firstName: "Ananya", role: "Folklore Custodian", region: "Gujarat", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80", description: "Specializes in reviving forgotten lullabies and migratory songs." },
  { id: 5, type: "host", name: "Kiran Pattanaik", firstName: "Kiran", role: "Oral Historian", region: "Odisha", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80", description: "Documenting temple rituals, regional dialects, and festival origins." },
  { id: 6, type: "host", name: "Meera Singh", firstName: "Meera", role: "Heritage Archiver", region: "Rajasthan", image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=800&q=80", description: "Translating desert tales and generational craft techniques." },
];

const allContent = [...stories, ...hosts];

function Mark() { return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />; }

export default function Search() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("virasya-user") || "null"); } catch { return null; }
  });

  const closeMenu = () => setMenuOpen(false);

  const results = allContent.filter(item => {
    if (!query.trim()) return false;
    const searchStr = query.toLowerCase();
    const anyItem = item as any;
    return (anyItem.title || anyItem.name)?.toLowerCase().includes(searchStr) || 
           anyItem.region?.toLowerCase().includes(searchStr) || 
           anyItem.description?.toLowerCase().includes(searchStr) || 
           anyItem.excerpt?.toLowerCase().includes(searchStr);
  });

  return (
    <main className="site-shell search-page">
      <header className="site-header">
        <div className="container header-inner">
          <Link className="wordmark" to="/" onClick={closeMenu}><Mark /><span>VIRASYA</span></Link>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
            <Link to="/stories" onClick={closeMenu}>Explore stories</Link>
            <Link to="/hosts" onClick={closeMenu}>Meet the hosts</Link>
            <Link to="/studio" onClick={closeMenu}>AI story studio</Link>
            <Link to="/search" className="header-icon-button is-active" onClick={closeMenu} aria-label="Search"><SearchIcon size={16} /></Link>
            {user ? (
              <Link to="/dashboard" className="header-user-button" onClick={closeMenu}>
                <span className="header-user-avatar">{user.avatar ? <img src={user.avatar} className="header-user-avatar-image" alt="Profile" /> : user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}</span>
                {user.name.split(" ")[0]}
              </Link>
            ) : (
              <Link to="/login" className="header-login-button" onClick={closeMenu}><LogIn size={14} strokeWidth={1.6} />Log in</Link>
            )}
            <Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story ↗</Link>
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <section className="search-hero container">
        <div>
          <p className="eyebrow">Search the archive</p>
          <h1>Find what you<br /><em>remember.</em></h1>
        </div>
        
        <div className="search-input-wrapper">
          <SearchIcon size={24} className="search-input-icon" />
          <input 
            type="text" 
            placeholder="Search stories, hosts, regions..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-large-input"
            autoFocus
          />
          {query && <button className="search-clear-button" onClick={() => setQuery("")}><X size={20}/></button>}
        </div>
      </section>

      <section className="container search-results-section">
        {query.trim() === "" ? (
          <div className="search-empty-state">
            <Radio size={32} className="search-empty-icon" />
            <h3>Listen closely.</h3>
            <p>Type a keyword above to search through our entire archive of stories and hosts.</p>
          </div>
        ) : results.length > 0 ? (
          <div className="search-results-grid">
            {results.map((item: any) => (
              <div key={item.id} className="search-result-card">
                {item.type === "story" ? (
                  <article className="story-card">
                    <Link to={`/stories?search=${item.id}`} className="story-image" style={{ backgroundImage: `url(${item.image})` }} aria-label={`Read ${item.title}`}>
                      <div className="story-image-overlay">
                        <span className="story-category">{item.category}</span>
                        <div className="story-meta-row"><span><MapPin size={12}/>{item.region}</span><span><Play size={12} fill="currentColor" />{item.duration}</span></div>
                      </div>
                    </Link>
                    <div className="story-content">
                      <h3><Link to={`/stories?search=${item.id}`}>{item.title}</Link></h3>
                      <p>{item.excerpt}</p>
                      <span className="story-language">{item.language}</span>
                    </div>
                  </article>
                ) : (
                  <article className="host-card">
                    <div className="host-card-image" style={{ backgroundImage: `url(${item.image})` }}>
                      <span className="host-region"><MapPin size={12} />{item.region}</span>
                    </div>
                    <div className="host-card-content">
                      <p className="eyebrow">{item.role}</p>
                      <h2><Link to="/hosts">{item.name}</Link></h2>
                      <p>{item.description}</p>
                    </div>
                  </article>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="search-empty-state">
            <SearchIcon size={32} className="search-empty-icon" />
            <h3>No fragments found.</h3>
            <p>We couldn't find anything matching "{query}". Try another term.</p>
          </div>
        )}
      </section>

    </main>
  );
}
