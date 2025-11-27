import Link from "next/link";

interface AuthSwitchProps {
  text: string;
  actionText: string;
  href: string;
}

export default function AuthSwitch({
  text,
  actionText,
  href,
}: AuthSwitchProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-black/70 md:text-base">
        {text}
      </span>
      <Link
        href={href}
        className="cursor-pointer text-sm font-medium text-orange-400 md:text-base md:font-semibold">
        {actionText}
      </Link>
    </div>
  );
}
