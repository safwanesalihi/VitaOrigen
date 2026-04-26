export enum Flavor {
  STRAWBERRY = 'Strawberry',
  BLUEBERRY = 'Blueberry',
  RASPBERRY = 'Raspberry',
  CHERRY = 'Cherry',
  BANANA = 'Banana',
  PINEAPPLE = 'Pineapple',
  ORANGE = 'Orange',
  KIWI = 'Kiwi',
}

export interface Product {
  id: string;
  name: Flavor;
  description: string;
  color: string;
  bgColor: string;
  emoji: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'strawberry',
    name: Flavor.STRAWBERRY,
    description: 'Sweet and tangy strawberry bliss.',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    emoji: '🍓',
    image: '/Products/2.png',
  },
  {
    id: 'blueberry',
    name: Flavor.BLUEBERRY,
    description: 'Deep, rich blueberry energy.',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    emoji: '🫐',
    image: '/Products/1.png',
  },
  {
    id: 'raspberry',
    name: Flavor.RASPBERRY,
    description: 'Fragrant and zesty raspberry.',
    color: '#F43F5E',
    bgColor: '#FFF1F2',
    emoji: '🍇',
    image: '/Products/5.png',
  },
  {
    id: 'cherry',
    name: Flavor.CHERRY,
    description: 'Classic cherry sweetness.',
    color: '#E11D48',
    bgColor: '#FFF1F2',
    emoji: '🍒',
    image: '/Products/3.png',
  },
  {
    id: 'banana',
    name: Flavor.BANANA,
    description: 'Smooth and creamy banana fuel.',
    color: '#EAB308',
    bgColor: '#FEFCE8',
    emoji: '🍌',
    image: '/Products/6.png',
  },
  {
    id: 'pineapple',
    name: Flavor.PINEAPPLE,
    description: 'Tropical pineapple explosion.',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    emoji: '🍍',
    image: '/Products/4.png',
  },
  {
    id: 'orange',
    name: Flavor.ORANGE,
    description: 'Zesty and refreshing orange.',
    color: '#F97316',
    bgColor: '#FFF7ED',
    emoji: '🍊',
    image: '/Products/12.png',
  },
  {
    id: 'kiwi',
    name: Flavor.KIWI,
    description: 'Exotic and tangy kiwi twist.',
    color: '#10B981',
    bgColor: '#ECFDF5',
    emoji: '🥝',
    image: '/Products/9.png',
  },
];

export interface Pack {
  id: string;
  name: string;
  size: number;
  price: number;
}

export const PACKS: Pack[] = [
  { id: 'single', name: 'À l\'unité', size: 1, price: 25 },
  { id: 'mini', name: 'Mini Pack', size: 4, price: 89 },
  { id: 'standard', name: 'Standard Pack', size: 8, price: 149 },
  { id: 'party', name: 'Party Pack', size: 12, price: 249 },
];
