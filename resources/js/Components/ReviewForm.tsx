import { Rating } from "@mui/material";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { AiOutlineSend } from "react-icons/ai";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import InputError from "./InputError";

type FormInputType = {
    full_name: string;
    rating: number | null;
    review: string;
}

const ReviewForm = () => {

    const { data, setData, post, processing, errors, reset } = useForm<FormInputType>({
        full_name: '',
        rating: 0,
        review: ''
    });

    const onSubmit: FormEventHandler = e => {
        e.preventDefault()
        post('/add-review', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    }

    return (
        <div className='flex justify-between gap-8 flex-col md:flex-row'>
            <div className='flex justify-between flex-col gap-2 md:max-w-[50%]'>
                <div>
                    <p className='font-semibold text-3xl text-white mb-4'>What do you think of us?</p>
                    <p className='text-white text-lg'>There are numerous versions of available passages, but most have been altered with inserted words that disrupt their form. Many variations of passages exist.</p>
                </div>
                <p className="font-semibold hidden md:block text-3xl text-white">Testimonials</p>
            </div>
            <form onSubmit={onSubmit} className='flex flex-col gap-4 items-end'>
                <div className="w-full">
                    <Input value={data.full_name} onChange={e => setData('full_name', e.target.value)} placeholder='Name' className='md:w-96 w-full bg-white px-4' />
                    <InputError className='w-full mt-2' message={errors.full_name} />
                </div>
                <div className="w-full">
                    <div className='w-full bg-white py-2 px-4 flex flex-col justify-center border border-gray'>
                        <p className='text-muted-foreground'>Rate Us</p>
                        <Rating name="simple-controlled" onChange={(e, newValue) => setData('rating', newValue)} />
                    </div>
                    <InputError className='w-full mt-2' message={errors.rating} />
                </div>
                <div className="w-full">
                    <Textarea value={data.review} onChange={e => setData('review', e.target.value)} placeholder='Write a review' className='md:w-96 w-full resize-none min-h-32' />
                    <InputError className='w-full mt-2' message={errors.review} />
                </div>
                <Button className='max-w-48 gap-3 border-2 py-6 px-6 font-medium' disabled={processing} >
                    <AiOutlineSend size={24} />
                    SUBMIT
                </Button>
            </form>
        </div >
    );
}

export default ReviewForm;
