
import React, { useState, useMemo } from 'react';
import { 
  ShoppingBasket, 
  Plus, 
  Minus, 
  X, 
  ChevronRight, 
  Leaf,
  Tag,
  TrendingUp,
  Layers,
  PlusCircle,
  Edit3,
  Save,
  Droplet,
  Award,
  Heart,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES, DELIVERY_ZONES, RIDERS } from './constants';
import { Product, CartItem, Category, User as UserType, Order, Address, PaymentMethod, Rider, DeliveryZone } from './types';

// Import page components
import StorePage from './pages/StorePage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import AccountPage from './pages/AccountPage';
import TrackingPage from './pages/TrackingPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CollectionsPage from './pages/CollectionsPage';
import StoryPage from './pages/StoryPage';
import JournalPage from './pages/JournalPage';
import WhatsAppButton from './components/WhatsAppButton';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  const [view, setView] = useState<'store' | 'collections' | 'story' | 'journal' | 'checkout' | 'success' | 'account' | 'tracking' | 'admin' | 'about' | 'contact' | 'category' | 'product'>('store');
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
    setView('product');
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
      {/* Standalone Navbar - appears across all pages */}
      <Navbar
        setView={setView}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        variant={view === 'store' ? 'main' : 'simple'}
        backLabel={view === 'checkout' ? 'Back to Store' : view === 'account' ? 'Back to Store' : view === 'about' ? 'Back to Store' : view === 'contact' ? 'Back to Store' : view === 'category' ? 'Back to Store' : view === 'product' ? 'Back to Store' : view === 'collections' ? 'Back to Store' : view === 'story' ? 'Back to Store' : view === 'journal' ? 'Back to Store' : 'Back to Store'}
        transparent={view === 'store'}
      />

      {view === 'store' && (
        <StorePage
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          cart={cart}
          cartCount={cartCount}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          addToCart={addToCart}
          openProductDetails={openProductDetails}
          setView={setView}
        />
      )}
      
      {view === 'collections' && (
        <CollectionsPage
          setView={setView}
          addToCart={addToCart}
          openProductDetails={openProductDetails}
          cartCount={cartCount}
          setIsCartOpen={setIsCartOpen}
        />
      )}
      
      {view === 'story' && (
        <StoryPage
          setView={setView}
        />
      )}
      
      {view === 'journal' && (
        <JournalPage
          setView={setView}
        />
      )}
      
      {view === 'checkout' && (
        <CheckoutPage
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
          cart={cart}
          cartTotal={cartTotal}
          deliveryZones={deliveryZones}
          timeSlots={timeSlots}
          paymentMethods={paymentMethods}
          handlePlaceOrder={handlePlaceOrder}
          setView={setView}
        />
      )}
      
      {view === 'success' && (
        <SuccessPage
          deliveryZones={deliveryZones}
          checkoutData={checkoutData}
          orders={orders}
          setSelectedOrder={setSelectedOrder}
          setView={setView}
          setCart={setCart}
        />
      )}
      
      {view === 'account' && (
        <AccountPage
          user={user}
          orders={orders}
          setView={setView}
          setSelectedOrder={setSelectedOrder}
        />
      )}
      
      {view === 'tracking' && selectedOrder && (
        <TrackingPage
          selectedOrder={selectedOrder}
          riders={riders}
          setView={setView}
        />
      )}
      
      {view === 'admin' && (
        <AdminPage
          adminTab={adminTab}
          setAdminTab={setAdminTab}
          setView={setView}
          salesData={salesData}
          orders={orders}
          products={products}
          onEditProduct={setEditingProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddProduct={() => setIsAddingProduct(true)}
        />
      )}
      
      {view === 'category' && (
        <CategoryPage
          category={selectedCategory}
          setCategory={setSelectedCategory}
          setView={setView}
          addToCart={addToCart}
          openProductDetails={openProductDetails}
          cartCount={cartCount}
          setIsCartOpen={setIsCartOpen}
        />
      )}
      
      {view === 'about' && (
        <AboutPage setView={setView} />
      )}
      
      {view === 'contact' && (
        <ContactPage setView={setView} />
      )}

      {view === 'product' && selectedProduct && (
        <ProductPage 
          product={selectedProduct}
          setView={setView}
          addToCart={addToCart}
          cartCount={cartCount}
          setIsCartOpen={setIsCartOpen}
          openProductDetails={openProductDetails}
        />
      )}

      {/* Product Detail Modal - Only fallback or when not in full page view */}
      <AnimatePresence>
        {selectedProduct && view !== 'product' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/80 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square bg-paper overflow-hidden">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">{selectedProduct.name}</h2>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-highlight fill-current" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Premium Quality</span>
                        </div>
                        {selectedProduct.discount && (
                          <span className="bg-highlight text-paper px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                            -{selectedProduct.discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedProduct(null)}
                      className="text-ink/40 hover:text-ink transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl font-black tracking-tighter text-ink">
                        ${selectedProduct.discount ? (selectedProduct.price * (1 - selectedProduct.discount / 100)).toFixed(2) : selectedProduct.price}
                      </span>
                      {selectedProduct.discount && (
                        <span className="text-2xl font-black tracking-tighter text-ink/30 line-through">
                          ${selectedProduct.price.toFixed(2)}
                        </span>
                      )}
                      <span className="text-[10px] uppercase tracking-widest font-black text-ink/20">/{selectedProduct.unit}</span>
                    </div>
                  </div>

                  <p className="text-sm text-ink/40 leading-relaxed">{selectedProduct.description}</p>

                  {selectedProduct.nutritionalInfo && (
                    <div className="border border-line p-6 space-y-4">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/30">Nutritional Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest font-black text-ink/40">
                        <div>Calories: {selectedProduct.nutritionalInfo.calories}</div>
                        <div>Fat: {selectedProduct.nutritionalInfo.fat}</div>
                        <div>Carbs: {selectedProduct.nutritionalInfo.carbs}</div>
                        <div>Protein: {selectedProduct.nutritionalInfo.protein}</div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/30">Quantity</label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                        className="w-12 h-12 border border-line flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="w-20 text-center text-2xl font-black tracking-tighter">{detailQuantity}</div>
                      <button 
                        onClick={() => setDetailQuantity(detailQuantity + 1)}
                        className="w-12 h-12 border border-line flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct, detailQuantity);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 btn-elite py-6 text-sm font-black"
                    >
                      Add to Cart
                    </button>
                    <button className="p-6 border border-line hover:bg-ink hover:text-paper transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/80 z-50"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-8 border-b border-line">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Cart</h2>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-ink/40 hover:text-ink transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                  {cart.length === 0 ? (
                    <div className="text-center py-16">
                      <ShoppingBasket className="w-16 h-16 text-ink/10 mx-auto mb-8" />
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h3>
                      <p className="text-ink/40 text-sm mb-8">Add some fresh produce to get started</p>
                      <button 
                        onClick={() => { setIsCartOpen(false); }}
                        className="btn-elite px-8 py-4 text-sm"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-6">
                          <div className="w-20 h-20 bg-paper overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-black uppercase tracking-tighter text-lg">{item.name}</h4>
                                <p className="text-[10px] uppercase tracking-widest font-black text-ink/30">{item.unit}</p>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-ink/20 hover:text-ink transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-8 h-8 border border-line flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center font-black">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-8 h-8 border border-line flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="font-black tracking-tighter text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-line p-8 space-y-6">
                    <div className="flex justify-between text-5xl font-black tracking-tighter">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => { setIsCartOpen(false); setView('checkout'); }}
                      className="w-full btn-elite py-6 text-sm font-black"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Navigation - Mobile Elite Pill */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[400px]">
        <nav className="bg-ink/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-2 flex justify-around items-center">
          <button
            onClick={() => setView('store')}
            className={`flex flex-col items-center gap-1 p-3 rounded-full transition-all duration-500 ${
              view === 'store' 
                ? 'bg-white text-ink shadow-elite' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            <ShoppingBasket className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Shop</span>
          </button>
          
          <button
            onClick={() => setView('about')}
            className={`flex flex-col items-center gap-1 p-3 rounded-full transition-all duration-500 ${
              view === 'about' 
                ? 'bg-white text-ink shadow-elite' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            <Tag className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">About</span>
          </button>
          
          <button
            onClick={() => setView('contact')}
            className={`flex flex-col items-center gap-1 p-3 rounded-full transition-all duration-500 ${
              view === 'contact' 
                ? 'bg-white text-ink shadow-elite' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Contact</span>
          </button>
          
          <button
            onClick={() => setView('account')}
            className={`flex flex-col items-center gap-1 p-3 rounded-full transition-all duration-500 ${
              view === 'account' 
                ? 'bg-white text-ink shadow-elite' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Account</span>
          </button>
        </nav>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
