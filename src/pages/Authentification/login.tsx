import { LoginForm } from "@/components/authentication";

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <LoginForm onSwitchToSignUp={() => {}} />
    </div>
  );
};
