import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import clsx from "clsx";
import {
  DEFAULT_REVEAL_BOTTOM_ROOT_MARGIN,
  DEFAULT_REVEAL_DELAY,
  REVEAL_THRESHOLD,
} from "./Reveal.config";

import s from "./Reveal.module.scss";

interface RevealProps extends PropsWithChildren {
  delay?: number;
  bottomRootMargin?: string;
}

function Reveal({
  delay = DEFAULT_REVEAL_DELAY,
  bottomRootMargin = DEFAULT_REVEAL_BOTTOM_ROOT_MARGIN,
  children,
}: RevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = wrapperRef.current;

    /* v8 ignore next -- @preserve */
    if (!element) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          io.disconnect();
        }
      },
      {
        threshold: REVEAL_THRESHOLD,
        rootMargin: `0px 0px ${bottomRootMargin} 0px`,
      },
    );

    io.observe(element);

    return () => io.disconnect();
  }, [bottomRootMargin]);

  return (
    <div
      ref={wrapperRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={clsx(s["reveal"], {
        [s["reveal_revealed"]]: isRevealed,
      })}
    >
      {children}
    </div>
  );
}

export default Reveal;
