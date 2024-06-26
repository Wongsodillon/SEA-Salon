import { useEffect, FormEventHandler } from 'react';
import AuthPage from '@/Pages/Auth/AuthPage';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Input } from '@/Components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

export default function Register({ changePage }: { changePage: (index: number) => void} ){
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <form onSubmit={submit} className='flex flex-col justify-center h-full'>
                <p className='text-xl font-semibold text-white'>
                    Register
                </p>
                <div className='mt-2'>
                    <InputLabel className='text-white' htmlFor="name" value="Name" />

                    <Input
                        name="name"
                        value={data.name}
                        className="mt-1"
                        placeholder='John Doe'
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-2">
                    <InputLabel className='text-white' htmlFor="email" value="Email" />

                    <Input
                        name="email"
                        value={data.email}
                        className="mt-1"
                        placeholder='johndoe@example.com'
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-2">
                    <InputLabel className='text-white' htmlFor="phone_number" value="Phone Number" />
                    <Input
                        name="phone_number"
                        value={data.phone_number}
                        className="mt-1"
                        placeholder='08XXXXXXXXXX'
                        onChange={(e) => setData('phone_number', e.target.value)}
                    />

                    <InputError message={errors.phone_number} className="mt-2" />
                </div>
                <div className="mt-2">
                    <InputLabel className='text-white' htmlFor="password" value="Password" />

                    <Input
                        type='password'
                        name="password"
                        value={data.password}
                        className="mt-1"
                        placeholder='Password'
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-2">
                    <InputLabel className='text-white' htmlFor="password_confirmation" value="Confirm Password" />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1"
                        placeholder='Confirm Password'
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex flex-col items-start justify-end mt-8 gap-4">
                    <Button className="w-full bg-white hover:bg-white/80 text-darkGray border-none" disabled={processing} variant='secondary'>
                        Register
                    </Button>
                    <p className="text-md text-gray-100">
                        Already have an account?{' '}
                        <span className="underline text-white font-semibold cursor-pointer" onClick={() => changePage(0)}>Login</span>
                    </p>
                </div>
            </form>
        </>
    );
}
