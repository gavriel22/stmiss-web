// src/pages/Academic.jsx
import { Header, Footer } from '../components/Layout';
import { GraduationCap, Calendar, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const AcademicHero = () => (
    <section className="relative h-[300px] md:h-[400px] flex items-center mt-[105px] bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 to-blue-900/70 z-10"></div>
        <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Academic Atmosphere"
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Akademik</h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="text-blue-100 mt-6 max-w-2xl mx-auto text-lg">
                Menjelajahi program studi, kurikulum, dan kegiatan akademik yang dirancang untuk memperlengkapi pemimpin masa depan.
            </p>
        </div>
    </section>
);

const ProgramsDetail = () => {
    const programs = [
        {
            id: 1,
            level: "Sarjana (S1)",
            title: "Sarjana Teologi (S.Th)",
            desc: "Program empat tahun yang memberikan dasar teologi biblika yang kuat, pembentukan karakter rohani, dan keterampilan pelayanan praktis.",
            features: ["144 SKS", "Praktek Pelayanan 1 Tahun", "Konsentrasi: Pastoral & Misi"],
            color: "border-blue-900 bg-blue-50"
        },
        {
            id: 2,
            level: "Magister (S2)",
            title: "Magister Missiologi (M.Miss)",
            desc: "Program pascasarjana yang dirancang untuk pendeta dan pemimpin pelayanan yang ingin mendalami strategi misi urban dan lintas budaya.",
            features: ["42 SKS", "Tesis Riset Lapangan", "Kuliah Modular/Hybrid"],
            color: "border-red-800 bg-red-50"
        },
        {
            id: 3,
            level: "Doktoral (S3)",
            title: "Doktor Teologi (D.Th)",
            desc: "Program riset tingkat lanjut untuk menghasilkan cendekiawan teologi yang mampu berkontribusi pada pemikiran teologis di konteks Asia.",
            features: ["Disertasi", "Seminar Internasional", "Publikasi Jurnal Terakreditasi"],
            color: "border-yellow-600 bg-yellow-50"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Program Studi</h2>
                    <p className="text-gray-600">Pilihan jenjang pendidikan di ST Missiologia</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {programs.map((prog) => (
                        <div key={prog.id} className="relative group bg-white rounded-2xl shadow-lg border-t-4 hover:-translate-y-2 transition duration-300 p-8" style={{ borderColor: prog.color.replace('bg-', '').replace('border-', '') }}>
                            <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider ${prog.color.includes('blue') ? 'bg-blue-900 text-white' : prog.color.includes('red') ? 'bg-red-800 text-white' : 'bg-yellow-600 text-white'}`}>
                                {prog.level}
                            </div>
                            <div className="mt-4 mb-6">
                                <GraduationCap size={40} className={`mb-4 ${prog.color.includes('blue') ? 'text-blue-900' : prog.color.includes('red') ? 'text-red-800' : 'text-yellow-600'}`} />
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{prog.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    {prog.desc}
                                </p>
                                <ul className="space-y-3">
                                    {prog.features.map((feat, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-gray-700">
                                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="w-full mt-4 border border-gray-300 text-gray-700 font-bold py-2.5 rounded-lg hover:bg-gray-50 transition">
                                Unduh Kurikulum
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AcademicCalendar = () => {
    const { siteData } = useData();
    const calendarData = siteData?.academicCalendar || { yearLabel: "Semester Ganjil 2026/2027", events: [] };
    const events = calendarData.events || [];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6">Kalender Akademik</h2>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">{calendarData.yearLabel}</h3>
                        <p className="text-gray-600 mb-6">
                            Jadwal penting kegiatan akademik. Pastikan Anda mencatat tanggal-tanggal penting ini.
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                            <h4 className="font-bold text-yellow-800 mb-2">Catatan Penting:</h4>
                            <p className="text-sm text-yellow-700">
                                Jadwal dapat berubah sewaktu-waktu menyesuaikan kondisi dan kebijakan pimpinan. Perubahan akan diinformasikan melalui portal akademik mahasiswa.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <div id="calendar-table" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-blue-900 text-white">
                                            <th className="p-4 font-semibold text-sm uppercase tracking-wider">Tanggal</th>
                                            <th className="p-4 font-semibold text-sm uppercase tracking-wider">Kegiatan</th>
                                            <th className="p-4 font-semibold text-sm uppercase tracking-wider">Kategori</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {events.map((evt, idx) => (
                                            <tr key={idx} className="hover:bg-blue-50/50 transition">
                                                <td className="p-4 text-sm font-bold text-gray-700 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={16} className="text-yellow-500" />
                                                        {evt.date}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm text-gray-600 font-medium">{evt.event}</td>
                                                <td className="p-4">
                                                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                                                        {evt.type}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Academic = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
            <Header />
            <main className="flex-grow">
                <AcademicHero />
                <ProgramsDetail />
                <AcademicCalendar />
            </main>
            <Footer />
        </div>
    );
};

export default Academic;
