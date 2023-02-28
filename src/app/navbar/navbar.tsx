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
  const [activeButtonPosition, setActiveButtonPosition] = useState(null);
  const activeButtonRef = useRef(null);

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
        className={`h-16 bg-white/70 backdrop-blur-md px-10 border-b border-gray-300 transition-colors duration-100 flex justify-between fixed left-0 top-0 w-full items-center ${
          isScrolled ? "border-opacity-100" : "border-opacity-0"
        }`}
      >
        <Logo scrolled={isScrolled} />
        <div className="absolute flex gap-9 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-sm">
          {buttons.map((route, index) => {
            const isActive = pathname == route.url;
            return (
              <Link
                key={index}
                href={route.url}
                className="cursor-pointer px-3 py-2 rounded-md z-10"
                ref={isActive ? activeButtonRef : null}
              >
                {route.displayName}
              </Link>
            );
          })}
          {activeButtonPosition && (
            <div
              className="absolute bottom-0 rounded-md bg-gray-200 z-0"
              style={{
                left: activeButtonPosition.left,
                width: activeButtonPosition.width,
                height: "36px",
                transition: "all 150ms",
              }}
            />
          )}
        </div>
        <div className="rounded-full bg-black w-7 h-7"></div>
      </div>
    </nav>
  );
};
