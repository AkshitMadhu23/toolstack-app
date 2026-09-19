import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const inr = (n) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const { invested, future, gains, data } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const inv = monthly * n;
    return {
      invested: inv,
      future: fv,
      gains: fv - inv,
      data: [
        { name: "Invested", value: inv },
        { name: "Returns", value: fv - inv },
      ],
    };
  }, [monthly, rate, years]);

  const COLORS = ["hsl(var(--primary))", "hsl(var(--violet))"];

  return (
    <div data-testid="tool-sip" className="grid lg:grid-cols-[1fr_360px] gap-4">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Invested" value={`₹${inr(invested)}`} color="text-foreground" />
          <Stat label="Est. returns" value={`₹${inr(gains)}`} color="text-primary" />
          <Stat label="Future value" value={`₹${inr(future)}`} color="text-emerald-500" />
        </div>
        <div className="mt-8 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={80} outerRadius={130} paddingAngle={2} dataKey="value">
                {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => `₹${inr(v)}`} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[0] }} /> Invested</div>
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[1] }} /> Returns</div>
        </div>
      </div>

      <aside className="rounded-2xl border border-border bg-card p-6 space-y-6 h-fit">
        <Slider testid="sip-monthly" label="Monthly investment" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} format={(v) => `₹${inr(v)}`} />
        <Slider testid="sip-rate" label="Expected annual return" value={rate} onChange={setRate} min={1} max={30} step={0.5} format={(v) => `${v}%`} />
        <Slider testid="sip-years" label="Tenure" value={years} onChange={setYears} min={1} max={40} step={1} format={(v) => `${v} yr${v > 1 ? "s" : ""}`} />
      </aside>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className={`mt-1 text-xl sm:text-2xl font-semibold tracking-tighter ${color}`}>{value}</div>
    </div>
  );
}

function Slider({ testid, label, value, onChange, min, max, step, format }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</label>
        <span className="text-sm font-medium">{format(value)}</span>
      </div>
      <input data-testid={testid} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full accent-primary mt-2" />
      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  );
}
