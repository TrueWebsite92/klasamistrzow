import { cn } from "@/lib/utils";

type KlasaMistrzowLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  compact?: boolean;
};

export const KlasaMistrzowLogo = ({
  className,
  markClassName,
  textClassName,
  compact = false,
}: KlasaMistrzowLogoProps) => {
  return (
    <a href="#top" className={cn("group inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative grid h-11 w-11 place-items-center rounded-[1.35rem] bg-[#1E293B] shadow-[0_18px_45px_rgba(30,41,59,0.18)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105",
          markClassName,
        )}
        aria-hidden="true"
      >
        <span className="absolute inset-[5px] rounded-[1.05rem] border border-[#E7C873]/45" />
        <span className="absolute left-3 top-3 h-2.5 w-2.5 rounded-full bg-[#E7C873]" />
        <span className="absolute bottom-3 right-3 h-2.5 w-2.5 rounded-full bg-[#7C6CF6]" />
        <span className="h-5 w-5 rotate-45 rounded-[0.45rem] border-2 border-[#FAF7F2]" />
      </span>
      {!compact && (
        <span className={cn("flex flex-col leading-none", textClassName)}>
          <span className="font-serif text-xl font-semibold tracking-[-0.04em] text-[#1E293B]">
            Klasa Mistrzów
          </span>
          <span className="mt-1 text-[0.63rem] font-semibold uppercase tracking-[0.34em] text-[#7C6CF6]">
            Polish Mastery
          </span>
        </span>
      )}
    </a>
  );
};
