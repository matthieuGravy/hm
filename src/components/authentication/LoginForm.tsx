import { lazy, Suspense } from "react";
import { LoginFormSkeleton } from "@/components/authentication";
import { LoginFormProps } from "@/types/authentication";
const LazyLoginFormContent = lazy(
  () => import("@/components/authentication/LoginFormContent")
);

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignUp }) => {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LazyLoginFormContent onSwitchToSignUp={onSwitchToSignUp} />
    </Suspense>
  );
};
