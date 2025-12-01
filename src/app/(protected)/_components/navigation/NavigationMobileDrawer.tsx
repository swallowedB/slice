"use client";

import NavigationActions from "./_components/NavigationActions";
import NavigationLogout from "./_components/NavigationLogout";
import NavigationMenu from "./_components/NavigationMenu";
import NavigationProfile from "./_components/NavigationProfile";

interface NavigationMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationMobileDrawer({
  isOpen,
  onClose,
}: NavigationMobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-400 transition-all duration-100">
      <aside className="absolute inset-0 flex h-full w-full flex-col bg-white shadow-2xl">
        {/* 상단 헤더 영역 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <button
            className="text-sm text-gray-500"
            onClick={onClose}>
            닫기
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <section className="flex h-full flex-col justify-between px-5 py-6">
          <NavigationMenu />

          <div >
            <NavigationActions />
            <NavigationProfile />
            <NavigationLogout />
          </div>
        </section>
      </aside>
    </div>
  );
}
