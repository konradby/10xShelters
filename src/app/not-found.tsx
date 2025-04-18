import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#F5F7F2]">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
        <h2 className="mb-4 text-2xl font-bold text-[#2C4A27]">
          Nie znaleziono strony
        </h2>
        <p className="mb-4 text-gray-700">
          Przepraszamy, nie mogliśmy znaleźć strony, której szukasz.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-[#2C4A27] px-4 py-2 font-bold text-white hover:bg-[#3C5A37]"
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  );
}
