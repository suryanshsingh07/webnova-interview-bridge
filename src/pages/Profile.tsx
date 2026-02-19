import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, Save } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const { t } = useLanguage();

  const skills = ["JavaScript", "React", "Node.js", "Python", "SQL"];

  return (
    <DashboardLayout titleKey="profile.title" showBack>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Avatar */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground text-3xl font-display font-bold">
                {user?.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card border border-border shadow-sm flex items-center justify-center">
                <Camera className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{user?.email}</p>
          </div>

          {/* Form */}
          <div className="glass-card shadow-card rounded-2xl p-6 space-y-5 mb-6">
            <h3 className="font-display font-semibold">{t("profile.personalInfo")}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{t("profile.fullName")}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("auth.yourName")} className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label>{t("profile.city")}</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Lucknow" className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label>{t("profile.targetRole")}</Label>
                <Input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. Software Developer" className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label>{t("profile.email")}</Label>
                <Input value={user?.email || ""} disabled className="rounded-xl opacity-60" />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card shadow-card rounded-2xl p-6 mb-6">
            <h3 className="font-display font-semibold mb-3">{t("profile.skillTags")}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{s}</span>
              ))}
              <button className="px-3 py-1.5 rounded-full border border-dashed border-border text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                {t("profile.addSkill")}
              </button>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="glass-card shadow-card rounded-2xl p-6 mb-6">
            <h3 className="font-display font-semibold mb-3">{t("profile.resume")}</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{t("profile.dragDrop")}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("profile.fileLimit")}</p>
            </div>
          </div>

          <Button className="w-full rounded-xl bg-gradient-hero hover:opacity-90 py-5">
            <Save className="h-4 w-4 mr-2" /> {t("profile.saveChanges")}
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
