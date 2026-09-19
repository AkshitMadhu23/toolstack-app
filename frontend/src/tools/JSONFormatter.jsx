import { useEffect, useMemo, useState } from "react";
import { Copy, Download, Check, Trash2, Braces, Minimize2, Maximize2, AlertCircle } from "lucide-react";

const SAMPLE = `{
  "name": "Toolstack",
  "founded": 2026,
  "tools": ["json-formatter","image-compressor","ai-email-writer"],
  "opensource": true,
  "meta": { "stars": 0, "ships": "weekly" }
}`;

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    try {
      const obj = JSON.parse(input);
      return { ok: true, obj };
    } catch (e) {
      return { ok: false, error: String(e.message || e) };
    }
  }, [input]);

  const output = useMemo(() => {
    if (!parsed.ok) return "";
    return JSON.stringify(parsed.obj, null, indent);
  }, [parsed, indent]);

  const minified = useMemo(() => (parsed.ok ? JSON.stringify(parsed.obj) : ""), [parsed]);

  const copy = async () => {
    await navigator.clipboard.writeText(output || input);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const download = () => {
    const blob = new Blob([output || input], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "formatted.json"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div data-testid="tool-json-formatter" className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2 text-sm">
            <Braces className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Input</span>
          </div>
          <button data-testid="json-clear-btn" onClick={() => setInput("")} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <Trash2 className="h-3 w-3" /> Clear
          </button>
        </div>
        <textarea
          data-testid="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="w-full h-[420px] resize-none bg-transparent px-4 py-3 text-sm font-mono outline-none placeholder:text-muted-foreground/60"
          placeholder="Paste your JSON here…"
        />
      </div>

      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2 text-sm">
            {parsed.ok ? (
              <>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-medium">Valid JSON</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="font-medium text-red-500">Invalid</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button data-testid="json-indent-2" onClick={() => setIndent(2)} className={`text-xs rounded-md px-2 py-1 ${indent === 2 ? "bg-secondary" : "text-muted-foreground hover:text-foreground"}`}>2</button>
            <button data-testid="json-indent-4" onClick={() => setIndent(4)} className={`text-xs rounded-md px-2 py-1 ${indent === 4 ? "bg-secondary" : "text-muted-foreground hover:text-foreground"}`}>4</button>
            <div className="w-px h-4 bg-border mx-1" />
            <button
              data-testid="json-minify-btn"
              onClick={() => setInput(minified)}
              disabled={!parsed.ok}
              className="inline-flex items-center gap-1 text-xs rounded-md px-2 py-1 hover:bg-secondary disabled:opacity-40"
            >
              <Minimize2 className="h-3 w-3" /> Minify
            </button>
            <button
              data-testid="json-beautify-btn"
              onClick={() => setInput(output)}
              disabled={!parsed.ok}
              className="inline-flex items-center gap-1 text-xs rounded-md px-2 py-1 hover:bg-secondary disabled:opacity-40"
            >
              <Maximize2 className="h-3 w-3" /> Beautify
            </button>
          </div>
        </div>
        <div className="relative h-[420px] overflow-auto">
          {parsed.ok ? (
            <pre data-testid="json-output" className="px-4 py-3 text-sm font-mono whitespace-pre">
              <SyntaxJson value={output} />
            </pre>
          ) : (
            <div className="p-6 text-sm text-red-500 font-mono">{parsed.error}</div>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-border px-3 py-2">
          <button data-testid="json-copy-btn" onClick={copy} disabled={!parsed.ok} className="btn-ghost !py-1.5 !px-3 text-xs disabled:opacity-40">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
          </button>
          <button data-testid="json-download-btn" onClick={download} disabled={!parsed.ok} className="btn-primary !py-1.5 !px-3 text-xs disabled:opacity-40">
            <Download className="h-3.5 w-3.5" /> Download
          </button>
        </div>
      </div>
    </div>
  );
}

function SyntaxJson({ value }) {
  // Basic JSON syntax highlighting
  const html = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/("(?:\\.|[^"\\])*"(?:\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g, (m) => {
      let cls = "text-emerald-500"; // numbers
      if (/^"/.test(m)) cls = /:$/.test(m) ? "text-primary" : "text-amber-500";
      else if (/true|false/.test(m)) cls = "text-purple-500";
      else if (/null/.test(m)) cls = "text-muted-foreground";
      return `<span class="${cls}">${m}</span>`;
    });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
