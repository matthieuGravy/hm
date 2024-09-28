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

export interface RegisterUIData {
  cardTitle: string;
  cardDescription: string;
  labelName: string;
  labelEmail: string;
  labelPassword: string;
  buttonIsSubmitting: string;
  buttonSubmit: string;
  cardFooter: string;
  cardFooterLink: string;
}

export interface RegistrationFormProps {
  onSwitchToLogin: () => void;
}
