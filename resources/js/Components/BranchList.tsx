import { Branch } from "@/types";
import BranchCard from "./BranchCard";
import BranchSkeleton from "./BranchSkeleton";

type BranchListProps = {
    branches: Branch[] | null;
    selectedBrach: Branch | null;
    loading: boolean;
    province: string;
    onClick: (branch: Branch) => void;
}

const BranchList = ({ branches, loading, onClick, selectedBrach, province }: BranchListProps) => {

    if (loading) {
        return <BranchSkeleton />
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 xl:gap-8">
            {!loading && branches && (
                branches.map(branch => (
                    <BranchCard
                        branch={branch}
                        onClick={() => onClick(branch)}
                        key={branch.id}
                        active={selectedBrach?.id == branch.id}
                    />
                ))
            )}
            {branches && branches.length === 0 && (
                <div className="col-span-2 lg:col-span-4 md:col-span-2 mt-16">
                    <p className="text-muted-foreground text-center text-2xl">No branches available in your location</p>
                </div>
            )}
        </div>
    );
}

export default BranchList;
