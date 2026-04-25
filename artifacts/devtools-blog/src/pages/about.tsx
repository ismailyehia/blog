import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, Zap, ShieldCheck, Heart } from "lucide-react";

import { useTranslation } from "react-i18next";

export default function About() {
  const { t, i18n } = useTranslation();
  useSEO({
    title: t("about.title"),
    description: t("about.subtitle"),
  });

  const principles = [
    {
      icon: Zap,
      title: t("about.p1_title"),
      body: t("about.p1_body"),
    },
    {
      icon: ShieldCheck,
      title: t("about.p2_title"),
      body: t("about.p2_body"),
    },
    {
      icon: Terminal,
      title: t("about.p3_title"),
      body: t("about.p3_body"),
    },
    {
      icon: Heart,
      title: t("about.p4_title"),
      body: t("about.p4_body"),
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        {t("about.header")}
      </h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        {t("about.intro")}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.title} className="border-border/50">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold mb-1.5">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="prose prose-invert max-w-none">
        <h2>{t("about.why_title")}</h2>
        <p>{t("about.why_body")}</p>
        <h2>{t("about.how_title")}</h2>
        <p>{t("about.how_body")}</p>
        <h2>{t("about.contact_title")}</h2>
        <p>{t("about.contact_body")}</p>
      </div>
    </div>
  );
}
