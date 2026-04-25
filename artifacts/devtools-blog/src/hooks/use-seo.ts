import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
  canonical?: string;
}

const DEFAULT_TITLE = "DevTools Hub | Fast, free tools for developers";
const DEFAULT_DESCRIPTION = "A practical, no-fluff toolbelt for working developers. Free instant browser-based dev tools and tech blog.";
const DEFAULT_IMAGE = "https://devtools-hub.com/og-image.jpg";
const DEFAULT_TYPE = "website";

export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = DEFAULT_TYPE,
  url,
  canonical,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | DevTools Hub` : DEFAULT_TITLE;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
    setMeta("og:type", type, true);
    if (url) setMeta("og:url", url, true);
    
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    if (canonical) {
      let el = document.querySelector(`link[rel="canonical"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
      }
      el.setAttribute("href", canonical);
    }
  }, [title, description, image, type, url, canonical]);
}
