import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Pages
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ToolsList from "@/pages/tools";
import ToolDetail from "@/pages/tool-detail";
import BlogList from "@/pages/blog";
import PostDetail from "@/pages/post-detail";
import Categories from "@/pages/categories";
import CategoryDetail from "@/pages/category-detail";
import About from "@/pages/about";
import Contact from "@/pages/contact";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-1 w-full">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tools" component={ToolsList} />
          <Route path="/tools/:slug" component={ToolDetail} />
          <Route path="/blog" component={BlogList} />
          <Route path="/blog/:slug" component={PostDetail} />
          <Route path="/categories" component={Categories} />
          <Route path="/categories/:slug" component={CategoryDetail} />
          <Route path="/tags/:slug" component={BlogList} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
