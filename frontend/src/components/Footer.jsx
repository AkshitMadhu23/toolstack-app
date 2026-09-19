import { Link } from "react-router-dom";
import { TOOLS, CATEGORIES } from "@/lib/toolsRegistry";
import { Sparkles, Github, Twitter } from "lucide-react";

export default function Footer() {
  const byCat = Object.keys(CATEGORIES).map((k) => ({
    key: k,
    label: CATEGORIES[k].label,
    tools: TOOLS.filter((t) => t.category === k),
  }));
  return (
    <footer data-testid="site-footer" className="mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-semibold tracking-tight">Toolstack</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              A quiet home for free, fast, private online utilities. No sign-ups, no dark patterns.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://github.com" aria-label="GitHub" data-testid="footer-github" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" data-testid="footer-twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          {byCat.filter(c => c.tools.length > 0).map((c) => (
            <div key={c.key}>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {c.label}
              </div>
              <ul className="space-y-2">
                {c.tools.map((t) => (
                  <li key={t.slug}>
                    <Link to={`/${t.slug}`} className="text-sm hover:text-primary transition-colors">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Toolstack — Built for makers.
          </p>
          <p className="text-xs text-muted-foreground">
            Everything runs locally in your browser. No accounts, no tracking of your data.
          </p>
        </div>
      </div>
    </footer>
  );
}
