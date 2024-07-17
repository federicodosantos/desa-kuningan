import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { polygonCoordinates } from "@/Data/polygon";


const Peta = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(112.1828);
    const [lat] = useState(-8.115194);
    const [zoom] = useState(13.5);

    const locations = [
        {
            id: 1,
            name: "Sumber Air Kuningan",
            lat: -8.118431,
            lng: 112.183151,
            deskripsi:
                "Sumber air di Desa Kuningan, Kanigoro, Blitar, Jawa Timur, terkenal karena keajaibannya yang tidak pernah surut meski musim kemarau.",
            alamat: "RT.4/RW.4, Jl syech Abu Hasan Kuningan, Selatan, Ds. Kuningan, Kec. Kanigoro, Kabupaten Blitar, Jawa Timur",
            kontak: "Pokdarwis",
            kategori: "Pariwisata",
        },
        {
            id: 2,
            name: "Homestay Mewah",
            lat: -8.120965,
            lng: 112.181412,
            deskripsi:
                "Homestay Mewah di Kuningan, Kanigoro, Blitar, menawarkan akomodasi dengan fasilitas lengkap seperti Wi-Fi, sarapan, televisi, dan kamar mandi pribadi.",
            alamat: "RT.4/RW.4, Jln. Syeikh Abu Hasan, Selatan, Ds. Kuningan, Kec. Kanigoro, Kabupaten Blitar, Jawa Timur",
            kontak: "Pokdarwis",
            kategori: "Homestay",
        },
        {
            id: 3,
            name: "Dhena Collection (Keset Kain Perca)",
            lat: -8.110855,
            lng: 112.18338,
            deskripsi:
                "Dhena Collection adalah usaha kerajinan kain perca yang menghasilkan berbagai produk unik seperti tas, dompet, dan aksesoris rumah tangga dari sisa kain yang tidak terpakai.",
            alamat: "RT.3/RW.2, Jln. Kusnan Sastroharjo, Tengah, Ds. Kuningan, Kec. Kanigoro, Kabupaten Blitar, Jawa Timur",
            kontak: "085235241004 - Siti Robikoh (Bu Obi) @dhenacollection_",
            kategori: "UMKM",
        },
    ];

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

            locations.forEach((location) => {
                console.log(`Adding marker for ${location.name}`);

                const el = document.createElement("div");
                el.className = "marker";
        
                const popup = new maplibregl.Popup({
                    offset: 25,
                    closeButton: true,
                    closeOnClick: false,
                    maxWidth: "none",
                }).setHTML(`
                          <div class=" rounded-lg ">
            <div class="text-sm font-semibold p-3">${location.name}</div>
            <div class="p-3 ">
              
                <div class="popup-info text-xs  ">
                    <p><span class="popup-label">Alamat:</span> ${location.alamat}</p>
                    <p><span class="popup-label">Kontak:</span> ${location.kontak}</p>
                    <p><span class="popup-label">Kategori:</span> ${location.kategori}</p>
                </div>
            </div>
        </div>
                    `);

                new maplibregl.Marker(el)
                    .setLngLat([location.lng, location.lat])
                    .setPopup(popup)
                    .addTo(map.current);
            });
        });
    }, [locations, lng, lat, zoom]);

    return (
        <>
            <Head title="Kuningan | Peta Digital" />
            <div>
                <Navbar />
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Peta Digital" },
                        ]}
                    />
                    <h3 className="text-4xl text-primary-orange font-semibold">
                        Peta Digital
                    </h3>
                </section>
                <main className="container gap-4 mx-auto lg:px-10 md:px-8 px-4 py-10">
                    <div
                        ref={mapContainer}
                        className="map-container"
                        style={{ height: "500px" }}
                    />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Peta;
