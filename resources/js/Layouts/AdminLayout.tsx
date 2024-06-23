import Sidebar from "@/Components/Sidebar";
import { User } from "@/types";
import { GiHamburgerMenu } from "react-icons/gi";
import { PropsWithChildren, useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

const AdminLayout = ({ user, header, children }: PropsWithChildren<{ user: User, header: string }>) => {

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#fffcfe]">
            <Sidebar show={showSidebar} toggleShow={toggleSidebar}/>
            <div className="flex flex-col gap-4 w-full">
                <div className="overflow-y-auto overflow-x-hidden relative pb-8 px-4 lg:px-12">
                    <div className="flex justify-between py-8">
                        <div className="flex gap-4 items-center">
                            <GiHamburgerMenu size={36} className="text-black block lg:hidden p-[4px] border-2 cursor-pointer" onClick={() => setShowSidebar(true)}/>
                            <h1 className="text-3xl text-darkGray font-semibold">{header}</h1>
                        </div>
                        <Link href={route('logout')} as="button" method="post">
                            <Button>
                                Logout
                            </Button>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
