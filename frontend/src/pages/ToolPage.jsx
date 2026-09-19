import { Link, useParams } from "react-router-dom";
import { getTool, getRelated, CATEGORIES } from "@/lib/toolsRegistry";
import SEO from "@/components/SEO";
import FAQ from "@/components/FAQ";
import NotFound from "@/pages/NotFound";
import { ChevronRight, Home, ArrowRight, Share2, Check } from "lucide-react";
import { useState, Suspense, lazy } from "react";
import { ToolCard } from "@/pages/HomePage";

const TOOL_COMPONENTS = {
  "json-formatter": lazy(() => import("@/tools/JSONFormatter")),
  "image-compressor": lazy(() => import("@/tools/ImageCompressor")),
  "png-to-jpg": lazy(() => import("@/tools/PngJpgConverter")),
  "password-generator": lazy(() => import("@/tools/PasswordGenerator")),
  "qr-code-generator": lazy(() => import("@/tools/QRCodeGenerator")),
  "word-counter": lazy(() => import("@/tools/WordCounter")),
  "base64-encoder": lazy(() => import("@/tools/Base64Encoder")),
  "sip-calculator": lazy(() => import("@/tools/SipCalculator")),
  "emi-calculator": lazy(() => import("@/tools/EmiCalculator")),
  "ai-email-writer": lazy(() => import("@/tools/AiEmailWriter")),
  "ai-resume-summary": lazy(() => import("@/tools/AiResumeSummary")),
  "ai-cover-letter": lazy(() => import("@/tools/AiCoverLetter")),
};

export default function ToolPage() {
  const { slug } = useParams();
  const tool = getTool(slug);
  const [copied, setCopied] = useState(false);

  if (!tool) return <NotFound />;

  const ToolComponent = TOOL_COMPONENTS[slug];
  const related = getRelated(slug);
  const cat = CATEGORIES[tool.category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0" },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: tool.name, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {}
  };

  return (
    <>
      <SEO
        title={`${tool.name} — Free online tool | Toolstack`}
        description={tool.description}
        path={`/${tool.slug}`}
        keywords={tool.keywords}
        jsonLd={[jsonLd, faqLd]}
      />
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <nav data-testid="breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground"><Home className="h-3 w-3" /> Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/category/${tool.category}`} className="hover:text-foreground">{cat?.label}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{tool.name}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat?.color }} />
              {cat?.label}
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tighter">{tool.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl">{tool.tagline}</p>
          </div>
          <button
            data-testid="share-btn"
            onClick={share}
            className="btn-ghost mt-2"
          >
            {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Share2 className="h-4 w-4" /> Share</>}
          </button>
        </div>
      </section>

      {/* Tool interface */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="rounded-2xl border border-border p-16 text-center text-sm text-muted-foreground">Loading tool…</div>}>
          <ToolComponent />
        </Suspense>
      </section>

      {/* How to use + Advantages */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-8">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">How to use</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tighter">Get started in seconds</h2>
          <ol className="mt-5 space-y-3">
            {tool.howTo.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary text-xs font-medium">{i + 1}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">About this tool</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tighter">Why {tool.name}?</h2>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Runs in your browser — no uploads, private by default.</li>
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Zero-config, no sign-up, no watermark.</li>
            <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Mobile-friendly and keyboard-accessible.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">FAQs</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tighter">Common questions</h2>
        <div className="mt-6"><FAQ items={tool.faqs} /></div>
      </section>

      {/* Related tools */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Related tools</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tighter">Try one of these</h2>
          </div>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            All tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
        </div>
      </section>
    </>
  );
}
