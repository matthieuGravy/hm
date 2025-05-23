import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      title={
        i18n.language === "fr" ? "Switch to English" : "Passer en français"
      }
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">
        {i18n.language === "fr" ? "Switch to English" : "Passer en français"}
      </span>
    </Button>
  );
};
