import { useEffect, useState } from "react";

export const useScroller = () => {
  const [scrolled, setScroller] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 20) setScroller(true);
      else setScroller(false);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return scrolled;
};
