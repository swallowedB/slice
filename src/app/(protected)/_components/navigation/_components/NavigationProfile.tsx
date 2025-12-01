import { getRandomProfile } from "@/utils/getRandomProfile";
import { useMemo } from "react";

export default function NavigationProfile() {
  const avatar = useMemo(() => getRandomProfile(), []);

  return (
    <section className="flex gap-4 border items-center rounded-3xl mb-3  px-3 py-3 border-gray-200 cursor-pointer ">
      <img src={avatar} alt="체다치즈님의 프로필" className="w-12 h-12" />
      <div className="flex flex-col items-start ">
        <p className="text-sm font-semibold">체다치즈</p>
        <p className="text-xs text-gray-600" >cheeseEmail@slice.kr</p>
      </div>
    </section>
  )
}
