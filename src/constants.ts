import { Product, DeliveryZone, Rider } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Plantain',
    price: 2.99,
    category: 'Vegetable & Fresh Produce',
    image: '/plantain.jpeg',
    unit: 'lb',
    description: 'Fresh green plantains, essential for African dishes like fried plantain and plantain porridge. Perfectly ripe for cooking.',
    isPopular: true,
    stock: 150,
    nutritionalInfo: { calories: '122', fat: '0.4g', carbs: '32g', protein: '1.3g' },
    reviews: [
      { id: 'r1', user: 'Amara K.', rating: 5, comment: 'Perfect for making dodo!', date: '2024-03-10' },
      { id: 'r2', user: 'Kofi O.', rating: 5, comment: 'Fresh and authentic taste.', date: '2024-03-08' }
    ]
  },
  {
    id: '2',
    name: 'Efo Riro (Spinach)',
    price: 3.49,
    category: 'Vegetable & Fresh Produce',
    image: '/efo-riro.jpeg',
    unit: 'bunch',
    description: 'Fresh African spinach, perfect for traditional efo soup. Rich in iron and vitamins.',
    discount: 15,
    isPopular: true,
    stock: 85,
    nutritionalInfo: { calories: '23', fat: '0.4g', carbs: '3.6g', protein: '2.9g' },
    reviews: [
      { id: 'r3', user: 'Ngozi A.', rating: 5, comment: 'Very fresh and perfect for soup.', date: '2024-03-11' }
    ]
  },
  {
    id: '3',
    name: 'Smoked Fish',
    price: 8.99,
    category: 'Meat, Fish & Poultry',
    image: '/smokedfish.jpeg.jpeg',
    unit: 'kg',
    description: 'Traditional smoked fish, perfect for soups and stews. Authentic African flavor preserved through smoking.',
    isPopular: true,
    stock: 40,
    nutritionalInfo: { calories: '145', fat: '6g', carbs: '0g', protein: '25g' },
    reviews: []
  },
  {
    id: '4',
    name: 'Garri (Cassava Flour)',
    price: 4.99,
    category: 'Grains and Flours',
    image: '/garri.jpeg',
    unit: 'kg',
    description: 'Fine cassava flour, staple for making eba. Properly processed and ready to use.',
    discount: 10,
    isPopular: true,
    stock: 120,
    nutritionalInfo: { calories: '357', fat: '0.2g', carbs: '88g', protein: '1.4g' },
    reviews: [
      { id: 'r4', user: 'Chidi E.', rating: 5, comment: 'Good quality garri, makes perfect eba.', date: '2024-03-09' }
    ]
  },
  {
    id: '5',
    name: 'Scotch Bonnet Peppers',
    price: 2.29,
    category: 'Cooking Condiments',
    image: '/freshscotchpepper.jpeg',
    unit: 'pack',
    description: 'Hot Scotch bonnet peppers, essential for authentic African cuisine. Adds the perfect heat to dishes.',
    stock: 95,
    nutritionalInfo: { calories: '40', fat: '1.5g', carbs: '9g', protein: '1.9g' },
    reviews: []
  },
  {
    id: '6',
    name: 'Palm Oil',
    price: 6.99,
    category: 'Cooking Condiments',
    image: '/tomato.jpeg',
    unit: 'liter',
    description: 'Pure red palm oil, essential for African cooking. Rich in vitamins and authentic flavor.',
    stock: 60,
    nutritionalInfo: { calories: '884', fat: '100g', carbs: '0g', protein: '0g' },
    reviews: [
      { id: 'r5', user: 'Funke A.', rating: 5, comment: 'Original taste, just like home.', date: '2024-03-12' }
    ]
  },
  {
    id: '7',
    name: 'Yam',
    price: 3.79,
    category: 'Vegetable & Fresh Produce',
    image: '/carrot.jpeg',
    unit: 'lb',
    description: 'Fresh African yam, perfect for yam porridge or fried yam. Sweet and starchy.',
    stock: 75,
    nutritionalInfo: { calories: '118', fat: '0.2g', carbs: '28g', protein: '2g' },
    reviews: []
  },
  {
    id: '8',
    name: 'Dried Bitter Leaf',
    price: 5.49,
    category: 'Cooking Condiments',
    image: '/bitterleaf.jpeg',
    unit: 'pack',
    description: 'Dried bitter leaf, essential for traditional soups. Properly dried to preserve nutrients.',
    stock: 45,
    nutritionalInfo: { calories: '45', fat: '0.7g', carbs: '8g', protein: '4.2g' },
    reviews: []
  },
  {
    id: '9',
    name: 'Fresh Garlic',
    price: 1.99,
    category: 'Cooking Condiments',
    image: '/garlic.jpeg',
    unit: 'bulb',
    description: 'Fresh garlic bulbs, essential for African cooking. Adds authentic flavor to dishes.',
    discount: 25,
    stock: 80,
    nutritionalInfo: { calories: '4', fat: '0g', carbs: '1g', protein: '0.2g' },
    reviews: []
  },
  {
    id: '10',
    name: 'Fresh Spinach',
    price: 2.29,
    category: 'Vegetable & Fresh Produce',
    image: '/spinach.jpeg',
    unit: 'bunch',
    description: 'Fresh spinach leaves, perfect for healthy African vegetable dishes.',
    discount: 30,
    stock: 60,
    nutritionalInfo: { calories: '7', fat: '0.1g', carbs: '1.1g', protein: '0.9g' },
    reviews: []
  },
  {
    id: '11',
    name: 'Brown Beans',
    price: 5.99,
    category: 'Grains and Flours',
    image: '/plantain.jpeg',
    unit: 'kg',
    description: 'Premium brown beans, high in protein and perfect for moin-moin or gbegiri.',
    stock: 110,
    nutritionalInfo: { calories: '347', fat: '1.2g', carbs: '63g', protein: '21g' },
    reviews: []
  },
  {
    id: '12',
    name: 'Egusi (Melon Seeds)',
    price: 12.99,
    category: 'Cooking Condiments',
    image: '/efo-riro.jpeg',
    unit: 'kg',
    description: 'Ground melon seeds, the heart of traditional Egusi soup.',
    stock: 55,
    nutritionalInfo: { calories: '567', fat: '47g', carbs: '15g', protein: '24g' },
    reviews: []
  },
  {
    id: '13',
    name: 'Crayfish',
    price: 7.49,
    category: 'Meat, Fish & Poultry',
    image: '/smokedfish.jpeg.jpeg',
    unit: 'pack',
    description: 'Ground dried crayfish, essential seasoning for African stews.',
    stock: 130,
    nutritionalInfo: { calories: '88', fat: '1.4g', carbs: '0g', protein: '18g' },
    reviews: []
  },
  {
    id: '14',
    name: 'Honey Beans',
    price: 6.49,
    category: 'Grains and Flours',
    image: '/garri.jpeg',
    unit: 'kg',
    description: 'Sweet Oloyin beans, famous for their natural honey-like taste.',
    stock: 90,
    nutritionalInfo: { calories: '341', fat: '1.1g', carbs: '61g', protein: '22g' },
    reviews: []
  },
  {
    id: '15',
    name: 'African Nutmeg',
    price: 3.99,
    category: 'Cooking Condiments',
    image: '/freshscotchpepper.jpeg',
    unit: 'pack',
    description: 'Monodora myristica (Ehuru), aromatic spice for authentic flavor.',
    stock: 80,
    nutritionalInfo: { calories: '525', fat: '36g', carbs: '49g', protein: '6g' },
    reviews: []
  },
  {
    id: '16',
    name: 'Red Onions',
    price: 1.49,
    category: 'Vegetable & Fresh Produce',
    image: '/tomato.jpeg',
    unit: 'lb',
    description: 'Fresh, sharp red onions for everyday cooking.',
    stock: 200,
    nutritionalInfo: { calories: '40', fat: '0.1g', carbs: '9g', protein: '1.1g' },
    reviews: []
  }
];

export const CATEGORIES = [
  'All',
  'Meat, Fish & Poultry',
  'Vegetable & Fresh Produce',
  'Drinks and Beverages',
  'Grains and Flours',
  'Cooking Condiments',
  'Snacks and Confectionaries',
  'Groceries',
  'Ready meals'
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: 'z1', name: 'Downtown', fee: 2.50, estimatedTime: '15-25 mins' },
  { id: 'z2', name: 'Westside', fee: 3.99, estimatedTime: '25-40 mins' },
  { id: 'z3', name: 'East End', fee: 4.50, estimatedTime: '30-45 mins' },
  { id: 'z4', name: 'Suburbs', fee: 6.99, estimatedTime: '45-60 mins' }
];

export const RIDERS: Rider[] = [
  { id: 'r1', name: 'David Smith', phone: '+1 555-0101', avatar: 'https://i.pravatar.cc/100?img=12', status: 'available', rating: 4.9 },
  { id: 'r2', name: 'Sarah Wilson', phone: '+1 555-0102', avatar: 'https://i.pravatar.cc/100?img=45', status: 'available', rating: 4.8 },
  { id: 'r3', name: 'Mike Johnson', phone: '+1 555-0103', avatar: 'https://i.pravatar.cc/100?img=32', status: 'busy', rating: 4.7 },
  { id: 'r4', name: 'Elena Rodriguez', phone: '+1 555-0104', avatar: 'https://i.pravatar.cc/100?img=23', status: 'available', rating: 5.0 }
];
