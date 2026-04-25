import { useRoute, Link } from "wouter";
import { useState } from "react";
import { useListPosts, useListCategories } from "@workspace/api-client-react";
import { useSEO } from "@/hooks/use-seo";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function CategoryDetail() {
  const [, params] = useRoute<{ slug: string }>("/categories/:slug");
  const slug = params?.slug ?? "";
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading } = useListPosts({ category: slug, offset: (page - 1) * limit, limit });
  const { data: categories } = useListCategories();
  const category = categories?.find((c) => c.slug === slug);

  useSEO({
    title: category?.name ?? "Category",
    description: category?.description ?? `Articles in ${slug}`,
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / limit)) : 1;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> All categories
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          {category?.name ?? slug}
        </h1>
        {category?.description && (
          <p className="text-muted-foreground text-lg max-w-2xl">{category.description}</p>
        )}
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      ) : data && data.items.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground font-mono">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-muted-foreground py-12">No posts in this category yet.</p>
      )}
    </div>
  );
}
