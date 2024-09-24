import { ReactNode } from "react";
import classNames from "classnames";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "label";

interface TypographyProps {
  as?: keyof JSX.IntrinsicElements;
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: "ui-text-5xl ui-pb-12 ui-text-custom-header-dark-green",
  h2: "ui-text-4xl ui-pb-10 ui-text-custom-header-dark-green",
  h3: "ui-text-3xl ui-pb-8 ui-text-custom-header-dark-green",
  h4: "ui-text-2xl ui-pb-6 ui-text-custom-header-dark-green",
  h5: "ui-mb-3 ui-text-2xl ui-font-semibold ui-text-custom-header-dark-green",
  h6: "ui-text-xl ui-pb-4 ui-text-custom-header-dark-green",
  p: "ui-text-base ui-mb-4 ui-text-gray-700",
  small: "ui-text-sm ui-text-gray-600",
  label: "ui-text-sm ui-font-medium ui-text-gray-700",
};

const defaultElementMap: Record<
  TypographyVariant,
  keyof JSX.IntrinsicElements
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  small: "small",
  label: "label",
};

const Typography = ({
  as,
  variant,
  children,
  className = "",
}: TypographyProps) => {
  const Tag = as || defaultElementMap[variant];

  return (
    <Tag className={classNames(className, variantClasses[variant])}>
      {children}
    </Tag>
  );
};

export { Typography };
