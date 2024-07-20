import React, { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import LogoDesa from '../../../assets/logo-desa.png'
export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Kuningan | Login" />
            <div
                style={{
                    backgroundImage:
                        'url("https://www.transparenttextures.com/patterns/low-contrast-linen.png")',
                }}
                className="h-screen w-full flex items-center justify-center bg-text-white"
            >
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}
                <div className="container mx-auto bg-white items-center w-4/6 lg:px-10 md:px-8 px-4 py-10 rounded-xl shadow flex  ">
                    <div className="w-1/2 flex flex-col gap-3">
                    <img src={LogoDesa} className="w-1/6 mx-auto" alt="" />
                    <div>
                    <h1 className="text-center text-xl font-semibold">CMS </h1>
                    <p className="text-center">(Content Management System)</p>

                    </div>
                        <form
                            onSubmit={submit}
                            className="w-full max-w-md mx-auto"
                        >
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>


                            <div className="flex items-center justify-end mt-4">
                               

                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                    <div className="p-4 flex flex-col gap-4 w-1/2 text-sm">
                        <h1 className="text-2xl font-semibold">
                            Selamat Datang di Sistem Manajemen Konten Desa
                            Kuningan.
                        </h1>
                        <p className="text-justify">
                             Sistem
                            ini dirancang untuk memudahkan pengelolaan informasi
                            dan konten yang akan ditampilkan di website resmi
                            Desa Kuningan. Melalui CMS ini, Anda dapat mengelola
                            berbagai data dan informasi penting, seperti berita
                            desa, kegiatan masyarakat, layanan publik, dan
                            informasi lainnya yang relevan. Kami berharap,
                            dengan adanya sistem ini, pengelolaan website desa
                            dapat dilakukan dengan lebih efisien dan
                            terstruktur. 
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
