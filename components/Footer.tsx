"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Sembunyikan footer jika berada di area halaman admin
  if (pathname.startsWith("/admin")) return null;

  // Fungsi scroll halus untuk tombol di footer
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-sky-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2 text-white">SiWarga RT 17 / RW 02</h3>
          <p className="text-sm text-sky-100">Sistem Informasi Administrasi Warga Kampung Baiman. Melayani dengan transparan, cepat, dan akuntabel.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-white">Tautan Cepat</h4>
          <ul className="text-sm space-y-1 text-sky-100">
            <li><button onClick={() => scrollToSection('pengajuan')} className="hover:text-white transition-colors">Pengajuan Surat</button></li>
            <li><button onClick={() => scrollToSection('data-warga')} className="hover:text-white transition-colors">Data Warga</button></li>
            <li><button onClick={() => scrollToSection('berita')} className="hover:text-white transition-colors">Berita & Info</button></li>
            <li><button onClick={() => scrollToSection('/admin/login')} className="hover:text-white transition-colors">Login</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-white">Kontak</h4>
          <p className="text-sm text-sky-100">Jl. Tembus Mantuil, Basirih Ulu, No. 01, Banjarmasin.</p>
          <p className="text-sm text-sky-100">(022) 1234-5678</p>
        </div>
      </div>
      <div className="border-t border-sky-700 py-4 text-center text-xs text-sky-200">
        &copy; {new Date().getFullYear()} SiWarga. Dibuat untuk warga.
      </div>
    </footer>
  );
}