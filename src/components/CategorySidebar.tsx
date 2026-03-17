import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  Beef, 
  Leaf, 
  Coffee, 
  Wheat, 
  Flame, 
  Candy, 
  ShoppingBasket, 
  Utensils,
  ArrowRight,
  X,
  Wine,
  Droplets,
  MousePointer2,
  ChevronRight
} from 'lucide-react';
import { Category } from '../types';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  setView: (view: any) => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  'All': LayoutGrid,
  'Meat, Fish & Poultry': Beef,
  'Vegetable & Fresh Produce': Leaf,
  'Drinks and Beverages': Coffee,
  'Grains and Flours': Wheat,
  'Cooking Condiments': Flame,
  'Snacks and Confectionaries': Candy,
  'Groceries': ShoppingBasket,
  'Ready meals': Utensils
};

export default function CategorySidebar({ categories, selectedCategory, setSelectedCategory, setView }: CategorySidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Periodic Peek Animation Logic
  useEffect(() => {
    if (isExpanded || hasInteracted) return;
    
    // Initial peek on mount
    const initialPeek = setTimeout(() => {
      setIsPeeking(true);
      setTimeout(() => setIsPeeking(false), 6000); // 6s initial peek
    }, 1500);

    const interval = setInterval(() => {
      setIsPeeking(true);
      setTimeout(() => setIsPeeking(false), 4000); 
    }, 18000); 
    
    return () => {
      clearTimeout(initialPeek);
      clearInterval(interval);
    };
  }, [isExpanded, hasInteracted]);

  const containerVariants = {
    collapsed: { width: '0px', backgroundColor: 'rgba(255, 255, 255, 0)' },
    peeking: { width: '80px', backgroundColor: 'rgba(255, 255, 255, 0)' },
    expanded: { width: '320px', backgroundColor: 'rgba(255, 255, 255, 1)' }
  };

  const anchorVariants = {
    collapsed: { x: -80, opacity: 0 },
    peeking: { x: 0, opacity: 1 },
    expanded: { x: 0, opacity: 1 }
  };

  return (
    <>
      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-ink/10 backdrop-blur-[2px] z-[1000]"
          />
        )}
      </AnimatePresence>

      {/* 1. PERMANENT WINE TOGGLE - The Anchor that never leaves */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[1005] pl-4 flex items-center gap-4">
        <motion.button 
          onClick={() => {
            setIsExpanded(!isExpanded);
            setIsPeeking(false);
            setHasInteracted(true);
          }}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-[#3D0C0C] text-[#E5C285] shadow-[0_15px_40px_rgba(61,12,12,0.4)] group/wine overflow-hidden"
        >
          {/* Liquid background effect */}
          <motion.div 
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-t from-[#5E1B1B] to-transparent opacity-50"
          />
          
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div key="x" initial={{ opacity: 0, rotate: -180 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 180 }}>
                <X size={24} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div key="wine" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="relative z-10">
                <Wine size={28} strokeWidth={1.5} className="group-hover/wine:rotate-12 transition-transform duration-500" />
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-3 bg-[#E5C285]/20 rounded-full -z-10"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Floating "Click Here" Helper */}
        <AnimatePresence>
          {!isExpanded && !hasInteracted && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-2xl border border-ink/10 pointer-events-none"
            >
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MousePointer2 size={18} className="text-accent rotate-[-45deg] fill-accent/10" />
              </motion.div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink whitespace-nowrap">click to see more</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. DYNAMIC SIDEBAR DRAWER */}
      <motion.div
        initial="collapsed"
        animate={isExpanded ? "expanded" : (isPeeking ? "peeking" : "collapsed")}
        variants={containerVariants}
        transition={{ 
          type: 'spring', 
          stiffness: isPeeking ? 100 : 250, 
          damping: isPeeking ? 15 : 35,
          mass: isPeeking ? 1.5 : 1
        }}
        className="fixed inset-y-0 left-0 z-[1001] border-r border-ink/5 flex flex-col group overflow-hidden pointer-events-none"
      >
        <div className="flex-1 flex flex-col h-full pointer-events-auto">
          {/* Vertical Icon Stream (Peeking Part) */}
          <motion.div 
            variants={anchorVariants}
            className="absolute inset-y-0 left-0 w-[80px] flex flex-col items-center justify-center gap-8 bg-white border-r border-ink/5 pt-12 pb-12 shadow-[20px_0_40px_rgba(0,0,0,0.02)]"
          >
            {/* Expansion Arrow Button (In Peek Mode) */}
            <motion.button
              onClick={() => {
                setIsExpanded(true);
                setIsPeeking(false);
                setHasInteracted(true);
              }}
              whileHover={{ scale: 1.2 }}
              className={`mb-12 p-3 rounded-full bg-accent/10 text-accent transition-all duration-500 ${isExpanded ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
            >
              <ChevronRight size={20} strokeWidth={3} />
            </motion.button>

            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {categories.slice(1, 8).map((cat, i) => {
                const Icon = CATEGORY_ICONS[cat] || LayoutGrid;
                return (
                  <motion.button 
                    key={`anchor-icon-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: (isExpanded || isPeeking) ? 1 : 0,
                      x: (isExpanded || isPeeking) ? 0 : -20,
                      scale: selectedCategory === cat ? 1.2 : 1
                    }}
                    whileHover={{ scale: 1.3, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => {
                      setSelectedCategory(cat as Category);
                      setView('category');
                      setIsExpanded(false);
                      setIsPeeking(false);
                      setHasInteracted(true);
                    }}
                    className={`${selectedCategory === cat ? 'text-accent' : 'text-ink/20'} hover:text-accent transition-colors p-2 rounded-xl hover:bg-paper`}
                    title={cat}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </motion.button>
                );
              })}
            </div>
            
            <div className="w-px h-16 bg-gradient-to-b from-ink/5 via-ink/10 to-transparent my-4" />
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="pb-8"
            >
              <Droplets size={18} className="text-[#3D0C0C]/10" />
            </motion.div>
          </motion.div>

          {/* Expanded Content Area */}
          <div className="ml-[80px] flex-1 flex flex-col p-8 lg:p-10 h-full relative bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-8">
                <p className="text-accent text-[9px] font-black uppercase tracking-[0.6em] mb-2">Selection</p>
                <h3 className="text-2xl font-black text-ink uppercase tracking-tight">Categories</h3>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
                {categories.map((category, idx) => {
                  const Icon = CATEGORY_ICONS[category] || LayoutGrid;
                  const isActive = selectedCategory === category;

                  return (
                    <motion.button
                      key={category}
                      initial={{ x: -10, opacity: 0 }}
                      animate={isExpanded ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      transition={{ delay: 0.1 + idx * 0.03 }}
                      onClick={() => {
                        setSelectedCategory(category as Category);
                        setView('category');
                        setIsExpanded(false);
                        setHasInteracted(true);
                      }}
                      className={`group w-full flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 ${
                        isActive ? 'bg-ink text-white shadow-lg' : 'hover:bg-paper'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-accent' : 'text-ink/30 group-hover:text-ink'} />
                      <span className={`text-[11px] font-black uppercase tracking-widest transition-all ${
                        isActive ? 'text-white' : 'text-ink/40 group-hover:text-ink'
                      }`}>
                        {category}
                      </span>
                      {isActive && (
                        <ArrowRight size={14} className="text-accent ml-auto" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Sidebar Footer */}
              <div className="mt-8 pt-6 border-t border-ink/5">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-ink/20">F2 Protein Heritage</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. MOBILE PEEK HELPER - Redesigned to be subtler */}
      <AnimatePresence>
        {!isExpanded && !isPeeking && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="fixed left-24 top-1/2 -translate-y-1/2 lg:hidden pointer-events-none"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-ink/20 whitespace-nowrap">
              Explore Harvest
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
