import { ODogSize } from '@/types/types';

export const dogsMatchesMock = {
  matches: [
    {
      dog_id: '11111111-1111-1111-1111-111111111111',
      match_percentage: 95,
      reasoning:
        'Spokojny, zrównoważony - idealny do domu z ogrodem i dla dzieci.',
      dog: {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Burek',
        approximate_age: '3 lata',
        color: 'czarny',
        description: 'Spokojny i zrównoważony pies, idealny do domu z ogrodem',
        gender: 'male',
        mixed_breed: false,
        weight: 35,
        breed: {
          name: 'Labrador',
          size: ODogSize.LARGE,
        },
        shelter: {
          id: '11111111-1111-1111-1111-111111111111',
          name: 'Schronisko dla Zwierząt w Warszawie',
          city: 'Warszawa',
          address: 'ul. Paluch 2',
          phone: '+48 22 868 06 24',
          email: 'warszawa@schronisko.pl',
        },
        primary_image: '/images/dog-placeholder.jpg',
        images: [
          {
            id: '22222222-2222-2222-2222-222222222222',
            url: '/images/dog-placeholder.jpg',
            is_primary: true,
          },
        ],
        tags: ['przyjazny', 'spokojny', 'lubi dzieci'],
      },
    },
  ],
};
