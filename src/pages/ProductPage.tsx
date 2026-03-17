import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Plus, 
  Minus, 
  Award, 
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';
import { Product, Category } from '../types';
import { PRODUCTS } from '../constants';

interface ProductPageProps {
  product: Product;
  setView: (view: any) => void;
  addToCart: (product: Product, quantity: number) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  openProductDetails: (product: Product) => void;
}

export default function ProductPage({ 
  product, 
  setView, 
  addToCart, 
  cartCount, 
  setIsCartOpen,
  openProductDetails 
}: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'nutrition' | 'reviews'>('description');
  
  // Find related products (same category, excluding current)
  const relatedProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.id]);

  const discountedPrice = product.discount 
    ? (product.price * (1 - product.discount / 100)).toFixed(2) 
    : product.price.toFixed(2);

  return (
    <div className="min-h-screen bg-paper pb-24">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/80 backdrop-blur-3xl border-b border-ink/5">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex justify-between items-center">
          <button 
            onClick={() => setView('store')}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-ink/40 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </button>

          <div className="flex items-center gap-8">
            <button onClick={() => setIsCartOpen(true)} className="relative group p-2">
              <ShoppingBag className="w-5 h-5 text-ink" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[8px] font-black flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-ink/5 group">
              <motion.img 
                layoutId={`product-image-${product.id}`}
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="aspect-square bg-white rounded-2xl overflow-hidden border border-ink/5 cursor-pointer hover:border-accent transition-colors">
                  <img src={product.image} className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">{product.category}</span>
                <div className="h-px w-8 bg-ink/10" />
                <div className="flex items-center gap-1 text-highlight">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-ink">4.9 (128 Reviews)</span>
                </div>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black text-ink uppercase tracking-tighter mb-6 leading-none">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-6 mb-8">
                <span className="text-5xl font-black tracking-tighter text-ink">
                  ${discountedPrice}
                </span>
                {product.discount && (
                  <span className="text-2xl font-black tracking-tighter text-ink/20 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <span className="text-xs uppercase tracking-[0.2em] font-black text-ink/30">per {product.unit}</span>
              </div>

              <p className="text-lg text-ink/50 leading-relaxed font-medium max-w-xl">
                {product.description}
              </p>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-2 gap-8 mb-12 p-8 bg-paper border border-ink/5 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ink">Premium</p>
                  <p className="text-[9px] font-bold text-ink/40 uppercase tracking-widest">A-Grade Harvest</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ink">Organic</p>
                  <p className="text-[9px] font-bold text-ink/40 uppercase tracking-widest">100% Natural</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center bg-white border border-ink/10 rounded-2xl p-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-paper rounded-xl transition-colors text-ink"
                  >
                    <Minus size={18} strokeWidth={2.5} />
                  </button>
                  <span className="w-16 text-center text-2xl font-black tracking-tighter text-ink">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-paper rounded-xl transition-colors text-ink"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>

                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 btn-elite py-6 px-12 text-sm font-black flex items-center justify-center gap-4 group"
                >
                  <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform" />
                  Reserve to Cart
                </button>

                <button className="w-20 h-20 border border-ink/10 rounded-2xl flex items-center justify-center hover:bg-white hover:border-highlight hover:text-highlight transition-all group">
                  <Heart size={24} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="flex items-center gap-12 pt-8 border-t border-ink/5">
                <div className="flex items-center gap-3 text-ink/40">
                  <Truck size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-ink/40">
                  <RotateCcw size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Fresh Return Policy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Info Tabs */}
        <section className="mt-32">
          <div className="flex gap-12 border-b border-ink/5 mb-12">
            {(['description', 'nutrition', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${
                  activeTab === tab ? 'text-ink' : 'text-ink/20 hover:text-ink/40'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-3xl"
                >
                  <p className="text-xl text-ink/60 leading-relaxed font-medium mb-8">
                    Our {product.name} is sourced directly from sustainable African farms, ensuring that every {product.unit} meets our rigorous quality standards. We handle each harvest with extreme care, from the soil to your doorstep.
                  </p>
                  <ul className="space-y-4">
                    {['Sustainably Sourced', 'Triple Quality Checked', 'Hand-picked Selection'].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-ink/80 text-sm font-bold uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'nutrition' && product.nutritionalInfo && (
                <motion.div
                  key="nutrition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                  {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                    <div key={key} className="bg-white p-8 rounded-3xl border border-ink/5 text-center shadow-sm">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-ink/30 mb-2">{key}</p>
                      <p className="text-3xl font-black text-ink tracking-tighter">{value}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  {product.reviews.length > 0 ? product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-ink/5 pb-12 last:border-0">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-paper rounded-full flex items-center justify-center font-black text-xs text-ink">
                            {review.user[0]}
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-ink">{review.user}</p>
                            <p className="text-[9px] font-bold text-ink/30 uppercase tracking-[0.2em]">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 text-accent">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-ink/60 font-medium leading-relaxed">{review.comment}</p>
                    </div>
                  )) : (
                    <div className="text-center py-12">
                      <p className="text-ink/30 font-black uppercase tracking-[0.2em]">No reviews yet for this selection.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-40">
            <div className="flex justify-between items-end mb-16">
              <div>
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.6em] mb-4">Discovery</p>
                <h2 className="text-5xl font-black text-ink uppercase tracking-tighter">Related Selections</h2>
              </div>
              <button 
                onClick={() => setView('category')}
                className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-ink/40 hover:text-accent transition-colors pb-2"
              >
                View Collection <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => openProductDetails(p)}
                >
                  <div className="aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                    <img src={p.image} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30 mb-2">{p.category}</p>
                  <h3 className="text-lg font-black text-ink uppercase tracking-tight group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="text-sm font-black text-ink/60">${p.price.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
