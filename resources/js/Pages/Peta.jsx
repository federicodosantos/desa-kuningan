import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { Icon } from '@iconify/react';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Peta = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(112.1814); 
    const [lat, setLat] = useState(-8.0972);
    const [zoom, setZoom] = useState(13); 

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://api.maptiler.com/maps/streets-v2/style.json?key=YmglSdeu70rPkyfsU97H",
            center: [lng, lat],
            zoom: zoom,
        });

       
        new maplibregl.Marker()
            .setLngLat([112.1814, -8.0972])
            .addTo(map.current);

       
        const coordinates = [
            [112.177, -8.095],
            [112.185, -8.095],
            [112.185, -8.099],
            [112.177, -8.099],
            [112.177, -8.095]
        ];

    
        map.current.on('load', () => {
            map.current.addSource('kuningan-polygon', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [coordinates]
                    }
                }
            });

            map.current.addLayer({
                'id': 'kuningan-polygon',
                'type': 'fill',
                'source': 'kuningan-polygon',
                'layout': {},
                'paint': {
                    'fill-color': '#088', 
                    'fill-opacity': 0.5
                }
            });

            map.current.addLayer({
                'id': 'kuningan-polygon-outline',
                'type': 'line',
                'source': 'kuningan-polygon',
                'layout': {},
                'paint': {
                    'line-color': '#088',
                    'line-width': 2
                }
            });
        });

        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);

    return (
        <>
            <Head title="Kuningan | Peta Digital" />
            <div>
                <Navbar />
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <div className="w-full rounded-lg bg-outline-gray p-3 flex">
                        <Link href={route('home')}>
                            <Icon
                                icon={"ic:round-home"}
                                className="text-primary-orange text-2xl"
                            />
                        </Link>
                        / Peta Digital
                    </div>
                    <h3 className="text-4xl text-primary-orange font-semibold">
                        Peta Digital
                    </h3>
                </section>
                <main className="container gap-4 mx-auto lg:px-10 md:px-8 px-4 py-10">
                    <div ref={mapContainer} className="map-container" style={{ height: "500px" }} />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Peta;
