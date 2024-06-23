import { PageProps, Service } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import FileUploader from "@/Components/FileUploader";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { storage } from "@/Firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import InputError from "@/Components/InputError";

type AddServiceProps = PageProps & {
    services: Service[];
}

type ServiceInput = {
    service_name: string
    service_description: string
    service_image: File | null
    service_icon: File | null
}

const AddService = ({ auth }: AddServiceProps) => {

    const [previewImage, setPreviewImage] = useState<File | null>(null)
    const [previewIcon, setPreviewIcon] = useState<File | null>(null)

    const { data, setData, post, processing, errors } = useForm<ServiceInput>({
        'service_name': '',
        'service_description': '',
        'service_image': null,
        'service_icon': null
    })

    const onSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        post('/admin/add-service', {
            preserveScroll: true
        })
    }

    useEffect(() => {
        setData('service_image', previewImage)
    }, [previewImage])

    useEffect(() => {
        setData('service_icon', previewIcon)
    }, [previewIcon])

    return (
        <AdminLayout user={auth.user} header="Add Service">
            <form className="flex flex-col" onSubmit={onSubmit}>
                <div className="flex flex-col gap-4 bg-white border border-gray-100 p-6 shadow-sm">
                    <p className="text-2xl font-semibold">Service Details</p>
                    <div>
                        <p className="font-medium">Service Name</p>
                        <Input
                            className="bg-white border-gray-300 border mt-2 p-4"
                            onChange={e => setData('service_name', e.target.value)}
                        />
                        <InputError message={errors.service_name} className="mt-2" />
                    </div>
                    <div>
                        <p className="font-medium">Service Description</p>
                        <Textarea
                            className="bg-white border-gray-300 border mt-2 p-4 h-48"
                            onChange={e => setData('service_description', e.target.value)}
                        />
                        <InputError message={errors.service_description} className="mt-2" />
                    </div>
                </div>
                <br />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="flex flex-col gap-4 bg-white border border-gray-100 p-6 shadow-sm">
                        <p className="text-2xl font-semibold">Service Image</p>
                        <div className="bg-darkGray w-full md:h-56">
                            <img src={previewImage ? URL.createObjectURL(previewImage) : 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fimage-placeholder-350x350-1.png?alt=media&token=a0e05a7b-a579-44c9-a115-a027372f5836'} className="w-full h-full object-cover" />
                        </div>
                        <FileUploader
                            setPreviewImage={setPreviewImage}
                            message="Upload image"
                        />
                        <InputError message={errors.service_image} />
                    </div>
                    <div className="flex flex-col gap-4 items-center bg-white border border-gray-100 p-6 shadow-sm">
                        <p className="text-2xl font-semibold  w-full">Service Icon</p>
                        <div className=" md:min-w-56 max-w-[50%] md:h-56">
                            <img src={previewIcon ? URL.createObjectURL(previewIcon) : 'https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fimage-placeholder-350x350-1.png?alt=media&token=a0e05a7b-a579-44c9-a115-a027372f5836'} className="w-full h-full object-cover" />
                        </div>
                        <FileUploader
                            setPreviewImage={setPreviewIcon}
                            message="Upload icon"
                        />
                        <InputError className="w-full" message={errors.service_icon} />
                    </div>
                </div>
                <br />
                <Button type="submit" variant='secondary' className="w-full lg:col-span-3">
                    Add Service
                </Button>
            </form>
        </AdminLayout>
    );
}

export default AddService;
