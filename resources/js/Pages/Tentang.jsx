import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Icon } from "@iconify/react";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const Tentang = () => {
    return (
        <>
            <Head title="Kuningan | Tentang" />
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
                        / Tentang Kami
                    </div>
                    <h3 className="text-4xl text-primary-orange font-semibold">
                        Tentang Kami
                    </h3>
                </section>
                <main className="container gap-4 mx-auto lg:px-10 md:px-8 px-4 py-10 prose-base prose-ul:list-disc">
                    <h2>Tentang Desa Kuningan</h2>
                    <p>
                        Desa Kuningan terletak di Kecamatan Kanigoro, Kabupaten
                        Blitar, Jawa Timur. Desa ini dikenal dengan pemandangan
                        alam yang asri dan suasana pedesaan yang damai.
                        Masyarakatnya yang ramah dan penuh kekeluargaan
                        menjadikan desa ini tempat yang nyaman untuk dikunjungi.
                    </p>
                    <p>
                        Desa Kuningan memiliki berbagai potensi alam yang
                        memikat, mulai dari persawahan yang hijau hingga
                        perkebunan yang subur. Keindahan alamnya tidak hanya
                        memanjakan mata, tetapi juga memberikan banyak sumber
                        penghidupan bagi warganya.
                    </p>
                    <h2>Keunggulan Desa Kuningan</h2>
                    <ul>
                        <li>
                            Potensi pertanian dan perkebunan yang sangat besar
                        </li>
                        <li>Kebudayaan dan tradisi yang masih terjaga</li>
                        <li>Masyarakat yang ramah dan gotong royong</li>
                        <li>Keindahan alam yang memikat</li>
                    </ul>
                    <h2>
                        Kegiatan dan Acara
                    </h2>
                    <p >
                        Desa Kuningan memiliki berbagai kegiatan dan acara yang
                        menjadi daya tarik tersendiri, mulai dari festival
                        budaya, acara panen raya, hingga kegiatan gotong royong
                        yang melibatkan seluruh warga.
                    </p>
                    <p >
                        Kegiatan-kegiatan ini tidak hanya mempererat tali
                        silaturahmi antar warga, tetapi juga memperkenalkan
                        kebudayaan desa kepada pengunjung dari luar.
                    </p>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Tentang;
