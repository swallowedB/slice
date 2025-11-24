"use client"
export default function ModalBackground({onClick}:{onClick?: () => void}) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-900" 
      onClick={onClick}
    />
  )
}
