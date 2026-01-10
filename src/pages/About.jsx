import React from 'react';
import { Header, Footer } from '../components/Layout';
import { Target, Eye, Users, Award, BookOpen } from 'lucide-react';
import { useData } from '../context/DataContext';

// 1. Hero About
const AboutHero = ({ data }) => (
    <section className="relative h-[300px] md:h-[400px] flex items-center mt-[105px] bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/80 z-10"></div>
        <img
            src={data.image}
            className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay"
            alt="Library ST Missiologia"
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{data.title}</h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="text-blue-100 mt-6 max-w-2xl mx-auto text-lg">
                {data.desc}
            </p>
        </div>
    </section>
);

// 2. Sejarah Singkat
const HistorySection = ({ data }) => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <img
                        src={data.image}
                        alt="Gedung Lama"
                        className="rounded-lg shadow-xl"
                    />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Sejarah Perjalanan</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        {data.desc1}
                    </p>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        {data.desc2}
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// 3. Visi & Misi
const VisionMissionSection = ({ vision, mission }) => (
    <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Visi */}
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Eye size={120} />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center">
                            <Eye size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Visi</h2>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        "{vision}"
                    </p>
                </div>

                {/* Misi */}
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Target size={120} />
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-lg flex items-center justify-center">
                            <Target size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Misi</h2>
                    </div>
                    <ul className="space-y-4 text-gray-600">
                        {mission.map((item, index) => (
                            <li key={index} className="flex gap-3">
                                <span className="text-yellow-500 font-bold">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

// 4. Pimpinan (Leadership)
const LeadershipSection = ({ leaders }) => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Susunan Pengurus Sekolah Tinggi Missiologia Yogyakarta</h2>
                    <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {leaders.map((leader, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-blue-900 transition duration-300">
                                <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">{leader.name}</h3>
                            <p className="text-blue-600 text-sm font-medium uppercase tracking-wide mt-1">{leader.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const About = () => {
    const { aboutData } = useData();

    if (!aboutData) return <div>Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
            <Header />
            <main className="flex-grow">
                <AboutHero data={aboutData.hero} />
                <HistorySection data={aboutData.history} />
                <VisionMissionSection vision={aboutData.vision} mission={aboutData.mission} />
                <LeadershipSection leaders={aboutData.leaders} />
            </main>
            <Footer />
        </div>
    );
};

export default About;
