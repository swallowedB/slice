"use client";
import ModalBackground from "../ModalBackground";

interface BaseModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function BaseModal({ children, onClose }: BaseModalProps) {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center'
      role='dialog'
      aria-modal='true'>
      <ModalBackground onClick={onClose} />
      <div className='bg-bg relative z-1000 min-w-56 rounded-2xl p-4 md:rounded-3xl md:p-8'>
        {children}
      </div>
    </div>
  );
}
