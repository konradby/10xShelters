import Image from 'next/image';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Zdjęcie w tle */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pexels-chevanon-1108099.jpg"
          alt="Szczęśliwe psy na łące"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Nakładka gradientowa */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C4A27]/60 via-transparent to-[#A7C4A0]/50" />
      </div>

      {/* Zawartość */}
      <div className="relative z-10 h-full flex items-center justify-center pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Znajdź swojego wymarzonego psa
          </h1>
          <h2 className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
            Dzięki sztucznej inteligencji pomożemy Ci znaleźć idealnego psa ze
            schroniska
          </h2>
          <div className="bg-white/90 p-8 rounded-2xl backdrop-blur-sm shadow-lg border border-[#D1DBC8]">
            <p className="text-lg text-[#2C4A27] leading-relaxed">
              10xShelter to platforma, która łączy potencjalnych adoptujących z
              psami ze schronisk. Nasza misja to zwiększenie liczby adopcji i
              zmniejszenie liczby psów w schroniskach. Dzięki zaawansowanemu
              systemowi dopasowania AI, pomagamy znaleźć idealnego psa dla
              Twojego stylu życia i potrzeb.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
