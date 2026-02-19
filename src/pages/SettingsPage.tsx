import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Globe, Shield, Palette, Save } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const SettingsPage = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout titleKey="settings.title" showBack>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <h1 className="text-2xl font-display font-bold">{t("settings.title")}</h1>

          {/* Notifications */}
          <div className="glass-card shadow-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> {t("settings.notifications")}</h3>
            <div className="space-y-4">
              {[
                { label: t("settings.emailNotif"), defaultChecked: true },
                { label: t("settings.pushNotif"), defaultChecked: true },
                { label: t("settings.weeklyReport"), defaultChecked: false },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <Label className="text-sm">{s.label}</Label>
                  <Switch defaultChecked={s.defaultChecked} />
                </div>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="glass-card shadow-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Globe className="h-4 w-4 text-accent" /> {t("settings.langRegion")}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm">{t("settings.hindiDefault")}</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">{t("settings.regionalUI")}</Label>
                <Switch />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="glass-card shadow-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-success" /> {t("settings.privacy")}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm">{t("settings.showLeaderboard")}</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">{t("settings.aiData")}</Label>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="glass-card shadow-card rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Palette className="h-4 w-4 text-warning" /> {t("settings.appearance")}</h3>
            <p className="text-sm text-muted-foreground">{t("settings.themeHint")}</p>
          </div>

          <Button className="w-full rounded-xl bg-gradient-hero hover:opacity-90 py-5">
            <Save className="h-4 w-4 mr-2" /> {t("settings.save")}
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
