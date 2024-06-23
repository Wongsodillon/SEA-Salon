import { Reservation } from "@/types";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type CancelReservationModalProps = {
    reservation: Reservation;
    show: boolean;
    onClose: () => void;
}

const CancelReservationModal = ({ show, onClose, reservation }: CancelReservationModalProps) => {

    const { delete:cancel } = useForm({
        reservation_id: reservation.id
    })

    const onSubmit: FormEventHandler = e => {
        e.preventDefault()
        cancel(`/my-reservations/${reservation.id}`, {
            preserveScroll: true,
            onSuccess: onClose
        })
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form className="p-6" onSubmit={onSubmit}>
                <p className="text-2xl font-semibold">Are you sure you want to cancel this reservation?</p>
                <p className="text-lg mt-4">You are about to cancel the reservation at <span className="font-semibold">{reservation.branch.branch_name}</span> on <span className="font-semibold">{new Date(reservation.reservation_date).toLocaleDateString()}</span> at <span className="font-semibold">{reservation.reservation_hour}</span></p>
                <div className="flex gap-4 mt-4 w-full justify-end">
                    <Button type="button" onClick={onClose} className="bg-gray-500 text-white px-8 hover:bg-gray-500/70 transition duration-200 border-none">No</Button>
                    <Button type="submit" className="bg-red-500 text-white px-8 hover:bg-red-500/70 transition duration-200 border-none">Yes</Button>
                </div>
            </form>
        </Modal>
    );
}

export default CancelReservationModal;
