import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo-desa.png";
import { Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";

const Navbar = ({ scrollInteraction = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            className={`w-full ${scrollInteraction ? 'fixed' : 'sticky'} top-0 py-4 z-50 transition-colors duration-300 ${
                scrollInteraction
                    ? isScrolled
                        ? "bg-primary-orange text-text-white"
                        : "bg-transparent text-text-white"
                    : "bg-primary-orange text-text-white"
            }`}
        >
            <div className="container mx-auto lg:px-10 md:px-8 px-4 flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <img
                        src={Logo}
                        alt="logo_image"
                        draggable="false"
                        className="w-16"
                    />
                    <div className="flex flex-col">
                        <h1 className={`font-semibold`}>
                            Desa Kuningan
                        </h1>
                        <p>
                            Kabupaten Blitar
                        </p>
                    </div>
                </div>
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white"
                    >
                        <Icon icon="mdi:menu" className="text-3xl" />
                    </button>
                </div>
                <ul className={`lg:flex hidden gap-8 font-semibold`}>
                    <li className={`relative group flex gap-1 items-center`}>
                        <p>Profil Desa</p>
                        <Icon icon={'ri:arrow-up-s-fill'} className="rotate-180 group-hover:rotate-0 duration-500 ease-in-out text-xl"/>
                        <ul className="absolute bottom-0 translate-y-full left-0 flex flex-col w-48 bg-white text-black shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                            <Link href={route('tentang')} className="px-4 py-2 hover:bg-gray-100">Tentang Kami</Link>
                            <Link href={route('visiMisi')} className="px-4 py-2 hover:bg-gray-100">Visi Misi</Link>
                            <Link href={route('sejarah')} className="px-4 py-2 hover:bg-gray-100">Sejarah</Link>
                            <Link href={route('demografis')} className="px-4 py-2 hover:bg-gray-100">Demografis</Link>
                        </ul>
                    </li>
                    <li className={`relative group flex gap-1 items-center`}>
                        <p>Informasi Publik</p>
                        <Icon icon={'ri:arrow-up-s-fill'} className="rotate-180 group-hover:rotate-0 duration-500 ease-in-out text-xl"/>
                        <ul className="absolute bottom-0 translate-y-full left-0 flex flex-col w-48 bg-white text-black shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                            <Link href={route('sarana')} className="px-4 py-2 hover:bg-gray-100">Sarana dan Prasarana</Link>
                            <Link href={route('berita')} className="px-4 py-2 hover:bg-gray-100">Berita Desa</Link>
                        </ul>
                    </li>
                    <li className={`relative group flex gap-1 items-center`}>
                        <p>Potensi</p>
                        <Icon icon={'ri:arrow-up-s-fill'} className="rotate-180 group-hover:rotate-0 duration-500 ease-in-out text-xl"/>
                        <ul className="absolute bottom-0 translate-y-full right-0 flex flex-col w-48 bg-white text-black shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                            <Link href={route('peta')} className="px-4 py-2 hover:bg-gray-100">Peta Digital</Link>
                            <Link href={route('pariwisata')} className="px-4 py-2 hover:bg-gray-100">Tempat Wisata</Link>
                            <Link href={route('umkm')} className="px-4 py-2 hover:bg-gray-100">UMKM</Link>
                        </ul>
                    </li>
                    <Link href={route('struktur')} className="px-4">Struktur</Link>
                    <p className="px-4">Pengaduan</p>
                </ul>
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-16 left-0 w-full bg-primary-orange text-white shadow-lg rounded-lg">
                        <ul className="flex flex-col gap-4 p-4">
                            <li className={`relative group flex flex-col gap-1 items-start`}>
                                <p>Profil Desa</p>
                                <ul className="flex flex-col w-full bg-white text-black shadow-lg rounded-lg py-2">
                                    <Link href={route('tentang')} className="px-4 py-2 hover:bg-gray-100">Tentang Kami</Link>
                                    <Link href={route('visiMisi')} className="px-4 py-2 hover:bg-gray-100">Visi Misi</Link>
                                    <Link href={route('sejarah')} className="px-4 py-2 hover:bg-gray-100">Sejarah</Link>
                                    <Link href={route('demografis')} className="px-4 py-2 hover:bg-gray-100">Demografis</Link>
                                </ul>
                            </li>
                            <li className={`relative group flex flex-col gap-1 items-start`}>
                                <p>Informasi Publik</p>
                                <ul className="flex flex-col w-full bg-white text-black shadow-lg rounded-lg py-2">
                                    <li className="px-4 py-2 hover:bg-gray-100">Sarana dan Prasarana</li>
                                    <Link href={route('berita')} className="px-4 py-2 hover:bg-gray-100">Berita Desa</Link>
                                </ul>
                            </li>
                            <li className={`relative group flex flex-col gap-1 items-start`}>
                                <p>Potensi</p>
                                <ul className="flex flex-col w-full bg-white text-black shadow-lg rounded-lg py-2">
                                    <Link href={route('peta')} className="px-4 py-2 hover:bg-gray-100">Peta Digital</Link>
                                    <li className="px-4 py-2 hover:bg-gray-100">Tempat Wisata</li>
                                    <li className="px-4 py-2 hover:bg-gray-100">UMKM</li>
                                </ul>
                            </li>
                            <Link href={route('struktur')} className="px-4 py-2 hover:bg-gray-100">Struktur</Link>
                            <p className="px-4 py-2">Pengaduan</p>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
