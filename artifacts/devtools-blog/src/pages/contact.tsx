import { useSEO } from "@/hooks/use-seo";
import { useState } from "react";
import { useSubmitContactForm } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t, i18n } = useTranslation();
  useSEO({
    title: t("contact.title"),
    description: t("contact.subtitle"),
  });

  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = useSubmitContactForm();

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({ data: form });
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({ title: t("footer.success_title"), description: t("footer.success_desc") });
    } catch (err: unknown) {
      toast({
        title: t("footer.error_title"),
        description: err instanceof Error ? err.message : t("footer.error_desc"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-2xl">
      <div className="mb-8 text-center">
        <div className="inline-flex w-12 h-12 rounded-md bg-primary/10 text-primary items-center justify-center mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">{t("contact.header")}</h1>
        <p className="text-muted-foreground text-lg">
          {t("contact.subtitle")}
        </p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t("contact.success_title")}</h3>
              <p className="text-muted-foreground mb-6">{t("contact.success_desc")}</p>
              <Button variant="outline" onClick={() => setSubmitted(false)} data-testid="button-send-another">
                {t("contact.send_another")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">{t("contact.name")}</Label>
                  <Input
                    id="contact-name"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={onChange("name")}
                    data-testid="input-contact-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">{t("contact.email")}</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange("email")}
                    data-testid="input-contact-email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-subject">{t("contact.subject")}</Label>
                <Input
                  id="contact-subject"
                  required
                  minLength={3}
                  value={form.subject}
                  onChange={onChange("subject")}
                  data-testid="input-contact-subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">{t("contact.message")}</Label>
                <Textarea
                  id="contact-message"
                  required
                  minLength={10}
                  rows={6}
                  value={form.message}
                  onChange={onChange("message")}
                  data-testid="input-contact-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={submitMutation.isPending}
                data-testid="button-submit-contact"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'} animate-spin`} /> {t("contact.sending")}
                  </>
                ) : (
                  t("contact.send")
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
