import MainLayout from "@/Layouts/MainLayout"
import { Branch, PageProps, Service, ServiceDetails } from "@/types"
import "../Styles/Home.scss"
import { useEffect, useState } from "react"
import BranchCard from "@/Components/BranchCard"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
 } from "@/Components/ui/select"
import { Skeleton } from "@/Components/ui/skeleton"
import useFetch from "@/Hooks/useFetch"
import SelectServiceCard from "@/Components/SelectServiceCard"
import ReservationForm from "@/Components/ReservationForm"
import BranchList from "@/Components/BranchList"
import useLocation from "@/Hooks/useLocation"
import Banner from "@/Components/Banner"

type Provinces = {
    branch_province: string
}

type MakeReservationProps = PageProps & {
    provinces: Provinces[]
}

const MakeReservation = ({ auth, provinces }: MakeReservationProps) => {

    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
    const { selectedProvince, setSelectedProvince, loading:locationLoading } = useLocation();
    const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null)
    const [services, setServices] = useState<ServiceDetails[] | null>(null)
    const {data:branches, setData: setBranches, loading} = useFetch<Branch[]>(`/branches/${selectedProvince}`)

    useEffect(() => {
        if (selectedBranch) {
            setServices(selectedBranch.service_details)
            setSelectedService(null)
        }
    }, [selectedBranch])

    const isSelected = (service: ServiceDetails) => {
        return selectedService && service.service_id === selectedService.service_id
    }

    useEffect(() => {
        console.log(selectedProvince)
        if (selectedProvince) {
            setBranches(null)
            setSelectedBranch(null)
            setSelectedService(null)
        }
    }, [selectedProvince])

    return (
        <MainLayout user={auth.user}>
            <Banner title='Make Reservation' image_url="https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fpexels-amar-20861921.jpg?alt=media&token=1ce55f37-a7a7-4c12-9c85-5292e2c522fb" />
            <br />
            <br />
            <div className="px-8 lg:px-16 xl:px-24">
                <div className="flex flex-col gap-3 md:flex-row justify-between md:items-center">
                    <p className="text-3xl font-medium">Please select a branch to proceed</p>
                    {!locationLoading &&
                    <Select value={selectedProvince} onValueChange={value => setSelectedProvince(value)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {provinces.map(province => (
                                    <SelectItem value={province.branch_province} key={province.branch_province}>{province.branch_province}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>}
                </div>
                <br />
                {locationLoading && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-2 xl:gap-8">
                        {Array.from({length: 4}).map((_, i) => (
                            <div className="flex flex-col gap-4" key={i}>
                                <Skeleton className="w-full h-48" />
                                <Skeleton className="w-3/4 h-4" />
                                <Skeleton className="w-1/2 h-4" />
                            </div>
                        ))}
                    </div>
                )}
                <BranchList branches={branches} loading={loading} onClick={setSelectedBranch} selectedBrach={selectedBranch} province={selectedProvince} />
                <br />
                <br />
                {selectedBranch && (
                    <>
                        <p className="lg:text-3xl text-2xl font-medium">You have selected {selectedBranch.branch_name}</p>
                        <br />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-4">
                                <p className="text-2xl font-semibold">Select Service</p>
                                {services && (services.map(service => (
                                    <SelectServiceCard service={service} isSelected={isSelected(service)} setSelectedService={setSelectedService} key={service.service_id} />
                                )))}
                            </div>
                            <ReservationForm selectedBranch={selectedBranch} selectedService={selectedService} />
                        </div>
                    </>
                )}
                <br />
                <br />
            </div>
        </MainLayout>
    )
}

export default MakeReservation
