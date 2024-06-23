import { Skeleton } from "./ui/skeleton";

const BranchSkeleton = ({ count = 4 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-2 xl:gap-8">
            {Array.from({length: 4}).map((_, i) => (
                <div className="flex flex-col gap-4" key={i}>
                    <Skeleton className="w-full h-48" />
                    <Skeleton className="w-3/4 h-4" />
                    <Skeleton className="w-1/2 h-4" />
                </div>
            ))}
        </div>
    );
}

export default BranchSkeleton;
