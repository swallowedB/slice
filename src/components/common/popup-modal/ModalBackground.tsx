"use client";
export default function ModalBackground({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute inset-0 z-900 bg-black/60"
      onClick={onClick}
    />
  );
}
