import React from 'react';
import { useData } from '../context/DataContext';
import { Header, Footer } from '../components/Layout';
import { GraduationCap, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';

const Programs = () => {
    const { siteData } = useData();
    const programs = siteData.programs;

    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-800">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[400px] flex items-center mt-[105px] bg-blue-900 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-950/80 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Program Studi"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-20 container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Program Studi</h1>
                        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
                        <p className="text-blue-100 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                            Pilihan jenjang pendidikan teologi dan misi yang relevan untuk menjawab panggilan pelayanan Anda.
                        </p>
                    </div>
                </section>

                {/* Programs List */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid gap-12">
                            {programs.map((prog, index) => (
                                <div key={prog.id} className={`flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="flex-1 space-y-4">
                                        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${prog.color.replace('border-', 'bg-').replace('text-', 'text-white ')}`}>
                                            {prog.level}
                                        </span>
                                        <h2 className="text-3xl font-bold text-gray-900">{prog.title}</h2>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            {prog.desc}
                                        </p>

                                        <ul className="space-y-3 pt-4 border-t border-gray-100">
                                            {prog.features.map((feat, idx) => (
                                                <li key={idx} className="flex gap-3 text-gray-700 font-medium">
                                                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>


                                    </div>
                                    <div className="flex-1 w-full relative">
                                        <div className={`aspect-video rounded-xl overflow-hidden shadow-inner ${prog.color.replace('text-', 'bg-').split(' ')[1]} flex items-center justify-center`}>
                                            <GraduationCap size={80} className={`${prog.color.split(' ')[2]} opacity-50`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Programs;
