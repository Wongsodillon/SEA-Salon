import { useEffect, FormEventHandler } from 'react';
import AuthPage from '@/Pages/Auth/AuthPage';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Checkbox } from '@/Components/ui/checkbox';

export default function Login({ changePage }: { changePage: (index: number) => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <form onSubmit={submit} className='flex flex-col justify-center h-full'>
                <p className='text-xl text-white font-semibold'>
                    Login
                </p>
                <div className='mt-4'>
                    <InputLabel className='text-white' htmlFor="email" value="Email" />
                    <Input
                        name="email"
                        value={data.email}
                        className="mt-2"
                        placeholder='Email'
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel className='text-white' htmlFor="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2"
                        placeholder='Password'
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-between mt-4">
                    <label className="flex items-center">
                    <Checkbox
                        checked={data.remember}
                        onCheckedChange={(checked) => setData('remember', Boolean(checked))}
                        className="w-4 h-4"
                    />
                        <span className="ms-2 text-sm text-white">Remember me</span>
                    </label>
                </div>

                <div className="flex flex-col items-start justify-end mt-8 gap-4">
                    <Button className="w-full bg-white hover:bg-white/80 text-darkGray border-none" disabled={processing} variant='secondary'>
                        Log in
                    </Button>
                    <p className="text-md text-gray-100">
                        Don't have an account?{' '}
                        <span className="underline text-white font-semibold cursor-pointer" onClick={() => changePage(1)}>Register</span>
                    </p>
                </div>
            </form>
        </>
    );
}
