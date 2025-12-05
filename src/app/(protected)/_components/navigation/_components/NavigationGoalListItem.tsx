import Link from "next/link";

interface NavigationGoalListItemProps {
  title: string;
  href: string;
}

export default function NavigationGoalListItem({
  title,
  href,
}: NavigationGoalListItemProps) {
  return (
    <li className="w-full px-4 py-3 font-medium ">
      <Link href={href}
      className="truncate text-gray-700 hover:text-orange-400"
      >{title}</Link>
    </li>
  );
}
