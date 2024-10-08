import Breadcrumbs from "@/Components/Breadcrumbs";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Navbar from "@/Components/Navbar";
import ImgHeader from "../../assets/ProfileDesaHeader.jpg";
import { Icon } from "@iconify/react";
import { Head, Link } from "@inertiajs/react";
import "@splidejs/react-splide/css";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const UmkmDetail = ({ umkm }) => {




    return (
        <>
            <Head title={'UMKM Detail'}/>
            <div className="bg-text-white">
                <Navbar />
                <Header img={ImgHeader} title={"Potensi Desa"} />
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Potensi Desa" },
                            {
                                href: route("umkm"),
                                label: "UMKM",
                            },
                            { label: umkm.data.name },
                        ]}
                    />

                    <h3 className="lg:text-5xl text-3xl text-primary-orange font-semibold">
                        {umkm.data.name}
                    </h3>
                    <main className="flex lg:flex-row flex-col gap-4">
                        <Splide className="lg:w-1/2">
                            {
                                umkm.data.photos.map((item,i)=>(
                                    <SplideSlide className="w-1/2 aspect-video">
                                        <img src={item.photo_path} className="size-full object-cover" alt="" />

                                    </SplideSlide>
                                ))
                            }
                        </Splide>
                        <div className="lg:w-1/2 p-3 flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <h1 className="lg:text-2xl text-xl font-semibold">Deskripsi</h1>
                                <p>{umkm.data.description}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="lg:text-2xl text-xl font-semibold">Alamat</h1>
                                <p>{umkm.data.address}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="lg:text-2xl text-xl font-semibold">Sosial Media</h1>
                                <p>{umkm.data.social_media}</p>
                            </div>
                           <div className="flex flex-col gap-2">
                                <h1 className="lg:text-2xl text-xl font-semibold">
                                    Nomor Telepon
                                </h1>
                                <a
                                    className="flex gap-2 items-center"
                                    href={`https://wa.me/${umkm.data.phone_number}`}
                                >
                                    <Icon icon={"ic:baseline-whatsapp"} />
                                    <p> {umkm.data.phone_number}</p>
                                </a>
                            </div>

                        </div>

                    </main>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default UmkmDetail;
