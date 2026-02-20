import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sparkles, LogOut, Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";

const languages: Language[] = ["English", "हिंदी", "Regional"];

export function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl">
          <span>Interview Bridge</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.home")}</Link>
          <Link to="/courses" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.courses")}</Link>
          <Link to="/quiz" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.aptitude")}</Link>
          <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.blog")}</Link>
          {user && (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.dashboard")}</Link>
              <Link to="/interview" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.practice")}</Link>
            </>
          )}

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-xl gap-1.5 text-muted-foreground">
                <Globe className="h-4 w-4" />
                {lang}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((l) => (
                <DropdownMenuItem key={l} onClick={() => setLang(l)} className={lang === l ? "font-semibold text-primary" : ""}>
                  {l}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> {t("nav.signOut")}
            </Button>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="rounded-xl bg-gradient-hero hover:opacity-90">{t("nav.getStarted")}</Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-border px-4 py-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium">{t("nav.home")}</Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)} className="text-sm font-medium">{t("nav.courses")}</Link>
          <Link to="/quiz" onClick={() => setMenuOpen(false)} className="text-sm font-medium">{t("nav.aptitude")}</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)} className="text-sm font-medium">{t("nav.blog")}</Link>
          {user && (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm font-medium">{t("nav.dashboard")}</Link>
              <Link to="/interview" onClick={() => setMenuOpen(false)} className="text-sm font-medium">{t("nav.practice")}</Link>
            </>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            {languages.map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-2 py-1 rounded ${lang === l ? "text-primary font-semibold" : ""}`}>{l}</button>
            ))}
          </div>
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => { signOut(); setMenuOpen(false); }}>{t("nav.signOut")}</Button>
          ) : (
            <Link to="/auth" onClick={() => setMenuOpen(false)}>
              <Button size="sm" className="w-full rounded-xl bg-gradient-hero">{t("nav.getStarted")}</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
