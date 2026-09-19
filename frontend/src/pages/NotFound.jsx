import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Not found — Toolstack" description="Page not found." path="/404" />
      <div data-testid="not-found" className="mx-auto max-w-2xl px-4 py-32 text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">404</div>
        <h1 className="mt-2 text-5xl font-semibold tracking-tighter">We couldn't find that tool.</h1>
        <p className="mt-4 text-muted-foreground">
          It may have moved, been renamed, or never existed. Head home and search.
        </p>
        <Link to="/" className="btn-primary mt-8">Go home</Link>
      </div>
    </>
  );
}
