import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Star, BookOpen, CheckCircle, TrendingUp, Zap, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const COURSES = [
  {
    id: "sde",
    icon: "💻",
    title: "Software Development Interview",
    desc: "Master DSA, system design, and HR questions for SDE roles at top MNCs.",
    modules: 25,
    students: "12K+",
    rating: 4.8,
    level: "Intermediate",
    category: "Technical",
    duration: "40 hrs",
    topics: ["Arrays & Strings", "System Design", "OOP Concepts", "SQL & Databases", "HR Questions"],
    color: "from-blue-500 to-indigo-600",
    progress: 65,
  },
  {
    id: "ds",
    icon: "📊",
    title: "Data Science & AI",
    desc: "ML concepts, case studies, and behavioral questions for data roles.",
    modules: 18,
    students: "8K+",
    rating: 4.7,
    level: "Advanced",
    category: "Technical",
    duration: "30 hrs",
    topics: ["ML Fundamentals", "Python & Pandas", "Case Studies", "Statistics", "Communication Skills"],
    color: "from-purple-500 to-pink-600",
    progress: 30,
  },
  {
    id: "hr",
    icon: "🤝",
    title: "HR & Management",
    desc: "People management, conflict resolution, and leadership interview prep.",
    modules: 12,
    students: "5K+",
    rating: 4.6,
    level: "Beginner",
    category: "Management",
    duration: "20 hrs",
    topics: ["Leadership", "Conflict Resolution", "Team Management", "HR Policies", "Situational Judgment"],
    color: "from-green-500 to-emerald-600",
    progress: 0,
  },
  {
    id: "marketing",
    icon: "📈",
    title: "Marketing & Sales",
    desc: "Brand strategy, digital marketing, and sales role interview mastery.",
    modules: 15,
    students: "6K+",
    rating: 4.7,
    level: "Beginner",
    category: "Management",
    duration: "25 hrs",
    topics: ["Digital Marketing", "Brand Strategy", "Sales Funnel", "Metrics & KPIs", "Customer Psychology"],
    color: "from-orange-500 to-red-500",
    progress: 0,
  },
  {
    id: "gd",
    icon: "🗣️",
    title: "Group Discussion Training",
    desc: "Learn to lead, contribute, and stand out in GD rounds.",
    modules: 8,
    students: "10K+",
    rating: 4.9,
    level: "Beginner",
    category: "Communication",
    duration: "12 hrs",
    topics: ["GD Strategies", "Opening Techniques", "Body Language", "Point Building", "Summarizing"],
    color: "from-cyan-500 to-blue-500",
    progress: 80,
  },
  {
    id: "pd",
    icon: "🌟",
    title: "Personality Development",
    desc: "Body language, communication skills, and professional etiquette.",
    modules: 10,
    students: "15K+",
    rating: 4.8,
    level: "Beginner",
    category: "Communication",
    duration: "15 hrs",
    topics: ["Body Language", "Voice Modulation", "Professional Etiquette", "Confidence Building", "Networking"],
    color: "from-yellow-500 to-orange-500",
    progress: 45,
  },
];

const CATEGORIES = ["All", "Technical", "Management", "Communication"];
const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All Levels");

  const filtered = COURSES.filter((c) => {
    const catMatch = activeCategory === "All" || c.category === activeCategory;
    const levelMatch = activeLevel === "All Levels" || c.level === activeLevel;
    return catMatch && levelMatch;
  });

  return (
    <DashboardLayout titleKey="coursesPage.title" showBack>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>
              <BookOpen className="h-3.5 w-3.5" /> {COURSES.length} Courses Available
            </div>
            <h1 className="text-3xl font-display font-bold mb-2">{t("coursesPage.title")}</h1>
            <p className="text-muted-foreground">{t("coursesPage.subtitle")}</p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { icon: "📚", value: "6", label: "Courses" },
              { icon: "🎯", value: "56K+", label: "Students" },
              { icon: "⭐", value: "4.8", label: "Avg Rating" },
              { icon: "🏆", value: "92%", label: "Placement Rate" },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-2xl glass-card shadow-card text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-display font-bold text-lg">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="h-4 w-px bg-border mx-1" />
            <div className="flex gap-2 flex-wrap">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveLevel(lvl)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeLevel === lvl
                    ? "bg-accent text-accent-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
                    }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Course grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl glass-card shadow-card hover:shadow-purple transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              >
                {/* Card top gradient */}
                <div className={`h-2 bg-gradient-to-r ${c.color}`} />

                <div className="p-6">
                  {/* Icon + badges */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{c.icon}</div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.level === "Advanced" ? "bg-destructive/10 text-destructive" : c.level === "Intermediate" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                        {c.level}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{c.category}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{c.desc}</p>

                  {/* Topics preview */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.topics.slice(0, 3).map((topic) => (
                      <span key={topic} className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">{topic}</span>
                    ))}
                    {c.topics.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">+{c.topics.length - 3} more</span>
                    )}
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {c.students}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> {c.rating}</span>
                  </div>

                  {/* Progress */}
                  {c.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Your progress</span>
                        <span className="font-medium text-primary">{c.progress}%</span>
                      </div>
                      <Progress value={c.progress} className="h-1.5" />
                    </div>
                  )}

                  <Link to={`/courses/${c.id}`}>
                    <Button
                      variant={c.progress > 0 ? "default" : "outline"}
                      size="sm"
                      className={`rounded-xl w-full transition-all ${c.progress > 0
                        ? "bg-gradient-hero hover:opacity-90 text-white"
                        : "group-hover:bg-primary group-hover:text-primary-foreground"
                        }`}
                    >
                      {c.progress > 0 ? (
                        <><TrendingUp className="mr-2 h-3 w-3" /> Continue Learning</>
                      ) : (
                        <>{t("coursesPage.viewCourse")} <ArrowRight className="ml-2 h-3 w-3" /></>
                      )}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-muted-foreground">No courses match your filters. Try a different combination.</p>
              <Button variant="outline" className="mt-4 rounded-xl" onClick={() => { setActiveCategory("All"); setActiveLevel("All Levels"); }}>
                Reset Filters
              </Button>
            </div>
          )}

          {/* Learning path */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-10 p-6 rounded-2xl glass-card shadow-card">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-warning" /> Recommended Learning Path for Freshers
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              {[
                { step: "1", label: "Personality Dev.", icon: "🌟" },
                { arrow: true },
                { step: "2", label: "Group Discussion", icon: "🗣️" },
                { arrow: true },
                { step: "3", label: "HR & Management", icon: "🤝" },
                { arrow: true },
                { step: "4", label: "Domain Course", icon: "💻" },
              ].map((item, i) =>
                "arrow" in item ? (
                  <ArrowRight key={i} className="h-4 w-4 text-muted-foreground hidden sm:block" />
                ) : (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{item.step}</span>
                    <span>{item.icon} {item.label}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
