import Breadcrumbs from "@/Components/Breadcrumbs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { z } from "zod";
import "react-quill/dist/quill.snow.css";

const newsSchema = z.object({
    name: z
        .string()
        .min(1, "Judul harus diisi")
        .max(255, "Judul terlalu panjang"),
    position: z.string().min(1, "Posisi harus diisi"),
});

export default function Create({ auth, positions }) {
    const {
        data,
        setData,
        post,
        processing,
        errors: inertiaErrors,
    } = useForm({
        name: "",
        position: "",
        photo: null,
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            newsSchema.parse(data);

            post(route("admin.officer.store"));
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors = {};
                error.errors.forEach((err) => {
                    formattedErrors[err.path[0]] = err.message;
                });
                setErrors(formattedErrors);
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create News
                </h2>
            }
        >
            <Head title={'Create Officer'}/>
            <section className="py-6 px-8 flex flex-col gap-3">
                <Breadcrumbs
                    className="bg-white"
                    items={[
                        {
                            href: route("admin.dashboard"),
                            icon: "ic:round-home",
                        },
                        {
                            href: route("admin.officer.index"),
                            label: "Perangkat Desa",
                        },
                        { label: "Create" },
                    ]}
                />
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.name}
                                    </p>
                                )}
                                {inertiaErrors.name && (
                                    <p className="text-red-500 text-xs italic">
                                        {inertiaErrors.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label
                                    htmlFor="position"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Position
                                </label>
                                <select
                                    id="position"
                                    name="position"
                                    value={data.position}
                                    onChange={(e) =>
                                        setData("position", e.target.value)
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Select a position</option>
                                    {positions.map((position) => (
                                        <option
                                            key={position.id}
                                            value={position.id}
                                        >
                                            {position.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.position && (
                                    <div className="text-red-500">
                                        {errors.position}
                                    </div>
                                )}
                                {inertiaErrors.position && (
                                    <div className="text-red-500">
                                        {inertiaErrors.position}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="photo"
                                >
                                    Photo
                                </label>
                                <input
                                    id="photo"
                                    type="file"
                                    onChange={(e) =>
                                        setData("photo", e.target.files[0])
                                    }
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.photo && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.photo}
                                    </p>
                                )}
                                {inertiaErrors.photo && (
                                    <p className="text-red-500 text-xs italic">
                                        {inertiaErrors.photo}
                                    </p>
                                )}
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
