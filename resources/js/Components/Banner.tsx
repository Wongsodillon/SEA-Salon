
type BannerProps = {
    title: string;
    image_url: string;
}

const Banner = ({ title, image_url }: BannerProps) => {
    return (
        <section className="relative z-10 block py-40">
            <div className="-z-10 md:min-h-[10rem] absolute inset-0 brightness-[80%]">
                <img src={image_url} className="w-full h-full object-cover" />
            </div>
            <div className="animate-reveal">
                <p className="text-white text-center text-3xl font-semibold z-50">{title}</p>
            </div>
        </section>
    );
}

export default Banner;
