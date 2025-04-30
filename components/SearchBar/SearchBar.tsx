export default function SearchBar() {
  return (
    <div className="ml-2 flex w-full lg:w-2xs">
      <input
        type="text"
        placeholder="Buscar paciente..."
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
