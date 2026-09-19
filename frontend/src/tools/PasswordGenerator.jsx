import { useEffect, useState } from "react";
import { RefreshCw, Copy, Check, Shield } from "lucide-react";

const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/~",
};

function generate(len, opts) {
  let pool = "";
  if (opts.lower) pool += SETS.lower;
  if (opts.upper) pool += SETS.upper;
  if (opts.digits) pool += SETS.digits;
  if (opts.symbols) pool += SETS.symbols;
  if (!pool) return "";
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => pool[n % pool.length]).join("");
}

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (pw.length >= 16) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 5);
}

const LABELS = ["Weak", "Weak", "Okay", "Good", "Strong", "Fortress"];
const COLORS = ["#ef4444", "#ef4444", "#f59e0b", "#eab308", "#10b981", "#2563EB"];

export default function PasswordGenerator() {
  const [len, setLen] = useState(20);
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true });
  const [pw, setPw] = useState("");
  const [copied, setCopied] = useState(false);

  const regen = () => setPw(generate(len, opts));

  useEffect(() => { regen(); /* eslint-disable-next-line */ }, [len, opts]);

  const s = strength(pw);

  const copy = async () => {
    await navigator.clipboard.writeText(pw);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div data-testid="tool-password-gen" className="grid lg:grid-cols-[1fr_320px] gap-4">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Your new password</div>
        <div className="relative mt-3">
          <div data-testid="password-display" className="rounded-2xl border border-border bg-secondary/40 px-5 py-6 font-mono text-lg sm:text-2xl break-all min-h-[92px]">
            {pw || <span className="text-muted-foreground">Pick options →</span>}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 mr-4">
              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full transition-all duration-300" style={{ width: `${(s / 5) * 100}%`, background: COLORS[s] }} />
              </div>
              <span className="text-xs w-16 text-right" style={{ color: COLORS[s] }}>{LABELS[s]}</span>
            </div>
            <div className="flex gap-2">
              <button data-testid="pw-regen-btn" onClick={regen} className="btn-ghost"><RefreshCw className="h-4 w-4" /> Regenerate</button>
              <button data-testid="pw-copy-btn" onClick={copy} className="btn-primary">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy"}</button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-border p-4 bg-secondary/30">
          <Shield className="h-4 w-4 text-primary mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Generated locally using <code className="font-mono">crypto.getRandomValues()</code>. Never transmitted, never stored.
          </p>
        </div>
      </div>

      <aside className="rounded-2xl border border-border bg-card p-6 space-y-5 h-fit">
        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Length · {len}</label>
          <input data-testid="pw-length" type="range" min="6" max="64" step="1" value={len} onChange={(e) => setLen(parseInt(e.target.value))} className="w-full accent-primary mt-2" />
        </div>
        {[
          ["upper", "Uppercase (A-Z)"],
          ["lower", "Lowercase (a-z)"],
          ["digits", "Numbers (0-9)"],
          ["symbols", "Symbols (!@#…)"],
        ].map(([k, label]) => (
          <label key={k} className="flex items-center justify-between text-sm cursor-pointer">
            <span>{label}</span>
            <button
              type="button"
              data-testid={`pw-opt-${k}`}
              onClick={() => setOpts((o) => ({ ...o, [k]: !o[k] }))}
              className={`h-6 w-11 rounded-full transition-colors ${opts[k] ? "bg-primary" : "bg-secondary"} relative`}
              aria-pressed={opts[k]}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${opts[k] ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </label>
        ))}
      </aside>
    </div>
  );
}
