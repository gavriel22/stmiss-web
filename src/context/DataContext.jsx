// src/context/DataContext.jsx
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Helper untuk Load Data dari LocalStorage
  const loadState = (key, defaultValue) => {
    try {
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.error("Error parsing local storage", e);
      return defaultValue;
    }
  };

  // Data Website (Bisa diedit Admin)
  const [siteData, setSiteData] = useState(() => loadState('siteData_v2', {
    heroTitle: "Menjadi Terang Bagi Bangsa",
    heroDesc: "Bergabunglah dengan Sekolah Teologi Missiologia Yogyakarta untuk pendidikan teologi yang holistik.",
    heroImages: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    ],
    programs: [
      {
        id: 1,
        level: "Sarjana (S1)",
        title: "Sarjana Teologi (S.Th)",
        desc: "Program empat tahun yang memberikan dasar teologi biblika yang kuat, pembentukan karakter rohani, dan keterampilan pelayanan praktis.",
        features: ["144 SKS", "Praktek Pelayanan 1 Tahun", "Konsentrasi: Pastoral & Misi"],
        color: "border-blue-900 bg-blue-50 text-blue-900"
      },
      {
        id: 2,
        level: "Magister (S2)",
        title: "Magister Missiologi (M.Miss)",
        desc: "Program pascasarjana yang dirancang untuk pendeta dan pemimpin pelayanan yang ingin mendalami strategi misi urban dan lintas budaya.",
        features: ["42 SKS", "Tesis Riset Lapangan", "Kuliah Modular/Hybrid"],
        color: "border-red-800 bg-red-50 text-red-800"
      },
      {
        id: 3,
        level: "Doktoral (S3)",
        title: "Doktor Teologi (D.Th)",
        desc: "Program riset tingkat lanjut untuk menghasilkan cendekiawan teologi yang mampu berkontribusi pada pemikiran teologis di konteks Asia.",
        features: ["Disertasi", "Seminar Internasional", "Publikasi Jurnal Terakreditasi"],
        color: "border-yellow-600 bg-yellow-50 text-yellow-600"
      }
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
      {
        id: 1,
        date: '20 Des 2025',
        title: 'Wisuda Sarjana Teologi Angkatan ke-X',
        excerpt: 'ST Missiologia kembali meluluskan 50 wisudawan terbaik yang siap melayani di berbagai ladang misi.',
        content: "Yogyakarta, 20 Desember 2025 – Sekolah Teologi Missiologia kembali menggelar Rapat Senat Terbuka dalam rangka Wisuda Sarjana Teologi Angkatan ke-X. Bertempat di Aula Utama kampus, acara ini berlangsung dengan khidmat dan penuh sukacita.\n\nSebanyak 50 wisudawan dari Program Studi Sarjana Teologi (S.Th) dan Magister Missiologi (M.Miss) resmi menyandang gelar baru mereka. Dalam orasi ilmiahnya, Ketua ST Missiologia, Dr. Theol. Budi Santoso, menekankan pentingnya integritas dan relevansi dalam pelayanan di era 5.0.\n\n'Dunia berubah dengan sangat cepat, namun Injil tetap kekal. Tugas saudara bukan hanya mewartakan, tetapi menghidupi kebenaran itu di tengah masyarakat yang semakin kompleks,' ujar beliau di hadapan para wisudawan dan orang tua.\n\nAcara ditutup dengan doa pengutusan bagi para lulusan yang akan segera berangkat ke berbagai daerah pelayanan, mulai dari pedalaman Kalimantan hingga kota-kota besar di Pulau Jawa.",
        image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        author: "Humas STMiss"
      },
      {
        id: 2,
        date: '15 Des 2025',
        title: 'Seminar Nasional: Misi di Era Digital',
        excerpt: 'Menghadirkan pembicara ahli untuk mengupas strategi penginjilan efektif melalui media sosial dan teknologi.',
        content: "Yogyakarta – Transformasi digital telah menyentuh berbagai aspek kehidupan, termasuk cara bergereja dan bermisi. Menyadari hal ini, ST Missiologia mengadakan Seminar Nasional bertajuk 'Misi di Era Digital: Peluang dan Tantangan' pada tanggal 15 Desember 2025.\n\nSeminar ini menghadirkan narasumber dari kalangan praktisi media Kristen dan teolog. Diskusi berfokus pada bagaimana gereja dapat memanfaatkan platform digital seperti Instagram, TikTok, dan YouTube untuk menjangkau generasi muda yang 'digital native'.\n\n'Kita tidak bisa lagi menutup mata. Gadget adalah mimbar baru di abad ini,' tegas salah satu pembicara. Peserta yang hadir tidak hanya mahasiswa, tetapi juga perwakilan gereja-gereja lokal di Yogyakarta.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        author: "Panitia Seminar"
      },
      {
        id: 3,
        date: '10 Des 2025',
        title: 'Penerimaan Mahasiswa Baru Gelombang 1 Dibuka',
        excerpt: 'Segera daftarkan diri Anda untuk Tahun Akademik 2026/2027. Beasiswa tersedia bagi yang membutuhkan.',
        content: "Sekolah Teologi Missiologia secara resmi membuka Penerimaan Mahasiswa Baru (PMB) untuk Tahun Akademik 2026/2027. Pendaftaran Gelombang 1 dimulai sejak 10 Desember 2025 hingga 28 Februari 2026.\n\nProgram studi yang dibuka meliputi Sarjana Teologi (S1), Magister Missiologi (S2), dan Doktor Teologi (S3). Calon mahasiswa dapat mendaftar secara online melalui website resmi atau datang langsung ke kampus di Jl. Solo Km. 10.5, Yogyakarta.\n\n'Kami mencari calon-calon pemimpin gereja yang tidak hanya cerdas secara intelektual, tetapi juga memiliki hati yang berkobar untuk misi,' kata Ketua Panitia PMB. Tersedia juga berbagai skema beasiswa, termasuk Beasiswa Prestasi dan Beasiswa Utusan Gereja bagi calon mahasiswa yang memenuhi syarat.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        author: "Bagian Admisi"
      }
    ],
    agenda: {
      title: "Seminar Internasional Teologi Misioner",
      date: "15 Januari 2026",
      location: "Aula Utama STMiss",
      desc: "Ikuti berbagai kegiatan akademik, seminar, dan persekutuan doa yang diselenggarakan oleh ST Missiologia Yogyakarta."
    },
    location: {
      address: "Jl. Solo Km. 10.5, Kalasan, Yogyakarta, Indonesia",
      phone: "(0274) 555-1234",
      email: "info@stmiss.ac.id",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15812.55394145695!2d110.456637!3d-7.775871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5a1e2b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sYogyakarta!5e0!3m2!1sen!2sid!4v1625000000000!5m2!1sen!2sid"
    }
  }));

  // Data Halaman About
  const [aboutData, setAboutData] = useState(() => loadState('aboutData', {
    hero: {
      title: "Tentang Kami",
      desc: "Mengenal lebih dekat Sekolah Teologi Missiologia, sejarah, visi, dan orang-orang di baliknya.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    history: {
      desc1: "Sekolah Teologi Missiologia didirikan pada tahun 1995 oleh sekelompok hamba Tuhan yang memiliki beban untuk melengkapi gereja-gereja di Indonesia dengan pemimpin yang tidak hanya cakap secara teologis, tetapi juga memiliki hati untuk misi.",
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
  }));

  // Fungsi Update Data
  const updateHero = (title, desc, images) => {
    setSiteData(prev => {
      const newData = { ...prev, heroTitle: title, heroDesc: desc, heroImages: images };
      localStorage.setItem('siteData_v2', JSON.stringify(newData));
      return newData;
    });
  };

  const updateAbout = (nData) => {
    setAboutData(nData);
    localStorage.setItem('aboutData', JSON.stringify(nData));
  }

  const updateLecturers = (nLecturers) => {
    setSiteData(prev => {
      const newData = { ...prev, lecturers: nLecturers };
      localStorage.setItem('siteData_v2', JSON.stringify(newData));
      return newData;
    });
  }

  const updatePrograms = (nPrograms) => {
    setSiteData(prev => {
      const newData = { ...prev, programs: nPrograms };
      localStorage.setItem('siteData_v2', JSON.stringify(newData));
      return newData;
    });
  }

  const updateHomeSections = (newData) => {
    setSiteData(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('siteData_v2', JSON.stringify(updated));
      return updated;
    });
  };

  const updateNews = (newsList) => {
    setSiteData(prev => {
      const newData = { ...prev, news: newsList };
      localStorage.setItem('siteData_v2', JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <DataContext.Provider value={{ siteData, updateHero, aboutData, updateAbout, updateLecturers, updatePrograms, updateHomeSections, updateNews }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);