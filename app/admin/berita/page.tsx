"use client";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/lib/supabase/client";
import { useNotification } from "@/lib/NotificationContext";

export default function KelolaBerita() {
  const [berita, setBerita] = useState<any[]>([]);
  const [form, setForm] = useState({ judul: "", kategori: "Pengumuman", konten: "", penulis: "", tanggal: new Date().toISOString().split('T')[0] });
  const [gambarUrl, setGambarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteData, setDeleteData] = useState<any>(null);
  const { showNotif } = useNotification();

  const fetchBerita = async () => {
    const { data } = await supabaseAdmin.from('berita').select('*').order('tanggal', { ascending: false });
    if (data) setBerita(data);
  };

  useEffect(() => { fetchBerita(); }, []);

  const handleUploadGambar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setGambarUrl(data.secure_url);
    } catch {
      showNotif("error", "Gagal Upload!", "Terjadi kesalahan saat upload gambar.");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const ringkasanOtomatis = form.konten.substring(0, 100) + "...";
    
    const { error } = await supabaseAdmin.from('berita').insert([
      { 
        judul: form.judul, kategori: form.kategori, ringkasan: ringkasanOtomatis, 
        konten: form.konten, penulis: form.penulis, tanggal: form.tanggal, gambar: gambarUrl 
      }
    ]);

    setLoading(false);

    if (error) {
      showNotif("error", "Gagal Publikasi!", "Terjadi kesalahan saat menyimpan berita.");
    } else {
      showNotif("success", "Berita Berhasil Dipublikasikan!", "Berita baru kini tampil di halaman warga.");
      setForm({ judul: "", kategori: "Pengumuman", konten: "", penulis: "", tanggal: new Date().toISOString().split('T')[0] });
      setGambarUrl("");
      fetchBerita();
    }
  };

  const confirmDelete = async () => {
    if (!deleteData) return;
    const { error } = await supabaseAdmin.from('berita').delete().eq('id', deleteData.id);
    setDeleteData(null);
    if (error) {
      showNotif("error", "Gagal Menghapus!", "Terjadi kesalahan saat menghapus berita.");
    } else {
      showNotif("success", "Berita Berhasil Dihapus!", "Berita telah dihapus dari sistem.");
      fetchBerita();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelola Berita & Informasi</h1>
      <p className="text-gray-500 mb-8">Publikasikan kabar terbaru untuk warga.</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* FORM TAMBAH BERITA */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Tulis Berita Baru</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Rilis</label>
              <input type="date" value={form.tanggal} onChange={(e) => setForm({...form, tanggal: e.target.value})} required className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Berita</label>
              <select value={form.kategori} onChange={(e) => setForm({...form, kategori: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-sky-500 focus:outline-none">
                <option>Pengumuman</option><option>Kegiatan</option><option>Bansos</option><option>Lingkungan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita</label>
              <input type="text" value={form.judul} onChange={(e) => setForm({...form, judul: e.target.value})} required placeholder="Masukkan judul yang menarik..." className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Penerbit (Penulis)</label>
              <input type="text" value={form.penulis} onChange={(e) => setForm({...form, penulis: e.target.value})} required placeholder="Contoh: Ketua RT 17" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Isi Keterangan Berita</label>
              <textarea value={form.konten} onChange={(e) => setForm({...form, konten: e.target.value})} rows={5} required placeholder="Tulis isi berita secara lengkap di sini..." className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Foto Berita</label>
              <input type="file" accept="image/*" onChange={handleUploadGambar} className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 cursor-pointer" />
              {uploading && <p className="text-sm text-sky-500 mt-2 animate-pulse">Sedang mengupload gambar...</p>}
              {gambarUrl && <img src={gambarUrl} alt="Preview" className="mt-3 w-full h-32 object-cover rounded-lg border" />}
            </div>
            <button type="submit" disabled={loading || uploading} className="w-full bg-sky-700 text-white py-2.5 rounded-lg font-semibold hover:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
              {loading ? "Menyimpan..." : "Publikasikan Berita"}
            </button>
          </form>
        </div>

        {/* DAFTAR BERITA */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Daftar Berita Aktif</h2>
          <div className="space-y-4">
            {berita.map((b) => (
              <div key={b.id} className="border border-gray-100 p-3 rounded-xl flex gap-4 items-start hover:shadow-sm transition-shadow">
                {b.gambar ? (
                  <img src={b.gambar} alt={b.judul} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs flex-shrink-0">No Image</div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2 py-1 rounded">{b.kategori}</span>
                  <h3 className="font-bold mt-1 text-gray-800 truncate">{b.judul}</h3>
                  <p className="text-xs text-gray-400 mt-1">{new Date(b.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} - {b.penulis}</p>
                </div>
                <button onClick={() => setDeleteData(b)} className="text-red-500 hover:text-red-700 text-sm font-semibold flex-shrink-0">Hapus</button>
              </div>
            ))}
            {berita.length === 0 && <p className="text-gray-400 text-center py-8">Belum ada berita dipublikasikan.</p>}
          </div>
        </div>
      </div>

      {/* MODAL HAPUS BERITA */}
      {deleteData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Apakah Anda yakin?</h3>
            <p className="text-gray-500 mb-6">Berita berjudul <strong>{deleteData.judul}</strong> akan dihapus permanen.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteData(null)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50">Batal</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}