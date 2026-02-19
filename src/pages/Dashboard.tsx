import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { TrendingUp, Mic, Target, ArrowRight, Trophy, BookOpen, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Profile {
  full_name: string | null;
  fluency_score: number;
  confidence_score: number;
  sessions_completed: number;
  city: string | null;
  target_role: string | null;
}

const weeklyData = [
  { week: "W1", fluency: 35, confidence: 28 },
  { week: "W2", fluency: 42, confidence: 38 },
  { week: "W3", fluency: 50, confidence: 45 },
  { week: "W4", fluency: 58, confidence: 55 },
  { week: "W5", fluency: 65, confidence: 62 },
];

const badges = [
  { icon: "🎤", label: "First Interview", earned: true },
  { icon: "🔥", label: "3-Day Streak", earned: true },
  { icon: "⭐", label: "Score 80+", earned: false },
  { icon: "🏆", label: "10 Sessions", earned: false },
  { icon: "💎", label: "Perfect Answer", earned: false },
  { icon: "🚀", label: "Fluency Pro", earned: false },
];

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data as Profile);
        });
    }
  }, [user]);

  if (loading || !user) return null;

  const stats = [
    { label: "Fluency Score", value: profile?.fluency_score ?? 0, max: 100, icon: TrendingUp, color: "text-primary" },
    { label: "Confidence", value: profile?.confidence_score ?? 0, max: 100, icon: Target, color: "text-accent" },
    { label: "Sessions", value: profile?.sessions_completed ?? 0, max: 50, icon: Mic, color: "text-warning" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />

        <main className="flex-1 overflow-auto">
          {/* Top bar */}
          <header className="sticky top-0 z-40 glass h-14 flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <h2 className="font-display font-semibold text-sm">Dashboard</h2>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
                {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <Button variant="ghost" size="icon" onClick={signOut} className="rounded-xl">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Greeting */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
                  Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Keep practicing – every session makes you stronger.
                </p>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {stats.map((s) => (
                  <div key={s.label} className="p-5 rounded-2xl glass-card shadow-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <s.icon className={`h-5 w-5 ${s.color}`} />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                    </div>
                    <div className="text-3xl font-display font-bold mb-2">{s.value}</div>
                    <Progress value={(s.value / s.max) * 100} className="h-2" />
                  </div>
                ))}
              </div>

              {/* Chart + Quick Actions */}
              <div className="grid lg:grid-cols-5 gap-4 mb-8">
                {/* Chart */}
                <div className="lg:col-span-3 p-5 rounded-2xl glass-card shadow-card">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> Weekly Improvement
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.75rem",
                          fontSize: 12,
                        }}
                      />
                      <Line type="monotone" dataKey="fluency" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="confidence" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Quick actions */}
                <div className="lg:col-span-2 space-y-4">
                  <Link to="/interview" className="group block">
                    <div className="p-5 rounded-2xl bg-gradient-hero text-primary-foreground hover:shadow-glow transition-all duration-300">
                      <Mic className="h-7 w-7 mb-2" />
                      <h3 className="font-display font-bold text-lg mb-1">Start Mock Interview</h3>
                      <p className="text-primary-foreground/80 text-xs mb-3">Practice with AI feedback</p>
                      <div className="flex items-center text-xs font-medium">
                        Begin <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>

                  <div className="p-5 rounded-2xl glass-card shadow-card">
                    <BookOpen className="h-6 w-6 text-accent mb-2" />
                    <h3 className="font-display font-semibold text-sm mb-2">Answer Templates</h3>
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded-lg bg-muted">"Tell me about yourself"</div>
                      <div className="p-2 rounded-lg bg-muted">"Why this company?"</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="p-5 rounded-2xl glass-card shadow-card mb-8">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-warning" /> Achievement Badges
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {badges.map((b) => (
                    <div
                      key={b.label}
                      className={`text-center p-3 rounded-xl border transition-all ${
                        b.earned
                          ? "border-primary/30 bg-primary/5"
                          : "border-border opacity-40 grayscale"
                      }`}
                    >
                      <div className="text-2xl mb-1">{b.icon}</div>
                      <p className="text-xs font-medium">{b.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encouragement */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-5 rounded-2xl bg-gradient-purple/10 border border-primary/20 text-center"
              >
                <p className="text-base font-medium">
                  💪 "हर बार practice से आप और better होते जा रहे हैं!"
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Every practice session makes you better. Keep going!
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer */}
          <footer className="p-4 text-center text-xs text-muted-foreground border-t border-border">
            Powered by <span className="font-semibold text-foreground">WebNova</span>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
