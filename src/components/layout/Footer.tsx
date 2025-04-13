import Link from 'next/link';
import { Card, CardBody, CardFooter } from '@heroui/react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-transparent shadow-none">
            <CardBody>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                O projekcie
              </h3>
              <p className="text-gray-700 leading-relaxed">
                10xShelter to platforma łącząca schroniska dla zwierząt z
                potencjalnymi adoptującymi. Naszym celem jest zwiększenie liczby
                adopcji psów ze schronisk.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-transparent shadow-none">
            <CardBody>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Linki</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                    O nas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                    Polityka prywatności
                  </Link>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-transparent shadow-none">
            <CardBody>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kontakt</h3>
              <p className="text-gray-700 leading-relaxed">
                Masz pytania? Skontaktuj się z nami:
                <br />
                <a
                  href="mailto:kontakt@10xshelter.pl"
                  className="text-primary-600 hover:text-primary-800 transition-colors font-medium inline-flex items-center gap-2 mt-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                  kontakt@10xshelter.pl
                </a>
              </p>
            </CardBody>
          </Card>
        </div>

        <Card className="bg-transparent shadow-none mt-8">
          <CardFooter className="pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-center w-full">
              © 2024 10xShelter. Wszelkie prawa zastrzeżone.
            </p>
          </CardFooter>
        </Card>
      </div>
    </footer>
  );
};
