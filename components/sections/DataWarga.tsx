"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function DataWarga() {
  const [warga, setWarga] = useState<any[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from('warga').select('*');
      if (data) setWarga(data);
    }
    fetchData();
  }, []);

  const maskNIK = (nik: string) => {
    if (!nik || nik.length < 8) return nik;
    return `NIW-${nik.slice(-4)}`;
  };

  return (
    <section id="data-warga" className="py-20 bg-gray-50 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-sky-800 mb-2">Data Warga</h2>
        <p className="text-center text-gray-500 mb-8">Daftar warga aktif beserta data sosial ekonomi (Privasi NIK terjaga).</p>
        <div className="bg-white rounded-xl shadow-md overflow-x-auto border border-gray-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-sky-800 text-white">
              <tr>
                <th className="p-3 rounded-l-lg">NIW</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Pekerjaan</th>
                <th className="p-3">Alamat</th>
                <th className="p-3 rounded-r-lg">Desil</th>
              </tr>
            </thead>
            <tbody>
              {warga.map((w) => (
                <tr key={w.id} className="border-b border-gray-100 hover:bg-sky-50">
                  <td className="p-3 font-mono text-gray-700">{maskNIK(w.nik)}</td>
                  <td className="p-3 font-medium text-gray-900">{w.nama}</td>
                  <td className="p-3 text-gray-600">{w.pekerjaan}</td>
                  <td className="p-3 text-gray-600">{w.alamat}</td>
                  <td className="p-3 text-gray-600">{w.desil}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {warga.length === 0 && <p className="text-center py-8 text-gray-400">Memuat data...</p>}
        </div>
      </div>
    </section>
  );
}