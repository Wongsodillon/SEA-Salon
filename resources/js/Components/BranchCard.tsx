import { Branch } from "@/types";

type BranchCardProps = {
    branch: Branch;
    active: boolean;
    onClick: () => void;
}

const BranchCard = ({ branch, active, onClick }: BranchCardProps) => {
    return (
        <div
            className={`flex flex-col items-start gap-1 hover:shadow-lg p-4 transition-shadow duration-500 rounded-sm cursor-pointer ${active ? 'outline outline-2 outline-pastel' : ''}`}
            onClick={onClick}
        >
            <div className="w-full h-48 bg-transparent">
                <img src={branch.branch_image} alt="error" className="sm:block w-full h-full object-cover rounded-md" />
            </div>
            <p className="text-md md:text-lg font-semibold">{branch.branch_name}</p>
            <p className="text-sm md:text-md text-gray-500">{`${branch.branch_street}, ${branch.branch_city}`}</p>
            <p className="text-sm md:text-md text-pastel">{`${branch.opening_time} - ${branch.closing_time}`}</p>
            <p className="text-sm md:text-md text-pastel">{branch.branch_phone}</p>
        </div>
    );
}

export default BranchCard;
