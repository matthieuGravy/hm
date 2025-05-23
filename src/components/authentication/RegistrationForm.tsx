import { lazy, Suspense } from "react";
import { RegistrationFormSkeleton } from "@/components/authentication";
import { RegistrationFormProps } from "@/types/authentication";
import { useAuthStore } from "@/stores/authStore";
import RegistrationSuccess from "@/components/authentication/RegistrationSuccess";

const LazyRegistrationFormContent = lazy(
  () => import("@/components/authentication/RegistrationFormContent")
);

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSwitchToLogin,
}) => {
  const isRegistrationSuccess = useAuthStore(
    (state) => state.isRegistrationSuccess
  );

  return (
    <Suspense fallback={<RegistrationFormSkeleton />}>
      {isRegistrationSuccess ? (
        <RegistrationSuccess />
      ) : (
        <LazyRegistrationFormContent onSwitchToLogin={onSwitchToLogin} />
      )}
    </Suspense>
  );
};
