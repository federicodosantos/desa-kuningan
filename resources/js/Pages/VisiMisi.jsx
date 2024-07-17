import Breadcrumbs from "@/Components/Breadcrumbs";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Navbar from "@/Components/Navbar";
import ImgHeader from "../../assets/ProfileDesaHeader.jpg";
import { Icon } from "@iconify/react";
import { Head, Link } from "@inertiajs/react";
import Logo from "../../assets/logo-desa.png";
import React from "react";

const VisiMisi = () => {
    return (
        <>
            <Head title="Kuningan | Visi Misi" />
            <div className="bg-text-white">
                <Navbar />
                <Header img={ImgHeader} title={"Tentang Desa Kuningan"} />
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Profil Desa" },
                            { label: "Visi dan Misi" },
                        ]}
                    />

                    <main className="flex justify-between items-center">
                        <div className="w-2/6 flex flex-col  gap-4">
                            <img
                                src={Logo}
                                alt="logo"
                                draggable="false"
                                className="w-3/5  aspect-auto mx-auto"
                            />
                            <h2 className="text-center text-2xl font-semibold">
                                Desa Kuningan
                            </h2>
                            <div>
                            <p className="font-semibold text-lg text-center">
                                Kecamatan Kanigoro, Kabupaten Blitar, 
                            </p>
                            <p className="font-semibold text-lg text-center">Provinsi Jawa Timur</p>

                            </div>
                        </div>
                        <div className="w-3/5 flex flex-col gap-6 ">
                            <div className="text-center flex flex-col gap-3">
                                <h1 className="text-4xl   font-semibold text-primary-orange">
                                    Visi
                                </h1>
                                <p className="text-base">
                                    Mewujudkan Masyarakat Desa Kuningan yang
                                    maju dan sejahtera
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h1 className="text-4xl text-center  font-semibold text-primary-orange">
                                    Misi
                                </h1>
                                <ol className="text-base list-decimal text-justify">
                                    <li>
                                        Mewujudkan Tata Kelola Pemerintah Desa
                                        yang baik
                                    </li>
                                    <li>
                                        Meningkatkan pembangunan infrastruktur
                                        yang mendukung perekonomian Masyakat
                                        desa, seperti jalan, jembatan serta
                                        infrastruktur strategis lainnya
                                    </li>
                                    <li>
                                        Meningkatkan pembangunan di bidang
                                        kesehatan untuk mendorong derajat
                                        kesehatan masyarakat agar dapat bekerja
                                        lebih optimal dan memiliki harapan hidup
                                        yang lebih panjang, serta wujud Desa
                                        Sehat sejahtera
                                    </li>
                                    <li>
                                        Meningkatkan pembangunan di bidang
                                        pendidikan untuk mendorong peningkatan
                                        kualitas sumber daya manusia agar
                                        memiliki kecerdasan dan daya saing yang
                                        lebih baik
                                    </li>
                                    <li>
                                        Meningkatan Pertumbuhan ekonomi
                                        Masyarakat Melalui Peningkatan
                                        Pendapatan Keluaraga dan Peningkatan
                                        Ekonomi Lokal dengan pengembangan Badan
                                        Usaha Milik Desa serta Peningkatan
                                        Industri rumahan dan UMKM
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </main>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default VisiMisi;
