import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";

const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MockInterview = lazy(() => import("./pages/MockInterview"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const Quiz = lazy(() => import("./pages/Quiz"));
const QuizAnalytics = lazy(() => import("./pages/QuizAnalytics"));
const Reports = lazy(() => import("./pages/Reports"));
const AIMentor = lazy(() => import("./pages/AIMentor"));
const Profile = lazy(() => import("./pages/Profile"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const GovExams = lazy(() => import("./pages/GovExams"));
const Blog = lazy(() => import("./pages/Blog"));
const InterviewResult = lazy(() => import("./pages/InterviewResult"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/interview" element={<MockInterview />} />
                <Route path="/interview/result" element={<InterviewResult />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/quiz/:id" element={<Quiz />} />
                <Route path="/quiz-analytics" element={<QuizAnalytics />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/ai-mentor" element={<AIMentor />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/gov-exams" element={<GovExams />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </HashRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
