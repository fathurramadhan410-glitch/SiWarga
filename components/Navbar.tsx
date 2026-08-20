"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // Tutup menu setelah diklik di HP
  };

  return (
    <header className="sticky top-0 z-50 bg-sky-800 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo di Kiri */}
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 8h1m-1-4h1" /></svg>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-white tracking-tight">SiWarga</span>
            <span className="text-[10px] text-white font-medium">RT 01 / 05</span>
          </div>
        </div>

        {/* Menu Desktop (Hanya muncul di Laptop/Tablet ke atas) */}
        <div className="hidden md:flex items-center space-x-5 text-sm">
          <button onClick={() => scrollToSection('beranda')} className="text-white hover:text-sky-200 font-semibold transition-colors">Beranda</button>
          <button onClick={() => scrollToSection('fitur')} className="text-white hover:text-sky-200 font-semibold transition-colors">Fitur</button>
          <button onClick={() => scrollToSection('cara-kerja')} className="text-white hover:text-sky-200 font-semibold transition-colors">Cara Kerja</button>
          <button onClick={() => scrollToSection('pengajuan')} className="text-white hover:text-sky-200 font-semibold transition-colors">Pengajuan Surat</button>
          <button onClick={() => scrollToSection('data-warga')} className="text-white hover:text-sky-200 font-semibold transition-colors">Data Warga</button>
          <button onClick={() => scrollToSection('berita')} className="text-white hover:text-sky-200 font-semibold transition-colors">Berita</button>
          <button onClick={() => scrollToSection('kontak')} className="text-white hover:text-sky-200 font-semibold transition-colors">Kontak</button>
          <Link href="/admin/login" className="bg-white text-sky-800 px-4 py-2 rounded-lg transition-colors font-semibold ml-2">Login Admin</Link>
        </div>

        {/* Tombol Hamburger (Hanya muncul di HP) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </nav>

      {/* Menu Dropdown (Muncul saat tombol hamburger di HP diklik) */}
      {isOpen && (
        <div className="md:hidden bg-sky-800 pb-4 px-4 space-y-2 border-t border-sky-700">
          <button onClick={() => scrollToSection('beranda')} className="block w-full text-left text-white py-2 hover:bg-sky-700 px-2 rounded">Beranda</button>
          <button onClick={() => scrollToSection('fitur')} className="block w-full text-left text-white py-2 hover:bg-sky-700 px-2 rounded">Fitur</button>
          <button onClick={() => scrollToSection('cara-kerja')} className="block w-full text-left text-white py-2 hover:bg-sky-700 px-2 rounded">Cara Kerja</button>
          <button onClick={() => scrollToSection('pengajuan')} className="block w-full text-left text-white py-2 hover:bg-sky-700 px-2 rounded">Pengajuan Surat</button>
          <button onClick={() => scrollToSection('data-warga')} className="block w-full text-left text-white py-2 hover:bg-sky-700 px-2 rounded">Data Warga</button>
          <button onClick={() => scrollToSection('berita')} className="block w-full text-left text-white py-2 hover:bg-sky-700 px-2 rounded">Berita</button>
          <button onClick={() => scrollToSection('kontak')} className="block w-full text-left text-white py-2 hover:bg-sky-700 px-2 rounded">Kontak</button>
          <Link href="/admin/login" className="block bg-white text-sky-800 text-center px-4 py-2 rounded-lg font-semibold mt-2">Login Admin</Link>
        </div>
      )}
    </header>
  );
}