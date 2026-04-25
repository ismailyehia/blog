import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { 
  useGetSiteStats, 
  useListRecentPosts, 
  useListPopularPosts, 
  useListFeaturedPosts,
  useListCategories,
  useListTools
} from "@workspace/api-client-react";
import { Terminal, Activity, FileText, Wrench, FolderTree, ArrowRight, Loader2, Sparkles, Zap, ShieldAlert } from "lucide-react";
import { format } from "date-fns";
import { AdSlot } from "@/components/ad-slot";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/post-card";
import { ToolCard } from "@/components/tool-card";
import { Skeleton } from "@/components/ui/skeleton";

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  useSEO({
    title: t("nav.home"),
  });

  const { data: stats, isLoading: statsLoading } = useGetSiteStats();
  const { data: featuredPosts, isLoading: featuredLoading } = useListFeaturedPosts();
  const { data: recentPosts, isLoading: recentLoading } = useListRecentPosts({ limit: 6 });
  const { data: popularPosts, isLoading: popularLoading } = useListPopularPosts({ limit: 4 });
  const { data: tools, isLoading: toolsLoading } = useListTools();
  const { data: categories, isLoading: categoriesLoading } = useListCategories();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 pb-24 border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-muted/50 border border-border text-sm font-mono text-muted-foreground mb-6">
              <img src="/logo.png" alt="Blue Raven" className="w-5 h-5 object-contain" />
              <span>{t("home.hero_badge")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
              {i18n.language === 'en' ? (
                <>The essential toolkit for <span className="text-primary font-mono tracking-tighter">{'<Engineers/>'}</span></>
              ) : (
                <>الأدوات الأساسية لـ <span className="text-primary font-mono tracking-tighter">{'<المهندسين/>'}</span></>
              )}
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              {t("home.hero_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto font-medium" asChild>
                <Link href="/tools">{t("home.explore_tools")} <ArrowRight className={`${i18n.language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} w-4 h-4`} /></Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-medium" asChild>
                <Link href="/blog">{t("home.read_blog")}</Link>
              </Button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {[
              { label: t("home.stats.articles"), value: stats?.postCount, icon: FileText, loading: statsLoading },
              { label: t("home.stats.tools"), value: stats?.toolCount, icon: Wrench, loading: statsLoading },
              { label: t("home.stats.topics"), value: stats?.categoryCount, icon: FolderTree, loading: statsLoading },
              { label: t("home.stats.reads"), value: stats?.totalReads.toLocaleString(i18n.language), icon: Activity, loading: statsLoading },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 bg-card/50 backdrop-blur border border-border/50 rounded-xl">
                <stat.icon className="w-6 h-6 text-primary/60 mb-3" />
                {stat.loading ? (
                  <Skeleton className="h-8 w-16 mb-1" />
                ) : (
                  <div className="text-3xl font-bold font-mono">{stat.value || 0}</div>
                )}
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Spotlight */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" /> {t("home.featured_posts")}
            </h2>
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              {t("common.view_all")} <ArrowRight className={`${i18n.language === 'ar' ? 'rotate-180' : ''} w-4 h-4`} />
            </Link>
          </div>
          
          {featuredLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-96 w-full rounded-xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts?.slice(0, 3).map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-20 border-t border-border/40">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-primary" /> {t("home.instant_tools")}
              </h2>
              <p className="text-muted-foreground">{t("home.instant_tools_sub")}</p>
            </div>
            <Link href="/tools" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              {t("common.view_all")} <ArrowRight className={`${i18n.language === 'ar' ? 'rotate-180' : ''} w-4 h-4`} />
            </Link>
          </div>
          
          {toolsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tools?.slice(0, 8).map(tool => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ad Slot */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <AdSlot type="in-content" />
      </div>

      {/* Recent & Popular Content */}
      <section className="py-16 bg-muted/10 border-t border-border/40">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Recent Posts */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-primary" /> {t("home.latest_articles")}
              </h2>
              
              {recentLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
                </div>
              ) : (
                <div className="space-y-6">
                  {recentPosts?.map(post => (
                    <div key={post.id} className="group flex flex-col sm:flex-row gap-6 items-start">
                      <Link href={`/blog/${post.slug}`} className="block shrink-0 w-full sm:w-48 aspect-video sm:aspect-square overflow-hidden rounded-lg relative">
                        <img 
                          src={post.coverImageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-mono">
                          <span className="text-primary">{post.category.name}</span>
                          <span>•</span>
                          <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2">
                          <img src={post.author.avatarUrl} alt={post.author.name} className="w-5 h-5 rounded-full bg-muted" />
                          <span className="text-xs">{post.author.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-bold mb-6">{t("home.popular_posts")}</h2>
                {popularLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-md" />)}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {popularPosts?.map((post, i) => (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 items-start">
                        <div className="text-2xl font-mono font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">
                          0{i + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <div className="text-xs text-muted-foreground font-mono">
                            {post.viewsCount.toLocaleString(i18n.language)} views
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-6">{t("home.explore_topics")}</h2>
                {categoriesLoading ? (
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-8 w-20 rounded-full" />)}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {categories?.map(category => (
                      <Link 
                        key={category.slug} 
                        href={`/categories/${category.slug}`}
                        className="px-3 py-1.5 bg-card border border-border hover:border-primary/50 hover:bg-primary/5 rounded-md text-sm font-medium transition-colors"
                      >
                        {category.name} <span className="text-muted-foreground text-xs ml-1 font-mono">{category.postCount}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <AdSlot type="sidebar" />
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
