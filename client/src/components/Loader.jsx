export default function Loader({ label = "Loading", className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center gap-2 ${className}`}>
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <span>{label}</span>
    </span>
  );
}
