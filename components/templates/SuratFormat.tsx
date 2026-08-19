"use client";
import React from "react";
import { QRCodeSVG } from "qrcode.react";

// KONFIGURASI RT (Bisa diubah sesuai data asli)
const RT_CONFIG = {
  kota: "Kota Bandung",
  kecamatan: "Cibadak",
  kelurahan: "Sukamaju",
  alamatKantor: "Jl. Sukamaju No. 12, Kec. Cibadak, Kota Bandung 40241",
  rt: "001",
  rw: "005",
  namaKetuaRT: "H. Sutrisno, S.Sos", // Bisa tambah gelar apa saja di sini
};

interface SuratProps {
  jenis: string;
  data: {
    nama: string;
    nik: string;
    alamat: string;
    pekerjaan?: string;
    tempatLahir?: string;
    tanggalLahir?: string;
    jenisKelamin?: string;
    agama?: string;
    statusPerkawinan?: string;
  };
  keperluan: string;
  nomorSurat: string;
}

export default function SuratFormat({ jenis, data, keperluan, nomorSurat }: SuratProps) {
  const hariIni = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  // Gaya standar A4 & Times New Roman 12pt (Diatur agar pas 1 halaman)
  const gayaSurat: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: "12pt",
    lineHeight: 1.5,
    color: "#000",
    width: "210mm",
    minHeight: "297mm",
    padding: "15mm 20mm", // Margin agak mengecil agar isi muat
    backgroundColor: "white",
    margin: "0 auto",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "justify",
    overflow: "hidden",
  };

  const tabelData = (
    <table style={{ marginLeft: "20px", marginBottom: "15px", width: "100%" }}>
      <tbody>
        <tr><td style={{ width: "150px" }}>Nama Lengkap</td><td>: {data.nama}</td></tr>
        <tr><td>NIK</td><td>: {data.nik}</td></tr>
        <tr><td>Tempat / Tgl Lahir</td><td>: {data.tempatLahir || "-"}, {data.tanggalLahir || "-"}</td></tr>
        <tr><td>Jenis Kelamin</td><td>: {data.jenisKelamin || "-"}</td></tr>
        <tr><td>Pekerjaan</td><td>: {data.pekerjaan || "-"}</td></tr>
        <tr><td>Alamat</td><td>: {data.alamat}</td></tr>
      </tbody>
    </table>
  );

  // Isi spesifik per jenis surat (Lebih informatif & Formal)
  const renderIsiSurat = () => {
    switch (jenis) {
      case "Surat Keterangan Tidak Mampu":
        return (
          <p>
            Berdasarkan pengetahuan yang sebenarnya, keterangan saksi-saksi, serta pengamatan langsung di lapangan, orang tersebut di atas benar-benar merupakan warga miskin yang kurang mampu secara ekonomi. Keadaan ekonominya diperkirakan tidak sanggup lagi untuk membayar biaya {keperluan}. Surat keterangan ini dibuat untuk dipergunakan sebagai kelengkapan administrasi dalam mengurus {keperluan} di instansi terkait.
          </p>
        );
      case "Surat Keterangan Domisili":
        return (
          <p>
            Berdasarkan data yang ada pada kami, orang tersebut di atas benar-benar berdomisili dan bertempat tinggal tetap di alamat tersebut di atas. Yang bersangkutan dinyatakan sebagai penduduk yang menetap di wilayah RT {RT_CONFIG.rt} / RW {RT_CONFIG.rw} Kelurahan {RT_CONFIG.kelurahan}. Surat keterangan ini dibuat untuk keperluan {keperluan}.
          </p>
        );
      case "Surat Pengantar KTP/KK":
        return (
          <p>
            Orang tersebut di atas belum memiliki / membutuhkan perpanjangan dokumen Kartu Tanda Penduduk (KTP) atau Kartu Keluarga (KK). Surat pengantar ini dibuat untuk dipergunakan sebagai syarat administrasi mengurus pembuatan atau perpanjangan dokumen kependudukan di Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) {RT_CONFIG.kota}.
          </p>
        );
      case "Surat Pengantar Nikah":
        return (
          <p>
            Orang tersebut di atas berstatus {data.statusPerkawinan || "Belum Kawin"} dan akan mengurus persyaratan pencatatan nikah. Berdasarkan catatan kami, tidak ada halangan hukum maupun syariat bagi yang bersangkutan untuk melangsungkan pernikahan. Surat pengantar ini dibuat untuk keperluan {keperluan} di Kementerian Agama (KUA) Kecamatan {RT_CONFIG.kecamatan}.
          </p>
        );
      case "Surat Pengantar SKCK":
        return (
          <p>
            Orang tersebut di atas bersedia dan mengajukan permohonan pembuatan Surat Keterangan Catatan Kepolisian (SKCK). Berdasarkan catatan kami selama yang bersangkutan berdomisili di wilayah kami, yang bersangkutan berkelakuan baik, taat hukum, dan tidak pernah tersangkut perkara pidana. Surat ini dibuat untuk keperluan {keperluan} di Kepolisian Resor (Polres) setempat.
          </p>
        );
      case "Surat Keterangan Usaha":
        return (
          <p>
            Orang tersebut di atas benar-benar memiliki dan menjalankan usaha di bidang {keperluan}. Usaha tersebut berlokasi di alamat yang tersebut di atas dan telah berjalan secara aktif. Surat keterangan ini dibuat untuk dipergunakan sebagai kelengkapan administrasi perizinan usaha atau pengajuan permodalan/kredit usaha di bank/lembaga terkait.
          </p>
        );
      case "Surat Keterangan Kematian/Kelahiran":
        return (
          <p>
            Keterangan ini dibuat berdasarkan keterangan saksi-saksi dan bukti di lapangan bahwa hal tersebut terkait dengan peristiwa {keperluan}. Surat ini dibuat agar yang bersangkutan dapat melapor dan mengurus dokumen kependudukan terkait peristiwa {keperluan} di Disdukcapil {RT_CONFIG.kota}.
          </p>
        );
      case "Surat Rekomendasi":
        return (
          <p>
            Berdasarkan pengamatan, rekam jejak, dan pengetahuan kami selama yang bersangkutan berdomisili di wilayah kami, orang tersebut di atas adalah warga yang aktif, berkelakuan baik, dan layak untuk mendapatkan rekomendasi terkait {keperluan}. Surat rekomendasi ini dibuat atas permintaan yang bersangkutan untuk dipergunakan sebagaimana mestinya.
          </p>
        );
      default:
        return <p>Surat ini dibuat untuk keperluan {keperluan}.</p>;
    }
  };

  return (
    <div id="print-area" style={gayaSurat}>
      {/* KOP SURAT */}
      <div style={{ display: "flex", borderBottom: "3px double #000", paddingBottom: "10px", marginBottom: "20px", textAlign: "center" }}>
        <div style={{ width: "80px", marginRight: "15px", display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%", height: "80px", border: "1px solid #ccc", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>LOGO</div>
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "16pt", margin: 0 }}>PEMERINTAH {RT_CONFIG.kota.toUpperCase()}</h1>
          <h2 style={{ fontSize: "14pt", margin: 0 }}>KECAMATAN {RT_CONFIG.kecamatan.toUpperCase()}</h2>
          <h3 style={{ fontSize: "14pt", margin: 0 }}>KELURAHAN {RT_CONFIG.kelurahan.toUpperCase()}</h3>
          <p style={{ fontSize: "10pt", marginTop: "5px" }}>{RT_CONFIG.alamatKantor}</p>
        </div>
      </div>

      {/* JUDUL SURAT */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <h2 style={{ fontSize: "14pt", textTransform: "uppercase", textDecoration: "underline", margin: 0 }}>{jenis}</h2>
        <p style={{ margin: "5px 0 0 0" }}>Nomor: {nomorSurat}</p>
      </div>

      {/* ISI SURAT */}
      <p>
        Yang bertanda tangan di bawah ini, Ketua RT {RT_CONFIG.rt} / RW {RT_CONFIG.rw} Kelurahan {RT_CONFIG.kelurahan}, Kecamatan {RT_CONFIG.kecamatan}, {RT_CONFIG.kota}, dengan ini menerangkan bahwa:
      </p>
      
      {tabelData}

      {renderIsiSurat()}

      <p style={{ marginTop: "15px" }}>
        Demikian surat keterangan ini dibuat dengan sebenarnya, tanpa adanya paksaan dari pihak manapun. Apabila di kemudian hari terdapat keterangan yang tidak sesuai dengan fakta di lapangan, kami pihak pengurus RT siap mempertanggungjawabkannya. Surat ini dibuat untuk dipergunakan sebagaimana mestinya.
      </p>

      {/* TTD & QR CODE */}
      <div style={{ width: "280px", marginLeft: "auto", textAlign: "center", marginTop: "30px" }}>
        <p style={{ marginBottom: "5px" }}>{RT_CONFIG.kota}, {hariIni}</p>
        <p style={{ marginBottom: "10px" }}>Ketua RT {RT_CONFIG.rt} / RW {RT_CONFIG.rw}</p>
        
        {/* Tanda Tangan Elektronik QR Code */}
        <div style={{ margin: "0 auto 5px auto", width: "80px", border: "1px solid #000", padding: "5px" }}>
          <QRCodeSVG 
            value={`https://siwarga.vercel.app/verify/${nomorSurat}`} 
            size={80} 
            level="H"
            includeMargin={false}
          />
        </div>
        
        <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
          {RT_CONFIG.namaKetuaRT}
        </p>
      </div>
    </div>
  );
}