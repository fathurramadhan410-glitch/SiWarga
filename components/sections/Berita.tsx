"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Berita() {
  const [berita, setBerita] = useState<any[]>([]);
  const [selectedBerita, setSelectedBerita] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('berita').select('*').order('tanggal', { ascending: false });
      if (data) setBerita(data);
    }
    fetchData();
  }, []);

  return (
    <section id="berita" className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-sky-800 mb-2">Berita & Informasi</h2>
          <p className="text-gray-500">Kabar terbaru seputar kegiatan dan pengumuman RT 17 / RW 02.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {berita.map((b) => (
            <div key={b.id} onClick={() => setSelectedBerita(b)} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              {b.gambar ? (
                <img src={b.gambar} alt={b.judul} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">Tidak Ada Foto</div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-full">{b.kategori}</span>
                  <span className="text-xs text-gray-400">{new Date(b.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{b.judul}</h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">{b.ringkasan}</p>
                <div className="mt-auto text-sky-600 text-sm font-semibold flex items-center gap-1 border-t border-gray-100 pt-4">
                  Baca Selengkapnya 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {berita.length === 0 && <p className="text-center py-8 text-gray-400">Belum ada berita tersedia.</p>}
      </div>

      {/* MODAL DETAIL BERITA */}
      {selectedBerita && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedBerita(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {selectedBerita.gambar && <img src={selectedBerita.gambar} alt={selectedBerita.judul} className="w-full h-64 object-cover rounded-t-2xl" />}
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center">
                  <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2 py-1 rounded">{selectedBerita.kategori}</span>
                  <span className="text-xs text-gray-400">{new Date(selectedBerita.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <button onClick={() => setSelectedBerita(null)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-4">{selectedBerita.judul}</h2>
              <div className="text-gray-600 space-y-4 whitespace-pre-wrap text-justify leading-relaxed">{selectedBerita.konten}</div>
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-700 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedBerita.penulis?.charAt(0) || "R"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{selectedBerita.penulis || "Pengurus RT"}</p>
                  <p className="text-xs text-gray-400">Penerbit Berita</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}