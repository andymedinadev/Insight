const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BACKEND_BASE_URL) {
  throw new Error('Falta definir NEXT_PUBLIC_API_BASE_URL en tu archivo .env');
}

export { BACKEND_BASE_URL };
