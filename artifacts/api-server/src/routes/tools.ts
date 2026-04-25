import { Router, type IRouter } from "express";
import { GetToolBySlugParams } from "@workspace/api-zod";

const router: IRouter = Router();

const tools = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description:
      "Format, validate, and explore JSON data with a tree view and copy-ready output.",
    category: "Formatting",
    icon: "Braces",
    keywords: ["json", "format", "pretty", "validate", "minify", "viewer"],
  },
  {
    slug: "base64",
    name: "Base64 Encoder / Decoder",
    description:
      "Encode and decode text or files to and from Base64 instantly in your browser.",
    category: "Encoding",
    icon: "Binary",
    keywords: ["base64", "encode", "decode", "binary", "text"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description:
      "Generate strong, configurable passwords. Adjust length, symbols, numbers, and casing.",
    category: "Generators",
    icon: "KeyRound",
    keywords: ["password", "generator", "secure", "random"],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate v4 UUIDs one at a time or in bulk for testing and seeding.",
    category: "Generators",
    icon: "Fingerprint",
    keywords: ["uuid", "guid", "id", "random", "generator"],
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    description:
      "Pick a color and convert between HEX, RGB, HSL, and HSV with a live preview.",
    category: "Color",
    icon: "Palette",
    keywords: ["color", "hex", "rgb", "hsl", "hsv", "picker"],
  },
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    description:
      "Convert text between camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, and more.",
    category: "Text",
    icon: "Type",
    keywords: ["text", "case", "camelcase", "snake", "kebab", "pascal"],
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    description:
      "Live Markdown editor with side-by-side preview and copy as HTML.",
    category: "Text",
    icon: "FileText",
    keywords: ["markdown", "md", "preview", "html", "editor"],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description:
      "Decode JSON Web Tokens to inspect their header, payload, and signature.",
    category: "Encoding",
    icon: "ShieldCheck",
    keywords: ["jwt", "token", "decode", "auth", "jose"],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    description:
      "Percent-encode and decode URLs and query parameters safely.",
    category: "Encoding",
    icon: "Link2",
    keywords: ["url", "encode", "decode", "percent", "uri"],
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description:
      "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text input.",
    category: "Generators",
    icon: "Hash",
    keywords: ["hash", "md5", "sha", "sha256", "checksum"],
  },
];

router.get("/tools", (_req, res) => {
  res.json(tools);
});

router.get("/tools/:slug", (req, res) => {
  const { slug } = GetToolBySlugParams.parse(req.params);
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) {
    res.status(404).json({ error: "not_found", message: "Tool not found" });
    return;
  }
  res.json(tool);
});

export default router;
