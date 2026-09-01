export default function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const isLarge = size === "large";
  return (
    <span
      className={`logo inline-flex items-center ${isLarge ? "text-[64px] md:text-[96px] scale-105" : ""}`}
    >
      <span className="logo-lines" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </span>
      <strong>atm</strong>
      <em>+</em>
    </span>
  );
}
