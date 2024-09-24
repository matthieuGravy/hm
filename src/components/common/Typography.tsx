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
  h1: "text-5xl ui-pb-12",
  h2: "text-4xl ui-pb-10 ",
  h3: "text-3xl ui-pb-8 ",
  h4: "text-2xl ui-pb-6 ",
  h5: "mb-3 ui-text-2xl ui-font-semibold ",
  h6: "text-xl ui-pb-4 ",
  p: "text-base ui-mb-4 text-gray-700",
  small: "text-sm text-gray-600",
  label: "text-sm font-medium ui-text-gray-700",
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
