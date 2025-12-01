"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <header className="fixed top-0 z-300 mb-4 flex w-full items-center justify-between bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button>
          <Bars3Icon
            className="h-6 w-6 text-gray-400"
            strokeWidth={2}
          />
        </button>
        <span className="font-semibold">{title}</span>
      </div>

      <div className="flex items-center gap-4" >{actions}</div>
    </header>
  );
}
