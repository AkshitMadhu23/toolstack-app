import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

const SAMPLE = "";

export default function WordCounter() {
  const [text, setText] = useState(SAMPLE);

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = (text.match(/[.!?]+(\s|$)/g) || []).length;
    const paragraphs = text.trim() ? text.trim().split(/\n{2,}/).length : 0;
    const readingMin = Math.max(1, Math.round(words / 225));
    const speakingMin = Math.max(1, Math.round(words / 130));
    return { chars, charsNoSpace, words, sentences, paragraphs, readingMin, speakingMin };
  }, [text]);

  const Stat = ({ label, value }) => (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-3xl font-semibold tracking-tighter">{value}</div>
      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mt-1">{label}</div>
    </div>
  );

  return (
    <div data-testid="tool-word-counter" className="grid lg:grid-cols-[1fr_360px] gap-4">
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="text-sm font-medium">Your text</div>
          <button data-testid="wc-clear" onClick={() => setText("")} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <Trash2 className="h-3 w-3" /> Clear
          </button>
        </div>
        <textarea
          data-testid="wc-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste an article, essay, tweet, or SEO copy…"
          className="w-full min-h-[440px] resize-none bg-transparent px-5 py-4 text-base outline-none placeholder:text-muted-foreground/60 leading-relaxed"
        />
      </div>
      <aside className="grid grid-cols-2 gap-3 h-fit">
        <Stat label="Words" value={stats.words} />
        <Stat label="Characters" value={stats.chars} />
        <Stat label="Chars (no spaces)" value={stats.charsNoSpace} />
        <Stat label="Sentences" value={stats.sentences} />
        <Stat label="Paragraphs" value={stats.paragraphs} />
        <Stat label="Reading time" value={`${stats.readingMin}m`} />
        <div className="col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Speaking time</div>
          <div className="mt-1 text-2xl font-semibold tracking-tighter">{stats.speakingMin} minute{stats.speakingMin > 1 ? "s" : ""}</div>
          <div className="mt-1 text-xs text-muted-foreground">at 130 words/min</div>
        </div>
      </aside>
    </div>
  );
}
