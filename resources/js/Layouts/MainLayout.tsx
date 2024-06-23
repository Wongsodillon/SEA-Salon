import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { Button } from '@/Components/ui/button';
import { MdOutlineLogin } from "react-icons/md";
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function MainLayout({ user, children, addPadding = true }: PropsWithChildren<{ user: User, addPadding?: boolean }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="">
            <nav className="drop-shadow-md bg-white fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between py-4">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo />
                                </Link>
                            </div>
                            <div className="hidden sm:-my-px sm:ms-6 sm:flex">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    Home
                                </NavLink>
                            </div>
                            <div className="hidden sm:-my-px sm:ms-6 sm:flex">
                                <NavLink href={route('my-reservations')} active={route().current('my-reservations')}>
                                    My Reservations
                                </NavLink>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ms-6 gap-4">
                            {user ? (
                                <Link href={route('make-reservation')}>
                                    <Button variant="secondary">MAKE RESERVATION</Button>
                                </Link>
                            ) : (
                                <Link href={route('login')}>
                                    <Button variant="secondary">SIGN IN</Button>
                                </Link>
                            )}
                            {user && <Link method="post" href={route('logout')} as="button">
                                <MdOutlineLogin className="h-9 w-9 text-darkGray hover:text-darkGray/80" />
                            </Link>}
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('my-reservations')} active={route().current('my-reservations')}>
                            My Reservations
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('make-reservation')} active={route().current('make-reservation')}>
                            Make Reservation
                        </ResponsiveNavLink>
                    </div>

                    <div className="pb-1 border-t border-gray-200">
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <main className={'relative ' + (addPadding ? 'pt-16' : '')}>{children}</main>
            <footer className='bg-pastel w-full flex-col gap-4 px-4 items-center flex justify-between sm:px-16 sm:flex-row py-8'>
                <div className='flex gap-4 sm:justify-between items-center'>
                    <Link href={route('home')} className='text-white text-md hover:text-white/60 sm:text-lg'>
                        Home
                    </Link>
                    <Link href={route('my-reservations')} className='text-white text-md hover:text-white/60 sm:text-lg'>
                        My Reservations
                    </Link>
                    <Link href={route('make-reservation')} className='text-white text-md hover:text-white/60 sm:text-lg'>
                        Make Reservation
                    </Link>
                </div>
                <div className='flex gap-8'>
                    <a target="_blank" href='https://www.instagram.com/wongsodillon/'>
                        <FaInstagram className='text-white' size={32}/>
                    </a>
                    <a href="https://www.linkedin.com/in/dillon-w-29537224a/" target="_blank">
                        <FaLinkedin className='text-white' size={32}/>
                    </a>
                    <a href="https://github.com/Wongsodillon" target='_blank'>
                        <FaGithub className='text-white' size={32}/>
                    </a>
                </div>
            </footer>
        </div>
    );
}
