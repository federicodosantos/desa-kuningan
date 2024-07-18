import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { polygonCoordinates } from "@/Data/polygon";

const Geografis = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(112.1828);
    const [lat] = useState(-8.115194);
    const [zoom] = useState(13.5);

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://api.maptiler.com/maps/streets-v2/style.json?key=YmglSdeu70rPkyfsU97H",
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on("load", () => {
            console.log("Map loaded");
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
        });
    }, [lng, lat, zoom]);

    return (
        <section className="container mx-auto lg:px-10 md:px-8 px-4">
            <div className="flex flex-col gap-3 border-b pb-4 border-gray-300 ">
                <h1 className="lg:text-5xl text-3xl font-semibold text-primary-orange">
                    Geografis Desa
                </h1>
            </div>
            <main className="py-8 flex lg:flex-row flex-col-reverse gap-4 justify-between ">
                <div className="lg:w-1/2 flex flex-col gap-5   pr-10">
                    <div>
                        <h1 className="lg:text-3xl text-xl font-semibold mb-4">
                            Batas Desa
                        </h1>
                        <div className="w-full flex  gap-4">
                            <div className="flex flex-col w-full gap-4 ">
                                <div className="flex flex-col  gap-1 ">
                                    <h3 className="lg:text-xl text-base font-semibold">
                                        Utara
                                    </h3>
                                    <p className="lg:text-lg text-sm">
                                        Kelurahan Sananwetan
                                    </p>
                                </div>
                                <div className="flex flex-col   gap-1 ">
                                    <h3 className="lg:text-xl text-base font-semibold">
                                        Timur
                                    </h3>
                                    <p className="lg:text-lg text-sm">
                                        Desa Gaprang dan Desa Papungan
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-4 ">
                                <div className="flex flex-col   gap-1 ">
                                    <h3 className="lg:text-xl text-base font-semibold">
                                        Selatan
                                    </h3>
                                    <p className="lg:text-lg text-sm">Desa Jatinom</p>
                                </div>
                                <div className="flex flex-col   gap-1 ">
                                    <h3 className="lg:text-xl text-base font-semibold">
                                        Barat
                                    </h3>
                                    <p className="lg:text-lg text-sm">
                                        Kelurahan Karangtengah
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-400" />
                    <div className="flex justify-between items-center">
                        <h1 className="lg:text-3xl text-base font-semibold">Luas Desa</h1>
                        <p className="text-sm lg:text-lg font-semibold">
                            9.300.000m<sup>2</sup>
                        </p>
                    </div>
                    <hr className="border-gray-400" />
                    <div className="flex justify-between items-center">
                        <h1 className="lg:text-3xl text-base font-semibold">
                            Jumlah Penduduk
                        </h1>
                        <p className="text-sm lg:text-lg font-semibold">3.025 Jiwa</p>
                    </div>
                </div>
                <aside
                    ref={mapContainer}
                    className="lg:w-2/5 aspect-square bg-white rounded-lg map-container"
                ></aside>
            </main>
        </section>
    );
};

export default Geografis;
