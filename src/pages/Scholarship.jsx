// src/pages/Scholarship.jsx
import React from 'react';
import { useData } from '../context/DataContext';
import { Header, Footer } from '../components/Layout';
import { Award, Briefcase, Heart, GraduationCap, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';

const ScholarshipHero = ({ data }) => (
    <section className="relative h-[300px] md:h-[400px] flex items-center mt-[105px] bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/80 z-10"></div>
        <img
            src={data?.image || "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}
            className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay"
            alt="Scholarship"
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{data?.title || "Program Beasiswa"}</h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="text-blue-100 mt-6 max-w-2xl mx-auto text-lg">
                {data?.desc || "Kami percaya panggilan Tuhan tidak boleh terhalang oleh kendala biaya. Temukan opsi dukungan finansial Anda di sini."}
            </p>
        </div>
    </section>
);

const ScholarshipTypes = ({ items }) => {
    // Icons helper
    const getIcon = (index) => {
        const icons = [<Award size={32} />, <Briefcase size={32} />, <Heart size={32} />];
        return icons[index % icons.length];
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Informasi Beasiswa</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {items?.map((sch, idx) => (
                        <div key={sch.id || idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition duration-300">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md ${sch.color || 'bg-blue-900 text-white'}`}>
                                {getIcon(idx)}
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

const Scholarship = () => {
    const { siteData } = useData();
    const data = siteData?.scholarshipPage || { hero: {}, items: [] };

    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
            <Header />
            <main className="flex-grow">
                <ScholarshipHero data={data.hero} />
                <ScholarshipTypes items={data.items} />
            </main>
            <Footer />
        </div>
    );
};

export default Scholarship;
