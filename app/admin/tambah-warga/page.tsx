"use client";
import { useState } from "react";
import { supabaseAdmin } from "@/lib/supabase/client"; // Menggunakan supabaseAdmin agar bisa menulis ke database
import { useRouter } from "next/navigation";

export default function TambahWarga() {
  const [form, setForm] = useState({ nik: "", nama: "", umur: "", alamat: "", telp: "", kk: "", desil: "1" });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // State untuk modal pop-up
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Menggunakan supabaseAdmin untuk memasukkan data
    const { error } = await supabaseAdmin.from('warga').insert([
      { 
        nik: form.nik, 
        nama: form.nama, 
        umur: Number(form.umur), 
        alamat: form.alamat, 
        telp: form.telp, 
        kk: form.kk, 
        pekerjaan: 'Belum Diisi', 
        penghasilan_bulanan: 0, 
        jumlah_tanggungan: 0, 
        desil: Number(form.desil) 
      }
    ]);

    setLoading(false);

    if (error) {
      // Jika gagal (misal NIK ganda)
      setErrorMsg("Gagal menyimpan: " + error.message);
    } else {
      // Jika berhasil, tampilkan modal pop-up
      setShowSuccess(true);
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Umur</label>
            <input name="umur" type="number" value={form.umur} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 text-gray-900" />
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
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : "Simpan Data Warga"}
            </button>
          </div>
        </form>
      </div>

      {/* MODAL POP-UP NOTIFIKASI SUKSES */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all duration-300 scale-100">
            {/* Logo Centang Hijau */}
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Data Berhasil Disimpan!</h3>
            <p className="text-gray-500 mb-8">Data warga baru telah masuk ke database sistem.</p>
            
            <button 
              onClick={() => router.push("/admin/data-warga")} 
              className="w-full bg-sky-700 text-white py-3 rounded-lg font-semibold hover:bg-sky-800 transition-colors"
            >
              Lihat Data Warga
            </button>
            
            <button 
              onClick={() => {
                setShowSuccess(false);
                setForm({ nik: "", nama: "", umur: "", alamat: "", telp: "", kk: "", desil: "1" }); // Reset form
              }} 
              className="w-full mt-3 text-gray-500 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Tambah Warga Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}