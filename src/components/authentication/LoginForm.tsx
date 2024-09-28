import { lazy, Suspense } from "react";
import { LoginFormSkeleton } from "./LoginFormSkeleton";

const LazyLoginFormContent = lazy(() => import("./LoginFormContent"));

interface LoginFormProps {
  onSwitchToSignUp?: () => void;
}
export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignUp }) => {
  return;
  <Suspense fallback={<LoginFormSkeleton />}>
    <LoginFormContent onSwitchToSignUp={onSwitchToSignUp} />{" "}
  </Suspense>;
};
