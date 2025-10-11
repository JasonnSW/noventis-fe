export function LetterBadge({ letter }: { letter: string }) {
  return (
    <div className="flex-none">
      <div className="rounded-md p-[2px] bg-[linear-gradient(270deg,#0F2CAB_0%,#FF6849_100%)] ring-1 ring-[#1e2fd1]/40 shadow-[0_0_0_1px_rgba(15,44,171,0.15)_inset]">
        <div className="grid h-12 w-12 place-items-center rounded-md bg-[#050329] ring-white/5">
          <span className="font-orbitron text-white leading-none text-base md:text-xl">
            {letter}
          </span>
        </div>
      </div>
    </div>
  );
}
