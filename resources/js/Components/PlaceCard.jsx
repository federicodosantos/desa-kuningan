import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const PlaceCard = ({ item }) => {
    const { delete: destroy } = useForm();

    const handleDelete = (e, id) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this place?")) {
            destroy(route("admin.place.destroy", id));
        }
    };

    return (
        <div className="w-full bg-white rounded-md flex flex-col md:flex-row">
            <Splide className="w-full md:w-2/5 flex items-center">
                {item.photo.map((photoItem, j) => (
                    <SplideSlide key={j} className="w-full aspect-square p-5">
                        <img
                            src={"http://localhost:8000/storage/" + photoItem.photo_path}
                            className="w-full h-full object-contain"
                            alt=""
                            loading="lazy"
                        />
                    </SplideSlide>
                ))}
            </Splide>
            <div className="w-full md:w-3/5 text-base flex flex-col gap-1 p-2">
                <h1 className="font-semibold">{item.name}</h1>
                <p className="line-clamp-2 text-xs">Desc: {item.description}</p>
                <p className="line-clamp-2 text-xs">Kategori: {item.category.name}</p>
                <p className="line-clamp-2 text-xs">Koordinat: {item.latitude}, {item.longitude}</p>
                <p className="line-clamp-2 text-xs">Alamat: {item.address}</p>
                <p className="line-clamp-2 text-xs">{item.social_media}</p>
                <p className="line-clamp-2 text-xs">Cp: {item.phone_number}</p>
                <div className="px-6 py-4 border-gray-200 text-sm flex gap-1">
             
                    <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="px-2 py-1 active:scale-95 duration-200 ease-in-out hover:bg-opacity-90 bg-red-500 text-white rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceCard;