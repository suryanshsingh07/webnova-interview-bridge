import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
}

const QUICK_PROMPTS = [
  "How to answer 'Tell me about yourself'?",
  "Tips for handling stress interviews",
  "Common HR round mistakes to avoid",
  "How to negotiate salary confidently?",
  "How to explain a job gap in interview?",
  "Best STAR method examples for freshers",
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const AIMentor = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your **AI Interview Mentor** 🎯\n\nI specialize in helping students like you prepare for **MNC interviews**. I can help with:\n- Answering common interview questions\n- Grammar & communication tips\n- Career advice & salary negotiation\n- Mock Q&A practice\n\nWhat would you like to work on today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    const userMsg: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Add a loading placeholder
    setMessages((prev) => [...prev, { role: "assistant", content: "", loading: true }]);

    try {
      const allMessages = [
        ...messages.filter((m) => !m.loading),
        userMsg,
      ].map((m) => ({ role: m.role, content: m.content }));

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/ai-mentor-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        if (resp.status === 429) throw new Error("Rate limit exceeded. Please wait a moment.");
        if (resp.status === 402) throw new Error("AI credits exhausted. Please contact support.");
        throw new Error(err.error || "Failed to get response");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) { done = true; break; }
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const chunk = parsed.choices?.[0]?.delta?.content;
            if (chunk) {
              assistantText += chunk;
              setMessages((prev) => {
                const updated = [...prev];
                const lastIdx = updated.length - 1;
                if (updated[lastIdx]?.role === "assistant") {
                  updated[lastIdx] = { role: "assistant", content: assistantText, loading: false };
                }
                return updated;
              });
            }
          } catch { /* partial json — wait */ }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (const raw of buffer.split("\n")) {
          if (!raw.startsWith("data: ")) continue;
          const json = raw.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const chunk = parsed.choices?.[0]?.delta?.content;
            if (chunk) {
              assistantText += chunk;
              setMessages((prev) => {
                const updated = [...prev];
                const lastIdx = updated.length - 1;
                if (updated[lastIdx]?.role === "assistant") {
                  updated[lastIdx] = { role: "assistant", content: assistantText, loading: false };
                }
                return updated;
              });
            }
          } catch { /* ignore */ }
        }
      }

      if (!assistantText) throw new Error("Empty response from AI");

    } catch (e: any) {
      setMessages((prev) => prev.filter((m) => !m.loading));
      toast.error(e.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: "assistant",
      content: "Chat cleared! I'm ready to help you with your interview preparation. What would you like to practice? 🎯",
    }]);
  };

  return (
    <DashboardLayout titleKey="aiMentor.title" showBack>
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-hero flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-sm">AI Interview Mentor</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Online • Powered by AI
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearChat} className="text-xs rounded-xl">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Clear Chat
          </Button>
        </div>

        {/* Quick prompts */}
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto space-y-4 mb-4 pr-1">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[82%] ${m.role === "user" ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm" : "glass-card shadow-card rounded-2xl rounded-bl-sm"} p-4 text-sm leading-relaxed`}>
                  {m.loading ? (
                    <div className="flex items-center gap-2">
                      {[0, 1, 2].map((j) => (
                        <motion.div
                          key={j}
                          className="w-2 h-2 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: j * 0.12 }}
                        />
                      ))}
                    </div>
                  ) : m.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex gap-3 items-end">
          <Textarea
            ref={textareaRef}
            placeholder={t("aiMentor.placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="rounded-xl resize-none min-h-[48px] max-h-[120px] flex-1"
            rows={1}
            disabled={isLoading}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="rounded-xl bg-gradient-hero hover:opacity-90 h-12 w-12 flex-shrink-0"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">Press Enter to send • Shift+Enter for new line</p>
      </div>
    </DashboardLayout>
  );
};

export default AIMentor;
