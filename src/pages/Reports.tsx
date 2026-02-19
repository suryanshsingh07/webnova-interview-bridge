import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const reports = [
  { id: 1, role: "Software Developer", date: "Feb 14, 2026", score: 82, fluency: 78, confidence: 85 },
  { id: 2, role: "Data Analyst", date: "Feb 12, 2026", score: 76, fluency: 72, confidence: 80 },
  { id: 3, role: "Business Analyst", date: "Feb 10, 2026", score: 70, fluency: 68, confidence: 72 },
  { id: 4, role: "Marketing Associate", date: "Feb 8, 2026", score: 65, fluency: 60, confidence: 70 },
];

const Reports = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout titleKey="reports.title" showBack>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold mb-2">{t("reports.title")}</h1>
          <p className="text-muted-foreground mb-8">{t("reports.subtitle")}</p>

          <div className="space-y-4">
            {reports.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl glass-card shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{r.role}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {r.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-center">
                  <div>
                    <div className="text-lg font-display font-bold text-primary">{r.score}</div>
                    <div className="text-xs text-muted-foreground">{t("reports.overall")}</div>
                  </div>
                  <div>
                    <div className="text-lg font-display font-bold text-accent">{r.fluency}</div>
                    <div className="text-xs text-muted-foreground">{t("reports.fluency")}</div>
                  </div>
                  <div>
                    <div className="text-lg font-display font-bold text-success">{r.confidence}</div>
                    <div className="text-xs text-muted-foreground">{t("reports.confidence")}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl"><Eye className="h-3 w-3 mr-1" /> {t("reports.view")}</Button>
                  <Button variant="outline" size="sm" className="rounded-xl"><Download className="h-3 w-3 mr-1" /> {t("reports.pdf")}</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
