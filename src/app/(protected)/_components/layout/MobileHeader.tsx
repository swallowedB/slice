"use client"
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import NavigationMobileDrawer from "../navigation/NavigationMobileDrawer";

interface MobileHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export default function MobileHeader({ title, actions }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-300 mb-4 flex w-full items-center justify-between bg-white px-5 py-4 shadow-sm sm:hidden">
        <div className="flex items-center gap-4">
          <button onClick={openDrawer}>
            <Bars3Icon
              className="h-6 w-6 text-gray-400"
              strokeWidth={2}
            />
          </button>
          <span className="font-semibold">{title}</span>
        </div>

        <div className="flex items-center gap-4">{actions}</div>
      </header>

      <NavigationMobileDrawer
        isOpen={isOpen}
        onClose={closeDrawer}
        className="sm:hidden"
      />
    </>
  );
}
