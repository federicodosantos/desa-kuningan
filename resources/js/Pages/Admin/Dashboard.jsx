import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Logo from "../../../assets/logo-desa.png";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { Icon } from "@iconify/react";
export default function Dashboard(params) {
    return (
        <AuthenticatedLayout
            user={params.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <section className="py-6 px-8 flex flex-col gap-3">
                <Breadcrumbs
                    className="bg-white"
                    items={[
                        {
                            href: route("admin.dashboard"),
                            icon: "ic:round-home",
                        },
                        { label: "Dashboard" },
                    ]}
                />
                <div className=" flex gap-8   ">
                    <div className="bg-white overflow-hidden w-3/5 shadow-sm h-fit sm:rounded-lg p-6 flex flex-col gap-3">
                        <h1 className=" text-3xl font-semibold text-gray-900">
                            Statistik
                        </h1>
                        <div className=" w-full grid grid-cols-3 grid-rows-1 gap-4">
                            <div className="w-full aspect-square  rounded p-3 flex flex-col gap-2">
                                <Icon
                                    icon={"material-symbols:news"}
                                    className="text-5xl text-primary-orange"
                                />
                                <h3 className="font-semibold">Berita</h3>
                                <p className="text-xl font-semibold">
                                    {params.totalNews} Postingan
                                </p>
                            </div>
                            <div className="w-full aspect-square  rounded p-3 flex flex-col gap-2">
                                <Icon
                                    icon={"ic:round-people"}
                                    className="text-5xl text-primary-orange"
                                />
                                <h3 className="font-semibold">
                                    Perangkat Desa
                                </h3>
                                <p className="text-xl font-semibold">
                                    {params.perangkatDesa} Orang
                                </p>
                            </div>
                            <div className="w-full aspect-square  rounded p-3 flex flex-col gap-2">
                                <Icon
                                    icon={"mdi:location"}
                                    className="text-5xl text-primary-orange"
                                />
                                <h3 className="font-semibold">
                                    Peta Digital
                                </h3>
                                <p className="text-xl font-semibold">
                                    10 Koordinat
                                </p>
                            </div>
                        </div>
                        <h1 className=" text-2xl font-semibold text-gray-900">
                            Kategori
                        </h1>
                        <div className=" w-full grid grid-cols-4 grid-rows-1 gap-4">
                            <div className="w-full aspect-square  rounded p-3 flex flex-col gap-2">
                                <Icon
                                    icon={"ph:buildings-bold"}
                                    className="text-5xl text-primary-orange"
                                />
                                <h3 className="font-semibold text-base">
                                    Sarana & Prasarana
                                </h3>
                                <p className="text-sm font-semibold">
                                    {params.totalSarana} Lokasi
                                </p>
                            </div>
                            <div className="w-full aspect-square  rounded p-3 flex flex-col gap-2">
                                <Icon
                                    icon={"icon-park-outline:homestay"}
                                    className="text-5xl text-primary-orange"
                                />
                                <h3 className="font-semibold text-base">
                                    Homestay
                                </h3>
                                <p className="text-sm font-semibold">
                                    {params.totalHomestay} Koordinat
                                </p>
                            </div>
                            <div className="w-full aspect-square  rounded p-3 flex flex-col gap-2">
                                <Icon
                                    icon={"material-symbols:holiday-village"}
                                    className="text-5xl text-primary-orange"
                                />
                                <h3 className="font-semibold text-base">
                                    Tempat Wisata
                                </h3>
                                <p className="text-sm font-semibold">
                                    {params.totalPariwisata} Lokasi
                                </p>
                            </div>
                            <div className="w-full aspect-square  rounded p-3 flex flex-col gap-2">
                                <Icon
                                    icon={"teenyicons:shop-outline"}
                                    className="text-5xl text-primary-orange"
                                />
                                <h3 className="font-semibold text-base">
                                    UMKM
                                </h3>
                                <p className="text-sm font-semibold">
                                    {params.totalUmkm} Lokasi
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white h-fit overflow-hidden w-2/5 shadow-sm sm:rounded-lg p-6 flex flex-col gap-4">
                        <h1 className=" text-lg font-semibold text-center text-gray-900">
                            CMS Desa Kuningan
                        </h1>
                        <img
                            src={Logo}
                            alt="logo"
                            draggable="false"
                            className="w-2/5 mx-auto"
                        />
                        <hr />
                        <div className="text-sm prose-sm text-balance">
                            <p>
                                Selamat datang di Dashboard CMS Kuningan! Sistem
                                ini dirancang untuk mempermudah pengelolaan
                                konten dan informasi di Desa Kuningan. Dengan
                                menggunakan platform ini, Anda dapat dengan
                                mudah mengatur, memperbarui, dan mempublikasikan
                                berbagai informasi yang berkaitan dengan
                                kegiatan dan layanan di Kuningan.
                            </p>

                            <p>
                                Selamat bekerja dan mari kita bersama-sama
                                membangun Kuningan yang lebih baik!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
