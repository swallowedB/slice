import { useNavActive } from "@/app/(protected)/_components/navigation/hooks/useNavActive";
import { useGoalList } from "@/hooks/queries/goals";
import { FlagIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import NavigationGoalSection from "./NavigationGoalSection";
import NavigationLink from "./NavigationLink";

interface NavigationMenuProps {
  newGoalInputSignal: number;
}

export default function NavigationMenu({ newGoalInputSignal }: NavigationMenuProps) {
  const { data } = useGoalList();
  const firstGoalId = data?.goals?.[0]?.id;
  const goalsHref = firstGoalId ? `/goals/${firstGoalId}` : "/";

  const { isDashboardActive, isGoalsSectionActive } = useNavActive();

  return (
    <nav className="mb-1 flex w-full flex-col gap-2">
      <NavigationLink
        title="대시보드"
        href="/"
        icon={<Squares2X2Icon className="h-6 w-6" />}
        isActive={isDashboardActive}
      />
      <NavigationLink
        title="목표"
        href={goalsHref}
        icon={<FlagIcon className="h-6 w-6 opacity-90" />}
        isActive={isGoalsSectionActive}
      />
      <NavigationGoalSection newGoalInputSignal={newGoalInputSignal} />
    </nav>
  );
}
