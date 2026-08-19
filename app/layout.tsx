import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SiWarga - Portal RT 001/005",
  description: "Sistem Informasi Administrasi Warga RT 001 / RW 005",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col font-sans">
        
        {/* HEADER */}
        <Navbar />

        {/* KONTEN HALAMAN */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}