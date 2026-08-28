import { ShieldCheck } from "lucide-react";

export default function Logo({ compact = false }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-lg bg-white/90 px-3 py-2 shadow-md shadow-slate-300/60 sm:px-4 sm:py-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-swintonBlue text-white sm:h-12 sm:w-12">
        <ShieldCheck size={24} strokeWidth={2.4} className="sm:hidden" />
        <ShieldCheck size={28} strokeWidth={2.4} className="hidden sm:block" />
      </span>
      <div className={`leading-none font-black tracking-normal ${compact ? "text-[26px] sm:text-[32px]" : "text-[32px] sm:text-[44px]"}`}>
        <span className="text-[#e84711]">Car</span>
        <span className="ml-2 text-swintonBlue">Insur</span>
        <div className="mt-1 text-[0.26em] font-bold uppercase tracking-[0.18em] text-slate-500">Powered by Veygo</div>
      </div>
    </div>
  );
}
