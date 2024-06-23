import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import SidebarButton from "./SidebarButton";
import { HandHelping, LucideLayoutDashboard, MapPin } from "lucide-react";
import SidebarLink from "./SidebarLink";
import { FaRegUser } from "react-icons/fa";


type SidebarProps = {
    show? : boolean;
    toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}


const Sidebar = ({ show = true, toggleShow }: SidebarProps) => {
    return (
        <aside className={"absolute left-0 top-0 z-50 flex h-screen w-72 lg:min-w-[20%] flex-col overflow-y-hidden bg-pastel duration-300 ease-linear lg:static lg:translate-x-0 " + (show ? 'translate-x-0' : '-translate-x-full')}>
            <div className="px-6 pt-6 pb-16 flex justify-between items-center">
                <p className="text-white text-3xl font-bold">SEA Salon</p>
                <button onClick={() => toggleShow(false)} className="lg:hidden">
                    <IoMdClose size={24} className="text-white"/>
                </button>
            </div>
            <div className="no-scrollbar overflow-y-auto flex flex-col duration-300 ease-linear">
                <nav className="px-4 lg:px-6">
                    <ul className="mb-6 flex flex-col gap-4">
                        <li>
                            <SidebarButton href={route('admin.home')} active={route().current('admin.home')}>
                                <LucideLayoutDashboard size={24} className="text-white"/>
                                <p className="text-white font-bold text-xl">Dashboard</p>
                            </SidebarButton>
                        </li>
                        <li>
                            <SidebarButton href={route('admin.branches')} active={route().current('home') || route().current('admin.branches') || route().current('admin.add-branch')}>
                                <MapPin size={24} className="text-white"/>
                                <p className="text-white font-bold text-xl">Branches</p>
                            </SidebarButton>
                            <ul className="mt-2 mb-5 flex flex-col gap-3 pl-6">
                                <SidebarLink href={route('admin.branches')} active={route().current('admin.branches')}>
                                    View branches
                                </SidebarLink>
                                <SidebarLink href={route('admin.add-branch')} active={route().current('admin.add-branch')}>
                                    Add new branch
                                </SidebarLink>
                            </ul>
                        </li>
                        <li>
                            <SidebarButton href={route('admin.services')} active={route().current('admin.services') || route().current('admin.add-service') || route().current('admin.edit')}>
                                <HandHelping  size={24} className="text-white"/>
                                <p className="text-white font-bold text-xl">Services</p>
                            </SidebarButton>
                            <ul className="mt-2 mb-5 flex flex-col gap-3 pl-6">
                                <SidebarLink href={route('admin.services')} active={route().current('admin.services')}>
                                    View services
                                </SidebarLink>
                                <SidebarLink href={route('admin.add-service')} active={route().current('admin.add-service')}>
                                    Add new service
                                </SidebarLink>
                            </ul>
                        </li>

                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
