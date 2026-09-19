import { useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { Download, QrCode } from "lucide-react";

export default function QrCodeGenerator() {
  const [value, setValue] = useState("https://toolstack.app");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [size, setSize] = useState(280);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);

  const downloadPng = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    // upscale to 1024
    const target = 1024;
    const off = document.createElement("canvas");
    off.width = target; off.height = target;
    const ctx = off.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, target, target);
    const url = off.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; a.download = "qrcode.png"; a.click();
  };

  const downloadSvg = () => {
    const svg = svgRef.current?.querySelector("svg");
    if (!svg) return;
    const s = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([s], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "qrcode.svg"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div data-testid="tool-qr-gen" className="grid lg:grid-cols-[1fr_360px] gap-4">
      <div className="rounded-2xl border border-border bg-card p-8 flex items-center justify-center min-h-[420px]">
        <div className="text-center">
          <div ref={canvasRef} className="inline-block rounded-2xl p-4" style={{ background: bg }}>
            <QRCodeCanvas value={value || " "} size={size} fgColor={fg} bgColor={bg} level="M" />
          </div>
          <div ref={svgRef} className="hidden">
            <QRCodeSVG value={value || " "} size={size} fgColor={fg} bgColor={bg} level="M" />
          </div>
          <div className="mt-4 text-xs text-muted-foreground truncate max-w-md mx-auto">
            {value ? value : "Enter something to encode"}
          </div>
        </div>
      </div>

      <aside className="rounded-2xl border border-border bg-card p-6 space-y-5 h-fit">
        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Content</label>
          <textarea
            data-testid="qr-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            placeholder="URL, text or WIFI:T:WPA;S:MyWifi;P:MyPass;;"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Size · {size}px</label>
          <input data-testid="qr-size" type="range" min="120" max="480" step="8" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full accent-primary mt-2" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Foreground</label>
            <div className="mt-2 flex items-center gap-2">
              <input data-testid="qr-fg" type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-14 rounded-lg border border-border bg-transparent" />
              <span className="text-xs font-mono">{fg}</span>
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Background</label>
            <div className="mt-2 flex items-center gap-2">
              <input data-testid="qr-bg" type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-14 rounded-lg border border-border bg-transparent" />
              <span className="text-xs font-mono">{bg}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button data-testid="qr-download-png" onClick={downloadPng} className="btn-primary"><Download className="h-4 w-4" /> PNG</button>
          <button data-testid="qr-download-svg" onClick={downloadSvg} className="btn-ghost"><Download className="h-4 w-4" /> SVG</button>
        </div>
      </aside>
    </div>
  );
}
