import { useEffect, useState } from "react";

interface useScrollIndicatorReturnType {
  isScrolled: boolean;
}

export const useScrollIndicator = (
  handler?: () => void,
  scrollTop: number = 0
): useScrollIndicatorReturnType => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const _scrollTop = window.pageYOffset;
      setIsScrolled(_scrollTop > scrollTop);
      handler && handler();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handler, scrollTop]);

  return {
    isScrolled,
  };
};
