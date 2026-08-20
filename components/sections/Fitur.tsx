export default function Fitur() {
  const fiturList = [
    { 
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", 
      title: "Pengajuan Online", 
      desc: "Sistem digital yang memungkinkan warga mengajukan surat kapan saja tanpa perlu antre di kantor RT." 
    },
    { 
      icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3", 
      title: "Filter Desil Otomatis", 
      desc: "Integrasi data sosial ekonomi untuk memastikan surat keterangan sosial hanya diberikan kepada warga yang berhak (Desil 1-5)." 
    },
    { 
      icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z", 
      title: "QR Code Verifikasi", 
      desc: "Setiap surat resmi dilengkapi Tanda Tangan Elektronik berupa QR Code untuk menjamin keaslian dokumen." 
    },
    { 
      icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", 
      title: "Dashboard Admin", 
      desc: "Panel kontrol modern untuk Ketua RT dalam mengelola data warga, memantau riwayat, dan mencetak ulang surat dengan mudah." 
    }
  ];

  return (
    <section id="fitur" className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-sky-800 mb-2">Fitur Unggulan</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Inovasi layanan administrasi warga yang menggabungkan teknologi digital dengan kepedulian sosial.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fiturList.map((f, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg hover:border-sky-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-600 transition-colors">
                <svg className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}