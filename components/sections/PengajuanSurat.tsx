"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import SuratFormat from "@/components/templates/SuratFormat";

export default function PengajuanSurat() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [warga, setWarga] = useState<any>(null);
  const [suratTersedia, setSuratTersedia] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [suratSelesai, setSuratSelesai] = useState<any>(null);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    setMessage(""); setWarga(null); setSearchResults([]); setSuratSelesai(null);
    if (!searchQuery) return;

    let query = supabase.from('warga').select('*');
    if (/^\d+$/.test(searchQuery)) {
      query = query.eq('nik', searchQuery);
    } else {
      query = query.ilike('nama', `%${searchQuery}%`);
    }

    const { data, error } = await query.limit(5);

    if (error || !data || data.length === 0) {
      setMessage("Data warga tidak ditemukan. Coba cek NIK atau Nama Anda.");
    } else if (data.length === 1) {
      selectWarga(data[0]);
    } else {
      setSearchResults(data);
    }
  };

  const selectWarga = (w: any) => {
    setWarga(w);
    setSearchResults([]);
    if (w.desil <= 5) {
      setSuratTersedia(['SKTM', 'SK Bansos', 'SK Domisili', 'SKU', 'Surat Pengantar SKCK', 'Surat Keterangan Berkelakuan Baik', 'Surat Pengantar KTP/KK']);
    } else {
      setSuratTersedia(['SK Domisili', 'SKU', 'Surat Pengantar SKCK', 'Surat Keterangan Berkelakuan Baik', 'Surat Pengantar KTP/KK']);
    }
  };

  const handleAjukan = async () => {
    if (!selectedSurat || !keperluan) return;
    const nomorSurat = `${Math.floor(Math.random() * 1000)}/${selectedSurat}/RT001/V/2024`;
    const { data } = await supabase.from('pengajuan_surat').insert([
      { nik: warga.nik, nama: warga.nama, jenis_surat: selectedSurat, keperluan: keperluan, desil_pemohon: warga.desil, status: 'Selesai', nomor_surat: nomorSurat }
    ]).select().single();

    if (data) {
      setSuratSelesai(data);
      setShowForm(false);
    }
  };

  const handleCetak = () => {
    window.print();
  };

  return (
    <section id="pengajuan" className="py-20 bg-white px-6 no-print">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-2 text-sky-800 text-center">Pengajuan Surat Mandiri</h2>
        <p className="text-center text-gray-500 mb-8">Cari berdasarkan NIK (16 digit) atau Nama Lengkap.</p>
        
        {!suratSelesai && (
          <>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Masukkan NIK atau Nama..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-900 bg-white" 
              />
              <button onClick={handleSearch} disabled={!searchQuery} className="bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-800 disabled:opacity-50">Cari Data</button>
            </div>

            {message && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-sm font-medium">{message}</div>}

            {/* Daftar Pencarian jika nama kembar */}
            {searchResults.length > 0 && (
              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 mb-6 space-y-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">Ditemukan {searchResults.length} data warga. Pilih yang benar:</p>
                {searchResults.map((w) => (
                  <button key={w.id} onClick={() => selectWarga(w)} className="w-full text-left bg-white p-3 rounded-lg border hover:bg-sky-100 transition-colors">
                    <p className="font-bold text-gray-800">{w.nama}</p>
                    <p className="text-xs text-gray-500">NIK: {w.nik} - Alamat: {w.alamat}</p>
                  </button>
                ))}
              </div>
            )}

            {/* TAMPILAN DATA WARGA DALAM BENTUK TABEL */}
            {warga && !showForm && (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-sky-800 text-white px-6 py-3">
                  <h3 className="font-bold">Data Warga Ditemukan</h3>
                </div>
                <table className="w-full text-left text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-3 font-medium text-gray-500 w-1/3">Nama Lengkap</td>
                      <td className="px-6 py-3 text-gray-900 font-semibold">{warga.nama}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-3 font-medium text-gray-500">NIK</td>
                      <td className="px-6 py-3 text-gray-900 font-mono">{warga.nik}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-3 font-medium text-gray-500">Alamat</td>
                      <td className="px-6 py-3 text-gray-900">{warga.alamat}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-3 font-medium text-gray-500">Pekerjaan</td>
                      <td className="px-6 py-3 text-gray-900">{warga.pekerjaan}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-medium text-gray-500">Klasifikasi Desil</td>
                      <td className="px-6 py-3"><span className="bg-sky-100 text-sky-800 px-2 py-1 rounded font-bold">Desil {warga.desil}</span></td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-6 bg-gray-50">
                  <button onClick={() => setShowForm(true)} className="w-full bg-sky-700 text-white py-3 rounded-lg font-semibold hover:bg-sky-800">Lanjutkan Pengajuan Surat</button>
                  {warga.desil > 5 && <p className="text-xs text-red-500 mt-3 text-center">*Surat sosial (SKTM/Bansos) tidak tersedia untuk Desil 6-10.</p>}
                </div>
              </div>
            )}

            {/* Form Pengajuan */}
            {showForm && warga && (
              <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Jenis Surat</label>
                  <select value={selectedSurat} onChange={(e) => setSelectedSurat(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-900">
                    <option value="">-- Pilih Surat --</option>
                    {suratTersedia.map(surat => <option key={surat} value={surat}>{surat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan / Keperluan</label>
                  <textarea 
                    placeholder="Contoh: Untuk mengurus bantuan pendidikan..." 
                    value={keperluan} 
                    onChange={(e) => setKeperluan(e.target.value)} 
                    rows={3} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none text-gray-900 bg-white" 
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50">Batal</button>
                  <button onClick={handleAjukan} disabled={!selectedSurat || !keperluan} className="flex-1 bg-sky-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-sky-800 disabled:opacity-50">Buat Surat</button>
                </div>
              </div>
            )}
          </>
        )}

        {/* SURAT SELESAI */}
        {suratSelesai && warga && (
          <div className="bg-green-50 p-8 rounded-xl border border-green-200 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">✓</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Surat Berhasil Dibuat!</h3>
            <p className="text-green-600 mb-6">Silakan klik tombol di bawah ini untuk mencetak atau menyimpan surat Anda sebagai PDF.</p>
            
            <div className="flex gap-3 justify-center mb-8 no-print">
              <button onClick={() => { setWarga(null); setSearchQuery(""); setSuratSelesai(null); }} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">Selesai</button>
              <button onClick={handleCetak} className="bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Cetak / Save PDF
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AREA CETAK SURAT A4 (Tersembunyi dari layar utama) */}
      {suratSelesai && warga && (
        <div style={{ position: "absolute", left: "-9999px", top: "0" }}>
          <SuratFormat 
            jenis={suratSelesai.jenis_surat} 
            data={{ nama: warga.nama, nik: warga.nik, alamat: warga.alamat, pekerjaan: warga.pekerjaan }} 
            keperluan={suratSelesai.keperluan} 
            nomorSurat={suratSelesai.nomor_surat} 
          />
        </div>
      )}
    </section>
  );
}