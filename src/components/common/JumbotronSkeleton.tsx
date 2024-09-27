import { Skeleton } from "@/components/ui/skeleton";

export const JumbotronSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
      <Skeleton className="h-4 w-full max-w-xl mx-auto" />
      <div className="flex justify-center space-x-4 mt-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};
