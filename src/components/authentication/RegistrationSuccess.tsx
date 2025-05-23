import React from "react";
import { useTranslation } from "react-i18next";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui";

const RegistrationSuccess: React.FC = () => {
  const { t } = useTranslation();

  return (
    <CardHeader>
      <CardTitle>{t("registrationSuccess.cardTitle")}</CardTitle>
      <CardDescription>
        {t("registrationSuccess.cardDescription")}
      </CardDescription>
    </CardHeader>
  );
};

export default RegistrationSuccess;
