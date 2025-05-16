export interface LoginUIData {
  cardTitle: string;
  cardDescription: string;
  labelEmail: string;
  labelPassword: string;
  buttonIsSubmitting: string;
  buttonSubmit: string;
  cardFooter: string;
  cardFooterLink: string;
}

export interface LoginFormProps {
  onSwitchToSignUp: () => void;
}
export interface LoginFormContentProps {
  onSwitchToSignUp: () => void;
}

export interface RegisterUIData {
  cardTitle: string;
  cardDescription: string;
  labelName: string;
  labelEmail: string;
  labelPassword: string;
  labelConfirmPassword: string;
  buttonIsSubmitting: string;
  buttonSubmit: string;
  cardFooter: string;
  cardFooterLink: string;
}
export interface User {
  email: string;
}
export interface RegistrationFormProps {
  onSwitchToLogin: () => void;
}

export interface RegistrationFormContentProps {
  onSwitchToLogin: () => void;
}
