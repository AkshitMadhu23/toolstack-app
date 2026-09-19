import { useRef, useState } from "react";
import { Upload, Download, ArrowLeftRight } from "lucide-react";

export default function PngJpgConverter() {
  const [file, setFile] = useState(null);
  const [target, setTarget] = useState("jpg"); // jpg | png
  const [bg, setBg] = useState("#ffffff");
  const [output, setOutput] = useState(null);
  const inputRef = useRef(null);

  const convert = async (f, tgt, bgColor) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (tgt === "jpg") {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        const mime = tgt === "jpg" ? "image/jpeg" : "image/png";
        canvas.toBlob((b) => resolve({ url: URL.createObjectURL(b), size: b.size, mime }), mime, 0.92);
      };
      img.src = URL.createObjectURL(f);
    });
  };

  const handleFile = async (f) => {
    if (!f) return;
    setFile(f);
    const detectedIsPng = f.type.includes("png");
    const tgt = detectedIsPng ? "jpg" : "png";
    setTarget(tgt);
    const res = await convert(f, tgt, bg);
    setOutput(res);
  };

  const rerun = async (tgt = target) => {
    if (!file) return;
    const res = await convert(file, tgt, bg);
    setOutput(res);
  };

  return (
    <div data-testid="tool-png-jpg" className="grid lg:grid-cols-[1fr_320px] gap-4">
      <div className="rounded-2xl border border-dashed border-border bg-card min-h-[420px] flex items-center justify-center p-6">
        <input ref={inputRef} data-testid="pngjpg-input" type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        {!file ? (
          <button data-testid="pngjpg-choose" onClick={() => inputRef.current?.click()} className="flex flex-col items-center gap-3 p-10 text-center">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <ArrowLeftRight className="h-6 w-6" />
            </div>
            <div className="font-medium">Upload a PNG or JPG</div>
            <div className="text-xs text-muted-foreground">We'll auto-pick the opposite format. You can switch below.</div>
            <div className="btn-primary mt-2"><Upload className="h-4 w-4" /> Choose file</div>
          </button>
        ) : (
          <img src={output?.url || URL.createObjectURL(file)} alt="preview" className="max-h-[400px] rounded-xl border border-border" />
        )}
      </div>

      <aside className="rounded-2xl border border-border bg-card p-6 space-y-5 h-fit">
        <div>
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Convert to</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button data-testid="target-jpg" onClick={() => { setTarget("jpg"); rerun("jpg"); }} className={`rounded-xl border py-3 text-sm font-medium transition-colors ${target === "jpg" ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>JPG</button>
            <button data-testid="target-png" onClick={() => { setTarget("png"); rerun("png"); }} className={`rounded-xl border py-3 text-sm font-medium transition-colors ${target === "png" ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>PNG</button>
          </div>
        </div>
        {target === "jpg" && (
          <div>
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Background (for transparency)</div>
            <div className="mt-2 flex items-center gap-2">
              <input data-testid="bg-color" type="color" value={bg} onChange={(e) => { setBg(e.target.value); }} onBlur={() => rerun()} className="h-10 w-14 rounded-lg border border-border bg-transparent" />
              <input value={bg} readOnly className="flex-1 h-10 rounded-lg border border-border bg-background px-3 text-sm font-mono" />
            </div>
          </div>
        )}
        {output && file && (
          <a data-testid="pngjpg-download" href={output.url} download={`${file.name.replace(/\.[^.]+$/, "")}.${target}`} className="btn-primary w-full"><Download className="h-4 w-4" /> Download .{target}</a>
        )}
        {file && (
          <div className="text-xs text-muted-foreground">Original: {file.name} · {(file.size / 1024).toFixed(1)} KB</div>
        )}
      </aside>
    </div>
  );
}
