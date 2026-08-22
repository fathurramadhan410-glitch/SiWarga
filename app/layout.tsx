import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NotificationProvider } from "@/lib/NotificationContext";

export const metadata = {
  title: "SiWarga - Portal RT 17/02",
  description: "Sistem Informasi Administrasi Warga",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col font-sans">
        <NotificationProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </NotificationProvider>
      </body>
    </html>
  );
}