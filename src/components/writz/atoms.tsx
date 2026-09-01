import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-reveal";

/** Fade-up reveal on scroll, with optional stagger delay. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("wz-reveal", inView && "is-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Progressive word-by-word title reveal. */
export function WordReveal({
  text,
  className,
  delay = 0,
  step = 70,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>({ threshold: 0.3 });
  return (
    <Tag ref={ref as never} className={cn("inline-block", className)}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className={cn("wz-word inline-block", inView && "is-in")}
            style={{ transitionDelay: `${delay + i * step}ms` }}
          >
            {word}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Typewriter cycling through phrases. */
export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length] ?? "";
    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setSub((s) => s + (deleting ? -1 : 1)),
      deleting ? 35 : 65,
    );
    return () => clearTimeout(t);
  }, [sub, deleting, index, words]);

  const current = words[index % words.length] ?? "";
  return (
    <span className={className}>
      {current.slice(0, sub)}
      <span className="wz-caret" aria-hidden="true" />
    </span>
  );
}
