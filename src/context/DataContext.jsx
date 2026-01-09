// src/context/DataContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const DataContext = createContext();

// Default data to seed if Firestore is empty
const DEFAULT_SITE_DATA = {
  heroTitle: "Menjadi Terang Bagi Bangsa",
  heroDesc: "Bergabunglah dengan Sekolah Tinggi Missiologia Yogyakarta untuk pendidikan teologi yang holistik.",
  heroImages: [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  ],
  programs: [
    { id: 1, level: "Sarjana (S1)", title: "Sarjana Teologi (S.Th)", desc: "Program empat tahun yang memberikan dasar teologi biblika yang kuat, pembentukan karakter rohani, dan keterampilan pelayanan praktis.", features: ["144 SKS", "Praktek Pelayanan 1 Tahun", "Konsentrasi: Pastoral & Misi"], color: "border-blue-900 bg-blue-50 text-blue-900" },
    { id: 2, level: "Magister (S2)", title: "Magister Missiologi (M.Miss)", desc: "Program pascasarjana yang dirancang untuk pendeta dan pemimpin pelayanan yang ingin mendalami strategi misi urban dan lintas budaya.", features: ["42 SKS", "Tesis Riset Lapangan", "Kuliah Modular/Hybrid"], color: "border-red-800 bg-red-50 text-red-800" },
    { id: 3, level: "Doktoral (S3)", title: "Doktor Teologi (D.Th)", desc: "Program riset tingkat lanjut untuk menghasilkan cendekiawan teologi yang mampu berkontribusi pada pemikiran teologis di konteks Asia.", features: ["Disertasi", "Seminar Internasional", "Publikasi Jurnal Terakreditasi"], color: "border-yellow-600 bg-yellow-50 text-yellow-600" }
  ],
  lecturers: [
    { id: 1, name: "Dr. Theol. Budi Santoso", role: "Dosen Dogmatika", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" },
    { id: 2, name: "Dr. Maria Kusuma, M.Th", role: "Dosen Perjanjian Baru", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" },
    { id: 3, name: "Pdt. Johanes, M.Miss", role: "Dosen Misiologi", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" }
  ],
  stats: [
    { id: 1, title: "Kurikulum Kontekstual", desc: "Pendidikan teologi yang relevan dengan tantangan misi zaman ini.", link: "/kurikulum-kontekstual" },
    { id: 2, title: "Dosen Berpengalaman", desc: "Dibimbing oleh teolog dan praktisi misi lintas budaya.", link: "/dosen" },
    { id: 3, title: "Lokasi Strategis", desc: "Kampus yang kondusif di pusat budaya Yogyakarta.", link: "/admission" }
  ],
  news: [
    { id: 1, date: '20 Des 2025', title: 'Wisuda Sarjana Teologi Angkatan ke-X', excerpt: 'ST Missiologia kembali meluluskan 50 wisudawan terbaik yang siap melayani di berbagai ladang misi.', content: "Yogyakarta, 20 Desember 2025 – Sekolah Tinggi Missiologia kembali menggelar Rapat Senat Terbuka dalam rangka Wisuda Sarjana Teologi Angkatan ke-X.", image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", author: "Humas STMiss" },
    { id: 2, date: '15 Des 2025', title: 'Seminar Nasional: Misi di Era Digital', excerpt: 'Menghadirkan pembicara ahli untuk mengupas strategi penginjilan efektif melalui media sosial dan teknologi.', content: "Yogyakarta – Transformasi digital telah menyentuh berbagai aspek kehidupan, termasuk cara bergereja dan bermisi.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", author: "Panitia Seminar" },
    { id: 3, date: '10 Des 2025', title: 'Penerimaan Mahasiswa Baru Gelombang 1 Dibuka', excerpt: 'Segera daftarkan diri Anda untuk Tahun Akademik 2026/2027. Beasiswa tersedia bagi yang membutuhkan.', content: "Sekolah Tinggi Missiologia secara resmi membuka Penerimaan Mahasiswa Baru (PMB) untuk Tahun Akademik 2026/2027.", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", author: "Bagian Admisi" }
  ],
  agenda: [
    { id: 1, title: "Seminar Internasional Teologi Misioner", date: "15 Januari 2026", location: "Aula Utama STMiss", desc: "Ikuti berbagai kegiatan akademik, seminar, dan persekutuan doa yang diselenggarakan oleh ST Missiologia Yogyakarta." },
    { id: 2, title: "Ibadah Awal Semester Genap", date: "02 Februari 2026", location: "Chapel Kampus", desc: "Mengawali semester baru dengan persekutuan doa bersama seluruh civitas akademika." }
  ],
  location: {
    address: "Jl. Solo Km. 10.5, Kalasan, Yogyakarta, Indonesia",
    phone: "(0274) 555-1234",
    email: "info@stmiss.ac.id",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15812.55394145695!2d110.456637!3d-7.775871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5a1e2b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sYogyakarta!5e0!3m2!1sen!2sid!4v1625000000000!5m2!1sen!2sid"
  }
};

const DEFAULT_ABOUT_DATA = {
  hero: {
    title: "Tentang Kami",
    desc: "Mengenal lebih dekat Sekolah Tinggi Missiologia, sejarah, visi, dan orang-orang di baliknya.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  history: {
    desc1: "Sekolah Tinggi Missiologia didirikan pada tahun 1995 oleh sekelompok hamba Tuhan yang memiliki beban untuk melengkapi gereja-gereja di Indonesia dengan pemimpin yang tidak hanya cakap secara teologis, tetapi juga memiliki hati untuk misi.",
    desc2: "Berawal dari sebuah ruko kecil di Yogyakarta, ST Missiologia kini telah berkembang menjadi institusi pendidikan tinggi teologi yang diakui, meluluskan ribuan alumni yang melayani di berbagai pelosok nusantara dan mancanegara.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  vision: "Menjadi institusi pendidikan tinggi teologi unggulan yang menghasilkan pemimpin Kristen yang Alkitabiah, berkarakter Kristus, dan berwawasan misioner global pada tahun 2030.",
  mission: [
    "Menyelenggarakan pendidikan teologi yang bermutu dan relevan.",
    "Melaksanakan penelitian teologi untuk menjawab tantangan zaman.",
    "Melakukan pengabdian masyarakat sebagai wujud kasih Kristus."
  ],
  leaders: [
    { name: "Dr. Theol. Budi Santoso", role: "Ketua", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" },
    { name: "Dr. Maria Kusuma, M.Th", role: "PK I - Akademik", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" },
    { name: "Pdt. Johanes, M.Miss", role: "PK II - Keuangan", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" },
    { name: "Sarah Wijaya, M.A", role: "PK III - Kemahasiswaan", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" },
  ]
};

export const DataProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Firestore References ---
  const siteDocRef = doc(db, 'content', 'siteData');
  const aboutDocRef = doc(db, 'content', 'aboutData');

  // --- Load Data from Firestore on Mount ---
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load Site Data
        const siteSnap = await getDoc(siteDocRef);
        if (siteSnap.exists()) {
          setSiteData(siteSnap.data());
        } else {
          // Seed with default data if empty
          await setDoc(siteDocRef, DEFAULT_SITE_DATA);
          setSiteData(DEFAULT_SITE_DATA);
        }

        // Load About Data
        const aboutSnap = await getDoc(aboutDocRef);
        if (aboutSnap.exists()) {
          setAboutData(aboutSnap.data());
        } else {
          await setDoc(aboutDocRef, DEFAULT_ABOUT_DATA);
          setAboutData(DEFAULT_ABOUT_DATA);
        }
      } catch (error) {
        console.error("Error loading Firestore data:", error);
        // Fallback to defaults on error
        setSiteData(DEFAULT_SITE_DATA);
        setAboutData(DEFAULT_ABOUT_DATA);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Real-time listener for siteData (optional for live updates)
    const unsubscribeSite = onSnapshot(siteDocRef, (doc) => {
      if (doc.exists()) {
        setSiteData(doc.data());
      }
    });

    const unsubscribeAbout = onSnapshot(aboutDocRef, (doc) => {
      if (doc.exists()) {
        setAboutData(doc.data());
      }
    });

    return () => {
      unsubscribeSite();
      unsubscribeAbout();
    };
  }, []);

  // --- Update Functions (Now write to Firestore) ---
  const updateHero = async (title, desc, images) => {
    try {
      const newData = { ...siteData, heroTitle: title, heroDesc: desc, heroImages: images };
      console.log("Saving to Firestore:", newData);
      await setDoc(siteDocRef, newData);
      console.log("Save successful!");
      // State will be updated by onSnapshot listener
    } catch (error) {
      console.error("Error saving hero data:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateAbout = async (nData) => {
    try {
      console.log("Saving About data to Firestore:", nData);
      await setDoc(aboutDocRef, nData);
      console.log("About save successful!");
    } catch (error) {
      console.error("Error saving about data:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateLecturers = async (nLecturers) => {
    try {
      const newData = { ...siteData, lecturers: nLecturers };
      await setDoc(siteDocRef, newData);
      console.log("Lecturers save successful!");
    } catch (error) {
      console.error("Error saving lecturers:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updatePrograms = async (nPrograms) => {
    try {
      const newData = { ...siteData, programs: nPrograms };
      await setDoc(siteDocRef, newData);
      console.log("Programs save successful!");
    } catch (error) {
      console.error("Error saving programs:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateHomeSections = async (newSections) => {
    try {
      const updated = { ...siteData, ...newSections };
      console.log("Saving home sections to Firestore:", updated);
      await setDoc(siteDocRef, updated);
      console.log("Home sections save successful!");
    } catch (error) {
      console.error("Error saving home sections:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateNews = async (newsList) => {
    try {
      const newData = { ...siteData, news: newsList };
      await setDoc(siteDocRef, newData);
      console.log("News save successful!");
    } catch (error) {
      console.error("Error saving news:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const updateAgenda = async (agendaList) => {
    try {
      const newData = { ...siteData, agenda: agendaList };
      await setDoc(siteDocRef, newData);
      console.log("Agenda save successful!");
    } catch (error) {
      console.error("Error saving agenda:", error);
      alert("Gagal menyimpan: " + error.message);
    }
  };

  // Loading state before data is fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <DataContext.Provider value={{ siteData, updateHero, aboutData, updateAbout, updateLecturers, updatePrograms, updateHomeSections, updateNews, updateAgenda }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);