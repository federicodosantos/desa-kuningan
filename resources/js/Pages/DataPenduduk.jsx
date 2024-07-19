import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import { Bar, Doughnut } from "react-chartjs-2";
import React, { useState, useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Footer from "@/Components/Footer";
import { Icon } from "@iconify/react";
import Header from "@/Components/Header";
import ImgHeader from "../../assets/ProfileDesaHeader.jpg";
import Breadcrumbs from "@/Components/Breadcrumbs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip
);

const DataPenduduk = () => {
    const [chartType, setChartType] = useState("bar");
    const [filterType, setFilterType] = useState("rentang");

    const dataRentangUmur = [
        { label: "1-3 tahun", data: 89 },
        { label: "4-5 tahun", data: 60 },
        { label: "6-8 tahun", data: 122 },
        { label: "9-12 tahun", data: 195 },
        { label: "13-15 tahun", data: 152 },
        { label: "16-19 tahun", data: 165 },
        { label: "20-30 tahun", data: 484 },
        { label: "31-40 tahun", data: 404 },
        { label: "41-50 tahun", data: 476 },
        { label: "51-60 tahun", data: 428 },
        { label: "61-80 tahun", data: 411 },
        { label: "81+ tahun", data: 39 },
    ];

    const dataKategoriUmur = [
        { label: "Balita", data: 149 },
        { label: "Anak Kecil", data: 317 },
        { label: "Remaja", data: 317 },
        { label: "Dewasa", data: 1750 },
        { label: "Lansia", data: 492 },
    ];
    const dataJenisKelamin = [
        { label: "Laki Laki", data: 1512 },
        { label: "Perempuan", data: 1513 },
    ];

    const dataPekerjaan = [
        { label: "Belum/Tidak Bekerja", data: 673 },
        { label: "Mengurus Rumah Tangga", data: 462 },
        { label: "Pelajar/Mahasiswa", data: 482 },
        { label: "Pensiunan", data: 47 },
        { label: "Pegawai Negeri Sipil (PNS)", data: 97 },
        { label: "Tentara Nasional Indonesia", data: 13 },
        { label: "Kepolisian RI (POLRI)", data: 11 },
        { label: "Perdagangan", data: 74 },
        { label: "Petani/Pekebun", data: 76 },
        { label: "Peternak", data: 7 },
        { label: "Industri", data: 3 },
        { label: "Konstruksi", data: 17 },
        { label: "Transportasi", data: 35 },
        { label: "Karyawan Swasta", data: 55 },
        { label: "Karyawan BUMN", data: 12 },
        { label: "Karyawan BUMD", data: 2 },
        { label: "Karyawan Honorer", data: 3 },
        { label: "Buruh Harian Lepas", data: 88 },
        { label: "Buruh Tani/Perkebunan", data: 64 },
        { label: "Buruh Peternakan", data: 3 },
        { label: "Pembantu Rumah Tangga", data: 11 },
        { label: "Tukang Batu", data: 29 },
        { label: "Tukang Kayu", data: 10 },
        { label: "Tukang Sol Sepatu", data: 1 },
        { label: "Tukang Las/Pandai Besi", data: 2 },
        { label: "Tukang Jahit", data: 5 },
        { label: "Mekanik", data: 3 },
        { label: "Wartawan", data: 1 },
        { label: "Ustadz/Mubaligh", data: 1 },
        { label: "Dosen", data: 4 },
        { label: "Guru", data: 40 },
        { label: "Konsultan", data: 2 },
        { label: "Dokter", data: 2 },
        { label: "Bidan", data: 1 },
        { label: "Perawat", data: 8 },
        { label: "Pelaut", data: 1 },
        { label: "Sopir", data: 13 },
        { label: "Pedagang", data: 111 },
        { label: "Perangkat Desa", data: 5 },
        { label: "Kepala Desa", data: 3 },
        { label: "Wiraswasta", data: 296 },
    ];

    const filteredData = useMemo(() => {
        if (filterType === "rentang") {
            return dataRentangUmur;
        } else if (filterType === "gender") {
            return dataJenisKelamin;
        } else if (filterType === "pekerjaan") {
            return dataPekerjaan;
        } else {
            return dataKategoriUmur;
        }
    }, [filterType]);

    const labels = filteredData.map((item) => item.label);
    const dataValues = filteredData.map((item) => item.data);

    const data = {
        labels,
        datasets: [
            {
                label: "Jumlah",
                data: dataValues,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Data Penduduk Berdasarkan ${
                    filterType === "rentang" ? "Rentang Umur" : "Kategori Umur"
                }`,
            },
        },
    };

    return (
        <>
            <Head title="Kuningan | Data Penduduk" />
            <div className="bg-text-white">
                <Navbar />
                <Header img={ImgHeader} title={"Profil Desa"} />
                <section className="container py-10 flex flex-col justify-center gap-4 mx-auto lg:px-10 md:px-8 px-4 ">
                    <Breadcrumbs
                        items={[
                            {
                                href: route("home"),
                                icon: "ic:round-home",
                            },
                            { label: "Profil Desa" },
                            { label: "Demografis Penduduk" },
                        ]}
                    />
                    <h3 className="lg:text-5xl text-3xl text-primary-orange font-semibold">
                        Demografi Penduduk
                    </h3>
                    <p className="lg:text-base text-sm">
                        Memberikan informasi lengkap mengenai karakteristik
                        demografi penduduk suatu wilayah. Mulai dari jumlah
                        penduduk, usia, jenis kelamin, pekerjaan, yang
                        menggambarkan komposisi populasi secara rinci.{" "}
                    </p>
                </section>
                <div className="flex gap-5 container lg:flex-row flex-col justify-between mx-auto lg:px-10 md:px-8 px-4 py-10 ">
                    <aside className="lg:w-[25%] h-fit rounded-md shadow p-3 gap-2 flex flex-col divide-y-2  bg-white">
                        <button
                            className="p-2 text-left lg:text-base text-sm font-semibold"
                            onClick={() => setFilterType("rentang")}
                        >
                            Rentang Umur
                        </button>
                        <button
                            className="p-2 text-left lg:text-base text-sm font-semibold"
                            onClick={() => setFilterType("kategori")}
                        >
                            Kategori Umur
                        </button>
                        <button
                            className="p-2 text-left lg:text-base text-sm font-semibold"
                            onClick={() => setFilterType("gender")}
                        >
                            Jenis Kelamin
                        </button>
                        <button
                            className="p-2 text-left lg:text-base text-sm font-semibold"
                            onClick={() => setFilterType("pekerjaan")}
                        >
                            Pekerjaan
                        </button>
                    </aside>
                    <main className="lg:w-[70%]  flex flex-col  ">
                        <div className="flex gap-3">
                            <button
                                className={`py-1 rounded-md  px-5 duration-200 ease-in-out border ${
                                    chartType === "bar"
                                        ? "bg-secondary-orange text-text-white"
                                        : "text-secondary-orange  border-secondary-orange"
                                }`}
                                onClick={() => setChartType("bar")}
                            >
                                Bar
                            </button>
                            <button
                                className={`py-1 rounded-md  px-5 duration-200 ease-in-out border ${
                                    chartType === "pie"
                                        ? "bg-secondary-orange text-text-white"
                                        : "text-secondary-orange  border-secondary-orange"
                                }`}
                                onClick={() => setChartType("pie")}
                            >
                                Pie
                            </button>
                        </div>
                        {chartType === "bar" ? (
                            <div className="lg:w-4/5 mx-auto container md:px-0 px-4 ">
                                <Bar data={data} options={options} />
                            </div>
                        ) : (
                            <div className="lg:w-2/5 container mx-auto md:px-0 px-4 ">
                                <Doughnut data={data} options={options} />
                            </div>
                        )}
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default DataPenduduk;
