export default function Fitur() {
  return (
    <section id="fitur" className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-sky-800 mb-2">Fitur Unggulan</h2>
        <p className="text-center text-gray-500 mb-12">Inovasi untuk mempermudah administrasi warga.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "Pengajuan Online", d: "Ajukan surat kapan saja tanpa antre." },
            { t: "Filter Desil Otomatis", d: "Surat sosial hanya untuk yang berhak." },
            { t: "QR Code Verifikasi", d: "Jaminan keaslian dokumen digital." },
            { t: "Dashboard Admin", d: "Kelola data warga dengan mudah." }
          ].map((f, i) => (
            <div key={i} className="bg-sky-50 p-6 rounded-xl border border-sky-100 text-center">
              <h3 className="text-lg font-bold text-sky-700 mb-2">{f.t}</h3>
              <p className="text-sm text-gray-600">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}