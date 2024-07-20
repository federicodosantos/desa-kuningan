import Breadcrumbs from "@/Components/Breadcrumbs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { z } from "zod";

import "react-quill/dist/quill.snow.css";

// Skema validasi Zod
const officerSchema = z.object({
    name: z.string().max(255, "Judul tidak boleh lebih dari 255 karakter"),
    position: z.string().min(1, "Konten tidak boleh kosong"),
    _method: z.literal("PATCH"),
});

export default function Edit({ auth, officer, positions }) {
    const { data, setData, patch,post, processing, errors, setError, clearErrors } =
        useForm({
            name: officer.data.name || "",
            position: officer.data.position || "",
            photo: null,
            _method: "PATCH",
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();
        console.log(data)
    

        try {
            officerSchema.parse(data);
            post(route("admin.officer.update", officer.data.id));
        } catch (err) {
            if (err instanceof z.ZodError) {
                err.errors.forEach((error) => {
                    setError(error.path[0], error.message);
                });
            }
        }
    };

    const handlePositionChange = (value) => {
        setData("position", value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit officer
                </h2>
            }
        >
            <Head title="Edit officer" />
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
                            label: "Perangkat desa",
                        },
                        { label: "Edit" },
                        { label: `${officer.data.name}` },
                    ]}
                />
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
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
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="photo"
                                >
                                    Photo (Optional, max. 5MB)
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
