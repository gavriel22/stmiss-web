// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Youtube, ChevronDown, Menu, X } from 'lucide-react';

import logo from '../assets/logo-stmiss.webp';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-50">
      {/* Top Bar UKSW Style */}
      <div className="bg-blue-900 text-white py-2 text-xs">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex gap-4">
            <span className="flex items-center gap-2"><Phone size={14} /> 0812-1562-333</span>
            <span className="flex items-center gap-2"><Mail size={14} /> stmissygy@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ST Missiologia Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <div>
            <h1 className="text-lg md:text-xl font-bold text-blue-900 leading-none">STMiss</h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-900">Beranda</Link>
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-blue-900 focus:outline-none py-4">
              Tentang <ChevronDown size={16} />
            </button>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
              <Link to="/about" className="block px-4 py-3 hover:bg-yellow-50 hover:text-blue-900 border-b border-gray-50 last:border-0 text-sm">Tentang Kami</Link>
              <Link to="/program-studi" className="block px-4 py-3 hover:bg-yellow-50 hover:text-blue-900 border-b border-gray-50 last:border-0 text-sm">Program Studi</Link>
              <Link to="/kurikulum-modular" className="block px-4 py-3 hover:bg-yellow-50 hover:text-blue-900 border-b border-gray-50 last:border-0 text-sm">Kurikulum Modular</Link>
              <Link to="/dosen" className="block px-4 py-3 hover:bg-yellow-50 hover:text-blue-900 text-sm">Dosen & Pengajar</Link>
            </div>
          </div>
          <Link to="/academic" className="hover:text-blue-900">Akademik</Link>
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-blue-900 focus:outline-none py-4">
              Informasi <ChevronDown size={16} />
            </button>
            <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
              <Link to="/berita" className="block px-4 py-3 hover:bg-yellow-50 hover:text-blue-900 border-b border-gray-50 last:border-0 text-sm">Berita</Link>
              <Link to="/agenda" className="block px-4 py-3 hover:bg-yellow-50 hover:text-blue-900 text-sm">Agenda Kampus</Link>
            </div>
          </div>
          <Link to="https://stmiss.vercel.app/" target='_blank' className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-bold">Pendaftaran/Login</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-blue-900" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute left-0 right-0 shadow-lg h-screen overflow-y-auto pb-20">
          <div className="flex flex-col p-4 space-y-4 font-medium text-gray-700">
            <Link to="/" className="py-2 border-b border-gray-50" onClick={toggleMenu}>Beranda</Link>

            <div className="space-y-2">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Tentang</p>
              <Link to="/about" className="block pl-4 py-2 hover:bg-gray-50 rounded" onClick={toggleMenu}>Tentang Kami</Link>
              <Link to="/program-studi" className="block pl-4 py-2 hover:bg-gray-50 rounded" onClick={toggleMenu}>Program Studi</Link>
              <Link to="/kurikulum-modular" className="block pl-4 py-2 hover:bg-gray-50 rounded" onClick={toggleMenu}>Kurikulum Modular</Link>
              <Link to="/dosen" className="block pl-4 py-2 hover:bg-gray-50 rounded" onClick={toggleMenu}>Dosen & Pengajar</Link>
            </div>

            <Link to="/academic" className="py-2 border-b border-gray-50" onClick={toggleMenu}>Akademik</Link>

            <div className="space-y-2">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Informasi</p>
              <Link to="/berita" className="block pl-4 py-2 hover:bg-gray-50 rounded" onClick={toggleMenu}>Berita</Link>
              <Link to="/agenda" className="block pl-4 py-2 hover:bg-gray-50 rounded" onClick={toggleMenu}>Agenda Kampus</Link>
            </div>

            <Link to="https://stmiss.vercel.app/" target='_blank' className="bg-yellow-500 text-white px-4 py-3 rounded text-center hover:bg-yellow-600 font-bold mt-4" onClick={toggleMenu}>
              Pendaftaran/Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8 text-sm">
      <div className="md:max-w-md">
        <h3 className="text-white text-lg font-bold mb-4">Hubungi Kami</h3>
        <p className="mb-2">Sekretariat : Seropan 1 RT 01, Muntuk, Dilingo, Bantul, Yogyakarta 55783</p>
        <p className="mb-2">Telp: 0812-1562-333, 081-7547-8006</p>
        <div className="flex gap-3 mt-4">
          <Facebook size={20} className="hover:text-yellow-500 cursor-pointer" />
          <Instagram size={20} className="hover:text-yellow-500 cursor-pointer" />
          <Youtube size={20} className="hover:text-yellow-500 cursor-pointer" />
        </div>
      </div>
      <div className="md:max-w-md text-left">
        <h3 className="text-white text-lg font-bold mb-4">Tentang STMiss</h3>
        <p>Berkomitmen menyelenggarakan pendidikan tinggi Kristen dengan konsep-konsep Missi yang Alkitabiah, berkualitas, kontekstual, dan transformatif.</p>
      </div>
    </div>
    <div className="text-center mt-10 border-t border-gray-800 pt-6 text-xs">
      © 2026 Sekolah Tinggi Missiologia Yogyakarta.
    </div>
  </footer>
);