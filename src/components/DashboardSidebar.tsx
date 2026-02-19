import { Mic, BarChart3, FileText, Settings, Trophy, Sparkles, BookOpen, Brain, User, ClipboardList, MessageCircle, GraduationCap } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/i18n/LanguageContext";

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { t } = useLanguage();

  const mainNav = [
    { title: t("sidebar.dashboard"), url: "/dashboard", icon: BarChart3 },
    { title: t("sidebar.mockInterview"), url: "/interview", icon: Mic },
    { title: t("sidebar.courses"), url: "/courses", icon: BookOpen },
    { title: t("sidebar.aptitudeQuiz"), url: "/quiz", icon: Brain },
    { title: t("sidebar.aiMentor"), url: "/ai-mentor", icon: MessageCircle },
  ];

  const trackingNav = [
    { title: t("sidebar.myReports"), url: "/reports", icon: ClipboardList },
    { title: t("sidebar.leaderboard"), url: "/leaderboard", icon: Trophy },
    { title: t("sidebar.govExams"), url: "/gov-exams", icon: GraduationCap },
  ];

  const accountNav = [
    { title: t("sidebar.profile"), url: "/profile", icon: User },
    { title: t("sidebar.settings"), url: "/settings", icon: Settings },
  ];

  const renderGroup = (label: string, items: typeof mainNav) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild>
                <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                  <item.icon className="mr-2 h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <div className="p-4 flex items-center gap-2">
        {!collapsed && (
          <div className="flex items-center gap-2 font-display font-bold text-sm">
            <div className="w-7 h-7 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span>Interview Bridge</span>
          </div>
        )}
        <SidebarTrigger className={collapsed ? "mx-auto" : "ml-auto"} />
      </div>

      <SidebarContent>
        {renderGroup(t("sidebar.main"), mainNav)}
        {renderGroup(t("sidebar.tracking"), trackingNav)}
        {renderGroup(t("sidebar.account"), accountNav)}
      </SidebarContent>
    </Sidebar>
  );
}
