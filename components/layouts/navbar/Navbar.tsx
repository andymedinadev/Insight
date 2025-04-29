export default function Navbar() {
  return (
    <header className="h-16 w-full bg-white border-b shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold"></h1>
      <div className="flex items-center gap-4">
        <span>🔔</span>
        <span>👤</span>
      </div>
    </header>
  );
}
