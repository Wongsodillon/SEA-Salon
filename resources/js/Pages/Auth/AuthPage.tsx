import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import "../../Styles/Login.scss"

export default function AuthPage() {

    const [page, setPage] = useState(0)
    const [opacity, setOpacity] = useState(100);

    const changePage = async (index: number) => {
        setOpacity(0);
        await new Promise(resolve => setTimeout(resolve, 300));
        setPage(index);
        setOpacity(100);
    }

    const pages = [
        <Login changePage={changePage} />,
        <Register changePage={changePage} />
    ]



    return (
        <div className="w-screen relative h-screen flex justify-between sm:bg-none" >
            <div className='hidden w-full sm:block p-12 lg:p-24 relative'>
                <div className='flex flex-col justify-center h-80 text-white '>
                    <p className='text-4xl md:text-6xl font-bold '>SEA Salon</p>
                    <br />
                    <p className='text-2xl md:text-5xl font-medium italic'>Beauty and Elegance Redefined</p>
                </div>
                <div className='inset-0 absolute -z-10 brightness-[60%]'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fpexels-photo-3993320.webp?alt=media&token=b8e904b0-c94f-48ae-bd6e-b5750d303c3a" className='w-full h-full object-cover' />
                </div>
            </div>
            <div className='sm:hidden inset-0 absolute -z-10 brightness-[50%]'>
                <img src="https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fpexels-photo-3993320.webp?alt=media&token=b8e904b0-c94f-48ae-bd6e-b5750d303c3a" className='w-full h-full object-cover' />
            </div>
            <div className={`sm:w-[45vw] w-full min-w-80 h-full transition-all duration-700 sm:bg-[#f2b0a7]`}>
                <div className="px-12 h-full transition-all duration-500" style={{opacity: opacity + "%"}}>
                    {pages[page]}
                </div>
            </div>
        </div>
    );
}
