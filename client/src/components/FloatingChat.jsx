import { MessageSquare } from "lucide-react";

export default function FloatingChat() {
  return (
    <button
      aria-label="Live chat"
      className="fixed bottom-10 right-12 z-20 grid h-24 w-24 place-items-center rounded-full bg-swintonOrange text-white shadow-xl"
    >
      <MessageSquare size={42} fill="currentColor" strokeWidth={1.5} />
    </button>
  );
}
