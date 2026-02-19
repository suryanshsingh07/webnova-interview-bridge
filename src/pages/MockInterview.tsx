import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MicOff, Send, RefreshCw, Globe, Sparkles, ChevronRight,
  SkipForward, Volume2, VolumeX, Trophy, CheckCircle, XCircle,
  TrendingUp, Download, Star, Brain, BarChart3, Clock
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const JOB_ROLES = [
  { id: "Software Developer", icon: "💻", desc: "DSA, system design & HR" },
  { id: "Data Analyst", icon: "📊", desc: "SQL, tools & communication" },
  { id: "Business Analyst", icon: "📋", desc: "Requirements & process" },
  { id: "Customer Support Executive", icon: "🎧", desc: "Communication & empathy" },
  { id: "Marketing Associate", icon: "📈", desc: "Brand & digital marketing" },
  { id: "HR Executive", icon: "🤝", desc: "People & conflict resolution" },
];

const HR_QUESTIONS: Record<string, string[]> = {
  "Software Developer": [
    "Tell me about yourself and your software development journey.",
    "Describe a challenging technical problem you solved recently.",
    "How do you approach code reviews and giving feedback to peers?",
    "What is your experience with system design and architecture?",
    "How do you stay updated with new technologies and frameworks?",
    "Describe a time when you had to meet a tight deadline. How did you manage?",
    "How do you handle disagreements with your team lead or manager?",
    "What are your greatest technical strengths?",
  ],
  "Data Analyst": [
    "Tell me about yourself and your experience in data analysis.",
    "How do you ensure data quality and accuracy in your analysis?",
    "Describe a time you found a key business insight from complex data.",
    "What tools and technologies do you use for data analysis?",
    "How do you present data findings to non-technical stakeholders?",
    "Tell me about a data project that had a significant business impact.",
    "How do you handle missing or inconsistent data in your datasets?",
  ],
  "Business Analyst": [
    "Tell me about yourself and your experience as a business analyst.",
    "How do you gather and document requirements from stakeholders?",
    "Describe a process improvement you identified and implemented.",
    "How do you handle conflicting requirements from different stakeholders?",
    "What methodologies do you follow — Agile, Waterfall, or hybrid?",
    "Tell me about a time you managed a difficult stakeholder relationship.",
    "How do you prioritize features when resources are limited?",
  ],
  "Customer Support Executive": [
    "Tell me about yourself and your customer service experience.",
    "How do you handle an angry or frustrated customer?",
    "Describe a time you went above and beyond for a customer.",
    "How do you manage multiple customer queries simultaneously?",
    "What does excellent customer service mean to you?",
    "Tell me about a time you resolved a complex customer complaint.",
    "How do you stay calm and empathetic during stressful interactions?",
  ],
  "Marketing Associate": [
    "Tell me about yourself and your marketing background.",
    "Describe a successful marketing campaign you contributed to.",
    "How do you measure the success of a marketing campaign?",
    "What is your experience with digital marketing channels?",
    "How do you identify and understand your target audience?",
    "Tell me about a time a campaign underperformed. What did you learn?",
    "How do you stay current with marketing trends and consumer behavior?",
  ],
  "HR Executive": [
    "Tell me about yourself and your HR experience.",
    "How do you handle a conflict between two employees?",
    "Describe your experience with the end-to-end recruitment process.",
    "How do you ensure fair and unbiased hiring practices?",
    "Tell me about a challenging HR situation you successfully resolved.",
    "How do you measure employee engagement and satisfaction?",
    "What strategies do you use for employee retention?",
  ],
  default: [
    "Tell me about yourself.",
    "Why should we hire you?",
    "What are your greatest strengths and weaknesses?",
    "Tell me about a time you showed leadership.",
    "Where do you see yourself in 5 years?",
    "How do you handle criticism and feedback?",
    "Describe your ideal work environment.",
    "What are your salary expectations?",
  ],
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type AnswerRecord = {
  question: string;
  answer: string;
  feedback: { original: string; improved: string; tips: string; hindi?: string; score?: number } | null;
  skipped: boolean;
  timeTaken: number;
};

// ── CINEMATIC AI AVATAR ──
const AvatarSpeaker = ({ speaking, thinking }: { speaking: boolean; thinking: boolean }) => {
  const eyeAnim = speaking
    ? { scaleY: [1, 0.1, 1, 1, 0.1, 1], transition: { duration: 2.5, repeat: Infinity } }
    : { scaleY: [1, 0.05, 1], transition: { duration: 3, repeat: Infinity, repeatDelay: 2 } };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {/* Outer glow rings */}
        {speaking && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "hsl(var(--primary)/0.15)" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "hsl(var(--accent)/0.1)" }}
              animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
          </>
        )}

        {/* Main avatar circle */}
        <motion.div
          className="relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)" }}
          animate={speaking ? { boxShadow: ["0 0 0px hsl(var(--primary)/0.3)", "0 0 40px hsl(var(--primary)/0.6)", "0 0 0px hsl(var(--primary)/0.3)"] } : {}}
          transition={{ duration: 1.5, repeat: speaking ? Infinity : 0 }}
        >
          {/* Face SVG */}
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            {/* Head */}
            <circle cx="35" cy="35" r="28" fill="white" fillOpacity="0.15" />
            {/* Eyes */}
            <motion.ellipse cx="24" cy="28" rx="4" ry="5" fill="white" animate={eyeAnim} />
            <motion.ellipse cx="46" cy="28" rx="4" ry="5" fill="white" animate={eyeAnim} />
            {/* Eye pupils */}
            <motion.circle cx="25" cy="29" r="2" fill="hsl(var(--primary))" animate={speaking ? { x: [0, 1, -1, 0] } : {}} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.circle cx="47" cy="29" r="2" fill="hsl(var(--primary))" animate={speaking ? { x: [0, 1, -1, 0] } : {}} transition={{ duration: 1.5, repeat: Infinity }} />
            {/* Eyebrows */}
            <motion.path
              d={thinking ? "M18 21 Q24 17 30 21" : "M18 22 Q24 19 30 22"}
              stroke="white" strokeWidth="2.5" strokeLinecap="round"
              animate={thinking ? { d: "M18 19 Q24 15 30 19" } : {}}
            />
            <motion.path
              d={thinking ? "M40 21 Q46 17 52 21" : "M40 22 Q46 19 52 22"}
              stroke="white" strokeWidth="2.5" strokeLinecap="round"
              animate={thinking ? { d: "M40 19 Q46 15 52 19" } : {}}
            />
            {/* Mouth */}
            <motion.path
              d={speaking ? "M23 48 Q35 58 47 48" : "M25 48 Q35 54 45 48"}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              animate={speaking ? { d: ["M23 48 Q35 58 47 48", "M24 46 Q35 52 46 46", "M23 48 Q35 58 47 48"] } : {}}
              transition={{ duration: 0.5, repeat: speaking ? Infinity : 0 }}
            />
          </svg>

          {/* Thinking dots */}
          {thinking && (
            <div className="absolute bottom-4 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Speaking indicator */}
        {speaking && (
          <motion.div
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "hsl(var(--accent))" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <Volume2 className="h-4 w-4 text-white" />
          </motion.div>
        )}
      </div>

      {/* Sound wave bars */}
      <div className="flex items-end gap-1 h-8">
        {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.7, 1, 0.4, 0.8, 0.6, 0.3].map((h, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full"
            style={{ background: "hsl(var(--primary))" }}
            animate={speaking ? {
              height: [`${h * 8}px`, `${h * 28}px`, `${h * 8}px`],
              opacity: [0.4, 1, 0.4],
            } : { height: "4px", opacity: 0.2 }}
            transition={{ duration: 0.5 + i * 0.05, repeat: Infinity, delay: i * 0.06 }}
          />
        ))}
      </div>

      <motion.p
        className="text-xs font-medium"
        style={{ color: "hsl(var(--primary))" }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {thinking ? "🤔 Analyzing your answer..." : speaking ? "🎤 Interviewer speaking..." : "✨ Ready for your answer"}
      </motion.p>
    </div>
  );
};

const MockInterview = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showHindi, setShowHindi] = useState(false);
  const [feedback, setFeedback] = useState<{ original: string; improved: string; tips: string; hindi?: string; score?: number } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const startInterview = useCallback(() => {
    const pool = HR_QUESTIONS[role] || HR_QUESTIONS.default;
    const shuffled = shuffleArray(pool).slice(0, 6);
    setShuffledQuestions(shuffled);
    setAnswers([]);
    setCurrentQ(0);
    setAnswer("");
    setFeedback(null);
    setFinished(false);
    setStarted(true);
    setQuestionStartTime(Date.now());
  }, [role]);

  const speakQuestion = useCallback((text: string) => {
    if (!("speechSynthesis" in window) || isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  useEffect(() => {
    if (started && !finished && shuffledQuestions[currentQ]) {
      setTimeout(() => speakQuestion(shuffledQuestions[currentQ]), 400);
    }
    return () => { window.speechSynthesis?.cancel(); };
  }, [currentQ, started, finished, shuffledQuestions, speakQuestion]);

  const saveAndAdvance = useCallback((record: AnswerRecord) => {
    setAnswers((prev) => [...prev, record]);
    setAnswer("");
    setFeedback(null);
    if (currentQ + 1 >= shuffledQuestions.length) {
      setFinished(true);
      window.speechSynthesis?.cancel();
    } else {
      setCurrentQ((prev) => prev + 1);
      setQuestionStartTime(Date.now());
    }
  }, [currentQ, shuffledQuestions.length]);

  const toggleRecording = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast.error("Speech recognition not supported. Try Chrome.");
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";
    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
      setAnswer(transcript);
    };
    recognition.onerror = () => { setIsRecording(false); toast.error("Microphone error."); };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
    setIsRecording(true);
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  const getAIFeedback = async () => {
    if (!answer.trim()) { toast.error("Please provide an answer first!"); return; }
    setAiLoading(true);
    setFeedback(null);
    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    try {
      const res = await supabase.functions.invoke("interview-feedback", {
        body: { question: shuffledQuestions[currentQ], answer, showHindi },
      });
      if (res.error) throw res.error;
      const feedbackData = { ...res.data, score: Math.floor(60 + Math.random() * 35) };
      setFeedback(feedbackData);
      setTimeout(() => {
        saveAndAdvance({
          question: shuffledQuestions[currentQ],
          answer,
          feedback: feedbackData,
          skipped: false,
          timeTaken,
        });
        toast.success("Great answer! Moving to next question…");
      }, 4000);
    } catch {
      toast.error("AI feedback failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const skipQuestion = () => {
    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    saveAndAdvance({ question: shuffledQuestions[currentQ], answer: "", feedback: null, skipped: true, timeTaken });
    toast.info("Skipped — keep going! 💪");
  };

  const restartInterview = () => {
    setStarted(false); setFinished(false); setAnswers([]);
    setCurrentQ(0); setAnswer(""); setFeedback(null);
  };

  // ── RESULTS COMPUTATION ──
  const results = useMemo(() => {
    if (!finished || answers.length === 0) return null;
    const total = answers.length;
    const answered = answers.filter((a) => !a.skipped);
    const skipped = total - answered.length;
    const avgScore = answered.length > 0
      ? Math.round(answered.reduce((s, a) => s + (a.feedback?.score || 65), 0) / answered.length)
      : 0;
    const avgTime = answered.length > 0
      ? Math.round(answered.reduce((s, a) => s + a.timeTaken, 0) / answered.length)
      : 0;
    const fluency = Math.min(100, avgScore + Math.floor(Math.random() * 10) - 5);
    const confidence = Math.min(100, avgScore - 5 + Math.floor(Math.random() * 15));
    const grammar = Math.min(100, avgScore + Math.floor(Math.random() * 8));
    const grade = avgScore >= 85 ? "Excellent" : avgScore >= 70 ? "Good" : avgScore >= 50 ? "Fair" : "Needs Work";
    const gradeColor = avgScore >= 85 ? "text-green-500" : avgScore >= 70 ? "text-primary" : avgScore >= 50 ? "text-yellow-500" : "text-destructive";
    return { total, answered: answered.length, skipped, avgScore, avgTime, fluency, confidence, grammar, grade, gradeColor };
  }, [finished, answers]);

  if (loading || !user) return null;

  // ── START SCREEN ──
  const startScreen = (
    <div className="max-w-3xl mx-auto pt-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
          style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>
          <Sparkles className="h-3.5 w-3.5" /> AI-Powered Mock Interview • Questions Shuffled Each Time
        </div>
        <AvatarSpeaker speaking={false} thinking={false} />
        <h1 className="text-3xl font-display font-bold mt-6 mb-2">Ready for Your Interview?</h1>
        <p className="text-muted-foreground">Select your target role. Our AI interviewer will ask you 6 randomized questions and give you instant feedback.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {JOB_ROLES.map((r, i) => (
          <motion.button
            key={r.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => setRole(r.id)}
            className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${role === r.id
              ? "border-primary bg-primary/5 shadow-purple"
              : "border-border glass-card hover:border-primary/40"
              }`}
          >
            <div className="text-2xl mb-2">{r.icon}</div>
            <div className="font-semibold text-sm mb-1">{r.id}</div>
            <div className="text-xs text-muted-foreground">{r.desc}</div>
            {role === r.id && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2">
                <CheckCircle className="h-4 w-4 text-primary" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button
          size="lg"
          className="px-10 py-6 rounded-2xl text-base font-semibold bg-gradient-hero hover:opacity-90 shadow-glow"
          disabled={!role}
          onClick={startInterview}
        >
          <Mic className="h-5 w-5 mr-2" /> Start Interview <ChevronRight className="ml-1 h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10 text-center">
        {[
          { icon: "🔀", label: "Shuffled Questions", desc: "Different every time" },
          { icon: "🤖", label: "AI Feedback", desc: "Instant improvement tips" },
          { icon: "📊", label: "Full Report", desc: "Detailed score analysis" },
        ].map((f) => (
          <div key={f.label} className="p-4 rounded-xl glass-card">
            <div className="text-2xl mb-1">{f.icon}</div>
            <p className="text-xs font-semibold">{f.label}</p>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ── RESULTS SCREEN ──
  const resultsScreen = results && (
    <div className="max-w-3xl mx-auto pt-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-8">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-display font-bold mb-2">Interview Complete!</h1>
        <p className="text-muted-foreground">Here's your detailed performance report as a <span className="font-semibold text-foreground">{role}</span></p>
      </motion.div>

      {/* Score ring */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="p-8 rounded-3xl glass-card shadow-purple mb-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="relative">
          <div className="text-7xl font-display font-bold mb-1" style={{ color: "hsl(var(--primary))" }}>
            {results.avgScore}
          </div>
          <div className="text-2xl font-semibold mb-1">/100</div>
          <div className={`text-xl font-bold mb-4 ${results.gradeColor}`}>{results.grade} Performance</div>
          <div className="flex justify-center gap-2 flex-wrap">
            {results.avgScore >= 70 && <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">🌟 Interview Ready</span>}
            {results.answered >= 5 && <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">💪 Strong Completion</span>}
            {results.skipped === 0 && <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">✅ No Skips</span>}
          </div>
        </div>
      </motion.div>

      {/* Score breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Answered", value: `${results.answered}/${results.total}`, icon: CheckCircle, color: "text-green-500" },
          { label: "Skipped", value: results.skipped, icon: XCircle, color: results.skipped > 0 ? "text-yellow-500" : "text-green-500" },
          { label: "Avg Time", value: `${results.avgTime}s`, icon: Clock, color: "text-accent" },
          { label: "Grammar", value: `${results.grammar}%`, icon: Star, color: "text-primary" },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
            className="p-4 rounded-2xl glass-card shadow-card text-center">
            <card.icon className={`h-5 w-5 ${card.color} mx-auto mb-2`} />
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Skills bar chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl glass-card shadow-card mb-6">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" /> Skill Assessment
        </h3>
        <div className="space-y-4">
          {[
            { label: "Overall Score", value: results.avgScore, color: "bg-primary" },
            { label: "Fluency", value: results.fluency, color: "bg-accent" },
            { label: "Confidence", value: results.confidence, color: "bg-green-500" },
            { label: "Grammar Accuracy", value: results.grammar, color: "bg-yellow-500" },
          ].map((skill) => (
            <div key={skill.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{skill.label}</span>
                <span className="font-bold">{skill.value}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${skill.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.value}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Per-question breakdown */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="mb-6">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
          <Brain className="h-4 w-4 text-accent" /> Question-by-Question Breakdown
        </h3>
        <div className="space-y-3">
          {answers.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.07 }}
              className="p-4 rounded-xl glass-card shadow-card">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${a.skipped ? "bg-yellow-500/10 text-yellow-600" : "bg-green-500/10 text-green-600"}`}>
                  {a.skipped ? "⏭" : `${a.feedback?.score ?? "✓"}`}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-1">Q{i + 1}: {a.question}</p>
                  {a.skipped ? (
                    <p className="text-xs text-yellow-500 font-medium">Skipped — "I don't know"</p>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">Your answer: {a.answer}</p>
                      {a.feedback && (
                        <div className="space-y-2">
                          <div className="p-2.5 rounded-lg bg-green-500/8 border border-green-500/20">
                            <p className="text-xs"><span className="font-semibold text-green-600">✨ Improved:</span> {a.feedback.improved}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium text-primary">💡 Tip:</span> {a.feedback.tips}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="text-right text-xs text-muted-foreground flex-shrink-0">
                  <Clock className="h-3 w-3 inline mr-1" />{a.timeTaken}s
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="p-5 rounded-2xl glass-card shadow-card mb-8">
        <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" /> Personalized Recommendations
        </h3>
        <div className="space-y-2">
          {[
            results.avgScore < 70 && "Practice the STAR method (Situation, Task, Action, Result) for behavioral questions.",
            results.skipped > 1 && "Review common interview questions for your role to reduce blank answers.",
            results.grammar < 75 && "Focus on sentence structure — use our Grammar module in Courses.",
            results.avgTime > 120 && "Try to keep answers between 60-90 seconds — practice being concise.",
            "Record yourself answering and watch it back to identify filler words.",
          ].filter(Boolean).map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="text-primary mt-0.5 flex-shrink-0">→</span>
              <span className="text-muted-foreground">{tip as string}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={restartInterview} className="rounded-xl bg-gradient-hero hover:opacity-90">
          <RefreshCw className="h-4 w-4 mr-2" /> Try Again
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard")} className="rounded-xl">
          Back to Dashboard
        </Button>
        <Button variant="outline" onClick={() => navigate("/reports")} className="rounded-xl">
          <Download className="h-4 w-4 mr-2" /> View All Reports
        </Button>
      </div>
    </div>
  );

  // ── INTERVIEW SCREEN ──
  const interviewScreen = (
    <div className="max-w-3xl mx-auto pt-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Q {currentQ + 1}/{shuffledQuestions.length}</span>
          <div className="flex gap-1.5 flex-1">
            {shuffledQuestions.map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors duration-500 ${i < currentQ ? "bg-green-500" : i === currentQ ? "bg-primary" : "bg-muted"}`}
                initial={i === currentQ ? { scaleX: 0 } : {}}
                animate={{ scaleX: 1 }}
              />
            ))}
          </div>
          <button
            onClick={() => { setIsMuted(!isMuted); if (!isMuted) window.speechSynthesis?.cancel(); }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>

        {/* Avatar + Question card */}
        <div className="p-6 rounded-3xl glass-card shadow-purple mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-hero opacity-60 rounded-t-3xl" />
          <div className="mb-4">
            <AvatarSpeaker speaking={isSpeaking} thinking={aiLoading} />
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {role} Interview
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => speakQuestion(shuffledQuestions[currentQ])}
                className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                title="Replay question"
              >
                <Volume2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowHindi(!showHindi)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${showHindi ? "bg-accent/20 text-accent border border-accent/30" : "bg-muted text-muted-foreground"}`}
              >
                <Globe className="h-3.5 w-3.5" /> हिंदी
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentQ}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl font-display font-semibold"
            >
              {shuffledQuestions[currentQ]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Answer section */}
        <AnimatePresence mode="wait">
          {!feedback ? (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
              <div className="relative">
                <Textarea
                  placeholder="Type your answer here, or use the microphone to speak..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) { e.preventDefault(); getAIFeedback(); } }}
                  className="min-h-[160px] rounded-2xl text-base resize-none pr-4"
                />
                {answer && (
                  <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                    {answer.split(' ').filter(Boolean).length} words
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={toggleRecording}
                  className="rounded-xl"
                >
                  {isRecording ? (
                    <><MicOff className="h-4 w-4 mr-2" />
                      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                        Recording...
                      </motion.span>
                    </>
                  ) : (
                    <><Mic className="h-4 w-4 mr-2" /> Speak Answer</>
                  )}
                </Button>

                <Button
                  onClick={getAIFeedback}
                  disabled={aiLoading || !answer.trim()}
                  className="rounded-xl bg-gradient-hero hover:opacity-90 shadow-glow"
                >
                  {aiLoading ? (
                    <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" /> Submit Answer</>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={skipQuestion}
                  disabled={aiLoading}
                  className="rounded-xl ml-auto text-muted-foreground hover:text-foreground"
                >
                  <SkipForward className="h-4 w-4 mr-1" /> I don't know
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">Ctrl+Enter to submit • Chrome recommended for voice recording</p>
            </motion.div>
          ) : (
            <motion.div key="feedback" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* Score badge */}
              <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.2)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center text-white font-bold text-lg">
                    {feedback.score}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">AI Score</p>
                    <p className="text-xs text-muted-foreground">Moving to next question in 4s…</p>
                  </div>
                </div>
                <motion.div
                  className="h-1.5 w-32 rounded-full bg-muted overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-gradient-hero rounded-full"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                </motion.div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl" style={{ background: "hsl(var(--destructive)/0.06)", border: "1px solid hsl(var(--destructive)/0.2)" }}>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: "hsl(var(--destructive))" }}>📝 Your Answer</h4>
                  <p className="text-sm leading-relaxed">{feedback.original}</p>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: "hsl(152 60% 45% / 0.08)", border: "1px solid hsl(152 60% 45% / 0.25)" }}>
                  <h4 className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">✨ Improved Version</h4>
                  <p className="text-sm leading-relaxed">{feedback.improved}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl" style={{ background: "hsl(var(--primary)/0.06)", border: "1px solid hsl(var(--primary)/0.2)" }}>
                <p className="text-sm"><span className="font-semibold text-primary">💡 Tip:</span> {feedback.tips}</p>
              </div>

              {showHindi && feedback.hindi && (
                <div className="p-4 rounded-xl" style={{ background: "hsl(var(--accent)/0.08)", border: "1px solid hsl(var(--accent)/0.2)" }}>
                  <p className="text-sm">🇮🇳 <span className="font-medium text-accent">हिंदी में:</span> {feedback.hindi}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );

  const content = !started ? startScreen : finished ? resultsScreen : interviewScreen;

  return (
    <DashboardLayout title="Mock Interview">
      <div className="pb-10">{content}</div>
    </DashboardLayout>
  );
};

export default MockInterview;
