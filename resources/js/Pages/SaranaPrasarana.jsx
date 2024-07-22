import Breadcrumbs from "@/Components/Breadcrumbs";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Navbar from "@/Components/Navbar";
import ImgHeader from "../../assets/ProfileDesaHeader.jpg";
import { Icon } from "@iconify/react";
import { Head } from "@inertiajs/react";
import "@splidejs/react-splide/css";
import React, { useEffect, useState } from "react";

const SaranaPrasarana = ({ sarana }) => {
    const [isModalShow, setIsModalShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        console.log(isModalShow);
    }, [isModalShow]);

    const openModal = (item) => {
        setModalContent(item);
        setIsModalShow(true);
    };
    const closeModal = () => {
        setIsModalShow(false);
        setModalContent(null);
    };

    return (
        <>
            <Head title={'Sarana Prasarana'}/>
            <div className="bg-text-white">
                <Navbar />
                <Header img={ImgHeader} title={"Informasi Publik"} />
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Informasi Publik" },
                            { label: "Sarana dan Prasarana" },
                        ]}
                    />

                    <h3 className="lg:text-5xl text-3xl text-primary-orange font-semibold">
                        Sarana dan Prasarana
                    </h3>
                    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            sarana.data.length>0?(
                                sarana.data.map((item, i) => (
                                    <div key={i} className="w-full relative bg-white">
                                        <div className="w-full aspect-video relative">
                                            <img
                                                src={item.photos[0].photo_path}
                                                className="object-cover size-full"
                                                alt={item.id}
                                                draggable="false"
                                            />
                                            <Icon
                                                onClick={() => openModal(item)}
                                                icon={"material-symbols:image"}
                                                className="absolute bottom-2 bg-black p-1 rounded-full text-white text-2xl right-2"
                                            />
                                        </div>

                                        <div className="p-3 flex flex-col gap-2">
                                            <h3 className="text-xl text-primary-orange font-semibold">
                                                {item.name}
                                            </h3>
                                            <div className="flex flex-col">
                                                <h4 className="font-semibold text-lg">
                                                    Alamat
                                                </h4>
                                                <p className="line-clamp-3">
                                                    {item.address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))

                            ):(
                                <div className="text-center text-2xl col-span-3 font-semibold w-full">
                                    belum ada data:)
                                </div>

                            )
                        }

                    </main>

                    {isModalShow && (
                        <div className="h-screen w-full fixed top-0 left-0 z-[60] bg-black bg-opacity-60 flex items-center justify-center">
                            <main className="bg-white w-3/5 rounded-lg p-3 flex flex-col gap-2">
                            <div className="flex justify-between">
                                <h1 className="text-primary-orange text-base lg:text-2xl font-semibold">{modalContent?.name}</h1>
                                <Icon icon={'material-symbols:close'} onClick={()=>closeModal()} className="text-2xl"/>

                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 grid-rows-1">
                                {
                                    modalContent.photos.map((item,i)=>(
                                        <img
                                            src={item.photo_path}
                                            alt={modalContent?.id}
                                            draggable='false'
                                            className="w-full h-full object-cover aspect-video"
                                        />

                                    ))
                                }

                            </div>
                            </main>
                        </div>
                    )}
                </section>

                <Footer />
            </div>
        </>
    );
};

export default SaranaPrasarana;
