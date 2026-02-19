import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const exams = [
  { id: "upsc", icon: "🏛️", title: "UPSC Civil Services", desc: "Complete interview preparation for IAS, IPS, IFS personality test.", modules: 30, students: "20K+" },
  { id: "ssc", icon: "📋", title: "SSC Interviews", desc: "Staff Selection Commission interview prep with mock panels.", modules: 15, students: "15K+" },
  { id: "banking", icon: "🏦", title: "Banking (IBPS/SBI)", desc: "Bank PO and Clerk interview preparation with real scenarios.", modules: 18, students: "25K+" },
  { id: "state", icon: "📝", title: "State PSC", desc: "State-level civil service interview preparation across states.", modules: 20, students: "12K+" },
  { id: "defense", icon: "🎖️", title: "Defense (SSB)", desc: "Services Selection Board interview and personality assessment.", modules: 22, students: "8K+" },
  { id: "railway", icon: "🚂", title: "Railway Exams", desc: "RRB interview preparation for various railway positions.", modules: 12, students: "10K+" },
];

const GovExams = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout titleKey="govExams.title" showBack>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">{t("govExams.title")}</h1>
          <p className="text-muted-foreground mb-8">{t("govExams.subtitle")}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {exams.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl glass-card shadow-card hover:shadow-purple transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-4">{e.icon}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{e.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{e.desc}</p>
                <div className="flex gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {e.modules} {t("coursesPage.modules")}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {e.students}</span>
                </div>
                <Link to={`/courses/${e.id}`}>
                  <Button variant="outline" size="sm" className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {t("govExams.startPrep")} <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default GovExams;
