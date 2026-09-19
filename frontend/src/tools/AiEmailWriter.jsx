import { useRef, useState } from "react";
import { Sparkles, Copy, Check, RefreshCw, Loader2 } from "lucide-react";

const API = `${import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_REACT_APP_BACKEND_URL || ""}/api`;

const TONES = ["Professional", "Friendly", "Formal", "Persuasive", "Apologetic", "Enthusiastic"];
const LENGTHS = [["short", "Short"], ["medium", "Medium"], ["long", "Long"]];
const TYPES = ["Business", "Sales", "Follow-up", "HR", "Support", "Cold email", "Thank you"];

export default function AiEmailWriter() {
  const [prompt, setPrompt] = useState("Follow up with a client who hasn't replied to my proposal in 5 days. Be warm, offer to hop on a 15-min call.");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("medium");
  const [audience, setAudience] = useState("Small business owner");
  const [emailType, setEmailType] = useState("Follow-up");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef(null);

  const generate = async () => {
    setOutput("");
    setLoading(true);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`${API}/ai/email-writer/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          tone: tone.toLowerCase(),
          length,
          audience,
          email_type: emailType,
        }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        setOutput("Sorry, something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";
        for (const p of parts) {
          if (!p.startsWith("data:")) continue;
          const data = p.slice(5).trim();
          if (data === "[DONE]") { setLoading(false); return; }
          if (data.startsWith("[ERROR]")) {
            setOutput((o) => o + "\n\n" + data);
            setLoading(false);
            return;
          }
          setOutput((o) => o + data.replace(/\\n/g, "\n"));
        }
      }
    } catch (e) {
      if (e.name !== "AbortError") setOutput("Sorry, streaming failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div data-testid="tool-ai-email" className="grid lg:grid-cols-[380px_1fr] gap-4">
      <aside className="rounded-2xl border border-border bg-card p-6 space-y-5 h-fit">
        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">What is the email about?</label>
          <textarea
            data-testid="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="mt-2 w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <Select label="Email type" testid="ai-type" value={emailType} onChange={setEmailType} options={TYPES} />
        <Select label="Tone" testid="ai-tone" value={tone} onChange={setTone} options={TONES} />

        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Length</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {LENGTHS.map(([v, l]) => (
              <button
                key={v}
                data-testid={`ai-length-${v}`}
                onClick={() => setLength(v)}
                className={`rounded-xl border py-2 text-sm transition-colors ${length === v ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Audience</label>
          <input
            data-testid="ai-audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="mt-2 w-full h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <button
          data-testid="ai-generate-btn"
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="btn-primary w-full h-12 !text-base disabled:opacity-40"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Generating…" : output ? "Regenerate" : "Generate email"}
        </button>
      </aside>

      <div className="rounded-2xl border border-border bg-card p-6 min-h-[520px] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Draft</div>
          <div className="flex items-center gap-2">
            <button data-testid="ai-copy-btn" onClick={copy} disabled={!output} className="btn-ghost !py-1.5 !px-3 text-xs disabled:opacity-40">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
            </button>
            {output && !loading && (
              <button data-testid="ai-regen-btn" onClick={generate} className="btn-ghost !py-1.5 !px-3 text-xs">
                <RefreshCw className="h-3.5 w-3.5" /> Regenerate
              </button>
            )}
          </div>
        </div>
        {!output && !loading ? (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <Sparkles className="h-6 w-6 mx-auto text-primary" />
              <p className="mt-3 text-muted-foreground text-sm max-w-sm">
                Fill in the brief on the left, choose a tone, and hit generate. Your email will stream in here.
              </p>
            </div>
          </div>
        ) : (
          <pre data-testid="ai-output" className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
            {output}
            {loading && <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 align-middle animate-pulse" />}
          </pre>
        )}
      </div>
    </div>
  );
}

function Select({ label, testid, value, onChange, options }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</label>
      <select
        data-testid={testid}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
