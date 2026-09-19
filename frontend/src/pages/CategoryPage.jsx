import { useParams, Link } from "react-router-dom";
import { CATEGORIES, TOOLS } from "@/lib/toolsRegistry";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound.jsx";
import { ToolCard } from "@/pages/Homepage.jsx";

export default function CategoryPage() {
  const { category } = useParams();
  const cat = CATEGORIES[category];
  if (!cat) return <NotFound />;
  const tools = TOOLS.filter((t) => t.category === category);

  return (
    <>
      <SEO
        title={`${cat.label} tools — Toolstack`}
        description={`All free ${cat.label.toLowerCase()} utilities on Toolstack. Fast, private, in-browser.`}
        path={`/category/${category}`}
      />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Category</div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tighter">{cat.label} tools</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          {tools.length} tool{tools.length !== 1 ? "s" : ""} in this category.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {tools.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center text-sm text-muted-foreground">
            No tools here yet. <Link to="/" className="text-primary underline">Explore all tools</Link>.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tools.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
          </div>
        )}
      </section>
    </>
  );
}
