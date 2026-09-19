import { useCallback, useRef, useState } from "react";
import { Upload, Download, RefreshCw, ImageDown } from "lucide-react";

export default function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [maxW, setMaxW] = useState(1920);
  const [output, setOutput] = useState(null); // {url, size, w, h}
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const process = useCallback(async (f, q, mw) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const scale = img.width > mw ? mw / img.width : 1;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => {
          resolve({ blob, w, h });
        }, "image/jpeg", q);
      };
      img.src = URL.createObjectURL(f);
    });
  }, []);

  const handleFile = async (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    const { blob, w, h } = await process(f, quality, maxW);
    setOutput({ url: URL.createObjectURL(blob), size: blob.size, w, h });
  };

  const rerun = async () => {
    if (!file) return;
    const { blob, w, h } = await process(file, quality, maxW);
    setOutput({ url: URL.createObjectURL(blob), size: blob.size, w, h });
  };

  const humanSize = (b) => b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`;
  const savings = file && output ? Math.max(0, Math.round(((file.size - output.size) / file.size) * 100)) : 0;

  return (
    <div data-testid="tool-image-compressor" className="grid lg:grid-cols-[1fr_320px] gap-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
        className={`relative rounded-2xl border ${dragging ? "border-primary bg-primary/5" : "border-dashed border-border"} bg-card overflow-hidden min-h-[420px] flex items-center justify-center transition-colors`}
      >
        <input
          ref={inputRef}
          data-testid="image-compressor-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {!preview ? (
          <button data-testid="image-compressor-upload" onClick={() => inputRef.current?.click()} className="flex flex-col items-center gap-3 p-10 text-center">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <ImageDown className="h-6 w-6" />
            </div>
            <div>
              <div className="font-medium">Drop an image, or click to browse</div>
              <div className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP · up to 20 MB · local processing</div>
            </div>
            <div className="btn-primary mt-2"><Upload className="h-4 w-4" /> Choose file</div>
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-4 w-full">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">Original · {file && humanSize(file.size)}</div>
              <img src={preview} alt="original" className="rounded-xl border border-border w-full object-contain max-h-[360px] bg-secondary" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">
                Compressed {output && `· ${humanSize(output.size)} · -${savings}%`}
              </div>
              {output && <img src={output.url} alt="compressed" className="rounded-xl border border-border w-full object-contain max-h-[360px] bg-secondary" />}
            </div>
          </div>
        )}
      </div>

      <aside className="rounded-2xl border border-border bg-card p-6 space-y-6 h-fit">
        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Quality · {(quality * 100).toFixed(0)}%</label>
          <input
            data-testid="quality-slider"
            type="range" min="0.1" max="1" step="0.05"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full accent-primary mt-2"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Max width · {maxW}px</label>
          <input
            data-testid="maxw-slider"
            type="range" min="320" max="4096" step="32"
            value={maxW}
            onChange={(e) => setMaxW(parseInt(e.target.value))}
            className="w-full accent-primary mt-2"
          />
        </div>
        <div className="flex gap-2">
          <button data-testid="rerun-btn" onClick={rerun} disabled={!file} className="btn-ghost flex-1 disabled:opacity-40"><RefreshCw className="h-4 w-4" /> Re-run</button>
          {output && (
            <a data-testid="download-compressed" href={output.url} download={`${file?.name?.replace(/\.[^.]+$/, "")}-compressed.jpg`} className="btn-primary flex-1"><Download className="h-4 w-4" /> Download</a>
          )}
        </div>
        {file && output && (
          <div className="rounded-xl border border-border p-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Saved</span><span className="font-medium">{humanSize(file.size - output.size)} ({savings}%)</span></div>
            <div className="flex justify-between mt-1"><span className="text-muted-foreground">Dimensions</span><span className="font-medium">{output.w}×{output.h}</span></div>
          </div>
        )}
      </aside>
    </div>
  );
}
