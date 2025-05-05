export function PatientProfileHeader() {
  return (
    <div className="border-b border-gray-200 p-4 lg:border-none">
      {/* Header */}
      <h1 className="my-4 text-3xl font-semibold lg:pl-4 lg:font-bold">Perfil del paciente</h1>
      {/* Botones */}
      <div className="my-4 flex flex-col gap-4 py-2 lg:flex-row lg:justify-end lg:gap-10">
        <button className="rounded-md bg-gray-300 py-4 text-lg font-semibold transition-colors hover:cursor-pointer hover:bg-gray-400 lg:px-10">
          Material para el paciente
        </button>
        <button className="rounded-md bg-gray-300 py-4 text-lg font-semibold transition-colors hover:cursor-pointer hover:bg-gray-400 lg:px-10">
          Gestionar notas
        </button>
      </div>
    </div>
  );
}
