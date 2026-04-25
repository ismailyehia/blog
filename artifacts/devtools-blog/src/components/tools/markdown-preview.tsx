import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { renderMarkdown } from "@/lib/markdown";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const SAMPLE = `# Markdown Preview

Type some **markdown** on the left and see it rendered on the right.

## Code

\`\`\`js
function hello(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

- bullet one
- bullet two
- bullet three

> Blockquote example

[A link](https://example.com)
`;

export function MarkdownPreviewTool() {
  const [input, setInput] = useState(SAMPLE);
  const html = useMemo(() => renderMarkdown(input), [input]);
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => { navigator.clipboard.writeText(html); toast({ title: "HTML copied" }); }} data-testid="button-copy-html">
          <Copy className="w-4 h-4 mr-2" /> Copy HTML
        </Button>
        <Button variant="ghost" onClick={() => setInput("")} data-testid="button-clear">Clear</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Markdown</label>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} rows={20} className="font-mono text-sm" data-testid="input-markdown" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Preview</label>
          <div
            className="border border-border rounded-md p-4 bg-card prose prose-invert max-w-none min-h-[400px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
            data-testid="output-preview"
          />
        </div>
      </div>
    </div>
  );
}
