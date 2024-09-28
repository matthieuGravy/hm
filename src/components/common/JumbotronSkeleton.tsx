import { Skeleton } from "@/components/ui";

export const JumbotronSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4 py-16">
      <Skeleton className="h-10 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex justify-center space-x-4 mt-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};
