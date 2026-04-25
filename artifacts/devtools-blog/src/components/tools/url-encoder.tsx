import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function UrlEncoderTool() {
  const [encInput, setEncInput] = useState("hello world & friends?");
  const [decInput, setDecInput] = useState("hello%20world%20%26%20friends%3F");
  const { toast } = useToast();

  let encOut = "";
  let encErr = "";
  try { encOut = encodeURIComponent(encInput); } catch (e) { encErr = e instanceof Error ? e.message : "Error"; }

  let decOut = "";
  let decErr = "";
  try { decOut = decodeURIComponent(decInput); } catch (e) { decErr = e instanceof Error ? e.message : "Invalid encoded input"; }

  return (
    <Tabs defaultValue="encode">
      <TabsList>
        <TabsTrigger value="encode" data-testid="tab-url-encode">Encode</TabsTrigger>
        <TabsTrigger value="decode" data-testid="tab-url-decode">Decode</TabsTrigger>
      </TabsList>
      <TabsContent value="encode" className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Input</label>
          <Textarea value={encInput} onChange={(e) => setEncInput(e.target.value)} rows={5} className="font-mono text-sm" data-testid="input-url-encode" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Encoded</label>
          <Textarea value={encOut} readOnly rows={5} className="font-mono text-sm bg-muted/30" data-testid="output-url-encode" />
        </div>
        {encErr && <div className="text-destructive text-sm font-mono">{encErr}</div>}
        <Button onClick={() => { navigator.clipboard.writeText(encOut); toast({ title: "Copied" }); }} disabled={!encOut} data-testid="button-copy-url-encode">Copy result</Button>
      </TabsContent>
      <TabsContent value="decode" className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Encoded</label>
          <Textarea value={decInput} onChange={(e) => setDecInput(e.target.value)} rows={5} className="font-mono text-sm" data-testid="input-url-decode" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Decoded</label>
          <Textarea value={decOut} readOnly rows={5} className="font-mono text-sm bg-muted/30" data-testid="output-url-decode" />
        </div>
        {decErr && <div className="text-destructive text-sm font-mono">{decErr}</div>}
        <Button onClick={() => { navigator.clipboard.writeText(decOut); toast({ title: "Copied" }); }} disabled={!decOut} data-testid="button-copy-url-decode">Copy result</Button>
      </TabsContent>
    </Tabs>
  );
}
