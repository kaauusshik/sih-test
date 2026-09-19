import { Link, useLocation } from "react-router-dom";
import { Search, LogIn, Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

function Mark() {
  return (
    <img
      className="brand-logo"
      src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200"
      alt="VIRASYA"
    />
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setMenuOpen(false);

  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("virasya-user") || "null");
      setUser(storedUser);
    } catch {
      setUser(null);
    }

    const storedTheme = localStorage.getItem("virasya-theme") as "dark" | "light" | null;
    if (storedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.add("light-theme");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("virasya-theme", newTheme);
      if (newTheme === "light") {
        document.documentElement.classList.add("light-theme");
      } else {
        document.documentElement.classList.remove("light-theme");
      }
      return newTheme;
    });
  };

  const isStories = location.pathname === "/stories";
  const isHosts = location.pathname === "/hosts";
  const isStudio = location.pathname === "/studio";

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" to="/" onClick={closeMenu}>
          <Mark />
          <span>VIRASYA</span>
        </Link>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <Link className={isStories ? "nav-link-active" : ""} to="/stories" onClick={closeMenu}>
            Explore stories
          </Link>
          <Link className={isHosts ? "nav-link-active" : ""} to="/hosts" onClick={closeMenu}>
            Meet the hosts
          </Link>
          <Link className={isStudio ? "nav-link-active" : ""} to="/studio" onClick={closeMenu}>
            AI story studio
          </Link>
          
          <button className="header-icon-button" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <Link to="/search" className="header-icon-button" onClick={closeMenu} aria-label="Search">
            <Search size={16} />
          </Link>
          
          {user ? (
            <Link to="/dashboard" className="header-user-button" onClick={closeMenu}>
              <span className="header-user-avatar">
                {user.avatar ? (
                  <img src={user.avatar} className="header-user-avatar-image" alt="Profile" />
                ) : (
                  user.name
                    .split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                )}
              </span>
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link to="/login" className="header-login-button" onClick={closeMenu}>
              <LogIn size={14} strokeWidth={1.6} />
              Log in
            </Link>
          )}
          <Link className="button button-small" to="/preserve" onClick={closeMenu}>
            Preserve a story <ArrowRight size={14} />
          </Link>
        </nav>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}
