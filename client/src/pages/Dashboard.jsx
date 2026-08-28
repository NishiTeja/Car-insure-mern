import { Clock3, ShieldCheck, Smartphone, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api.js";
import Footer from "../components/Footer.jsx";
import Loader from "../components/Loader.jsx";
import Logo from "../components/Logo.jsx";
import NavIcons from "../components/NavIcons.jsx";
import PolicyCard from "../components/PolicyCard.jsx";

const DASHBOARD_IMAGE_URL =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

function Hero({ user }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brandPurple to-brandPurpleDark px-4 pt-6 sm:px-8 sm:pt-10 lg:px-14 lg:min-h-[610px]">
      <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-brandPurpleLight via-swintonTeal to-brandPurpleLight" />
      <img
        src={DASHBOARD_IMAGE_URL}
        alt=""
        className="absolute bottom-0 right-0 hidden h-full w-[42%] object-cover opacity-90 sm:block"
      />
      <div className="absolute bottom-0 right-0 hidden h-full w-[42%] bg-gradient-to-r from-brandPurpleDark via-brandPurpleDark/40 to-transparent sm:block" />
      <div className="relative flex items-start justify-between pt-2">
        <Logo compact />
        <NavIcons variant="light" />
      </div>
      <div className="relative mt-8 max-w-[760px] pb-8 sm:mt-12 lg:pb-0">
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">Welcome {user?.username || "Customer"}</h1>
        <div className="mt-8 max-w-[620px] rounded-xl bg-white/90 p-5 shadow-lg shadow-black/10 backdrop-blur sm:mt-12 sm:p-7">
          <h2 className="text-xl font-bold text-brandPurple sm:text-3xl">Your cover, made clearer</h2>
          <div className="mt-3 h-1 w-16 bg-gradient-to-r from-brandPurple to-swintonTeal" />
          <p className="mt-4 text-base leading-7 text-neutral-800 sm:mt-5 sm:text-xl sm:leading-8">
            Manage your policy, documents, and vehicle details from one simple dashboard.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-base text-neutral-900 sm:mt-7 sm:gap-4 sm:text-xl">
            <strong>Excellent</strong>
            <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className="grid h-6 w-6 place-items-center bg-[#00b67a] text-white sm:h-8 sm:w-8">
                  <Star size={16} className="sm:hidden" fill="currentColor" />
                  <Star size={20} className="hidden sm:block" fill="currentColor" />
                </span>
              ))}
            </div>
            <strong className="flex items-center gap-1 text-sm sm:text-lg">
              <Star size={18} fill="#00b67a" className="text-[#00b67a]" /> Trustpilot
            </strong>
          </div>
          <p className="mt-4 text-sm text-neutral-700 sm:mt-5 sm:ml-14 sm:text-lg">Based on reviews of all products</p>
        </div>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/me")
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        setUser(getStoredUser());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-pageGray">
      <Hero user={user} />
      <section className="px-4 py-10 sm:px-8 sm:py-16 lg:px-14">
        <div className="mb-6 flex items-center gap-5">
          <h2 className="text-3xl font-normal text-brandPurple sm:text-5xl">Your Policies</h2>
          {loading ? <Loader label="Loading details" className="text-brandPurple" /> : null}
        </div>
        <div className="grid max-w-[1160px] grid-cols-1 gap-6 lg:grid-cols-[370px_1fr] lg:gap-8">
          <PolicyCard vehicleNumber={loading && !user?.vehicleNumber ? "Loading..." : user?.vehicleNumber} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              [ShieldCheck, "Protected", "Your car policy and documents are ready whenever you need them."],
              [Clock3, "Quick Access", "Open your policy details without searching through emails."],
              [Smartphone, "Always Handy", "Download important documents from any device."]
            ].map(([Icon, title, copy]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/70">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-brandPurple/10">
                  <Icon className="text-brandPurple" size={26} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-brandPurple">{title}</h3>
                <p className="mt-3 leading-7 text-neutral-700">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-4 mb-10 grid max-w-[1160px] grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/80 sm:mx-8 md:grid-cols-[1fr_340px] lg:mx-14 lg:mb-12">
        <div className="order-2 p-6 sm:p-10 md:order-1">
          <h2 className="text-xl text-brandPurple sm:text-2xl">
            <strong>Thank you for choosing</strong> Car Insur
          </h2>
          <p className="mt-4 max-w-[620px] text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
            We keep your policy details organized so you can spend less time searching and more time driving with confidence.
          </p>
          <div className="mt-8 sm:mt-16">
            <div className="mb-4 flex items-center gap-3 font-bold text-brandPurple">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brandPurple text-white">?</span>
              Need Help ?
            </div>
            <button className="rounded-lg bg-brandPurple px-7 py-3 text-base font-bold text-white transition hover:bg-brandPurpleDark sm:px-9 sm:py-4 sm:text-xl">
              Visit Help Centre &gt;
            </button>
          </div>
        </div>
        <img src={DASHBOARD_IMAGE_URL} alt="" className="order-1 h-48 w-full object-cover sm:h-full md:order-2" />
      </section>
      <Footer className="mx-4 mb-8 max-w-[1160px] rounded-xl bg-white p-6 shadow-sm sm:mx-8 sm:p-8 lg:mx-14" />
      <section className="mx-4 mb-14 max-w-[1160px] rounded-xl bg-gradient-to-br from-brandPurple to-brandPurpleDark px-6 py-7 text-white shadow-lg shadow-slate-300 sm:mx-8 sm:px-10 sm:py-9 lg:mx-14 lg:mb-20">
        <h2 className="text-2xl font-bold sm:text-3xl">Drive forward with confidence.</h2>
        <p className="mt-4 max-w-[900px] text-base leading-7 text-white/85 sm:text-xl sm:leading-8">
          Car Insur brings your policy, certificate, and vehicle information into one clean space.
          Keep your cover close, your documents organized, and your next step simple.
          Every journey feels better when the important details are easy to find.
        </p>
      </section>
    </main>
  );
}
