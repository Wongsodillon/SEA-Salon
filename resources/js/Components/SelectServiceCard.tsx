import { ServiceDetails } from "@/types";
import { Button } from "./ui/button";

type SelectServiceCardProps = {
    service: ServiceDetails;
    isSelected: boolean | null;
    setSelectedService: (service: ServiceDetails) => void;
}

const SelectServiceCard = ({ service, isSelected, setSelectedService }: SelectServiceCardProps) => {
    return (
        <div className="px-4 py-2 border border-gray-200 rounded-lg flex items-center justify-between" key={service.service_id}>
            <div className="flex items-center">
                <div className="w-24 h-24 overflow-hidden rounded-full p-6">
                    <img src={service.service.service_icon} className='w-full h-full object-contain ' />
                </div>
                <div>
                    <p className="text-lg xl:text-xl font-medium">{service.service.service_name}</p>
                    <p className="text-muted-foreground">Rp. {service.price}</p>
                    <p className="text-muted-foreground">{service.duration} hours each session</p>
                </div>
            </div>
            <Button variant={isSelected ? 'secondary' : 'default'} onClick={() => setSelectedService(service)} className="hover:bg-primary hover:text-white" >{isSelected ? 'Selected' : 'Select'}</Button>
        </div>
    );
}

export default SelectServiceCard;
