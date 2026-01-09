// src/pages/Agenda.jsx
import React from 'react';
import { useData } from '../context/DataContext';
import { Header, Footer } from '../components/Layout';
import { CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Agenda = () => {
    const { siteData } = useData();
    const agendaList = Array.isArray(siteData.agenda) ? siteData.agenda : (siteData.agenda ? [siteData.agenda] : []); // Fallback

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />

            <main className="flex-grow pt-[105px]">
                {/* Header Section */}
                <section className="bg-blue-900 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">Agenda Kampus</h1>
                        <p className="text-blue-200 max-w-2xl mx-auto">
                            Informasi kegiatan akademik, seminar, ibadah, dan acara penting lainnya di Sekolah Teologi Missiologia.
                        </p>
                    </div>
                </section>

                {/* Agenda List */}
                <section className="py-12 container mx-auto px-4 max-w-4xl">
                    <div className="space-y-6">
                        {agendaList.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
                                <CalendarDays size={48} className="mx-auto mb-4 opacity-30" />
                                <p>Belum ada agenda yang dijadwalkan.</p>
                            </div>
                        ) : (
                            agendaList.map((item, index) => (
                                <div key={item.id || index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300 flex flex-col md:flex-row">
                                    {/* Date Box */}
                                    <div className="bg-blue-50 text-blue-900 p-6 flex flex-col items-center justify-center md:w-48 shrink-0 border-b md:border-b-0 md:border-r border-blue-100">
                                        <CalendarDays size={32} className="mb-2 text-blue-800" />
                                        <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Tanggal</span>
                                        <span className="text-lg font-bold text-center mt-1">{item.date}</span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h2>
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                            <MapPin size={16} />
                                            <span>{item.location}</span>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Agenda;
