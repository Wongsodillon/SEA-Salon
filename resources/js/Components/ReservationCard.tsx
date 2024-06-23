import { Reservation } from "@/types";
import { Button } from "./ui/button";

type ReservationCardProps = {
    reservation: Reservation;
    upcoming?: boolean;
    onCancel?: (reservation: Reservation) => void;
}

const ReservationCard = ({ reservation, upcoming = true, onCancel }: ReservationCardProps) => {
    return (
        <div key={reservation.id} className="bg-white flex flex-col sm:flex-row border shadow-md border-gray-100 rounded-lg overflow-hidden">
            <div className="relative w-full max-h-56 sm:max-h-full min-w-24 md:max-w-72 lg:max-w-80">
                <img src={reservation.branch.branch_image} alt={reservation.branch.branch_name} className="w-full max-h-56 sm:min-h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                        <p className="text-xl font-bold">{reservation.branch.branch_name}</p>
                        <p className="text-lg">{reservation.branch.branch_city}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col justify-between items-end w-full">
                <div className="w-full">
                    <div className="flex items-center mb-2">
                        <img src={reservation.service.service_icon} alt={`${reservation.service.service_name} icon`} className="w-10 h-10 mr-4" />
                        <div>
                            <p className="text-2xl font-semibold">{reservation.service.service_name}</p>
                        </div>
                    </div>
                    <p className="text-darkGray mb-2 text-sm md:text-md">{reservation.service.service_description}</p>
                    <div className="text-darkGray mb-1 text-md">
                        <span className="font-semibold">Date:</span> {new Date(reservation.reservation_date).toLocaleDateString()}
                    </div>
                    <div className="text-darkGray mb-1 text-md">
                        <span className="font-semibold">Time:</span> {reservation.reservation_hour}
                    </div>
                    <div className="text-darkGray mb-2 text-md">
                        <span className="font-semibold">Contact:</span> {reservation.full_name} - {reservation.phone_number}
                    </div>
                </div>
                {onCancel && <Button className="bg-red-500 text-white py-2 px-4 hover:bg-red-500/70 transition duration-200 border-none" onClick={() => onCancel(reservation)}>
                    CANCEL RESERVATION
                </Button>}
            </div>
        </div>
    );
}

export default ReservationCard;
