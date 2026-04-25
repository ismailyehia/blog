import { Link } from "wouter";
import { format } from "date-fns";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostSummary } from "@workspace/api-client-react";
import { Clock, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ar, enUS } from "date-fns/locale";

export function PostCard({ post }: { post: PostSummary }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "ar" ? ar : enUS;

  return (
    <Card className="flex flex-col overflow-hidden hover-elevate transition-all border-border/50 group h-full">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-[2/1] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
        <img 
          src={post.coverImageUrl} 
          alt={post.title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
          loading="lazy"
        />
        <div className={`absolute bottom-3 ${i18n.language === 'ar' ? 'right-3' : 'left-3'} z-20 flex gap-2`}>
          <Badge variant="secondary" className="bg-background/90 hover:bg-background backdrop-blur-sm text-xs font-medium">
            {post.category.name}
          </Badge>
        </div>
      </Link>
      <CardHeader className="p-5 pb-0 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-mono">
          <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), 'MMM d, yyyy', { locale })}</time>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingMinutes} {t("common.min")}</span>
        </div>
        <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-foreground/90 text-sm line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
      </CardHeader>
      <CardFooter className="p-5 pt-4 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <img src={post.author.avatarUrl} alt={post.author.name} className="w-6 h-6 rounded-full bg-muted" />
          <span className="text-xs font-medium">{post.author.name}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Eye className="w-3 h-3" />
          <span>{post.viewsCount.toLocaleString(i18n.language)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
