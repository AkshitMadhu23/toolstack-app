import { useState } from "react";
import { Sparkles, Copy, Check, MailCheck, RefreshCw } from "lucide-react";

export default function AiCoverLetter() {
  const [jobTitle, setJobTitle] = useState("Product Designer");
  const [company, setCompany] = useState("Acme Corp");
  const [highlights, setHighlights] = useState("Designed a design system used by 20+ engineers; increased user retention by 15%.");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const generatedLetter = `Dear Hiring Manager at ${company},\n\nI am writing to express my enthusiastic interest in the ${jobTitle} position at ${company}. With a background in building user-centered digital experiences and driving product outcomes, I am eager to contribute to your team's ongoing innovation.\n\nThroughout my career, I have focused on solving complex workflow challenges through thoughtful design and high-velocity iteration. Recently, I ${highlights.toLowerCase()}\n\nWhat excites me most about ${company} is your commitment to quality and craftsmanship. I would love the opportunity to discuss how my skill set and passion for design excellence align with your team's goals.\n\nThank you for your time and consideration.\n\nSincerely,\n[Your Name]`;
      setLetter(generatedLetter);
      setLoading(false);
    }, 900);
  };

  const copy = async () => {
    if (!letter) return;
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div data-testid="tool-cover-letter" className="grid lg:grid-cols-2 gap-6">
      {/* Configuration Box */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2 text-base font-semibold border-b border-border pb-3">
          <Sparkles className="h-5 w-5 text-violet" />
          <span>Job Details</span>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">Target Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full rounded-xl border border-border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-primary"
            placeholder="e.g. Senior Product Manager"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">Target Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-xl border border-border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-primary"
            placeholder="e.g. Stripe"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">Key Experience Highlights</label>
          <textarea
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-border bg-transparent p-3.5 text-sm outline-none focus:border-primary resize-none"
            placeholder="Briefly state your top achievement or experience relevant to this role…"
          />
        </div>

        <button
          onClick={generate}
          disabled={loading || !jobTitle || !company}
          className="btn-primary w-full py-3 text-sm font-medium mt-2"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          <span>{loading ? "Writing Cover Letter…" : "Generate Cover Letter"}</span>
        </button>
      </div>

      {/* Result Box */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-secondary/30">
          <div className="flex items-center gap-2 text-sm font-medium">
            <MailCheck className="h-4 w-4 text-violet" />
            <span>Generated Cover Letter</span>
          </div>
          {letter && (
            <button onClick={copy} className="btn-ghost !py-1 !px-3 text-xs">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          )}
        </div>
        <div className="p-6 flex-1 text-sm leading-relaxed font-sans text-foreground overflow-auto">
          {letter ? (
            <div className="whitespace-pre-wrap bg-secondary/30 p-5 rounded-xl border border-border/60">{letter}</div>
          ) : (
            <div className="text-muted-foreground text-center py-12 italic">
              Fill in the job details on the left and click Generate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
