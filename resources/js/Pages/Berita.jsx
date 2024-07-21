import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Icon } from "@iconify/react";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import Breadcrumbs from "@/Components/Breadcrumbs";
import NewsCard from "@/Components/NewsCard";
import HeaderIMG from "../../assets/InformasiPublik.jpg";
import Pagination from "@/Components/Pagination";
import Header from "@/Components/Header";


const Berita = ({ news }) => {


    return (
        <>
            <Head title="Kuningan | Tentang" />
            <div className="bg-text-white">
                <Navbar />
                <Header img={HeaderIMG} title={'Informasi Publik'} />
                <section className="container py-4 lg:py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Berita" },
                        ]}
                    />
                    <h3 className="lg:text-5xl text-3xl text-primary-orange font-semibold">
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
