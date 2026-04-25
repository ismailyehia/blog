import { useRoute, Link } from "wouter";
import { useGetToolBySlug } from "@workspace/api-client-react";
import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent } from "@/components/ui/card";
import { AdSlot } from "@/components/ad-slot";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import NotFound from "@/pages/not-found";

import { JsonFormatterTool } from "@/components/tools/json-formatter";
import { Base64Tool } from "@/components/tools/base64-tool";
import { PasswordGeneratorTool } from "@/components/tools/password-generator";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator";
import { ColorConverterTool } from "@/components/tools/color-converter";
import { TextCaseConverterTool } from "@/components/tools/text-case-converter";
import { MarkdownPreviewTool } from "@/components/tools/markdown-preview";
import { JwtDecoderTool } from "@/components/tools/jwt-decoder";
import { UrlEncoderTool } from "@/components/tools/url-encoder";
import { HashGeneratorTool } from "@/components/tools/hash-generator";

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatterTool,
  "base64": Base64Tool,
  "password-generator": PasswordGeneratorTool,
  "uuid-generator": UuidGeneratorTool,
  "color-converter": ColorConverterTool,
  "text-case-converter": TextCaseConverterTool,
  "markdown-preview": MarkdownPreviewTool,
  "jwt-decoder": JwtDecoderTool,
  "url-encoder": UrlEncoderTool,
  "hash-generator": HashGeneratorTool,
};

export default function ToolDetail() {
  const [, params] = useRoute<{ slug: string }>("/tools/:slug");
  const slug = params?.slug ?? "";
  const { data: tool, isLoading, error } = useGetToolBySlug(slug);

  useSEO({
    title: tool?.name,
    description: tool?.description,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Skeleton className="h-10 w-2/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !tool) return <NotFound />;

  const ToolComponent = TOOL_COMPONENTS[tool.slug];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
      <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6" data-testid="link-back-to-tools">
        <ArrowLeft className="w-4 h-4" /> All tools
      </Link>

      <div className="mb-3">
        <span className="text-[10px] uppercase tracking-widest font-mono px-2 py-1 bg-muted rounded-full text-muted-foreground">
          {tool.category}
        </span>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3" data-testid="text-tool-name">{tool.name}</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-2xl">{tool.description}</p>

      <Card className="border-border/50 mb-8">
        <CardContent className="p-6 sm:p-8">
          {ToolComponent ? <ToolComponent /> : (
            <p className="text-muted-foreground text-center py-8">
              This tool is coming soon.
            </p>
          )}
        </CardContent>
      </Card>

      <AdSlot type="in-content" className="mb-8" />

      <div className="prose prose-invert max-w-none">
        <h3>About this tool</h3>
        <p>
          {tool.name} runs entirely in your browser — no data is sent to any server. Use it freely for
          development, testing, and quick lookups.
        </p>
        {tool.keywords?.length > 0 && (
          <>
            <h3>Related</h3>
            <p className="font-mono text-sm">{tool.keywords.join(" • ")}</p>
          </>
        )}
      </div>
    </div>
  );
}
