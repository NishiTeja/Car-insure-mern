import { Bike, Eye, EyeOff, GraduationCap, ShieldCheck, Star, Repeat } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";
import Footer from "../components/Footer.jsx";
import Loader from "../components/Loader.jsx";
import Logo from "../components/Logo.jsx";

function ProductPanel() {
  const rows = [
    { icon: GraduationCap, label: "Learner Cover", classes: "bg-brandPurple" },
    { icon: Bike, label: "New Driver Cover", classes: "bg-brandBrown" },
    { icon: ShieldCheck, label: "Named Driver Cover", classes: "bg-brandPurpleLight" },
    { icon: Repeat, label: "Rolling Monthly", classes: "bg-swintonTeal" }
  ];

  return (
    <aside className="w-full rounded-xl bg-white shadow-sm lg:w-[380px]">
      <h2 className="px-6 pt-6 text-xl font-bold text-brandPurple sm:text-2xl">Our other products</h2>
      <div className="mx-6 mt-3 h-1 w-16 bg-gradient-to-r from-brandPurple to-swintonTeal" />
      <p className="px-6 py-5 text-base leading-6 text-neutral-700">
        We've helped drivers get flexible, on-demand cover since 2016.
      </p>
      <div className="flex flex-col gap-2 px-4 pb-2">
        {rows.map(({ icon: Icon, label, classes }) => (
          <div key={label} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-white ${classes}`}>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20">
              <Icon size={18} strokeWidth={2.4} />
            </span>
            <span className="text-base font-semibold">{label}</span>
          </div>
        ))}
      </div>
      <div className="px-6 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={18} className="text-[#00b67a]" fill="#00b67a" />
            ))}
          </div>
          <strong className="text-base text-neutral-900">Trustpilot</strong>
        </div>
        <p className="mt-2 text-sm text-neutral-500">Based on reviews of all products</p>
      </div>
    </aside>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("customer");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const login = async (event) => {
    event?.preventDefault();
    setError("");
    try {
      setBusy(true);
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-pageGray text-neutral-800">
      <div className="h-2 bg-gradient-to-r from-brandPurple via-brandPurpleDark to-swintonTeal" />
      <div className="px-4 pb-14 pt-6 sm:px-8 sm:pt-10 lg:px-14 lg:pb-20">
        <Logo />
        <div className="mt-8 grid max-w-[1200px] grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-[1fr_380px] lg:gap-10">
          <section>
            <form id="login-form" onSubmit={login} className="rounded-xl bg-white shadow-sm">
              <h1 className="px-5 pt-6 text-2xl font-bold text-brandPurple sm:px-9 sm:pt-7 sm:text-4xl">Welcome Back</h1>
              <div className="mx-5 mt-3 h-1 w-20 bg-gradient-to-r from-brandPurple to-swintonTeal sm:mx-9" />

              <div className="px-5 py-6 sm:px-9 sm:py-8">
                <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setAccountType("customer")}
                    className={`h-12 rounded-lg text-base font-semibold transition sm:text-lg ${
                      accountType === "customer" ? "bg-brandPurple text-white" : "border border-slate-300 bg-white text-neutral-700"
                    }`}
                  >
                    I'm a Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("broker")}
                    className={`h-12 rounded-lg text-base font-semibold transition sm:text-lg ${
                      accountType === "broker" ? "bg-brandPurple text-white" : "border border-slate-300 bg-white text-neutral-700"
                    }`}
                  >
                    I'm a Broker
                  </button>
                </div>

                <label className="mb-5 block">
                  <span className="mb-2 block text-base font-semibold">Email</span>
                  <input
                    type="email"
                    className="h-14 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-base text-neutral-900 outline-none focus:border-brandPurple sm:text-lg"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-base font-semibold">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="h-14 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 pr-14 text-base text-neutral-900 outline-none focus:border-brandPurple sm:text-lg"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(event) => setForm({ ...form, password: event.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </label>

                {error ? <p className="mt-5 text-center font-bold text-red-700">{error}</p> : null}
              </div>
            </form>

            <div className="mt-6 flex flex-col gap-4 px-1">
              <button
                disabled={busy}
                type="submit"
                form="login-form"
                className="rounded-lg bg-brandPurple py-4 text-lg font-semibold text-white transition hover:bg-brandPurpleDark disabled:opacity-75 sm:text-xl"
              >
                {busy ? <Loader label="Logging in" /> : "Log In"}
              </button>
              <button
                type="button"
                className="rounded-lg border border-brandPurple py-4 text-center text-lg font-semibold text-brandPurple transition hover:bg-brandPurple/5 sm:text-xl"
              >
                Track Your Claim
              </button>
              <Link
                to="/register"
                className="rounded-lg border border-slate-300 bg-white py-4 text-center text-lg text-neutral-700 transition hover:bg-slate-50 sm:text-xl"
              >
                Register
              </Link>
            </div>
          </section>
          <ProductPanel />
        </div>
        <Footer className="mt-14 max-w-[1200px]" />
      </div>
    </main>
  );
}
