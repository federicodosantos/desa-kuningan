import { Icon } from "@iconify/react";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { z } from "zod";

const ModalForm = ({ isOpen, onClose, onSubmitSuccess }) => {
    const complaintSchema = z.object({
        name: z.string().min(1, "Nama harus diisi"),
        phone_number: z.string().min(10, "Nomor telepon harus minimal 10 digit"),
        complaint: z.string().min(10, "Pengaduan harus minimal 10 karakter"),
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone_number: '',
        complaint: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
       
        try {
            complaintSchema.parse(data);
            setValidationErrors({});
            post(route('complaint.store'), {
                data,
                preserveScroll: true,
                onSuccess: () => {
                    onSubmitSuccess("Pengaduan berhasil dikirim", "success");
                    reset();
                    onClose();
                },
                onError: (errors) => {
                    console.error("Validation errors:", errors);
                    setValidationErrors(errors);
                }
            });
        } catch (error) {
            console.error("Validation failed:", error.errors);
            const newErrors = {};
            error.errors.forEach(err => {
                newErrors[err.path[0]] = err.message;
            });
            setValidationErrors(newErrors);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-16 right-2 lg:right-8 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-3 lg:p-6 w-72 lg:w-96">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1">Nama*</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name || ''}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Masukkan nama Anda" 
                            className="w-full p-2 border rounded"
                        />
                        {validationErrors.name && <div className="text-red-500">{validationErrors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone_number" className="block mb-1">Nomor Telepon/WA*</label>
                        <input
                            type="tel"
                            id="phone_number"
                            value={data.phone_number || ''}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            placeholder="Masukkan nomor HP/Whatsapp"
                            className="w-full p-2 border rounded"
                        />
                        {validationErrors.phone_number && <div className="text-red-500">{validationErrors.phone_number}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="complaint" className="block mb-1">Pengaduan*</label>
                        <textarea
                            id="complaint"
                            value={data.complaint || ''}
                            onChange={(e) => setData('complaint', e.target.value)}
                            placeholder="Masukkan kesan, informasi, atau detail aduan Anda"
                            className="w-full p-2 border rounded"
                            rows="4"
                        ></textarea>
                        {validationErrors.complaint && <div className="text-red-500">{validationErrors.complaint}</div>}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2" disabled={processing}>
                            <Icon icon={'tabler:send'}/>
                            {processing ? 'Mengirim...' : 'Kirim'}
                        </button>
                     
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
