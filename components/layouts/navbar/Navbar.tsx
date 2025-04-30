export default function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-white px-6 shadow">
      <h1 className="text-xl font-semibold"></h1>
      <div className="flex items-center gap-4">
        <span>🔔</span>
        <span>👤</span>
        <span>↓</span>
      </div>
    </header>
  );
}
