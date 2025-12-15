import Link from "next/link";

interface Props {
  title: string;
  href: string;
  isActive: boolean;
}

export default function NavigationGoalListItem({
  title,
  href,
  isActive,
}: Props) {
  return (
    <li className="w-full px-4 py-3 font-medium">
      <Link
        href={href}
        className={[
          "block truncate rounded-md transition-colors",
          isActive
            ? "font-medium text-orange-400"
            : "text-gray-700 hover:text-orange-200",
        ].join(" ")}
        aria-current={isActive ? "page" : undefined}>
        {title}
      </Link>
    </li>
  );
}
