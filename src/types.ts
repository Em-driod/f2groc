export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'mobile' | 'cod';
  label: string;
  last4?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  status: 'confirmed' | 'packed' | 'out-for-delivery' | 'delivered';
  deliveryAddress: string;
  deliveryTime: string;
  paymentMethod: string;
  riderId?: string;
}

export interface Rider {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  currentOrderId?: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  estimatedTime: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  wishlist: string[]; // Product IDs
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  unit: string;
  description: string;
  isPopular?: boolean;
  discount?: number;
  nutritionalInfo?: {
    calories: string;
    fat: string;
    carbs: string;
    protein: string;
  };
  stock: number;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Fruits' | 'Vegetables' | 'Dairy' | 'Bakery' | 'Meat' | 'Pantry';
