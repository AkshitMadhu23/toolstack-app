import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/toolsRegistry";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const POPULAR = ["json-formatter", "image-compressor", "password-generator", "ai-email-writer"];

export default function SearchDialog({ open, onOpenChange, onPick }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return TOOLS;
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.tagline.toLowerCase().includes(term) ||
        t.keywords.some((k) => k.toLowerCase().includes(term))
    );
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[active];
      if (pick) onPick(pick.slug);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden gap-0 border-border bg-card">
        <VisuallyHidden.Root>
          <DialogTitle>Search tools</DialogTitle>
        </VisuallyHidden.Root>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            data-testid="search-input"
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            onKeyDown={onKeyDown}
            placeholder="Search 8 tools — try 'json' or 'image'…"
            className="flex-1 h-14 bg-transparent outline-none text-base placeholder:text-muted-foreground"
          />
          <kbd className="text-[10px] text-muted-foreground border border-border rounded-md px-1.5 py-0.5">ESC</kbd>
        </div>
        {!q && (
          <div className="px-4 pt-3 pb-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Popular
          </div>
        )}
        <div className="max-h-[360px] overflow-y-auto py-2">
          {results.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No tools match "{q}". More coming soon.
            </div>
          )}
          {results.map((t, i) => {
            const Icon = t.icon;
            const cat = CATEGORIES[t.category];
            const isPopular = POPULAR.includes(t.slug);
            return (
              <button
                key={t.slug}
                data-testid={`search-result-${t.slug}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => onPick(t.slug)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  active === i ? "bg-secondary" : ""
                }`}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border"
                  style={{ background: `${cat?.color}18`, color: cat?.color }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{t.name}</span>
                    {!q && isPopular && <Sparkles className="h-3 w-3 text-primary" />}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{t.tagline}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
