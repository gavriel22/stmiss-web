import React from 'react';
import { Header, Footer } from '../components/Layout';
import { BookOpen, Globe, Users, Heart } from 'lucide-react';

import { useData } from '../context/DataContext';

const ContextualCurriculum = () => {
    const { curriculumData } = useData();
    const data = curriculumData || {};
    const hero = data.hero || {};
    const intro = data.intro || {};
    const focusPoints = data.focusPoints || [];
    const pillars = data.pillars || [];

    // Helper to get icon component
    const getIcon = (iconName) => {
        switch (iconName) {
            case 'BookOpen': return BookOpen;
            case 'Users': return Users;
            case 'Heart': return Heart;
            default: return BookOpen;
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-800">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[400px] flex items-center mt-[105px] bg-blue-900 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-950/80 z-10"></div>
                    <img
                        src={hero.image}
                        alt={hero.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-20 container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{hero.title}</h1>
                        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
                        <p className="text-blue-100 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                            {hero.desc}
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 max-w-5xl">

                        {/* Intro */}
                        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                            <div>
                                <h2 className="text-3xl font-bold text-blue-900 mb-6">{intro.title}</h2>
                                <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                                    {intro.desc1}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    {intro.desc2}
                                </p>
                            </div>
                            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <Globe className="text-yellow-500" /> Fokus Utama
                                </h3>
                                <ul className="space-y-3">
                                    {focusPoints.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold shrink-0">{idx + 1}</div>
                                            <p className="text-gray-700">{point}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* 3 Pillars */}
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-blue-900 mb-12">3 Pilar Pendekatan Kami</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {pillars.map((pillar, idx) => {
                                    const IconComp = getIcon(pillar.icon);
                                    const borderColor = idx === 0 ? 'border-blue-900' : (idx === 1 ? 'border-yellow-500' : 'border-red-600');
                                    const iconColor = idx === 0 ? 'text-blue-900' : (idx === 1 ? 'text-yellow-500' : 'text-red-600');

                                    return (
                                        <div key={idx} className={`p-6 bg-white shadow-lg rounded-xl border-t-4 ${borderColor} hover:-translate-y-1 transition duration-300`}>
                                            <IconComp size={48} className={`mx-auto ${iconColor} mb-4`} />
                                            <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                                            <p className="text-gray-600 text-sm">
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ContextualCurriculum;
