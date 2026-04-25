import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

function b64encode(s: string): string {
  return btoa(unescape(encodeURIComponent(s)));
}
function b64decode(s: string): string {
  return decodeURIComponent(escape(atob(s.trim())));
}

export function Base64Tool() {
  const [encInput, setEncInput] = useState("Hello, world!");
  const [decInput, setDecInput] = useState("SGVsbG8sIHdvcmxkIQ==");
  const [encError, setEncError] = useState("");
  const [decError, setDecError] = useState("");
  const { toast } = useToast();

  let encOut = "";
  try { encOut = encInput ? b64encode(encInput) : ""; } catch (e) { setEncError(e instanceof Error ? e.message : "Error"); }

  let decOut = "";
  try { decOut = decInput ? b64decode(decInput) : ""; } catch { /* show error below */ }

  return (
    <Tabs defaultValue="encode">
      <TabsList>
        <TabsTrigger value="encode" data-testid="tab-encode">Encode</TabsTrigger>
        <TabsTrigger value="decode" data-testid="tab-decode">Decode</TabsTrigger>
      </TabsList>
      <TabsContent value="encode" className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Plain text</label>
          <Textarea value={encInput} onChange={(e) => { setEncInput(e.target.value); setEncError(""); }} rows={6} className="font-mono text-sm" data-testid="input-encode" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Base64</label>
          <Textarea value={encOut} readOnly rows={6} className="font-mono text-sm bg-muted/30" data-testid="output-encode" />
        </div>
        <Button onClick={() => { navigator.clipboard.writeText(encOut); toast({ title: "Copied" }); }} disabled={!encOut} data-testid="button-copy-encode">Copy result</Button>
        {encError && <div className="text-destructive text-sm font-mono">{encError}</div>}
      </TabsContent>
      <TabsContent value="decode" className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Base64</label>
          <Textarea value={decInput} onChange={(e) => { setDecInput(e.target.value); setDecError(""); }} rows={6} className="font-mono text-sm" data-testid="input-decode" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Plain text</label>
          <Textarea value={decOut} readOnly rows={6} className="font-mono text-sm bg-muted/30" data-testid="output-decode" />
        </div>
        <Button onClick={() => { navigator.clipboard.writeText(decOut); toast({ title: "Copied" }); }} disabled={!decOut} data-testid="button-copy-decode">Copy result</Button>
        {decError && <div className="text-destructive text-sm font-mono">{decError}</div>}
      </TabsContent>
    </Tabs>
  );
}
