import Link from 'next/link';
import { Card, CardBody, CardFooter } from '@heroui/react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#F5F7F2] to-[#E8EFE1] border-t border-[#D1DBC8]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-transparent shadow-none">
            <CardBody>
              <h3 className="text-xl font-bold text-[#2C4A27] mb-4">
                O projekcie
              </h3>
              <p className="text-[#4A6741] leading-relaxed">
                10xShelter to platforma łącząca schroniska dla zwierząt z
                potencjalnymi adoptującymi. Naszym celem jest zwiększenie liczby
                adopcji psów ze schronisk.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-transparent shadow-none">
            <CardBody>
              <h3 className="text-xl font-bold text-[#2C4A27] mb-4">Linki</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-[#4A6741] hover:text-[#2C4A27] transition-colors font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#A7C4A0] rounded-full"></span>
                    O nas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#4A6741] hover:text-[#2C4A27] transition-colors font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#A7C4A0] rounded-full"></span>
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-[#4A6741] hover:text-[#2C4A27] transition-colors font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#A7C4A0] rounded-full"></span>
                    Polityka prywatności
                  </Link>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-transparent shadow-none">
            <CardBody>
              <h3 className="text-xl font-bold text-[#2C4A27] mb-4">Kontakt</h3>
              <p className="text-[#4A6741] leading-relaxed">
                Masz pytania? Skontaktuj się z nami:
                <br />
                <a
                  href="mailto:kontakt@10xshelter.pl"
                  className="text-[#2C4A27] hover:text-[#4A6741] transition-colors font-medium inline-flex items-center gap-2 mt-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#A7C4A0] rounded-full"></span>
                  kontakt@10xshelter.pl
                </a>
              </p>
            </CardBody>
          </Card>
        </div>

        <Card className="bg-transparent shadow-none mt-8">
          <CardFooter className="pt-6 border-t border-[#D1DBC8]">
            <p className="text-[#4A6741] text-center w-full">
              © 2024 10xShelter. Wszelkie prawa zastrzeżone.
            </p>
          </CardFooter>
        </Card>
      </div>
    </footer>
  );
};
