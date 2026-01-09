// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, LayoutDashboard, LogOut } from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const THEME_COLORS = {
    Blue: { value: "border-blue-900 bg-blue-50 text-blue-900", hex: "bg-blue-900" },
    Red: { value: "border-red-800 bg-red-50 text-red-800", hex: "bg-red-800" },
    Yellow: { value: "border-yellow-600 bg-yellow-50 text-yellow-600", hex: "bg-yellow-600" },
    Green: { value: "border-green-800 bg-green-50 text-green-800", hex: "bg-green-800" },
    Purple: { value: "border-purple-800 bg-purple-50 text-purple-800", hex: "bg-purple-800" },
    Orange: { value: "border-orange-600 bg-orange-50 text-orange-800", hex: "bg-orange-600" },
    Teal: { value: "border-teal-700 bg-teal-50 text-teal-800", hex: "bg-teal-700" },
    Pink: { value: "border-pink-600 bg-pink-50 text-pink-800", hex: "bg-pink-600" },
    Indigo: { value: "border-indigo-800 bg-indigo-50 text-indigo-800", hex: "bg-indigo-800" },
    Gray: { value: "border-gray-700 bg-gray-100 text-gray-800", hex: "bg-gray-700" }
};

const Admin = () => {
    // --- ALL HOOKS MUST BE AT THE TOP (before any conditional returns) ---
    const navigate = useNavigate();
    const { siteData, updateHero, updateHomeSections, aboutData, updateAbout, updateLecturers, updatePrograms, updateNews, updateAgenda } = useData();

    // Auth state
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('home');

    // --- State Home ---
    const [homeTitle, setHomeTitle] = useState(siteData?.heroTitle || '');
    const [homeDesc, setHomeDesc] = useState(siteData?.heroDesc || '');
    const [homeImages, setHomeImages] = useState(siteData?.heroImages || []);
    const [adminStats, setAdminStats] = useState(siteData?.stats || []);
    const [adminNews, setAdminNews] = useState(siteData?.news || []);
    const [adminAgendaList, setAdminAgendaList] = useState(Array.isArray(siteData?.agenda) ? siteData.agenda : (siteData?.agenda ? [siteData.agenda] : []));
    const [adminLocation, setAdminLocation] = useState(siteData?.location || {});

    // --- State About ---
    const [aboutHero, setAboutHero] = useState(aboutData?.hero || {});
    const [aboutHistory, setAboutHistory] = useState(aboutData?.history || {});
    const [aboutVision, setAboutVision] = useState(aboutData?.vision || "");
    const [aboutMission, setAboutMission] = useState(aboutData?.mission || []);
    const [aboutLeaders, setAboutLeaders] = useState(aboutData?.leaders || []);

    // --- State Lecturers ---
    const [adminLecturers, setAdminLecturers] = useState(siteData?.lecturers || []);

    // --- State Programs ---
    const [adminPrograms, setAdminPrograms] = useState(siteData?.programs || []);

    // Check if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate('/login');
            }
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    // Sync state when siteData/aboutData changes (from Firestore real-time updates)
    useEffect(() => {
        if (siteData) {
            setHomeTitle(siteData.heroTitle || '');
            setHomeDesc(siteData.heroDesc || '');
            setHomeImages(siteData.heroImages || []);
            setAdminStats(siteData.stats || []);
            setAdminNews(siteData.news || []);
            setAdminAgendaList(Array.isArray(siteData.agenda) ? siteData.agenda : (siteData.agenda ? [siteData.agenda] : []));
            setAdminLocation(siteData.location || {});
            setAdminLecturers(siteData.lecturers || []);
            setAdminPrograms(siteData.programs || []);
        }
    }, [siteData]);

    useEffect(() => {
        if (aboutData) {
            setAboutHero(aboutData.hero || {});
            setAboutHistory(aboutData.history || {});
            setAboutVision(aboutData.vision || "");
            setAboutMission(aboutData.mission || []);
            setAboutLeaders(aboutData.leaders || []);
        }
    }, [aboutData]);

    // --- CONDITIONAL RETURNS (after all hooks) ---

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Memeriksa akses...</p>
                </div>
            </div>
        );
    }

    // If no user (shouldn't happen due to redirect, but safety net)
    if (!user) return null;

    // --- HANDLER FUNCTIONS ---
    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    const handleSaveHome = async (e) => {
        e.preventDefault();
        // Combine ALL home updates into a single Firestore write to avoid race conditions
        await updateHomeSections({
            heroTitle: homeTitle,
            heroDesc: homeDesc,
            heroImages: homeImages,
            stats: adminStats,
            news: adminNews,
            location: adminLocation
        });
        alert("Data Home berhasil disimpan!");
    };

    // Helpers for Home Sections
    const handleStatChange = (index, field, value) => {
        const newStats = [...adminStats];
        newStats[index] = { ...newStats[index], [field]: value };
        setAdminStats(newStats);
    };

    const handleNewsChange = (index, field, value) => {
        const newNews = [...adminNews];
        newNews[index] = { ...newNews[index], [field]: value };
        setAdminNews(newNews);
    };
    const addNews = () => setAdminNews([...adminNews, { id: Date.now(), date: "", title: "", excerpt: "" }]);
    const removeNews = (index) => setAdminNews(adminNews.filter((_, i) => i !== index));

    // --- State Agenda List ---
    const handleAgendaChange = (index, field, value) => {
        const newAgenda = [...adminAgendaList];
        newAgenda[index] = { ...newAgenda[index], [field]: value };
        setAdminAgendaList(newAgenda);
    };
    const addAgenda = () => setAdminAgendaList([...adminAgendaList, { id: Date.now(), date: "", title: "Agenda Baru", location: "", desc: "" }]);
    const removeAgenda = (index) => setAdminAgendaList(adminAgendaList.filter((_, i) => i !== index));

    const handleSaveAbout = async (e) => {
        e.preventDefault();
        await updateAbout({
            hero: aboutHero,
            history: aboutHistory,
            vision: aboutVision,
            mission: aboutMission,
            leaders: aboutLeaders
        });
        alert("Data About berhasil disimpan!");
    }

    const handleSaveLecturers = async (e) => {
        e.preventDefault();
        await updateLecturers(adminLecturers);
        alert("Data Dosen berhasil disimpan!");
    };

    const handleAdminLecturerChange = (index, field, value) => {
        const newLecturers = [...adminLecturers];
        newLecturers[index] = { ...newLecturers[index], [field]: value };
        setAdminLecturers(newLecturers);
    };

    const addAdminLecturer = () => {
        setAdminLecturers([
            ...adminLecturers,
            { id: Date.now(), name: "Nama Dosen", role: "Mata Kuliah", img: "https://via.placeholder.com/300" }
        ]);
    };

    const removeAdminLecturer = (index) => {
        const newLecturers = adminLecturers.filter((_, i) => i !== index);
        setAdminLecturers(newLecturers);
    };

    // Helpers for About
    const handleMissionChange = (index, value) => {
        const newMission = [...aboutMission];
        newMission[index] = value;
        setAboutMission(newMission);
    };
    const addMission = () => setAboutMission([...aboutMission, ""]);
    const removeMission = (index) => setAboutMission(aboutMission.filter((_, i) => i !== index));

    const handleLeaderChange = (index, field, value) => {
        const newLeaders = [...aboutLeaders];
        newLeaders[index] = { ...newLeaders[index], [field]: value };
        setAboutLeaders(newLeaders);
    };
    const addLeader = () => setAboutLeaders([...aboutLeaders, { name: "Nama Baru", role: "Jabatan", img: "https://via.placeholder.com/150" }]);
    const removeLeader = (index) => setAboutLeaders(aboutLeaders.filter((_, i) => i !== index));

    const handleImageUpload = (file, callback) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => callback(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSavePrograms = async (e) => {
        e.preventDefault();
        await updatePrograms(adminPrograms);
        alert("Data Program Studi berhasil disimpan!");
    };

    const handleProgramChange = (index, field, value) => {
        const newPrograms = [...adminPrograms];
        newPrograms[index] = { ...newPrograms[index], [field]: value };
        setAdminPrograms(newPrograms);
    };

    const handleFeatureChange = (progIndex, featIndex, value) => {
        const newPrograms = [...adminPrograms];
        const newFeatures = [...newPrograms[progIndex].features];
        newFeatures[featIndex] = value;
        newPrograms[progIndex].features = newFeatures;
        setAdminPrograms(newPrograms);
    };

    const addFeature = (progIndex) => {
        const newPrograms = [...adminPrograms];
        newPrograms[progIndex].features = [...newPrograms[progIndex].features, ""];
        setAdminPrograms(newPrograms);
    };

    const removeFeature = (progIndex, featIndex) => {
        const newPrograms = [...adminPrograms];
        newPrograms[progIndex].features = newPrograms[progIndex].features.filter((_, i) => i !== featIndex);
        setAdminPrograms(newPrograms);
    };

    const addProgram = () => {
        setAdminPrograms([
            ...adminPrograms,
            {
                id: Date.now(),
                level: "Jenjang",
                title: "Nama Program",
                desc: "Deskripsi program...",
                features: ["Fitur 1"],
                color: "border-gray-200 bg-gray-50 text-gray-900"
            }
        ]);
    };

    const removeProgram = (index) => {
        if (window.confirm("Yakin ingin menghapus program ini?")) {
            setAdminPrograms(adminPrograms.filter((_, i) => i !== index));
        }
    };


    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-blue-900 text-white flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                        <LayoutDashboard /> Admin
                    </h2>
                    <p className="text-blue-300 text-xs">ST Missiologia Panel</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('home')}
                        className={`w-full text-left px-4 py-3 rounded transition-colors ${activeTab === 'home' ? 'bg-blue-800 text-white font-bold' : 'text-blue-200 hover:bg-blue-800/50'}`}
                    >
                        Edit Beranda
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`w-full text-left px-4 py-3 rounded transition-colors ${activeTab === 'about' ? 'bg-blue-800 text-white font-bold' : 'text-blue-200 hover:bg-blue-800/50'}`}
                    >
                        Edit Tentang Kami
                    </button>
                    <button
                        onClick={() => setActiveTab('lecturers')}
                        className={`w-full text-left px-4 py-3 rounded transition-colors ${activeTab === 'lecturers' ? 'bg-blue-800 text-white font-bold' : 'text-blue-200 hover:bg-blue-800/50'}`}
                    >
                        Edit Data Dosen
                    </button>
                    <button
                        onClick={() => setActiveTab('programs')}
                        className={`w-full text-left px-4 py-3 rounded transition-colors ${activeTab === 'programs' ? 'bg-blue-800 text-white font-bold' : 'text-blue-200 hover:bg-blue-800/50'}`}
                    >
                        Edit Program Studi
                    </button>
                    <button
                        onClick={() => setActiveTab('news')}
                        className={`w-full text-left px-4 py-3 rounded transition-colors ${activeTab === 'news' ? 'bg-blue-800 text-white font-bold' : 'text-blue-200 hover:bg-blue-800/50'}`}
                    >
                        Kelola Berita
                    </button>
                    <button
                        onClick={() => setActiveTab('agenda')}
                        className={`w-full text-left px-4 py-3 rounded transition-colors ${activeTab === 'agenda' ? 'bg-blue-800 text-white font-bold' : 'text-blue-200 hover:bg-blue-800/50'}`}
                    >
                        Kelola Agenda
                    </button>
                </nav>

                <div className="p-6 border-t border-blue-800 space-y-3">
                    <Link to="/" className="flex items-center gap-2 hover:text-white text-blue-300 transition-colors">
                        <ArrowLeft size={16} /> Kembali ke Web
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-300 text-blue-300 transition-colors w-full">
                        <LogOut size={16} /> Keluar (Logout)
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-10">
                {activeTab === 'home' && (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto space-y-10">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="text-2xl font-bold text-gray-800">Edit Halaman Beranda</h3>
                            <button onClick={handleSaveHome} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2 font-bold"><Save size={18} /> Simpan Semua</button>
                        </div>

                        {/* 1. Hero Section */}
                        <section className="space-y-4">
                            <h4 className="text-lg font-bold text-blue-900 bg-blue-50 p-2 rounded">1. Banner Utama (Hero)</h4>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul Utama</label>
                                    <input type="text" value={homeTitle} onChange={(e) => setHomeTitle(e.target.value)} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi</label>
                                    <textarea rows="3" value={homeDesc} onChange={(e) => setHomeDesc(e.target.value)} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Galeri Header</label>
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], (res) => setHomeImages([...homeImages, res]))} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                        {homeImages.map((img, i) => (
                                            <div key={i} className="relative group h-24 rounded overflow-hidden">
                                                <img src={img} className="w-full h-full object-cover" />
                                                <button type="button" onClick={() => setHomeImages(homeImages.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold">Hapus</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </section>

                        {/* 2. Stats Section */}
                        <section className="space-y-4 pt-6 border-t">
                            <h4 className="text-lg font-bold text-blue-900 bg-blue-50 p-2 rounded">2. Sekilas Info (Keunggulan)</h4>
                            {adminStats.map((stat, i) => (
                                <div key={i} className="grid md:grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500">Judul</label>
                                        <input type="text" value={stat.title} onChange={(e) => handleStatChange(i, 'title', e.target.value)} className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500">Deskripsi</label>
                                        <input type="text" value={stat.desc} onChange={(e) => handleStatChange(i, 'desc', e.target.value)} className="w-full p-2 border rounded" />
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* 3. Berita Terbaru - Moved to specialized tab */}
                        <section className="space-y-4 pt-6 border-t">
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded text-blue-800 text-sm">
                                <strong>Info:</strong> Pengaturan Berita telah dipindahkan ke menu <strong>Kelola Berita</strong> di sidebar.
                                Data berita di halaman depan akan otomatis diambil dari sana.
                            </div>
                        </section>

                        {/* 4. Agenda Section - Moved to specialized tab */}
                        <section className="space-y-4 pt-6 border-t">
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded text-blue-800 text-sm">
                                <strong>Info:</strong> Pengaturan Agenda telah dipindahkan ke menu <strong>Kelola Agenda</strong> di sidebar.
                            </div>
                        </section>

                        {/* 5. Location Section */}
                        <section className="space-y-4 pt-6 border-t">
                            <h4 className="text-lg font-bold text-blue-900 bg-blue-50 p-2 rounded">5. Lokasi & Kontak</h4>
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Alamat</label>
                                    <input type="text" value={adminLocation.address} onChange={(e) => setAdminLocation({ ...adminLocation, address: e.target.value })} className="w-full p-2 border rounded" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Telepon</label>
                                        <input type="text" value={adminLocation.phone} onChange={(e) => setAdminLocation({ ...adminLocation, phone: e.target.value })} className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                                        <input type="text" value={adminLocation.email} onChange={(e) => setAdminLocation({ ...adminLocation, email: e.target.value })} className="w-full p-2 border rounded" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Google Maps Embed URL</label>
                                    <input type="text" value={adminLocation.mapUrl} onChange={(e) => setAdminLocation({ ...adminLocation, mapUrl: e.target.value })} className="w-full p-2 border rounded text-xs text-gray-500 font-mono" />
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto space-y-10">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="text-2xl font-bold text-gray-800">Edit Halaman Tentang Kami</h3>
                            <button onClick={handleSaveAbout} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2 font-bold"><Save size={18} /> Simpan Semua</button>
                        </div>

                        {/* 1. Hero About */}
                        <section className="space-y-4">
                            <h4 className="text-lg font-bold text-blue-900 bg-blue-50 p-2 rounded">1. Hero Section</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Judul Hero</label>
                                    <input type="text" value={aboutHero.title} onChange={(e) => setAboutHero({ ...aboutHero, title: e.target.value })} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Gambar Background</label>
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], (res) => setAboutHero({ ...aboutHero, image: res }))} className="text-sm" />
                                    {aboutHero.image && <img src={aboutHero.image} className="h-20 mt-2 rounded object-cover" />}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                                    <textarea rows="2" value={aboutHero.desc} onChange={(e) => setAboutHero({ ...aboutHero, desc: e.target.value })} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                        </section>

                        {/* 2. History */}
                        <section className="space-y-4 pt-4 border-t">
                            <h4 className="text-lg font-bold text-blue-900 bg-blue-50 p-2 rounded">2. Sejarah</h4>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Paragraf 1</label>
                                <textarea rows="3" value={aboutHistory.desc1} onChange={(e) => setAboutHistory({ ...aboutHistory, desc1: e.target.value })} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Paragraf 2</label>
                                <textarea rows="3" value={aboutHistory.desc2} onChange={(e) => setAboutHistory({ ...aboutHistory, desc2: e.target.value })} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Gambar Sejarah</label>
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], (res) => setAboutHistory({ ...aboutHistory, image: res }))} className="text-sm" />
                                {aboutHistory.image && <img src={aboutHistory.image} className="h-32 mt-2 rounded object-cover" />}
                            </div>
                        </section>

                        {/* 3. Vision Mission */}
                        <section className="space-y-4 pt-4 border-t">
                            <h4 className="text-lg font-bold text-blue-900 bg-blue-50 p-2 rounded">3. Visi & Misi</h4>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Visi</label>
                                <textarea rows="2" value={aboutVision} onChange={(e) => setAboutVision(e.target.value)} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Misi</label>
                                {aboutMission.map((item, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input type="text" value={item} onChange={(e) => handleMissionChange(i, e.target.value)} className="flex-1 p-2 border rounded" />
                                        <button onClick={() => removeMission(i)} className="bg-red-100 text-red-600 px-3 rounded hover:bg-red-200">X</button>
                                    </div>
                                ))}
                                <button type="button" onClick={addMission} className="text-sm text-blue-600 font-bold hover:underline">+ Tambah Poin Misi</button>
                            </div>
                        </section>

                        {/* 4. Leadership */}
                        <section className="space-y-4 pt-4 border-t">
                            <h4 className="text-lg font-bold text-blue-900 bg-blue-50 p-2 rounded">4. Pimpinan</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {aboutLeaders.map((leader, i) => (
                                    <div key={i} className="border p-4 rounded bg-gray-50 relative">
                                        <button onClick={() => removeLeader(i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">X</button>
                                        <div className="space-y-2">
                                            <input type="text" value={leader.name} onChange={(e) => handleLeaderChange(i, 'name', e.target.value)} placeholder="Nama" className="w-full p-1 border rounded text-sm font-bold" />
                                            <input type="text" value={leader.role} onChange={(e) => handleLeaderChange(i, 'role', e.target.value)} placeholder="Jabatan" className="w-full p-1 border rounded text-sm" />
                                            <div className="flex items-center gap-2">
                                                <img src={leader.img} className="w-10 h-10 rounded-full object-cover bg-gray-300" />
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], (res) => handleLeaderChange(i, 'img', res))} className="text-xs w-full" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addLeader} className="w-full py-2 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded hover:bg-blue-50">+ Tambah Pimpinan</button>
                        </section>

                    </div>
                )}

                {activeTab === 'lecturers' && (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Edit Data Dosen</h3>
                        <div className="space-y-6">
                            {adminLecturers.map((lecturer, i) => (
                                <div key={i} className="flex gap-6 p-4 border rounded-lg bg-gray-50 items-start">
                                    <div className="w-24 h-24 shrink-0 bg-gray-200 rounded overflow-hidden relative group">
                                        <img src={lecturer.img} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition gap-2">
                                            <label className="cursor-pointer text-white text-xs text-center border border-white px-2 py-1 rounded hover:bg-white hover:text-black transition">
                                                Ganti
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], (res) => handleAdminLecturerChange(i, 'img', res))} />
                                            </label>
                                            <button
                                                onClick={() => handleAdminLecturerChange(i, 'img', 'https://via.placeholder.com/300')}
                                                className="text-red-400 text-xs font-bold hover:text-red-200"
                                            >
                                                Hapus Foto
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase">Nama Lengkap & Gelar</label>
                                            <input type="text" value={lecturer.name} onChange={(e) => handleAdminLecturerChange(i, 'name', e.target.value)} className="w-full p-2 border rounded font-bold text-gray-800" placeholder="Contoh: Dr. Budi Santoso" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase">Mata Kuliah / Jabatan</label>
                                            <input type="text" value={lecturer.role} onChange={(e) => handleAdminLecturerChange(i, 'role', e.target.value)} className="w-full p-2 border rounded text-blue-600" placeholder="Contoh: Dosen Dogmatika" />
                                        </div>
                                    </div>
                                    <button onClick={() => removeAdminLecturer(i)} className="text-red-500 hover:text-red-700 p-2">
                                        Hapus
                                    </button>
                                </div>
                            ))}

                            <button onClick={addAdminLecturer} className="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">
                                + Tambah Dosen Baru
                            </button>

                            <div className="pt-4 border-t flex justify-end">
                                <button onClick={handleSaveLecturers} className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 flex items-center gap-2 font-bold shadow-lg">
                                    <Save size={20} /> Simpan Perubahan Dosen
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'programs' && (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
                        <div className="flex justify-between items-center border-b pb-6 mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Edit Program Studi</h3>
                            <button onClick={handleSavePrograms} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2 font-bold"><Save size={18} /> Simpan Perubahan</button>
                        </div>

                        <div className="space-y-8">
                            {adminPrograms.map((prog, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-gray-50 relative group">
                                    <button onClick={() => removeProgram(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 font-bold">Hapus Program</button>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jenjang</label>
                                            <input type="text" value={prog.level} onChange={(e) => handleProgramChange(i, 'level', e.target.value)} className="w-full p-2 border rounded font-bold" placeholder="Contoh: Sarjana (S1)" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Program</label>
                                            <input type="text" value={prog.title} onChange={(e) => handleProgramChange(i, 'title', e.target.value)} className="w-full p-2 border rounded font-bold text-blue-900" placeholder="Contoh: Sarjana Teologi" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deskripsi</label>
                                            <textarea rows="2" value={prog.desc} onChange={(e) => handleProgramChange(i, 'desc', e.target.value)} className="w-full p-2 border rounded" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Warna Tema</label>
                                            <div className="flex flex-wrap gap-3">
                                                {Object.entries(THEME_COLORS).map(([name, theme]) => (
                                                    <button
                                                        key={name}
                                                        type="button"
                                                        onClick={() => handleProgramChange(i, 'color', theme.value)}
                                                        className={`w-8 h-8 rounded-full ${theme.hex} border-2 transition-transform hover:scale-110 ${prog.color === theme.value ? 'border-black scale-110 shadow-lg ring-2 ring-offset-2 ring-blue-500' : 'border-transparent'}`}
                                                        title={name}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">
                                                Terpilih: {Object.keys(THEME_COLORS).find(key => THEME_COLORS[key].value === prog.color) || "Custom"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded border">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Fitur Unggulan</label>
                                        <div className="space-y-2">
                                            {prog.features && prog.features.map((feat, fIdx) => (
                                                <div key={fIdx} className="flex gap-2">
                                                    <input type="text" value={feat} onChange={(e) => handleFeatureChange(i, fIdx, e.target.value)} className="flex-1 p-2 border rounded text-sm" placeholder="Fitur..." />
                                                    <button onClick={() => removeFeature(i, fIdx)} className="text-red-400 hover:text-red-600 font-bold px-2">X</button>
                                                </div>
                                            ))}
                                            <button onClick={() => addFeature(i)} className="text-sm text-blue-600 font-bold hover:underline">+ Tambah Fitur</button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button onClick={addProgram} className="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">
                                + Tambah Program Baru
                            </button>
                        </div>
                    </div>
                )}
                {activeTab === 'news' && (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
                        <div className="flex justify-between items-center border-b pb-6 mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Kelola Berita & Artikel</h3>
                            <button
                                onClick={() => {
                                    updateNews(adminNews);
                                    alert("Berita berhasil disimpan!");
                                }}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2 font-bold"
                            >
                                <Save size={18} /> Simpan Perubahan
                            </button>
                        </div>

                        <div className="space-y-6">
                            {adminNews.map((item, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-gray-50 relative group">
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Hapus berita ini?")) {
                                                setAdminNews(adminNews.filter((_, idx) => idx !== i));
                                            }
                                        }}
                                        className="absolute top-4 right-4 text-red-400 hover:text-red-600 font-bold bg-white px-3 py-1 rounded shadow-sm border border-red-100"
                                    >
                                        Hapus
                                    </button>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {/* Image Section */}
                                        <div className="md:col-span-1">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Gambar Sampul</label>
                                            <div className="aspect-video bg-gray-200 rounded overflow-hidden relative group-image">
                                                <img src={item.image || "https://via.placeholder.com/300x200"} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                                    <label className="cursor-pointer bg-white text-gray-900 text-xs px-3 py-1 rounded font-bold hover:bg-gray-100">
                                                        Ubah Foto
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => handleImageUpload(e.target.files[0], (res) => handleNewsChange(i, 'image', res))}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="md:col-span-2 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tanggal</label>
                                                    <input
                                                        type="text"
                                                        value={item.date}
                                                        onChange={(e) => handleNewsChange(i, 'date', e.target.value)}
                                                        className="w-full p-2 border rounded text-sm"
                                                        placeholder="20 Des 2025"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Penulis</label>
                                                    <input
                                                        type="text"
                                                        value={item.author || ""}
                                                        onChange={(e) => handleNewsChange(i, 'author', e.target.value)}
                                                        className="w-full p-2 border rounded text-sm"
                                                        placeholder="Humas"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Judul Berita</label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => handleNewsChange(i, 'title', e.target.value)}
                                                    className="w-full p-2 border rounded font-bold text-blue-900"
                                                    placeholder="Judul Berita..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ringkasan (Daftar Depan)</label>
                                                <textarea
                                                    rows="2"
                                                    value={item.excerpt}
                                                    onChange={(e) => handleNewsChange(i, 'excerpt', e.target.value)}
                                                    className="w-full p-2 border rounded text-sm"
                                                    placeholder="Ringkasan singkat untuk tampilan kartu..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Isi Berita Lengkap</label>
                                                <textarea
                                                    rows="6"
                                                    value={item.content || ""}
                                                    onChange={(e) => handleNewsChange(i, 'content', e.target.value)}
                                                    className="w-full p-2 border rounded text-sm font-mono bg-white"
                                                    placeholder="Isi berita lengkap..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => setAdminNews([{ id: Date.now(), date: "", title: "Berita Baru", excerpt: "", content: "", image: "", author: "" }, ...adminNews])}
                                className="w-full py-4 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2"
                            >
                                <LayoutDashboard size={20} /> Tambah Berita Baru
                            </button>
                        </div>
                    </div>
                )}
                {activeTab === 'agenda' && (
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
                        <div className="flex justify-between items-center border-b pb-6 mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Kelola Agenda Kampus</h3>
                            <button
                                onClick={() => {
                                    updateAgenda(adminAgendaList);
                                    alert("Agenda berhasil disimpan!");
                                }}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2 font-bold"
                            >
                                <Save size={18} /> Simpan Perubahan
                            </button>
                        </div>

                        <div className="space-y-6">
                            {adminAgendaList.map((item, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-gray-50 relative group">
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Hapus agenda ini?")) {
                                                setAdminAgendaList(adminAgendaList.filter((_, idx) => idx !== i));
                                            }
                                        }}
                                        className="absolute top-4 right-4 text-red-400 hover:text-red-600 font-bold bg-white px-3 py-1 rounded shadow-sm border border-red-100"
                                    >
                                        Hapus
                                    </button>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Agenda / Kegiatan</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => handleAgendaChange(i, 'title', e.target.value)}
                                                className="w-full p-2 border rounded font-bold text-blue-900"
                                                placeholder="Judul Agenda..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tanggal</label>
                                            <input
                                                type="text"
                                                value={item.date}
                                                onChange={(e) => handleAgendaChange(i, 'date', e.target.value)}
                                                className="w-full p-2 border rounded text-sm"
                                                placeholder="Contoh: 15 Januari 2026"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lokasi</label>
                                            <input
                                                type="text"
                                                value={item.location}
                                                onChange={(e) => handleAgendaChange(i, 'location', e.target.value)}
                                                className="w-full p-2 border rounded text-sm"
                                                placeholder="Tempat pelaksanaan..."
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deskripsi Singkat</label>
                                            <textarea
                                                rows="3"
                                                value={item.desc}
                                                onChange={(e) => handleAgendaChange(i, 'desc', e.target.value)}
                                                className="w-full p-2 border rounded text-sm"
                                                placeholder="Deskripsi singkat kegiatan..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={addAgenda}
                                className="w-full py-4 border-2 border-dashed border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2"
                            >
                                <LayoutDashboard size={20} /> Tambah Agenda Baru
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
