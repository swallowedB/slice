import Link from "next/link";

interface NavigationLinkProps {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export default function NavigationLink({
  title,
  href,
  icon,
  isActive,
}: NavigationLinkProps) {
  return (
    <Link
      href={href}
      className={`flex cursor-pointer items-center gap-2 ${isActive ? "bg-orange-250/15 text-orange-400" : "bg-transparent"} w-full flex-1 rounded-2xl px-3.5 py-3`}>
      <span className={`${isActive ? "" : "text-gray-300"}`}>
        {icon}
      </span>
      <p
        className={`font-semibold lg:text-lg ${isActive ? "text-orange-400" : "text-gray-650"} `}>
        {title}
      </p>
    </Link>
  );
}
