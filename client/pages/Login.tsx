import { FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, LogIn, Mail, Menu, UserPlus, UserRound, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
function Mark() {
  return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />;
}

export default function Login() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);

  const isSignup = mode === "signup";

  const switchMode = () => {
    setMode(isSignup ? "login" : "signup");
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("Please fill in all fields.");
        return;
      }
      if (password.trim().length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
        const user = { name: name.trim(), email: userCredential.user.email, avatar: userCredential.user.photoURL };
        localStorage.setItem("virasya-user", JSON.stringify(user));
        navigate("/dashboard");
      } catch (err: any) {
        setError(err.message || "Failed to create account.");
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setError("Please fill in all fields.");
        return;
      }
      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
        const user = { name: userCredential.user.displayName || "User", email: userCredential.user.email, avatar: userCredential.user.photoURL };
        localStorage.setItem("virasya-user", JSON.stringify(user));
        navigate("/dashboard");
      } catch (err: any) {
        setError(err.message || "Failed to sign in. Check your credentials.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOAuth = async (provider: "Google" | "GitHub") => {
    setIsLoading(true);
    setError("");
    try {
      const authProvider = provider === "Google" ? googleProvider : githubProvider;
      const userCredential = await signInWithPopup(auth, authProvider);
      const user = { 
        name: userCredential.user.displayName || `${provider} User`, 
        email: userCredential.user.email,
        avatar: userCredential.user.photoURL
      };
      localStorage.setItem("virasya-user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="site-shell login-page">
      <header className="site-header">
        <div className="container header-inner">
          <Link className="wordmark" to="/" onClick={closeMenu}><Mark /><span>VIRASYA</span></Link>
          <nav id="login-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
            <Link to="/stories" onClick={closeMenu}>Explore stories</Link>
            <Link to="/hosts" onClick={closeMenu}>Meet the hosts</Link>
            <Link to="/studio" onClick={closeMenu}>AI story studio</Link>
            <Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story <ArrowRight size={14} /></Link>
          </nav>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="login-navigation">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <section className="login-section">
        {/* Decorative background elements */}
        <div className="login-bg" aria-hidden="true">
          <div className="login-glow login-glow-1" />
          <div className="login-glow login-glow-2" />
          <div className="login-orbit login-orbit-1" />
          <div className="login-orbit login-orbit-2" />
          <div className="login-orbit login-orbit-3" />
        </div>

        <div className="login-card">


          <div className="login-card-header">
            <div className="login-icon-ring">
              {isSignup ? <UserPlus size={24} strokeWidth={1.4} /> : <LogIn size={24} strokeWidth={1.4} />}
            </div>
            <p className="eyebrow">{isSignup ? "Join the archive" : "Welcome back"}</p>
            <h1>{isSignup ? <>Begin<br /><em>your thread.</em></> : <>Step into<br /><em>your archive.</em></>}</h1>
            <p className="login-subtitle">
              {isSignup
                ? "Create your account to save stories, follow cultures, and preserve your memories."
                : "Sign in to save stories, follow cultures, and keep your memories close."}
            </p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            {isSignup && (
              <label className="login-field">
                <span className="login-field-label">Full name</span>
                <div className="login-input-wrap">
                  <UserRound size={16} strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </label>
            )}

            <label className="login-field">
              <span className="login-field-label">Email</span>
              <div className="login-input-wrap">
                <Mail size={16} strokeWidth={1.5} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </label>

            <label className="login-field">
              <span className="login-field-label">Password</span>
              <div className="login-input-wrap">
                <LogIn size={16} strokeWidth={1.5} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignup ? "Create a password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  required
                />
                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {!isSignup && (
              <div className="login-options">
                <label className="login-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="login-forgot">Forgot password?</button>
              </div>
            )}

            <button
              type="submit"
              className={`button login-submit ${isLoading ? "is-loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="login-spinner" />
                  {isSignup ? "Creating account…" : "Signing in…"}
                </>
              ) : (
                <>
                  {isSignup ? "Create account" : "Sign in"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="login-divider">
            <span>or continue with</span>
          </div>

          <div className="login-social-row">
            <button type="button" className="login-social-button" onClick={() => handleOAuth("Google")} disabled={isLoading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button type="button" className="login-social-button" onClick={() => handleOAuth("GitHub")} disabled={isLoading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              GitHub
            </button>
          </div>

          <p className="login-footer-text">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button type="button" className="login-link" onClick={switchMode}>
              {isSignup ? "Sign in" : "Create one"}
            </button>
          </p>
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
