import React from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import carousel1 from "../../assets/carousel_1.jpg";
import carousel2 from "../../assets/carousel_2.jpg";
import carousel3 from "../../assets/carousel_3.jpg";
import kepsek from "../../assets/kepsek.jpg";
import Footer from "@/Components/Footer";
import { Icon } from "@iconify/react";
import NewsCard from "@/Components/NewsCard";
import Geografis from "@/Section/Home/Geografis";

const carouselItem = [
    {
        image: carousel1,
   },
    {
        image: carousel2,
    },
    {
        image: carousel3,
    },
];
const Home = ({ news ,perangkatDesa}) => {
 
    return (
        <>
            <Head title="Kuningan | Home" />
            <div className="bg-text-white">
                <Navbar scrollInteraction={true} />
                <div className="h-screen relative">
                    <Splide
                        className="h-screen"
                        options={{
                            autoplay: true,
                            rewind: true,
                            interval: 3000,
                        }}
                    >
                        {carouselItem.map((item, index) => (
                            <SplideSlide
                                key={index}
                                className="h-screen relative"
                            >
                                <img
                                    src={item.image}
                                    alt={item.image}
                                    className="size-full object-cover"
                                />
                            </SplideSlide>
                        ))}
                    </Splide>
                    <div className="absolute size-full top-0 bg-black bg-opacity-40 gap-4 text-text-white flex flex-col justify-center items-center">
                        <h1 className="lg:text-6xl text-3xl font-semibold lg:w-3/5 text-center ">
                            Selamat Datang di Website Resmi Desa Kuningan Jawa
                            Timur
                        </h1>
                        <p className="text-base lg:text-lg text-center">
                            Akses informasi terbaru tentang Desa Kuningan
                        </p>
                    </div>
                </div>

                <section className="flex  items-center py-10 lg:py-20">
                    <main className="container mx-auto  lg:px-10 md:px-8 gap-3 px-4 flex lg:flex-row flex-col items-center justify-between">
                        <div className="lg:w-2/6 w-5/6">
                            <img
                                src={kepsek}
                                className="w-full h-auto aspect-square rounded-full object-cover"
                                alt="Kepala Desa"
                            />
                        </div>
                        <div className="flex flex-col gap-3 lg:w-3/5">
                            <h2 className="lg:text-5xl text-3xl text-primary-orange font-semibold">
                                Sambutan Kepala Desa
                            </h2>
                            <h5 className="lg:text-lg text-base font-semibold">
                                Bapak Sholkan
                            </h5>
                            <div className="prose-sm lg:text-base text-sm text-justify">
                                <p>
                                    Assalamu'alaikum Warahmatullahi Wabarakatuh,
                                </p>

                                <p>
                                    Dengan rasa syukur yang mendalam, saya
                                    selaku Kepala Desa Kuningan, Kecamatan
                                    Kanigoro, Kabupaten Blitar, menyambut
                                    kehadiran Anda di website resmi Desa
                                    Kuningan. Website ini kami dedikasikan
                                    sebagai sarana informasi dan komunikasi yang
                                    efektif bagi seluruh warga desa serta para
                                    pengunjung yang ingin mengenal lebih dekat
                                    Desa Kuningan. Melalui platform ini, kami
                                    berharap dapat memberikan layanan yang
                                    transparan dan mudah diakses, serta
                                    mendukung keterbukaan informasi publik yang
                                    akan meningkatkan partisipasi aktif
                                    masyarakat dalam pembangunan desa.
                                </p>
                                <p>
                                    Desa Kuningan memiliki potensi dan kekayaan
                                    budaya yang luar biasa, serta masyarakat
                                    yang ramah dan bersemangat dalam menjaga
                                    kearifan lokal. Dengan adanya website ini,
                                    kami berharap dapat lebih mengoptimalkan
                                    potensi desa, baik dari segi pariwisata,
                                    ekonomi, maupun sosial. Semoga website ini
                                    menjadi jembatan penghubung yang efektif
                                    antara pemerintah desa dan masyarakat, serta
                                    menjadi sumber inspirasi bagi kita semua
                                    untuk terus bekerja sama membangun Desa
                                    Kuningan yang lebih maju dan sejahtera.
                                    Terima kasih atas dukungan dan
                                    partisipasinya.
                                </p>

                                <p>
                                    Wassalamu'alaikum Warahmatullahi
                                    Wabarakatuh.
                                </p>
                            </div>
                        </div>
                    </main>
                </section>
                <section className="container mx-auto lg:px-10 md:px-8 px-4">
                    <div className="flex flex-col gap-3 border-b pb-4 ">
                        <h1 className="lg:text-5xl text-3xl font-semibold text-primary-orange">
                            Berita Terkini
                        </h1>
                        <p className="lg:text-base text-sm">
                            Baca berita terkini tentang Desa Kuningan dan
                            dapatkan informasi terbaru.
                        </p>
                    </div>
                    <main className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-8 py-8">
                        {news.map((item, index) => (
                            <NewsCard
                                key={index}
                                img={item.photo_path}
                                date={item.formatted_date}
                                title={item.title}
                                body={item.content}
                                id={item.id}
                                slug={item.slug}
                                to={route("detailBerita", item.slug)}
                            />
                        ))}
                    </main>
                </section>
                <section className="container mx-auto lg:px-10 md:px-8 px-4">
                    <div className="flex flex-col gap-3 border-b pb-4">
                        <h1 className="lg:text-5xl text-3xl font-semibold text-primary-orange">
                            Struktur Lembaga Desa
                        </h1>
                        <p className="lg:text-base text-sm">
                            Struktur Organisasi dan Tata Kerja Desa Kuningan
                        </p>
                    </div>
                    <Splide
                        className="py-8"
                        options={{
                          
                            gap: "20px",
                            breakpoints: {
                                3200: {
                                    perPage: 4,
                                },
                                768: {
                                    perPage: 1,
                                },
                            },
                        }}
                    >
                        {
                            perangkatDesa.data.map((item,i)=>(

                        <SplideSlide key={i}>
                            <div className="bg-gray-300 overflow-hidden aspect-[10/14] relative rounded-lg">
                                <img
                                    src={item.photo_path}
                                    className="size-full  object-cover"
                                    alt={'foto '+item.name}
                                    draggable='false'
                                />
                                <div className="p-3 bg-primary-orange w-full bg-opacity-70 flex flex-col gap-1 absolute bottom-0 right-0">
                                    <h1 className="text-base font-semibold text-text-white text-center">{item.name}</h1>
                                    <p className="text-xs  text-text-white text-center">{item.position.name}</p>

                                </div>
                            </div>
                        </SplideSlide>
                            ))
                        }
                  
                    </Splide>
                </section>
                <Geografis />

                <Footer />
            </div>
        </>
    );
};

export default Home;
