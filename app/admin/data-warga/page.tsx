"use client";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/lib/supabase/client";

export default function AdminDataWarga() {
  const [warga, setWarga] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabaseAdmin.from('warga').select('*').order('nama', { ascending: true });
    if (data) setWarga(data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data warga ini?")) {
      await supabaseAdmin.from('warga').delete().eq('id', id);
      fetchData();
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabaseAdmin.from('warga').update({
      nama: editData.nama, alamat: editData.alamat, pekerjaan: editData.pekerjaan, desil: Number(editData.desil)
    }).eq('id', editData.id);
    setEditData(null);
    fetchData();
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
              <th className="p-3">Lahir</th>
              <th className="p-3">JK</th>
              <th className="p-3">Pekerjaan</th>
              <th className="p-3 text-center">Desil</th>
              <th className="p-3 rounded-r-lg text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {warga.map((w) => (
              <tr key={w.id} className="border-b border-gray-100 hover:bg-sky-50">
                <td className="p-3 font-mono text-gray-700">{w.nik}</td>
                <td className="p-3 font-medium text-gray-900">{w.nama}</td>
                <td className="p-3 text-gray-600">{w.tempat_lahir}, {w.tanggal_lahir ? new Date(w.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</td>
                <td className="p-3 text-gray-600">{w.jenis_kelamin || '-'}</td>
                <td className="p-3 text-gray-600">{w.pekerjaan || '-'}</td>
                <td className="p-3 text-center text-gray-600">{w.desil}</td>
                <td className="p-3 text-center whitespace-nowrap">
                  <button onClick={() => setEditData(w)} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-semibold mr-2 hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(w.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-red-600">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="text-center py-8 text-gray-400">Memuat data...</p>}
      </div>

      {editData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Data Warga</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" value={editData.nama} onChange={(e) => setEditData({...editData, nama: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <input type="text" value={editData.alamat || ''} onChange={(e) => setEditData({...editData, alamat: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
                <input type="text" value={editData.pekerjaan || ''} onChange={(e) => setEditData({...editData, pekerjaan: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Klasifikasi Desil</label>
                <select value={editData.desil} onChange={(e) => setEditData({...editData, desil: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                  {[1,2,3,4,5,6,7,8,9,10].map(d => <option key={d} value={d}>Desil {d}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setEditData(null)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50">Batal</button>
                <button type="submit" className="flex-1 bg-sky-700 text-white py-2 rounded-lg font-semibold hover:bg-sky-800">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}