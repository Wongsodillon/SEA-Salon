import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function SidebarButton({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center p-2 gap-2 text-gray-200 cursor-pointer duration-200 ease-linear rounded-md hover:bg-red-200/70 ' +
                (active
                    ? 'bg-red-200/70'
                    : ' ') +
                className
            }
        >
            {children}
        </Link>
    );
}
