import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Toast from "@/Components/Toast";

const PlaceForm = ({ categories, flash }) => {
    const { data, setData, post, processing, errors } = useForm({
        latitude: "",
        longitude: "",
        name: "",
        description: "",
        address: "",
        social_media: "",
        phone_number: "",
        category_id: "",
        photos: [],
    });

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.place.store"));
    };

    return (
        <div className="w-3/5 p-3 bg-white rounded-md">
            {error && <Toast type="error" autoHide={false} message={error} />}
            {flash.success && <Toast type="success" autoHide={true} message={flash.success} />}
            {flash.error && <Toast type="error" autoHide={true} message={flash.error} />}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="latitude" className="block text-gray-700 text-sm font-bold mb-2">
                            Latitude
                        </label>
                        <input
                            type="text"
                            id="latitude"
                            name="latitude"
                            disabled
                            value={data.latitude}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="longitude" className="block text-gray-700 text-sm font-bold mb-2">
                            Longitude
                        </label>
                        <input
                            type="text"
                            id="longitude"
                            name="longitude"
                            disabled
                            value={data.longitude}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.description && <div className="text-red-500">{errors.description}</div>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.address && <div className="text-red-500">{errors.address}</div>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="social_media" className="block text-gray-700 text-sm font-bold mb-2">
                            Social Media
                        </label>
                        <input
                            type="text"
                            id="social_media"
                            name="social_media"
                            value={data.social_media}
                            onChange={(e) => setData("social_media", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.social_media && <div className="text-red-500">{errors.social_media}</div>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={(e) => setData("phone_number", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.phone_number && <div className="text-red-500">{errors.phone_number}</div>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category_id" className="block text-gray-700 text-sm font-bold mb-2">
                            Category
                        </label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={data.category_id}
                            onChange={(e) => setData("category_id", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <div className="text-red-500">{errors.category_id}</div>}
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                        <label htmlFor="photos" className="block text-gray-700 text-sm font-bold mb-2">
                            Gambar
                        </label>
                        <input
                            type="file"
                            id="photos"
                            name="photos[]"
                            multiple
                            accept="image/*"
                            onChange={(e) => setData("photos", e.target.files)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        {errors.photos && <div className="text-red-500">{errors.photos}</div>}
                        {data.photos && data.photos.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">{data.photos.length} file(s) selected</p>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {processing ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default PlaceForm;