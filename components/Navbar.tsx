"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Sembunyikan navbar jika berada di area halaman admin
  if (pathname.startsWith("/admin")) return null;

  // Fungsi scroll halus tanpa mengubah URL (tanpa pagar)
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-sky-800 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 ml-2">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 8h1m-1-4h1" />
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-white tracking-tight">SiWarga</span>
            <span className="text-[10px] text-white font-medium">RT 17 / 02</span>
          </div>
        </div>

        {/* Navigasi (Smooth Scroll) */}
        <div className="hidden md:flex items-center space-x-5 text-sm">
          <button onClick={() => scrollToSection('beranda')} className="text-white hover:text-sky-200 font-semibold transition-colors">Beranda</button>
          <button onClick={() => scrollToSection('fitur')} className="text-white hover:text-sky-200 font-semibold transition-colors">Fitur</button>
          <button onClick={() => scrollToSection('cara-kerja')} className="text-white hover:text-sky-200 font-semibold transition-colors">Cara Kerja</button>
          <button onClick={() => scrollToSection('pengajuan')} className="text-white hover:text-sky-200 font-semibold transition-colors">Pengajuan Surat</button>
          <button onClick={() => scrollToSection('data-warga')} className="text-white hover:text-sky-200 font-semibold transition-colors">Data Warga</button>
          <button onClick={() => scrollToSection('berita')} className="text-white hover:text-sky-200 font-semibold transition-colors">Berita</button>
          <button onClick={() => scrollToSection('kontak')} className="text-white hover:text-sky-200 font-semibold transition-colors">Kontak</button>
          <Link href="/admin/login" className="bg-white text-sky-800 px-4 py-2 rounded-lg transition-colors font-semibold ml-2">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}