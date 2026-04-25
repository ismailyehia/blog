import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Moon, Sun, Search, Terminal, Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(true); // Default to dark mode as per requirements

  useEffect(() => {
    // Initial check
    if (typeof window !== "undefined") {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const savedTheme = localStorage.getItem("theme");
      const shouldBeDark = savedTheme === "dark" || (!savedTheme && isSystemDark) || !savedTheme; // force dark by default
      
      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { href: "/tools", label: t("nav.tools") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/categories", label: t("nav.categories") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-14 items-center px-4 md:px-8">
        <div className="flex items-center me-4 md:me-8">
          <Link href="/" className="flex items-center gap-3 me-10 text-foreground font-bold group">
            <img 
              src="/logo.png" 
              alt="Blue Raven Logo" 
              className="h-8 w-8 object-contain transition-transform group-hover:scale-110" 
            />
            <span className={`hidden sm:inline-block text-xl ${i18n.language === 'en' ? 'font-mono tracking-tight' : 'font-sans'}`}>{t("common.logo")}</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-x-10 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`transition-colors hover:text-primary ${location.startsWith(link.href) ? (i18n.language === 'ar' ? 'mr-0' : '') : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" className="relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64" onClick={() => {}}>
              <span className="hidden lg:inline-flex">{t("common.search_docs")}</span>
              <span className="inline-flex lg:hidden">{t("common.search")}</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 px-0" onClick={toggleLanguage}>
              <Languages className="h-4 w-4" />
              <span className="sr-only">Switch Language</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="h-8 w-8 px-0" onClick={toggleTheme}>
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">{t("common.toggle_theme")}</span>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-8 w-8 px-0">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col space-y-3 mt-6">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`text-sm font-medium ${location.startsWith(link.href) ? "text-primary" : "text-foreground/70"}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}
