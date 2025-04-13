import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">O projekcie</h3>
            <p className="text-gray-600">
              10xShelter to platforma łącząca schroniska dla zwierząt z
              potencjalnymi adoptującymi. Naszym celem jest zwiększenie liczby
              adopcji psów ze schronisk.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Linki</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary-600"
                >
                  O nas
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <p className="text-gray-600">
              Masz pytania? Skontaktuj się z nami:
              <br />
              <a
                href="mailto:kontakt@10xshelter.pl"
                className="text-primary-600 hover:underline"
              >
                kontakt@10xshelter.pl
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>© 2024 10xShelter. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};
