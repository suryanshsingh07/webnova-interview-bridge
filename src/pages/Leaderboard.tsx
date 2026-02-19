import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const leaders = [
  { rank: 1, name: "Aditya Verma", city: "Lucknow", score: 950, sessions: 45, badge: "🥇" },
  { rank: 2, name: "Sneha Patel", city: "Gorakhpur", score: 920, sessions: 42, badge: "🥈" },
  { rank: 3, name: "Mohit Yadav", city: "Varanasi", score: 890, sessions: 38, badge: "🥉" },
  { rank: 4, name: "Kavita Rao", city: "Allahabad", score: 860, sessions: 36, badge: "" },
  { rank: 5, name: "Arjun Mishra", city: "Basti", score: 830, sessions: 33, badge: "" },
  { rank: 6, name: "Pooja Tiwari", city: "Kanpur", score: 810, sessions: 31, badge: "" },
  { rank: 7, name: "Rohit Singh", city: "Agra", score: 790, sessions: 29, badge: "" },
  { rank: 8, name: "Neha Gupta", city: "Lucknow", score: 770, sessions: 27, badge: "" },
  { rank: 9, name: "Amit Pandey", city: "Gorakhpur", score: 750, sessions: 25, badge: "" },
  { rank: 10, name: "Riya Sharma", city: "Varanasi", score: 730, sessions: 23, badge: "" },
];

const Leaderboard = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout titleKey="leaderboardPage.title" showBack>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold mb-2">{t("leaderboardPage.title")}</h1>
          <p className="text-muted-foreground mb-8">{t("leaderboardPage.subtitle")}</p>

          {/* Top 3 podium */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {leaders.slice(0, 3).map((l, i) => (
              <motion.div
                key={l.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`p-5 rounded-2xl text-center ${i === 0 ? "bg-gradient-hero text-primary-foreground shadow-glow" : "glass-card shadow-card"}`}
              >
                <div className="text-3xl mb-2">{l.badge}</div>
                <div className="text-lg font-display font-bold">{l.name}</div>
                <div className={`text-xs ${i === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{l.city}</div>
                <div className="text-2xl font-display font-bold mt-2">{l.score}</div>
                <div className={`text-xs ${i === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{t("leaderboardPage.points")}</div>
              </motion.div>
            ))}
          </div>

          {/* Table */}
          <div className="glass-card shadow-card rounded-2xl overflow-hidden">
            {leaders.slice(3).map((l, i) => (
              <div key={l.rank} className={`flex items-center justify-between p-4 ${i < leaders.length - 4 ? "border-b border-border/50" : ""}`}>
                <div className="flex items-center gap-4">
                  <span className="w-8 text-center font-display font-bold text-muted-foreground">{l.rank}</span>
                  <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {l.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.city} • {l.sessions} {t("leaderboardPage.sessions")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="font-display font-bold text-primary">{l.score}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
