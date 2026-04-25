import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

function tokens(s: string): string[] {
  return s
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-./]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.toLowerCase());
}

const conversions: { name: string; fn: (s: string) => string }[] = [
  { name: "camelCase", fn: (s) => tokens(s).map((t, i) => (i === 0 ? t : t[0].toUpperCase() + t.slice(1))).join("") },
  { name: "PascalCase", fn: (s) => tokens(s).map((t) => t[0].toUpperCase() + t.slice(1)).join("") },
  { name: "snake_case", fn: (s) => tokens(s).join("_") },
  { name: "CONSTANT_CASE", fn: (s) => tokens(s).join("_").toUpperCase() },
  { name: "kebab-case", fn: (s) => tokens(s).join("-") },
  { name: "Title Case", fn: (s) => tokens(s).map((t) => t[0].toUpperCase() + t.slice(1)).join(" ") },
  { name: "Sentence case", fn: (s) => { const t = tokens(s).join(" "); return t ? t[0].toUpperCase() + t.slice(1) : ""; } },
  { name: "lower case", fn: (s) => tokens(s).join(" ") },
  { name: "UPPER CASE", fn: (s) => tokens(s).join(" ").toUpperCase() },
];

export function TextCaseConverterTool() {
  const [input, setInput] = useState("Hello world example text");
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="font-mono text-sm" data-testid="input-text" />
      <div className="grid sm:grid-cols-2 gap-3">
        {conversions.map((c) => {
          const out = c.fn(input);
          return (
            <div key={c.name} className="border border-border/50 rounded-md p-3 bg-card hover-elevate">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 flex justify-between items-center">
                {c.name}
                <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(out); toast({ title: "Copied" }); }} data-testid={`button-copy-${c.name}`}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <div className="font-mono text-sm break-all" data-testid={`output-${c.name}`}>{out || <span className="text-muted-foreground">—</span>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
