import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRGV2ZWxvcGVyIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE5MDAwMDAwMDB9.signature_placeholder";

function b64urlDecode(s: string): string {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad) s += "=".repeat(4 - pad);
  return decodeURIComponent(escape(atob(s)));
}

function tryParse(token: string): {
  header: object | null;
  payload: object | null;
  signature: string | null;
  error: string | null;
} {
  if (!token.trim()) return { header: null, payload: null, signature: null, error: null };
  const parts = token.trim().split(".");
  if (parts.length !== 3) return { header: null, payload: null, signature: null, error: "Invalid JWT: expected 3 parts separated by '.'" };
  try {
    const header = JSON.parse(b64urlDecode(parts[0]));
    const payload = JSON.parse(b64urlDecode(parts[1]));
    return { header, payload, signature: parts[2], error: null };
  } catch (e) {
    return { header: null, payload: null, signature: null, error: e instanceof Error ? e.message : "Decode error" };
  }
}

export function JwtDecoderTool() {
  const [token, setToken] = useState(SAMPLE);
  const decoded = useMemo(() => tryParse(token), [token]);

  const formatTime = (v: unknown) => {
    if (typeof v !== "number") return null;
    return new Date(v * 1000).toISOString();
  };

  const payload = decoded.payload as Record<string, unknown> | null;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">JWT</label>
        <Textarea value={token} onChange={(e) => setToken(e.target.value)} rows={5} className="font-mono text-sm break-all" data-testid="input-jwt" />
      </div>

      {decoded.error && (
        <div className="p-3 rounded border border-destructive/50 bg-destructive/10 text-destructive text-sm font-mono" data-testid="text-jwt-error">
          {decoded.error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Header</label>
          <pre className="bg-card border border-border rounded-md p-3 text-xs font-mono overflow-auto min-h-[140px]" data-testid="output-header">{decoded.header ? JSON.stringify(decoded.header, null, 2) : ""}</pre>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Payload</label>
          <pre className="bg-card border border-border rounded-md p-3 text-xs font-mono overflow-auto min-h-[140px]" data-testid="output-payload">{decoded.payload ? JSON.stringify(decoded.payload, null, 2) : ""}</pre>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1.5 block">Signature</label>
          <pre className="bg-card border border-border rounded-md p-3 text-xs font-mono overflow-auto min-h-[140px] break-all whitespace-pre-wrap" data-testid="output-signature">{decoded.signature ?? ""}</pre>
        </div>
      </div>

      {payload && (
        <div className="border border-border/50 rounded-md p-3 bg-muted/20 text-sm font-mono space-y-1">
          {payload.iat !== undefined && <div><span className="text-muted-foreground">Issued at: </span>{formatTime(payload.iat)}</div>}
          {payload.exp !== undefined && <div><span className="text-muted-foreground">Expires at: </span>{formatTime(payload.exp)}</div>}
          {payload.nbf !== undefined && <div><span className="text-muted-foreground">Not before: </span>{formatTime(payload.nbf)}</div>}
        </div>
      )}
    </div>
  );
}
