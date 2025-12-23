"use client";
import ModalBackground from "./ModalBackground";

interface BaseLayoutProps {
  children: React.ReactNode;
  sizeClass?: string;
}

export default function BaseLayout({
  children,
  sizeClass = "",
}: BaseLayoutProps) {
  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center"
      role="dialog"
      aria-modal="true">
      <ModalBackground />
      <div
        className={`relative z-1000 min-w-56 rounded-2xl bg-white p-4 md:rounded-3xl md:p-6 ${sizeClass}`}>
        {children}
      </div>
    </div>
  );
}
