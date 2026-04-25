import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CryptoJS from "crypto-js";
import { Copy } from "lucide-react";

const ALGOS = [
  { name: "MD5", fn: (s: string) => CryptoJS.MD5(s).toString() },
  { name: "SHA-1", fn: (s: string) => CryptoJS.SHA1(s).toString() },
  { name: "SHA-256", fn: (s: string) => CryptoJS.SHA256(s).toString() },
  { name: "SHA-512", fn: (s: string) => CryptoJS.SHA512(s).toString() },
];

export function HashGeneratorTool() {
  const [input, setInput] = useState("Hello, world!");
  const [hashes, setHashes] = useState<{ name: string; value: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setHashes(ALGOS.map((a) => ({ name: a.name, value: a.fn(input) })));
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="hash-input">Input text</Label>
        <Textarea id="hash-input" value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="font-mono text-sm" data-testid="input-hash" />
      </div>
      <div className="space-y-3">
        {hashes.map((h) => (
          <div key={h.name}>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-mono">{h.name}</Label>
            <div className="flex gap-2">
              <Input readOnly value={h.value} className="font-mono text-xs bg-muted/30" data-testid={`output-${h.name}`} />
              <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(h.value); toast({ title: `${h.name} copied` }); }}><Copy className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
