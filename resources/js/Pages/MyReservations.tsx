import Banner from "@/Components/Banner";
import CancelReservationModal from "@/Components/CancelReservationModal";
import ReservationCard from "@/Components/ReservationCard";
import { Button } from "@/Components/ui/button";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps, Reservation } from "@/types";
import { useState } from "react";

type MyReservationProps = PageProps & {
    upcoming_reservations: Reservation[];
    past_reservations: Reservation[];
}

const MyReservations = ({ auth, upcoming_reservations, past_reservations }: MyReservationProps) => {

    const [showModal, setShowModal] = useState(false)
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

    const onCancel = (res: Reservation) => {
        setSelectedReservation(res)
        setShowModal(true)
    }

    return (
        <MainLayout user={auth.user}>
            <Banner title='My Reservations' image_url='https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fphoto-1580618672591-eb180b1a973f.avif?alt=media&token=d93938da-509e-4dfc-b18c-a98fb148f5c9' />
            <br />
            <br />
            <div className="px-8 lg:px-16 xl:px-24">
                <p className="text-3xl font-medium">Your upcoming reservations</p>
                <br />
                <div className="flex flex-col gap-8">
                    {upcoming_reservations.map(reservation => (
                        <ReservationCard key={reservation.id} reservation={reservation} onCancel={onCancel} />
                    ))}
                </div>
                {upcoming_reservations.length === 0 && <p className="text-lg">You have no upcoming reservations</p>}
                <br />
                <p className="text-3xl font-medium">Your past reservations</p>
                <br />
                <div className="flex flex-col gap-8">
                    {past_reservations.map(reservation => (
                        <ReservationCard key={reservation.id} reservation={reservation} upcoming={false} />
                    ))}
                </div>
                <br />
            </div>
            {selectedReservation && <CancelReservationModal show={showModal} onClose={() => setShowModal(false)} reservation={selectedReservation} />}
        </MainLayout>
    );
}

export default MyReservations;
