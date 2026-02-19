import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface DashboardLayoutProps {
  titleKey?: string;
  title?: string;
  children: React.ReactNode;
  showBack?: boolean;
}

export function DashboardLayout({ title, titleKey, children, showBack }: DashboardLayoutProps) {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const displayTitle = titleKey ? t(titleKey) : title || "";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 glass h-14 flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              {showBack && (
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <h2 className="font-display font-semibold text-sm">{displayTitle}</h2>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
                {user.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <Button variant="ghost" size="icon" onClick={signOut} className="rounded-xl">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <div className="p-4 sm:p-6">{children}</div>
          <footer className="p-4 text-center text-xs text-muted-foreground border-t border-border">
            {t("footer.poweredBy")} <span className="font-semibold text-foreground">WebNova</span>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}
