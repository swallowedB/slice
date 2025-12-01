import { Squares2X2Icon } from "@heroicons/react/24/solid";
import NavigationLink from "./NavigationLink";
import NavigationGoalSection from "./NavigationGoalSection";

export default function NavigationMenu() {
  return (
    <nav className="mb-1 flex w-full flex-col gap-2">
      <NavigationLink
        title="대시보드"
        href="/"
        icon={<Squares2X2Icon className="h-6 w-6" />}
        isActive={true}
      />

      <NavigationGoalSection />
    </nav>
  );
}
