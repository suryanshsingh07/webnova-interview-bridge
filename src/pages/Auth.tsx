import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Eye, EyeOff, Check, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: "" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const labels = ["", "Weak", "Fair", "Good", "Strong", "Excellent"];
    return { score, label: labels[score] };
  }, [password]);

  const strengthColor = ["", "bg-destructive", "bg-warning", "bg-warning", "bg-success", "bg-success"];

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back! 🎉");
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to verify. 🚀");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side – illustration / branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute top-6 left-8 flex items-center gap-2 text-primary-foreground font-display font-bold text-lg">
          <Sparkles className="h-5 w-5" />
          Interview Bridge
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-primary-foreground max-w-md"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20">
            <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="2" opacity="0.5" />
              <rect x="36" y="20" width="8" height="30" rx="4" fill="currentColor" opacity="0.8" />
              <path d="M30 52 Q40 62 50 52" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
              <circle cx="40" cy="68" r="3" fill="currentColor" opacity="0.4" />
              <rect x="38" y="60" width="4" height="8" fill="currentColor" opacity="0.4" />
            </svg>
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">
            Turn Your Thoughts into<br />Confident English
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            Practice mock interviews with AI, get grammar coaching in Hindi & English,
            and build the confidence to ace any MNC interview.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6 text-primary-foreground/50 text-xs">
            <span>🔒 Secure & Private</span>
            <span>🤖 AI Powered</span>
            <span>🇮🇳 Hindi Support</span>
          </div>
        </motion.div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Right side – form */}
      <div className="flex-1 flex items-center justify-center bg-background px-4 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md relative"
        >
          <div className="rounded-2xl bg-card shadow-card border border-border/50 p-8">
            {/* Mobile logo */}
            <div className="text-center mb-8">
              <div className="lg:hidden flex justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-2xl font-display font-bold">
                {isLogin ? "Welcome Back!" : "Create Your Account"}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {isLogin ? "Sign in to continue your practice" : "Start building your interview confidence today"}
              </p>
            </div>

            {/* Google sign-in */}
            <Button
              variant="outline"
              className="w-full py-5 rounded-xl mb-4"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </Button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="rounded-xl h-11 transition-all focus:shadow-soft"
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl h-11 transition-all focus:shadow-soft"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="rounded-xl h-11 pr-10 transition-all focus:shadow-soft"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Password strength */}
                {!isLogin && password && (
                  <div className="space-y-1.5 mt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i <= passwordStrength.score ? strengthColor[passwordStrength.score] : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{passwordStrength.label}</p>
                    <div className="space-y-0.5 text-xs">
                      {[
                        { test: password.length >= 8, label: "8+ characters" },
                        { test: /[A-Z]/.test(password), label: "Uppercase letter" },
                        { test: /[0-9]/.test(password), label: "Number" },
                      ].map((r) => (
                        <div key={r.label} className="flex items-center gap-1.5">
                          {r.test ? (
                            <Check className="h-3 w-3 text-success" />
                          ) : (
                            <X className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className={r.test ? "text-success" : "text-muted-foreground"}>{r.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Role selection visual only */}
              {!isLogin && (
                <div className="space-y-1.5">
                  <Label>I am a</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border-2 border-primary bg-primary/5 text-center cursor-pointer">
                      <span className="text-sm font-medium">🎓 Student</span>
                    </div>
                    <div className="p-3 rounded-xl border border-border text-center cursor-pointer opacity-50">
                      <span className="text-sm font-medium">🛡️ Admin</span>
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full py-5 rounded-xl bg-gradient-hero hover:opacity-90" disabled={loading}>
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Powered by <span className="font-semibold text-foreground">WebNova</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
