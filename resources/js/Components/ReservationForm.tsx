import { Input } from "./ui/input";
import { useForm } from "@inertiajs/react";
import DatePicker from "./DatePicker";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { useState, useEffect, FormEvent, FormEventHandler } from "react";
import { Branch, Service, ServiceDetails } from "@/types";
import { Button } from "./ui/button";
import InputError from "./InputError";
import Modal from "./Modal";
import { router } from "@inertiajs/react";

type ReservationFormProps = {
    selectedBranch: Branch | null;
    selectedService: ServiceDetails | null;
}

type FormData = {
    branch_id: number;
    service_id: number;
    full_name: string;
    phone_number: string;
    reservation_date: Date | undefined;
    reservation_hour: string;
}

const ReservationForm = ({ selectedBranch, selectedService }: ReservationFormProps) => {

    const [availableHours, setAvailableHours] = useState<string[]>([])
    const [successModal, setSuccessModal] = useState(false)

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data, setData, post, errors, processing } = useForm({
        branch_id: selectedBranch?.id,
        service_id: selectedService?.service_id,
        full_name: '',
        phone_number: '',
        reservation_date: tomorrow,
        reservation_hour: ''
    })

    function getAvailableHours(duration: number, branch:Branch): string[] {
        const result: string[] = []
        const halfHourMs = 30 * 60 * 1000
        const durationMs = duration * 60 * 60 * 1000

        const openingTime = new Date(`1970-01-01T${branch.opening_time}Z`)
        const closingTime = new Date(`1970-01-01T${branch.closing_time}Z`)


        let currentTime = openingTime.getTime()
        while (currentTime + durationMs <= closingTime.getTime()) {
            result.push(new Date(currentTime).toISOString().substring(11, 16))
            currentTime += halfHourMs
        }

        return result
    }

    useEffect(() => {
        if (selectedService && selectedBranch) {
            setAvailableHours(getAvailableHours(selectedService.duration, selectedBranch))
        }
    }, [selectedService, data.reservation_date])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post('/make-reservation', {
            preserveScroll: true,
            onSuccess: () => {
                setSuccessModal(true)
            }
        });
    };

    useEffect(() => {
        setData('service_id', selectedService?.service_id)
    }, [selectedService])

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(date);
            selectedDate.setHours(0, 0, 0, 0);
            if (selectedDate > today) {
                setData('reservation_date', date);
            }
        }
    }

    useEffect(() => {
        setData('reservation_hour', '');
    }, [availableHours]);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 md:gap-6">
            <p className="text-2xl font-semibold">Enter information</p>
            <div>
                <p className="font-medium">Full-Name</p>
                <Input onChange={e => setData('full_name', e.target.value)} placeholder="John Doe" className="py-8 mt-2" />
                <InputError className='mt-2' message={errors.full_name} />
            </div>
            <div>
                <p className="font-medium">Phone Number</p>
                <Input onChange={e => setData('phone_number', e.target.value)} placeholder="08XXXXXXXXXX" className="py-8 mt-2"  type="number"/>
                <InputError className='mt-2' message={errors.phone_number} />
            </div>
            <div>
                <p className="font-medium">Reservation Date</p>
                <DatePicker date={data.reservation_date} setDate={handleDateChange} />
                <InputError className='mt-2' message={errors.reservation_date} />
            </div>
            {selectedService && (
                <div>
                    <p className="font-medium">Reservation Hour </p>
                    <Select value={data.reservation_hour} onValueChange={value => setData('reservation_hour', value)}>
                        <SelectTrigger className="w-full py-8 px-6 border-none bg-[#fcf5f5] mt-2">
                            <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {availableHours.map(hour => (
                                    <SelectItem value={hour} key={hour}>{hour}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError className='mt-2' message={errors.reservation_hour} />
                </div>
            )}
            <InputError message={errors.service_id} />
            <Button disabled={processing} className="w-full py-6 text-lg" variant="default">Make Reservation</Button>
            <Modal closeable={false} show={successModal} onClose={() => setSuccessModal(false)}>
                <div className="p-8 bg-white rounded-lg flex flex-col">
                    <p className="text-2xl font-semibold">Reservation Successful</p>
                    <p className="mt-4">Your reservation has been made successfully. You will receive a confirmation email shortly.</p>
                    <div className="flex gap-4 w-full justify-end">
                        <Button onClick={() => router.visit(`/my-reservations`)} className="py-6 mt-6" variant="secondary">View Reservation</Button>
                    </div>
                </div>
            </Modal>
        </form>
    );
}

export default ReservationForm;
