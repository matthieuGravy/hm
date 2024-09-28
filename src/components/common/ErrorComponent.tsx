import { Alert, AlertDescription, AlertTitle } from "@/components/ui";
import { XCircle } from "lucide-react";
import { ErrorComponentProps } from "@/types/common";

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <Alert variant="destructive" className="max-w-md mx-auto mt-8">
      <XCircle className="h-4 w-4" />
      <AlertTitle className="font-semibold">Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
