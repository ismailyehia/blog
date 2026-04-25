import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tool } from "@workspace/api-client-react";
import * as Icons from "lucide-react";

export function ToolCard({ tool }: { tool: Tool }) {
  // Dynamically resolve icon from string name, fallback to Wrench if not found
  const IconName = tool.icon as keyof typeof Icons;
  const Icon = (Icons[IconName] as React.ElementType) || Icons.Wrench;

  return (
    <Link href={`/tools/${tool.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
      <Card className="h-full hover-elevate transition-all border-border/50 group bg-card hover:bg-muted/20">
        <CardHeader className="p-5 pb-3">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 bg-muted rounded-full text-muted-foreground">
              {tool.category}
            </span>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <CardDescription className="text-sm line-clamp-2">{tool.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
