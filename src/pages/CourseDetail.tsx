import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, PlayCircle, Lock, Clock, Users, Star } from "lucide-react";

const courseData: Record<string, { title: string; desc: string; modules: { title: string; duration: string; locked: boolean }[] }> = {
  sde: {
    title: "Software Development Interview",
    desc: "Complete preparation for SDE roles at top MNCs including DSA, system design, and behavioral questions.",
    modules: [
      { title: "Introduction to Technical Interviews", duration: "15 min", locked: false },
      { title: "Tell Me About Yourself – SDE Edition", duration: "20 min", locked: false },
      { title: "Data Structures & Algorithms Discussion", duration: "30 min", locked: false },
      { title: "System Design Basics", duration: "25 min", locked: true },
      { title: "Behavioral Questions for SDE", duration: "20 min", locked: true },
      { title: "Mock Interview Simulation", duration: "45 min", locked: true },
    ],
  },
};

const fallback = {
  title: "Course",
  desc: "Detailed course content with structured modules.",
  modules: [
    { title: "Module 1: Introduction", duration: "15 min", locked: false },
    { title: "Module 2: Core Concepts", duration: "25 min", locked: false },
    { title: "Module 3: Advanced Topics", duration: "30 min", locked: true },
    { title: "Module 4: Practice Session", duration: "40 min", locked: true },
  ],
};

const CourseDetail = () => {
  const { id } = useParams();
  const course = courseData[id || ""] || fallback;

  return (
    <DashboardLayout title={course.title} showBack>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-2xl bg-gradient-hero p-8 text-primary-foreground mb-8">
            <h1 className="text-2xl font-display font-bold mb-2">{course.title}</h1>
            <p className="text-primary-foreground/80 mb-4">{course.desc}</p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.modules.length} modules</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> 12K+ enrolled</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4" /> 4.8 rating</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm text-muted-foreground">33%</span>
            </div>
            <Progress value={33} className="h-2" />
          </div>

          <div className="space-y-3">
            {course.modules.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center justify-between p-4 rounded-xl border ${m.locked ? "border-border opacity-60" : "border-primary/20 bg-primary/5"}`}
              >
                <div className="flex items-center gap-3">
                  {m.locked ? <Lock className="h-5 w-5 text-muted-foreground" /> : i < 2 ? <CheckCircle className="h-5 w-5 text-success" /> : <PlayCircle className="h-5 w-5 text-primary" />}
                  <div>
                    <p className="text-sm font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.duration}</p>
                  </div>
                </div>
                {!m.locked && (
                  <Button size="sm" variant="ghost" className="rounded-xl text-primary">
                    {i < 2 ? "Review" : "Start"}
                  </Button>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" className="rounded-xl bg-gradient-hero hover:opacity-90">
              Enroll & Continue Learning
            </Button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetail;
