import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo-desa.png";
import { Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";

const Navbar = ({ scrollInteraction = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        if (!scrollInteraction) return;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollInteraction]);

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const navItems = [
        {
            name: "Profil Desa",
            items: [
                { name: "Tentang Kami", route: "tentang" },
                { name: "Visi Misi", route: "visiMisi" },
                { name: "Sejarah", route: "sejarah" },
                { name: "Demografi", route: "demografi" },
            ],
        },
        {
            name: "Informasi Publik",
            items: [
                { name: "Sarana dan Prasarana", route: "sarana" },
                { name: "Berita Desa", route: "berita" },
            ],
        },
        {
            name: "Potensi",
            items: [
                { name: "Peta Digital", route: "peta" },
                { name: "Tempat Wisata", route: "pariwisata" },
                { name: "UMKM", route: "umkm" },
            ],
        },
        { name: "Struktur", route: "struktur" },
       
    ];

    return (
        <nav
            className={`w-full
                ${
                    scrollInteraction
                        ? isScrolled || isMenuOpen
                            ? "bg-primary-orange text-text-white "
                            : "bg-transparent text-text-white"
                        : "bg-primary-orange text-text-white"
                }
                ${
                    scrollInteraction && !isMenuOpen
                        ? "transition-colors duration-300"
                        : ""
                }
                ${
                scrollInteraction ? "fixed" : "sticky"
            } top-0 py-4 z-50 `}
        >
            <div className="container mx-auto lg:px-10 md:px-8 px-4 relative flex justify-between items-center">
                <Link href={route('home')} className="flex items-center lg:gap-5 gap-2">
                    <img
                        src={Logo}
                        alt="logo_image"
                        draggable="false"
                        className="lg:w-16 w-9"
                    />
                    <div className="flex flex-col lg:text-base text-xs">
                        <h1 className="font-semibold">Desa Kuningan</h1>
                        <p>Kabupaten Blitar</p>
                    </div>
                </Link>
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white"
                    >
                        <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} className="text-3xl" />
                    </button>
                </div>
                <ul className="lg:flex hidden gap-8 font-semibold">
                    {navItems.map((item, index) => (
                        <li key={index} className="relative group flex gap-1 items-center">
                            {item.route ? (
                                <Link href={route(item.route)}>{item.name}</Link>
                            ) : (
                                <p>{item.name}</p>
                            )}
                            {item.items && (
                                <>
                                    <Icon
                                        icon="ri:arrow-up-s-fill"
                                        className="rotate-180 group-hover:rotate-0 duration-500 ease-in-out text-xl"
                                    />
                                    <ul className="absolute bottom-0 translate-y-full left-0 flex flex-col w-48 bg-white text-black shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                                        {item.items.map((subItem, subIndex) => (
                                            <Link
                                                key={subIndex}
                                                href={route(subItem.route)}
                                                className="px-4 py-2 hover:bg-gray-100"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                {isMenuOpen && (
    <div className="lg:hidden absolute top-full translate-y-4 left-0 w-full bg-primary-orange text-white shadow-lg">
        <ul className="flex flex-col gap-2 p-4 text-sm">
            {navItems.map((item, index) => (
                <li key={index} className="relative flex flex-col gap-1 items-start">
                    {item.items ? (
                        <>
                            <button
                                onClick={() => toggleDropdown(item.name)}
                                className="flex justify-between items-center w-full py-2"
                            >
                                {item.name}
                                <Icon
                                    icon="ri:arrow-up-s-fill"
                                    className={`text-xl transition-transform duration-300 ${
                                        openDropdown === item.name ? "rotate-0" : "rotate-180"
                                    }`}
                                />
                            </button>
                            {openDropdown === item.name && (
                                <ul className="flex flex-col w-full bg-white text-black shadow-inner rounded-lg py-2 mt-1">
                                    {item.items.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            href={route(subItem.route)}
                                            className="px-4 py-2 hover:bg-gray-100"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </>
                    ) : (
                        <Link
                            href={item.route ? route(item.route) : '#'}
                            className="w-full py-2"
                        >
                            {item.name}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    </div>
)}
            </div>
        </nav>
    );
};

export default Navbar;