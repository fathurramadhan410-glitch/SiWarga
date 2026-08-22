"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type NotifStatus = "success" | "error" | "warning" | "info";

interface NotifState {
  isOpen: boolean;
  status: NotifStatus;
  title: string;
  message: string;
}

interface NotifContextType extends NotifState {
  showNotif: (status: NotifStatus, title: string, message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotifContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notif, setNotif] = useState<NotifState>({
    isOpen: false,
    status: "success",
    title: "",
    message: "",
  });

  const showNotif = useCallback((status: NotifStatus, title: string, message: string, duration: number = 2500) => {
    setNotif({ isOpen: true, status, title, message });
    setTimeout(() => {
      setNotif((prev) => ({ ...prev, isOpen: false }));
    }, duration);
  }, []);

  const colors: Record<NotifStatus, { bg: string; text: string; path: string }> = {
    success: { bg: "bg-green-100", text: "text-green-600", path: "M5 13l4 4L19 7" },
    error: { bg: "bg-red-100", text: "text-red-600", path: "M6 18L18 6M6 6l12 12" },
    warning: { bg: "bg-yellow-100", text: "text-yellow-600", path: "M12 9v2m0 4h.01" },
    info: { bg: "bg-sky-100", text: "text-sky-600", path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
  };

  return (
    <NotificationContext.Provider value={{ ...notif, showNotif }}>
      {children}
      {notif.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm no-print">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all duration-300 scale-100">
            <div className={`w-20 h-20 mx-auto ${colors[notif.status].bg} rounded-full flex items-center justify-center mb-6`}>
              <svg className={`w-12 h-12 ${colors[notif.status].text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={colors[notif.status].path} />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{notif.title}</h3>
            <p className="text-gray-500 mb-8">{notif.message}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}