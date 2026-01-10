// src/pages/Scholarship.jsx
import React from 'react';
import { Header, Footer } from '../components/Layout';
import { Award, Briefcase, Heart, GraduationCap, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';

const ScholarshipHero = () => (
    <section className="relative h-[300px] md:h-[400px] flex items-center mt-[105px] bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/80 z-10"></div>
        <img
            src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay"
            alt="Scholarship"
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Program Beasiswa</h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="text-blue-100 mt-6 max-w-2xl mx-auto text-lg">
                Kami percaya panggilan Tuhan tidak boleh terhalang oleh kendala biaya. Temukan opsi dukungan finansial Anda di sini.
            </p>
        </div>
    </section>
);

const ScholarshipTypes = () => {
    const scholarships = [
        {
            id: 1,
            title: "Beasiswa Prestasi Akademik",
            desc: "Diberikan kepada calon mahasiswa dengan nilai rapor rata-rata > 8.5 dan mempertahankan IPK 3.50.",
            icon: <Award size={32} />,
            color: "bg-blue-900 text-white"
        },
        {
            id: 2,
            title: "Beasiswa Utusan Gereja",
            desc: "Potongan biaya studi bagi mahasiswa yang diutus resmi oleh sinode gereja mitra ST Missiologia.",
            icon: <Briefcase size={32} />,
            color: "bg-yellow-500 text-blue-900"
        },
        {
            id: 3,
            title: "Beasiswa Peduli Kasih",
            desc: "Bantuan finansial bagi mahasiswa dari keluarga kurang mampu atau yatim piatu (perlu SKU).",
            icon: <Heart size={32} />,
            color: "bg-red-700 text-white"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Jenis Beasiswa</h2>
                    <p className="text-gray-600">Pilih skema yang sesuai dengan kondisi Anda</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {scholarships.map((sch) => (
                        <div key={sch.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition duration-300">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md ${sch.color}`}>
                                {sch.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">{sch.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">{sch.desc}</p>
                            <button className="text-sm font-bold text-blue-900 border-b-2 border-blue-900 hover:text-yellow-600 hover:border-yellow-600 transition pb-1">
                                Syarat & Ketentuan &rarr;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const EligibilityCheck = () => (
    <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-blue-900 p-10 text-white flex flex-col justify-center">
                    <GraduationCap size={48} className="mb-6 mx-auto md:mx-0" />
                    <h3 className="text-2xl font-bold mb-4">Siapa yang Berhak?</h3>
                    <p className="text-blue-200 text-sm">
                        Pastikan Anda memenuhi kriteria umum sebelum mengajukan permohonan beasiswa.
                    </p>
                </div>
                <div className="md:w-2/3 p-10">
                    <ul className="space-y-4">
                        {[
                            "Warga Negara Indonesia (WNI)",
                            "Telah mendaftar sebagai calon mahasiswa ST Missiologia",
                            "Memiliki rekomendasi karakter yang baik dari gereja asal",
                            "Tidak sedang menerima beasiswa dari institusi lain",
                            "Bersedia menandatangani kontrak ikatan dinas (khusus Beasiswa Penuh)"
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-gray-700">
                                <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

const FAQSection = () => {
    const faqs = [
        { q: "Kapan saya bisa mendaftar beasiswa?", a: "Pendaftaran beasiswa dibuka bersamaan dengan gelombang penerimaan mahasiswa baru." },
        { q: "Apakah beasiswa menanggung biaya hidup?", a: "Tergantung jenis beasiswa. Beasiswa Penuh mencakup asrama dan konsumsi." },
        { q: "Bagaimana jika IPK saya turun?", a: "Beasiswa Prestasi akan dievaluasi setiap semester. Jika IPK di bawah standar, beasiswa dapat dicabut." },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 flex items-center justify-center gap-3">
                    <HelpCircle /> Tanya Jawab
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition bg-slate-50">
                            <h4 className="font-bold text-gray-800 mb-2 flex justify-between items-center">
                                {faq.q}
                            </h4>
                            <p className="text-gray-600 text-sm">{faq.a}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12 bg-yellow-50 p-8 rounded-xl border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-2">Masih Ada Pertanyaan?</h4>
                    <p className="text-yellow-700 mb-4 text-sm">Tim kemahasiswaan kami siap membantu Anda.</p>
                    <button className="bg-yellow-500 text-blue-950 font-bold px-6 py-2.5 rounded-lg hover:bg-yellow-400 transition">
                        Hubungi Layanan Beasiswa
                    </button>
                </div>
            </div>
        </section>
    );
};

const Scholarship = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
            <Header />
            <main className="flex-grow">
                <ScholarshipHero />
                <ScholarshipTypes />
                <EligibilityCheck />
                <FAQSection />
            </main>
            <Footer />
        </div>
    );
};

export default Scholarship;
