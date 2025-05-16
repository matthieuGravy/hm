import React from "react";

interface FormLinkProps {
  type: "loginModal" | "signupModal" | "loginPage" | "signupPage";
  text: string;
  onSwitchToSignUp?: () => void;
  onSwitchToLogin?: () => void;
}

export const FormLink: React.FC<FormLinkProps> = ({
  type,
  text,
  onSwitchToSignUp,
  onSwitchToLogin,
}) => {
  switch (type) {
    case "loginModal":
      return (
        <span
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => onSwitchToSignUp?.()}
        >
          {text}
        </span>
      );
    case "signupModal":
      return (
        <span
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
          onClick={() => onSwitchToLogin?.()}
        >
          {text}
        </span>
      );
    case "loginPage":
      return (
        <a href="/signup" className="text-blue-500 hover:text-blue-700">
          {text}
        </a>
      );
    case "signupPage":
      return (
        <a href="/login" className="text-blue-500 hover:text-blue-700">
          {text}
        </a>
      );
    default:
      return null;
  }
};
