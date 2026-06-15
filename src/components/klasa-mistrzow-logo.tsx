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
          "relative grid h-11 w-11 place-items-center overflow-hidden rounded-[1.15rem] border border-[#E7C873]/45 bg-[#1E293B] shadow-[0_16px_38px_rgba(30,41,59,0.16)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_20px_44px_rgba(30,41,59,0.2)]",
          markClassName,
        )}
        aria-hidden="true"
      >
        <span className="absolute inset-[6px] rounded-[0.9rem] border border-[#FAF7F2]/18" />
        <span className="absolute left-[11px] top-[10px] h-4.5 w-px bg-[#E7C873]" />
        <span className="absolute left-[11px] top-[10px] h-px w-10 rotate-[28deg] origin-left bg-[#E7C873]" />
        <span className="absolute left-[11px] bottom-[10px] h-px w-10 -rotate-[28deg] origin-left bg-[#E7C873]" />
        <span className="absolute right-[11px] top-[10px] h-4.5 w-px bg-[#FAF7F2]/78" />
        <span className="absolute right-[11px] top-[10px] h-px w-10 -rotate-[28deg] origin-right bg-[#FAF7F2]/78" />
        <span className="absolute right-[11px] bottom-[10px] h-px w-10 rotate-[28deg] origin-right bg-[#FAF7F2]/78" />
        <span className="absolute bottom-[8px] left-1/2 h-px w-4 -translate-x-1/2 bg-[#E7C873]/85" />
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