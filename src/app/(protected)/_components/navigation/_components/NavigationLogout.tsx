import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import TextButton from "@/components/common/button/TextButton";
import { useLogout } from "@/hooks/queries/auth/useLogout";

export default function NavigationLogout() {
  const logout = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <TextButton
      onClick={handleLogout}
      variant="secondary"
      className="opacity-50 hover:opacity-100">
      <div className="flex items-center gap-2 px-4 py-3">
        <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
        <span>로그아웃</span>
      </div>
    </TextButton>
  );
}
