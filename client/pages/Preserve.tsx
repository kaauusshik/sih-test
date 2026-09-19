import Header from "@/components/Header";
import { FormEvent, useState } from "react";
import { ArrowRight, CircleHelp, FileAudio, ImagePlus, LogIn, Mail, Menu, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Mark() {
  return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />;
}

export default function Preserve() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const [thumbnailData, setThumbnailData] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("virasya-user") || "null"); } catch { return null; }
  });
  const closeMenu = () => setMenuOpen(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const category = String(form.get("category") || "Community Archive");
    const submission = {
      id: Date.now(),
      title: String(form.get("title")),
      category: category,
      image: thumbnailData || "https://images.unsplash.com/photo-1605335028442-f04523c02d18?auto=format&fit=crop&w=1200&q=85",
      region: String(form.get("region")),
      duration: "3 min",
      excerpt: String(form.get("story")).substring(0, 100) + "...",
      storyteller: String(form.get("storyteller")),
      story: String(form.get("story")),
      email,
      audio: fileName,
      submittedAt: new Date().toISOString(),
    };
    
    // Save to user profile (Dashboard)
    localStorage.setItem("virasaya-preserve-submission", JSON.stringify(submission));
    
    // Append to global stories (Stories page)
    const existing = JSON.parse(localStorage.getItem("virasaya-custom-stories") || "[]");
    localStorage.setItem("virasaya-custom-stories", JSON.stringify([submission, ...existing]));

    // Update Artifacts Count for Homepage & Dashboard
    const countsStr = localStorage.getItem("virasaya-culture-counts");
    const counts = countsStr ? JSON.parse(countsStr) : {
      "oral-histories": 3,
      "food-recipes": 2,
      "traditional-crafts": 2,
      "folklore": 2,
    };
    counts["oral-histories"] = (counts["oral-histories"] || 0) + 1;
    localStorage.setItem("virasaya-culture-counts", JSON.stringify(counts));

    setFeedback("Your story has been placed in the archive! Redirecting...");
    
    setTimeout(() => {
      navigate("/stories");
    }, 1500);
  }

  return (
    <main className="site-shell preserve-page">
      <Header />

      <section className="preserve-hero container">
        <div className="preserve-hero-copy">
          <p className="eyebrow">The community archive · 03</p>
          <h1>Give your story<br /><em>a place to stay.</em></h1>
          <p className="preserve-lede">A memory, a recipe, a song your family hums without thinking. Small things become heritage when we choose to keep them.</p>
        </div>
      </section>

      <section className="container preserve-layout">
        <aside className="preserve-aside preserve-tutorial">
          <p className="eyebrow">Tutorial</p>
          <h3>How to preserve a story</h3>
          <p className="tutorial-intro">Your memories are precious. Follow these steps to ensure they are captured with the richness and context they deserve.</p>
          
          <ul className="tutorial-steps">
            <li>
              <strong>1. Choose a meaningful memory</strong>
              <p>Start with a memory that feels significant. It could be an old folk tale, a recipe passed down, or a childhood experience.</p>
            </li>
            <li>
              <strong>2. Provide the essential context</strong>
              <p>Fill out the title, the storyteller, and the region. Context roots the story in its rightful cultural landscape.</p>
            </li>
            <li>
              <strong>3. Write it how you remember it</strong>
              <p>Don't worry about perfect grammar. Authentic stories are told in your natural voice, just like you would speak them.</p>
            </li>
            <li>
              <strong>4. Add a voice note (optional)</strong>
              <p>If you can, record yourself or the storyteller telling the story. Hearing the emotion in the voice adds an irreplaceable layer to the archive.</p>
            </li>
          </ul>
          
          <div className="mock-notice"><CircleHelp size={17} /><p><strong>Demo mode</strong>Submission is stored locally in the archive database. Email notification is mocked.</p></div>
        </aside>

        <form className="preserve-form" onSubmit={handleSubmit} aria-describedby="preserve-feedback">
          <div id="preserve-feedback" className={feedback ? "interaction-feedback visible" : "interaction-feedback"} role="status" aria-live="polite">{feedback}</div>
          <p className="eyebrow">Start with a memory</p>
          <h2>What would you<br /><em>like to pass on?</em></h2>
          <div className="form-divider" />
          <div className="form-grid">
            <label className="form-field">Story title<input name="title" required placeholder="The summer the river came" defaultValue="Grandmother's Khichdi" /></label>
            <label className="form-field">Who carries this story?<input name="storyteller" required placeholder="Your name or their name" defaultValue="Nirmala Devi" /></label>
            <label className="form-field">Where is it from?<input name="region" required placeholder="Town, region, or home" defaultValue="Puri, Odisha" /></label>
            <label className="form-field">Category<select name="category" required defaultValue="Food heritage"><option value="Oral history">Oral history</option><option value="Craft & song">Craft & song</option><option value="Folklore">Folklore</option><option value="Food heritage">Food heritage</option><option value="Rituals & Festivals">Rituals & Festivals</option><option value="Performing Arts">Performing Arts</option><option value="Traditional Knowledge">Traditional Knowledge</option><option value="Architecture & Sites">Architecture & Sites</option><option value="Literature & Poetry">Literature & Poetry</option></select></label>
            <label className="form-field" style={{ gridColumn: '1 / -1' }}>Your email <small>(optional)</small><input name="email" type="email" placeholder="So we can follow up" defaultValue="demo@virasya.org" /></label>
          </div>
          <label className="form-field story-field">The story <small>Write it how you remember it</small><textarea name="story" required rows={8} placeholder="My grandmother used to say..." defaultValue="My grandmother used to say that every recipe begins with a story. When the monsoon came, she would make a pot of khichdi and call every neighbour home. The scent of roasted cumin and ghee would fill the courtyard, a signal that the rains were here to stay. This isn't just a recipe; it's the memory of a house that was always open to everyone." /></label>
          <div className="form-grid" style={{ marginTop: '1.5rem' }}>
            <label className="upload-field"><ImagePlus size={20} /><span><strong>Add a thumbnail</strong><small>{thumbnailName || "Optional · select an image"}</small></span><input name="thumbnail" type="file" accept="image/*" onChange={handleImageUpload} /></label>
            <label className="upload-field"><FileAudio size={20} /><span><strong>Add a voice note</strong><small>{fileName || "Optional · audio upload is MOCKED in this preview"}</small></span><input name="audio" type="file" accept="audio/*" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} /></label>
          </div>
          <div className="form-footer"><p>By sharing, you agree that Virāsaya may preserve this story with care.</p><button className="button" type="submit">Place it in the archive <ArrowRight size={16} /></button></div>
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
