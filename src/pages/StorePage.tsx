import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  User, 
  Menu,
  Star,
  ArrowRight,
  ChevronRight,
  Plus,
  Leaf,
  Truck,
  Clock,
  Award
} from 'lucide-react';

import { PRODUCTS, CATEGORIES } from '../constants';
import { Product, CartItem, Category } from '../types';
import F2ProteinSection from '../components/F2ProteinSection';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [promoSlide, setPromoSlide] = useState(0);
  const [mobileFeatureIndex, setMobileFeatureIndex] = useState(0);
  const [shouldAnimateBackground, setShouldAnimateBackground] = useState(false);

  const mobileFeatures = [
    { id: 1, icon: Leaf, title: 'Fresh', subtitle: 'We use handpicked, locally sourced ingredients for every mea' },
    { id: 2, icon: Award, title: 'Organic', subtitle: 'Experience nature’s harvest with our organic farm produce' },
    { id: 3, icon: Clock, title: 'Local', subtitle: 'Your trusted neighbourhood fresh food market' },
    { id: 4, icon: Truck, title: 'Delivery', subtitle: 'Order fresh food and get it delivered straight to your door.' }
  ];

  const HERO_SLIDES = [
    {
      label: "Authentic African",
      title: "Fresh Groceries.",
      description: "Experience authentic African food products, from dried foodstuffs to fresh ingredients.",
      image: "/tomato.jpeg",
      badgeText: "Fresh",
      badgeLabel: "Daily",
      bgGradient: "from-paper via-paper to-highlight/10"
    },
    {
      label: "Premium Quality",
      title: "Traditional Taste.",
      description: "Hand-picked African ingredients bringing heritage to your kitchen.",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80",
      badgeText: "Authentic",
      badgeLabel: "African",
      bgGradient: "from-paper via-paper to-ink/5"
    },
    {
      label: "Affordable Prices",
      title: "Community First.",
      description: "Quality African products at friendly prices for our community.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
      badgeText: "Value",
      badgeLabel: "Best",
      bgGradient: "from-paper via-paper to-highlight/5"
    }
  ];

  // Mobile features auto-scroll enabled
  React.useEffect(() => {
    const mobileTimer = setInterval(() => {
      setMobileFeatureIndex((prev) => (prev + 1) % mobileFeatures.length);
    }, 3000);
    return () => clearInterval(mobileTimer);
  }, [mobileFeatures.length]);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [selectedCategory, searchQuery]);

  const dealProducts = useMemo(() => PRODUCTS.filter(p => p.discount), []);

  // Promo auto-scroll completely removed

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
                <img 
                  src="/logo.jpeg" 
                  alt="F2 Protein & Groceries Logo" 
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain group-hover:scale-110 transition-transform rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm sm:text-lg sm:text-xl font-black tracking-tighter uppercase">
                  <span className="text-amber-800">F2 Protein</span>
                  <span className="text-orange-500">'n' Groceries</span>
                </span>
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
      <section className="relative min-h-screen overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.8 }
            }}
            className={`absolute inset-0 bg-gradient-to-br ${HERO_SLIDES[currentSlide].bgGradient}`}
          >
            {/* Full-screen Background Image */}
            <div className="absolute inset-0 z-0">
              <motion.img 
                key={`bg-${currentSlide}`}
                src={HERO_SLIDES[currentSlide].image}
                alt="Background" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              />
              <motion.div 
                key={`overlay-${currentSlide}`}
                className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              />
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden z-10">
              <motion.div
                key={`bg-element-1-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-20 left-10 w-96 h-96 bg-highlight/20 rounded-full blur-3xl"
              />
              <motion.div
                key={`bg-element-2-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-20 right-10 w-80 h-80 bg-ink/10 rounded-full blur-3xl"
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center py-16 sm:py-20 lg:py-32 mt-16 sm:mt-20 lg:mt-24 relative z-20">
              <div className="w-full max-w-4xl">
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-0 mb-12"
                  >
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "3rem" }}
                      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="h-px bg-highlight" 
                    />
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="label-f2proteinsandgroceries text-highlight"
                    >
                      {HERO_SLIDES[currentSlide].label}
                    </motion.span>
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] 2xl:text-[120px] font-black leading-[0.85] mb-16 tracking-tighter uppercase text-white"
                  >
                    {HERO_SLIDES[currentSlide].title.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        <motion.span
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className={i === 1 ? "text-highlight" : ""}
                        >
                          {word}
                        </motion.span>
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-12 items-start sm:items-center"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="btn-f2proteinsandgroceries group flex items-center gap-4 relative overflow-hidden !bg-white !text-ink hover:!bg-highlight hover:!text-white" 
                      onClick={() => {
                        const el = document.getElementById('shop-grid');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                      <span className="relative z-10">Explore Collection</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                      className="max-w-xs text-sm font-medium text-white/60 leading-relaxed"
                    >
                      {HERO_SLIDES[currentSlide].description}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group relative flex items-center justify-center w-12 h-12"
            >
              <div 
                className={`w-12 h-px transition-all duration-500 ${
                  currentSlide === index ? 'bg-highlight' : 'bg-ink/10 group-hover:bg-ink/30'
                }`} 
              />
              {currentSlide === index && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute top-1/2 left-0 w-full h-1 bg-highlight -translate-y-1/2"
                />
              )}
              <span className={`absolute -top-6 text-[10px] font-black tracking-widest transition-opacity duration-300 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}>
                0{index + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Arrow Controls */}
        <button
          onClick={() => {
            setIsAutoScroll(false);
            setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
            setShouldAnimateBackground(true);
            setTimeout(() => setShouldAnimateBackground(false), 1600);
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-highlight hover:text-white transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          onClick={() => {
            setIsAutoScroll(false);
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
            setShouldAnimateBackground(true);
            setTimeout(() => setShouldAnimateBackground(false), 1600);
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-highlight hover:text-white transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      

      {/* Elite Features Bar */}
      <div className="relative h-32 bg-white overflow-hidden border-t border-amber-800/30 shadow-lg">
        {/* Static Background Effects */}
        <div className="absolute inset-0">
          <motion.div 
            animate={shouldAnimateBackground ? {
              scale: 1.2,
              rotate: 180,
              x: 50
            } : {
              scale: 1,
              rotate: 0,
              x: 0
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-amber-800/10 to-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={shouldAnimateBackground ? {
              scale: 0.8,
              rotate: -180,
              y: -30
            } : {
              scale: 1,
              rotate: 0,
              y: 0
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut"
            }}
            className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-500/8 to-amber-800/8 rounded-full blur-2xl"
          />
        </div>
        
        {/* Desktop: Elite Professional Card Grid */}
        <div className="hidden sm:flex relative z-10 h-full items-center justify-center px-4 py-4">
          <div className="grid grid-cols-4 gap-6 max-w-6xl w-full px-4">
            {/* Fresh Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl border border-amber-800/20 p-4 h-full flex flex-row items-center text-center relative overflow-hidden">
                {/* Elite Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-tl from-amber-800/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Container with Premium Effects */}
                <div className="relative mr-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-800 to-orange-500 rounded-full blur-sm opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                  <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center border border-amber-800/20">
                    <Leaf className="w-6 h-6 text-amber-800" />
                  </div>
                </div>
                
                {/* Enhanced Text Content */}
                <div className="flex-1 relative z-10 text-left">
                  <h3 className="text-base font-black tracking-tight text-amber-800 uppercase leading-tight mb-1">
                    Fresh
                  </h3>
                  <p className="text-xs text-amber-600 leading-relaxed font-medium">
                    Daily Sourced
                  </p>
                </div>
                
                {/* Premium Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-800 via-orange-500 to-amber-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            </motion.div>

            {/* Organic Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl border border-orange-500/20 p-4 h-full flex flex-row items-center text-center relative overflow-hidden">
                {/* Elite Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/5 via-transparent to-amber-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Container with Premium Effects */}
                <div className="relative mr-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-800 rounded-full blur-sm opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                  <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center border border-orange-500/20">
                    <Award className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                
                {/* Enhanced Text Content */}
                <div className="flex-1 relative z-10 text-left">
                  <h3 className="text-base font-black tracking-tight text-amber-800 uppercase leading-tight mb-1">
                    Organic
                  </h3>
                  <p className="text-xs text-amber-600 leading-relaxed font-medium">
                    Certified Quality
                  </p>
                </div>
                
                {/* Premium Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-800 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            </motion.div>

            {/* Local Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl border border-amber-800/20 p-4 h-full flex flex-row items-center text-center relative overflow-hidden">
                {/* Elite Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-tl from-amber-800/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Container with Premium Effects */}
                <div className="relative mr-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-800 to-orange-500 rounded-full blur-sm opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                  <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center border border-amber-800/20">
                    <Clock className="w-6 h-6 text-amber-800" />
                  </div>
                </div>
                
                {/* Enhanced Text Content */}
                <div className="flex-1 relative z-10 text-left">
                  <h3 className="text-base font-black tracking-tight text-amber-800 uppercase leading-tight mb-1">
                    Local
                  </h3>
                  <p className="text-xs text-amber-600 leading-relaxed font-medium">
                    Community First
                  </p>
                </div>
                
                {/* Premium Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-800 via-orange-500 to-amber-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            </motion.div>

            {/* Delivery Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl border border-orange-500/20 p-4 h-full flex flex-row items-center text-center relative overflow-hidden">
                {/* Elite Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/5 via-transparent to-amber-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Container with Premium Effects */}
                <div className="relative mr-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-800 rounded-full blur-sm opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                  <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center border border-orange-500/20">
                    <Truck className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                
                {/* Enhanced Text Content */}
                <div className="flex-1 relative z-10 text-left">
                  <h3 className="text-base font-black tracking-tight text-amber-800 uppercase leading-tight mb-1">
                    Delivery
                  </h3>
                  <p className="text-xs text-amber-600 leading-relaxed font-medium">
                    Fast & Free
                  </p>
                </div>
                
                {/* Premium Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-800 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile: Side-by-Side Scrolling Carousel */}
        <div className="sm:hidden relative z-10 h-full overflow-hidden">
          <motion.div 
            className="flex h-full items-center"
            animate={{ x: `-${mobileFeatureIndex * 100}%` }}
            transition={{ 
              type: "tween", 
              duration: 0.5, 
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            {mobileFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="min-w-full flex items-center justify-center px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: index === mobileFeatureIndex ? 0 : 0.1,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                <div className="relative">
                  {/* Card Container */}
                  <div className="flex items-center gap-4 bg-white rounded-2xl shadow-xl border border-amber-800/10 p-4 max-w-[340px] w-full">
                    {/* Icon Container with Matching Background */}
                    <div className="relative">
                      <div className="relative w-20 h-20 bg-amber-800 rounded-full flex items-center justify-center">
                        <feature.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-extrabold tracking-tight text-amber-800 uppercase leading-tight mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-amber-600 leading-relaxed">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle Accent Line */}
                  <div className="absolute -bottom-1 left-5 right-5 h-0.5 bg-gradient-to-r from-amber-800/20 via-amber-800/40 to-amber-800/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Mobile Dots */}
        <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3">
          {mobileFeatures.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setMobileFeatureIndex(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                mobileFeatureIndex === index 
                  ? 'bg-gradient-to-r from-amber-800 to-orange-500 w-8' 
                  : 'bg-amber-800/20'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>

      {/* Featured Deals - Promo Section */}
      <section className="py-24 sm:py-32 lg:py-48 bg-gradient-to-br from-highlight/5 via-white to-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Promo Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 sm:mb-24"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="w-4 h-4 bg-highlight rounded-full"
              />
              <div className="label-f2proteinsandgroceries text-highlight">🔥 Special Promo</div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="w-4 h-4 bg-highlight rounded-full"
              />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
              Limited <span className="text-highlight">Offers.</span>
            </h2>
            <p className="text-lg sm:text-xl text-ink/60 font-serif italic max-w-2xl mx-auto">
              Special discounts on selected African groceries. Don't miss out on these amazing deals!
            </p>
          </motion.div>
          
          {/* Promo Products Grid - Enhanced Desktop, Preserved Mobile */}
          <div className="relative">
            {/* Desktop: Elite 4-Product Showcase */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-4 gap-8">
                {dealProducts.slice(0, 4).map((product, index) => (
                  <motion.div 
                    key={`${product.id}-desktop`}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      type: "spring", 
                      stiffness: 200,
                      delay: index * 0.15
                    }}
                    whileHover={{ 
                      y: -15, 
                      scale: 1.03,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group cursor-pointer relative"
                    onClick={() => openProductDetails(product)}
                  >
                    {/* Elite Promo Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className="absolute top-3 right-3 z-30 bg-gradient-to-r from-highlight to-orange-500 text-white px-3 py-1.5 text-[10px] font-black uppercase rounded-full shadow-2xl border-2 border-white/50"
                    >
                      -{product.discount}%
                    </motion.div>

                    {/* Premium Hover Glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.4 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-gradient-to-tr from-amber-500/40 via-highlight/30 to-orange-500/40 rounded-2xl -inset-2"
                    />
                    
                    {/* Enhanced Image Container */}
                    <div className="relative aspect-square overflow-hidden mb-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-amber-800/10">
                      <motion.img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Premium Image Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-amber-800/30 to-transparent"
                      />
                    </div>
                    
                    {/* Enhanced Content */}
                    <div className="space-y-3 relative z-10">
                      <motion.h3 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.4 }}
                        className="text-base font-black uppercase tracking-tight group-hover:text-highlight transition-colors duration-400 line-clamp-2 leading-tight"
                      >
                        {product.name}
                      </motion.h3>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.15 + 0.5, type: "spring", stiffness: 200 }}
                            className="text-highlight font-black text-lg group-hover:scale-105 transition-transform duration-400 block"
                          >
                            ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                          </motion.span>
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.15 + 0.6 }}
                            className="text-ink/40 line-through text-sm block"
                          >
                            ${product.price.toFixed(2)}
                          </motion.span>
                        </div>
                        
                        <motion.button 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.15 + 0.7 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="relative overflow-hidden bg-gradient-to-r from-amber-800 to-orange-500 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <motion.div
                            animate={{ x: [0, 100] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          />
                          <span className="relative z-10">🔥 Deal</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet: Enhanced Swipeable All Products */}
            <div className="lg:hidden">
              <div className="overflow-x-auto pb-6 px-4 sm:px-6 lg:px-8">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 min-w-max">
                  {dealProducts.map((product, index) => (
                    <motion.div 
                      key={`${product.id}-mobile-scroll`}
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        type: "spring", 
                        stiffness: 300,
                        delay: index * 0.1
                      }}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 400, damping: 17 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group cursor-pointer relative flex-shrink-0 w-64 sm:w-72"
                      onClick={() => openProductDetails(product)}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                    >
                      {/* Promo Badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="absolute top-2 right-2 z-30 bg-highlight text-paper px-2 py-1 text-[8px] font-black uppercase rounded-full shadow-lg"
                      >
                        -{product.discount}%
                      </motion.div>

                      {/* Hover Glow Effect */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.3 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-tr from-highlight/30 via-transparent to-ink/10 rounded-xl -inset-1"
                      />
                      
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden mb-4 bg-line/10 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
                        <motion.img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                          referrerPolicy="no-referrer"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Image Overlay on Hover */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                        />
                      </div>
                      
                      <div className="space-y-2 relative z-10">
                        <div className="flex justify-between items-start">
                          <motion.h3 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="text-sm sm:text-base font-black uppercase tracking-tighter group-hover:text-highlight transition-colors duration-300 line-clamp-2"
                          >
                            {product.name}
                          </motion.h3>
                          <div className="text-right flex-shrink-0 ml-2">
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 200 }}
                              className="text-highlight font-black text-sm sm:text-base group-hover:scale-110 transition-transform duration-300 block"
                            >
                              ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                            </motion.span>
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.5 }}
                              className="text-ink/30 line-through text-xs block"
                            >
                              ${product.price.toFixed(2)}
                            </motion.span>
                          </div>
                        </div>
                        
                        <motion.button 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.6 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-full relative overflow-hidden bg-gradient-to-r from-amber-800 to-highlight text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <motion.div
                            animate={{ x: [0, 100] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          />
                          <span className="relative z-10">🔥 Deal</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Swipe Indicator */}
                <div className="flex justify-center mt-4">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-ink/30 text-xs font-medium uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Swipe to see more</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-16"
          >
            <button 
              onClick={() => {
                const el = document.getElementById('shop-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-black text-ink hover:text-highlight transition-all mx-auto"
            >
              View All Deals
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="w-24 h-px bg-line group-hover:w-32 group-hover:bg-highlight transition-all"
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Shopping Area */}
      <main id="shop-grid" className="py-16 sm:py-24 lg:py-48 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Header */}
          <div className="mb-12 sm:mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="label-f2proteinsandgroceries mb-6 sm:mb-8 text-highlight inline-block">The Collection</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                Curated <span className="text-highlight">Products.</span>
              </h2>
              <p className="text-sm sm:text-base text-ink/60 font-serif italic max-w-2xl mx-auto px-4">
                Discover our authentic African grocery selection, from fresh produce to essential spices.
              </p>
            </motion.div>

            {/* Category Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6"
            >
              {CATEGORIES.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category as Category)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-all rounded-full border-2 ${
                    selectedCategory === category
                      ? 'bg-highlight text-paper border-highlight shadow-lg'
                      : 'bg-transparent text-ink/60 border-line hover:bg-ink hover:text-paper'
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="cat-underline"
                      className="absolute inset-0 rounded-full bg-highlight"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Product Grid - Mobile Smaller Images, Desktop Preserved */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    delay: index * 0.05
                  }}
                  key={product.id}
                  className="group cursor-pointer relative"
                  onClick={() => openProductDetails(product)}
                >
                  {/* Hover Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-tr from-highlight/20 via-transparent to-ink/10 rounded-xl sm:rounded-2xl -inset-1 sm:-inset-2"
                  />
                  
                  {/* Product Image Container - Smaller on Mobile */}
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden mb-3 sm:mb-6 bg-line/10 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg group-hover:shadow-xl sm:group-hover:shadow-2xl transition-all duration-500">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-500 sm:duration-700 group-hover:scale-105 sm:group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      whileHover={{ scale: 1.05 }}
                    />
                    
                    {/* Quick Add Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="absolute bottom-4 right-4 bg-highlight text-paper p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                    
                    {/* Image Overlay on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-ink/20 sm:from-ink/30 via-transparent to-transparent"
                    />
                  </div>
                  
                  {/* Product Info - Smaller on Mobile */}
                  <div className="space-y-2 sm:space-y-4 relative z-10">
                    <div>
                      <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm sm:text-xl font-black uppercase tracking-tighter group-hover:text-highlight transition-colors duration-300 line-clamp-2 leading-tight"
                      >
                        {product.name}
                      </motion.h3>
                      
                      {/* Animated Stars - Smaller on Mobile */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-1 my-1 sm:my-2"
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 200 }}
                            className="w-2 h-2 sm:w-4 sm:h-4"
                          >
                            {i < 4 ? (
                              <div className="w-full h-full bg-highlight rounded-full" />
                            ) : (
                              <div className="w-full h-full bg-line/30 rounded-full" />
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-base sm:text-2xl font-black text-highlight"
                        >
                          ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                        </motion.span>
                        {product.discount && (
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs sm:text-sm text-ink/30 line-through ml-2"
                          >
                            ${product.price.toFixed(2)}
                          </motion.span>
                        )}
                      </div>
                      
                      <motion.button 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.05, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="bg-ink text-paper px-4 py-2 sm:px-6 sm:py-3 text-xs font-black uppercase tracking-wider rounded-lg hover:bg-highlight transition-all duration-300"
                      >
                        Add+
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl sm:text-8xl mb-4">🔍</div>
              <h3 className="text-2xl sm:text-3xl font-black text-ink mb-4">No products found</h3>
              <p className="text-ink/60 font-serif">Try adjusting your filters or search terms</p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-paper py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <span className="text-3xl font-serif italic font-bold tracking-tight text-ink">F2 Protein & Groceries</span>
              </div>
              <p className="text-ink/40 font-serif italic text-lg leading-relaxed mb-8">
                Authentic African food products delivered fresh to your community.
              </p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/f2proteinsandgroceries" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">IG</a>
                <a href="https://www.tiktok.com/@f2proteinngroceries_uk" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">TT</a>
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
            <p>© 2026 F2 Protein & Groceries. All rights reserved.</p>
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
