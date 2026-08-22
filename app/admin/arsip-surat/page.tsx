"use client";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/lib/supabase/client";
import SuratFormat from "@/components/templates/SuratFormat";

export default function ArsipSurat() {
  const [arsip, setArsip] = useState<any[]>([]);
  const [filter, setFilter] = useState("Semua");
  const [printData, setPrintData] = useState<any>(null);

  const fetchArsip = async () => {
    let query = supabaseAdmin.from('pengajuan_surat').select('*').order('tanggal_pengajuan', { ascending: true });
    if (filter !== "Semua") {
      query = query.eq('jenis_surat', filter);
    }
    const { data } = await query;
    if (data) setArsip(data);
  };

  useEffect(() => { fetchArsip(); }, [filter]);

  const handleCetakSalinan = (surat: any) => {
    setPrintData(surat);
  };

  return (
    <div>
      <div className="no-print print:hidden">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Arsip & Manajemen Surat</h1>
        <p className="text-gray-500 mb-6">Catatan arsip keluar-masuk surat resmi RT 17 / RW 02 yang sudah terbit.</p>

        {/* Filter Jenis Surat */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {["Semua", "SKTM", "SK Bansos", "SK Domisili", "SKU", "Surat Pengantar SKCK", "Surat Keterangan Berkelakuan Baik", "Surat Pengantar KTP/KK"].map(j => (
            <button key={j} onClick={() => setFilter(j)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === j ? "bg-sky-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              {j}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-sky-800 text-white">
              <tr>
                <th className="p-3 rounded-l-lg">Tanggal Keluar</th>
                <th className="p-3">Nomor Surat</th>
                <th className="p-3">Nama Pemohon</th>
                <th className="p-3">Jenis Surat</th>
                <th className="p-3">Penandatangan (RT)</th>
                <th className="p-3 rounded-r-lg text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {arsip.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-sky-50">
                  <td className="p-3 text-gray-600 whitespace-nowrap">{new Date(r.tanggal_pengajuan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                  <td className="p-3 font-mono text-gray-700 whitespace-nowrap">{r.nomor_surat}</td>
                  <td className="p-3 font-medium text-gray-900 whitespace-nowrap">{r.nama}</td>
                  <td className="p-3 text-gray-600">{r.jenis_surat}</td>
                  <td className="p-3 text-gray-600">Fathur Ramadhan, S.Tr.Kom.</td>
                  <td className="p-3 text-center">
                    <button onClick={() => handleCetakSalinan(r)} className="bg-sky-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-sky-700 inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> Cetak Salinan (Legalisir)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {arsip.length === 0 && <p className="text-center py-8 text-gray-400">Belum ada surat di arsip ini.</p>}
        </div>
      </div>

      {/* MODAL PREVIEW */}
      {printData && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 no-print print:hidden">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10 no-print print:hidden">
              <h2 className="text-xl font-bold text-gray-800">Pratinjau Salinan Surat (Legalisir)</h2>
              <button onClick={() => setPrintData(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-4 print:hidden">
              <div id="print-area-preview">
                <SuratFormat 
                  id={printData.id}
                  jenis={printData.jenis_surat} 
                  data={{ 
                    nama: printData.nama, 
                    nik: printData.nik, 
                    alamat: printData.alamat, 
                    pekerjaan: printData.pekerjaan,
                    tempatLahir: printData.tempat_lahir,
                    tanggalLahir: printData.tanggal_lahir ? new Date(printData.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-",
                    jenisKelamin: printData.jenis_kelamin
                  }} 
                  keperluan={printData.keperluan} 
                  nomorSurat={printData.nomor_surat} 
                  isCopy={true}
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

      {/* AREA CETAK A4 (Hanya muncul saat print) */}
      {printData && (
        <div className="hidden print:block">
          <div id="print-area">
            <SuratFormat 
              id={printData.id}
              jenis={printData.jenis_surat} 
              data={{ 
                nama: printData.nama, 
                nik: printData.nik, 
                alamat: printData.alamat, 
                pekerjaan: printData.pekerjaan,
                tempatLahir: printData.tempat_lahir,
                tanggalLahir: printData.tanggal_lahir ? new Date(printData.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-",
                jenisKelamin: printData.jenis_kelamin
              }} 
              keperluan={printData.keperluan} 
              nomorSurat={printData.nomor_surat} 
              isCopy={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}