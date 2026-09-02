import { useEffect, useRef, useState } from "react";

/** Custom desktop cursor: crisp dot + soft trailing ring. */
export function CustomCursor() {
  const [desktop, setDesktop] = useState(false);
  
  useEffect(() => {
    const check = window.matchMedia('(pointer: fine) and (min-width: 768px)');
    setDesktop(check.matches);
    check.addEventListener('change', e => setDesktop(e.matches));
    return () => check.removeEventListener('change', () => {});
  }, []);
  
  if (!desktop) return null;
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.add("wz-cursor-none");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest("a, button, [data-cursor='hover']");
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.15;
      ring.y += (pos.y - ring.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.9 : 1})`;
        ringRef.current.style.opacity = hovering ? "0.9" : "0.45";
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("wz-cursor-none");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="wz-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="wz-cursor-dot" aria-hidden="true" />
    </>
  );
}
