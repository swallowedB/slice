import { useAuthStore } from "@/store/useAuthStore";
import { getRandomProfile } from "@/utils/getRandomProfile";
import { useMemo } from "react";

export default function NavigationProfile() {
  const user = useAuthStore((state) => state.user);
  const avatar = useMemo(() => getRandomProfile(), []);

  if (!user) {
    return (
      <section className="mb-3 flex items-center gap-4 rounded-3xl border border-gray-200 px-3 py-3">
        <div className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="flex flex-col items-start gap-1">
          <div className="h-3 w-16 rounded bg-gray-200" />
          <div className="h-3 w-24 rounded bg-gray-200" />
        </div>
      </section>
    );
  }

  return (
    <section className="mb-3 flex items-center gap-4 rounded-3xl border border-gray-200 px-3 py-3">
      <img
        src={avatar}
        alt={`${user.name}님의 프로필`}
        className="h-12 w-12"
      />
      <div className="flex flex-col items-start">
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="text-xs text-gray-600">{user.email}</p>
      </div>
    </section>
  );
}
