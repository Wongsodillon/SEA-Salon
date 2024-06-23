import { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

const Carousel = () => {
    const [current, setCurrent] = useState(0);
    const images = [
        "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fphoto-1633681926035-ec1ac984418a.avif?alt=media&token=fd917834-e337-452a-b172-58976293e57e",
        "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fphoto-1580618672591-eb180b1a973f.avif?alt=media&token=d93938da-509e-4dfc-b18c-a98fb148f5c9",
        "https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fphoto-1629397685944-7073f5589754.avif?alt=media&token=6aa82964-5175-4687-a4f0-183fe5c760b4"
    ];

    const containerRef = useRef<HTMLDivElement>(null);

    const prev = () => {
        setCurrent((prevCurrent) => (prevCurrent === 0 ? images.length - 1 : prevCurrent - 1));
    };

    const next = () => {
        setCurrent((prevCurrent) => (prevCurrent === images.length - 1 ? 0 : prevCurrent + 1));
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(-${current * 100}%)`;
        }
    }, [current]);

    useEffect(() => {
        const interval = setInterval(() => {
            next()
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="overflow-hidden select-none relative">
            <div ref={containerRef} className="flex max-h-[44rem] transition-all duration-1000 ease-out">
                {images.map((img, index) => (
                    <img key={index} src={img} alt="error" className="w-full object-cover min-h-screen md:h-full brightness-75" />
                ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center gap-6 justify-center animate-reveal">
                <p className="font-bold text-2xl sm:text-4xl text-pastel">SEA SALON</p>
                <p className="italic text-2xl sm:text-3xl text-white text-center">Beauty and Elegance Redefined</p>
                <Link href={route('make-reservation')} className="relative z-40">
                    <Button size='xl' variant='white' className="text-xl font-medium">RESERVE NOW</Button>
                </Link>
            </div>
        </div>
    );
};

export default Carousel;
