import Breadcrumbs from "@/Components/Breadcrumbs";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = ({ auth, news }) => {
    console.log(news);

    const { delete: destroy } = useForm();

    const handleDelete = (e, slug) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this news?')) {
            destroy(route('admin.news.destroy', slug));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <section className="py-6 px-8  flex flex-col gap-3">
                <Breadcrumbs
                    className="bg-white"
                    items={[
                        {
                            href: route("admin.dashboard"),
                            icon: "ic:round-home",
                        },
                        { label: "Berita" },
                    ]}
                />
                <Link
                    href={route("admin.news.create")}
                    className="bg-primary-orange text-text-white rounded-md w-fit px-5 py-2"
                >
                    Tambah Berita
                </Link>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                    Judul
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                    Isi
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                    Gambar
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {news.data.length > 0 ? (
                                news.data.map((item, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="px-6 py-4 whitespace-no-wrap  border-gray-200">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap  border-gray-200">
                                            {item.title}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-no-wrap line-clamp-6 border-gray-200 prose-sm line-cla"
                                            dangerouslySetInnerHTML={{
                                                __html: item.content,
                                            }}
                                        ></td>
                                        <td className="px-6 py-4 whitespace-no-wrap  border-gray-200">
                                            <img
                                                draggable="false"
                                                src={`http://localhost:8000/${item.photo_path}`}
                                                className="w-full aspect-square object-contain"
                                                alt={item.id}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap  border-gray-200 text-sm flex   gap-1">
                                            <button className="px-2 py-1 active:scale-95 duration-200 ease-in-out hover:bg-opacity-90 bg-gray-500 text-text-white rounded-lg">
                                                Lihat
                                            </button>
                                            <Link
                                                href={route(
                                                    "admin.news.edit",
                                                    item.slug
                                                )}
                                                className="px-2 py-1 active:scale-95 duration-200 ease-in-out hover:bg-opacity-90 bg-yellow-500 text-text-white rounded-lg"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={(e) => handleDelete(e, item.slug)}
                                                className="px-2 py-1 active:scale-95 duration-200 ease-in-out hover:bg-opacity-90 bg-red-500 text-text-white rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-2">
                                        tidak ada data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;