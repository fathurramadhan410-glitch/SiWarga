"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Cek auth hanya di sisi browser (client-side)
    const isAuth = localStorage.getItem("siwarga_auth") === "true";

    if (isLoginPage && isAuth) {
      // Kalau sudah login tapi buka halaman login, tetap di dashboard
      router.push("/admin/dashboard");
    } else if (!isLoginPage && !isAuth) {
      // Kalau belum login tapi buka dashboard, lempar ke login
      router.push("/admin/login");
    } else {
      // Kalau sudah sesuai, izinkan tampil
      setIsAuthChecked(true);
    }
  }, [pathname, router]);

  // Tampilkan loading saat pengecekan auth berlangsung
  if (!isAuthChecked) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Memuat...</div>;
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="md:ml-64 p-8 overflow-y-auto print:ml-0 print:p-0">
        {children}
      </main>
    </div>
  );
}