import { Head, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps, Review, Service } from '@/types';
import Carousel from '@/Components/Carousel';
import ServiceCard from '@/Components/ServiceCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "../Styles/Home.scss"
import { Button } from '@/Components/ui/button';
import { IoMdCall } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { Textarea } from '@/Components/ui/textarea';
import ReviewCard from '@/Components/ReviewCard';
import { AiOutlineSend } from "react-icons/ai";
import { Input } from '@/Components/ui/input';
import Rating from '@mui/material/Rating';
import ReviewForm from '@/Components/ReviewForm';

type DashboardProps = PageProps & {
    services: Service[];
    reviews: Review[];
}

export default function Dashboard({ auth, services, reviews }: DashboardProps) {

    return (
        <MainLayout
            user={auth.user}
            addPadding={false}
        >
            <Carousel />
            <br />
            <br />
            <br />
            <div className='flex flex-col items-center gap-4 px-8 md:px-16 overflow-x-hidden'>
                <p className='text-2xl text-pastel text-center'>Our Services</p>
                <p className='text-4xl text-primary text-center'>WE PROVIDE QUALITY TREATMENTS</p>
                <img src="https://firebasestorage.googleapis.com/v0/b/dahoster-31a29.appspot.com/o/images%2Fborder-shape.png?alt=media&token=cc53311a-84ae-458b-a7e8-214c1c9dc8ec"  />
                <br /><br />
                <div className='flex justify-between items-stretch max-w-6xl gap-8 flex-col lg:flex-row flex-wrap'>
                    {services.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
                <br /><br />
                <div className='bg-pastel px-8 lg:px-32 w-screen py-12'>
                    <ReviewForm />
                    <br />
                    <div className='flex'>
                        <Swiper
                            modules={[Navigation, Pagination, A11y]}
                            spaceBetween={30}
                            slidesPerView={4}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                480: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                800: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 25,
                                },
                                1400: {
                                    slidesPerView: 4,
                                    spaceBetween: 25,
                                },
                            }}
                        >
                            {reviews.map((review, index) => (
                                <SwiperSlide key={index}>
                                    <ReviewCard review={review} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <br />
                <br />
                <div className='flex justify-between max-w-[86rem] gap-8 flex-col xl:flex-row'>
                    <div className='flex flex-col md:flex-row xl:max-w-[50%]'>
                        <div className='md:w-56 min-h-[25rem] working-hours-pic'>
                        </div>
                        <div className='flex-1 py-12 px-12 flex flex-col bg-lightGray'>
                            <div className='flex gap-3 items-end'>
                                <IoTimeOutline className='text-3xl mt-1' />
                                <p className='text-2xl font-medium'>Working Hours</p>
                            </div>
                            <br />
                            <p className=''>We strive to provide the best services to cater to your needs. Our team is dedicated to ensuring you have a relaxing and enjoyable experience</p>
                            <br />
                            <div className='flex flex-col gap-3'>
                                <p>We open everyday including sundays</p>
                                <p>Opening and closing time may vary between branches</p>
                                <p>Make sure to check them before reserve</p>
                            </div>
                            <br />
                            <Button onClick={() => router.visit('make-reservation')}  className='max-w-48' >MAKE RESERVATION</Button>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row xl:max-w-[50%]'>
                        <div className='md:w-56 min-h-[25rem] contacts-pic'>
                        </div>
                        <div className='flex-1 py-16 px-12 flex flex-col bg-lightGray'>
                            <div className='flex items-center gap-4'>
                                <IoMdCall className='text-3xl mt-1' />
                                <p className='text-2xl font-medium'>Contacts</p>
                            </div>
                            <br />
                            <p>For any inquiries or to make a reservation, please contact our team members listed below. They are available to assist you with all your needs.</p>
                            <br />
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-1 items-start'>
                                    <p>Thomas</p>
                                    <p>Call: <span className='font-medium'>08123456789</span></p>
                                </div>
                                <div className='flex flex-col gap-1 items-start'>
                                    <p>Sekar</p>
                                    <p>Call: <span className='font-medium'>08164829372</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
