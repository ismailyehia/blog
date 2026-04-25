import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useListCategories } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderTree } from "lucide-react";

export default function Categories() {
  const { data: categories, isLoading } = useListCategories();

  useSEO({
    title: "Categories",
    description: "Browse articles by topic: React, Node, Python, Flutter, DevOps and more.",
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Categories</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Pick a topic to dive into common errors and their solutions.
        </p>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              data-testid={`card-category-${cat.slug}`}
            >
              <Card className="h-full hover-elevate transition-all border-border/50 group">
                <CardHeader>
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center mb-2"
                    style={{ background: `${cat.color}22`, color: cat.color }}
                  >
                    <FolderTree className="w-5 h-5" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {cat.name}
                  </CardTitle>
                  {cat.description && <CardDescription>{cat.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <span className="text-xs text-muted-foreground font-mono">
                    {cat.postCount} {cat.postCount === 1 ? "article" : "articles"}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
