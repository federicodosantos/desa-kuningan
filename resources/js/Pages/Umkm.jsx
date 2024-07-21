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

const Umkm = ({ umkm }) => {
 
    

    
    return (
        <>
            <Head title="Kuningan | Sarana dan Prasarana" />
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
                            { label: "UMKM" },
                        ]}
                    />

                    <h3 className="lg:text-5xl text-3xl text-primary-orange font-semibold">
                    UMKM
                    </h3>
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            umkm.data.length>0?(
                                umkm.data.map((item, i) => (
                                    <Link href={route('umkmDetail',item.id)} key={i} className="w-full relative aspect-video  rounded bg-white">
                                    <Splide className="size-full"
                                    
                                    options={{
                                        arrows:false
                                    }}>
                                        {
                                            item.photos.map((item,i)=>(
                                                <SplideSlide className="size-full aspect-video object-cover">
                                                    <img src={item.photo_path}  className='size-full object-cover' alt={'carousel image'+(i+1)} />
                                                </SplideSlide>
                                            ))
                                        }
                                    </Splide>
                                    <div className="absolute size-full bg-black bg-opacity-20 flex items-center p-2 text-2xl font-semibold text-text-white top-0">
                                        {item.name}
                                    </div>
                                   
                                </Link>
                                ))

                            ):(
                                <div className="text-center text-2xl col-span-3 font-semibold w-full">
                                    belum ada data:)
                                </div>

                            )
                        }
                    
                    </main>

                   
                </section>

                <Footer />
            </div>
        </>
    );
};

export default Umkm;
