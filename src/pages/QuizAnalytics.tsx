import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useLanguage } from "@/i18n/LanguageContext";

const trendData = [
  { test: "Test 1", score: 62 },
  { test: "Test 2", score: 68 },
  { test: "Test 3", score: 72 },
  { test: "Test 4", score: 78 },
  { test: "Test 5", score: 85 },
];

const categoryData = [
  { category: "Logical", score: 78 },
  { category: "Quant", score: 72 },
  { category: "Verbal", score: 85 },
  { category: "Mock", score: 74 },
];

const QuizAnalytics = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout titleKey="quizAnalytics.title" showBack>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold mb-6">{t("quizAnalytics.title")}</h1>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card shadow-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4">{t("quizAnalytics.scoreTrend")}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="test" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card shadow-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-4">{t("quizAnalytics.categoryBreakdown")}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: 12 }} />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: t("quizAnalytics.totalTests"), value: "12" },
              { label: t("quizAnalytics.avgScore"), value: "76%" },
              { label: t("quizAnalytics.bestScore"), value: "92%" },
              { label: t("quizAnalytics.rank"), value: "#24" },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-xl glass-card shadow-card text-center">
                <div className="text-2xl font-display font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default QuizAnalytics;
