import { FaStar } from 'react-icons/fa';

const Rating = ({ count }: { count: number }) => {


    const buildStars = () => {
        const stars = []
        let i = 0
        if (count) {
            for (i; i < count; i++) {
                stars.push(<FaStar className='text-pastel h-5' key={i} />)
            }
        }
        return stars
    }

    return (
        <div className='flex items-center gap-1'>
            {buildStars()}
        </div>
    );
}

export default Rating;
