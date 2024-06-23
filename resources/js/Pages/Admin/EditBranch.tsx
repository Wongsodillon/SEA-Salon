import { Branch, Service, PageProps, ServiceOption } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { FormEventHandler, useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import FileUploader from "@/Components/FileUploader";
import { useForm } from "@inertiajs/react";
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
import InputError from "@/Components/InputError";

type EditBranchProps = PageProps & {
    branch: Branch;
    services: Service[];
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

const EditBranch = ({ auth, branch, services }: EditBranchProps) => {
    return (
        <AdminLayout user={auth.user} header="Edit Branch">
            <form className="grid gap-4 md:grid-cols[1fr_40rem] lg:grid-cols-3 lg:gap-8">
                <div className="">

                </div>
            </form>
        </AdminLayout>
    );
}

export default EditBranch;
