import Breadcrumbs from "@/Components/Breadcrumbs";
import { Head, Link,  usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";


const Show = ({ auth, news }) => {
    const page = usePage();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title={'Officer Detail'}/>


            <section className="py-6 px-8  flex flex-col gap-3">
                <Breadcrumbs
                    className="bg-white"
                    items={[
                        {
                            href: route("admin.dashboard"),
                            icon: "ic:round-home",
                        },
                        {
                            href: route("admin.news.index"),
                            label: "Berita"
                        },
                        { label: news.title },

                    ]}
                />
                <Link
                    href={route("admin.news.create")}
                    className="bg-primary-orange text-text-white rounded-md w-fit px-5 py-2"
                >
                    Tambah Berita
                </Link>


            </section>
        </AuthenticatedLayout>
    );
};

export default Show;
