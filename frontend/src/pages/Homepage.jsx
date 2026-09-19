import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TOOLS, CATEGORIES } from "@/lib/toolsRegistry";
import { Search, Sparkles, ArrowRight, Zap, Lock, Feather, Star, ShieldCheck, Cpu } from "lucide-react";
import { useState } from "react";
import SEO from "@/components/SEO";
import Newsletter from "@/components/Newsletter";
import FAQ from "@/components/FAQ";
import SearchDialog from "@/components/SearchDialog";
import { useNavigate } from "react-router-dom";

const HERO_FAQ = [
  { q: "Is Toolstack really free?", a: "Yes. All tools listed here are free and require no account. We plan to offer optional premium features later, but core utilities will stay free forever." },
  { q: "Do you upload my files?", a: "No. Every image, password, JSON, and calculation tool runs 100% locally in your browser. AI writing tools stream prompts to AI providers securely." },
  { q: "Will you add more tools?", a: "Yes. Toolstack is built to scale to hundreds of online utilities. You can suggest tools to build next via the newsletter." },
  { q: "Can I embed a tool on my site?", a: "Embed widgets and API endpoints are on our roadmap. For now, feel free to share direct links to any tool page." },
];

const TESTIMONIALS = [
  {
    quote: "I used to jump between 5 different tabs for JSON formatting and image compression. Toolstack replaced all of them with a clean, ad-free interface.",
    name: "Aditi R.",
    role: "Product Designer",
    avatar: "https://images.pexels.com/photos/30426363/pexels-photo-30426363.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    quote: "The JSON formatter is blazing fast and runs locally in my browser. Zero latency, zero data tracking. Exactly what developers need.",
    name: "Marcus J.",
    role: "Backend Engineer",
    avatar: "https://images.pexels.com/photos/20157010/pexels-photo-20157010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const popular = TOOLS.filter((t) => t.popular);
  const trending = TOOLS.filter((t) => t.trending);
  const aiTools = TOOLS.filter((t) => t.category === "ai");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Toolstack",
    url: "https://toolstack.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://toolstack.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <SEO
        title="Toolstack — Free online utility tools that just work"
        description="A modern, minimal platform for free online tools: JSON Formatter, Image Compressor, Password Generator, QR Code Generator, Word Counter, Base64, SIP & EMI Calculators, and AI Writing Tools."
        path="/"
        jsonLd={jsonLd}
      />

      {/* HERO SECTION */}
      <section data-testid="hero-section" className="relative overflow-hidden noise border-b border-border/40">
        <div className="absolute inset-0 grid-bg opacity-70" />
        <div className="hero-blob w-[520px] h-[520px] -top-40 -left-32 bg-primary/20" />
        <div className="hero-blob w-[420px] h-[420px] -top-24 right-0 bg-[hsl(var(--violet))/30]" style={{ background: 'hsl(var(--violet) / 0.25)' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pt-28 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3.5 py-1 text-xs font-medium backdrop-blur">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-muted-foreground">{TOOLS.length} tools live · more added weekly</span>
            </div>

            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-heading leading-[1.08]">
              Find the right tool <span className="bg-gradient-to-r from-primary to-violet bg-clip-text text-transparent">instantly</span>.
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed font-body">
              A calm, fast home for the utilities you keep googling. Format JSON, compress images, generate passwords, draft emails with AI — no ads in your face, no forced logins.
            </p>

            <div className="mt-8 max-w-xl">
              <button
                data-testid="hero-search-btn"
                onClick={() => setSearchOpen(true)}
                className="group w-full flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-left transition-all hover:border-primary/60 glow-blue shadow-lg"
              >
                <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="flex-1 text-muted-foreground text-sm sm:text-base">Search tools — try "json", "image", or "resume"…</span>
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  ⌘K
                </kbd>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="text-muted-foreground font-medium mr-1">Popular:</span>
              {popular.slice(0, 5).map((t) => (
                <Link
                  key={t.slug}
                  to={`/${t.slug}`}
                  data-testid={`hero-chip-${t.slug}`}
                  className="rounded-full border border-border bg-card px-3.5 py-1 text-xs hover:border-primary/60 hover:bg-secondary/60 transition-all font-medium"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Value proposition cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Zap, title: "Instant", body: "Every tool loads in under a second and executes locally on your device." },
              { icon: Lock, title: "Private", body: "Your files and inputs never leave your browser. No accounts, no tracking." },
              { icon: Feather, title: "Minimal", body: "Designed for deep focus. Clean typography, sensible defaults, no annoying clutter." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 transition-all hover:border-border/80 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <v.icon className="h-5 w-5" />
                </div>
                <div className="font-semibold text-base font-heading">{v.title}</div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR TOOLS GRID */}
      <ToolsSection id="popular-tools" title="Popular right now" subtitle="WHAT PEOPLE ARE OPENING MOST THIS WEEK" tools={popular} />

      {/* CATEGORIES DIRECTORY */}
      <section data-testid="categories-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading kicker="TOOL CATEGORIES" title="Browse by what you need" />
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {Object.entries(CATEGORIES).map(([k, c]) => {
            const count = TOOLS.filter((t) => t.category === k).length;
            return (
              <Link
                key={k}
                to={`/category/${k}`}
                data-testid={`category-tile-${k}`}
                className="group relative rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${c.color}15`, color: c.color }}
                >
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="mt-4 font-semibold text-sm font-heading">{c.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{count} tool{count !== 1 ? 's' : ''}</div>
                <ArrowRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* AI TOOLS HIGHLIGHT BAND */}
      {aiTools.length > 0 && (
        <section data-testid="ai-tools-section" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative overflow-hidden rounded-3xl border border-border p-8 sm:p-12 shadow-xl" style={{
            background: "linear-gradient(135deg, hsl(var(--primary)/0.12), hsl(var(--violet)/0.16))",
          }}>
            <div className="max-w-xl">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">AI ASSISTANTS</div>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight font-heading">
                Draft emails, summaries & cover letters with AI
              </h2>
              <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
                Purpose-built prompts, customizable tones, and instant generation — for professionals who value clear communication.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {aiTools.map((t) => (
                  <Link key={t.slug} to={`/${t.slug}`} data-testid={`ai-band-${t.slug}`} className="btn-primary">
                    {t.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TRENDING TOOLS GRID */}
      <ToolsSection id="trending-tools" title="Trending tools" subtitle="FAST-GROWING UTILITIES" tools={trending} />

      {/* TESTIMONIALS */}
      <section data-testid="testimonials-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-border/40">
        <SectionHeading kicker="COMMUNITY FEEDBACK" title="Loved by developers & creators" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-base leading-relaxed text-foreground font-body">"{t.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover border border-border" loading="lazy" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section data-testid="home-faq-section" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading kicker="FREQUENTLY ASKED QUESTIONS" title="Answers before you ask" />
        <div className="mt-8">
          <FAQ items={HERO_FAQ} />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Newsletter />
      </section>

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onPick={(slug) => { setSearchOpen(false); navigate(`/${slug}`); }}
      />
    </>
  );
}

function SectionHeading({ kicker, title }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">{kicker}</div>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight font-heading">{title}</h2>
      </div>
    </div>
  );
}

function ToolsSection({ id, title, subtitle, tools }) {
  return (
    <section id={id} data-testid={`section-${id}`} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading kicker={subtitle} title={title} />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {tools.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
      </div>
    </section>
  );
}

export function ToolCard({ tool, index = 0 }) {
  const Icon = tool.icon;
  const c = CATEGORIES[tool.category];
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Link
      to={`/${tool.slug}`}
      data-testid={`tool-card-${tool.slug}`}
      onMouseMove={onMove}
      className="tool-card fade-in-up group"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div
        className="h-11 w-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ background: `${c?.color || '#2563EB'}18`, color: c?.color || '#2563EB' }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-base font-semibold font-heading group-hover:text-primary transition-colors">{tool.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">{tool.tagline}</p>
      <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{c?.label || 'Utility'}</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
