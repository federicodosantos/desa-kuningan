import React, { useEffect, useRef, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Breadcrumbs from "@/Components/Breadcrumbs";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { polygonCoordinates } from "@/Data/polygon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point, polygon } from "@turf/helpers";
import Toast from "@/Components/Toast";
import Pagination from "@/Components/Pagination";
import PlaceList from "@/Components/PlaceList";

const Index = ({ auth, places, categories, flash }) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        delete: destroy,
    } = useForm({
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
    
    const page = usePage();
    console.log(page)
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(112.1828);
    const [lat] = useState(-8.115194);
    const [zoom] = useState(13.5);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://api.maptiler.com/maps/streets-v2/style.json?key=YmglSdeu70rPkyfsU97H",
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on("load", () => {
            map.current.addSource("kuningan-polygon", {
                type: "geojson",
                data: {
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: [polygonCoordinates],
                    },
                },
            });

            map.current.addLayer({
                id: "kuningan-polygon",
                type: "fill",
                source: "kuningan-polygon",
                layout: {},
                paint: {
                    "fill-color": "#de5828",
                    "fill-opacity": 0.5,
                },
            });

            map.current.addLayer({
                id: "kuningan-polygon-outline",
                type: "line",
                source: "kuningan-polygon",
                layout: {},
                paint: {
                    "line-color": "#de5828",
                    "line-width": 2,
                },
            });

            places.data.forEach((location) => {
                const el = document.createElement("div");
                el.className = "marker";

                const popup = new maplibregl.Popup({
                    offset: 25,
                    closeButton: true,
                    closeOnClick: false,
                    maxWidth: "none",
                }).setHTML(`
                    <div class="rounded-lg">
                        <div class="text-sm font-semibold p-3">${location.name}</div>
                    </div>
                `);

                new maplibregl.Marker(el)
                    .setLngLat([location.longitude, location.latitude])
                    .setPopup(popup)
                    .addTo(map.current);
            });

            map.current.on("click", (e) => {
                const clickPoint = point([e.lngLat.lng, e.lngLat.lat]);
                const polygonArea = polygon([polygonCoordinates]);

                if (!booleanPointInPolygon(clickPoint, polygonArea)) {
                    setError("Pilih area di dalam area warna orange");
                    return;
                }

                setData({
                    ...data,
                    latitude: e.lngLat.lat.toFixed(6),
                    longitude: e.lngLat.lng.toFixed(6),
                });
                setError("");

                updateClickedPoint(e.lngLat.lng, e.lngLat.lat);
            });
        });
    }, [places]);

    const updateClickedPoint = (lng, lat) => {
        if (map.current.getLayer("clicked-point")) {
            map.current.removeLayer("clicked-point");
        }
        if (map.current.getSource("clicked-point")) {
            map.current.removeSource("clicked-point");
        }

        map.current.addSource("clicked-point", {
            type: "geojson",
            data: {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [lng, lat],
                },
            },
        });

        map.current.addLayer({
            id: "clicked-point",
            type: "circle",
            source: "clicked-point",
            paint: {
                "circle-radius": 6,
                "circle-color": "#FF0000",
            },
        });
    };

    useEffect(() => {
        if (flash.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (flash.error) {
            setToast({ message: flash.error, type: 'error' });
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.place.store'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCoordinateChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        
        if (data.latitude && data.longitude) {
            const lng = parseFloat(data.longitude);
            const lat = parseFloat(data.latitude);
            
            if (!isNaN(lng) && !isNaN(lat)) {
                updateClickedPoint(lng, lat);
                
                const clickPoint = point([lng, lat]);
                const polygonArea = polygon([polygonCoordinates]);

                if (!booleanPointInPolygon(clickPoint, polygonArea)) {
                    setError("Koordinat yang dimasukkan berada di luar area yang diizinkan");
                } else {
                    setError("");
                }
            }
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

            <section className="py-6 px-8 flex flex-col gap-3">
                <Breadcrumbs
                    className="bg-white"
                    items={[
                        {
                            href: route("admin.dashboard"),
                            icon: "ic:round-home",
                        },
                        { label: "Peta Digital" },
                    ]}
                />
                <main className="flex gap-4">
                    <aside
                        ref={mapContainer}
                        className="w-2/5 map-container aspect-square bg-white rounded-lg"
                    ></aside>
                    <div className="w-3/5 p-3 bg-white rounded-md">
                        {error && (
                            <Toast
                                type="error"
                                autoHide={false}
                                message={error}
                            />
                        )}
                        {toast && (
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                onClose={() => setToast(null)}
                            />
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="latitude"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        id="latitude"
                                        name="latitude"
                                        value={data.latitude}
                                        onChange={handleCoordinateChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.latitude && (
                                        <div className="text-red-500">
                                            {errors.latitude}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="longitude"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        id="longitude"
                                        name="longitude"
                                        value={data.longitude}
                                        onChange={handleCoordinateChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.longitude && (
                                        <div className="text-red-500">
                                            {errors.longitude}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.name && (
                                        <div className="text-red-500">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="description"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.description && (
                                        <div className="text-red-500">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="address"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.address && (
                                        <div className="text-red-500">
                                            {errors.address}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="social_media"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Social Media
                                    </label>
                                    <input
                                        type="text"
                                        id="social_media"
                                        name="social_media"
                                        value={data.social_media}
                                        onChange={(e) =>
                                            setData(
                                                "social_media",
                                                e.target.value
                                            )
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.social_media && (
                                        <div className="text-red-500">
                                            {errors.social_media}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="phone_number"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        value={data.phone_number}
                                        onChange={(e) =>
                                            setData(
                                                "phone_number",
                                                e.target.value
                                            )
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.phone_number && (
                                        <div className="text-red-500">
                                            {errors.phone_number}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="category_id"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Category
                                    </label>
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="">
                                            Select a category
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <div className="text-red-500">
                                            {errors.category_id}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 col-span-2">
                                    <label
                                        htmlFor="photos"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Gambar
                                    </label>
                                    <input
                                        type="file"
                                        id="photos"
                                        name="photos[]"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData("photos", e.target.files)
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.photos && (
                                        <div className="text-red-500">
                                            {errors.photos}
                                        </div>
                                    )}
                                    {data.photos && data.photos.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">
                                                {data.photos.length} file(s)
                                                selected
                                            </p>
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
                </main>
                <PlaceList places={places.data}/>
              
                <Pagination
                    links={places.links}
                    from={places.from}
                    to={places.to}
                    total={places.total}
                />
                
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;