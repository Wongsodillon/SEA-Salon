import AdminLayout from "@/Layouts/AdminLayout";
import { Branch, PageProps, Service, ServiceOption } from "@/types";
import { Input } from "@/Components/ui/input";
import { CirclePlus } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { FormEventHandler, useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import FileUploader from "@/Components/FileUploader";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

type AddBranchProps = PageProps & {
    services: Service[];
    branch?: Branch;
}

type BranchInput = {
    branch_name: string;
    branch_phone: string;
    opening_time: string;
    closing_time: string;
    branch_street: string;
    branch_city: string;
    branch_province: string;
    branch_image: File | null;
    services: ServiceOption[];
}

const AddBranch = ({ auth, services, branch }: AddBranchProps) => {

    const context = branch ? 'Edit' : 'Add';

    const [options, setOptions] = useState<ServiceOption[]>(() =>
        services.map(s => ({
            service_id: s.id,
            service_name: s.service_name,
            price: 100000,
            duration: 1,
            checked: branch ? branch.service_details.some(sd => sd.service_id === s.id) : false
        }))
    );
    const [selectedServices, setSelectedServices] = useState<ServiceOption[]>(branch ? branch.service_details.map(sd => ({
            service_id: sd.service_id,
            service_name: sd.service.service_name,
            price: sd.price,
            duration: sd.duration,
            checked: true
        })) : []
    );
    const [previewImage, setPreviewImage] = useState<File | null>(null)

    const handleSelect = (service: ServiceOption) => {
        const index = selectedServices.findIndex(s => s.service_id === service.service_id);
        if (index === -1) {
            setSelectedServices(prev => [...prev, service]);
        } else {
            setSelectedServices(prev => prev.filter(s => s.service_id !== service.service_id));
        }
        setOptions(prevOptions =>
            prevOptions.map(opt =>
                opt.service_id === service.service_id ? { ...opt, checked: !opt.checked } : opt
            )
        );
    };

    const handlePriceChange = (service_id: number, newPrice: number) => {
        setSelectedServices(prev =>
            prev.map(service =>
                service.service_id === service_id ? { ...service, price: newPrice } : service
            )
        );
    };

    const handleDurationChange = (service_id: number, newDuration: number) => {
        setSelectedServices(prev =>
            prev.map(service =>
                service.service_id === service_id ? { ...service, duration: newDuration } : service
            )
        );
    };

    const { data, setData, processing, post, errors, patch } = useForm<BranchInput>({
        branch_name: branch ? branch.branch_name : '',
        branch_phone: branch ? branch.branch_phone : '',
        opening_time: branch ? branch.opening_time : '',
        closing_time: branch ? branch.closing_time : '',
        branch_street: branch ? branch.branch_street : '',
        branch_city: branch ? branch.branch_city : '',
        branch_province: branch ? branch.branch_province : '',
        branch_image: null,
        services: selectedServices
    });

    const getImage = () => {
        if (previewImage) {
            return URL.createObjectURL(previewImage);
        }
        else if (branch) {
            return branch.branch_image;
        }
        else {
            return 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fimage-placeholder-350x350-1.png?alt=media&token=a0e05a7b-a579-44c9-a115-a027372f5836'
        }
    }

    useEffect(() => {
        setData('services', selectedServices)
    }, [selectedServices])

    useEffect(() => console.log(data), [data])

    useEffect(() => {
        setData('branch_image', previewImage)
    }, [previewImage])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(data)
        if (!branch) {
            post('/admin/add-branch');
        }
        else {
            post(`/admin/edit-branch/${branch.id}`)
        }
    }

    return (
        <AdminLayout user={auth.user} header={`${context} Branch`}>
            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols[1fr_40rem] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <div className="flex flex-col gap-4 bg-white border border-gray-100 p-6 shadow-sm">
                        <p className="text-2xl font-semibold">Branch Details</p>
                        <div>
                            <p className="font-medium">Branch Name</p>
                            <Input
                                className="bg-white border-gray-300 border mt-2 p-4"
                                value={data.branch_name}
                                onChange={e => setData('branch_name', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.branch_name} />
                        </div>
                        <div>
                            <p className="font-medium">Branch Phone</p>
                            <Input
                                className="bg-white border-gray-300 border mt-2 p-4"
                                value={data.branch_phone}
                                type="number"
                                onChange={e => setData('branch_phone', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.branch_phone} />
                        </div>
                        <div className="flex justify-between gap-12">
                            <div className="w-full">
                                <p className="font-medium">Opening time</p>
                                <Input
                                    value={data.opening_time}
                                    type="time"
                                    className="bg-white border-gray-300 border mt-2 p-4"
                                    onChange={e => setData('opening_time', e.target.value)}
                                    />
                                <InputError className="mt-2" message={errors.opening_time} />
                            </div>
                            <div className="w-full">
                                <p className="font-medium">Closing time</p>
                                <Input
                                    value={data.closing_time}
                                    type="time"
                                    className="bg-white border-gray-300 border mt-2 p-4"
                                    onChange={e => setData('closing_time', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.closing_time} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-start bg-white border border-gray-100 p-6 shadow-sm">
                        <p className="text-2xl font-semibold">Services</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service</TableHead>
                                    <TableHead className="w-60">Price</TableHead>
                                    <TableHead className="w-40">Duration (hours)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selectedServices.map(service => (
                                    <TableRow key={service.service_id}>
                                        <TableCell>{service.service_name}</TableCell>
                                        <TableCell>
                                            <Input
                                                className="bg-white border-gray-300 border p-4"
                                                type="number"
                                                value={service.price}
                                                onChange={e => handlePriceChange(service.service_id, Number(e.target.value))}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                className="bg-white border-gray-300 border p-4"
                                                type="number"
                                                value={service.duration}
                                                onChange={e => handleDurationChange(service.service_id, Number(e.target.value))}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full gap-2 py-6">
                                    <CirclePlus size={20} />
                                    <p>Add Service</p>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                <DropdownMenuLabel>Select Service</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {options.map(option => (
                                    <DropdownMenuCheckboxItem
                                        key={option.service_id}
                                        checked={option.checked}
                                        onCheckedChange={() => handleSelect(option)}
                                    >
                                        {option.service_name}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <InputError className="mt-2" message={errors.services} />
                    </div>
                    <div className="flex flex-col gap-4 bg-white border border-gray-100 p-6 shadow-sm">
                        <p className="text-2xl font-semibold">Branch Location</p>
                        <div>
                            <p className="font-medium">Branch Street</p>
                            <Input
                                value={data.branch_street}
                                onChange={e => setData('branch_street', e.target.value)}
                                className="bg-white border-gray-300 border mt-2 p-4"
                            />
                            <InputError className="mt-2" message={errors.branch_street} />
                        </div>
                        <div>
                            <p className="font-medium">Branch City</p>
                            <Input
                                value={data.branch_city}
                                onChange={e => setData('branch_city', e.target.value)}
                                className="bg-white border-gray-300 border mt-2 p-4"
                            />
                            <InputError className="mt-2" message={errors.branch_city} />
                        </div>
                        <div>
                            <p className="font-medium">Branch Province</p>
                            <Input
                                value={data.branch_province}
                                onChange={e => setData('branch_province', e.target.value)}
                                className="bg-white border-gray-300 border mt-2 p-4"
                            />
                            <InputError className="mt-2" message={errors.branch_province} />
                        </div>
                    </div>

                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Branch Image</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 px-6">
                            <div className="bg-darkGray w-full md:h-56">
                                <img src={getImage()} className="w-full h-full object-cover" />
                            </div>
                        </CardContent>
                        <CardFooter className="p-6 flex-col gap-2">
                            <FileUploader setPreviewImage={setPreviewImage} />
                            <InputError className="mt-2" message={errors.branch_image} />
                        </CardFooter>
                    </Card>
                </div>
                <Button type="submit" variant='secondary' disabled={processing} className="w-full lg:col-span-3">
                    {context} Branch
                </Button>
            </form>
        </AdminLayout>
    );
}

export default AddBranch;
