"use client";
import { useState } from "react";
import { supabaseAdmin } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useNotification } from "@/lib/NotificationContext";

export default function TambahWarga() {
  const [form, setForm] = useState({ 
    nik: "", nama: "", tempatLahir: "", tanggalLahir: "", jenisKelamin: "Laki-laki", 
    pekerjaan: "", penghasilan: "0", tanggungan: "0", umur: "", alamat: "", telp: "", kk: "", desil: "1" 
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { showNotif } = useNotification(); // Panggil template notifikasi

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabaseAdmin.from('warga').insert([
      { 
        nik: form.nik, nama: form.nama, tempat_lahir: form.tempatLahir, tanggal_lahir: form.tanggalLahir,
        jenis_kelamin: form.jenisKelamin, pekerjaan: form.pekerjaan, penghasilan_bulanan: Number(form.penghasilan),
        jumlah_tanggungan: Number(form.tanggungan), umur: Number(form.umur), alamat: form.alamat, telp: form.telp, 
        kk: form.kk, desil: Number(form.desil) 
      }
    ]);

    setLoading(false);

    if (error) {
      showNotif("error", "Gagal Menyimpan!", error.message); // Notif error otomatis
    } else {
      showNotif("success", "Data Berhasil Disimpan!", "Data warga baru telah masuk ke database sistem.");
      setTimeout(() => router.push("/admin/data-warga"), 2000); // Pindah halaman setelah 2 detik
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Tambah Data Warga</h1>
      <p className="text-gray-500 mb-8">Isi formulir di bawah untuk menambah warga baru ke database.</p>

      <div className="max-w-3xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIK (16 Digit)</label>
            <input name="nik" value={form.nik} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input name="nama" value={form.nama} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
            <input name="tempatLahir" value={form.tempatLahir} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
            <input type="date" name="tanggalLahir" value={form.tanggalLahir} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
            <select name="jenisKelamin" value={form.jenisKelamin} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white text-gray-900">
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Umur</label>
            <input type="number" name="umur" value={form.umur} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
            <input name="pekerjaan" value={form.pekerjaan} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Penghasilan Bulanan (Rp)</label>
            <input type="number" name="penghasilan" value={form.penghasilan} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Tanggungan</label>
            <input type="number" name="tanggungan" value={form.tanggungan} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
            <input name="telp" value={form.telp} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <input name="alamat" value={form.alamat} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor KK</label>
            <input name="kk" value={form.kk} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Klasifikasi Desil (1-10)</label>
            <select name="desil" value={form.desil} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white text-gray-900">
              {[1,2,3,4,5,6,7,8,9,10].map(d => <option key={d} value={d}>Desil {d}</option>)}
            </select>
          </div>
          
          {errorMsg && <div className="md:col-span-2 bg-red-50 text-red-700 p-3 rounded-lg text-sm font-medium">{errorMsg}</div>}

          <div className="md:col-span-2">
            <button type="submit" disabled={loading} className="w-full bg-sky-700 text-white py-3 rounded-lg font-semibold hover:bg-sky-800 disabled:opacity-50 flex justify-center items-center gap-2">
              {loading ? "Menyimpan..." : "Simpan Data Warga"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}