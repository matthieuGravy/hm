import { ReactNode } from "react";
import { Theme } from "./context";

export interface ErrorComponentProps {
  message: string;
}

export interface JumbotronProps {
  title: string;
  paragraph: string;
  children?: React.ReactNode;
  backgroundImage?: string;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "label";

export interface TypographyProps {
  as?: keyof JSX.IntrinsicElements;
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
}
