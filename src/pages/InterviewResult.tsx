import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Download, ArrowRight, CheckCircle, AlertCircle, TrendingUp, Mic, BookOpen } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const InterviewResult = () => {
  const { t } = useLanguage();

  const result = {
    overall: 78,
    fluency: 75,
    grammar: 82,
    confidence: 72,
    fillerWords: 8,
    strengths: ["Clear articulation", "Good use of examples", "Professional vocabulary"],
    weaknesses: ["Excessive use of filler words", "Could improve sentence structure", "Need more confident tone"],
    suggestions: ["Practice speaking without 'um' and 'uh'", "Use STAR method for behavioral questions", "Record yourself and review daily"],
    recommendedModules: ["Filler Word Reduction", "Confidence Building", "Advanced Grammar"],
  };

  const scores = [
    { label: t("result.overallScore"), value: result.overall, color: "bg-primary" },
    { label: t("result.fluency"), value: result.fluency, color: "bg-accent" },
    { label: t("result.grammar"), value: result.grammar, color: "bg-success" },
    { label: t("result.confidence"), value: result.confidence, color: "bg-warning" },
  ];

  return (
    <DashboardLayout titleKey="result.yourScore" showBack>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Score Header */}
          <div className="rounded-2xl bg-gradient-hero p-8 text-center text-primary-foreground mb-8">
            <h1 className="text-lg font-medium mb-2">{t("result.yourScore")}</h1>
            <div className="text-6xl font-display font-bold mb-2">{result.overall}</div>
            <p className="text-primary-foreground/70">{t("result.outOf")}</p>
          </div>

          {/* Score Breakdown */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {scores.map((s) => (
              <div key={s.label} className="glass-card shadow-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-display font-bold text-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground mb-2">{s.label}</div>
                <Progress value={s.value} className="h-1.5" />
              </div>
            ))}
          </div>

          {/* Filler Words */}
          <div className="glass-card shadow-card rounded-2xl p-5 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm font-medium">{t("result.fillerWords")}</p>
                <p className="text-xs text-muted-foreground">{t("result.fillerExamples")}</p>
              </div>
            </div>
            <span className="text-2xl font-display font-bold text-warning">{result.fillerWords}</span>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div className="glass-card shadow-card rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2 text-success"><CheckCircle className="h-4 w-4" /> {t("result.strengths")}</h3>
              <ul className="space-y-2">
                {result.strengths.map((s) => (
                  <li key={s} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card shadow-card rounded-2xl p-5">
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2 text-warning"><AlertCircle className="h-4 w-4" /> {t("result.areasImprove")}</h3>
              <ul className="space-y-2">
                {result.weaknesses.map((w) => (
                  <li key={w} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-warning mt-0.5">!</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suggestions */}
          <div className="glass-card shadow-card rounded-2xl p-5 mb-6">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> {t("result.suggestions")}</h3>
            <ul className="space-y-2">
              {result.suggestions.map((s) => (
                <li key={s} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Modules */}
          <div className="glass-card shadow-card rounded-2xl p-5 mb-8">
            <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><BookOpen className="h-4 w-4 text-accent" /> {t("result.recommended")}</h3>
            <div className="flex flex-wrap gap-2">
              {result.recommendedModules.map((m) => (
                <span key={m} className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">{m}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="rounded-xl flex-1">
              <Download className="h-4 w-4 mr-2" /> {t("result.downloadPDF")}
            </Button>
            <Link to="/interview" className="flex-1">
              <Button className="w-full rounded-xl bg-gradient-hero hover:opacity-90">
                <Mic className="h-4 w-4 mr-2" /> {t("result.practiceAgain")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewResult;
