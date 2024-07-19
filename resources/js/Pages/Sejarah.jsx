import Breadcrumbs from "@/Components/Breadcrumbs";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Navbar from "@/Components/Navbar";
import ImgHeader from "../../assets/ProfileDesaHeader.jpg";
import { Icon } from "@iconify/react";
import { Head, Link } from "@inertiajs/react";

import React from "react";

const Sejarah = () => {
    return (
        <>
            <Head title="Kuningan | Tentang" />
            <div>
                <Navbar />
                <Header img={ImgHeader} title={"Profil Desa"} />
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Profil Desa" },
                            { label: "Sejarah" },
                        ]}
                    />

                    <h3 className="lg:text-5xl text-3xl text-primary-orange font-semibold">
                    Sejarah
                    </h3>
                <main className=" prose-sm">
                    <p>Desa Kuningan, yang terletak di Kecamatan Kanigoro, Kabupaten Blitar, Jawa Timur, memiliki sejarah yang kaya dan beragam. Nama "Kuningan" diyakini berasal dari kata "kuning," yang mungkin merujuk pada warna atau benda yang bernilai. Pengaruh Hindu-Budha dan Islam sangat kuat dalam membentuk budaya dan tradisi desa ini. Pada masa kejayaan kerajaan-kerajaan seperti Kediri dan Majapahit, desa ini mungkin menjadi bagian dari wilayah yang penting. Penyebaran Islam oleh para Wali Songo pada abad ke-15 dan 16 juga meninggalkan jejak yang dalam, yang masih dapat dilihat dalam tradisi keagamaan dan situs-situs religi setempat.</p>
                    <p>Pada era kolonial, Desa Kuningan mengalami perubahan signifikan dalam struktur administrasi dan ekonomi, dengan pengenalan infrastruktur seperti jalan dan irigasi. Setelah Indonesia merdeka pada tahun 1945, program pembangunan desa membawa kemajuan dalam berbagai aspek, termasuk pendidikan, kesehatan, dan infrastruktur. Saat ini, Desa Kuningan dikenal dengan potensi pariwisata religi dan pertaniannya, yang mencakup makam-makam keramat, pondok pesantren, dan perkebunan yang menarik. Upaya modernisasi dan digitalisasi, seperti yang dilakukan oleh Kelompok KKN, bertujuan untuk mempromosikan dan mengembangkan potensi-potensi ini, memastikan bahwa desa ini terus berkembang sambil mempertahankan nilai-nilai tradisionalnya.</p>
                    
                </main>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Sejarah;
