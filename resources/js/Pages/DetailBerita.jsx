import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Icon } from "@iconify/react";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import HeaderIMG from "../../assets/InformasiPublik.jpg";
import Breadcrumbs from "@/Components/Breadcrumbs";
import Header from "@/Components/Header";
const DetailBerita = ({ news }) => {
    return (
        <>
            <Head title="Kuningan | Tentang" />
            <div className="bg-text-white">
                <Navbar />
                <Header img={HeaderIMG} title={'Berita Desa Kuningan'} />
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Berita" ,
                                href: route("berita")
                            },
                            { label: `${news.slug}`, icon: "" }, 
                        ]}
                    />
                    <h3 className="lg:text-5xl text-3xl text-primary-orange font-semibold">
                    Berita Terkini
                    </h3>
                </section>
                <section className="container gap-4 mx-auto lg:px-10 md:px-8 px-4 pb-10 ">
                    <div className="lg:w-4/6 flex flex-col gap-6 mx-auto">
                        <img
                            src={`http://localhost:8000/${news.photo_path}`}
                            alt="header"
                            draggable="false"
                            className="rounded-md mx-auto aspect-video  w-full object-cover "
                        />
                        <h1 className="lg:text-2xl text-xl  text-text-black  font-semibold">
                            {news.title}
                        </h1>
                        <div className="flex justify-between">
                            <small className="text-text-black flex items-center gap-2">
                                <Icon icon={"mdi:calendar"} />
                                {news.formatted_date}
                            </small>
                            <small className="text-text-black flex items-center gap-2">
                                <Icon icon={"mdi:user"} />
                                {news.user.name}
                            </small>
                        </div>
                        <hr className="border-text-black" />
                        <main
                            className="lg:prose-base prose-sm prose-ul:list-disc"
                            dangerouslySetInnerHTML={{ __html: news.content }}
                        ></main>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
};

export default DetailBerita;
