import Breadcrumbs from '@/Components/Breadcrumbs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import React from "react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('news.store'));
    };

    const handleContentChange = (value) => {
        setData('content', value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create News</h2>}
        >
            <Head title="Create News" />
            <section className="py-6 px-8 flex flex-col gap-3">
                <Breadcrumbs
                    className="bg-white"
                    items={[
                        {
                            href: route("admin.dashboard"),
                            icon: "ic:round-home",
                        },
                        {
                            href: route("admin.news.index"),
                            label: "Berita"
                        },
                        { label: "Create" },
                    ]}
                />
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                                    Content
                                </label>
                                <ReactQuill
                                    value={data.content}
                                    onChange={handleContentChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.content && <p className="text-red-500 text-xs italic">{errors.content}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                                    Photo
                                </label>
                                <input
                                    id="photo"
                                    type="file"
                                    onChange={(e) => setData('photo', e.target.files[0])}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.photo && <p className="text-red-500 text-xs italic">{errors.photo}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary-orange text-white rounded-md w-fit px-5 py-2"
                                >
                                    Tambah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
