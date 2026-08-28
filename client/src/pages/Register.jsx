import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";
import Footer from "../components/Footer.jsx";
import Loader from "../components/Loader.jsx";
import Logo from "../components/Logo.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    vehicleNumber: "",
    dateOfBirth: "",
    address: "",
    licenceNumber: ""
  });

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    if (form.email !== form.confirmEmail) return setError("Email addresses do not match");

    try {
      setBusy(true);
      const { data } = await api.post("/auth/register", {
        username: form.username,
        password: form.password,
        email: form.email,
        vehicleNumber: form.vehicleNumber,
        dateOfBirth: form.dateOfBirth,
        address: form.address,
        licenceNumber: form.licenceNumber
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  const fields = [
    ["username", "Username", "text", "Choose a username"],
    ["password", "Password", "password", "Create a password"],
    ["confirmPassword", "Confirm password", "password", "Re-enter your password"],
    ["email", "Email address", "email", "you@example.com"],
    ["confirmEmail", "Confirm email address", "email", "Re-enter your email"],
    ["vehicleNumber", "Vehicle number", "text", "e.g. KV11VMG"],
    ["dateOfBirth", "Date of birth", "date", ""],
    ["address", "Address", "text", "Your home address"],
    ["licenceNumber", "Licence number", "text", "Your driving licence number"]
  ];

  return (
    <main className="min-h-screen bg-pageGray text-neutral-800">
      <div className="h-2 bg-gradient-to-r from-brandPurple via-brandPurpleDark to-swintonTeal" />
      <div className="grid justify-items-center px-4 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-10">
        <Logo />
        <form onSubmit={submit} className="relative mt-8 w-full max-w-[620px] rounded-xl bg-white p-5 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-brandPurple sm:text-3xl">Create your account</h1>
          <div className="mt-3 h-1 w-16 bg-gradient-to-r from-brandPurple to-swintonTeal" />
          <p className="mt-5 text-base text-neutral-600">Create a username and password, and enter your email address.</p>

          <div className="mt-7 grid gap-5">
            {fields.map(([key, label, type, placeholder]) => (
              <label key={key} className="block">
                <span className="mb-2 block text-base font-semibold">{label}</span>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-lg text-neutral-900 outline-none focus:border-brandPurple"
                  value={form[key]}
                  onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                  required
                />
              </label>
            ))}
          </div>

          {error ? <p className="mt-6 text-center font-bold text-red-700">{error}</p> : null}

          <button
            disabled={busy}
            className="mt-8 h-14 w-full rounded-lg bg-brandPurple text-lg font-semibold text-white transition hover:bg-brandPurpleDark disabled:opacity-75"
          >
            {busy ? <Loader label="Processing" /> : "Continue"}
          </button>

          {busy ? (
            <div className="absolute inset-0 grid place-items-center rounded-xl bg-white/80">
              <Loader label="Creating account" className="rounded-lg border-2 border-brandPurple bg-white px-8 py-6 text-brandPurple shadow" />
            </div>
          ) : null}
        </form>
        <Footer className="mt-10 max-w-[620px]" />
      </div>
    </main>
  );
}
