"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function DocsTable({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto rounded-t-2xl rounded-b-2xl border border-[#0F2CAB] bg-[#050329]">
      <table
        className={cn(
          "w-full border-collapse text-left text-sm text-gray-300",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function DocsTableHead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"thead">) {
  return (
    <thead
      className={cn(
        "bg-[#120D6A] text-white text-sm font-bold font-openSans",
        className
      )}
      {...props}
    />
  );
}

export function DocsTableRow({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={cn("border-b font-openSans border-[#0F2CAB]/50", className)}
      {...props}
    />
  );
}

export function DocsTableHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"th">) {
  return (
    <th className={cn("p-5 font-medium tracking-wide", className)} {...props} />
  );
}

export function DocsTableCell({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"td">) {
  return <td className={cn("px-4 py-4 align-middle", className)} {...props} />;
}
