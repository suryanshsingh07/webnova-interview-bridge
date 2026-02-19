import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import {
  ArrowRight, Mic, BookOpen, TrendingUp, Globe, MessageCircle, Shield,
  Star, Zap, Brain, ChevronRight, Users, Trophy, FileText, Sparkles,
  BarChart3, Target, GraduationCap, Lightbulb, Play
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const featureKeys = [
  { icon: Mic, titleKey: "feature.speechAnalysis", descKey: "feature.speechAnalysisDesc" },
  { icon: Brain, titleKey: "feature.dynamicEngine", descKey: "feature.dynamicEngineDesc" },
  { icon: FileText, titleKey: "feature.resumeQuestions", descKey: "feature.resumeQuestionsDesc" },
  { icon: Target, titleKey: "feature.toneDetection", descKey: "feature.toneDetectionDesc" },
  { icon: Lightbulb, titleKey: "feature.answerBuilder", descKey: "feature.answerBuilderDesc" },
  { icon: Globe, titleKey: "feature.hindiExplanations", descKey: "feature.hindiExplanationsDesc" },
  { icon: BarChart3, titleKey: "feature.feedbackPanel", descKey: "feature.feedbackPanelDesc" },
  { icon: TrendingUp, titleKey: "feature.progressDashboard", descKey: "feature.progressDashboardDesc" },
  { icon: GraduationCap, titleKey: "feature.courseLibrary", descKey: "feature.courseLibraryDesc" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Software Developer at TCS", text: "Interview Bridge transformed my confidence. From hesitating in English to acing 3 MNC interviews!", avatar: "PS", rating: 5 },
  { name: "Rahul Gupta", role: "Business Analyst at Infosys", text: "The Hindi explanations made grammar rules crystal clear. Got placed within 2 months of practicing!", avatar: "RG", rating: 5 },
  { name: "Ananya Singh", role: "Marketing at Wipro", text: "From struggling with 'Tell me about yourself' to confidently handling stress interviews. Amazing platform!", avatar: "AS", rating: 5 },
  { name: "Vikash Kumar", role: "Data Analyst at Cognizant", text: "The resume-based questions feature was a game changer. Every question felt relevant to my experience.", avatar: "VK", rating: 5 },
];

const partnerLogos = ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "HCL", "Accenture"];

const Index = () => {
  const { user } = useAuth();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { t } = useLanguage();

  const stats = [
    { value: "50K+", label: t("hero.studentsTrained") },
    { value: "92%", label: t("hero.placementRate") },
    { value: "4.9★", label: t("hero.userRating") },
    { value: "200+", label: t("hero.companiesTrust") },
  ];

  const courseCategories = [
    { icon: "💻", title: t("courses.softwareDev"), count: "25+ modules" },
    { icon: "📊", title: t("courses.dataScience"), count: "18+ modules" },
    { icon: "📈", title: t("courses.marketing"), count: "15+ modules" },
    { icon: "🏛️", title: t("courses.govExams"), count: "30+ modules" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container mx-auto max-w-7xl relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
              >
                <Sparkles className="h-4 w-4" />
                {t("hero.badge")}
              </motion.span>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-[1.1] mb-6">
                {t("hero.title1")}{" "}
                <span className="text-gradient">{t("hero.title2")}</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                {t("hero.desc")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to={user ? "/interview" : "/auth"}>
                  <Button size="lg" className="text-base px-8 py-6 rounded-xl bg-gradient-hero hover:opacity-90 shadow-glow group">
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    {t("hero.startInterview")}
                  </Button>
                </Link>
                <Link to={user ? "/courses" : "/auth"}>
                  <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl group">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {t("hero.exploreCourses")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-display font-bold text-gradient">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3D Mic illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-hero opacity-10 blur-[60px] absolute inset-0 m-auto" />
                <div className="relative w-72 h-72 glass-card flex items-center justify-center">
                  <svg className="w-40 h-40 text-primary" viewBox="0 0 120 120" fill="none">
                    <defs>
                      <linearGradient id="micGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(250, 80%, 60%)" />
                        <stop offset="100%" stopColor="hsl(200, 85%, 55%)" />
                      </linearGradient>
                    </defs>
                    <rect x="44" y="15" width="32" height="55" rx="16" fill="url(#micGrad)" opacity="0.9" />
                    <path d="M30 55 Q30 90 60 90 Q90 90 90 55" stroke="url(#micGrad)" strokeWidth="4" fill="none" opacity="0.7" />
                    <rect x="57" y="90" width="6" height="16" fill="url(#micGrad)" opacity="0.6" />
                    <rect x="45" y="106" width="30" height="4" rx="2" fill="url(#micGrad)" opacity="0.4" />
                    <circle cx="60" cy="42" r="30" stroke="url(#micGrad)" strokeWidth="1.5" opacity="0.15" />
                    <circle cx="60" cy="42" r="42" stroke="url(#micGrad)" strokeWidth="1" opacity="0.1" />
                  </svg>
                </div>

                {/* Floating badges */}
                <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-6 -right-6 glass-card px-4 py-2.5 flex items-center gap-2 text-sm font-medium shadow-card">
                  <Zap className="h-4 w-4 text-primary" /> AI Analysis
                </motion.div>
                <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute -bottom-6 -left-6 glass-card px-4 py-2.5 flex items-center gap-2 text-sm font-medium shadow-card">
                  <Brain className="h-4 w-4 text-accent" /> Smart Feedback
                </motion.div>
                <motion.div animate={{ y: [-4, 8, -4] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/2 -right-12 glass-card px-4 py-2.5 flex items-center gap-2 text-sm font-medium shadow-card">
                  <Globe className="h-4 w-4 text-success" /> Hindi Support
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-10 px-4 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-sm text-muted-foreground mb-6">{t("partners.trusted")}</p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {partnerLogos.map((name) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2.5 rounded-xl bg-card border border-border/50 text-muted-foreground font-display font-semibold text-sm shadow-sm"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("features.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              {t("features.title1")} <span className="text-gradient">{t("features.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("features.desc")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureKeys.map((f, i) => (
              <motion.div
                key={f.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group relative p-6 rounded-2xl glass-card shadow-card hover:shadow-purple transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${hoveredFeature === i ? "bg-gradient-hero scale-110" : "bg-primary/10"}`}>
                  <f.icon className={`h-6 w-6 transition-colors ${hoveredFeature === i ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{t(f.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(f.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              {t("howItWorks.title1")} <span className="text-gradient-purple">{t("howItWorks.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t("howItWorks.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", titleKey: "howItWorks.step1", descKey: "howItWorks.step1Desc", icon: Target },
              { step: "02", titleKey: "howItWorks.step2", descKey: "howItWorks.step2Desc", icon: Mic },
              { step: "03", titleKey: "howItWorks.step3", descKey: "howItWorks.step3Desc", icon: TrendingUp },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-5 shadow-glow">
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="text-xs font-bold text-primary mb-2">STEP {item.step}</div>
                <h3 className="font-display font-bold text-xl mb-2">{t(item.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(item.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories Preview */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              {t("courses.title1")} <span className="text-gradient">{t("courses.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t("courses.subtitle")}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {courseCategories.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl glass-card shadow-card hover:shadow-purple transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="font-display font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.count}</p>
                <ChevronRight className="h-4 w-4 text-primary mt-3 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={user ? "/courses" : "/auth"}>
              <Button variant="outline" size="lg" className="rounded-xl">
                {t("courses.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              {t("testimonials.title1")} <span className="text-gradient-purple">{t("testimonials.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t("testimonials.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((te, i) => (
              <motion.div
                key={te.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-purple transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(te.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">"{te.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {te.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{te.name}</p>
                    <p className="text-xs text-muted-foreground">{te.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              <span className="text-gradient">{t("leaderboard.title1")}</span> {t("leaderboard.title2")}
            </h2>
            <p className="text-muted-foreground">{t("leaderboard.subtitle")}</p>
          </motion.div>

          <div className="glass-card shadow-card rounded-2xl p-6 overflow-hidden">
            {[
              { rank: 1, name: "Aditya Verma", score: 95, badge: "🥇" },
              { rank: 2, name: "Sneha Patel", score: 92, badge: "🥈" },
              { rank: 3, name: "Mohit Yadav", score: 89, badge: "🥉" },
              { rank: 4, name: "Kavita Rao", score: 86, badge: "4" },
              { rank: 5, name: "Arjun Mishra", score: 83, badge: "5" },
            ].map((item, i) => (
              <motion.div
                key={item.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center justify-between py-3 ${i < 4 ? "border-b border-border/50" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl w-8 text-center">{item.badge}</span>
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-display font-bold text-primary">{item.score}</span>
                  <span className="text-xs text-muted-foreground">{t("common.pts")}</span>
                </div>
              </motion.div>
            ))}
            <div className="text-center mt-4">
              <Link to={user ? "/leaderboard" : "/auth"}>
                <Button variant="ghost" size="sm" className="text-primary">
                  {t("leaderboard.viewFull")} <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-hero p-12 sm:p-16 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-5">{t("cta.title")}</h2>
              <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
                {t("cta.desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={user ? "/interview" : "/auth"}>
                  <Button size="lg" variant="secondary" className="text-base px-8 py-6 rounded-xl font-semibold">
                    {t("cta.startFree")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={user ? "/courses" : "/auth"}>
                  <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    {t("cta.browseCourses")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 font-display font-bold text-lg mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                Interview Bridge
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.desc")}</p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">{t("footer.platform")}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/interview" className="block hover:text-foreground transition-colors">{t("footer.mockInterview")}</Link>
                <Link to="/courses" className="block hover:text-foreground transition-colors">{t("nav.courses")}</Link>
                <Link to="/quiz" className="block hover:text-foreground transition-colors">{t("footer.aptitudeTests")}</Link>
                <Link to="/leaderboard" className="block hover:text-foreground transition-colors">{t("footer.leaderboard")}</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">{t("footer.resources")}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/blog" className="block hover:text-foreground transition-colors">{t("footer.blogTips")}</Link>
                <Link to="/gov-exams" className="block hover:text-foreground transition-colors">{t("footer.govExams")}</Link>
                <span className="block">{t("footer.faq")}</span>
                <span className="block">{t("footer.support")}</span>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-3">{t("footer.company")}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <span className="block">{t("footer.aboutUs")}</span>
                <span className="block">{t("footer.careers")}</span>
                <span className="block">{t("footer.privacy")}</span>
                <span className="block">{t("footer.terms")}</span>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
            <p className="text-sm text-muted-foreground">
              {t("footer.poweredBy")} <span className="font-semibold text-foreground">WebNova</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
