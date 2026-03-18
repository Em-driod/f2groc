import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, ShoppingCart, User, Plus, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Product, CartItem, Category } from '../types';
import { PRODUCTS, CATEGORIES } from '../constants';

interface CategoryPageProps {
  category: Category;
  setCategory: (cat: Category) => void;
  setView: (view: any) => void;
  addToCart: (product: Product, quantity?: number) => void;
  openProductDetails: (product: Product) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
}

export default function CategoryPage({
  category,
  setCategory,
  setView,
  addToCart,
  openProductDetails,
  cartCount,
  setIsCartOpen
}: CategoryPageProps) {
  
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === category || category === 'All')
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [category]);

  const CATEGORY_DETAILS: Record<string, { description: string, image: string }> = {
    'All': { description: 'Our entire harvest collection.', image: '/logo.jpeg' },
    'Meat, Fish & Poultry': { description: 'Premium grass-fed meats and fresh Atlantic catch.', image: '/meat.png' },
    'Vegetable & Fresh Produce': { description: 'Sun-ripened organic vegetables from local heritage farms.', image: '/plantain.jpeg' },
    'Drinks and Beverages': { description: 'Traditional refreshments and modern artisanal blends.', image: '/efo-riro.jpeg' },
    'Grains and Flours': { description: 'The foundation of every great feast. Stone-ground and pure.', image: '/garri.jpeg' },
    'Cooking Condiments': { description: 'The essential spices that bring the soul to your kitchen.', image: '/freshscotchpepper.jpeg' },
    'Snacks and Confectionaries': { description: 'Handcrafted delights for your moments of indulgence.', image: '/snacks.png' },
    'Groceries': { description: 'Your daily essentials, curated for absolute quality.', image: '/bitterleaf.jpeg' },
    'Ready meals': { description: 'Chef-prepared traditional dishes, ready for your table.', image: '/efo-riro.jpeg' }
  };

  const details = CATEGORY_DETAILS[category] || CATEGORY_DETAILS['All'];

  return (
    <div className="min-h-screen bg-paper">
      <Navbar 
        setView={setView}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        setIsMobileMenuOpen={() => {}} // Not used in simple variant but required by props if I didn't make it optional
        variant="simple"
      />

      <main className="pt-32 pb-40">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <header className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <span className="text-[11px] uppercase tracking-[0.6em] font-black text-accent">Selection</span>
                  <div className="h-[1px] w-12 bg-accent/30" />
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[12vw] lg:text-[7rem] leading-[0.85] font-black text-ink uppercase tracking-tighter mb-8"
                >
                  {category.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? 'font-serif italic font-normal normal-case block lg:inline lg:ml-4 text-accent' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-md text-xl lg:text-2xl text-ink/40 font-serif italic leading-relaxed"
                >
                  {details.description}
                </motion.p>
              </div>

              {/* Sidebar/Filter in Category Page */}
              <div className="flex flex-col gap-8 lg:items-end">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink/20">Switch Category</p>
                <div className="flex flex-wrap lg:justify-end gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat as Category)}
                      className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                        category === cat 
                          ? 'bg-ink text-white border-ink shadow-xl' 
                          : 'bg-white text-ink/40 border-ink/5 hover:border-accent hover:text-accent'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 lg:gap-y-24">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <CategoryProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  addToCart={addToCart}
                  onClick={() => openProductDetails(product)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-40 text-center border-t border-ink/5">
              <p className="text-2xl font-serif italic text-ink/20">This harvest is currently empty.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function CategoryProductCard({ product, index, addToCart, onClick }: { product: Product, index: number, addToCart: any, onClick: any }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper mb-6 cursor-pointer">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="absolute bottom-6 right-6 w-14 h-14 bg-white text-ink rounded-full shadow-2xl flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-accent hover:text-white"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="px-2">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-black uppercase tracking-tight text-ink group-hover:text-accent transition-colors">{product.name}</h4>
          <span className="text-xl font-black text-ink">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/20">{product.unit}</p>
      </div>
    </motion.div>
  );
}
