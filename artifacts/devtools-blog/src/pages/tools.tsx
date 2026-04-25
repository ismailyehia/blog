import { useSEO } from "@/hooks/use-seo";
import { useState, useMemo } from "react";
import { useListTools } from "@workspace/api-client-react";
import { ToolCard } from "@/components/tool-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AdSlot } from "@/components/ad-slot";
import { Search } from "lucide-react";

export default function Tools() {
  const { data: tools, isLoading } = useListTools();
  const [query, setQuery] = useState("");

  useSEO({
    title: "Developer Tools",
    description:
      "Free, instant browser-based developer utilities: JSON formatter, base64, JWT decoder, hash generator, UUID, color converter and more.",
  });

  const filtered = useMemo(() => {
    if (!tools) return [];
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }, [tools, query]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    for (const t of filtered) {
      (map[t.category] ??= []).push(t);
    }
    return map;
  }, [filtered]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          Developer Tools
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A growing collection of fast, free, browser-based utilities. Nothing leaves your machine.
        </p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="pl-10"
          data-testid="input-search-tools"
        />
      </div>

      <AdSlot type="top" className="mb-10" />

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(grouped).map(([category, list]) => (
            <section key={category}>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-4">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No tools matched your search.</p>
          )}
        </div>
      )}
    </div>
  );
}
