import { lazy, Suspense } from "react";
import { RegistrationFormSkeleton } from "@/components/authentication";
import { RegistrationFormProps } from "@/types/authentication";
const LazyLoginFormContent = lazy(
  () => import("@/components/authentication/RegistrationFormContent")
);

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSwitchToLogin,
}) => {
  return (
    <Suspense fallback={<RegistrationFormSkeleton />}>
      <LazyLoginFormContent onSwitchToLogin={onSwitchToLogin} />
    </Suspense>
  );
};
