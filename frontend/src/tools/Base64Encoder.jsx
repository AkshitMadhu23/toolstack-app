import { useState, useMemo } from "react";
import { Copy, Check, Trash2, ArrowLeftRight, Binary } from "lucide-react";

export default function Base64Encoder() {
  const [mode, setMode] = useState("encode"); // 'encode' | 'decode'
  const [input, setInput] = useState("Hello Toolstack! 🚀");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input) return { ok: true, output: "" };
    try {
      if (mode === "encode") {
        // UTF-8 friendly Base64 encode
        const bytes = new TextEncoder().encode(input);
        const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
        return { ok: true, output: btoa(binString) };
      } else {
        // UTF-8 friendly Base64 decode
        const binString = atob(input.trim());
        const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
        return { ok: true, output: new TextDecoder().decode(bytes) };
      }
    } catch (e) {
      return { ok: false, error: mode === "encode" ? "Encoding error" : "Invalid Base64 string" };
    }
  }, [input, mode]);

  const handleCopy = async () => {
    if (!result.ok || !result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const toggleMode = () => {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    if (result.ok && result.output) {
      setInput(result.output);
    }
  };

  return (
    <div data-testid="tool-base64" className="grid lg:grid-cols-2 gap-4">
      {/* Input Panel */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-secondary/30">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Binary className="h-4 w-4 text-primary" />
            <span>{mode === "encode" ? "Text Input" : "Base64 Input"}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMode}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              title="Switch Encode / Decode"
            >
              <ArrowLeftRight className="h-3 w-3" />
              <span>Switch to {mode === "encode" ? "Decode" : "Encode"}</span>
            </button>
            <button
              onClick={() => setInput("")}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          </div>
        </div>
        <textarea
          data-testid="base64-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="w-full h-[380px] resize-none bg-transparent p-4 text-sm font-mono outline-none placeholder:text-muted-foreground/60"
          placeholder={mode === "encode" ? "Type or paste text to encode…" : "Paste Base64 string to decode…"}
        />
      </div>

      {/* Output Panel */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-secondary/30">
          <div className="flex items-center gap-2 text-sm font-medium">
            {result.ok ? (
              <>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>{mode === "encode" ? "Base64 Result" : "Decoded Text"}</span>
              </>
            ) : (
              <>
                <span className="flex h-2 w-2 rounded-full bg-red-500" />
                <span className="text-red-500">Error</span>
              </>
            )}
          </div>
        </div>
        <div className="relative flex-1 h-[380px] overflow-auto p-4 font-mono text-sm">
          {result.ok ? (
            <div data-testid="base64-output" className="break-all whitespace-pre-wrap">
              {result.output || <span className="text-muted-foreground/50 italic">Output will appear here…</span>}
            </div>
          ) : (
            <div className="text-red-500">{result.error}</div>
          )}
        </div>
        <div className="flex items-center justify-end border-t border-border px-4 py-3 bg-secondary/20">
          <button
            data-testid="base64-copy-btn"
            onClick={handleCopy}
            disabled={!result.ok || !result.output}
            className="btn-primary !py-1.5 !px-4 text-xs disabled:opacity-40"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy Result"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
