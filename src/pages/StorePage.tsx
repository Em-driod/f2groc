import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
  Award,
  X,
  Eye
} from 'lucide-react';

import { PRODUCTS, CATEGORIES } from '../constants';
import { Product, CartItem, Category } from '../types';
import F2ProteinSection from '../components/F2ProteinSection';
import CategorySidebar from '../components/CategorySidebar';

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
  const [isCatSidebarOpen, setIsCatSidebarOpen] = useState(false);

  // ── Sidebar state ──
  const [sidebarCategory, setSidebarCategory] = useState<Category>('All');
  const [sidebarSearch, setSidebarSearch] = useState('');

  // Marquee center-spotlight refs
  const catMarqueeContainerRef = React.useRef<HTMLDivElement>(null);
  const catItemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  React.useEffect(() => {
    let rafId: number;
    const update = () => {
      const container = catMarqueeContainerRef.current;
      if (container) {
        const parentRect = container.getBoundingClientRect();
        const centerX = parentRect.left + parentRect.width / 2;
        const radius = parentRect.width * 0.22;
        catItemRefs.current.forEach(item => {
          if (!item) return;
          const r = item.getBoundingClientRect();
          const dist = Math.abs((r.left + r.width / 2) - centerX);
          const t = Math.max(0, 1 - dist / radius);
          item.style.transform = `scale(${0.8 + t * 0.7})`;
          item.style.opacity = `${0.35 + t * 0.65}`;
        });
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const mobileFeatures = [
    { id: 1, icon: Leaf, title: 'Fresh', subtitle: 'We use handpicked, locally sourced ingredients for every mea' },
    { id: 2, icon: Award, title: 'Organic', subtitle: 'Experience nature harvest with our organic farm produce' },
    { id: 3, icon: Clock, title: 'Local', subtitle: 'Your trusted neighbourhood fresh food market' },
    { id: 4, icon: Truck, title: 'Delivery', subtitle: 'Order fresh food and get it delivered straight to your door.' }
  ];

  const CATEGORY_IMAGES: Record<string, string> = {
    'All': '/logo.jpeg',
    'Meat, Fish & Poultry': '/smokedfish.jpeg.jpeg',
    'Vegetable & Fresh Produce': '/plantain.jpeg',
    'Drinks and Beverages': '/efo-riro.jpeg',
    'Grains and Flours': '/garri.jpeg',
    'Cooking Condiments': '/freshscotchpepper.jpeg',
    'Snacks and Confectionaries': '/tomato.jpeg',
    'Groceries': '/bitterleaf.jpeg',
    'Ready meals': '/efo-riro.jpeg'
  };

  const HERO_SLIDES = [
    {
      label: "Authentic Heritage",
      title: "The Heart of the Feast.",
      description: "",
      image: "/meat.png",
      badge: "Grass-Fed Certified",
      micro: "Fresh Harvest Daily",
      mobilePosition: "center 40%"
    },
    {
      label: "Market Curation",
      title: "The Market Basket.",
      description: "",
      image: "/provision.png",
      badge: "Hand-Picked Selection",
      micro: "Heritage Provisions"
    },
    {
      label: "Savor & Crunch",
      title: "The Snack Gallery.",
      description: "",
      image: "/snacks.png",
      badge: "Elite Crunch",
      micro: "Artisanal Delights"
    }
  ];

  // Mobile features auto-scroll enabled
  React.useEffect(() => {
    const mobileTimer = setInterval(() => {
      setMobileFeatureIndex((prev) => (prev + 1) % mobileFeatures.length);
    }, 3000);
    return () => clearInterval(mobileTimer);
  }, [mobileFeatures.length]);

  // Auto-scroll for mobile hero slides
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [selectedCategory, searchQuery]);

  // ── Sidebar filtered products ──
  const sidebarProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesCategory = sidebarCategory === 'All' || product.category === sidebarCategory;
      const matchesSearch = product.name.toLowerCase().includes(sidebarSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [sidebarCategory, sidebarSearch]);

  const dealProducts = useMemo(() => PRODUCTS.filter(p => p.discount), []);

  return (
    <>
      <CategorySidebar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setView={setView}
      />
      <div className="noise" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/40 backdrop-blur-3xl border-b border-white/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            <div className="flex items-center gap-8 lg:gap-14">
              <motion.div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setView('store')}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12 overflow-hidden rounded-full border-2 border-line/10 group-hover:border-accent transition-colors duration-700 shadow-sm">
                    <img
                      src="/logo.jpeg"
                      alt="F2 Logo"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <span className="text-sm sm:text-lg lg:text-xl font-black tracking-tighter uppercase whitespace-nowrap">
                    <span className="text-amber-900">F2 Protein</span>
                    <span className="text-orange-600 ml-2 group-hover:text-accent transition-colors">'n' Groceries</span>
                  </span>
                </div>
              </motion.div>

              <div className="hidden md:flex items-center gap-10">
                {['Shop', 'About', 'Journal'].map((item) => (
                  <button key={item} className="text-[11px] uppercase tracking-[0.3em] font-black text-ink/60 hover:text-ink transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
              <div className="hidden lg:flex items-center bg-line/80 px-8 py-3 border-2 border-line group focus-within:border-ink transition-all rounded-full">
                <Search className="w-4 h-4 text-ink/60 group-focus-within:text-ink stroke-[3px]" />
                <input
                  type="text"
                  placeholder="SEARCH SELECTION..."
                  className="bg-transparent border-none focus:ring-0 text-[10px] font-black tracking-widest w-48 placeholder:text-ink/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => setView('account')}
                  className="hidden md:block text-ink/40 hover:text-ink transition-colors electric-tap"
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  className="relative group electric-tap py-2 px-4 bg-ink text-paper rounded-full md:bg-transparent md:text-ink md:p-0"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[8px] font-black flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Electric Liquid Trigger (Mobile) */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-ink text-white rounded-full relative overflow-hidden group/trigger"
                >
                  <motion.div
                    animate={{ width: [12, 20, 12] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="h-0.5 bg-white"
                  />
                  <div className="w-5 h-0.5 bg-white" />
                  <motion.div
                    animate={{ width: [20, 12, 20] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="h-0.5 bg-white"
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover/trigger:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Bento Box Grid */}
      <section className="relative pt-24 lg:pt-40 pb-16 lg:pb-24 bg-[#F5F2ED] overflow-hidden">

        <div className="lg:hidden relative h-[65vh] min-h-[500px] w-full overflow-hidden shadow-2xl z-10">
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="w-full h-full bg-[#111] p-8 pt-12 relative overflow-hidden flex flex-col justify-between">
                <img 
                  src={HERO_SLIDES[currentSlide].image} 
                  alt={HERO_SLIDES[currentSlide].title} 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-1000 scale-110" 
                  style={{ objectPosition: HERO_SLIDES[currentSlide].mobilePosition || 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                <div className="relative z-10 w-full mt-8">
                  <p className="text-white/90 font-bold text-[10px] uppercase tracking-widest mb-3 drop-shadow-lg shadow-black">
                    {HERO_SLIDES[currentSlide].label}
                  </p>
                  <h2 className="text-white text-4xl sm:text-5xl font-black leading-[0.9] mb-4 tracking-tight drop-shadow-xl shadow-black">
                    {HERO_SLIDES[currentSlide].title.split('.').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}{i !== arr.length - 1 && '.'}<br />
                      </React.Fragment>
                    ))}
                  </h2>
                  
                  {HERO_SLIDES[currentSlide].badge && (
                    <div className="bg-[#FFEB3B]/20 backdrop-blur-md px-6 py-3 rounded-xl w-fit border border-[#FFEB3B]/30 shadow-2xl mt-4">
                      <p className="text-[#FFEB3B] font-black text-sm uppercase tracking-widest">
                        {HERO_SLIDES[currentSlide].badge}
                      </p>
                    </div>
                  )}

                  <div className="mt-8">
                    <button 
                      onClick={() => document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-ink px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                    >
                      Shop Collection
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Hero Navigation Arrows */}
          <div className="absolute inset-y-0 left-2 right-2 z-40 flex items-center justify-between pointer-events-none">
            <motion.button
              whileTap={{ scale: 0.9, background: "var(--color-gold-glimmer)" }}
              onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white bg-ink/30 backdrop-blur-xl pointer-events-auto shadow-md"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9, background: "var(--color-gold-glimmer)" }}
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white bg-ink/30 backdrop-blur-xl pointer-events-auto shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* --- Desktop Container --- */}
        <div className="max-w-[1400px] mx-auto px-6">

          {/* --- Desktop: Bento Grid (Static 3-Column) --- */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-6 lg:h-[600px] mt-4">
            {/* Card 1: Main (Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 lg:row-span-2 bg-[#111] rounded-[2rem] p-8 lg:p-14 relative overflow-hidden flex flex-col justify-between shadow-2xl group"
            >
              <img src="/meat.png" alt="Meat Background" className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-1000 scale-110 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-lg mt-auto mb-10">
                <p className="text-white/90 font-bold text-sm mb-4 tracking-wide shadow-black drop-shadow-md">Fresh Deals, Every Day</p>
                <h1 className="text-[#FFEB3B] text-5xl lg:text-[5.5rem] font-black leading-[0.9] mb-6 tracking-tight drop-shadow-xl shadow-black">
                  Fresh Meat<br />Premium Quality
                </h1>
                <p className="text-white text-xl mb-10 font-medium shadow-black drop-shadow-lg">Best Meat Deals Today</p>
                <button className="bg-white text-[#6b2118] px-10 py-4 rounded-full font-bold text-lg w-fit hover:scale-105 active:scale-95 transition-all shadow-xl">
                  Order Today
                </button>
              </div>
            </motion.div>

            {/* Card 2: Top Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-1 lg:row-span-1 bg-[#111] rounded-[2rem] p-8 relative overflow-hidden flex flex-col items-center justify-center text-center h-[350px] lg:h-auto shadow-xl group"
            >
              <img src="/snacks.png" alt="Snacks Background" className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-1000 scale-110 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none" />

              <div className="relative z-10 w-full">
                <p className="text-white font-bold text-[10px] uppercase tracking-widest mb-3 drop-shadow-lg shadow-black">Hot Deals This Week</p>
                <h2 className="text-white text-3xl xl:text-5xl font-black leading-tight mb-6 drop-shadow-xl shadow-black">Best Value,<br />Every Basket</h2>
                <button className="bg-white text-[#6b2118] px-8 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl">
                  Shop Sale
                </button>
              </div>
            </motion.div>

            {/* Card 3: Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-1 lg:row-span-1 bg-[#111] rounded-[2rem] p-8 relative overflow-hidden flex flex-col items-start justify-center text-left h-[350px] lg:h-auto shadow-xl group"
            >
              <img src="/provision.png" alt="Provisions Background" className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-1000 scale-110 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none" />

              <div className="relative z-10 w-full">
                <p className="text-white/90 font-bold text-[10px] uppercase tracking-widest mb-4 drop-shadow-lg shadow-black">Rice & Flour Essentials</p>
                <h2 className="text-white text-3xl xl:text-5xl font-black leading-tight mb-8 drop-shadow-xl shadow-black">Quality Staples<br />Better Value</h2>
                <div className="bg-[#FFEB3B]/20 backdrop-blur-md px-6 py-3 rounded-xl w-fit border border-[#FFEB3B]/30 shadow-2xl">
                  <p className="text-[#FFEB3B] font-black text-xl">Starting at £10</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Category Row — True Infinite Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="-mt-20 lg:-mt-28 mb-4 w-full relative flex items-center overflow-hidden py-8 z-20"
            style={{ height: '200px' }}
            ref={catMarqueeContainerRef}
          >
            {/* Gradient fade edges */}
            <div className="absolute inset-y-0 left-0 w-24 lg:w-48   z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 lg:w-48  z-10 pointer-events-none" />

            {/* Marquee track — duplicated for seamless loop */}
            <motion.div
              className="flex items-center gap-0 shrink-0"
              animate={{ x: ['15%', '-50%'] }}
              transition={{
                duration: 65,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              }}
              style={{ width: 'max-content' }}
            >
              {[...CATEGORIES.filter(c => c !== 'All'), ...CATEGORIES.filter(c => c !== 'All')].map((category, idx) => (
                <div
                  key={`cat-${idx}`}
                  ref={el => { catItemRefs.current[idx] = el; }}
                  className="w-[140px] lg:w-[160px] flex flex-col items-center justify-center cursor-pointer shrink-0"
                  style={{ willChange: 'transform, opacity', transition: 'none' }}
                  onClick={() => {
                    setSelectedCategory(category as Category);
                    document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full p-1 border-2 border-transparent hover:border-[#6b2118] bg-white shadow-md hover:shadow-xl transition-all duration-300">
                    <img
                      src={CATEGORY_IMAGES[category] || '/logo.jpeg'}
                      alt={category}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="mt-3 text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] text-ink/60">
                    {category}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ✦ ELEVATED: Hot Deals — Luxury Editorial Dark Showcase ✦ */}
      <section className="bg-[#0a0a0a] relative overflow-hidden">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, backgroundSize: '200px' }} />

        {/* Glowing accent blob */}
        <motion.div
          animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
        />

        <div className="max-w-[1400px] mx-auto px-6">
          {/* Header row */}
          <div className="flex items-end justify-between pt-16 lg:pt-24 pb-12 lg:pb-16 border-b border-white/[0.06]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-accent text-[9px] lg:text-[11px] font-black uppercase tracking-[0.8em] mb-4">Hot Deals · Latest Arrivals</p>
              <h2 className="text-white text-4xl sm:text-5xl lg:text-[5.5rem] font-black tracking-[-0.04em] leading-none uppercase">
                Fresh<br className="lg:hidden" /> <span className="text-transparent lg:text-accent" style={{ WebkitTextStroke: '2px var(--color-accent)' }}>picks.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:block text-right"
            >
              <p className="text-white/20 text-sm font-serif italic leading-relaxed max-w-[220px] text-right mb-5">
                Purely harvested treasures, curated for absolute freshness.
              </p>
              <motion.button
                whileHover={{ x: 6 }}
                onClick={() => document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-all duration-500 text-[11px] font-black uppercase tracking-[0.4em] ml-auto"
              >
                View All <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06] pb-16 lg:pb-24">
            {dealProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openProductDetails(product)}
                className="group cursor-pointer py-10 lg:py-14 px-0 lg:px-10 first:lg:pl-0 last:lg:pr-0 relative flex flex-col gap-8"
              >
                {/* Hover shimmer line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-accent transition-all duration-700 ease-out" />

                {/* Index number */}
                <div className="flex items-center justify-between">
                  <span className="text-white/10 text-[80px] lg:text-[100px] font-black leading-none select-none -mt-4"
                    style={{ fontVariantNumeric: 'tabular-nums' }}>
                    0{index + 1}
                  </span>
                  <div className="bg-accent/10 border border-accent/30 text-accent text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full self-start mt-2">
                    -{product.discount}%
                  </div>
                </div>

                {/* Product image — compact & beautiful */}
                <div className="relative w-full aspect-square max-h-[280px] lg:max-h-[240px] overflow-hidden rounded-2xl bg-white/5 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Subtle gradient at image bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content block */}
                <div className="flex flex-col gap-4 flex-1">
                  <div>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.6em] mb-2">Heritage Select</p>
                    <h3 className="text-white text-2xl lg:text-3xl font-black uppercase leading-tight tracking-tight group-hover:text-accent transition-colors duration-500">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.08]">
                    <div className="flex flex-col">
                      <span className="text-white/25 line-through text-sm font-bold">${product.price.toFixed(2)}</span>
                      <span className="text-accent text-2xl lg:text-3xl font-black leading-none">${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -10 }}
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden pb-10 text-center border-t border-white/[0.06] pt-8">
            <button
              onClick={() => document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 text-white/50 hover:text-accent transition-all duration-500 text-[11px] font-black uppercase tracking-[0.4em] mx-auto"
            >
              View All Arrivals <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 10/10 Mastercraft: Shop Gallery */}
      <main id="shop-grid" className="py-24 lg:py-40 bg-paper relative overflow-hidden min-h-screen">
        {/* Spectral Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, backgroundSize: '150px' }} />

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">

          {/* Header & Filter System */}
          <div className="flex flex-col mb-16 lg:mb-24">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-ink/10 pb-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-[1px] bg-accent" />
                  <span className="text-[11px] uppercase tracking-[0.6em] font-black text-ink/40">Curated Harvest</span>
                </div>
                <h2 className="text-[13vw] lg:text-[7rem] leading-[0.85] font-serif italic text-ink">
                  The <span className="font-sans not-italic font-black text-transparent bg-clip-text bg-gradient-to-r from-ink via-ink/80 to-ink tracking-tight uppercase">Collection</span>
                </h2>
              </motion.div>

              {/* Desktop Filter Tabs - Minimalist Text */}
              <div className="hidden lg:flex flex-wrap justify-end gap-x-12 gap-y-4 max-w-4xl">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category as Category);
                      setView('category');
                    }}
                    className="relative group py-2"
                  >
                    <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${selectedCategory === category ? 'text-ink' : 'text-ink/30 group-hover:text-accent'
                      }`}>
                      {category}
                    </span>
                    {selectedCategory === category && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter Scroll - Premium Glass Pills */}
            <div className="lg:hidden w-screen -mx-6 px-6 overflow-x-auto no-scrollbar pb-8">
              <div className="flex gap-3 w-max">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category as Category);
                      setView('category');
                    }}
                    className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md border ${selectedCategory === category
                      ? 'bg-ink text-white border-ink shadow-lg shadow-ink/20'
                      : 'bg-white/40 text-ink/60 border-white/40 hover:bg-white hover:border-ink/10'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mastercraft Grid - Exponentially Beautiful */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 lg:gap-y-24"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  addToCart={addToCart}
                  openProductDetails={openProductDetails}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State: Cinematic */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-40 text-center flex flex-col items-center justify-center border-y border-ink/5"
            >
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 border border-ink/10 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 border border-ink/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search className="w-8 h-8 text-ink/20" />
                </div>
              </div>
              <h3 className="text-3xl font-serif italic text-ink/40 mb-4">The harvest is silent.</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30">
                Adjust your filters to reveal the bounty.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Elite Masterpiece Footer: 10/10 Grandeur */}
      <footer className="py-16 lg:py-64 bg-ink text-white overflow-hidden relative">
        {/* Cinematic Light Pools */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/2"
        />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-screen"
          style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, backgroundSize: '200px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col space-y-16 lg:space-y-32">
            {/* Massive Branding Header */}
            <div className="border-b border-white/5 pb-12 lg:pb-40">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] lg:text-[15vw] leading-[0.75] font-black tracking-[-0.06em] text-white uppercase select-none"
              >
                F2 <span className="text-accent underline decoration-[2px] underline-offset-[2vw] decoration-accent/20">Protein.</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
              <div className="lg:col-span-5 space-y-16">
                <p className="max-w-md text-white/40 font-serif italic text-2xl lg:text-3xl leading-relaxed">
                  "Transmitting the vibrant essence of African culinary heritage to the global table."
                </p>

                <div className="pt-8">
                  <div className="flex flex-col gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent">Heritage Presence</p>
                    <div className="flex gap-16 items-center">
                      {['Instagram', 'TikTok', 'X-Twitter'].map(social => (
                        <motion.a
                          key={social}
                          href="#"
                          whileHover={{ y: -4, color: "var(--color-accent)" }}
                          className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 transition-all border-b border-transparent hover:border-accent"
                        >
                          {social}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-24">
                <div>
                  <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent mb-16 flex items-center gap-4">
                    <div className="w-8 h-px bg-accent/30" />
                    Collection
                  </h4>
                  <ul className="space-y-10">
                    {['Shop All', 'New Arrivals', 'Best Sellers', 'Limited'].map(item => (
                      <li key={item}>
                        <a href="#" className="text-base text-white/60 hover:text-white transition-all duration-700 tracking-[0.2em] font-bold">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent mb-16 flex items-center gap-4">
                    <div className="w-8 h-px bg-accent/30" />
                    Support
                  </h4>
                  <ul className="space-y-10">
                    {['Contact', 'Delivery', 'Privacy', 'Gift Cards'].map(item => (
                      <li key={item}>
                        <a href="#" className="text-base text-white/60 hover:text-white transition-all duration-700 tracking-[0.2em] font-bold">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent mb-16 flex items-center gap-4">
                    <div className="w-8 h-px bg-accent/30" />
                    Mailing List
                  </h4>
                  <p className="text-sm text-white/30 mb-10 font-serif italic opacity-60">Join our inner circle for exclusive harvest updates.</p>
                  <div className="flex border-b-[3px] border-white/20 pb-8 group focus-within:border-accent transition-colors duration-1000">
                    <input
                      type="text"
                      placeholder="SIGNATURE EMAIL"
                      className="bg-transparent border-none focus:ring-0 text-[11px] w-full placeholder:text-white/20 font-black tracking-[0.3em]"
                    />
                    <ChevronRight className="w-6 h-6 text-accent group-hover:translate-x-3 transition-transform duration-700 stroke-[3px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-64 pt-10 lg:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-12">
            <p className="text-[10px] font-black text-white/5 uppercase tracking-[0.5em]">© 2026 F2 Protein Group. Masterpiece Design v10.</p>
            <div className="flex gap-20 text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">
              <motion.a href="#" whileHover={{ color: "white", scale: 1.1 }} className="transition-all">Legal</motion.a>
              <motion.a href="#" whileHover={{ color: "white", scale: 1.1 }} className="transition-all">Privacy</motion.a>
              <motion.a href="#" whileHover={{ color: "white", scale: 1.1 }} className="transition-all">Terms</motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Absolute 10/10 Celestial Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 35, stiffness: 250 }}
            className="fixed inset-0 z-[100000] bg-[#2D0A0A] lg:hidden"
          >
            {/* Background Mastery: Vintage Wine Liquid Prism */}
            <div className="absolute inset-0 bg-[#2D0A0A] overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-[0.6] blur-[140px]"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #5E1B1B 0%, transparent 40%), radial-gradient(circle at 70% 60%, #4A0E0E 0%, transparent 40%)'
                }}
              />
            </div>
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-soft-light"
              style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, backgroundSize: '150px' }} />

            <div className="relative h-full flex flex-col p-8 sm:p-12 z-10">
              <div className="flex justify-between items-center mb-16 px-4">
                <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white/40">Selection Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-14 h-14 flex items-center justify-center bg-white text-ink rounded-full group shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                >
                  <Plus className="w-6 h-6 rotate-45 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="flex flex-col space-y-8 flex-grow justify-center">
                {['Store', 'Collections', 'Story', 'Journal'].map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-left relative py-4"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (item === 'Store') setView('store');
                    }}
                  >
                    <div className="flex items-baseline gap-6 group relative z-10">
                      <span className="text-[10px] font-black text-white/20 italic tracking-[0.3em]">0{i + 1}</span>
                      <span className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-[#F5F1E6] group-hover:text-accent group-hover:translate-x-4 transition-all duration-700">
                        {item}
                      </span>
                    </div>

                    {/* Ruby Link Hover Glow */}
                    <div className="absolute inset-y-0 -left-8 right-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0" />
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto border-t border-white/5 pt-12 space-y-12">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Contact Heritage</p>
                    <p className="text-sm font-bold text-[#F5F1E6]">hello@f2protein.com</p>
                  </div>
                  <div className="flex gap-6">
                    {['IG', 'TW', 'TK'].map(s => (
                      <span key={s} className="text-[10px] font-black tracking-widest text-[#F5F1E6]/40 hover:text-accent cursor-pointer transition-colors">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const ProfessionalFeatureItem: React.FC<{
  feature: any;
  index: number;
}> = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group p-10 lg:p-14 hover:bg-surface transition-colors duration-700 relative overflow-hidden"
    >
      <div className="flex items-center gap-8 relative z-10">
        <div className="flex items-center justify-center transition-all duration-700">
          <feature.icon className="w-8 h-8 lg:w-10 lg:h-10 text-ink group-hover:text-accent transition-colors duration-700 stroke-[2.5px]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-[14px] font-black uppercase tracking-[0.35em] text-ink group-hover:text-accent transition-colors duration-700">
            {feature.title}
          </h3>
          <p className="text-base lg:text-[18px] font-serif italic text-ink leading-relaxed group-hover:text-ink transition-colors duration-700">
            {feature.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const ProductCard: React.FC<{
  product: Product;
  index: number;
  addToCart: (p: Product, q?: number) => void;
  openProductDetails: (p: Product) => void;
}> = ({ product, index, addToCart, openProductDetails }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: (index % 8) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
      onClick={() => openProductDetails(product)}
    >
      {/* Image container — compact square */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F0EB] rounded-2xl mb-4">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
          referrerPolicy="no-referrer"
        />

        {/* Subtle hover vignette */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none rounded-2xl" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount && (
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white bg-accent px-2.5 py-1 rounded-full shadow-sm">
              -{product.discount}%
            </span>
          )}
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-ink/50 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {product.weight}
          </span>
        </div>

        {/* Add to cart button */}
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.9 }}
          className={`absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full shadow-xl flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 ${isAdded ? 'bg-accent' : 'bg-[#111] hover:bg-accent'}`}
        >
          <AnimatePresence mode="wait">
            {isAdded ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <ShoppingCart className="w-4 h-4 text-white stroke-[2.5px]" />
              </motion.div>
            ) : (
              <motion.div key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Plus className="w-4 h-4 text-white stroke-[3px]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Info row */}
      <div className="px-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-base font-black uppercase tracking-tight text-ink leading-tight group-hover:text-accent transition-colors duration-300 flex-1">
            {product.name}
          </h4>
          <p className="text-base font-black text-ink whitespace-nowrap shrink-0">
            ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
          </p>
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-ink/30">{product.category}</p>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {isAdded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-accent bg-white px-4 py-1.5 border border-accent/15 shadow-lg rounded-full">
              Added ✓
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};