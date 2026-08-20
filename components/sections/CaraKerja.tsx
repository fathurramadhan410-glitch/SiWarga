export default function CaraKerja() {
  const steps = [
    { no: "01", t: "Masukkan NIK", d: "Warga memasukkan 16 digit NIK pada kolom pengajuan untuk verifikasi identitas awal." },
    { no: "02", t: "Pilih Surat & Keterangan", d: "Sistem menampilkan daftar surat yang tersedia. Warga memilih jenis surat dan mengisi keterangan singkat." },
    { no: "03", t: "Unduh dengan QR Code", d: "Surat langsung diproses dan siap diunduh. Dilengkapi TTD Elektronik QR Code untuk verifikasi keaslian dokumen." }
  ];

  return (
    <section id="cara-kerja" className="py-20 bg-gray-50 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-sky-800 mb-2">Cara Kerja</h2>
          <p className="text-gray-500">Tiga langkah mudah untuk mengurus administrasi Anda tanpa birokrasi berbelit.</p>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 h-full border-l-2 border-dashed border-sky-200 hidden md:block"></div>
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-6 relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-sky-500 shadow-sm text-sky-600 font-bold text-xl z-10 shrink-0">
                  {s.no}
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1 mt-2">
                  <h3 className="text-xl font-bold text-sky-700 mb-1">{s.t}</h3>
                  <p className="text-gray-600 text-sm">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}