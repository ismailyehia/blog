import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Copy } from "lucide-react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?/",
};

function generatePassword(opts: {
  length: number;
  lower: boolean;
  upper: boolean;
  numbers: boolean;
  symbols: boolean;
}): string {
  let chars = "";
  if (opts.lower) chars += SETS.lower;
  if (opts.upper) chars += SETS.upper;
  if (opts.numbers) chars += SETS.numbers;
  if (opts.symbols) chars += SETS.symbols;
  if (!chars) return "";
  const arr = new Uint32Array(opts.length);
  crypto.getRandomValues(arr);
  let out = "";
  for (let i = 0; i < opts.length; i++) {
    out += chars[arr[i] % chars.length];
  }
  return out;
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(20);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const regen = () => setPassword(generatePassword({ length, lower, upper, numbers, symbols }));

  useEffect(() => { regen(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [length, lower, upper, numbers, symbols]);

  const strength = ((lower ? 1 : 0) + (upper ? 1 : 0) + (numbers ? 1 : 0) + (symbols ? 1 : 0)) * length;
  const strengthLabel = strength < 30 ? "Weak" : strength < 60 ? "Decent" : strength < 100 ? "Strong" : "Very strong";
  const strengthColor = strength < 30 ? "bg-destructive" : strength < 60 ? "bg-yellow-500" : "bg-primary";

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input value={password} readOnly className="font-mono text-base" data-testid="output-password" />
        <Button variant="outline" size="icon" onClick={regen} data-testid="button-regenerate"><RefreshCw className="w-4 h-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(password); toast({ title: "Copied" }); }} data-testid="button-copy-password"><Copy className="w-4 h-4" /></Button>
      </div>

      <div>
        <div className="flex justify-between text-xs text-muted-foreground font-mono mb-1">
          <span>Strength</span>
          <span data-testid="text-strength">{strengthLabel}</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className={`h-full ${strengthColor} transition-all`} style={{ width: `${Math.min(100, strength)}%` }} />
        </div>
      </div>

      <div>
        <Label>Length: <span className="font-mono text-primary">{length}</span></Label>
        <Slider value={[length]} onValueChange={([v]) => setLength(v)} min={4} max={64} step={1} className="mt-2" data-testid="slider-length" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Label className="flex items-center justify-between"><span>Lowercase (a-z)</span><Switch checked={lower} onCheckedChange={setLower} data-testid="switch-lower" /></Label>
        <Label className="flex items-center justify-between"><span>Uppercase (A-Z)</span><Switch checked={upper} onCheckedChange={setUpper} data-testid="switch-upper" /></Label>
        <Label className="flex items-center justify-between"><span>Numbers (0-9)</span><Switch checked={numbers} onCheckedChange={setNumbers} data-testid="switch-numbers" /></Label>
        <Label className="flex items-center justify-between"><span>Symbols (!@#)</span><Switch checked={symbols} onCheckedChange={setSymbols} data-testid="switch-symbols" /></Label>
      </div>
    </div>
  );
}
