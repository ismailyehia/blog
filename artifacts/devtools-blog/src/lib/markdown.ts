import { marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

marked.setOptions({
  gfm: true,
  breaks: false,
});

const renderer = new marked.Renderer();
const originalCode = renderer.code.bind(renderer);
renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre class="hljs"><code class="language-${language}">${highlighted}</code></pre>`;
} as typeof originalCode;

marked.use({ renderer });

export function renderMarkdown(md: string): string {
  const html = marked.parse(md, { async: false }) as string;
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ["target", "rel"],
  });
}
