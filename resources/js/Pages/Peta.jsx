import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { polygonCoordinates } from "@/Data/polygon";
import TitleSection from "@/Components/TitleSection";

const Peta = ({ places }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(112.1828);
    const [lat] = useState(-8.115194);
    const [zoom] = useState(13.5);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filterMarkers = () => {
        places.forEach((location) => {
            const marker = document.querySelector(`.marker-${location.id}`);
            if (marker) {
                const isVisible = selectedCategory === 'all' || location.category.name.toLowerCase() === selectedCategory;
                marker.style.display = isVisible ? 'block' : 'none';
                console.log(`Location: ${location.name}, Category: ${location.category.name}, Visible: ${isVisible}`);
            }
        });
    };

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://api.maptiler.com/maps/streets-v2/style.json?key=YmglSdeu70rPkyfsU97H",
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

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

            places.forEach((location) => {
                console.log(`Adding marker for ${location.name}`);

                const el = document.createElement("div");
                el.className = `marker marker-${location.id} ${location.category.name.toLowerCase()}`;
        
                const popup = new maplibregl.Popup({
                    offset: 25,
                    closeButton: true,
                    closeOnClick: false,
                    maxWidth: "none",
                }).setHTML(`
                    <div class="rounded-lg max-w-64">
                      <div class="text-sm font-semibold p-3">${location.name}</div>
                      <div class="p-3">
                        <div class="text-xs">
                          <p><span class="popup-label">Alamat:</span> ${location.address}</p>
                          <p><span class="popup-label">Kategori:</span> ${location.category.name}</p>
                          ${
                            ['UMKM', 'Pariwisata'].includes(location.category.name) 
                            ? `<a href="/${location.category.name.toLowerCase()}/${location.id}" class="text-blue-500 hover:underline">Selengkapnya</a>`
                            : ''
                          }
                        </div>
                      </div>
                    </div>
                `);

                new maplibregl.Marker(el)
                    .setLngLat([location.longitude, location.latitude])
                    .setPopup(popup)
                    .addTo(map.current);
            });

            filterMarkers(); 
        });
    }, [places, lng, lat, zoom]);

    useEffect(() => {
        if (map.current) {
            filterMarkers();
        }
    }, [selectedCategory]);

    return (
        <>
            <Head title="Kuningan | Peta Digital" />
            <div>
                <Navbar />
                <section className="container py-4 lg:py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Peta Digital" },
                        ]}
                    />
                
                    <TitleSection title={'Peta Digital'} subTitle={'menyediakan peta interaktif dengan informasi lokasi penting seperti kantor desa, UMKM, pariwisata, dan homestay.'}/>
                </section>
                <main className="container gap-4 mx-auto lg:px-10 md:px-8 px-4 py-10">
                    <div className="mb-4">
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                            }}
                            className="p-2 border rounded bg-primary-orange border-none text-text-white"
                        >
                            <option value="all">Semua Kategori</option>
                            <option value="umkm">UMKM</option>
                            <option value="pariwisata">Pariwisata</option>
                            <option value="homestay">Homestay</option>
                            <option value="sarana dan prasarana">Sarana dan Prasarana</option>
                        </select>
                    </div>
                    <div
                        ref={mapContainer}
                        className="map-container h-screen"
                        style={{ height: "500px" }}
                    />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Peta;