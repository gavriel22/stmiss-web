// src/pages/Admission.jsx
import React from 'react';
import { Header, Footer } from '../components/Layout';
import { ClipboardList, UserCheck, FileText, CheckSquare, Download, Phone, Mail } from 'lucide-react';

const AdmissionHero = () => (
    <section className="relative h-[400px] flex items-center mt-[105px] bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/80 z-10"></div>
        <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Registration"
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pendaftaran Mahasiswa Baru</h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="text-blue-100 mt-6 max-w-2xl mx-auto text-lg">
                Bergabunglah dengan komunitas pembelajar ST Missiologia. Mari persiapkan diri Anda untuk melayani Tuhan dan sesama.
            </p>
        </div>
    </section>
);

const AdmissionSteps = () => {
    const steps = [
        {
            id: 1,
            title: "Isi Formulir",
            desc: "Download dan lengkapi formulir pendaftaran.",
            icon: <ClipboardList size={32} />
        },
        {
            id: 2,
            title: "Lengkapi Berkas",
            desc: "Siapkan dokumen persyaratan administrasi.",
            icon: <FileText size={32} />
        },
        {
            id: 3,
            title: "Ujian & Wawancara",
            desc: "Ikuti tes tertulis dan wawancara rohani.",
            icon: <UserCheck size={32} />
        },
        {
            id: 4,
            title: "Pengumuman",
            desc: "Hasil seleksi akan diumumkan via email/website.",
            icon: <CheckSquare size={32} />
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Alur Pendaftaran</h2>
                    <p className="text-gray-600">Proses sederhana menuju panggilan Anda</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div key={step.id} className="text-center relative">
                            {/* Connector Line (Desktop Only) */}
                            {step.id !== 4 && (
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                            )}
                            <div className="w-16 h-16 bg-white border-2 border-yellow-500 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm px-4">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const RequirementsSection = () => {
    const reqs = [
        "Fotokopi Ijazah & Transkrip Nilai Terlegalisir (3 rangkap)",
        "Fotokopi KTP & Kartu Keluarga (3 rangkap)",
        "Pas Foto berwarna 3x4 (4 lembar) dan 4x6 (2 lembar)",
        "Surat Rekomendasi Gereja / Gembala Sidang",
        "Surat Keterangan Sehat dari Dokter",
        "Kesaksian Pertobatan & Panggilan Pelayanan (Tertulis)"
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white p-10 rounded-2xl shadow-lg border-l-8 border-blue-900">
                    <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center gap-3">
                        <FileText className="text-yellow-500" /> Persyaratan Administrasi
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        {reqs.map((req, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <CheckSquare size={20} className="text-green-500 flex-shrink-0 mt-1" />
                                <span className="text-gray-700">{req}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const TuitionFees = () => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-10">Biaya Pendidikan</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* S1 */}
                <div className="border border-gray-200 rounded-xl p-8 hover:shadow-xl transition relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-blue-900"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Sarjana (S1)</h3>
                    <p className="text-4xl font-bold text-blue-900 mb-4">Rp 4.5jt<span className="text-sm text-gray-500 font-normal">/semester</span></p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-6">
                        <li>Uang Pembangunan: Rp 5.000.000 (Sekali)</li>
                        <li>Termasuk Asrama & Makan</li>
                    </ul>
                    <button className="w-full py-2 border border-blue-900 text-blue-900 rounded font-bold hover:bg-blue-50">Detail Rincian</button>
                </div>

                {/* S2 */}
                <div className="border border-gray-200 rounded-xl p-8 shadow-md md:transform md:scale-105 z-10 bg-white relative overflow-hidden my-4 md:my-0">
                    <div className="absolute top-0 right-0 bg-yellow-500 text-xs font-bold px-3 py-1 text-white rounded-bl-lg">POPULER</div>
                    <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Magister (S2)</h3>
                    <p className="text-4xl font-bold text-blue-900 mb-4">Rp 5.5jt<span className="text-sm text-gray-500 font-normal">/semester</span></p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-6">
                        <li>Uang Pembangunan: Rp 6.000.000 (Sekali)</li>
                        <li>Kuliah Hybrid / Modular</li>
                    </ul>
                    <button className="w-full py-2 bg-blue-900 text-white rounded font-bold hover:bg-blue-800">Detail Rincian</button>
                </div>

                {/* S3 */}
                <div className="border border-gray-200 rounded-xl p-8 hover:shadow-xl transition relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-800"></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Doktoral (S3)</h3>
                    <p className="text-4xl font-bold text-blue-900 mb-4">Rp 7.5jt<span className="text-sm text-gray-500 font-normal">/semester</span></p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-6">
                        <li>Uang Pembangunan: Rp 8.000.000 (Sekali)</li>
                        <li>Bimbingan Disertasi Intensif</li>
                    </ul>
                    <button className="w-full py-2 border border-blue-900 text-blue-900 rounded font-bold hover:bg-blue-50">Detail Rincian</button>
                </div>
            </div>
            <p className="mt-8 text-sm text-gray-500 italic">*Biaya dapat berubah sewaktu-waktu. Tersedia beasiswa bagi yang memenuhi syarat.</p>
        </div>
    </section>
);

const DownloadSection = () => (
    <section className="py-20 bg-blue-900 text-white text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Siap Bergabung?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-10 text-lg">
                Unduh formulir pendaftaran sekarang, lengkapi, dan kirimkan kembali kepada kami bersama dokumen persyaratan.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
                <button className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition flex items-center justify-center gap-3 text-lg shadow-lg">
                    <Download size={24} /> Download Formulir (PDF)
                </button>
                <div className="flex flex-col gap-2 text-left bg-blue-800 p-4 rounded-lg border border-blue-700">
                    <h4 className="font-bold mb-2">Butuh Bantuan?</h4>
                    <p className="flex items-center gap-2 text-sm"><Phone size={16} /> WA: 0812-3456-7890 (Admisi)</p>
                    <p className="flex items-center gap-2 text-sm"><Mail size={16} /> pm stmiss@ac.id</p>
                </div>
            </div>
        </div>
    </section>
);

const Admission = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
            <Header />
            <main className="flex-grow">
                <AdmissionHero />
                <AdmissionSteps />
                <RequirementsSection />
                <TuitionFees />
                <DownloadSection />
            </main>
            <Footer />
        </div>
    );
};

export default Admission;
