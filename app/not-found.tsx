import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-red-600">404 - Página no encontrada</h1>
      <p className="mt-4 text-lg text-gray-700">
        Oops, parece que la página que buscas no existe.
        <br />
        SmartProject
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-lg text-white hover:bg-blue-700"
      >
        ⬅️ Volver al inicio{' '}
      </Link>
    </div>
  );
}
