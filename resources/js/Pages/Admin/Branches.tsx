import React from 'react';
import { Branch, PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from '@/Components/ui/button';
import { router } from '@inertiajs/react';

type BranchesProps = PageProps & {
    branches: Branch[];
}

const Branches = ({ auth, branches }: BranchesProps) => {



    return (
        <AdminLayout user={auth.user} header="Branches">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {branches.map(branch => (
                    <div key={branch.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={branch.branch_image} alt={branch.branch_name} className="w-full h-48 object-cover"/>
                        <div className="p-5 flex flex-col justify-between">
                            <h3 className="text-lg font-bold">{branch.branch_name}</h3>
                            <p className="text-sm text-gray-600">{branch.branch_street}, {branch.branch_city}, {branch.branch_province}</p>
                            <p className="text-sm text-gray-600">Phone: {branch.branch_phone}</p>
                            <p className="text-sm text-gray-600">Opening Hours: {branch.opening_time} - {branch.closing_time}</p>
                            <div className="mt-4">
                                <h4 className="text-md font-semibold">Services:</h4>
                                <ul className="list-disc pl-5">
                                    {branch.service_details.map(serviceDetail => (
                                        <li key={serviceDetail.service_id} className="text-sm text-gray-600">
                                            {serviceDetail.service.service_name} - Rp. {serviceDetail.price}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <br />
                            <Button className='min-w-[25%]' variant='secondary' onClick={() => router.visit(`/admin/edit-branch/${branch.id}`)}>
                                Edit
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}

export default Branches;
