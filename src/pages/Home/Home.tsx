import { useTranslation } from "react-i18next";
import { Jumbotron } from "@/components/common/";
import { Button } from "@/components/ui/button";

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Jumbotron
        title={t("home.jumbotron.title")}
        paragraph={t("home.jumbotron.content")}
      >
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <Button size="lg" className="w-full sm:w-auto">
            {t("home.jumbotron.buttonPrimary")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3"
          >
            {t("home.jumbotron.buttonSecondary")}
          </Button>
        </div>
      </Jumbotron>
    </>
  );
};
