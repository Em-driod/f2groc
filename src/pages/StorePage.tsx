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
      image: "/bac2.png",
      badgeText: "Fresh",
      badgeLabel: "Daily",
      bgGradient: "from-paper via-paper to-highlight/10"
    },
    {
      label: "Premium Quality",
      title: "Traditional Taste.",
      description: "Hand-picked African ingredients bringing heritage to your kitchen.",
      image: "/bac3.png",
      badgeText: "Authentic",
      badgeLabel: "African",
      bgGradient: "from-paper via-paper to-ink/5"
    },
    {
      label: "Affordable Prices",
      title: "Community First.",
      description: "Quality African products at friendly prices for our community.",
      image: "/bac3.png",
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

  return (
    <>
      <div className="noise" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-3xl border-b border-white/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
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

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-ink">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            {/* Full-screen Background Image with Parallax-ready Scale */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.img
                src={HERO_SLIDES[currentSlide].image}
                alt="Background"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full object-cover filter brightness-[0.6] sepia-[20%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-24">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="flex items-center gap-6 mb-10"
                >
                  <div className="w-16 h-1 bg-accent" />
                  <span className="text-[12px] uppercase tracking-[0.6em] font-black text-accent">
                    {HERO_SLIDES[currentSlide].label}
                  </span>
                </motion.div>

                <h1 className="text-white mb-12 flex flex-wrap heading-electric">
                  {HERO_SLIDES[currentSlide].title.split(' ').map((word, i) => (
                    <div key={i} className="overflow-hidden inline-block mr-6 lg:mr-8">
                      <motion.span
                        initial={{ y: "110%", rotate: 15 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{
                          delay: 0.6 + i * 0.1,
                          duration: 1.8,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="block origin-left"
                      >
                        {word === "Groceries." ? (
                          <span className="text-accent relative decoration-2 underline-offset-[12px] decoration-accent/20">
                            {word}
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ delay: 1.5, duration: 1.5 }}
                              className="absolute -bottom-4 left-0 h-1 bg-accent/40"
                            />
                          </span>
                        ) : word}
                      </motion.span>
                    </div>
                  ))}
                </h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row gap-16 items-start sm:items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-elite group"
                  >
                    <span>Explore Collection</span>
                  </motion.button>
                  <p className="max-w-md text-base lg:text-xl font-medium text-white/70 leading-relaxed font-serif italic border-l-2 border-accent/30 pl-8">
                    {HERO_SLIDES[currentSlide].description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Slide Indicators */}
        <div className="absolute bottom-12 right-12 z-30 flex flex-col gap-6">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group relative flex items-center justify-end"
            >
              <span className={`text-[10px] font-black tracking-widest mr-4 transition-all duration-500 ${currentSlide === index ? 'text-accent opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'
                }`}>
                0{index + 1}
              </span>
              <div className={`h-12 w-px transition-all duration-700 ${currentSlide === index ? 'bg-accent scale-y-125' : 'bg-white/10 group-hover:bg-white/30'
                }`} />
            </button>
          ))}
        </div>

        {/* Mobile Hero Navigation Arrows */}
        <div className="absolute inset-y-0 left-6 right-6 z-40 flex items-center justify-between pointer-events-none lg:hidden">
          <motion.button
            whileTap={{ scale: 0.9, background: "var(--color-gold-glimmer)" }}
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white/40 bg-ink/30 backdrop-blur-xl pointer-events-auto transition-all duration-500"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9, background: "var(--color-gold-glimmer)" }}
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white/40 bg-ink/30 backdrop-blur-xl pointer-events-auto transition-all duration-500"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Floating Narrative Branding */}
        <div className="absolute bottom-12 left-12 z-30 hidden lg:flex items-center gap-12">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all duration-700 hover:bg-white/5 backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all duration-700 hover:bg-white/5 backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="h-px w-32 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 whitespace-nowrap">Scroll for Masterpieces</span>
        </div>

        {/* Parallax Dust Particles */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute w-1 h-1 bg-accent rounded-full blur-[2px] particle-${i + 1}`}
            />
          ))}
        </div>
      </section>



      {/* 10/10 Professional Elite: Frosted Crystal Feature Strip - REFINED */}
      <section className="relative z-50 -mt-24 lg:-mt-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/90 backdrop-blur-3xl border-2 border-white/60 shadow-elite rounded-[2rem] overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x-[3px] lg:divide-x-[4px] divide-line">
              {mobileFeatures.map((feature, index) => (
                <ProfessionalFeatureItem key={feature.id} feature={feature} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>    {/* 10/10 Absolute Beauty: Heavenly Hot Deals */}
      <section className="py-24 lg:py-40 bg-white relative overflow-hidden group/section">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 lg:mb-32 gap-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[12px] uppercase tracking-[0.6em] font-black text-accent">Hot Deals</span>
                <div className="w-12 h-[2px] bg-accent" />
              </div>
              <h2 className="text-6xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.9] text-ink uppercase">
                Latest <br />
                <span className="text-accent italic font-serif lowercase tracking-normal block">Arrivals.</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="max-w-xs text-lg text-ink/40 font-serif italic border-l-[2px] border-accent/30 pl-8 leading-relaxed mb-4"
            >
              Purely harvested treasures, curated for absolute freshness and quality.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {dealProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative cursor-pointer"
                onClick={() => openProductDetails(product)}
              >
                <div className="relative aspect-square overflow-hidden bg-surface mb-8 border-[0.5px] border-line/30 group-hover:border-accent transition-all duration-700 shadow-none hover:shadow-[0_0_80px_-20px_rgba(var(--color-accent-rgb),0.2)]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-accent bg-white/90 backdrop-blur-sm px-4 py-1.5 border border-accent/20">
                      -{product.discount}%
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-ink group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[10px] uppercase font-black tracking-[0.4em] text-ink/20">Heavenly Select</p>
                    </div>
                    <p className="text-2xl font-black text-ink">${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Order Now</span>
                    <div className="h-[1px] flex-grow bg-accent/20" />
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-32 text-center"
          >
            <button
              onClick={() => {
                const el = document.getElementById('shop-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative py-4 px-12 border-[0.5px] border-ink/20 hover:border-accent transition-all duration-700"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.8em] text-ink group-hover:text-accent transition-colors">View All Arrivals</span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-700" />
            </button>
          </motion.div>
        </div>
      </section>
      {/* 10/10 Mastercraft: Shop Gallery */}
      <main id="shop-grid" className="py-24 lg:py-64 bg-white relative overflow-hidden">
        {/* Spectral Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, backgroundSize: '200px' }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col space-y-16 mb-24 lg:mb-40">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[12px] uppercase tracking-[0.6em] font-black text-accent">Selection</span>
                </div>
                <h2 className="text-6xl lg:text-[8rem] leading-[0.8] font-black tracking-[-0.05em] text-ink uppercase">
                  Shop <br />
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="text-accent lowercase italic font-serif tracking-normal block -mt-2 bg-gradient-to-r from-accent via-orange-400 to-accent bg-[length:200%_auto] bg-clip-text text-transparent"
                  >
                    Selection.
                  </motion.span>
                </h2>
              </motion.div>

              {/* Mastercraft Category Bar */}
              <div className="hidden lg:flex bg-white p-1.5 rounded-full border-[0.5px] border-ink/10 items-center gap-1 overflow-hidden">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as Category)}
                    className={`relative px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 z-10 ${selectedCategory === category ? 'text-white' : 'text-ink/40 hover:text-ink'
                      }`}
                  >
                    {selectedCategory === category && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-ink rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                      />
                    )}
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Category Scroll (Professional Compact) */}
            <div className="lg:hidden w-full overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
              <div className="flex gap-4">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as Category)}
                    className={`px-10 py-5 text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-500 border-[3px] ${selectedCategory === category
                      ? 'bg-gradient-to-br from-accent to-orange-400 text-white border-transparent shadow-lg'
                      : 'bg-white text-ink/40 border-line hover:border-ink hover:text-ink'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mastercraft Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-20"
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-64 text-center rounded-[3rem] border-2 border-dashed border-line/50 bg-surface/30 backdrop-blur-sm"
            >
              <div className="w-24 h-24 rounded-full bg-ink/5 flex items-center justify-center mx-auto mb-12">
                <Search className="w-10 h-10 text-ink/10" />
              </div>
              <h3 className="text-4xl font-black uppercase tracking-[0.5em] text-ink/30">Silent Harvest</h3>
              <p className="max-w-xs mx-auto text-xl text-ink/50 font-serif italic mt-8 leading-relaxed">
                The earth has yet to reveal such bounty. Explore another path.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Elite Masterpiece Footer: 10/10 Grandeur */}
      <footer className="py-24 lg:py-64 bg-ink text-white overflow-hidden relative">
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
          <div className="flex flex-col space-y-32">
            {/* Massive Branding Header */}
            <div className="border-b border-white/5 pb-24 lg:pb-40">
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
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

          <div className="mt-64 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <p className="text-[10px] font-black text-white/5 uppercase tracking-[0.5em]">© 2026 F2 Protein Group. Masterpiece Design v10.</p>
            <div className="flex gap-20 text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">
              <motion.a href="#" whileHover={{ color: "white", scale: 1.1 }} className="transition-all">Legal</motion.a>
              <motion.a href="#" whileHover={{ color: "white", scale: 1.1 }} className="transition-all">Privacy</motion.a>
              <motion.a href="#" whileHover={{ color: "white", scale: 1.1 }} className="transition-all">Terms</motion.a>
            </div>
          </div>
        </div>
      </footer>
      <LiquidBottomNav setView={setView} />

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isAdded, setIsAdded] = useState(false);

  const rotateX = useTransform(mouseY, [0, 400], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 300], [-8, 8]);

  const springConfig = { damping: 30, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(150);
    mouseY.set(200);
  }

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
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.8,
        delay: index % 4 * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{
        perspective: 1200,
      }}
      className="group relative cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => openProductDetails(product)}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Floating Frame Aesthetic with Prismatic Depth */}
        <div className="relative aspect-[3/4] overflow-hidden bg-surface border-[0.5px] border-ink/5 group-hover:border-accent transition-all duration-1000 ease-out shadow-none hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
            referrerPolicy="no-referrer"
          />

          {/* Prismatic Light Sweep */}
          <motion.div
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,165,0,0.05) 30%, transparent 70%)',
              left: mouseX,
              top: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-80 h-80 blur-[60px]"
          />

          {/* Glass Glint Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
            {product.discount && (
              <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-white/94 px-3 py-1 border border-accent/10 backdrop-blur-sm">
                -{product.discount}%
              </span>
            )}
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-ink/40 bg-white/94 px-3 py-1 border border-ink/5 backdrop-blur-sm">
              {product.weight}
            </span>
          </div>
        </div>

        <div className="mt-8 px-1 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h4 className="text-xl lg:text-2xl font-black uppercase tracking-tighter text-ink leading-none group-hover:text-accent transition-colors">
                {product.name}
              </h4>
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-ink/20 italic">Brilliant Mastercraft</p>
            </div>
            <p className="text-2xl font-black text-ink tracking-tight">${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-4 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-accent">Acquire Piece</span>
            <div className="h-[0.5px] flex-grow bg-accent/20" />
            <ArrowRight className="w-3 h-3 text-accent" />
          </div>
        </div>

        {/* Electric Plus Button with Functional Feedback */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: 1,
            x: 0,
            backgroundColor: isAdded ? "var(--color-accent)" : "rgb(24, 24, 27)" // bg-ink
          }}
          className="absolute -top-4 -right-4 p-5 text-white rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-50 transform translate-x-4 group-hover:translate-x-0"
        >
          {isAdded ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <ShoppingCart className="w-6 h-6 stroke-[3px]" />
            </motion.div>
          ) : (
            <Plus className="w-6 h-6 stroke-[4px]" />
          )}

          <motion.div
            animate={{
              scale: isAdded ? [1, 1.5, 1.2] : [1, 1.2, 1],
              opacity: isAdded ? [0.4, 0.8, 0.4] : [0.1, 0.2, 0.1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full bg-accent -z-10 blur-xl"
          />
        </motion.button>

        {/* Success Toast Interaction */}
        <AnimatePresence>
          {isAdded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full text-center"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent bg-white px-4 py-2 border border-accent/10 shadow-xl">
                Added to Selection
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

function LiquidBottomNav({ setView }: { setView: (view: string) => void }) {
  const [activeItem, setActiveItem] = useState('shop');
  const items = [
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'search', icon: Search, label: 'Find' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart' },
    { id: 'account', icon: User, label: 'You' },
  ];

  return (
    <div className="md:hidden liquid-nav">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveItem(item.id);
            if (item.id === 'account') setView('account');
            else setView('store');
          }}
          className={`liquid-item electric-tap ${activeItem === item.id ? 'text-white' : ''}`}
        >
          {activeItem === item.id && (
            <motion.div
              layoutId="bubble"
              className="liquid-bubble"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <item.icon className="w-5 h-5 relative z-10" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: activeItem === item.id ? 1 : 0 }}
            className="absolute -bottom-1 text-[8px] font-black uppercase tracking-widest text-white/50"
          >
            {item.label}
          </motion.span>
        </button>
      ))}
    </div>
  );
}
