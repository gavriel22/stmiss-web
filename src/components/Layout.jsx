// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Youtube, ChevronDown } from 'lucide-react';

import logo from '../assets/logo-stmiss.webp';

export const Header = () => (
  <header className="w-full bg-white shadow-md fixed top-0 z-50">
    {/* Top Bar UKSW Style */}
    <div className="bg-blue-900 text-white py-2 text-xs">
      <div className="container mx-auto px-4 flex justify-between">
        <div className="flex gap-4">
          <span className="flex items-center gap-2"><Phone size={14} /> (0274) 555-1234</span>
          <span className="flex items-center gap-2"><Mail size={14} /> admin@stmiss.ac.id</span>
        </div>
      </div>
    </div>

    {/* Main Nav */}
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src={logo} alt="ST Missiologia Logo" className="w-12 h-12 object-contain" />
        <div>
          <h1 className="text-xl font-bold text-blue-900 leading-none">ST Missiologia</h1>
          <p className="text-xs text-gray-500 tracking-widest">YOGYAKARTA</p>
        </div>
      </div>
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
            <Link to="/kurikulum-kontekstual" className="block px-4 py-3 hover:bg-yellow-50 hover:text-blue-900 border-b border-gray-50 last:border-0 text-sm">Kurikulum Kontekstual</Link>
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
        <Link to="https://stmiss.vercel.app/" target='_blank' className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-bold">Pendaftaran</Link>
      </nav>
    </div>
  </header>
);

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
      <div>
        <h3 className="text-white text-lg font-bold mb-4">Hubungi Kami</h3>
        <p className="mb-2">Jl. Solo Km. 10, Yogyakarta</p>
        <p className="mb-2">Telp: (0274) 555-1234</p>
        <div className="flex gap-3 mt-4">
          <Facebook size={20} className="hover:text-yellow-500 cursor-pointer" />
          <Instagram size={20} className="hover:text-yellow-500 cursor-pointer" />
          <Youtube size={20} className="hover:text-yellow-500 cursor-pointer" />
        </div>
      </div>
      <div>
        <h3 className="text-white text-lg font-bold mb-4">Tautan Cepat</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-yellow-500">Kalender Akademik</a></li>
          <li><a href="#" className="hover:text-yellow-500">Perpustakaan Digital</a></li>
          <li><a href="#" className="hover:text-yellow-500">Alumni</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white text-lg font-bold mb-4">Tentang STMiss</h3>
        <p>Berkomitmen menyelenggarakan pendidikan tinggi teologi yang berkualitas, kontekstual, dan transformatif.</p>
      </div>
    </div>
    <div className="text-center mt-10 border-t border-gray-800 pt-6 text-xs">
      © 2026 Sekolah Tinggi Missiologia.
    </div>
  </footer>
);