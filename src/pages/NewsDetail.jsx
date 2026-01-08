// src/pages/NewsDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Header, Footer } from '../components/Layout';
import { CalendarDays, User, ArrowLeft, Share2 } from 'lucide-react';

const NewsDetail = () => {
    const { id } = useParams();
    const { siteData } = useData();
    const newsItem = siteData.news?.find(item => item.id === parseInt(id));

    if (!newsItem) {
        return (
            <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
                <Header />
                <main className="flex-grow pt-[140px] pb-20 container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-400 mb-4">Berita Tidak Ditemukan</h2>
                    <Link to="/berita" className="text-blue-600 font-bold hover:underline">Kembali ke Daftar Berita</Link>
                </main>
                <Footer />
            </div>
        );
    }

    // Format content to paragraphs
    const contentParagraphs = newsItem.content ? newsItem.content.split('\n\n') : [newsItem.excerpt];

    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
            <Header />

            <main className="flex-grow pt-[140px] pb-20">
                {/* Breadcrumb / Back Navigation */}
                <div className="bg-blue-900 text-blue-100 py-8 mb-10">
                    <div className="container mx-auto px-4">
                        <Link to="/berita" className="inline-flex items-center gap-2 text-sm font-bold hover:text-white mb-4 transition">
                            <ArrowLeft size={16} /> Kembali ke Daftar Berita
                        </Link>
                        <h1 className="text-2xl md:text-4xl font-bold text-white max-w-4xl leading-tight">
                            {newsItem.title}
                        </h1>
                        <div className="flex items-center gap-6 mt-6 text-sm">
                            <span className="flex items-center gap-2">
                                <CalendarDays size={16} className="text-yellow-500" /> {newsItem.date}
                            </span>
                            {newsItem.author && (
                                <span className="flex items-center gap-2">
                                    <User size={16} className="text-yellow-500" /> {newsItem.author}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-4xl">
                    <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-8 md:p-12">
                        {/* Featured Image */}
                        <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
                            <img
                                src={newsItem.image || "https://via.placeholder.com/800x400"}
                                alt={newsItem.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                            {contentParagraphs.map((paragraph, idx) => (
                                <p key={idx} className="mb-6">{paragraph}</p>
                            ))}
                        </div>

                        {/* Share / Tags Area (Optional) */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                            <span>Kategori: Berita Kampus</span>
                            <button className="flex items-center gap-2 hover:text-blue-900 transition">
                                <Share2 size={16} /> Bagikan
                            </button>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NewsDetail;
