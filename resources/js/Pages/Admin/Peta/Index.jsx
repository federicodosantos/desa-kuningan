import React, { useEffect, useRef, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Breadcrumbs from "@/Components/Breadcrumbs";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { polygonCoordinates } from "@/Data/polygon";
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point, polygon } from '@turf/helpers';
import Toast from "@/Components/Toast";

const Index = ({ auth }) => {
    const { delete: destroy } = useForm();
    const page = usePage();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(112.1828);
    const [lat] = useState(-8.115194);
    const [zoom] = useState(13.5);
    const [clickedLat, setClickedLat] = useState('');
    const [clickedLng, setClickedLng] = useState('');
    const [error, setError] = useState('');

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

           
            map.current.on('click', (e) => {
                const clickPoint = point([e.lngLat.lng, e.lngLat.lat]);
                const polygonArea = polygon([polygonCoordinates]);

                if (!booleanPointInPolygon(clickPoint, polygonArea)) {
                    setError('Pilih area di dalam area warna orange');
                    return;
                }

                setClickedLat(e.lngLat.lat.toFixed(6));
                setClickedLng(e.lngLat.lng.toFixed(6));
                setError('');

           
                if (map.current.getLayer('clicked-point')) {
                    map.current.removeLayer('clicked-point');
                }
                if (map.current.getSource('clicked-point')) {
                    map.current.removeSource('clicked-point');
                }

             
                map.current.addSource('clicked-point', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [e.lngLat.lng, e.lngLat.lat]
                        }
                    }
                });

                map.current.addLayer({
                    'id': 'clicked-point',
                    'type': 'circle',
                    'source': 'clicked-point',
                    'paint': {
                        'circle-radius': 6,
                        'circle-color': '#FF0000'
                    }
                });
            });
        });
    }, [lng, lat, zoom]);

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
                    <aside ref={mapContainer} className="w-2/5 map-container aspect-square bg-white rounded-lg">
                    </aside>
                    <div className="w-3/5 p-3 bg-white rounded-md">
       
                        {error && <Toast  type="error" autoHide={false} message={error}/>}
                        <form action="">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="latitude">Latitude</label>
                                    <input 
                                        type="text" 
                                        id="latitude"
                                        name="latitude"
                                        disabled
                                        value={clickedLat}
                                    
                                        className="border rounde p-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="longitude">Longitude</label>
                                    <input 
                                        type="text" 
                                        id="longitude"
                                        name="longitude"
                                        disabled
                                        value={clickedLng}
                                    
                                        className="border rounded p-2"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;
