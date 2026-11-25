import { useEffect } from "react";

/** Liga a revelação suave dos blocos com data-revelar (uma vez por página). */
export function useRevelar() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const alvos = document.querySelectorAll<HTMLElement>("[data-revelar]");
    if (!("IntersectionObserver" in window)) {
      alvos.forEach((a) => a.classList.add("visivel"));
      return;
    }
    const obs = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            obs.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    alvos.forEach((a) => obs.observe(a));
    return () => obs.disconnect();
  }, []);
}
