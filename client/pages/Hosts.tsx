import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { ArrowRight, Headphones, LogIn, Mail, MapPin, Menu, Radio, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

const hosts = [
  { name: "Meera Rao", firstName: "Meera", role: "Oral historian", region: "Puri, Odisha", description: "Keeps the songs and small rituals of a coastal neighbourhood alive.", image: "/hosts/meera_rao.jpg", sampleVoice: "The ocean has many voices. If you listen closely, you can hear the prayers of our ancestors in the waves." },
  { name: "Bhura Bhai", firstName: "Bhura", role: "Master weaver", region: "Kutch, Gujarat", description: "Reads family histories in colour, thread, and the rhythm of the loom.", image: "/hosts/bhura_bhai.jpg", sampleVoice: "Every thread tells a story. The red is for the earth, the blue is for the vast desert sky." },
  { name: "Sarla Devi", firstName: "Sarla", role: "Folklore keeper", region: "Jaisalmer, Rajasthan", description: "Her dusk-time tales carry desert wisdom from one generation to the next.", image: "/hosts/sarla_devi.jpg", sampleVoice: "Long ago, when the sands were young, there was a king who learned the language of the wind." },
  { name: "Arjun Singh", firstName: "Arjun", role: "Instrument Maker", region: "Varanasi, UP", description: "Crafts traditional string instruments, passing down exact measurements by memory.", image: "/hosts/arjun_singh.jpg", sampleVoice: "The wood must be perfectly aged. Only then can it sing the ancient ragas with true devotion." },
  { name: "Lakshmi N.", firstName: "Lakshmi", role: "Temple Dancer", region: "Thanjavur, TN", description: "Preserves the ancient mudras and steps of classical temple dedications.", image: "/hosts/lakshmi_n.jpg", sampleVoice: "Each mudra is a word, each movement is a sentence. We do not just dance, we speak to the divine." },
  { name: "Tashi Namgyal", firstName: "Tashi", role: "Thangka Painter", region: "Leh, Ladakh", description: "Paints the cosmos using crushed minerals, a meditative practice held for centuries.", image: "/hosts/tashi_namgyal.jpg", sampleVoice: "We grind lapis lazuli for the blue of the sky. The painting is a mirror of the mind." },
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

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const playAudio = (hostName: string, sampleText: string, firstName: string) => {
    if (playing === hostName) {
      window.speechSynthesis.cancel();
      setPlaying(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sampleText);
    utterance.lang = 'en-IN'; // Indian English accent
    
    // Basic heuristics to make voices sound a bit different based on gender/age
    const isMale = ["Bhura", "Arjun", "Tashi"].includes(firstName);
    utterance.pitch = isMale ? 0.7 : 1.2;
    utterance.rate = 0.85; // Speak slower for storytelling effect

    utterance.onend = () => setPlaying(null);
    utterance.onerror = () => setPlaying(null);

    setPlaying(hostName);
    window.speechSynthesis.speak(utterance);
  };

  return <main className="site-shell hosts-page">
    <Header />
    <section className="hosts-hero container"><div><p className="eyebrow">The people behind the stories · 06</p><h1>Meet the<br /><em>story keepers.</em></h1><p className="hosts-hero-description">The people who remember the details, hold the rhythm, and make room for a story to be heard.</p></div><div className="hosts-status"><Radio size={18} /><p>6 active hosts<br /><b>across 5 regions</b></p></div></section>
    <section className="container hosts-grid-section"><div className="hosts-section-topline"><p className="eyebrow">Living traditions</p><p>Tap a host to hear a fragment</p></div><div className="hosts-grid">{hosts.map((host) => <article className="host-card" key={host.name}><div className="host-card-image" style={{ backgroundImage: `url(${host.image})` }}><span className="host-region"><MapPin size={12} />{host.region}</span><button className={playing === host.name ? "host-audio-button is-playing" : "host-audio-button"} onClick={() => playAudio(host.name, host.sampleVoice, host.firstName)} aria-label={`${playing === host.name ? "Pause" : "Listen to"} ${host.name}`}><Headphones size={15} />{playing === host.name ? "Playing" : "Listen"}</button></div><div className="host-card-content"><p className="eyebrow">{host.role}</p><h2>{host.name}</h2><p>{host.description}</p><button className={connected === host.name ? "inline-arrow-link is-connected" : "inline-arrow-link"} onClick={() => setConnected(connected === host.name ? null : host.name)}>{connected === host.name ? `Request sent to ${host.firstName}` : `Connect with ${host.firstName}`} <ArrowRight size={15} /></button></div></article>)}</div></section>
    <section className="container stories-bottom-cta" style={{ paddingTop: 100, paddingBottom: 50 }}>
      <div>
        <h2>Host your own<br /><em>cultural & traditional folks.</em></h2>
        <p className="lede" style={{ maxWidth: 450, margin: "25px 0 0" }}>We provide all the required tools and support to help you preserve and share your traditions with the world.</p>
      </div>
      <div className="cta-actions">
        <Link className="button" to="/become-host">Become a Host ↗</Link>
      </div>
    </section>
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
