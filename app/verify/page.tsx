"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import SuratFormat from "@/components/templates/SuratFormat";

function VerifikasiKonten() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [surat, setSurat] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    async function fetchData() {
      const { data } = await supabase
        .from('pengajuan_surat')
        .select('*')
        .eq('id', id)
        .single();
        
      if (data) setSurat(data);
      setLoading(false);
    }
    
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-700 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Sedang memverifikasi dokumen...</p>
        </div>
      </div>
    );
  }
  
  if (!surat) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-red-800 mb-2">Dokumen Tidak Ditemukan</h1>
          <p className="text-gray-600">QR Code tidak valid atau surat tidak terdaftar di sistem RT 17 / RW 02.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-50 border-b border-green-200 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">Dokumen Terverifikasi</h1>
              <p className="text-green-600 text-sm">Surat ini sah dan diterbitkan oleh sistem RT 17 / RW 02.</p>
            </div>
          </div>
          <button onClick={() => window.print()} className="bg-sky-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-sky-800 flex items-center gap-2 no-print">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg> Unduh PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 -mt-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6 no-print">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Rincian Verifikasi Surat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">Nomor Surat:</span> <br /> <span className="font-mono font-semibold text-gray-900">{surat.nomor_surat}</span></div>
            <div><span className="text-gray-500">Nama Pemohon:</span> <br /> <span className="font-semibold text-gray-900">{surat.nama}</span></div>
            <div><span className="text-gray-500">Tanggal Diterbitkan:</span> <br /> <span className="font-semibold text-gray-900">{new Date(surat.tanggal_pengajuan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
            <div><span className="text-gray-500">Jenis Surat:</span> <br /> <span className="font-semibold text-gray-900">{surat.jenis_surat}</span></div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mb-4 no-print">Pratinjau Dokumen Asli di bawah ini:</p>
        
        <div id="print-area">
          <SuratFormat 
            id={surat.id}
            jenis={surat.jenis_surat} 
            data={{ 
              nama: surat.nama, 
              nik: surat.nik, 
              alamat: surat.alamat, 
              pekerjaan: surat.pekerjaan,
              tempatLahir: surat.tempat_lahir,
              tanggalLahir: surat.tanggal_lahir ? new Date(surat.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-",
              jenisKelamin: surat.jenis_kelamin
            }} 
            keperluan={surat.keperluan} 
            nomorSurat={surat.nomor_surat} 
            isCopy={false} 
          />
        </div>
      </div>
    </div>
  );
}

export default function VerifySurat() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat...</div>}>
      <VerifikasiKonten />
    </Suspense>
  );
}