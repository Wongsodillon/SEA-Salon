import { Service } from "@/types";


const ServiceCard = ({ service }: { service: Service }) => {
    return (
        <div className='p-14 min-w-[16rem] flex-1 shadow-xl flex flex-col items-center gap-6 hover:outline outline-pastel hover:outline-1 relative'>
            <div className="w-48 h-48 overflow-hidden rounded-full">
                <img src={service.service_image} className='hover:scale-125 w-full h-full duration-500 object-cover' />
            </div>
            <p className='text-xl font-semibold hover:text-pastel text-center transition-colors duration-300'>{service.service_name}</p>
            <p className='text-muted-foreground text-center'>{service.service_description}</p>
        </div>
    );
}

export default ServiceCard;
