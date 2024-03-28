import { useEffect, useState } from "react";

export default function useScrollActive(startLimit = 20) {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > startLimit);
    });
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return scroll;
}
