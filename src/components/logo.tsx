import { FC, HTMLAttributes } from "react";

import { Titillium_Web } from "next/font/google";

const font = Titillium_Web({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  scrolled?: boolean;
}

export const Logo: FC<LogoProps> = ({ scrolled, ...props }) => {
  return (
    <div {...props}>
      <div
        className={`${font.className} transition-colors duration-250 text-white bg-black cursor-pointer font-bold text-xl tracking-tight h-max px-2 py-1 w-max text-center rounded-md`}
      >
        daiku
      </div>
    </div>
  );
};
