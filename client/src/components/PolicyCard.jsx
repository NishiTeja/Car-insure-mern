import { CarFront } from "lucide-react";
import { Link } from "react-router-dom";

export default function PolicyCard({ vehicleNumber = "Not set" }) {
  return (
    <article className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/80 lg:w-[370px]">
      <div className="bg-gradient-to-r from-brandPurple to-brandPurpleDark px-6 py-3 text-center text-xl font-bold text-white sm:text-2xl">Car</div>
      <div className="px-6 pb-8 pt-6 text-center sm:px-8">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brandPurple/10 sm:h-20 sm:w-20">
          <CarFront className="text-brandPurple" size={40} strokeWidth={2.4} />
        </div>
        <p className="mt-5 text-sm font-bold uppercase tracking-wider text-slate-500">Registered vehicle</p>
        <h3 className="mt-1 text-2xl font-bold text-neutral-800 sm:text-3xl">{vehicleNumber}</h3>
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Insured
          </span>
        </div>
        <div className="my-6 border-t-4 border-swintonTeal" />
        <Link
          to="/policy"
          className="block rounded-lg border border-slate-300 py-4 text-lg text-brandPurple transition hover:border-brandPurple hover:bg-brandPurple/5 sm:text-2xl"
        >
          Manage Policy &gt;
        </Link>
      </div>
    </article>
  );
}
