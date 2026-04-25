import { Link } from "wouter";
import { Terminal, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscribeToNewsletter } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeToNewsletter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    subscribe.mutate({ data: { email } }, {
      onSuccess: () => {
        toast({
          title: t("footer.success_title"),
          description: t("footer.success_desc"),
        });
        setEmail("");
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: t("footer.error_title"),
          description: err.message || t("footer.error_desc"),
        });
      }
    });
  };

  return (
    <footer className="border-t border-border/40 bg-card py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 text-foreground font-bold tracking-tight mb-4">
              <img 
                src="/logo.png" 
                alt="Blue Raven Logo" 
                className="h-8 w-8 object-contain" 
              />
              <span className="font-mono text-xl">{t("common.logo")}</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/tools" className="hover:text-primary transition-colors">{t("nav.tools")}</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">{t("nav.blog")}</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">{t("nav.categories")}</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">{t("nav.about")}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t("footer.newsletter")}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t("footer.newsletter_sub")}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="developer@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
                required
              />
              <Button type="submit" disabled={subscribe.isPending} className="w-full">
                {subscribe.isPending ? t("footer.subscribing") : t("footer.subscribe")}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} {t("common.logo")}. {t("footer.rights")}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
