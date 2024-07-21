import { Icon } from "@iconify/react";
import React from "react";
import logoKuningan from "../../assets/logo-desa.png";
import { Link } from "@inertiajs/react";
const Footer = () => {
    return (
        <footer data-aos="fade-up"
        data-aos-duration="500" className="bg-primary-orange">
            <main className="flex lg:flex-row flex-col container mx-auto lg:px-10 md:px-8 px-4 gap-4 lg:gap-0 justify-between lg:items-center py-10 text-text-white">
                <div className="flex  flex-col gap-5  lg:w-2/5">
                    <div className="flex gap-5 items-center">
                        <img
                            src={logoKuningan}
                            className="w-[25%]"
                            draggable="false"
                            alt="logo_kanigoro"
                        />

                        <div className="flex flex-col gap-1 text-xl lg:text-3xl font-medium">
                            <h3 className="">Desa Kuningan</h3>
                        </div>
                    </div>
                    <p className="text-sm">
                        Jalan Raya Kuningan, Desa Kuningan, Kecamatan Kanigoro,
                        Kabupaten Blitar, Jawa Timur 66171
                    </p>
                    <div className="flex flex-col gap-2 w-fit ">
                        <h3 className="lg:text-xl text-base font-semibold">
                            Waktu Pelayanan
                        </h3>
                        <p className="text-sm">
                            Senin - Jumat : 07.30 - 14.00 WIB
                        </p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 lg:w-3/5 justify-between">
                    <div className="flex flex-col lg:gap-4 gap-2 ">
                        <div className=" flex flex-col gap-1 lg:gap-2 w-fit">
                            <h3 className="text-lg font-semibold">Menu</h3>
                            <hr className="lg:border-t-4 border-t-2 w-20" />
                        </div>

                        <ul className="flex flex-col gap-2 lg:text-base text-sm">
                            <Link href={route('tentang')} className="flex items-center">Profil Desa</Link>
                            <Link href={route('struktur')} className="flex items-center">Struktur Desa</Link>
                            <Link href={route('sarana')} className="flex items-center">
                                Informasi Publik
                            </Link>
                            <Link href={route('peta')} className="flex items-center">Potensi Desa</Link>
                        </ul>
                    </div>
                    <div className="flex flex-col lg:gap-4 gap-2 ">
                        <div className=" flex flex-col gap-1 lg:gap-2 w-fit">
                            <h3 className="text-lg font-semibold">Lainnya</h3>
                            <hr className="lg:border-t-4 border-t-2 w-20" />
                        </div>

                        <ul className="flex flex-col gap-2 lg:text-base text-sm">
                            <a target="_blank" href='https://jadesta.kemenparekraf.go.id/desa/kuningan' className="flex items-center">Jadesta</a>
                            <Link href={route('berita')} className="flex items-center">Berita</Link>
                            <li className="flex items-center">Galeri</li>
                        </ul>
                    </div>
                    <div className="flex flex-col lg:gap-4 gap-2 ">
                        <div className=" flex flex-col lg:gap-2 gap-1 w-fit">
                            <h3 className="text-lg font-semibold">
                                Kontak Kami
                            </h3>
                            <hr className="lg:border-t-4 border-t-2 w-20" />
                        </div>

                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center gap-3">
                                <Icon
                                    className="text-2xl"
                                    icon={"mdi:telephone"}
                                />
                                0858-5512-8982
                            </li>
                            <li className="flex items-center gap-3">
                                <Icon
                                    className="text-2xl"
                                    icon={"ic:outline-email"}
                                />
                                pemdeskuningan17@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <div className="container mx-auto lg:px-10 md:px-8 px-4">
                <hr />
                <div className="text-sm text-text-white py-2 text-center">
                    © 2024. All Rights Reserved. Made by MMD 13 FILKOM UB 2024
                </div>
            </div>
        </footer>
    );
};

export default Footer;
