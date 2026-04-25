import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from "lucide-react";

export function JsonFormatterTool() {
  const [input, setInput] = useState('{"hello":"world","items":[1,2,3]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const format = (indent: number) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => format(2)} data-testid="button-format-2">Format (2 spaces)</Button>
        <Button onClick={() => format(4)} variant="outline" data-testid="button-format-4">Format (4 spaces)</Button>
        <Button onClick={minify} variant="outline" data-testid="button-minify">Minify</Button>
        <Button onClick={() => { setInput(""); setOutput(""); setError(""); }} variant="ghost" data-testid="button-clear">Clear</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Input</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            className="font-mono text-sm"
            data-testid="input-json"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Output</label>
            {output && (
              <Button size="sm" variant="ghost" onClick={copy} data-testid="button-copy-output">
                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                Copy
              </Button>
            )}
          </div>
          <Textarea
            value={output}
            readOnly
            rows={16}
            className="font-mono text-sm bg-muted/30"
            data-testid="output-json"
          />
        </div>
      </div>
      {error && (
        <div className="p-3 rounded border border-destructive/50 bg-destructive/10 text-destructive text-sm font-mono" data-testid="text-error">
          {error}
        </div>
      )}
    </div>
  );
}
