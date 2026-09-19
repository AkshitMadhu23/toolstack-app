import { useState } from "react";
import { Mail, Loader2, Check } from "lucide-react";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_REACT_APP_BACKEND_URL || ""}/api`;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("loading");
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      setState("done");
      setEmail("");
    } catch {
      setState("idle");
    }
  };

  return (
    <div data-testid="newsletter-section" className="relative overflow-hidden rounded-3xl border border-border p-8 sm:p-12 bg-card">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Newsletter</div>
          <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tighter">
            Get notified when we ship a new tool
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            One email per release. No spam, no marketing lists. Unsubscribe with a single click.
          </p>
        </div>
        <form onSubmit={submit} className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              data-testid="newsletter-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@work.com"
              className="w-full h-12 rounded-full border border-border bg-background pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors"
            />
          </div>
          <button
            data-testid="newsletter-submit"
            type="submit"
            disabled={state === "loading" || state === "done"}
            className="btn-primary h-12 px-6"
          >
            {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> :
             state === "done" ? <><Check className="h-4 w-4" /> Subscribed</> : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
