export default function CaraKerja() {
  return (
    <section id="cara-kerja" className="py-20 bg-gray-50 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-sky-800 mb-12">Cara Kerja</h2>
        <div className="space-y-8">
          {[
            { no: "01", t: "Masukkan NIK", d: "Warga memasukkan 16 digit NIK pada kolom pengajuan." },
            { no: "02", t: "Pilih Surat & Keterangan", d: "Sistem menampilkan surat yang tersedia. Warga memilih surat dan mengisi keterangan singkat." },
            { no: "03", t: "Unduh dengan QR Code", d: "Surat langsung siap diunduh tanpa verifikasi RT. Dilengkapi QR Code untuk keaslian dokumen." }
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-6">
              <div className="text-4xl font-extrabold text-sky-200 w-16">{s.no}</div>
              <div className="border-l-2 border-sky-200 pl-6">
                <h3 className="text-xl font-bold text-sky-700 mb-1">{s.t}</h3>
                <p className="text-gray-600 text-sm">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}