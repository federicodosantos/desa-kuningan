import Breadcrumbs from "@/Components/Breadcrumbs";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Navbar from "@/Components/Navbar";
import ImgHeader from "../../assets/StrukturDesa.jpg";
import StrukturIMG from '../../assets/bagan.webp'
import { Icon } from "@iconify/react";
import { Head, Link } from "@inertiajs/react";

import React from "react";

const Struktur = () => {
    return (
        <>
            <Head title="Kuningan | Struktur" />
            <div>
                <Navbar />
                <Header img={ImgHeader} title={"Struktur"} />
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Struktur" },
                        
                        ]}
                    />

                    <h3 className="text-4xl text-primary-orange font-semibold">
                    Struktur
                    </h3>
                <main className="">
                    <img src={StrukturIMG} className="mx-auto aspect-auto w-3/5 " draggable='false' alt="struktur" />
                    
                </main>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Struktur;
