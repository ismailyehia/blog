import { useRoute, Link } from "wouter";
import { useEffect, useMemo } from "react";
import {
  useGetPostBySlug,
  useGetRelatedPosts,
} from "@workspace/api-client-react";
import { useSEO } from "@/hooks/use-seo";
import { renderMarkdown } from "@/lib/markdown";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AdSlot } from "@/components/ad-slot";
import { PostCard } from "@/components/post-card";
import { Clock, Eye, ArrowLeft } from "lucide-react";
import NotFound from "@/pages/not-found";

import { useTranslation } from "react-i18next";

export default function PostDetail() {
  const { t, i18n } = useTranslation();
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  const slug = params?.slug ?? "";

  const { data: post, isLoading, error } = useGetPostBySlug(slug);
  const { data: related } = useGetRelatedPosts(slug);

  useSEO({
    title: post?.seoTitle ?? post?.title,
    description: post?.seoDescription ?? post?.excerpt,
    image: post?.coverImageUrl,
    type: "article",
  });

  const html = useMemo(
    () => (post?.content ? renderMarkdown(post.content) : ""),
    [post?.content],
  );

  useEffect(() => {
    if (post) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [post?.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error || !post) return <NotFound />;

  return (
    <article className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10 transition-colors"
        data-testid="link-back-to-blog"
      >
        <ArrowLeft className={`w-4 h-4 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} /> {t("blog.prev")}
      </Link>

      <div className="mb-6 flex items-center gap-2 flex-wrap text-sm">
        <Link
          href={`/categories/${post.category.slug}`}
          className="text-primary font-semibold uppercase tracking-wider text-xs"
          data-testid="link-post-category"
        >
          {post.category.name}
        </Link>
        <span className="text-muted-foreground">•</span>
        <time className="text-muted-foreground font-mono text-xs">
          {format(new Date(post.publishedAt), i18n.language === 'ar' ? 'd MMMM yyyy' : 'MMMM d, yyyy')}
        </time>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" /> {post.readingMinutes} {t("common.min")}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground text-xs flex items-center gap-1">
          <Eye className="w-3 h-3" /> {post.viewsCount.toLocaleString(i18n.language)}
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6" data-testid="text-post-title">
        {post.title}
      </h1>
      
      <div className="text-xl md:text-2xl text-foreground mb-10 leading-relaxed font-medium italic border-l-4 border-primary pl-6 py-2">
        {post.excerpt}
      </div>

      <div className="flex items-center gap-4 mb-10 pb-8 border-b border-border/50">
        <img
          src={post.author.avatarUrl}
          alt={post.author.name}
          className="w-12 h-12 rounded-full bg-muted shadow-sm"
        />
        <div>
          <div className="text-base font-bold">{post.author.name}</div>
          {post.author.bio && (
            <div className="text-sm text-muted-foreground">{post.author.bio}</div>
          )}
        </div>
      </div>

      {post.coverImageUrl && (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full rounded-2xl mb-12 aspect-[2/1] object-cover shadow-xl"
        />
      )}

      <div
        className="prose prose-invert max-w-none prose-lg prose-pre:bg-card prose-pre:border prose-pre:border-border prose-code:text-primary prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
        data-testid="content-post-body"
      />

      <AdSlot type="in-content" className="my-16" />

      <div className="flex flex-wrap gap-2 mt-12 pt-10 border-t border-border/50">
        {post.tags.map((t) => (
          <Link key={t.id} href={`/tags/${t.slug}`}>
            <Badge variant="outline" className="font-mono cursor-pointer hover:bg-primary/10 px-3 py-1">
              #{t.name}
            </Badge>
          </Link>
        ))}
      </div>

      {related && related.length > 0 && (
        <section className="mt-20 pt-16 border-t border-border/50">
          <h2 className="text-3xl font-bold mb-10 tracking-tight">{t("home.popular_posts")}</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {related.map((r) => (
              <PostCard key={r.id} post={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
