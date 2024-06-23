import { PageProps, Reservation } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { FaRegUser, FaStar } from "react-icons/fa";
import { RiReservedLine } from "react-icons/ri";
import { MapPin } from "lucide-react";
import { reservationColumns } from "./Columns";
import { DataTable } from "./DataTable";

type AdminDashboardProps = PageProps & {
    totalReservations: number;
    totalBranches: number;
    totalUsers: number;
    averageRating: number;
    reservations: Reservation[];
}

const AdminDashboard = ({ auth, totalReservations, totalBranches, totalUsers, averageRating, reservations }: AdminDashboardProps) => {

    return (
        <AdminLayout header="Dashboard" user={auth.user}>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <div className="rounded-sm border border-gray-100 sm:block flex items-center gap-8 bg-white py-6 px-8 shadow-md ">
                        <div className="p-5 inline-block bg-[#eff2f7] rounded-full">
                            <FaRegUser size={20} className="text-black" />
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-semibold text-darkGray">{totalUsers}</p>
                            <p className="text-md font-medium text-[#9ea8b6]">Total Users</p>
                        </div>
                    </div>
                    <div className="rounded-sm border border-gray-100 sm:block flex items-center gap-8 bg-white py-6 px-8 shadow-md ">
                        <div className="p-5 inline-block bg-[#eff2f7] rounded-full">
                            <RiReservedLine size={20} className="text-black" />
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-semibold text-darkGray">{totalReservations}</p>
                            <p className="text-md font-medium text-[#9ea8b6]">Total Reservations</p>
                        </div>
                    </div>
                    <div className="rounded-sm border border-gray-100 sm:block flex items-center gap-8 bg-white py-6 px-8 shadow-md ">
                        <div className="p-5 inline-block bg-[#eff2f7] rounded-full">
                            <MapPin size={20} className="text-black" />
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-semibold text-darkGray">{totalBranches}</p>
                            <p className="text-md font-medium text-[#9ea8b6]">Total Branches</p>
                        </div>
                    </div>
                    <div className="rounded-sm border border-gray-100 sm:block flex items-center gap-8 bg-white py-6 px-8 shadow-md ">
                        <div className="p-5 inline-block bg-[#eff2f7] rounded-full">
                            <FaStar size={20} className="text-black" />
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-semibold text-darkGray">{averageRating}</p>
                            <p className="text-md font-medium text-[#9ea8b6]">Average Rating</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 bg-white p-6 border-gray-100 border shadow-md">
                    <p className="text-xl font-semibold">Reservations</p>
                    <DataTable columns={reservationColumns} data={reservations} />
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;
