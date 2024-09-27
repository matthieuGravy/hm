import { useState, useEffect } from "react";
import {
  Jumbotron,
  JumbotronSkeleton,
  ErrorComponent,
} from "@/components/common/";
import { Button } from "@/components/ui/button";
import { loadJsonData } from "@/utils/loadjsondata";

interface JumbotronData {
  title: string;
  content: string;
  buttonPrimary: string;
  buttonSecondary: string;
}

export const Home: React.FC = () => {
  const [jumbotronData, setJumbotronData] = useState<JumbotronData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadJsonData("home.json");
        setJumbotronData(data.jumbotron as JumbotronData);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <JumbotronSkeleton />;
  if (error) return <ErrorComponent message={error} />;
  if (!jumbotronData) return null;

  return (
    <>
      <Jumbotron title={jumbotronData.title} paragraph={jumbotronData.content}>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <Button size="lg" className="w-full sm:w-auto">
            {jumbotronData.buttonPrimary}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3"
          >
            {jumbotronData.buttonSecondary}
          </Button>
        </div>
      </Jumbotron>
    </>
  );
};
