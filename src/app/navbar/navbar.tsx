"use client";
import { Logo } from "@/components/logo";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";
import { ROUTES } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

export const NavBar: FC = () => {
  const { isScrolled } = useScrollIndicator();
  const pathname = usePathname();
  const buttons = [ROUTES.HOME, ROUTES.PLAYGROUND, ROUTES.DOCS];
  const [activeButtonPosition, setActiveButtonPosition] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const activeButtonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (activeButtonRef.current) {
      setActiveButtonPosition({
        left: activeButtonRef.current.offsetLeft,
        width: activeButtonRef.current.offsetWidth,
      });
    }
  }, [pathname]);

  return (
    <nav className="h-16">
      <div
        className={`h-16 bg-black bg-opacity-50 backdrop-blur-md px-10 border-b border-white transition-colors duration-100 flex justify-between fixed left-0 top-0 w-full items-center ${
          isScrolled ? "border-opacity-20" : "border-opacity-0"
        }`}
      >
        <Logo scrolled={isScrolled} />
        <div className="absolute flex gap-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-regular text-sm">
          {buttons.map((route, index) => {
            const isActive = pathname == route.url;
            return (
              <Link
                key={index}
                href={route.url}
                className={`cursor-pointer px-3 py-2 rounded-md z-10 ${
                  isActive ? "text-white" : "text-white/50"
                }`}
                ref={isActive ? activeButtonRef : null}
              >
                {route.displayName}
              </Link>
            );
          })}
          {activeButtonPosition && (
            <div
              className="absolute bottom-0 rounded-md bg-white/10 z-0"
              style={{
                left: activeButtonPosition.left,
                width: activeButtonPosition.width,
                height: "36px",
                transition: "all 150ms",
              }}
            />
          )}
        </div>
        <div className="rounded-full bg-white w-7 h-7"></div>
      </div>
    </nav>
  );
};
