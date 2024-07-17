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

const carouselItem = [
    {
        image: carousel1,
        headline: "Selamat Datang di Website Resmi Desa Kuningan Jawa Timur",
        paragraph: "Akses informasi terbaru tentang Desa Kuningan",
    },
    {
        image: carousel2,
        headline:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quidem delectus quaerat laudantium eaque, assumenda fugiat voluptate doloribus est deserunt!",
        paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
        image: carousel3,
        headline:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dignissimos, accusantium inventore tenetur eos porro recusandae placeat odit?",
        paragraph:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia!",
    },
];
const Home = ({news}) => {

    console.log(news)
    return (
        <>
            <Head title="Kuningan | Home" />
            <div className="bg-text-white">
                <Navbar scrollInteraction={true} />
                <div className="h-screen relative">
                    <Splide
                        className="h-full"
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
                        <h1 className="text-6xl font-semibold lg:w-3/5 text-center ">
                            Selamat Datang di Website Resmi Desa Kuningan Jawa
                            Timur
                        </h1>
                        <p className="text-base">
                            Akses informasi terbaru tentang Desa Kuningan
                        </p>
                    </div>
                </div>

                <section className="flex items-center py-20">
                    <main className="container mx-auto  lg:px-10 md:px-8 px-4 flex items-center justify-between">
                        <div className="w-2/6">
                            <img
                                src={kepsek}
                                className="w-full h-auto aspect-square rounded-full object-cover"
                                alt="Kepala Desa"
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-3/5">
                            <h2 className="text-5xl text-primary-orange font-semibold">
                                Sambutan Kepala Desa
                            </h2>
                            <div className="prose-sm">
                                <p>
                                    Assalamu'alaikum Warahmatullahi Wabarakatuh,
                                </p>

                                <p>
                                    Alhamdulillah, puji Syukur kita panjatkan
                                    kehadirat Allah SWT, karena atas limpahan
                                    Rahmat dan Hidayah-Nya, sehingga Pemerintah
                                    Desa Pao-Pao dapat mempersembahkan pelayanan
                                    masyarakat berbasis digital kepada seluruh
                                    masyarakat Desa Pao-Pao. Kami bangga bahwa
                                    Pelayanan yang kami persembahkan adalah
                                    merupakan Visi Desa Pao-Pao Tahun 2017-2023
                                    yaitu Meningkatkan Daya Saing Menuju
                                    Masyarakat Desa Pao-Pao yang Mandiri
                                    Bernafaskan Keagamaan.
                                </p>

                                <p>
                                    Wassalamu'alaikum Warahmatullahi
                                    Wabarakatuh.
                                </p>

                                <p>Hormat kami,</p>

                                <p>
                                    <strong>Federico Roberto Dos Santos</strong>
                                    <br />
                                    Kepala Desa Kuningan, Jawa Timur
                                </p>
                            </div>
                        </div>
                    </main>
                </section>
                <section className="container mx-auto lg:px-10 md:px-8 px-4">
                    <div className="flex flex-col gap-3 border-b pb-4 ">
                        <h1 className="text-4xl font-semibold text-primary-orange">
                            Berita Terkini
                        </h1>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                    <main className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-8 py-8">
                       {
                        news.map((item,index)=>(
                            <NewsCard key={index} img={item.photo_path} date={item.formatted_date} title={item.title} body={item.content} id={item.id} slug={item.slug} to={route('detailBerita',item.slug)}/>

                        ))
                       }
                    </main>
                </section>
                <section className="container mx-auto lg:px-10 md:px-8 px-4">
                    <div className="flex flex-col gap-3 border-b pb-4">
                        <h1 className="text-4xl font-semibold text-primary-orange">
                            Perangkat Desa
                        </h1>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                    <Splide
                        className="py-8"
                        options={{
                            perPage: 4,
                            gap: 20,
                        }}
                    >
                        <SplideSlide>
                            <div className="bg-gray-300 aspect-[10/14] rounded-lg">
                                <img
                                    src={kepsek}
                                    className="size-full object-cover"
                                    alt=""
                                />
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="bg-gray-300 aspect-[10/14] rounded-lg">
                                <img
                                    src={kepsek}
                                    className="size-full object-cover"
                                    alt=""
                                />
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="bg-gray-300 aspect-[10/14] rounded-lg">
                                <img
                                    src={kepsek}
                                    className="size-full object-cover"
                                    alt=""
                                />
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="bg-gray-300 aspect-[10/14] rounded-lg">
                                <img
                                    src={kepsek}
                                    className="size-full object-cover"
                                    alt=""
                                />
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="bg-gray-300 aspect-[10/14] rounded-lg">
                                <img
                                    src={kepsek}
                                    className="size-full object-cover"
                                    alt=""
                                />
                            </div>
                        </SplideSlide>
                    </Splide>
                </section>
                <section className="container mx-auto lg:px-10 md:px-8 px-4">
                    <div className="flex flex-col gap-3 border-b pb-4 ">
                        <h1 className="text-4xl font-semibold text-primary-orange">
                            Geografis Desa
                        </h1>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                    <main className="py-8">
                        Lorem ipsum dolor sit amet consectetur. Blandit enim
                        vulputate fringilla mattis. Nisl donec id sed proin in.
                        Odio aliquet faucibus maecenas adipiscing volutpat eget.
                        Nunc feugiat libero purus aliquam nibh. Morbi facilisis
                        blandit quis sagittis gravida auctor lobortis ut.
                        Praesent mi tempor nisl sed in dictumst viverra nam.
                        Lorem suspendisse pretium posuere vivamus odio proin
                        non. Ultrices vitae metus hendrerit sagittis turpis
                        aenean elit nec. Vulputate faucibus penatibus cum
                        egestas parturient. Hac nisi euismod sapien tempor odio
                        odio massa phasellus. Vitae molestie diam sit viverra at
                        nulla. Sit risus eu quisque sed gravida. Sed sit amet ut
                        vulputate diam dignissim ultricies scelerisque. In
                        interdum eu morbi laoreet sed pharetra id. Vitae ut urna
                        consequat in fermentum scelerisque amet donec.
                    </main>
                </section>
                <Footer />
            </div>
        </>
    );
};

export default Home;
