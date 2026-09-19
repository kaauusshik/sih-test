import Header from "@/components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LogIn, Menu, Search as SearchIcon, X, MapPin, Play, Radio, Headphones } from "lucide-react";

const stories = [
  { id: 1, type: "story", category: "Oral history", image: "https://images.unsplash.com/photo-1649074705058-9d1579429e37?auto=format&fit=crop&w=1200&q=85", region: "Puri, Odisha", duration: "08 min", title: "Rath Yatra Memories", excerpt: "Every monsoon, the lanes around our home became a river of bells, colour, and names we still carry.", language: "Odia · 2026", featured: true },
  { id: 2, type: "story", category: "Craft & song", image: "https://images.unsplash.com/photo-1712210332599-0cb76e647e43?auto=format&fit=crop&w=1200&q=85", region: "Kutch, Gujarat", duration: "12 min", title: "The Weaver's Song", excerpt: "The loom keeps time. My grandmother's song keeps the pattern from disappearing.", language: "Gujarati · 2025" },
  { id: 3, type: "story", category: "Folklore", image: "https://images.pexels.com/photos/16543272/pexels-photo-16543272.jpeg?auto=compress&cs=tinysrgb&w=1200", region: "Rajasthan", duration: "06 min", title: "Under the Ber Tree", excerpt: "At dusk, the children gathered beneath the old tree, waiting for the story that knew their names.", language: "Hindi · 2024" },
  { id: 101, type: "story", category: "Food heritage", image: "https://images.unsplash.com/photo-1610192770281-9b1d9bf5b31d?auto=format&fit=crop&w=1200&q=85", region: "Chettinad, TN", duration: "14 min", title: "Spice & Memory", excerpt: "The grinding stone in our courtyard holds the echoes of three generations of women making the perfect masala.", language: "Tamil · 2026" },
  { id: 102, type: "story", category: "Oral history", image: "https://images.unsplash.com/photo-1590050752112-9c8c9b3a0c44?auto=format&fit=crop&w=1200&q=85", region: "Majuli, Assam", duration: "10 min", title: "River's Edge", excerpt: "Before the river took our old village, we used to sit on the banks and listen to the boatmen sing of the rains.", language: "Assamese · 2023" },
  { id: 103, type: "story", category: "Folklore", image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=85", region: "Alappuzha, Kerala", duration: "18 min", title: "Monsoon Lullabies", excerpt: "The backwaters swell, and so do the songs that keep the children asleep while the storm rages outside.", language: "Malayalam · 2026" }
];

const hosts = [
  { id: 4, type: "host", name: "Meera Rao", firstName: "Meera", role: "Oral historian", region: "Puri, Odisha", image: "/hosts/meera_rao.jpg", description: "Keeps the songs and small rituals of a coastal neighbourhood alive." },
  { id: 5, type: "host", name: "Bhura Bhai", firstName: "Bhura", role: "Master weaver", region: "Kutch, Gujarat", image: "/hosts/bhura_bhai.jpg", description: "Reads family histories in colour, thread, and the rhythm of the loom." },
  { id: 6, type: "host", name: "Sarla Devi", firstName: "Sarla", role: "Folklore keeper", region: "Jaisalmer, Rajasthan", image: "/hosts/sarla_devi.jpg", description: "Her dusk-time tales carry desert wisdom from one generation to the next." },
  { id: 7, type: "host", name: "Arjun Singh", firstName: "Arjun", role: "Instrument Maker", region: "Varanasi, UP", image: "/hosts/arjun_singh.jpg", description: "Crafts traditional string instruments, passing down exact measurements by memory." },
  { id: 8, type: "host", name: "Lakshmi N.", firstName: "Lakshmi", role: "Temple Dancer", region: "Thanjavur, TN", image: "/hosts/lakshmi_n.jpg", description: "Preserves the ancient mudras and steps of classical temple dedications." },
  { id: 9, type: "host", name: "Tashi Namgyal", firstName: "Tashi", role: "Thangka Painter", region: "Leh, Ladakh", image: "/hosts/tashi_namgyal.jpg", description: "Paints the cosmos using crushed minerals, a meditative practice held for centuries." }
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
      <Header />

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
