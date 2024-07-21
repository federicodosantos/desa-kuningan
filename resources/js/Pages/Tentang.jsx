import Breadcrumbs from "@/Components/Breadcrumbs";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Navbar from "@/Components/Navbar";
import ImgHeader from "../../assets/ProfileDesaHeader.jpg";
import { Icon } from "@iconify/react";
import { Head, Link } from "@inertiajs/react";

import React from "react";

const Tentang = () => {
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
                            { label: "Tentang Kami" },
                        ]}
                    />

                    <h3 className="lg:text-5xl text-3xl text-primary-orange font-semibold">
                        Tentang Kami
                    </h3>
                <main className=" prose-sm text-justify ">
                    <p>Desa Kuningan, terletak di Kabupaten Blitar, adalah sebuah desa yang kaya akan sejarah dan budaya. Dikenal sebagai salah satu desa yang memadukan keindahan alam dengan kearifan lokal, Kuningan menawarkan tempat wisata religi, serta tradisi yang masih terjaga dengan baik. Desa ini merupakan tempat yang sempurna bagi mereka yang ingin merasakan ketenangan pedesaan sambil menikmati pesona wisata religi dan perkebunan.</p>
                    <p>Di Desa Kuningan, pengunjung dapat menemukan berbagai situs bersejarah dan tempat ibadah yang menarik untuk dikunjungi, seperti makam-makam yang memiliki nilai historis dan pondok-pondok pesantren yang terkenal. Selain itu, desa ini juga menawarkan kesempatan untuk menikmati keindahan perkebunan lokal, di mana pengunjung dapat melihat langsung proses bercocok tanam yang menjadi bagian penting dari kehidupan sehari-hari masyarakat setempat.</p>
                    <p>Tidak hanya itu, Desa Kuningan juga sedang mengembangkan potensi pariwisata dan UMKM melalui digitalisasi. Dengan adanya peta digital dan website informatif, pengunjung dapat dengan mudah menemukan berbagai destinasi menarik, mulai dari UMKM lokal hingga homestay yang nyaman. Melalui program-program ini, Desa Kuningan berkomitmen untuk menjadi desa yang berkelanjutan dan semakin dikenal di mata dunia.</p>
                </main>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Tentang;
