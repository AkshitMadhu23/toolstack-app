import { useState, useMemo } from "react";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState(1000000); // 10 Lakh / 1M
  const [rate, setRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(15); // 15 years

  const calculation = useMemo(() => {
    const P = Math.max(1000, Number(principal) || 0);
    const R = Math.max(0.1, Number(rate) || 0) / 12 / 100;
    const N = Math.max(1, Number(tenureYears) || 0) * 12;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    const principalPct = Math.round((P / totalPayment) * 100);
    const interestPct = 100 - principalPct;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPct,
      interestPct,
    };
  }, [principal, rate, tenureYears]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div data-testid="tool-emi-calculator" className="grid lg:grid-cols-12 gap-6">
      {/* Input Controls */}
      <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-2 text-base font-semibold border-b border-border pb-4">
          <Calculator className="h-5 w-5 text-primary" />
          <span>Loan Details</span>
        </div>

        {/* Loan Amount */}
        <div>
          <div className="flex items-center justify-between text-sm font-medium mb-2">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-primary" /> Principal Amount
            </span>
            <span className="font-semibold">{formatCurrency(principal)}</span>
          </div>
          <input
            type="range"
            min={50000}
            max={10000000}
            step={50000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex items-center justify-between text-sm font-medium mb-2">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Percent className="h-4 w-4 text-accent" /> Interest Rate (p.a.)
            </span>
            <span className="font-semibold">{rate}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={24}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* Loan Tenure */}
        <div>
          <div className="flex items-center justify-between text-sm font-medium mb-2">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-violet" /> Loan Tenure
            </span>
            <span className="font-semibold">{tenureYears} Years</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <input
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Output Results */}
      <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Monthly Installment</div>
          <div className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            {formatCurrency(calculation.monthlyEmi)}
            <span className="text-sm font-normal text-muted-foreground"> / mo</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
            <div className="rounded-xl border border-border p-4 bg-secondary/20">
              <div className="text-xs text-muted-foreground">Total Principal</div>
              <div className="mt-1 text-lg font-semibold">{formatCurrency(principal)}</div>
            </div>
            <div className="rounded-xl border border-border p-4 bg-secondary/20">
              <div className="text-xs text-muted-foreground">Total Interest</div>
              <div className="mt-1 text-lg font-semibold text-emerald-500">{formatCurrency(calculation.totalInterest)}</div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border p-4 bg-secondary/30">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Total Payable</span>
              <span className="font-semibold text-foreground">{formatCurrency(calculation.totalPayment)}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-secondary overflow-hidden flex">
              <div className="h-full bg-primary" style={{ width: `${calculation.principalPct}%` }} title={`Principal ${calculation.principalPct}%`} />
              <div className="h-full bg-emerald-500" style={{ width: `${calculation.interestPct}%` }} title={`Interest ${calculation.interestPct}%`} />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Principal ({calculation.principalPct}%)</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Interest ({calculation.interestPct}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
