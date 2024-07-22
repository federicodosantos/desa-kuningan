import Breadcrumbs from "@/Components/Breadcrumbs";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Toast from "@/Components/Toast";
import Pagination from "@/Components/Pagination";

const Index = ({ auth, complaints }) => {
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
        if (confirm('Are you sure you want to delete this news?')) {
            destroy(route('admin.complaint.destroy', id));
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
            <Head title={'List Complaint'}/>
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
                        { label: "Pengaduan" },
                    ]}
                />

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                  Nama
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                    Nomor Telepon
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                  Isi
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left leading-4  tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {complaints.data.length > 0 ? (
                                complaints.data.map((item, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="px-6 py-4   border-gray-200">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4   border-gray-200">
                                            {item.name}
                                        </td>
                                        <td
                                            className="px-6 py-4  line-clamp-6  border-gray-200 prose-sm line-cla"

                                        >{item.phone_number}</td>
                                        <td className="px-6 py-4  w-1/6  border-gray-200">
                                        {item.complaint}
                                        </td>
                                        <td className="px-6 py-4   border-gray-200 text-sm flex   gap-1">

                                            <button
                                                onClick={(e) => handleDelete(e, item.id)}
                                                className="px-2 py-1 active:scale-95 duration-200 ease-in-out hover:bg-opacity-90 bg-red-500 text-text-white rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-2">
                                        tidak ada data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
        links={complaints.links}
        from={complaints.from}
        to={complaints.to}
        total={complaints.total}
      />
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;
