import Breadcrumbs from "@/Components/Breadcrumbs";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Toast from "@/Components/Toast";
import { Icon } from "@iconify/react";

const Index = ({ auth, officers }) => {
    const { delete: destroy } = useForm();
    const page = usePage();
    const flashMessage = page.props.flash
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flashMessage.success) {
            setToast({ message: flashMessage.success, type: 'success' });
        } else if (flashMessage.error) {
            setToast({ message: flashMessage.error, type: 'error' });
        }
    }, [flashMessage]);

    const handleDelete = (e, id) => {
        e.preventDefault();

        if (confirm('Are you sure you want to delete this officer?')) {
            destroy(route('admin.officer.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title={'List Officer'}/>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <section className="py-6 px-8  flex flex-col gap-3">
                <Breadcrumbs
                    className="bg-white"
                    items={[
                        {
                            href: route("admin.dashboard"),
                            icon: "ic:round-home",
                        },
                        { label: "Perangkat Desa" },
                    ]}
                />
                <Link
                    href={route("admin.officer.create")}
                    className="bg-primary-orange text-text-white rounded-md w-fit px-5 py-2"
                >
                    Tambah Perangkat Desa
                </Link>
                <section className="grid grid-cols-5 grid-rows-1 gap-4">
                            {officers.data.length > 0 ? (
                                officers.data.map((item, i) => (

                                 <div key={i} className="w-full bg-white rounded-xl  relative aspect-[5/7]">
                                    <img src={item.photo_path} className="size-full object-cover" draggable='false'  alt={'foto '+item.name} />
                                    <div className="flex  gap-3 top-2 right-2 absolute">
                                        <Link href={route('admin.officer.edit',item.id)}>
                                    <Icon icon={'material-symbols:edit-outline'} className=" bg-white text-2xl text-black rounded-md"/>
                                        </Link>

                                    <Icon icon={'material-symbols:delete-outline'} onClick={(e)=>handleDelete(e, item.id)} className="cursor-pointer bg-white text-2xl text-red-500 rounded-md"/>

                                    </div>
                                    <div className="w-full text-text-white absolute bottom-0 left-0 bg-black bg-opacity-40 p-2 flex flex-col gap-2">
                                        <h4 className="text-base font-semibold text-center">{item.name}</h4>
                                        <p className="text-xs  text-center">{item.position.name}</p>

                                    </div>

                                 </div>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-2">
                                        tidak ada data
                                    </td>
                                </tr>
                            )}

                </section>



            </section>
        </AuthenticatedLayout>
    );
};

export default Index;
