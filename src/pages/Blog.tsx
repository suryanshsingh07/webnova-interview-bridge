import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const posts = [
  { title: "10 Common HR Interview Mistakes and How to Avoid Them", excerpt: "Learn the most frequent errors candidates make in HR interviews and practical tips to avoid them.", author: "Interview Bridge Team", date: "Feb 14, 2026", readTime: "5 min", tag: "Interview Tips" },
  { title: "How to Answer 'Tell Me About Yourself' – A Complete Guide", excerpt: "Master the most common interview question with our structured framework and Hindi explanations.", author: "AI Mentor", date: "Feb 12, 2026", readTime: "7 min", tag: "Answer Guide" },
  { title: "Building Confidence for English Interviews: A Hindi Speaker's Guide", excerpt: "Practical strategies for Hindi-medium students to build English communication confidence.", author: "WebNova Team", date: "Feb 10, 2026", readTime: "6 min", tag: "Communication" },
  { title: "STAR Method: The Secret to Behavioral Interview Questions", excerpt: "Learn how to structure compelling stories using the STAR framework for any behavioral question.", author: "Interview Bridge Team", date: "Feb 8, 2026", readTime: "4 min", tag: "Strategy" },
  { title: "Top 20 Questions Asked in TCS, Infosys, and Wipro Interviews", excerpt: "Curated list of most frequently asked questions in top Indian IT companies with model answers.", author: "AI Mentor", date: "Feb 6, 2026", readTime: "8 min", tag: "Company Specific" },
  { title: "Government Interview Preparation: UPSC Personality Test Tips", excerpt: "Expert tips for UPSC Civil Services interview preparation from successful candidates.", author: "WebNova Team", date: "Feb 4, 2026", readTime: "6 min", tag: "Gov. Exams" },
];

const Blog = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-14">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                {t("blog.title1")} <span className="text-gradient">{t("blog.title2")}</span>
              </h1>
              <p className="text-muted-foreground text-lg">{t("blog.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p, i) => (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-purple transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  <div className="h-2 bg-gradient-hero" />
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">{p.tag}</span>
                    <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {p.author}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="py-10 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 Interview Bridge. {t("footer.poweredBy")} <span className="font-semibold text-foreground">WebNova</span></p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
