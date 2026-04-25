import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{6}|[0-9a-f]{3})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const num = parseInt(h, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

export function ColorConverterTool() {
  const [hex, setHex] = useState("#ff6b35");
  const { toast } = useToast();
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const hsv = rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null;

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast({ title: "Copied" }); };

  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-6">
      <div>
        <div className="aspect-square rounded-lg border-4 border-border" style={{ background: rgb ? hex : "transparent" }} data-testid="preview-color" />
        <Label className="mt-3 block">Color picker</Label>
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full h-10 cursor-pointer mt-1" data-testid="input-color-picker" />
      </div>
      <div className="space-y-3">
        <div>
          <Label>HEX</Label>
          <div className="flex gap-2">
            <Input value={hex} onChange={(e) => setHex(e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`)} className="font-mono" data-testid="input-hex" />
            <Button variant="outline" size="icon" onClick={() => rgb && copy(rgbToHex(rgb.r, rgb.g, rgb.b))}><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
        <div>
          <Label>RGB</Label>
          <div className="flex gap-2">
            <Input readOnly value={rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid"} className="font-mono bg-muted/30" data-testid="output-rgb" />
            <Button variant="outline" size="icon" onClick={() => rgb && copy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
        <div>
          <Label>HSL</Label>
          <div className="flex gap-2">
            <Input readOnly value={hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "Invalid"} className="font-mono bg-muted/30" data-testid="output-hsl" />
            <Button variant="outline" size="icon" onClick={() => hsl && copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
        <div>
          <Label>HSV</Label>
          <div className="flex gap-2">
            <Input readOnly value={hsv ? `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` : "Invalid"} className="font-mono bg-muted/30" data-testid="output-hsv" />
            <Button variant="outline" size="icon" onClick={() => hsv && copy(`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`)}><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
