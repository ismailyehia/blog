import { useSEO } from "@/hooks/use-seo";
import { useState } from "react";
import { useRoute } from "wouter";
import {
  useListPosts,
  useListCategories,
  useListTags,
} from "@workspace/api-client-react";
import { PostCard } from "@/components/post-card";
import { AdSlot } from "@/components/ad-slot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Search } from "lucide-react";

import { useTranslation } from "react-i18next";

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [tagMatch, tagParams] = useRoute<{ slug: string }>("/tags/:slug");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categorySlug, setCategorySlug] = useState<string | undefined>(undefined);
  const tagSlug = tagMatch ? tagParams?.slug : undefined;

  const limit = 9;
  const { data, isLoading } = useListPosts({
    offset: (page - 1) * limit,
    limit,
    search: search || undefined,
    category: categorySlug,
    tag: tagSlug,
  });
  const { data: categories } = useListCategories();
  const { data: tags } = useListTags();

  useSEO({
    title: tagSlug ? t("blog.tagged_with", { tag: tagSlug }) : t("blog.title"),
    description: t("blog.subtitle"),
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / limit)) : 1;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          {tagSlug ? `# ${tagSlug}` : t("blog.title")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {t("blog.subtitle")}
        </p>
      </div>

      <AdSlot type="top" className="mb-8" />

      <div className="grid lg:grid-cols-[1fr_280px] gap-10">
        <div>
          <form
            className="mb-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(searchInput);
              setPage(1);
            }}
          >
            <div className="relative flex-1">
              <Search className={`absolute ${i18n.language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t("blog.search_placeholder")}
                className={i18n.language === 'ar' ? 'pr-10' : 'pl-10'}
                data-testid="input-search-posts"
              />
            </div>
            <Button type="submit" data-testid="button-search">{t("common.search")}</Button>
          </form>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : data && data.items.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                {data.items.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              <div className="mt-10 flex items-center justify-between">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  data-testid="button-prev-page"
                >
                  {t("blog.prev")}
                </Button>
                <span className="text-sm text-muted-foreground font-mono">
                  {t("blog.page_info", { page, total: totalPages })}
                </span>
                <Button
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  data-testid="button-next-page"
                >
                  {t("blog.next")}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Loader2 className="w-6 h-6 mx-auto mb-2 opacity-30" />
              <p>{t("blog.no_posts")}</p>
            </div>
          )}
        </div>

        <aside className="space-y-8">
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
              {t("nav.categories")}
            </h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  setCategorySlug(undefined);
                  setPage(1);
                }}
                className={`text-left text-sm py-1.5 px-2 rounded hover-elevate ${
                  !categorySlug ? "text-primary font-semibold" : ""
                } ${i18n.language === 'ar' ? 'text-right' : ''}`}
                data-testid="button-category-all"
              >
                {t("blog.all_categories")}
              </button>
              {categories?.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCategorySlug(c.slug);
                    setPage(1);
                  }}
                  className={`text-left text-sm py-1.5 px-2 rounded hover-elevate ${
                    categorySlug === c.slug ? "text-primary font-semibold" : ""
                  } ${i18n.language === 'ar' ? 'text-right' : ''}`}
                  data-testid={`button-category-${c.slug}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
              {t("blog.tags")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags?.map((t) => (
                <a
                  key={t.id}
                  href={`/tags/${t.slug}`}
                  className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors font-mono"
                  data-testid={`tag-${t.slug}`}
                >
                  #{t.name}
                </a>
              ))}
            </div>
          </div>

          <AdSlot type="sidebar" />
        </aside>
      </div>
    </div>
  );
}
