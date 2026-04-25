import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Copy } from "lucide-react";

function uuidv4(): string {
  const c = window.crypto;
  if (typeof c.randomUUID === "function") {
    return c.randomUUID();
  }
  const bytes = new Uint8Array(16);
  c.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => Array.from({ length: 5 }, uuidv4));
  const { toast } = useToast();

  const generate = () => setUuids(Array.from({ length: Math.max(1, Math.min(1000, count)) }, uuidv4));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[160px]">
          <Label htmlFor="uuid-count">How many?</Label>
          <Input id="uuid-count" type="number" min={1} max={1000} value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} data-testid="input-count" />
        </div>
        <Button onClick={generate} data-testid="button-generate"><RefreshCw className="w-4 h-4 mr-2" />Generate</Button>
        <Button variant="outline" onClick={() => { navigator.clipboard.writeText(uuids.join("\n")); toast({ title: "Copied all" }); }} data-testid="button-copy-all"><Copy className="w-4 h-4 mr-2" />Copy all</Button>
      </div>
      <Textarea value={uuids.join("\n")} readOnly rows={Math.min(20, uuids.length + 1)} className="font-mono text-sm bg-muted/30" data-testid="output-uuids" />
    </div>
  );
}
