// src/pages/News.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Header, Footer } from '../components/Layout';
import { CalendarDays, User, ArrowRight } from 'lucide-react';

const News = () => {
    const { siteData } = useData();
    const newsList = siteData.news || [];

    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
            <Header />

            <main className="flex-grow pt-[140px] pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-blue-900 mb-4">Berita & Artikel</h1>
                        <div className="w-20 h-1.5 bg-yellow-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Informasi terkini seputar kegiatan akademik, kemahasiswaan, dan pelayanan ST Missiologia.
                        </p>
                    </div>

                    {newsList.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-8">
                            {newsList.map((item) => (
                                <article key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300 flex flex-col h-full group">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={item.image || "https://via.placeholder.com/400x250"}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-yellow-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            Berita Terbaru
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center text-xs text-gray-500 mb-4 gap-4">
                                            <span className="flex items-center gap-1">
                                                <CalendarDays size={14} className="text-yellow-500" /> {item.date}
                                            </span>
                                            {item.author && (
                                                <span className="flex items-center gap-1">
                                                    <User size={14} className="text-yellow-500" /> {item.author}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-yellow-600 transition line-clamp-2">
                                            <Link to={`/berita/${item.id}`}>
                                                {item.title}
                                            </Link>
                                        </h2>

                                        <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                                            {item.excerpt}
                                        </p>

                                        <Link to={`/berita/${item.id}`} className="inline-flex items-center gap-2 text-blue-900 font-bold hover:text-yellow-600 transition self-start mt-auto">
                                            Baca Selengkapnya <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                            <p className="text-gray-500 text-lg">Belum ada berita yang diterbitkan.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default News;
