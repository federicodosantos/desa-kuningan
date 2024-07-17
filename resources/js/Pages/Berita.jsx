import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Icon } from "@iconify/react";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import Breadcrumbs from "@/Components/Breadcrumbs";
import NewsCard from "@/Components/NewsCard";
import Header from "../../assets/detailBerita.jpg";
import Pagination from "@/Components/Pagination";

const Berita = ({ news }) => {
    return (
        <>
            <Head title="Kuningan | Tentang" />
            <div className="bg-text-white">
                <Navbar />
                <header className="relative h-[60vh] overflow-hidden ">
                    <img
                        src={Header}
                        alt=""
                        className="size-full object-cover"
                    />
                    <div className="absolute top-0 left-0 size-full bg-black text-6xl font-semibold text-text-white  flex justify-center items-center bg-opacity-50">
                        Berita Desa Kuningan
                    </div>
                </header>
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Berita" },
                        ]}
                    />
                    <h3 className="text-4xl text-primary-orange font-semibold">
                        Berita Terkini
                    </h3>
                </section>
                <main className="grid md:grid-cols-2 grid-cols-1  mx-auto lg:px-10 md:px-8 px-4 container lg:grid-cols-3 grid-rows-1 gap-8 py-8">
                    {news.data.map((item, index) => (
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
                <div className="mx-auto lg:px-10 md:px-8 px-4 container pb-8">
                    <Pagination
                        links={news.links}
                        from={news.from}
                        to={news.to}
                        total={news.total}
                    />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Berita;
