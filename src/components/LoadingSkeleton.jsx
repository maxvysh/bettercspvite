import { Skeleton } from "./ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-[1200px]" />
      <Skeleton className="h-4 w-[1100px]" />
      <Skeleton className="h-4 w-[1000px]" />
      <Skeleton className="h-4 w-[900px]" />
      <Skeleton className="h-4 w-[800px]" />
      <Skeleton className="h-4 w-[700px]" />
      <Skeleton className="h-4 w-[600px]" />
      <Skeleton className="h-4 w-[500px]" />
      <Skeleton className="h-4 w-[400px]" />
    </div>
  );
};

export default LoadingSkeleton;
