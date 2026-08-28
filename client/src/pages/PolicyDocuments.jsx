import { CarFront, Download, FileText } from "lucide-react";
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

export default function PolicyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/documents").then(({ data }) => setDocuments(data.documents)),
      api
        .get("/me")
        .then(({ data }) => {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        })
        .catch(() => {
          setUser(getStoredUser());
        })
    ]).finally(() => setLoading(false));
  }, []);

  const download = async (url, name) => {
    try {
      setDownloading(name);
      const { data } = await api.get(url.replace("/api", ""), { responseType: "blob" });
      const objectUrl = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setDownloading("");
    }
  };

  return (
    <main className="min-h-screen bg-pageGray text-neutral-800">
      <div className="h-2 bg-gradient-to-r from-brandPurple via-brandPurpleDark to-swintonTeal" />
      <div className="px-4 py-6 sm:px-8 sm:py-10 lg:px-14">
        <header className="flex items-start justify-between">
          <Logo compact />
          <NavIcons policy />
        </header>

        <h1 className="mt-8 text-2xl font-bold text-brandPurple sm:mt-16 sm:text-4xl">Welcome {user?.username || "Customer"}</h1>

        <div className="mt-6 rounded-lg bg-white px-4 py-4 shadow-sm sm:px-5">
          <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg">
            <span className="text-neutral-500">You are here:</span>
            <CarFront className="text-brandPurple" size={22} />
            <span className="font-semibold text-neutral-800">Car Policy - {user?.vehicleNumber || "Not set"}</span>
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            Your policy covers insurance from{" "}
            {user?.createdAt
              ? new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date(user.createdAt))
              : "—"}
          </p>
        </div>

        <section className="mt-7 rounded-xl bg-white px-4 pb-8 pt-6 shadow-sm sm:px-8 sm:pb-12 sm:pt-7">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-brandPurple sm:text-3xl">Policy Documents</h2>
            {loading ? <Loader label="Loading documents" className="text-brandPurple" /> : null}
          </div>
          <div className="mt-3 h-1 w-20 bg-gradient-to-r from-brandPurple to-swintonTeal" />

          <div className="mt-8 hidden grid-cols-[1fr_160px_90px] items-end gap-4 border-b-2 border-slate-200 px-2 pb-4 text-base font-semibold text-neutral-500 sm:mt-10 sm:grid">
            <span>Document</span>
            <span>Status</span>
            <span></span>
          </div>
          <div>
            {documents.map((document) => (
              <div
                key={document.id}
                className="flex flex-col gap-3 border-b border-slate-100 px-2 py-5 sm:grid sm:grid-cols-[1fr_160px_90px] sm:items-center sm:gap-4 sm:py-6"
              >
                <span className="flex items-center gap-3 text-base font-semibold text-brandPurple sm:text-lg">
                  <FileText size={20} className="shrink-0 text-swintonTeal" />
                  {document.name}
                </span>
                <div className="flex items-center justify-between sm:contents">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-neutral-600">
                    {document.status}
                  </span>
                  <button
                    onClick={() => download(document.downloadUrl, document.name)}
                    disabled={downloading === document.name}
                    className="grid h-11 w-12 place-items-center rounded-lg border border-slate-200 transition hover:border-brandPurple hover:bg-brandPurple/5 sm:h-14 sm:w-16"
                    aria-label={`Download ${document.name}`}
                  >
                    {downloading === document.name ? (
                      <span className="h-6 w-6 animate-spin rounded-full border-2 border-brandPurple border-t-transparent" />
                    ) : (
                      <Download size={22} className="text-brandPurple" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
