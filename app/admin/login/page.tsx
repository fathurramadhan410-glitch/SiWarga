"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalStatus, setModalStatus] = useState<"success" | "error" | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin123") {
      // Set session login
      localStorage.setItem("siwarga_auth", "true");
      
      // Tampilkan modal sukses
      setModalStatus("success");
      
      // Set delay 2 detik sebelum pindah ke dashboard
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 2000);
    } else {
      // Tampilkan modal gagal
      setModalStatus("error");
      
      // Set delay 2.5 detik untuk menutup modal gagal
      setTimeout(() => {
        setModalStatus(null);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* KIRI: Foto/Background & Teks Informatif Sistem */}
      <div 
        className="hidden md:block md:w-1/2 bg-cover bg-center relative" 
        style={{ backgroundImage: "url('/tia-U0CZVm1zB4k-unsplash.jpg')" }}
      >
        <div className="h-full w-full bg-sky-900/70 flex items-center justify-center p-12">
          <div className="text-white max-w-md text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <svg className="w-12 h-12 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 8h1m-1-4h1" /></svg>
              <h1 className="text-4xl font-bold tracking-tight">SiWarga Admin</h1>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-sky-100">Sistem Administrasi Modern</h3>
            <p className="text-sky-200 leading-relaxed mb-6">
              Portal digital terpadu untuk pengurus RT 17 / RW 02. Kelola data warga, pantau riwayat pengajuan surat, dan verifikasi dokumen dengan tanda tangan elektronik QR Code secara real-time.
            </p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg inline-block">
              <p className="text-sm text-sky-100">Akses cepat, transparan, dan akuntabel.</p>
            </div>
          </div>
        </div>
      </div>

      {/* KANAN: Form Login */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-8 md:p-16">
        <div className="max-w-md w-full">
          
          <div className="mb-8">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wide">Portal Pengurus</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1 mb-3">Login Pengurus RT</h2>
            <p className="text-gray-500">
              Masukkan kredensial Anda untuk mengakses dashboard administrasi warga. Pastikan data yang Anda masukkan benar dan jaga kerahasiaan akun Anda.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" 
                placeholder="Masukkan username Anda" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" 
                placeholder="Masukkan password Anda" 
                required 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">Ingat saya</label>
              </div>
              <a href="#" className="text-sm font-medium text-sky-600 hover:text-sky-500">Lupa password?</a>
            </div>

            <button type="submit" className="w-full bg-sky-700 text-white py-3 rounded-lg font-semibold hover:bg-sky-800 transition-colors shadow-md">
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <Link href="/" className="hover:text-sky-700 inline-flex items-center gap-1 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Kembali ke Beranda Warga
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL POP-UP NOTIFIKASI LOGIN */}
      {modalStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all duration-300 scale-100">
            
            {modalStatus === "success" ? (
              <>
                {/* Logo Centang Hijau */}
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Login Berhasil!</h3>
                <p className="text-gray-500 mb-8">Selamat datang kembali di aplikasi SiWarga</p>
              </>
            ) : (
              <>
                {/* Logo Silang Merah */}
                <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Login Gagal!</h3>
                <p className="text-gray-500 mb-8">Username atau password yang Anda masukkan salah. Silakan coba lagi.</p>
              </>
            )}
            
          </div>
        </div>
      )}

    </div>
  );
}