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
          "relative grid h-11 w-11 place-items-center rounded-[1.1rem] border border-[#E7C873]/45 bg-[#1E293B] shadow-[0_16px_38px_rgba(30,41,59,0.16)] transition-transform duration-500 group-hover:-translate-y-0.5",
          markClassName,
        )}
        aria-hidden="true"
      >
        <span className="absolute left-[9px] top-[10px] h-5 w-3.5 rounded-l-[0.45rem] rounded-r-sm border border-[#FAF7F2]/80 bg-[#FAF7F2]/10" />
        <span className="absolute right-[9px] top-[10px] h-5 w-3.5 rounded-r-[0.45rem] rounded-l-sm border border-[#FAF7F2]/80 bg-[#FAF7F2]/10" />
        <span className="absolute left-1/2 top-[9px] h-[23px] w-px -translate-x-1/2 bg-[#E7C873]" />
        <span className="absolute bottom-[9px] right-[10px] h-px w-5 -rotate-45 rounded-full bg-[#E7C873]" />
      </span>
      {!compact && (
        <span className={cn("flex flex-col leading-none", textClassName)}>
          <span className="font-serif text-[1.08rem] font-semibold uppercase tracking-[0.08em] text-[#1E293B]">
            Klasa Mistrzów
          </span>
          <span className="mt-1 text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-[#7C6CF6]">
            Korepetycje online
          </span>
        </span>
      )}
    </a>
  );
};
