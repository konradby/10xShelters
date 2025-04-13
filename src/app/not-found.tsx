import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Nie znaleziono strony</h2>
        <p className="mb-4">
          Przepraszamy, nie mogliśmy znaleźć strony, której szukasz.
        </p>
        <Link
          href="/"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
}
