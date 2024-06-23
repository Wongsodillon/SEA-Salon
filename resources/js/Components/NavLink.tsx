import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'group inline-flex relative items-center text-md font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-primary ' +
                className
            }
        >
            {children}
            <span
                className={
                    `absolute bottom-1 left-0 h-[1.5px] bg-primary transition-all duration-300 ease-in-out ${active ? 'w-full' : 'w-0 group-hover:w-full'}`
                }
            />
        </Link>

    );
}
