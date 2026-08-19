import Hero from "@/components/sections/Hero";
import Fitur from "@/components/sections/Fitur";
import CaraKerja from "@/components/sections/CaraKerja";
import PengajuanSurat from "@/components/sections/PengajuanSurat";
import DataWarga from "@/components/sections/DataWarga";
import Berita from "@/components/sections/Berita";
import Kontak from "@/components/sections/Kontak";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Fitur />
      <CaraKerja />
      <PengajuanSurat />
      <DataWarga />
      <Berita />
      <Kontak />
    </div>
  );
}