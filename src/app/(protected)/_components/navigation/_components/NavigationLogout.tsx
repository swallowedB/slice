import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import TextButton from "../../../../../components/common/button/TextButton";

export default function NavigationLogout() {
  const onClickLogout = () => {
    console.log("로그아웃!")
  }
  return (
    <TextButton onClick={onClickLogout} variant="secondary" className="opacity-50 hover:opacity-100" >
      <div className="flex py-3 px-4 gap-2 items-center">
        <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
        <span>로그아웃</span>
      </div>
    </TextButton>
  );
}
