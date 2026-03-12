import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  User, 
  Menu,
  Star,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product, CartItem, Category } from '../types';

interface StorePageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  cart: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  openProductDetails: (product: Product) => void;
  setView: (view: string) => void;
}

export default function StorePage({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  cart,
  cartCount,
  isCartOpen,
  setIsCartOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  addToCart,
  openProductDetails,
  setView
}: StorePageProps) {
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [selectedCategory, searchQuery]);

  const dealProducts = useMemo(() => PRODUCTS.filter(p => p.discount).slice(0, 3), []);

  return (
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
  );
}
