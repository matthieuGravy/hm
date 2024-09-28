import { Typography } from "@/components/common";
import { JumbotronProps } from "@/types/common";

export const Jumbotron: React.FC<JumbotronProps> = ({
  title,
  paragraph,
  children,
  backgroundImage,
}) => {
  return (
    <div className="relative bg-background text-foreground overflow-hidden">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Typography as="h1" variant="h3">
            {title}
          </Typography>
          <Typography
            as="p"
            variant="p"
            className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            {paragraph}
          </Typography>
          {children}
        </div>
      </div>
    </div>
  );
};
