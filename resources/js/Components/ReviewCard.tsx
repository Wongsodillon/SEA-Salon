import Rating from "./Rating";
import { Review } from "@/types";

const ReviewCard = ({ review }: { review: Review }) => {
    return (
        <div className="p-6 md:p-8 shadow-lg max-w-96 bg-white flex flex-col max-h-96 gap-3 h-full w-full md:w-auto">
            <div className="flex justify-between flex-col gap-1">
                <p className="font-semibold text-lg sm:text-xl">{review.full_name}</p>
                <Rating count={review.rating} />
            </div>
            <div className="border-b border-muted-foreground w-full"></div>
            <p className="text-muted-foreground text-md sm:text-lg break-words">
                {review.review}
            </p>
        </div>
    );
}

export default ReviewCard;
