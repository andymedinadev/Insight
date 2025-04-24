import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-red-600">
        404 - Página no encontrada
      </h1>
      <p className="text-lg text-gray-700 mt-4">
        Oops, parece que la página que buscas no existe.
        <br />
        SmartProject
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
      >
        ⬅️ Volver al inicio{" "}
      </Link>
    </div>
  );
}