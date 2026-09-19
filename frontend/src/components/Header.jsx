import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Search, Command, Sparkles, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect } from "react";
import SearchDialog from "@/components/SearchDialog";

export default function Header() {
  const { theme, toggle } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        data-testid="site-header"
        className="sticky top-0 z-40 glass transition-all"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            data-testid="header-logo-link"
            className="flex items-center gap-2.5 group"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
              <Sparkles className="h-4 w-4" strokeWidth={2.5} />
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" />
            </div>
            <span className="text-xl font-bold tracking-tight font-heading">Toolstack</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link to="/category/developer" data-testid="nav-developer" className="rounded-full px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">Developer</Link>
            <Link to="/category/ai" data-testid="nav-ai" className="rounded-full px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">AI</Link>
            <Link to="/category/image" data-testid="nav-image" className="rounded-full px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">Image</Link>
            <Link to="/category/finance" data-testid="nav-finance" className="rounded-full px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">Finance</Link>
            <Link to="/category/text" data-testid="nav-text" className="rounded-full px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">Text</Link>
            <Link to="/category/security" data-testid="nav-security" className="rounded-full px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">Security</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              data-testid="header-search-btn"
              onClick={() => setSearchOpen(true)}
              className="group hidden sm:flex items-center gap-2 rounded-full border border-border bg-secondary/50 pl-3.5 pr-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-sm"
            >
              <Search className="h-4 w-4" />
              <span>Search tools…</span>
              <span className="ml-2 hidden md:flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                <Command className="h-3 w-3" />K
              </span>
            </button>

            <button
              data-testid="header-search-btn-mobile"
              onClick={() => setSearchOpen(true)}
              className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              data-testid="theme-toggle-btn"
              onClick={toggle}
              aria-label="Toggle theme"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 py-4 space-y-2">
            <Link
              to="/category/developer"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              Developer Tools
            </Link>
            <Link
              to="/category/ai"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              AI Tools
            </Link>
            <Link
              to="/category/image"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              Image Tools
            </Link>
            <Link
              to="/category/finance"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              Finance Calculators
            </Link>
            <Link
              to="/category/text"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              Text Tools
            </Link>
            <Link
              to="/category/security"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              Security Tools
            </Link>
          </div>
        )}
      </header>
      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onPick={(slug) => {
          setSearchOpen(false);
          navigate(`/${slug}`);
        }}
      />
    </>
  );
}
