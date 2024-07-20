import Breadcrumbs from '@/Components/Breadcrumbs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import { z } from 'zod';
import React from "react";

import 'react-quill/dist/quill.snow.css';

const newsSchema = z.object({
    title: z.string().max(255, "Judul tidak boleh lebih dari 255 karakter"),
    content: z.string().min(1, "Konten tidak boleh kosong"),
    _method: z.literal('PATCH'),
});

export default function Edit({ auth, news }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        title: news.title || '',
        content: news.content || '',
        photo: null,
        _method: 'PATCH',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        try {
            newsSchema.parse(data);
            post(route('news.update', news.slug));
        } catch (err) {
            if (err instanceof z.ZodError) {
                err.errors.forEach((error) => {
                    setError(error.path[0], error.message);
                });
            }
        }
        console.log(errors)
    };

    const handleContentChange = (value) => {
        setData('content', value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit News</h2>}
        >
            <Head title="Edit News" />
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
                        { label: "Edit" },
                        { label: `${news.slug}` },
                    ]}
                />
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                    Photo (Opsional, maks. 5MB)
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
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}