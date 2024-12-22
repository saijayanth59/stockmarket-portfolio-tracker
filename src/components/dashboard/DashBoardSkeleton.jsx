import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex px-5 gap-5 flex-col">
      <Skeleton className="w-full h-[300px]" />
      <div className="flex gap-5 justify-between items-center">
        <Skeleton className="w-1/3 h-[250px]" />
        <Skeleton className="w-1/3 h-[250px]" />
        <Skeleton className="w-1/3 h-[250px]" />
      </div>
    </div>
  );
}
