"use client";
import { useEffect, useState } from "react";
import { supabaseAdmin } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalWarga: 0, wargaMiskin: 0, totalPengajuan: 0, pengajuanSelesai: 0 });

  useEffect(() => {
    async function fetchStats() {
      // 1. Ambil semua NIK warga yang masih aktif
      const { data: wargaData } = await supabaseAdmin.from('warga').select('nik');
      const activeNiks = wargaData ? wargaData.map(w => w.nik) : [];
      
      // 2. Hitung total warga & warga miskin
      const { count: totalWarga } = await supabaseAdmin.from('warga').select('*', { count: 'exact', head: true });
      const { count: wargaMiskin } = await supabaseAdmin.from('warga').select('*', { count: 'exact', head: true }).lte('desil', 3);
      
      let totalPengajuan = 0;
      let pengajuanSelesai = 0;

      // 3. Hitung pengajuan HANYA dari warga yang aktif
      if (activeNiks.length > 0) {
        const { count: pCount } = await supabaseAdmin.from('pengajuan_surat').select('*', { count: 'exact', head: true }).in('nik', activeNiks);
        totalPengajuan = pCount || 0;
        
        const { count: sCount } = await supabaseAdmin.from('pengajuan_surat').select('*', { count: 'exact', head: true }).eq('status', 'Selesai').in('nik', activeNiks);
        pengajuanSelesai = sCount || 0;
      }

      setStats({
        totalWarga: totalWarga || 0,
        wargaMiskin: wargaMiskin || 0,
        totalPengajuan,
        pengajuanSelesai,
      });
    }
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Warga", value: stats.totalWarga, color: "bg-sky-500", icon: "👥" },
    { title: "Warga Rentan (Desil 1-3)", value: stats.wargaMiskin, color: "bg-red-500", icon: "🚨" },
    { title: "Total Pengajuan Surat", value: stats.totalPengajuan, color: "bg-indigo-500", icon: "📄" },
    { title: "Surat Selesai Diproses", value: stats.pengajuanSelesai, color: "bg-green-500", icon: "✅" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Ringkasan statistik data warga dan pengajuan surat.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{card.value}</h3>
            </div>
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-2xl text-white`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}