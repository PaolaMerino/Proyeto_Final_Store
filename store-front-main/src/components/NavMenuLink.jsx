import { cn } from "@/utils/styles";
import Link from "next/link";
import { useRouter } from "next/router";

export function NavMenuLink({ label, href }) {
  const router = useRouter();

  const path = router.pathname;

  const isActive = path.includes(href);

  return (
    <Link
      className={cn("px-4 w-[140px] text-center py-2 bg-blue-800 text-white rounded-lg font-bold text-xl", {
        "bg-white text-blue-800": isActive,
      })}
      href={href}
    >
      {label}
    </Link>
  );
}
