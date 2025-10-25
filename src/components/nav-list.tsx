import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import * as React from "react";

export function NavList({ children, ...rest }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col gap-3" {...rest}>
      {children}
    </div>
  );
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export function NavListHeading({
  children,
  level = 3,
}: React.PropsWithChildren<{ level?: HeadingLevel }>) {
  let Element: `h${HeadingLevel}` = `h${level}`;
  return (
    <Element className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">
      {children}
    </Element>
  );
}

export function NavListItems({
  children,
  nested = false,
}: React.PropsWithChildren<{ nested?: boolean }>) {
  return (
    <ul
      className={clsx(
        "flex flex-col gap-4 w-full",
        nested
          ? "border-transparent"
          : "border-l-2 border-gray-700 dark:border-gray-700"
      )}
    >
      {children}
    </ul>
  );
}

type NavListItemProps = React.PropsWithChildren<{ className?: string }>;
export const NavListItem = React.forwardRef<HTMLLIElement, NavListItemProps>(
  function NavListItem({ children, className }, ref) {
    return (
      <li
        ref={ref}
        className={clsx(
          "-ml-[2px] flex flex-col items-start gap-3 w-full",
          className
        )}
      >
        {children}
      </li>
    );
  }
);

type NavListLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    nested?: boolean;
    className?: string;
  };

export function NavListLink({
  href,
  children,
  nested = false,
  className,
  ...props
}: React.PropsWithChildren<NavListLinkProps>) {
  return (
    <Link
      href={href}
      className={clsx(
        "block w-full text-base/8 text-gray-600 hover:text-white sm:text-sm/6",
        "dark:text-gray-300 dark:hover:text-white",
        "aria-[current]:font-semibold aria-[current]:text-white",
        nested ? "pl-8 sm:pl-7.5" : "pl-5 sm:pl-4",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
