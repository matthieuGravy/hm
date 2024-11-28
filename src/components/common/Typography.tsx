import { cn } from "@/lib/utils";
import { TypographyVariant, TypographyProps } from "@/types/common";

// record est un type générique qui est utilisé pour représenter une collection d'éléments clés-valeurs de type T.
// Le type Record<K, T> est un type générique qui représente un objet JavaScript standard avec des clés de type K et des valeurs de type T.
// K est le type des clés et t le type des valeurs

// objet qui mappe les variantes de typographie à des classes CSS
const variantClasses: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  small: "text-sm font-medium leading-none",
  label:
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
};

// objet qui mappe les variantes de typographie à des éléments HTML
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

// composant de typographie
const Typography = ({
  as,
  variant,
  children,
  className = "",
}: TypographyProps) => {
  const Tag = as || defaultElementMap[variant];

  return (
    <Tag className={cn(variantClasses[variant], className)}>{children}</Tag>
  );
};

export { Typography };
