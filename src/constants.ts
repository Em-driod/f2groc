import { Product, DeliveryZone, Rider } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 0.99,
    category: 'Fruits',
    image: '/banana.jpeg',
    unit: 'lb',
    description: 'Sweet and creamy organic bananas, perfect for snacks or smoothies. These bananas are grown without synthetic pesticides or fertilizers.',
    isPopular: true,
    stock: 150,
    nutritionalInfo: { calories: '89', fat: '0.3g', carbs: '23g', protein: '1.1g' },
    reviews: [
      { id: 'r1', user: 'Sarah M.', rating: 5, comment: 'Perfectly ripe and sweet!', date: '2024-03-10' },
      { id: 'r2', user: 'John D.', rating: 4, comment: 'Good quality, but a bit small.', date: '2024-03-08' }
    ]
  },
  {
    id: '2',
    name: 'Red Bell Pepper',
    price: 1.49,
    category: 'Vegetables',
    image: '/perper.jpeg',
    unit: 'each',
    description: 'Crisp and sweet red bell peppers, great for salads or roasting. High in Vitamin C and antioxidants.',
    discount: 20,
    isPopular: true,
    stock: 85,
    nutritionalInfo: { calories: '31', fat: '0.3g', carbs: '6g', protein: '1g' },
    reviews: [
      { id: 'r3', user: 'Emily R.', rating: 5, comment: 'Very fresh and crunchy.', date: '2024-03-11' }
    ]
  },
  {
    id: '3',
    name: 'Whole Milk',
    price: 3.99,
    category: 'Dairy',
    image: '/milk.jpeg',
    unit: 'gallon',
    description: 'Fresh, creamy whole milk from local farms. Pasteurized and homogenized for safety and consistency.',
    isPopular: true,
    stock: 40,
    nutritionalInfo: { calories: '150', fat: '8g', carbs: '12g', protein: '8g' },
    reviews: []
  },
  {
    id: '4',
    name: 'Sourdough Bread',
    price: 5.49,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=400&q=80',
    unit: 'loaf',
    description: 'Artisanal sourdough bread with a perfect crust and tangy flavor. Baked fresh daily using traditional methods.',
    isPopular: true,
    stock: 12,
    reviews: [
      { id: 'r4', user: 'Mike T.', rating: 5, comment: 'Best sourdough in town!', date: '2024-03-09' }
    ]
  },
  {
    id: '5',
    name: 'Chicken Breast',
    price: 6.99,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80',
    unit: 'lb',
    description: 'Lean and tender boneless, skinless chicken breasts. Perfect for grilling, roasting, or sautéing.',
    discount: 15,
    isPopular: true,
    stock: 25,
    nutritionalInfo: { calories: '165', fat: '3.6g', carbs: '0g', protein: '31g' },
    reviews: []
  },
  {
    id: '6',
    name: 'Avocado',
    price: 1.99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80',
    unit: 'each',
    description: 'Ripe and creamy Hass avocados, perfect for guacamole or spreading on toast. Rich in healthy fats.',
    isPopular: true,
    stock: 60,
    nutritionalInfo: { calories: '160', fat: '15g', carbs: '9g', protein: '2g' },
    reviews: []
  },
  {
    id: '7',
    name: 'Baby Spinach',
    price: 3.49,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
    unit: '5oz bag',
    description: 'Pre-washed baby spinach leaves, ready for your favorite salad. Tender and mild in flavor.',
    discount: 10,
    stock: 45,
    reviews: []
  },
  {
    id: '8',
    name: 'Greek Yogurt',
    price: 1.29,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
    unit: '5.3oz cup',
    description: 'Thick and creamy Greek yogurt, high in protein. Great for breakfast or a healthy snack.',
    isPopular: true,
    stock: 120,
    nutritionalInfo: { calories: '100', fat: '0g', carbs: '6g', protein: '18g' },
    reviews: []
  },
  {
    id: '9',
    name: 'Extra Virgin Olive Oil',
    price: 12.99,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    unit: '16.9oz',
    description: 'Cold-pressed extra virgin olive oil for all your cooking needs. Rich in monounsaturated fats.',
    discount: 5,
    stock: 30,
    reviews: []
  },
  {
    id: '10',
    name: 'Blueberries',
    price: 4.99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=400&q=80',
    unit: 'pint',
    description: 'Sweet and antioxidant-rich fresh blueberries. Perfect for snacking or adding to cereal.',
    isPopular: true,
    stock: 50,
    reviews: []
  }
];

export const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Pantry'];

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
