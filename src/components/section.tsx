import { cn } from "@/lib/utils";

export const cls = {
  h3: "text-white text-2xl md:text-3xl lg:text-4xl font-orbitron font-medium leading-normal",
  h5: "text-xl font-orbitron leading-normal text-white",
  p: "text-[#807F8C] font-openSans text-sm md:text-base lg:text-lg leading-normal py-1",
  ul: "list-disc list-outside pl-6 space-y-1 text-[#B2B1BD] font-openSans text-sm mdtext-base lg:text-lg leading-relaxed",
};

export function Section({
  title,
  children,
  id,
  className,
  titleClass,
  descClass,
  description,
}: {
  id?: string;
  title: string;
  description?: React.ReactNode;
  className?: string;
  titleClass?: string;
  descClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("my-4", className)}>
      <h5 className={cn(cls.h5, titleClass)}>{title}</h5>

      {description !== undefined &&
        (typeof description === "string" ? (
          <p className={cn(cls.p, descClass)}>{description}</p>
        ) : (
          <div className={cn(cls.p, descClass)}>{description}</div>
        ))}

      {children}
    </section>
  );
}
