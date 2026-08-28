import { Bell, CircleUserRound, Handshake, Headphones, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavIcons({ policy = false, variant = "dark" }) {
  const navigate = useNavigate();
  const account = () => navigate("/account");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const items = policy
    ? [
        [CircleUserRound, "Your Account", account],
        [Headphones, "Make A Claim"],
        [Handshake, "Help"],
        [LogOut, "Log Out", logout]
      ]
    : [
        [Bell, "Notifications"],
        [CircleUserRound, "Your Account", account],
        [Handshake, "Help"],
        [LogOut, "Log Out", logout]
      ];

  const isLight = variant === "light";
  const textColor = isLight ? "text-white/90 hover:text-white" : "text-neutral-700 hover:text-brandPurple";
  const iconColor = isLight ? "text-white" : "text-brandPurple";
  const badgeClasses = isLight
    ? "border-white bg-swintonTeal text-white"
    : "border-brandPurple bg-white text-brandPurple";

  return (
    <nav className="flex gap-4 sm:gap-10">
      {items.map(([Icon, label, action], index) => (
        <button key={label} onClick={action} className={`relative grid justify-items-center text-[11px] transition sm:text-sm ${textColor}`}>
          {index === 0 && !policy ? (
            <span className={`absolute right-2 top-0 grid h-5 w-5 place-items-center rounded-full border text-[10px] sm:right-4 sm:h-6 sm:w-6 sm:text-xs ${badgeClasses}`}>
              1
            </span>
          ) : null}
          <Icon size={28} className={`sm:hidden ${iconColor}`} strokeWidth={2.2} />
          <Icon size={44} className={`hidden sm:block ${iconColor}`} strokeWidth={2.2} />
          <span className="mt-1 hidden sm:inline">{label}</span>
        </button>
      ))}
    </nav>
  );
}
