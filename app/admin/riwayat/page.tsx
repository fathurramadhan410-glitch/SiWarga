"use client";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/lib/supabase/client";
import SuratFormat from "@/components/templates/SuratFormat";

export default function RiwayatPengajuan() {
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const [printData, setPrintData] = useState<{ surat: any, warga: any } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabaseAdmin.from('pengajuan_surat').select('*').order('tanggal_pengajuan', { ascending: false });
      if (data) setRiwayat(data);
    }
    fetchData();
  }, []);

  const handleCetakUlang = async (surat: any) => {
    const { data: warga } = await supabaseAdmin.from('warga').select('*').eq('nik', surat.nik).single();
    if (warga) {
      setPrintData({ surat, warga });
    } else {
      alert("Data warga untuk NIK ini tidak ditemukan di database!");
    }
  };

  return (
    <div>
      {/* BAGIAN APLIKASI (Hilang saat print) */}
      <div className="no-print print:hidden">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Riwayat Pengajuan Surat</h1>
        <p className="text-gray-500 mb-8">Daftar surat yang telah diajukan oleh warga secara mandiri.</p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-sky-800 text-white">
              <tr>
                <th className="p-3 rounded-l-lg">NIW (NIK)</th>
                <th className="p-3">Nama Warga</th>
                <th className="p-3">Jenis Surat</th>
                <th className="p-3">Keperluan</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-sky-50">
                  <td className="p-3 font-mono text-gray-700">NIW-{r.nik.slice(-4)}</td>
                  <td className="p-3 font-medium text-gray-900">{r.nama}</td>
                  <td className="p-3 text-gray-600">{r.jenis_surat}</td>
                  <td className="p-3 text-gray-600 max-w-xs truncate">{r.keperluan}</td>
                  <td className="p-3 text-gray-600">{new Date(r.tanggal_pengajuan).toLocaleDateString('id-ID')}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${r.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
                  </td>
                  <td className="p-3 text-center">
                    {r.status === 'Selesai' && (
                      <button onClick={() => handleCetakUlang(r)} className="bg-sky-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-sky-700 inline-flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg> Cetak Ulang
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {riwayat.length === 0 && <p className="text-center py-8 text-gray-400">Belum ada riwayat pengajuan.</p>}
        </div>
      </div>

      {/* MODAL PREVIEW (Hilang saat print) */}
      {printData && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 no-print print:hidden">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10 no-print print:hidden">
              <h2 className="text-xl font-bold text-gray-800">Pratinjau Cetak Ulang Surat</h2>
              <button onClick={() => setPrintData(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-4 print:hidden">
              {/* Pratinjau di Layar dengan Data Lengkap */}
              <div id="print-area-preview">
                <SuratFormat 
                  jenis={printData.surat.jenis_surat} 
                  data={{ 
                    nama: printData.warga.nama, 
                    nik: printData.warga.nik, 
                    alamat: printData.warga.alamat, 
                    pekerjaan: printData.warga.pekerjaan,
                    tempatLahir: printData.warga.tempat_lahir,
                    tanggalLahir: printData.warga.tanggal_lahir ? new Date(printData.warga.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-",
                    jenisKelamin: printData.warga.jenis_kelamin
                  }} 
                  keperluan={printData.surat.keperluan} 
                  nomorSurat={printData.surat.nomor_surat} 
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end gap-3 no-print print:hidden">
              <button onClick={() => setPrintData(null)} className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50">Tutup</button>
              <button onClick={() => window.print()} className="bg-sky-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-sky-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg> Cetak / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AREA CETAK SURAT A4 (Hanya muncul saat print) */}
      {printData && (
        <div className="hidden print:block">
          <div id="print-area">
            <SuratFormat 
              jenis={printData.surat.jenis_surat} 
              data={{ 
                nama: printData.warga.nama, 
                nik: printData.warga.nik, 
                alamat: printData.warga.alamat, 
                pekerjaan: printData.warga.pekerjaan,
                tempatLahir: printData.warga.tempat_lahir,
                tanggalLahir: printData.warga.tanggal_lahir ? new Date(printData.warga.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-",
                jenisKelamin: printData.warga.jenis_kelamin
              }} 
              keperluan={printData.surat.keperluan} 
              nomorSurat={printData.surat.nomor_surat} 
            />
          </div>
        </div>
      )}
    </div>
  );
}