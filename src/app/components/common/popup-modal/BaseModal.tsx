"use client"
import ModalBackground from "../ModalBackground";

export default function BaseModal({children}:{children:React.ReactNode}) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      role="dialog"
      aria-modal='true'
    >
      <ModalBackground />
      <div className="relative z-1000 bg-bg rounded-2xl md:rounded-3xl p-4 md:p-8 min-w-56">
        {children}
      </div>
    </div>
  )
}
