import { FlagIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import NavigationGoalSection from "./NavigationGoalSection";
import NavigationLink from "./NavigationLink";

export default function NavigationMenu() {
  return (
    <nav className="mb-1 flex w-full flex-col gap-2">
      <NavigationLink
        title="대시보드"
        href="/"
        icon={<Squares2X2Icon className="h-6 w-6" />}
        isActive={true}
      />
      <NavigationLink
        title="목표"
        href="/goals/1"
        icon={<FlagIcon className="h-6 w-6 opacity-90" />}
        isActive={false}
      />
      <NavigationGoalSection />
    </nav>
  );
}
