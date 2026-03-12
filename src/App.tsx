/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ShoppingBasket, 
  ShoppingBag,
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  ChevronRight, 
  Leaf,
  Clock,
  ShieldCheck,
  Star,
  MapPin,
  User,
  Tag,
  TrendingUp,
  ArrowRight,
  Package,
  CreditCard,
  Heart,
  Settings,
  LogOut,
  Menu,
  CheckCircle2,
  Truck,
  Home,
  Phone,
  Navigation,
  LayoutDashboard,
  BarChart3,
  Users,
  Layers,
  PlusCircle,
  Edit3,
  Trash2,
  Save,
  AlertCircle,
  Droplet,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES, DELIVERY_ZONES, RIDERS } from './constants';
import { Product, CartItem, Category, User as UserType, Order, Address, PaymentMethod, Rider, DeliveryZone } from './types';

export default function App() {
  const [view, setView] = useState<'store' | 'checkout' | 'success' | 'account' | 'tracking' | 'admin'>('store');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<string[]>(CATEGORIES);
  const [customers, setCustomers] = useState<UserType[]>([
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?img=33',
      addresses: [],
      paymentMethods: [],
      wishlist: []
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://i.pravatar.cc/150?img=44',
      addresses: [],
      paymentMethods: [],
      wishlist: []
    }
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useState('San Francisco, CA');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'logistics'>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [riders, setRiders] = useState<Rider[]>(RIDERS);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(DELIVERY_ZONES);

  // User State
  const [user, setUser] = useState<UserType>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=33',
    addresses: [
      { id: '1', label: 'Home', street: '123 Market St', city: 'San Francisco', isDefault: true },
      { id: '2', label: 'Office', street: '456 Tech Lane', city: 'Palo Alto', isDefault: false }
    ],
    paymentMethods: [
      { id: '1', type: 'card', label: 'Visa ending in 4242', last4: '4242', isDefault: true },
      { id: '2', type: 'mobile', label: 'Apple Pay', isDefault: false }
    ],
    wishlist: ['1', '3']
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'FC-88231',
      date: '2026-03-10',
      items: [
        { ...products[0], quantity: 2 },
        { ...products[2], quantity: 1 }
      ],
      total: 12.50,
      deliveryFee: 2.50,
      status: 'delivered',
      deliveryAddress: '123 Market St, San Francisco',
      deliveryTime: '09:00 AM - 11:00 AM',
      paymentMethod: 'card',
      riderId: 'r1'
    }
  ]);

  // Checkout Form State
  const [checkoutData, setCheckoutData] = useState({
    address: '',
    city: '',
    timeSlot: '',
    paymentMethod: 'card',
    zoneId: 'z1'
  });

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '01:00 PM - 03:00 PM',
    '03:00 PM - 05:00 PM',
    '05:00 PM - 07:00 PM'
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'mobile', name: 'Mobile Money', icon: '📱' },
    { id: 'cod', name: 'Pay on Delivery', icon: '🚚' }
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => {
        const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => {
        const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
        return priceB - priceA;
      });
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const popularProducts = useMemo(() => products.filter(p => p.isPopular).slice(0, 5), [products]);
  const dealProducts = useMemo(() => products.filter(p => p.discount).slice(0, 3), [products]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setDetailQuantity(1);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    const selectedZone = deliveryZones.find(z => z.id === checkoutData.zoneId) || deliveryZones[0];
    const availableRider = riders.find(r => r.status === 'available');
    
    const newOrder: Order = {
      id: `FC-${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: cartTotal + selectedZone.fee,
      deliveryFee: selectedZone.fee,
      status: 'confirmed',
      deliveryAddress: `${checkoutData.address}, ${checkoutData.city}`,
      deliveryTime: checkoutData.timeSlot,
      paymentMethod: checkoutData.paymentMethod,
      riderId: availableRider?.id
    };

    if (availableRider) {
      setRiders(prev => prev.map(r => 
        r.id === availableRider.id ? { ...r, status: 'busy', currentOrderId: newOrder.id } : r
      ));
    }

    setOrders([newOrder, ...orders]);
    setView('success');
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
    setIsAddingProduct(false);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };

  const salesData = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const totalCustomers = customers.length;
    const lowStockProducts = products.filter(p => p.stock < 10);
    
    return { totalRevenue, totalOrders, totalCustomers, lowStockProducts };
  }, [orders, customers, products]);

  return (
    <div className="min-h-screen bg-paper flex flex-col selection:bg-ink selection:text-paper">
      {view === 'store' ? (
        <>
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-line">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
                <div className="flex items-center gap-8 lg:gap-12">
                  <div 
                    className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                    onClick={() => setView('store')}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-ink flex items-center justify-center group-hover:bg-highlight transition-colors">
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-paper" />
                    </div>
                    <span className="text-lg sm:text-xl font-black tracking-tighter uppercase hidden xs:block">f2proteinsandgroceries</span>
                    <span className="text-lg sm:text-xl font-black tracking-tighter uppercase xs:hidden">F2G</span>
                  </div>

                  <div className="hidden md:flex items-center gap-8">
                    {['Shop', 'About', 'Journal'].map((item) => (
                      <button key={item} className="text-[10px] uppercase tracking-[0.25em] font-black text-ink/40 hover:text-ink transition-colors">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                  <div className="hidden lg:flex items-center bg-line/50 px-6 py-2 border border-line group focus-within:border-ink transition-all">
                    <Search className="w-4 h-4 text-ink/30 group-focus-within:text-ink" />
                    <input 
                      type="text" 
                      placeholder="Search collection..." 
                      className="bg-transparent border-none focus:ring-0 text-xs font-bold w-48 placeholder:text-ink/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Mobile search button */}
                    <button className="lg:hidden text-ink/40 hover:text-ink transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                    
                    <button 
                      onClick={() => setView('account')}
                      className="text-ink/40 hover:text-ink transition-colors"
                    >
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button 
                      className="relative group"
                      onClick={() => setIsCartOpen(true)}
                    >
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-ink" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-highlight text-paper text-[6px] sm:text-[8px] font-black flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </button>
                    
                    {/* Mobile menu button */}
                    <button 
                      className="md:hidden text-ink/40 hover:text-ink transition-colors"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      <Menu className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mobile menu */}
              {isMobileMenuOpen && (
                <div className="md:hidden border-t border-line py-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center bg-line/50 px-4 py-2 border border-line">
                      <Search className="w-4 h-4 text-ink/30 mr-3" />
                      <input 
                        type="text" 
                        placeholder="Search collection..." 
                        className="bg-transparent border-none focus:ring-0 text-xs font-bold flex-1 placeholder:text-ink/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    {['Shop', 'About', 'Journal'].map((item) => (
                      <button 
                        key={item} 
                        className="text-left text-[10px] uppercase tracking-[0.25em] font-black text-ink/40 hover:text-ink transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Hero Section */}
          <section className="relative pt-4 min-h-screen flex items-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center py-16 sm:py-20 lg:py-32 mt-16 sm:mt-20 lg:mt-24">
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-0 mb-12"
                >
                  <div className="h-px w-12 bg-highlight" />
                  <span className="label-f2proteinsandgroceries text-highlight">The 2026 Collection</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-8xl lg:text-[160px] font-black leading-[0.85] mb-16 tracking-tighter uppercase"
                >
                  Pure <br />
                  <span className="text-highlight">Nature.</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-12 items-start sm:items-center"
                >
                  <button className="btn-f2proteinsandgroceries group flex items-center gap-4" onClick={() => {
                    const el = document.getElementById('shop-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Explore Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <p className="max-w-xs text-sm font-medium text-ink/40 leading-relaxed">
                    Sourced directly from local farmers who prioritize soil health and biodiversity.
                  </p>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 1.1, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] lg:aspect-square"
              >
                <div className="absolute inset-0 bg-line translate-x-8 translate-y-8" />
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" 
                  alt="Fresh Produce" 
                  className="h-full w-full object-cover relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-highlight/10 backdrop-blur-3xl z-20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-black text-highlight">100%</div>
                    <div className="text-[8px] uppercase tracking-widest font-black">Organic</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

            {/* Featured Deals */}
            <section className="py-48 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
                  <div className="max-w-2xl">
                    <div className="label-f2proteinsandgroceries mb-8 text-highlight">Limited Edition</div>
                    <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">Seasonal <br />Harvest.</h2>
                  </div>
                  <button className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-black">
                    View All
                    <div className="w-24 h-px bg-line group-hover:w-32 group-hover:bg-highlight transition-all" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                  {dealProducts.map((product) => (
                    <motion.div 
                      whileHover={{ y: -20 }}
                      key={product.id} 
                      className="group cursor-pointer"
                      onClick={() => openProductDetails(product)}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden mb-12 bg-line/10">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute top-0 right-0 bg-highlight text-paper px-6 py-3 text-[10px] font-black uppercase tracking-widest">
                          -{product.discount}%
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-3xl font-black uppercase tracking-tighter">{product.name}</h3>
                          <span className="text-highlight font-black text-xl">${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-ink/40 font-medium line-clamp-2 leading-relaxed">{product.description}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                          className="w-full py-6 border border-line text-[10px] uppercase tracking-[0.3em] font-black hover:bg-ink hover:text-paper transition-all"
                        >
                          Acquire Selection
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Main Shopping Area */}
            <main id="shop-grid" className="py-48 bg-paper">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Categories Header */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                    <div>
                      <div className="label-f2proteinsandgroceries mb-8">The Collection</div>
                      <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Curated <br />Taxonomy.</h2>
                    </div>
                    <div className="flex items-center gap-12 overflow-x-auto pb-4 no-scrollbar">
                      {CATEGORIES.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category as Category)}
                          className={`whitespace-nowrap text-[11px] uppercase tracking-[0.3em] font-black transition-all relative pb-4 ${
                            selectedCategory === category
                              ? 'text-ink'
                              : 'text-ink/20 hover:text-ink'
                          }`}
                        >
                          {category}
                          {selectedCategory === category && (
                            <motion.div layoutId="cat-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-highlight" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-32">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={product.id}
                        className="group cursor-pointer"
                        onClick={() => openProductDetails(product)}
                      >
                        <div className="relative aspect-[3/4] overflow-hidden mb-12 bg-line/10">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          {product.discount && (
                            <div className="absolute top-0 left-0 bg-highlight text-paper px-4 py-2 text-[10px] font-black uppercase">
                              -{product.discount}%
                            </div>
                          )}
                        </div>
                        <div className="space-y-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{product.name}</h3>
                              <div className="flex items-center gap-2">
                                <Star className="w-3 h-3 text-highlight fill-current" />
                                <span className="text-[10px] font-black tracking-widest">4.9 / 5.0</span>
                              </div>
                            </div>
                            <span className="text-2xl font-black tracking-tighter">
                              ${product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price}
                            </span>
                          </div>
                          <p className="text-xs text-ink/40 font-medium leading-relaxed line-clamp-2 h-10">{product.description}</p>
                          <div className="pt-6 border-t border-line flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-widest font-black text-ink/20">{product.unit}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                              className="text-[10px] uppercase tracking-[0.3em] font-black text-highlight hover:tracking-[0.4em] transition-all"
                            >
                              Add +
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-48 border border-dashed border-line">
                    <Search className="w-12 h-12 text-ink/10 mx-auto mb-8" />
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">No results found</h3>
                    <p className="text-ink/40 font-medium mb-12">Try adjusting your search or looking in another category.</p>
                    <button 
                      onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                      className="text-[10px] uppercase tracking-[0.3em] font-black text-highlight underline underline-offset-8"
                    >
                      Reset Collection
                    </button>
                  </div>
                )}
              </div>
            </main>

      {/* Trust Badges */}
      {/* Trust Badges */}
      <section className="py-32 border-y border-line bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="flex flex-col items-start">
              <div className="label-f2proteinsandgroceries mb-6">Logistics</div>
              <h4 className="font-serif text-2xl italic mb-4">Swift Delivery</h4>
              <p className="text-sm text-ink/40 font-serif italic">Your provisions, delivered with care in under 30 minutes.</p>
            </div>
            <div className="flex flex-col items-start">
              <div className="label-f2proteinsandgroceries mb-6">Security</div>
              <h4 className="font-serif text-2xl italic mb-4">Protected Trade</h4>
              <p className="text-sm text-ink/40 font-serif italic">Encrypted transactions for your peace of mind.</p>
            </div>
            <div className="flex flex-col items-start">
              <div className="label-f2proteinsandgroceries mb-6">Quality</div>
              <h4 className="font-serif text-2xl italic mb-4">Purely Organic</h4>
              <p className="text-sm text-ink/40 font-serif italic">Directly from artisans and local organic estates.</p>
            </div>
            <div className="flex flex-col items-start">
              <div className="label-f2proteinsandgroceries mb-6">Ethics</div>
              <h4 className="font-serif text-2xl italic mb-4">Zero Waste</h4>
              <p className="text-sm text-ink/40 font-serif italic">Committed to sustainable and plastic-free fulfillment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-paper py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <span className="text-3xl font-serif italic font-bold tracking-tight text-ink">FreshCart</span>
              </div>
              <p className="text-ink/40 font-serif italic text-lg leading-relaxed mb-8">
                Elevating the grocery experience through intentional sourcing and refined logistics.
              </p>
              <div className="flex gap-6">
                {['TW', 'IG', 'FB'].map(social => (
                  <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">{social}</a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1" />
            <div>
              <h4 className="label-f2proteinsandgroceries mb-8">Company</h4>
              <ul className="space-y-4 text-ink/60 font-serif italic text-lg">
                <li><a href="#" className="hover:text-ink transition-colors">Our Story</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setView('admin'); }} className="hover:text-ink transition-colors">Admin Portal</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">The Farms</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h4 className="label-f2proteinsandgroceries mb-8">Support</h4>
              <ul className="space-y-4 text-ink/60 font-serif italic text-lg">
                <li><a href="#" className="hover:text-ink transition-colors">Concierge</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Delivery Map</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Order Status</a></li>
                <li><a href="#" className="hover:text-ink transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-32 pt-12 border-t border-line flex flex-col md:flex-row justify-between items-center gap-8 text-ink/20 text-[10px] font-bold uppercase tracking-widest">
            <p>© 2026 FreshCart Grocers. All rights reserved.</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-ink transition-colors">Privacy</a>
              <a href="#" className="hover:text-ink transition-colors">Terms</a>
              <a href="#" className="hover:text-ink transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
        </>
      ) : view === 'checkout' ? (
    <div className="flex-1 bg-paper py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setView('store')}
          className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink mb-12 transition-colors flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Return to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-24">
            {/* Delivery Address */}
            <section>
              <div className="label-f2proteinsandgroceries mb-8 text-highlight">01 — Destination</div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Shipping.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="label-f2proteinsandgroceries">Street Address</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 123 Market Street"
                    className="input-f2proteinsandgroceries text-2xl font-black uppercase tracking-tighter"
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="label-f2proteinsandgroceries">City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. San Francisco"
                    className="input-f2proteinsandgroceries text-2xl font-black uppercase tracking-tighter"
                    value={checkoutData.city}
                    onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Delivery Zone */}
            <section>
              <div className="label-f2proteinsandgroceries mb-8 text-highlight">02 — Logistics</div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Zone.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {deliveryZones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setCheckoutData({...checkoutData, zoneId: zone.id})}
                    className={`p-10 border transition-all text-left flex flex-col justify-between gap-6 ${
                      checkoutData.zoneId === zone.id 
                        ? 'border-ink bg-white shadow-2xl ring-1 ring-ink' 
                        : 'border-line hover:border-ink/30'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-black uppercase tracking-tighter text-2xl">{zone.name}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-highlight">${zone.fee.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-black flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {zone.estimatedTime}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Delivery Time */}
            <section>
              <div className="label-f2proteinsandgroceries mb-8 text-highlight">03 — Schedule</div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Time.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setCheckoutData({...checkoutData, timeSlot: slot})}
                    className={`px-10 py-8 border transition-all text-left flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-black ${
                      checkoutData.timeSlot === slot 
                        ? 'border-ink bg-white shadow-2xl text-ink ring-1 ring-ink' 
                        : 'border-line hover:border-ink/30 text-ink/40'
                    }`}
                  >
                    {slot}
                    {checkoutData.timeSlot === slot && <ShieldCheck className="w-4 h-4 text-highlight" />}
                  </button>
                ))}
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <div className="label-f2proteinsandgroceries mb-8 text-highlight">04 — Settlement</div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Payment.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setCheckoutData({...checkoutData, paymentMethod: method.id})}
                    className={`p-10 border transition-all flex items-center gap-8 ${
                      checkoutData.paymentMethod === method.id 
                        ? 'border-ink bg-white shadow-2xl ring-1 ring-ink' 
                        : 'border-line hover:border-ink/30'
                    }`}
                  >
                    <span className="text-4xl">{method.icon}</span>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-[0.2em] font-black mb-1">{method.name}</div>
                      <div className="text-[8px] opacity-30 uppercase tracking-[0.2em] font-black">Secure Gateway</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-ink p-12 sticky top-32 bg-white shadow-2xl">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10">Summary.</h2>
              <div className="space-y-8 mb-10 max-h-64 overflow-y-auto pr-4 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-paper overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-black uppercase tracking-tighter text-lg">{item.name}</div>
                        <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <span className="font-black tracking-tighter text-xl">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-line mb-10">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-ink/40">
                  <span>Subtotal</span>
                  <span className="text-ink">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-ink/40">
                  <span>Logistics</span>
                  <span className="text-highlight">
                    ${(deliveryZones.find(z => z.id === checkoutData.zoneId)?.fee || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-5xl font-black tracking-tighter text-ink pt-8 border-t border-line">
                  <span>Total</span>
                  <span>${(cartTotal + (deliveryZones.find(z => z.id === checkoutData.zoneId)?.fee || 0)).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={!checkoutData.address || !checkoutData.timeSlot}
                className="w-full btn-elite py-8 text-sm font-black"
              >
                Complete Order
              </button>
              <p className="text-center text-[8px] text-ink/20 mt-6 font-black uppercase tracking-[0.2em]">
                Secure checkout powered by Elite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : view === 'success' ? (
    <div className="flex-1 bg-paper flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center"
      >
        <div className="label-f2proteinsandgroceries mb-12 text-highlight">Order Confirmed</div>
        <h1 className="text-8xl font-black uppercase tracking-tighter mb-12">Provisions Secured.</h1>
        <p className="text-sm font-medium text-ink/40 mb-16 leading-relaxed">
          Your selection has been curated and is now being prepared for transit. 
          Expect arrival in approximately {deliveryZones.find(z => z.id === checkoutData.zoneId)?.estimatedTime || '30 minutes'}.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => {
              setSelectedOrder(orders[0]);
              setView('tracking');
              setCart([]);
            }}
            className="btn-elite px-12 py-6"
          >
            Track Transit
          </button>
          <button 
            onClick={() => { setView('store'); setCart([]); }}
            className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors"
          >
            Return to Store
          </button>
        </div>
      </motion.div>
    </div>
  ) : view === 'account' ? (
    <div className="flex-1 bg-paper py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setView('store')}
          className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink mb-12 transition-colors flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Return to Collection
        </button>
        <div className="flex flex-col md:flex-row gap-24">
          {/* Sidebar */}
          <div className="md:w-1/4 space-y-12">
            <div className="text-center">
              <div className="w-40 h-40 bg-paper overflow-hidden mx-auto mb-8 border border-line">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-ink mb-2">{user.name}</h2>
              <p className="text-[10px] uppercase tracking-widest font-black text-ink/30">{user.email}</p>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'orders', label: 'Order History', icon: Package },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
                { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                { id: 'wishlist', label: 'Wishlist', icon: Heart },
                { id: 'settings', label: 'Account Settings', icon: Settings }
              ].map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink hover:bg-white transition-all group"
                >
                  <item.icon className="w-4 h-4 opacity-30 group-hover:opacity-100" />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => setView('store')}
                className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-black text-highlight hover:bg-white transition-all group mt-8"
              >
                <LogOut className="w-4 h-4 opacity-30 group-hover:opacity-100" />
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-24">
            <section>
              <div className="flex justify-between items-baseline mb-16 border-b border-line pb-8">
                <h2 className="text-5xl font-black uppercase tracking-tighter text-ink">Order History.</h2>
                <div className="label-f2proteinsandgroceries text-highlight">
                  {orders.length} Records
                </div>
              </div>

              <div className="space-y-12">
                {orders.map((order) => (
                  <div key={order.id} className="border border-line p-10 hover:border-ink transition-all bg-white group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 pb-10 border-b border-line">
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-ink flex items-center justify-center">
                          <Package className="w-8 h-8 text-paper" />
                        </div>
                        <div>
                          <div className="font-black uppercase tracking-tighter text-2xl text-ink mb-1">{order.id}</div>
                          <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">{order.date}</div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <span className={`text-[10px] font-black uppercase tracking-widest mb-4 px-3 py-1 border ${
                          order.status === 'delivered' ? 'border-line text-ink/40' : 'border-highlight text-highlight'
                        }`}>
                          {order.status.replace('-', ' ')}
                        </span>
                        <span className="text-4xl font-black tracking-tighter text-ink">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 mb-10">
                      {order.items.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="w-24 h-24 bg-paper overflow-hidden relative group/item">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover/item:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-[10px] font-black">x{item.quantity}</span>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 4 && (
                        <div className="w-24 h-24 bg-paper flex items-center justify-center text-ink/20 font-black text-[10px] uppercase tracking-widest border border-line">
                          +{order.items.length - 4}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-8">
                      <button 
                        onClick={() => {
                          setSelectedOrder(order);
                          setView('tracking');
                        }}
                        className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight hover:tracking-[0.3em] transition-all"
                      >
                        Track Transit
                      </button>
                      <button className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors">
                        Order Details
                      </button>
                      <button className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors">
                        Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  ) : view === 'tracking' && selectedOrder ? (
    <div className="flex-1 bg-paper py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline mb-24 border-b border-line pb-12">
          <div>
            <div className="label-f2proteinsandgroceries mb-4 text-highlight">Tracking ID: {selectedOrder.id}</div>
            <h1 className="text-6xl font-black uppercase tracking-tighter">In Transit.</h1>
          </div>
          <button 
            onClick={() => setView('store')}
            className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors"
          >
            Exit Tracking
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Status Timeline */}
          <div className="lg:col-span-1 space-y-12">
            <div className="label-f2proteinsandgroceries">Logistics Status</div>
            <div className="space-y-12 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
              {[
                { label: 'Order Confirmed', time: '10:30 AM', status: 'completed' },
                { label: 'Provisions Curated', time: '10:35 AM', status: 'completed' },
                { label: 'Transit Initiated', time: '10:42 AM', status: 'current' },
                { label: 'Final Delivery', time: 'Estimated 11:00 AM', status: 'pending' },
              ].map((step, i) => (
                <div key={i} className="flex gap-8 relative">
                  <div className={`w-4 h-4 z-10 ${
                    step.status === 'completed' ? 'bg-ink' : 
                    step.status === 'current' ? 'bg-highlight animate-pulse' : 
                    'bg-white border border-line'
                  }`} />
                  <div>
                    <div className={`text-[10px] uppercase tracking-widest font-black mb-1 ${
                      step.status === 'pending' ? 'text-ink/20' : 'text-ink'
                    }`}>{step.label}</div>
                    <div className="text-[10px] font-mono font-black text-ink/30">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Driver & Map */}
          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="border border-line p-12 bg-white shadow-2xl">
                <div className="label-f2proteinsandgroceries mb-8 text-highlight">Courier Personnel</div>
                {selectedOrder.riderId ? (
                  <>
                    <div className="flex items-center gap-8 mb-10">
                      <div className="w-24 h-24 bg-paper overflow-hidden border border-line">
                        <img 
                          src={riders.find(r => r.id === selectedOrder.riderId)?.avatar || "https://i.pravatar.cc/100?img=12"} 
                          alt="Driver" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <div className="font-black uppercase tracking-tighter text-3xl mb-1">
                          {riders.find(r => r.id === selectedOrder.riderId)?.name || "Assigning..."}
                        </div>
                        <div className="flex items-center gap-2 text-highlight">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {riders.find(r => r.id === selectedOrder.riderId)?.rating || "5.0"} Rating
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-4 border-b border-line">
                        <span className="text-[10px] uppercase tracking-widest font-black text-ink/30">Current Range</span>
                        <span className="text-[10px] font-mono font-black text-ink">2.4 KM</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-line">
                        <span className="text-[10px] uppercase tracking-widest font-black text-ink/30">Destination</span>
                        <span className="text-[10px] font-mono font-black text-ink">Residence</span>
                      </div>
                    </div>
                    <button className="w-full btn-elite mt-10 py-6 text-[10px] font-black">
                      Secure Contact
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 border border-line flex items-center justify-center mb-6 animate-pulse">
                      <Users className="w-6 h-6 text-ink/20" />
                    </div>
                    <div className="font-black uppercase tracking-tighter text-2xl mb-2">Assigning Courier</div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-ink/30">Optimizing logistics path...</p>
                  </div>
                )}
              </div>

              <div className="border border-line bg-paper overflow-hidden relative min-h-[400px] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" 
                  alt="Map" 
                  className="w-full h-full object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white border border-ink px-8 py-4 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-highlight animate-ping" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black">Courier in Motion</span>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  animate={{ x: [0, 50, 20, 80], y: [0, -30, 10, -50] }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="bg-ink p-4 shadow-2xl">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : view === 'admin' ? (
    <div className="flex-1 bg-paper min-h-screen flex flex-col">
      {/* Admin Header - Mobile First */}
      <header className="bg-ink text-white p-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black uppercase tracking-tighter">F2G</span>
            <div className="text-[8px] uppercase tracking-[0.2em] font-black text-white/60">Admin</div>
          </div>
          <button 
            onClick={() => setView('store')}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-80 bg-ink text-white flex flex-col">
          <div className="hidden md:block p-12 border-b border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-black uppercase tracking-tighter">f2proteinsandgroceries</span>
              <div className="label-f2proteinsandgroceries border-highlight text-highlight">Admin</div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">System Control</div>
          </div>
          
          <nav className="flex-1 p-4 md:p-8 space-y-2">
            {[
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'products', label: 'Inventory', icon: Package },
              { id: 'logistics', label: 'Logistics', icon: Truck },
              { id: 'users', label: 'Personnel', icon: Users },
              { id: 'settings', label: 'System', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id as any)}
                className={`w-full flex items-center gap-3 md:gap-4 px-4 md:px-8 py-3 md:py-5 transition-all ${
                  adminTab === item.id 
                    ? 'bg-highlight text-paper' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-black">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 md:p-8 border-t border-white/10">
            <button 
              onClick={() => setView('store')}
              className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-8 py-3 md:py-5 text-white/40 hover:text-white transition-all group"
            >
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-2 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">Exit Portal</span>
            </button>
          </div>
        </aside>

        {/* Admin Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-24 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {adminTab === 'dashboard' ? (
              <div className="space-y-16 md:space-y-24">
                <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-line pb-8 md:pb-12">
                  <div>
                    <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-ink mb-4">System.</h1>
                    <p className="text-sm font-medium text-ink/40">Operational status: Optimal</p>
                  </div>
                  <div className="label-f2proteinsandgroceries text-highlight">March 12, 2026</div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                  {[
                    { label: 'Total Revenue', value: `$${salesData.totalRevenue.toFixed(2)}`, icon: BarChart3 },
                    { label: 'Total Orders', value: salesData.totalOrders, icon: Package },
                    { label: 'Total Customers', value: salesData.totalCustomers, icon: Users },
                    { label: 'Low Stock', value: salesData.lowStockProducts.length, icon: AlertCircle }
                  ].map((stat, idx) => (
                    <div key={idx} className="border border-line p-6 md:p-10 bg-white group hover:border-highlight transition-all">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-ink flex items-center justify-center mb-6 md:mb-8 group-hover:bg-highlight transition-colors">
                        <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-paper" />
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/30 mb-2">{stat.label}</div>
                      <div className="text-3xl md:text-5xl font-black tracking-tighter text-ink">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Orders Table */}
                <section>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-4 mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-ink">Recent Transactions</h2>
                    <button onClick={() => setAdminTab('orders')} className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight hover:tracking-[0.3em] transition-all underline underline-offset-8">View All</button>
                  </div>
                  <div className="bg-white border border-line rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/30 border-b border-line">
                            <th className="p-4 md:pb-8">Identifier</th>
                            <th className="p-4 md:pb-8">Entity</th>
                            <th className="p-4 md:pb-8">Timestamp</th>
                            <th className="p-4 md:pb-8">Value</th>
                            <th className="p-4 md:pb-8">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {orders.slice(0, 5).map((order) => (
                            <tr key={order.id} className="group hover:bg-gray-50 transition-colors">
                              <td className="p-4 md:py-10 font-mono text-[10px] font-black text-ink">{order.id}</td>
                              <td className="p-4 md:py-10 font-black uppercase tracking-tighter text-sm md:text-lg text-ink">Private Client</td>
                              <td className="p-4 md:py-10 text-[10px] uppercase tracking-widest font-black text-ink/40">{order.date}</td>
                              <td className="p-4 md:py-10 font-black tracking-tighter text-lg md:text-2xl text-ink">${order.total.toFixed(2)}</td>
                              <td className="p-4 md:py-10">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border ${
                                  order.status === 'delivered' ? 'border-line text-ink/20' : 'border-highlight text-highlight'
                                }`}>
                                  {order.status.replace('-', ' ')}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            ) : adminTab === 'products' ? (
          <div className="space-y-24">
            <header className="flex justify-between items-end border-b border-line pb-12">
              <div>
                <h1 className="text-7xl font-black uppercase tracking-tighter text-ink mb-4">Inventory.</h1>
                <p className="text-sm font-medium text-ink/40">Manage your curated collection and stock levels.</p>
              </div>
              <button 
                onClick={() => setIsAddingProduct(true)}
                className="btn-f2proteinsandgroceries px-12 py-6"
              >
                Add Selection
              </button>
            </header>

            <div className="border border-line bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/30 border-b border-line bg-paper/50">
                      <th className="p-10">Product Selection</th>
                      <th className="p-10">Classification</th>
                      <th className="p-10">Valuation</th>
                      <th className="p-10">Stock Status</th>
                      <th className="p-10 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {products.map((product) => (
                      <tr key={product.id} className="group hover:bg-paper transition-colors">
                        <td className="p-10">
                          <div className="flex items-center gap-8">
                            <div className="w-20 h-20 bg-paper overflow-hidden">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-black uppercase tracking-tighter text-2xl text-ink mb-1">{product.name}</div>
                              <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">{product.unit}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-10">
                          <span className="text-[10px] uppercase tracking-widest font-black text-ink/40 px-3 py-1 bg-line">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-10 font-black tracking-tighter text-2xl text-ink">${product.price.toFixed(2)}</td>
                        <td className="p-10">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 ${product.stock > 10 ? 'bg-ink' : 'bg-highlight'}`} />
                            <span className="text-[10px] uppercase tracking-widest font-black text-ink/40">{product.stock} Units</span>
                          </div>
                        </td>
                        <td className="p-10 text-right">
                          <div className="flex justify-end gap-8">
                            <button 
                              onClick={() => setEditingProduct(product)}
                              className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight/40 hover:text-highlight transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : adminTab === 'categories' ? (
          <div className="space-y-24">
            <header className="flex justify-between items-end border-b border-line pb-12">
              <div>
                <h1 className="text-7xl font-black uppercase tracking-tighter text-ink mb-4">Taxonomy.</h1>
                <p className="text-sm font-medium text-ink/40">Organize your collection into logical classifications.</p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <section>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-ink mb-12">New Entry</h2>
                <div className="space-y-12">
                  <div>
                    <label className="label-f2proteinsandgroceries mb-6">Classification Name</label>
                    <input 
                      type="text" 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="e.g., Rare Vintages"
                      className="w-full bg-paper border border-line px-10 py-8 text-2xl font-black uppercase tracking-tighter text-ink focus:outline-none focus:border-highlight transition-all"
                    />
                  </div>
                  <button 
                    onClick={handleAddCategory}
                    className="btn-elite px-12 py-6"
                  >
                    Create Classification
                  </button>
                </div>
              </section>

              <section>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-ink mb-12">Existing</h2>
                <div className="space-y-6">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center justify-between p-10 border border-line bg-white group hover:border-ink transition-all">
                      <div className="flex items-center gap-8">
                        <div className="w-12 h-12 bg-ink flex items-center justify-center">
                          <Layers className="w-5 h-5 text-paper" />
                        </div>
                        <span className="font-black uppercase tracking-tighter text-2xl text-ink">{cat}</span>
                      </div>
                      {cat !== 'All' && (
                        <button 
                          onClick={() => handleDeleteCategory(cat)}
                          className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight/40 hover:text-highlight transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : adminTab === 'orders' ? (
          <div className="space-y-24">
            <header className="flex justify-between items-end border-b border-line pb-12">
              <div>
                <h1 className="text-7xl font-black uppercase tracking-tighter text-ink mb-4">Fulfillment.</h1>
                <p className="text-sm font-medium text-ink/40">Manage customer orders and logistics flow.</p>
              </div>
              <div className="label-f2proteinsandgroceries text-highlight">{orders.length} Active Sessions</div>
            </header>

            <div className="border border-line bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/30 border-b border-line bg-paper/50">
                      <th className="p-10">Identifier</th>
                      <th className="p-10">Entity & Destination</th>
                      <th className="p-10">Valuation</th>
                      <th className="p-10">Status</th>
                      <th className="p-10 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {orders.map((order) => (
                      <tr key={order.id} className="group hover:bg-paper transition-colors">
                        <td className="p-10">
                          <div className="font-mono text-[10px] font-black text-ink mb-1">{order.id}</div>
                          <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">{order.date}</div>
                        </td>
                        <td className="p-10">
                          <div className="font-black uppercase tracking-tighter text-lg text-ink mb-1">Private Client</div>
                          <div className="text-[10px] uppercase tracking-widest font-black text-ink/30 truncate max-w-[250px]">{order.deliveryAddress}</div>
                        </td>
                        <td className="p-10 font-black tracking-tighter text-2xl text-ink">${order.total.toFixed(2)}</td>
                        <td className="p-10">
                          <select 
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                            className="bg-paper border border-line px-6 py-3 text-[10px] uppercase tracking-widest font-black text-ink focus:outline-none focus:border-highlight appearance-none cursor-pointer"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="packed">Packed</option>
                            <option value="out-for-delivery">In Transit</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="p-10 text-right">
                          <button className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight hover:tracking-[0.3em] transition-all underline underline-offset-8">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : adminTab === 'users' ? (
          <div className="space-y-24">
            <header className="flex justify-between items-end border-b border-line pb-12">
              <div>
                <h1 className="text-7xl font-black uppercase tracking-tighter text-ink mb-4">Personnel.</h1>
                <p className="text-sm font-medium text-ink/40">Registered entities and client database.</p>
              </div>
              <div className="label-f2proteinsandgroceries text-highlight">{customers.length} Entities</div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {customers.map((customer, idx) => (
                <div key={idx} className="border border-line p-12 bg-white text-center hover:border-ink transition-all group">
                  <div className="w-40 h-40 bg-paper overflow-hidden mx-auto mb-8 border border-line">
                    <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-ink mb-2">{customer.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest font-black text-ink/30 mb-10">{customer.email}</p>
                  <div className="grid grid-cols-2 gap-8 border-t border-line pt-10">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-black text-ink/20 mb-2">Engagements</div>
                      <div className="text-3xl font-black tracking-tighter text-ink">12</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-black text-ink/20 mb-2">Contribution</div>
                      <div className="text-3xl font-black tracking-tighter text-ink">$450</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : adminTab === 'logistics' ? (
          <div className="space-y-24">
            <header className="flex justify-between items-end border-b border-line pb-12">
              <div>
                <h1 className="text-7xl font-black uppercase tracking-tighter text-ink mb-4">Logistics.</h1>
                <p className="text-sm font-medium text-ink/40">Transit zones, courier personnel, and path optimization.</p>
              </div>
              <div className="label-f2proteinsandgroceries text-highlight">Operational</div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              {/* Delivery Zones */}
              <section>
                <div className="flex justify-between items-baseline mb-12">
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-ink">Transit Zones</h2>
                  <button className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight hover:tracking-[0.3em] transition-all">
                    Add Zone
                  </button>
                </div>
                <div className="space-y-6">
                  {deliveryZones.map((zone) => (
                    <div key={zone.id} className="flex items-center justify-between p-10 border border-line bg-white group hover:border-ink transition-all">
                      <div className="flex items-center gap-8">
                        <div className="w-12 h-12 bg-ink flex items-center justify-center">
                          <Navigation className="w-5 h-5 text-paper" />
                        </div>
                        <div>
                          <div className="font-black uppercase tracking-tighter text-2xl text-ink mb-1">{zone.name}</div>
                          <div className="text-[10px] uppercase tracking-widest font-bold text-ink/30">{zone.estimatedTime}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif italic text-2xl text-ink mb-1">${zone.fee.toFixed(2)}</div>
                        <button className="text-[10px] uppercase tracking-widest font-bold text-ink/20 hover:text-ink transition-colors">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Dispatch Riders */}
              <section>
                <div className="flex justify-between items-baseline mb-12">
                  <h2 className="text-3xl font-serif italic text-ink">Courier Personnel</h2>
                  <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 hover:text-ink transition-colors">
                    Register Courier
                  </button>
                </div>
                <div className="space-y-6">
                  {riders.map((rider) => (
                    <div key={rider.id} className="flex items-center justify-between p-8 border border-line bg-white group hover:bg-paper transition-all">
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-paper overflow-hidden grayscale">
                          <img src={rider.avatar} alt={rider.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-serif italic text-2xl text-ink mb-1">{rider.name}</div>
                          <div className="flex items-center gap-2 text-accent">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{rider.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${
                          rider.status === 'available' ? 'text-ink/20' : 
                          rider.status === 'busy' ? 'text-accent' : 'text-ink/10'
                        }`}>
                          {rider.status}
                        </span>
                        <div className="text-[10px] font-mono text-ink/30">{rider.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Logistics API Simulation Info */}
            <section className="bg-ink text-white p-16 border border-white/10">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white/40" />
                </div>
                <h2 className="text-4xl font-serif italic">Logistics Infrastructure</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="p-10 border border-white/10 bg-white/5">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">Cartography Engine</div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Connected</span>
                  </div>
                </div>
                <div className="p-10 border border-white/10 bg-white/5">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">Personnel Sync</div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Active (4 Units)</span>
                  </div>
                </div>
                <div className="p-10 border border-white/10 bg-white/5">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">Path Optimization</div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Enabled</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </div>
      </main>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {(editingProduct || isAddingProduct) && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }}
              className="fixed inset-0 bg-ink/60 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white border border-line z-[70] overflow-hidden flex flex-col"
            >
              <div className="p-12 border-b border-line flex justify-between items-baseline">
                <h2 className="text-4xl font-serif italic text-ink">{isAddingProduct ? 'New Selection' : 'Refine Selection'}</h2>
                <button onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }} className="text-ink/20 hover:text-ink transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-12">
                    <div>
                      <label className="label-f2proteinsandgroceries mb-6">Product Name</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.name || ''}
                        id="p-name"
                        className="w-full bg-paper border border-line px-10 py-6 text-xl font-serif italic text-ink focus:outline-none focus:border-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="label-f2proteinsandgroceries mb-6">Classification</label>
                      <select 
                        defaultValue={editingProduct?.category || categories[1]}
                        id="p-category"
                        className="w-full bg-paper border border-line px-10 py-6 text-xl font-serif italic text-ink focus:outline-none focus:border-accent transition-all appearance-none"
                      >
                        {categories.filter(c => c !== 'All').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="label-f2proteinsandgroceries mb-6">Valuation ($)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          defaultValue={editingProduct?.price || 0}
                          id="p-price"
                          className="w-full bg-paper border border-line px-10 py-6 text-xl font-serif italic text-ink focus:outline-none focus:border-accent transition-all"
                        />
                      </div>
                      <div>
                        <label className="label-f2proteinsandgroceries mb-6">Stock Level</label>
                        <input 
                          type="number" 
                          defaultValue={editingProduct?.stock || 0}
                          id="p-stock"
                          className="w-full bg-paper border border-line px-10 py-6 text-xl font-serif italic text-ink focus:outline-none focus:border-accent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-12">
                    <div>
                      <label className="label-f2proteinsandgroceries mb-6">Visual Asset URL</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.image || ''}
                        id="p-image"
                        className="w-full bg-paper border border-line px-10 py-6 text-xl font-serif italic text-ink focus:outline-none focus:border-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="label-f2proteinsandgroceries mb-6">Unit Specification</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.unit || ''}
                        id="p-unit"
                        className="w-full bg-paper border border-line px-10 py-6 text-xl font-serif italic text-ink focus:outline-none focus:border-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="label-f2proteinsandgroceries mb-6">Narrative Description</label>
                      <textarea 
                        defaultValue={editingProduct?.description || ''}
                        id="p-description"
                        rows={3}
                        className="w-full bg-paper border border-line px-10 py-6 text-xl font-serif italic text-ink focus:outline-none focus:border-accent transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-12 border-t border-line bg-paper flex gap-8">
                <button 
                  onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }}
                  className="flex-1 px-12 py-6 border border-line text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 hover:text-ink hover:bg-white transition-all"
                >
                  Discard
                </button>
                <button 
                  onClick={() => {
                    const name = (document.getElementById('p-name') as HTMLInputElement).value;
                    const category = (document.getElementById('p-category') as HTMLSelectElement).value;
                    const price = parseFloat((document.getElementById('p-price') as HTMLInputElement).value);
                    const stock = parseInt((document.getElementById('p-stock') as HTMLInputElement).value);
                    const image = (document.getElementById('p-image') as HTMLInputElement).value;
                    const unit = (document.getElementById('p-unit') as HTMLInputElement).value;
                    const description = (document.getElementById('p-description') as HTMLTextAreaElement).value;

                    if (isAddingProduct) {
                      handleAddProduct({
                        id: Math.random().toString(36).substr(2, 9),
                        name, category, price, stock, image, unit, description, reviews: []
                      });
                    } else if (editingProduct) {
                      handleUpdateProduct({
                        ...editingProduct,
                        name, category, price, stock, image, unit, description
                      });
                    }
                  }}
                  className="flex-1 btn-elite py-6"
                >
                  {isAddingProduct ? 'Archive Selection' : 'Preserve Changes'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <div className="flex-1 flex items-center justify-center bg-emerald-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[40px] p-12 text-center shadow-2xl"
      >
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShieldCheck className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">Order Placed!</h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Thank you for shopping with FreshCart. Your groceries will be delivered between <strong>{checkoutData.timeSlot}</strong>.
        </p>
        <div className="bg-slate-50 rounded-3xl p-6 mb-10 text-left">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Order Details</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Order ID:</span>
              <span className="font-bold text-slate-900">#FC-{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Delivery to:</span>
              <span className="font-bold text-slate-900">{checkoutData.city}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Payment:</span>
              <span className="font-bold text-slate-900 uppercase">{checkoutData.paymentMethod}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => {
            setCart([]);
            setView('store');
          }}
          className="w-full btn-primary py-4"
        >
          Continue Shopping
        </button>
      </motion.div>
    </div>
  ) : null

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-paper shadow-2xl z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-paper border-b border-line p-6 flex justify-between items-center z-10">
                <h3 className="text-2xl font-black tracking-tighter uppercase">Selection</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-ink/40 hover:text-ink transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-2 border-dashed border-line rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <ShoppingBag className="w-8 h-8 text-ink/20" />
                    </div>
                    <p className="text-ink/30 text-sm font-medium mb-8">Your selection is empty</p>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        setView('store');
                      }}
                      className="w-full btn-elite py-4 text-sm font-black"
                    >
                      Start Selection
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      layout
                      key={item.id}
                      className="bg-paper border border-line rounded-3xl p-6 mb-6"
                    >
                      <div className="flex gap-6">
                        <div className="w-20 h-20 bg-line rounded-2xl overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-ink text-lg uppercase tracking-tighter mb-2">{item.name}</h4>
                          <p className="text-ink/40 text-xs font-medium mb-4">{item.unit}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border border-line flex items-center justify-center hover:bg-line transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-black text-xl w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border border-line flex items-center justify-center hover:bg-line transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="font-black text-xl">
                                ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-[10px] uppercase tracking-widest font-black text-ink/20 hover:text-red-500 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                
                {cart.length > 0 && (
                  <>
                    <div className="border-t border-line pt-6 mt-6">
                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                          <span className="text-ink/40 font-medium">Subtotal</span>
                          <span className="font-black">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-ink/40 font-medium">Delivery</span>
                          <span className="font-black">FREE</span>
                        </div>
                        <div className="flex justify-between text-lg pt-4 border-t border-line">
                          <span className="font-black uppercase tracking-tighter">Total</span>
                          <span className="font-black text-xl">${cartTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setIsCartOpen(false);
                          setView('checkout');
                        }}
                        className="w-full btn-elite py-6 text-sm font-black flex items-center justify-center gap-4"
                      >
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl max-h-[90vh] bg-white shadow-2xl z-[70] overflow-hidden flex flex-col md:flex-row border border-line"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 p-4 bg-white hover:bg-ink hover:text-white border border-line z-10 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Section */}
              <div className="md:w-1/2 h-80 md:h-auto bg-paper relative overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                {selectedProduct.discount && (
                  <div className="absolute top-8 left-8 bg-highlight text-paper px-6 py-3 text-[10px] font-black uppercase tracking-widest">
                    -{selectedProduct.discount}%
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 p-12 overflow-y-auto">
                <div className="space-y-12">
                  <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-6">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex items-center gap-2 text-highlight">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'fill-current' : 'text-ink/10'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest font-black text-ink/30">4.9 / 5.0 (128 Reviews)</span>
                    </div>
                    <p className="text-ink/60 text-lg leading-relaxed mb-8">{selectedProduct.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Leaf className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-black text-ink">100% Organic</div>
                          <div className="text-sm text-ink/40">Certified organic farming practices</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Droplet className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-black text-ink">Fresh Daily</div>
                          <div className="text-sm text-ink/40">Harvested and delivered within 24 hours</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Award className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-black text-ink">Premium Quality</div>
                          <div className="text-sm text-ink/40">Hand-picked for optimal freshness and taste</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-ink mb-8 text-[10px] uppercase tracking-[0.2em]">Nutritional Information</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-paper p-6 rounded-2xl border border-line">
                        <div className="text-3xl font-black text-highlight mb-2">156</div>
                        <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">Calories per 100g</div>
                      </div>
                      <div className="bg-paper p-6 rounded-2xl border border-line">
                        <div className="text-3xl font-black text-highlight mb-2">8.2g</div>
                        <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">Protein per 100g</div>
                      </div>
                      <div className="bg-paper p-6 rounded-2xl border border-line">
                        <div className="text-3xl font-black text-highlight mb-2">12.5g</div>
                        <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">Carbs per 100g</div>
                      </div>
                      <div className="bg-paper p-6 rounded-2xl border border-line">
                        <div className="text-3xl font-black text-highlight mb-2">0.2g</div>
                        <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">Fat per 100g</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-ink mb-8 text-[10px] uppercase tracking-[0.2em]">Origin & Sustainability</h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center py-4 border-b border-line">
                        <span className="text-sm font-medium text-ink/60">Farm Origin</span>
                        <span className="font-black text-ink">Local Green Valley Farm</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-line">
                        <span className="text-sm font-medium text-ink/60">Distance</span>
                        <span className="font-black text-ink">42 km from store</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-line">
                        <span className="text-sm font-medium text-ink/60">Carbon Footprint</span>
                        <span className="font-black text-emerald-600">Low Impact</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-line">
                        <span className="text-sm font-medium text-ink/60">Packaging</span>
                        <span className="font-black text-ink">100% Compostable</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-ink mb-8 text-[10px] uppercase tracking-[0.2em]">Personnel Feedback</h4>
                    <div className="space-y-8">
                      {selectedProduct.reviews.length > 0 ? (
                        selectedProduct.reviews.map(review => (
                          <div key={review.id} className="border-b border-line pb-8 last:border-0">
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-black text-ink uppercase tracking-tighter text-lg">{review.user}</span>
                              <span className="text-[10px] font-black text-ink/30 uppercase tracking-widest">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-highlight mb-4">
                              {[1,2,3,4,5].map(i => (
                                <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'fill-current' : 'text-ink/10'}`} />
                              ))}
                            </div>
                            <p className="text-ink/60 text-sm leading-relaxed">{review.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-ink/30 text-[10px] uppercase tracking-widest font-black">No feedback recorded yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="sticky bottom-0 bg-white pt-8 border-t border-line flex flex-col sm:flex-row items-center gap-8">
                    <div className="flex items-center border border-line">
                      <button 
                        onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                        className="p-6 hover:bg-paper transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-black text-xl">{detailQuantity}</span>
                      <button 
                        onClick={() => setDetailQuantity(detailQuantity + 1)}
                        className="p-6 hover:bg-paper transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 w-full">
                      <button 
                        onClick={() => {
                          addToCart(selectedProduct, detailQuantity);
                          setSelectedProduct(null);
                        }}
                        className="w-full btn-elite py-8 text-sm font-black flex items-center justify-center gap-4"
                      >
                        Add to Selection
                        <span className="opacity-40">|</span>
                        <span>${( (selectedProduct.discount ? selectedProduct.price * (1 - selectedProduct.discount / 100) : selectedProduct.price) * detailQuantity).toFixed(2)}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  ) : null}
  </div>
  );
}
