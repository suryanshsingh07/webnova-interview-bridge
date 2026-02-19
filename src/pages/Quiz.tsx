import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Brain, Clock, Trophy, ArrowRight, Zap, BookOpen, Calculator,
  MessageSquare, CheckCircle, XCircle, RefreshCw, BarChart3,
  Star, ChevronRight, Target, TrendingUp
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// ── QUESTION BANK ──
const QUESTION_BANK: Record<string, { question: string; options: string[]; answer: number; explanation: string }[]> = {
  logical: [
    { question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies?", options: ["True", "False", "Cannot determine", "Sometimes true"], answer: 0, explanation: "If A→B and B→C, then A→C. This is the transitive property of logic." },
    { question: "Find the next number: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], answer: 1, explanation: "Differences are 4,6,8,10,12. So 30+12=42." },
    { question: "A clock shows 3:15. What is the angle between the hour and minute hand?", options: ["0°", "7.5°", "15°", "22.5°"], answer: 1, explanation: "At 3:15, minute hand is at 90°. Hour hand is at 97.5°. Difference = 7.5°." },
    { question: "If ROAD is coded as 1234, BOAT is coded as 5321, what is TOAD?", options: ["3124", "3214", "3241", "4321"], answer: 1, explanation: "T=3, O=2, A=1, D=4 → TOAD=3214" },
    { question: "A is B's sister. B is C's brother. C is D's father. How is A related to D?", options: ["Mother", "Aunt", "Sister", "Grandmother"], answer: 1, explanation: "A is B's sister. B is D's uncle. So A is D's aunt." },
    { question: "Pointing to a person, Ram said 'He is the son of my father's only son.' How is the person related to Ram?", options: ["Son", "Brother", "Nephew", "Cousin"], answer: 0, explanation: "My father's only son = Ram himself. Son of Ram = his son." },
    { question: "Find the odd one out: 17, 23, 29, 31, 33", options: ["17", "23", "31", "33"], answer: 3, explanation: "33 = 3×11 is not a prime. Others (17, 23, 29, 31) are all prime numbers." },
    { question: "If 6 workers complete a job in 12 days, how long for 9 workers?", options: ["6 days", "8 days", "9 days", "18 days"], answer: 1, explanation: "6×12 = 9×D. D = 72/9 = 8 days." },
  ],
  quant: [
    { question: "What is 15% of 840?", options: ["116", "126", "136", "146"], answer: 1, explanation: "15% of 840 = 0.15 × 840 = 126." },
    { question: "A train travels 360 km in 4 hours. What is its speed?", options: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"], answer: 1, explanation: "Speed = Distance/Time = 360/4 = 90 km/h." },
    { question: "If the ratio of A:B is 3:4 and B:C is 2:3, then A:B:C is?", options: ["3:4:6", "6:8:12", "3:4:5", "6:8:9"], answer: 1, explanation: "A:B = 3:4, B:C = 2:3. Multiply: A:B:C = 6:8:12." },
    { question: "A shopkeeper marks goods 40% above cost and gives 25% discount. Profit %?", options: ["3%", "5%", "7%", "9%"], answer: 1, explanation: "SP = 1.4C × 0.75 = 1.05C. Profit = 5%." },
    { question: "Find the HCF of 36 and 48.", options: ["6", "12", "18", "24"], answer: 1, explanation: "Factors: 36={1,2,3,4,6,9,12,18,36}, 48={1,2,3,4,6,8,12,16,24,48}. HCF=12." },
    { question: "Simple interest on ₹5000 at 8% per annum for 3 years?", options: ["₹1000", "₹1200", "₹1400", "₹1600"], answer: 1, explanation: "SI = P×R×T/100 = 5000×8×3/100 = ₹1200." },
    { question: "If 2x + 3y = 12 and 3x + 2y = 13, what is x?", options: ["2", "3", "4", "5"], answer: 1, explanation: "Solving: subtract equations: -x + y = -1. From first: x = (12-3y)/2. x=3." },
    { question: "A circle has radius 7cm. Its area is? (π=22/7)", options: ["144 cm²", "154 cm²", "164 cm²", "174 cm²"], answer: 1, explanation: "Area = π×r² = (22/7)×49 = 154 cm²." },
  ],
  verbal: [
    { question: "Choose the word most similar in meaning to 'VERBOSE':", options: ["Concise", "Wordy", "Silent", "Brief"], answer: 1, explanation: "Verbose means using more words than needed. Synonym: Wordy." },
    { question: "Identify the error: 'She is more prettier than her sister.'", options: ["She is", "more prettier", "than her", "sister"], answer: 1, explanation: "'More prettier' is redundant. Should be 'prettier' or 'more pretty'." },
    { question: "Fill in: 'He was _____ by his colleagues for his excellent work.'", options: ["criticized", "commended", "ignored", "questioned"], answer: 1, explanation: "The context implies praise — 'commended' (praised formally) fits best." },
    { question: "Choose the antonym of 'BENEVOLENT':", options: ["Kind", "Malevolent", "Generous", "Charitable"], answer: 1, explanation: "Benevolent = well-meaning/kind. Antonym: Malevolent = evil/harmful." },
    { question: "Rearrange: 'the / went / he / market / to' — correct sentence?", options: ["The he went to market", "He went to the market", "He to the market went", "Went he to the market"], answer: 1, explanation: "Standard subject-verb-object: 'He went to the market.'" },
    { question: "Choose the correctly spelled word:", options: ["Accomodation", "Accommodation", "Acomodation", "Acommodation"], answer: 1, explanation: "Correct: Accommodation (two c's, two m's)." },
    { question: "Complete the analogy: Doctor : Hospital :: Teacher : ?", options: ["School", "Book", "Student", "Classroom"], answer: 0, explanation: "A doctor works in a hospital; a teacher works in a school." },
    { question: "Idiom: 'To burn the midnight oil' means:", options: ["To set fire", "To work late", "To waste money", "To sleep early"], answer: 1, explanation: "The idiom means to work or study late into the night." },
  ],
  mock: [
    // Mixes from all
    { question: "If today is Monday, what day is it after 100 days?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 2, explanation: "100 = 14×7 + 2. Monday + 2 = Wednesday." },
    { question: "What is 25% of 25% of 400?", options: ["20", "25", "22", "15"], answer: 1, explanation: "25% of 400 = 100. 25% of 100 = 25." },
    { question: "Synonym of ALACRITY:", options: ["Laziness", "Eagerness", "Sadness", "Anger"], answer: 1, explanation: "Alacrity = brisk and cheerful readiness. Synonym: Eagerness." },
    { question: "A can do work in 10 days, B in 15 days. Together in how many days?", options: ["5", "6", "7", "8"], answer: 1, explanation: "Combined rate = 1/10+1/15 = 5/30=1/6. Days = 6." },
    { question: "Which number comes next: 1, 1, 2, 3, 5, 8, ?", options: ["11", "12", "13", "14"], answer: 2, explanation: "This is Fibonacci: each number = sum of previous two. 5+8=13." },
    { question: "Choose the word that does NOT belong: Apple, Mango, Carrot, Banana", options: ["Apple", "Mango", "Carrot", "Banana"], answer: 2, explanation: "Carrot is a vegetable; others are fruits." },
    { question: "A boat goes 15 km upstream in 3 hours. Still water speed: 7 km/h. Stream speed?", options: ["1 km/h", "2 km/h", "3 km/h", "4 km/h"], answer: 1, explanation: "Upstream speed = 15/3=5. Still-stream=7-5=2 km/h." },
    { question: "Passive voice: 'She writes a letter' →", options: ["A letter is written by her", "A letter was written by her", "A letter will be written by her", "A letter has been written by her"], answer: 0, explanation: "Simple present active → simple present passive: 'A letter is written by her.'" },
    { question: "What is the value of (0.1)³ + (0.2)³ + (0.3)³ − 3(0.1)(0.2)(0.3)?", options: ["0.018", "0.024", "0.032", "0.048"], answer: 1, explanation: "Using a³+b³+c³−3abc = (a+b+c)(a²+b²+c²−ab−bc−ca). Result = 0.024." },
    { question: "Fill: The committee ___ divided in their opinions.", options: ["was", "were", "is", "are"], answer: 1, explanation: "When referring to members acting individually, 'committee' takes plural: 'were'." },
  ],
};

const CATEGORIES = [
  { id: "logical", icon: Brain, title: "Logical Reasoning", desc: "Pattern, series & puzzles", color: "text-primary", bg: "bg-primary/10", questions: 8, time: 10 },
  { id: "quant", icon: Calculator, title: "Quantitative Aptitude", desc: "Math, percentages & ratios", color: "text-accent", bg: "bg-accent/10", questions: 8, time: 10 },
  { id: "verbal", icon: MessageSquare, title: "Verbal Ability", desc: "English grammar & vocab", color: "text-green-500", bg: "bg-green-500/10", questions: 8, time: 10 },
  { id: "mock", icon: Zap, title: "Full Mock Test", desc: "Mixed aptitude – timed", color: "text-yellow-500", bg: "bg-yellow-500/10", questions: 10, time: 15 },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Quiz = () => {
  const [phase, setPhase] = useState<"home" | "test" | "result">("home");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [questions, setQuestions] = useState<typeof QUESTION_BANK.logical>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState<number[]>([]);
  const [qStartTime, setQStartTime] = useState(Date.now());
  const timerRef = useRef<any>(null);

  const cat = CATEGORIES.find((c) => c.id === selectedCat);

  // Timer
  useEffect(() => {
    if (phase !== "test") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          finishTest();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const startTest = (catId: string) => {
    const catDef = CATEGORIES.find((c) => c.id === catId)!;
    const qs = shuffleArray(QUESTION_BANK[catId]).slice(0, catDef.questions).map((q) => ({
      ...q,
      options: shuffleArray(q.options.map((o, i) => ({ label: o, origIdx: i }))).map((o) => o.label),
    }));
    // Re-map answers after shuffle
    const shuffledQs = shuffleArray(QUESTION_BANK[catId]).slice(0, catDef.questions).map((q) => {
      const opts = [...q.options];
      const shuffled = shuffleArray(opts.map((o, i) => ({ o, i })));
      const newAnswer = shuffled.findIndex((s) => s.i === q.answer);
      return { ...q, options: shuffled.map((s) => s.o), answer: newAnswer };
    });
    setQuestions(shuffledQs);
    setSelectedCat(catId);
    setAnswers(new Array(catDef.questions).fill(null));
    setTimeTaken([]);
    setCurrent(0);
    setSelected(null);
    setTimeLeft(catDef.time * 60);
    setTotalTime(catDef.time * 60);
    setQStartTime(Date.now());
    setPhase("test");
  };

  const finishTest = useCallback(() => {
    clearInterval(timerRef.current);
    setPhase("result");
  }, []);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const elapsed = Math.round((Date.now() - qStartTime) / 1000);
    setTimeTaken((prev) => [...prev, elapsed]);
    setAnswers((prev) => { const a = [...prev]; a[current] = idx; return a; });
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        finishTest();
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
        setQStartTime(Date.now());
      }
    }, 1200);
  };

  const results = useMemo(() => {
    if (phase !== "result" || questions.length === 0) return null;
    const correct = questions.filter((q, i) => answers[i] === q.answer).length;
    const wrong = questions.filter((q, i) => answers[i] !== null && answers[i] !== q.answer).length;
    const unattempted = questions.filter((_, i) => answers[i] === null).length;
    const score = Math.round((correct / questions.length) * 100);
    const avgTime = timeTaken.length ? Math.round(timeTaken.reduce((a, b) => a + b, 0) / timeTaken.length) : 0;
    const grade = score >= 90 ? "Outstanding 🏆" : score >= 75 ? "Excellent ⭐" : score >= 60 ? "Good 👍" : score >= 40 ? "Average 📚" : "Needs Practice 💪";
    return { correct, wrong, unattempted, score, avgTime, grade };
  }, [phase, questions, answers, timeTaken]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  // ── HOME SCREEN ──
  if (phase === "home") return (
    <DashboardLayout title="Aptitude & Quiz" showBack>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
              style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>
              <Target className="h-3.5 w-3.5" /> Select a Category & Start Test
            </div>
            <h1 className="text-3xl font-display font-bold mb-2">Aptitude & Quiz Center</h1>
            <p className="text-muted-foreground">Choose a category to begin your timed test. Questions are shuffled every attempt.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl glass-card shadow-card hover:shadow-purple transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                onClick={() => startTest(cat.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center`}>
                    <cat.icon className={`h-6 w-6 ${cat.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">{cat.questions} Qs • {cat.time} min</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-1">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {cat.questions} Questions</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {cat.time} Minutes</span>
                  <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Auto-submit</span>
                </div>
                <Button size="sm" className="w-full rounded-xl bg-gradient-hero hover:opacity-90 group-hover:shadow-glow transition-all">
                  Start Test <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Tips section */}
          <div className="p-6 rounded-2xl glass-card shadow-card">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" /> How It Works
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🔀", title: "Shuffled Questions", desc: "Every test has a different question order — no memorization shortcuts!" },
                { icon: "⏱️", title: "Timed Test", desc: "Real exam pressure with a countdown timer. Test auto-submits when time is up." },
                { icon: "📊", title: "Instant Report", desc: "Get a detailed score report with correct answers and explanations after each test." },
              ].map((t) => (
                <div key={t.title} className="text-center p-4 rounded-xl bg-muted/50">
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <p className="font-semibold text-sm mb-1">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );

  // ── TEST SCREEN ──
  if (phase === "test" && questions.length > 0) {
    const q = questions[current];
    const pct = ((totalTime - timeLeft) / totalTime) * 100;
    const isLowTime = timeLeft < 60;

    return (
      <DashboardLayout title={cat?.title ?? "Quiz"} showBack>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className={`h-2 w-6 rounded-full transition-colors ${i < current ? "bg-green-500" : i === current ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
            <motion.div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm ${isLowTime ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"}`}
              animate={isLowTime ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </motion.div>
          </div>

          <Progress value={pct} className="h-1.5 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <div className="p-6 rounded-2xl glass-card shadow-purple mb-6">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 block">
                  Question {current + 1} of {questions.length} • {cat?.title}
                </span>
                <h2 className="text-lg font-display font-semibold leading-relaxed">{q.question}</h2>
              </div>

              <div className="grid gap-3">
                {q.options.map((opt, i) => {
                  let style = "border-border glass-card hover:border-primary/40 hover:bg-primary/3 cursor-pointer";
                  if (selected !== null) {
                    if (i === q.answer) style = "border-green-500 bg-green-500/10";
                    else if (i === selected) style = "border-red-500 bg-red-500/10";
                    else style = "border-border opacity-50";
                  }
                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all duration-200 ${style}`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm font-medium">{opt}</span>
                      {selected !== null && i === q.answer && <CheckCircle className="h-5 w-5 text-green-500 ml-auto flex-shrink-0" />}
                      {selected !== null && i === selected && i !== q.answer && <XCircle className="h-5 w-5 text-red-500 ml-auto flex-shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>

              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl"
                  style={{ background: "hsl(var(--primary)/0.07)", border: "1px solid hsl(var(--primary)/0.2)" }}
                >
                  <p className="text-sm"><span className="font-semibold text-primary">💡 Explanation:</span> {q.explanation}</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-6">
            <p className="text-xs text-muted-foreground">Question auto-advances after selection</p>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={finishTest}>
              Submit Test
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ── RESULT SCREEN ──
  if (phase === "result" && results) return (
    <DashboardLayout title="Test Report" showBack>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Score hero */}
          <div className="p-8 rounded-3xl bg-gradient-hero text-white text-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-10 w-20 h-20 rounded-full bg-white" />
              <div className="absolute bottom-4 right-10 w-32 h-32 rounded-full bg-white" />
            </div>
            <div className="relative">
              <p className="text-white/80 text-sm mb-2">{cat?.title} Report</p>
              <div className="text-7xl font-display font-bold mb-2">{results.score}%</div>
              <p className="text-xl font-semibold mb-3">{results.grade}</p>
              <div className="flex justify-center gap-4 text-sm text-white/80">
                <span>✅ {results.correct} Correct</span>
                <span>❌ {results.wrong} Wrong</span>
                <span>⏭ {results.unattempted} Skipped</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Score", value: `${results.score}%`, icon: Trophy, color: "text-yellow-500" },
              { label: "Correct", value: results.correct, icon: CheckCircle, color: "text-green-500" },
              { label: "Wrong", value: results.wrong, icon: XCircle, color: "text-red-500" },
              { label: "Avg Time", value: `${results.avgTime}s`, icon: Clock, color: "text-accent" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                className="p-4 rounded-2xl glass-card shadow-card text-center">
                <s.icon className={`h-5 w-5 ${s.color} mx-auto mb-2`} />
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Performance bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl glass-card shadow-card mb-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> Performance Breakdown
            </h3>
            <div className="space-y-3">
              {[
                { label: "Accuracy", value: results.correct > 0 ? Math.round((results.correct / (results.correct + results.wrong)) * 100) : 0, color: "bg-green-500" },
                { label: "Completion", value: Math.round(((results.correct + results.wrong) / questions.length) * 100), color: "bg-primary" },
                { label: "Overall Score", value: results.score, color: "bg-accent" },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{b.label}</span>
                    <span className="font-bold">{b.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <motion.div className={`h-full ${b.color} rounded-full`}
                      initial={{ width: 0 }} animate={{ width: `${b.value}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Question review */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-4 w-4 text-accent" /> Question Review
            </h3>
            <div className="space-y-3">
              {questions.map((q, i) => {
                const userAns = answers[i];
                const isCorrect = userAns === q.answer;
                const isSkipped = userAns === null;
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }}
                    className="p-4 rounded-xl glass-card shadow-card">
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${isSkipped ? "bg-muted text-muted-foreground" : isCorrect ? "bg-green-500/15 text-green-600" : "bg-red-500/15 text-red-600"}`}>
                        {isSkipped ? "–" : isCorrect ? "✓" : "✗"}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-2">Q{i + 1}: {q.question}</p>
                        {!isSkipped && !isCorrect && (
                          <p className="text-xs text-red-500 mb-1">Your answer: {q.options[userAns!]}</p>
                        )}
                        <p className="text-xs text-green-600 font-medium mb-1">✅ Correct: {q.options[q.answer]}</p>
                        <p className="text-xs text-muted-foreground"><span className="font-medium text-primary">Explanation:</span> {q.explanation}</p>
                      </div>
                      <div className="text-xs text-muted-foreground flex-shrink-0">{timeTaken[i] ?? 0}s</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => { setPhase("home"); setSelectedCat(null); }} className="rounded-xl bg-gradient-hero hover:opacity-90">
              <RefreshCw className="h-4 w-4 mr-2" /> Try Another Test
            </Button>
            <Button variant="outline" onClick={() => selectedCat && startTest(selectedCat)} className="rounded-xl">
              <RefreshCw className="h-4 w-4 mr-2" /> Retry Same Category
            </Button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );

  return null;
};

export default Quiz;
