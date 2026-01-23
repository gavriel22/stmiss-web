// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/Layout'; // Menggunakan Layout terpadu
import { useData } from '../context/DataContext'; // Mengambil data yang bisa diedit
import { ArrowRight, BookOpenText, Users, CalendarDays, MapPin, Phone, Mail, BookOpen, Blocks } from 'lucide-react';

// --- Komponen Pendukung Halaman Utama (Adaptasi UKSW) ---

// 1. Hero Section (Banner Utama)
const Hero = ({ title, desc, images }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Ganti gambar setiap 5 detik
        return () => clearInterval(interval);
    }, [images]);



    return (
        <section className="relative min-h-[500px] md:min-h-[550px] flex items-center mt-[105px] bg-blue-900 overflow-hidden py-20">
            {/* Background Image with Fade Effect */}
            {images && images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                >
                    <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt={`Slide ${index + 1}`}
                    />
                </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 to-blue-900/60 z-10"></div>

            <div className="relative z-20 text-left text-white container mx-auto px-4">
                <span className="inline-block bg-yellow-500 text-blue-950 px-3 py-1 text-xs font-bold rounded mb-4 tracking-wider">
                    SEKOLAH TINGGI MISSIOLOGIA YOGYAKARTA
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight max-w-3xl">
                    {title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-10 text-gray-100">
                    {desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/admission" className="bg-yellow-500 text-blue-950 font-bold px-8 py-3 rounded hover:bg-yellow-400 transition duration-300 flex items-center justify-center gap-2">
                        Daftar Sekarang <ArrowRight size={18} />
                    </Link>
                    <Link to="/scholarship" className="border-2 border-white text-white px-8 py-3 rounded hover:bg-white/10 transition duration-300 text-center">
                        Skema Beasiswa
                    </Link>
                </div>
            </div>

            {/* Slide Indicators */}
            {images && images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-yellow-500 w-8" : "bg-white/50 hover:bg-white"}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

// 2. Section Sekilas Info (Statistik / Keunggulan - Gaya Adaptif UKSW)
// 2. Section Sekilas Info
const StatsSection = ({ stats }) => {
    if (!stats) return null;

    return (
        <section className="py-16 bg-white relative z-30 -mt-16 shadow-xl rounded-t-3xl container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {stats.map((stat, index) => {
                    let IconComponent;
                    if (index === 0) {
                        // Custom Book with AI
                        IconComponent = () => (
                            <div className="relative mb-4 group-hover:scale-110 transition">
                                <BookOpen size={40} className="text-yellow-500" />
                                <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-white px-1 text-[10px] font-bold text-blue-900 border border-blue-100 rounded">AI</span>
                            </div>
                        );
                    } else if (index === 2) {
                        // Blocks (Kubus susun 3)
                        IconComponent = () => <Blocks size={40} className="text-yellow-500 mb-4 group-hover:scale-110 transition" />;
                    } else {
                        // Default (Users for index 1)
                        const Ico = Users;
                        IconComponent = () => <Ico size={40} className="text-yellow-500 mb-4 group-hover:scale-110 transition" />;
                    }

                    return (
                        <div key={stat.id} className="flex flex-col items-center p-6 hover:bg-yellow-50 transition duration-300 group">
                            <div className="flex flex-col items-center">
                                <IconComponent />
                                <h3 className="text-xl font-bold text-blue-900 mb-2 transition">{stat.title}</h3>
                                <p className="text-gray-600 text-sm">{stat.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

// 3. Section Program Studi (Adaptasi Kartu Fakultas UKSW)
const ProgramsSection = ({ programs }) => (
    <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-blue-900 mb-4">Program Studi</h2>
                <div className="w-20 h-1.5 bg-yellow-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Pilih jenjang pendidikan teologi dan misi yang sesuai dengan panggilan pelayanan Anda.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {programs.map((prog) => (
                    <div key={prog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-2xl transition duration-300 flex flex-col">
                        {/* Garis Warna Atas - Gaya Kartu UKSW */}
                        <div className={`${prog.color} h-2.5 w-full`}></div>

                        <div className="p-8 flex-grow flex flex-col">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition duration-300">
                                {prog.title}
                            </h3>
                            {/* <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                                {prog.desc}
                            </p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
// 5. Section Dosen / Pengajar
const LecturersSection = ({ lecturers }) => {
    if (!lecturers) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Dosen & Pengajar</h2>
                    <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Dibimbing oleh para ahli teologi yang berdedikasi dan berpengalaman dalam pelayanan misi lintas budaya.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {lecturers.slice(0, 3).map((lecturer) => (
                        <div key={lecturer.id} className="group">
                            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-blue-900 transition duration-300 shadow-lg">
                                <img src={lecturer.img} alt={lecturer.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition">{lecturer.name}</h3>
                            <p className="text-blue-600 font-medium uppercase tracking-wide text-sm mt-2">{lecturer.role}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/dosen" className="inline-flex items-center gap-2 text-blue-900 font-bold hover:text-yellow-600 transition">
                        Lihat Selengkapnya <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

// 4. Section Berita & Agenda (Adaptasi Seputar Berita / Agenda Kampus UKSW)
// Menggunakan data dummy karena fokus pada layout utama.
// 4. Section Berita & Agenda
const NewsEventsSection = ({ news, agenda }) => {
    if (!news || !agenda) return null;

    // Handle Agenda: if array, take the first item. If object, use as is.
    // Also handle empty array case.
    const featuredAgenda = Array.isArray(agenda) ? (agenda.length > 0 ? agenda[0] : null) : agenda;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
                {/* Kolom Berita */}
                <div>
                    <h2 className="text-3xl font-bold text-blue-900 mb-8">Berita Terbaru</h2>
                    <div className="space-y-6">
                        {news.slice(0, 3).map(item => (
                            <Link key={item.id} to={`/berita/${item.id}`} className="flex gap-4 items-start border-b border-gray-100 pb-6 last:border-b-0 group hover:bg-gray-50 transition duration-300 p-3 rounded-xl -mx-3">
                                <div className="bg-blue-50 text-blue-900 p-3 rounded-lg text-center min-w-[70px] group-hover:bg-white group-hover:shadow-sm transition">
                                    <CalendarDays size={24} className="mx-auto mb-1" />
                                    <span className="text-xs font-bold">{item.date}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800 group-hover:text-blue-900 transition mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link to="/berita" className="mt-8 text-blue-900 font-bold flex items-center gap-2 hover:text-yellow-600 inline-flex">
                        Lihat Semua Berita <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Kolom Agenda */}
                <Link to="/agenda" className="bg-blue-900 p-10 rounded-3xl text-white flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition duration-300 block">
                    {/* Background Pattern or Image can go here */}

                    {featuredAgenda ? (
                        <>
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                    Agenda Kampus <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" size={24} />
                                </h2>
                                <p className="text-blue-100 mb-8 leading-relaxed">
                                    {featuredAgenda.desc}
                                </p>
                            </div>
                            <div className="border-l-4 border-yellow-500 pl-6 relative z-20">
                                <span className="text-sm text-yellow-400 font-bold uppercase tracking-wider">Kegiatan Terdekat</span>
                                <h4 className="text-2xl font-bold text-white mt-1">{featuredAgenda.title}</h4>
                                <p className="text-blue-100 mt-2 text-sm flex items-center gap-2">
                                    <CalendarDays size={16} /> {featuredAgenda.date} | <MapPin size={16} /> {featuredAgenda.location}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-blue-200">
                            <CalendarDays size={48} className="mb-4 opacity-50" />
                            <p>Belum ada agenda terdekat.</p>
                        </div>
                    )}
                </Link>
            </div>
        </section>
    );
};

// 6. Section Lokasi Kampus
// 6. Section Lokasi Kampus
const LocationSection = ({ location }) => {
    if (!location) return null;
    return (
        <section id="location" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Lokasi Kampus</h2>
                    <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Kunjungi kampus kami yang terletak strategis di Yogyakarta.
                    </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Info Lokasi */}
                        <div className="p-6 md:col-span-1 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-900">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">Alamat</h4>
                                    <p className="text-gray-600 mt-1">{location.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-900">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">Telepon</h4>
                                    <p className="text-gray-600 mt-1">{location.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-900">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">Email</h4>
                                    <p className="text-gray-600 mt-1">{location.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Maps Embed */}
                        <div className="md:col-span-2 h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                            <iframe
                                src={location.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Komponen Halaman Utama Utama ---
// 1. Perlu import Phone & Mail dari lucide-react jika belum (sudah di Header, tapi cek import di atas)
// Cek baris 6: import { ArrowRight, BookOpenText, Users, CalendarDays, MapPin } from 'lucide-react'; 
// Perlu tambahkan Phone, Mail
const Home = () => {
    // Mengambil data website dari DataContext
    const { siteData } = useData();

    return (
        // Menggunakan Flexbox untuk memaksa Footer di bawah jika konten sedikit
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-800 bg-gray-50">
            {/* Header (Navigasi) */}
            <Header />

            {/* Konten Utama */}
            <main className="flex-grow">
                {/* Banner Utama */}
                <Hero
                    title={siteData.heroTitle}
                    desc={siteData.heroDesc}
                    images={siteData.heroImages}
                />

                {/* Statistik / Keunggulan */}
                <StatsSection stats={siteData.stats} />

                {/* Daftar Program Studi */}
                <ProgramsSection programs={siteData.programs} />

                {/* Dosen Section */}
                <LecturersSection lecturers={siteData.lecturers} />

                {/* Berita & Agenda Kampus */}
                <NewsEventsSection news={siteData.news} agenda={siteData.agenda} />

                {/* Lokasi Kampus */}
                <LocationSection location={siteData.location} />
            </main>

            {/* Footer (Informasi & Kontak) */}
            <Footer />
        </div>
    );
};

export default Home;