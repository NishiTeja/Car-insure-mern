import { CarFront, Mail, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api.js";
import Loader from "../components/Loader.jsx";
import Logo from "../components/Logo.jsx";
import NavIcons from "../components/NavIcons.jsx";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const formatDate = (value) => {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
};

const formatDob = (value) => {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
};

function DetailRow({ label, value }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-slate-200 py-4 text-base sm:grid-cols-[220px_1fr] sm:gap-0 sm:text-lg">
      <dt className="font-bold text-brandPurple">{label}</dt>
      <dd className="text-neutral-800 break-words">{value || "Not available"}</dd>
    </div>
  );
}

export default function Account() {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <main className="min-h-screen bg-pageGray text-neutral-800">
      <div className="h-2 bg-gradient-to-r from-brandPurple via-brandPurpleDark to-swintonTeal" />
      <div className="px-4 py-6 sm:px-8 sm:py-10 lg:px-14">
        <header className="flex items-start justify-between">
          <Logo compact />
          <NavIcons />
        </header>

        <section className="mt-8 max-w-[980px] rounded-xl bg-white px-4 pb-8 pt-6 shadow-sm sm:mt-16 sm:px-8 sm:pb-10 sm:pt-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-brandPurple pb-5">
            <h1 className="text-2xl font-bold text-brandPurple sm:text-4xl">Your Account</h1>
            {loading ? <Loader label="Loading account" className="text-brandPurple" /> : null}
          </div>

          <div className="mt-8 flex flex-col items-center gap-6 sm:grid sm:grid-cols-[180px_1fr] sm:items-start sm:gap-8">
            <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-brandPurple/10 text-brandPurple sm:h-40 sm:w-40">
              <UserRound size={56} strokeWidth={1.8} className="sm:hidden" />
              <UserRound size={82} strokeWidth={1.8} className="hidden sm:block" />
            </div>

            <dl className="w-full">
              <DetailRow label="Username" value={user?.username} />
              <DetailRow label="Email" value={user?.email} />
              <DetailRow label="Date of Birth" value={formatDob(user?.dateOfBirth)} />
              <DetailRow label="Address" value={user?.address} />
              <DetailRow label="Licence Number" value={user?.licenceNumber} />
              <DetailRow label="Vehicle Number" value={user?.vehicleNumber} />
              <DetailRow label="Account Created" value={formatDate(user?.createdAt)} />
              <DetailRow label="Last Updated" value={formatDate(user?.updatedAt)} />
            </dl>
          </div>
        </section>

        <section className="mt-8 max-w-[980px] rounded-xl bg-white px-4 pb-8 pt-6 shadow-sm sm:px-8 sm:pb-9 sm:pt-7">
          <h2 className="flex items-center gap-3 border-b-4 border-swintonTeal pb-4 text-xl font-bold text-brandPurple sm:text-3xl">
            <CarFront />
            Policy Contact Details
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-2 text-base font-bold text-brandPurple sm:text-lg">
                <Mail size={22} />
                Email
              </div>
              <p className="break-words text-base sm:text-lg">{user?.email || "Not available"}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-2 text-base font-bold text-brandPurple sm:text-lg">
                <CarFront size={22} />
                Registered Vehicle
              </div>
              <p className="text-base sm:text-lg">{user?.vehicleNumber || "Not available"}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
