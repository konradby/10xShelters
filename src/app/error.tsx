'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#F5F7F2]">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Coś poszło nie tak!
        </h2>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-[#2C4A27] px-4 py-2 font-bold text-white hover:bg-[#3C5A37]"
        >
          Spróbuj ponownie
        </button>
      </div>
    </div>
  );
}
