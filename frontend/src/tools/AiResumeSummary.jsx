import { useState } from "react";
import { Sparkles, Copy, Check, FileText, RefreshCw } from "lucide-react";

export default function AiResumeSummary() {
  const [role, setRole] = useState("Full Stack Developer");
  const [experience, setExperience] = useState("4 years");
  const [skills, setSkills] = useState("React, Node.js, TypeScript, PostgreSQL, AWS");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const generatedText = `Results-driven ${role} with over ${experience} of experience building scalable web applications. Proven track record in ${skills.split(",").slice(0, 3).join(", ")}, specializing in high-performance frontend architectures and reliable backend microservices. Passionate about clean code, developer experience, and delivering measurable business impact.`;
      setSummary(generatedText);
      setLoading(false);
    }, 800);
  };

  const copy = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div data-testid="tool-resume-summary" className="grid lg:grid-cols-2 gap-6">
      {/* Configuration Box */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2 text-base font-semibold border-b border-border pb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>Resume Parameters</span>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">Target Job Title</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-primary"
            placeholder="e.g. Senior Frontend Engineer"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">Years of Experience</label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full rounded-xl border border-border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-primary"
            placeholder="e.g. 5+ years"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">Top Skills & Achievements</label>
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-border bg-transparent p-3.5 text-sm outline-none focus:border-primary resize-none"
            placeholder="e.g. React, GraphQL, performance optimization, led team of 4"
          />
        </div>

        <button
          onClick={generate}
          disabled={loading || !role}
          className="btn-primary w-full py-3 text-sm font-medium mt-2"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          <span>{loading ? "Crafting Summary…" : "Generate Resume Summary"}</span>
        </button>
      </div>

      {/* Result Box */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-secondary/30">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4 text-emerald-500" />
            <span>Generated Summary</span>
          </div>
          {summary && (
            <button onClick={copy} className="btn-ghost !py-1 !px-3 text-xs">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          )}
        </div>
        <div className="p-6 flex-1 text-sm leading-relaxed font-sans text-foreground">
          {summary ? (
            <p className="bg-secondary/30 p-4 rounded-xl border border-border/60">{summary}</p>
          ) : (
            <div className="text-muted-foreground text-center py-12 italic">
              Fill in your role and key skills on the left, then click Generate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
