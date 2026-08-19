"use client"; // <-- TAMBAHKAN BARIS INI DI PALING ATAS

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
      {/* Background Wallpaper (Transparan murni, tanpa blur) */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/tia-U0CZVm1zB4k-unsplash.jpg')" }} />
      <div className="absolute inset-0 z-0 bg-sky-900/40"></div> {/* Overlay tipis agar teks terbaca */}
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
        <span className="inline-block bg-white/20 border border-white/40 px-4 py-1 rounded-full text-sm font-semibold mb-6">
          Portal Resmi RT 17 / RW 02
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Modernisasi Administrasi Warga
        </h1>
        <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          Selamat datang di portal digital RT 17 / RW 02. Melayani dengan transparan, cepat, dan akuntabel tanpa perlu antre.
        </p>
        <button onClick={() => document.getElementById('pengajuan')?.scrollIntoView({behavior: 'smooth'})} className="bg-white text-sky-800 px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105">
          Buat Pengajuan Surat
        </button>
      </div>
    </section>
  );
}