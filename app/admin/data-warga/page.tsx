"use client";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/lib/supabase/client";
import { useNotification } from "@/lib/NotificationContext";

export default function AdminDataWarga() {
  const [warga, setWarga] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<any>(null);
  const [deleteData, setDeleteData] = useState<any>(null);
  const { showNotif } = useNotification();

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabaseAdmin.from('warga').select('*').order('nama', { ascending: true });
    if (data) setWarga(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const confirmDelete = async () => {
    if (!deleteData) return;
    const { error } = await supabaseAdmin.from('warga').delete().eq('id', deleteData.id);
    setDeleteData(null);
    if (error) {
      showNotif("error", "Gagal Menghapus!", "Terjadi kesalahan saat menghapus data.");
    } else {
      showNotif("success", "Data Berhasil Dihapus!", "Data warga telah dihapus dari sistem.");
      fetchData();
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabaseAdmin.from('warga').update({
      nama: editData.nama,
      nik: editData.nik,
      tempat_lahir: editData.tempat_lahir,
      tanggal_lahir: editData.tanggal_lahir,
      jenis_kelamin: editData.jenis_kelamin,
      pekerjaan: editData.pekerjaan,
      alamat: editData.alamat,
      kk: editData.kk,
      desil: Number(editData.desil)
    }).eq('id', editData.id);
    
    if (error) {
      showNotif("error", "Gagal Update!", error.message);
    } else {
      setEditData(null);
      showNotif("success", "Data Berhasil Diupdate!", "Perubahan data warga telah disimpan.");
      fetchData();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Warga</h1>
      <p className="text-gray-500 mb-8">Daftar warga aktif beserta data lengkap.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="p-3 rounded-l-lg">NIK</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Lahir (Tempat/Tgl)</th>
              <th className="p-3">JK</th>
              <th className="p-3">Pekerjaan</th>
              <th className="p-3">Alamat</th>
              <th className="p-3 text-center">Desil</th>
              <th className="p-3 rounded-r-lg text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {warga.map((w) => (
              <tr key={w.id} className="border-b border-gray-100 hover:bg-sky-50">
                <td className="p-3 font-mono text-gray-700 whitespace-nowrap">{w.nik}</td>
                <td className="p-3 font-medium text-gray-900 whitespace-nowrap">{w.nama}</td>
                <td className="p-3 text-gray-600 whitespace-nowrap">{w.tempat_lahir || '-'}, {w.tanggal_lahir ? new Date(w.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</td>
                <td className="p-3 text-gray-600 text-center">{w.jenis_kelamin || '-'}</td>
                <td className="p-3 text-gray-600 whitespace-nowrap">{w.pekerjaan || '-'}</td>
                <td className="p-3 text-gray-600 max-w-[200px] truncate">{w.alamat || '-'}</td>
                <td className="p-3 text-center text-gray-600">{w.desil}</td>
                <td className="p-3 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setEditData(w)} className="p-2 rounded-lg text-sky-600 hover:bg-sky-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.038-2.038l-8.475 8.475a4 4 0 00-.95 1.5l-.4 1.2a1 1 0 001.06 1.06l1.2-.4a4 4 0 001.5-.95l8.475-8.475m-2.038-2.038l1.06-1.06m0 0a2.5 2.5 0 113.536 3.536m-1.06-1.06l-3.536-3.536" /></svg>
                    </button>
                    <button onClick={() => setDeleteData(w)} className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="text-center py-8 text-gray-400">Memuat data...</p>}
      </div>

      {/* MODAL HAPUS */}
      {deleteData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Apakah Anda yakin?</h3>
            <p className="text-gray-500 mb-6">Data warga atas nama <strong>{deleteData.nama}</strong> akan dihapus permanen.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteData(null)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50">Batal</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT DATA WARGA */}
      {editData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Data Warga</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" value={editData.nama || ''} onChange={(e) => setEditData({...editData, nama: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                <input type="text" value={editData.nik || ''} onChange={(e) => setEditData({...editData, nik: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor KK</label>
                <input type="text" value={editData.kk || ''} onChange={(e) => setEditData({...editData, kk: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                <input type="text" value={editData.tempat_lahir || ''} onChange={(e) => setEditData({...editData, tempat_lahir: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <input type="date" value={editData.tanggal_lahir || ''} onChange={(e) => setEditData({...editData, tanggal_lahir: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                <select value={editData.jenis_kelamin || 'Laki-laki'} onChange={(e) => setEditData({...editData, jenis_kelamin: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                  <option>Laki-laki</option>
                  <option>Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
                <input type="text" value={editData.pekerjaan || ''} onChange={(e) => setEditData({...editData, pekerjaan: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <input type="text" value={editData.alamat || ''} onChange={(e) => setEditData({...editData, alamat: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Klasifikasi Desil</label>
                <select value={editData.desil || 1} onChange={(e) => setEditData({...editData, desil: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                  {[1,2,3,4,5,6,7,8,9,10].map(d => <option key={d} value={d}>Desil {d}</option>)}
                </select>
              </div>
              <div className="col-span-2 flex gap-3 pt-4">
                <button type="button" onClick={() => setEditData(null)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50">Batal</button>
                <button type="submit" className="flex-1 bg-sky-700 text-white py-2 rounded-lg font-semibold hover:bg-sky-800">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}