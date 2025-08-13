"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type Props = {
  speed?: number;
  className?: string;
  direction?: "left" | "right";
};

export default function Marquee({
  speed = 12,
  className,
  direction = "left",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current!;
      const row = track.children[0] as HTMLElement;

      const setup = () => {
        tweenRef.current?.kill();

        const rowWidth = row.offsetWidth;
        const dir = direction === "right" ? 1 : -1;

        gsap.set(track, { x: 0 });

        const wrapX = gsap.utils.wrap(-rowWidth, 0);

        tweenRef.current = gsap.to(track, {
          x: dir * rowWidth,
          duration: speed,
          ease: "none",
          repeat: -1,
          modifiers: { x: (x) => `${wrapX(parseFloat(x))}px` },
        });
      };

      setup();
      roRef.current = new ResizeObserver(() => setup());
      roRef.current.observe(track);

      return () => {
        tweenRef.current?.kill();
        roRef.current?.disconnect();
      };
    },
    { scope: wrapperRef, dependencies: [speed, direction] }
  );

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "w-full overflow-hidden bg-[#120D6A] py-4 select-none inline-block rotate-[1.5deg]",
        className
      )}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        <Row />
        <Row ariaHidden />
        <Row ariaHidden />
      </div>
    </div>
  );
}

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center justify-end gap-10"
      aria-hidden={ariaHidden}
    >
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="flex items-center gap-10 text-white font-orbitron font-bold text-xl"
        >
          noventis
          <span className="text-[#FF6849] text-sm inline-block rotate-6">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}
