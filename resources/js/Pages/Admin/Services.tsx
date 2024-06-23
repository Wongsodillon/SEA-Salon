import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps, Service } from "@/types";

type ServicesProps = PageProps & {
    services: Service[];
}

const Services = ({ auth, services }: ServicesProps) => {

    console.log(services)

    return (
        <AdminLayout user={auth.user} header="Services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map(service => (
                    <div key={service.id} className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
                        <h3 className="text-xl font-bold mb-4">{service.service_name}</h3>
                        <img src={service.service_image} alt={service.service_name} className="w-full rounded-md h-48 object-cover"/>
                        <div className="mt-4">
                            <p className="text-xl font-semibold">Available in: </p>
                            {service.branches.map(branch => (
                                <p key={branch.id} className="pl-2"> - {branch.branch_name}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}

export default Services;
