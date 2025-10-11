import { LetterBadge } from "@/components/letter-badge";

export function StepOptionCard({
  letter,
  title,
  subtitle,
  details,
}: {
  letter: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  details?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 lg:gap-6">
      <LetterBadge letter={letter} />
      <div className="text-left pt-0.5">
        <h5 className="font-orbitron text-white text-lg md:text-xl leading-normal">
          {title}
        </h5>
        <p className="mt-2 font-openSans text-justify text-[#807F8C] text-md md:text-lg leading-normal">
          {subtitle}
        </p>
        {details && (
          <div className="mt-2 font-openSans sm:text-md md:text-lg lg:text-xl  text-[#807F8C] text-justify leading-relaxed">
            {details}
          </div>
        )}
      </div>
    </div>
  );
}
