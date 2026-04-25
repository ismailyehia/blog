import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";

import { setBaseUrl } from "@workspace/api-client-react";

// Configure API base URL for production
if (import.meta.env.VITE_API_URL) {
  setBaseUrl(import.meta.env.VITE_API_URL);
} else {
  // Default for development (proxied via Vite)
  setBaseUrl("/api");
}

createRoot(document.getElementById("root")!).render(<App />);
