import { Search } from "lucide-react";

export function SidebarSearchInput({
  value,
  onChange,
  onKeyDown,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="rounded-md border-2 border-[#171089] bg-[#0b0848] px-3 py-2">
      <div className="flex items-center gap-2">
        <Search className="text-[#807F8C] size-[22px]" />
        <input
          placeholder="Search"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          aria-label="Search docs"
          className="w-full bg-transparent font-openSans text-sm text-slate-100 placeholder:text-[#807F8C] outline-none"
        />
      </div>
    </div>
  );
}
