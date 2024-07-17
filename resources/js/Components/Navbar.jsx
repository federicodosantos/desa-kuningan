import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo-desa.png";
import { Link } from "@inertiajs/react";



const Navbar = ({ scrollInteraction = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (!scrollInteraction) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollInteraction]);

    return (
        <nav
            className={`w-full ${scrollInteraction?'fixed':'sticky'} top-0 py-4 z-50 transition-colors duration-300 ${
                scrollInteraction
                    ? isScrolled
                        ? "bg-primary-orange text-text-white"
                        : "bg-transparent text-text-white"
                    : "bg-primary-orange text-text-white"
            }`}
        >
            <div className="container mx-auto lg:px-10 md:px-8 px-4 flex w-full justify-between items-center">
                <div className="flex items-center gap-5">
                    <img
                        src={Logo}
                        alt="logo_image"
                        draggable="false"
                        className="w-16"
                    />
                    <div className="flex flex-col">
                        <h1
                            className={`font-semibold`}
                        >
                            Desa Kuningan
                        </h1>
                        <p
                           
                        >
                            Kabupaten Blitar
                        </p>
                    </div>
                </div>
                <ul className="flex gap-8 font-semibold relative">
                    <li
                        className={`relative group`}
                    >
                        Profil Desa
                        <ul className="absolute left-0  w-48 bg-white text-black shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                            <Link   href={route('tentang')} className="px-4 py-2 hover:bg-gray-100">Tentang Kami</Link>
                            <li className="px-4 py-2 hover:bg-gray-100">Visi Misi</li>
                            <li className="px-4 py-2 hover:bg-gray-100">Sejarah</li>
                            <li className="px-4 py-2 hover:bg-gray-100">Geografis</li>
                            <Link href={route('demografis')} className="px-4 py-2 hover:bg-gray-100">Demografis</Link>
                        </ul>
                    </li>
                    <li
                        className={`relative group `}
                    >
                        Struktur
                        <ul className="absolute left-0 w-48 bg-white text-black shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                            <li className="px-4 py-2 hover:bg-gray-100">Struktur Organisasi</li>
                            <li className="px-4 py-2 hover:bg-gray-100">Perangkat Desa</li>
                        </ul>
                    </li>
                    <li
                        className={`relative group`}
                    >
                        Informasi Publik
                        <ul className="absolute left-0 w-48 bg-white text-black shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                            <li className="px-4 py-2 hover:bg-gray-100">Sarana dan Prasarana</li>
                            <Link href={route('berita')} className="px-4 py-2 hover:bg-gray-100">Berita Desa</Link>
                        </ul>
                    </li>
                    <li
                        className={`relative group`}
                    >
                        Potensi
                        <ul className="absolute right-0 w-48 bg-white text-black shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                            <Link href={route('peta')} className="px-4 py-2 hover:bg-gray-100">Peta Digital</Link>
                            <li className="px-4 py-2 hover:bg-gray-100">Tempat Wisata</li>
                            <li className="px-4 py-2 hover:bg-gray-100">UMKM</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};


export default Navbar;
