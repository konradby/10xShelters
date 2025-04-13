export const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-primary-900 text-white">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          Znajdź swojego wymarzonego psa
        </h1>
        <h2 className="text-xl md:text-2xl text-primary-100 mb-8">
          Dzięki sztucznej inteligencji pomożemy Ci znaleźć idealnego psa ze
          schroniska
        </h2>
        <div className="bg-black/30 p-6 rounded-lg backdrop-blur-sm shadow-lg">
          <p className="text-lg text-gray-100">
            10xShelter to platforma, która łączy potencjalnych adoptujących z
            psami ze schronisk. Nasza misja to zwiększenie liczby adopcji i
            zmniejszenie liczby psów w schroniskach. Dzięki zaawansowanemu
            systemowi dopasowania AI, pomagamy znaleźć idealnego psa dla Twojego
            stylu życia i potrzeb.
          </p>
        </div>
      </div>
    </section>
  );
};
