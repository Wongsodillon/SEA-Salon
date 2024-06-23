import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type Service = {
    id: number;
    service_name: string;
    service_description: string;
    service_image: string;
    service_icon: string;
    created_at: string;
    updated_at: string;
    branches: Branch[];
};

export type ServiceDetails = {
    service_id: number;
    branch_id: number;
    price: number;
    duration: number;
    created_at: string;
    updated_at: string;
    service: Service;
}

export type ServiceOption = {
    service_id: number;
    service_name: string;
    price: number;
    duration: number;
    checked: DropdownMenuCheckboxItemProps["checked"];
}

export type Branch = {
    id: number;
    branch_name: string;
    branch_street: string;
    branch_city: string;
    branch_province: string;
    branch_phone: string;
    branch_image: string;
    opening_time: string;
    closing_time: string;
    created_at: string;
    updated_at: string;
    service_details: ServiceDetails[];
};

export type Reservation = {
    id: number;
    branch_id: number;
    service_id: number;
    full_name: string;
    phone_number: string;
    reservation_date: string;
    reservation_hour: string;
    created_at: string;
    updated_at: string;
    branch: Branch;
    service: Service;
};

export type Review = {
    id: number;
    user_id: number;
    full_name: string;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
}
