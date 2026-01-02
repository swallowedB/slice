"use client";

import { ReactNode, useEffect } from "react";

interface MobileDialogLayoutProps {
  children: ReactNode;
  onClose: () => void;
}

export default function MobileDialogLayout({
  children,
  onClose,
}: MobileDialogLayoutProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div
      className="fixed inset-0 flex flex-col justify-end bg-black/40"
      onClick={onClose}>
      {/* 아래에서 올라오는 효과 */}
      <div
        className="w-full rounded-t-4xl bg-white p-8"
        style={{
          animation: "slideUp 0.25s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
