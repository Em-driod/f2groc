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
  ChevronRight,
  X
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

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[1001] flex items-center gap-6">
      
      {/* Sidebar Container */}
      <motion.div
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        onClick={() => setIsExpanded(!isExpanded)}
        initial={false}
        animate={{ 
          width: isExpanded ? '300px' : '60px',
          height: isExpanded ? '540px' : '60px',
          x: isExpanded ? 0 : [0, 8, 0], // Continuous "dragging" peek animation
          backgroundColor: isExpanded ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 1)'
        }}
        transition={{
          x: isExpanded ? { type: 'spring', stiffness: 300, damping: 30 } : { duration: 3, repeat: Infinity, ease: "easeInOut" },
          width: { type: 'spring', stiffness: 200, damping: 25 },
          height: { type: 'spring', stiffness: 200, damping: 25 }
        }}
        className="backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] border-y border-r border-ink/10 flex flex-col rounded-r-[2.5rem] overflow-hidden cursor-pointer group relative"
      >
        {/* Decorative Internal Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-orange-400 to-accent opacity-60" />

        {/* Main Icon Container - Always Visible */}
        <div className={`flex-shrink-0 flex items-center justify-center transition-all duration-700 ${isExpanded ? 'h-24 border-b border-ink/5 bg-paper/50' : 'h-full w-full bg-white'}`}>
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div 
                key="close" 
                initial={{ opacity: 0, rotate: -180, scale: 0.5 }} 
                animate={{ opacity: 1, rotate: 0, scale: 1 }} 
                exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <X size={22} className="text-accent" />
              </motion.div>
            ) : (
              <motion.div 
                key="menu" 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.5 }}
                className="relative"
              >
                <LayoutGrid size={32} className="text-ink group-hover:text-accent transition-colors duration-500" />
                {/* Visual anchor point */}
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-2 bg-accent/10 rounded-full -z-10"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2"
            >
              <div className="px-3 mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-1">Curation</p>
                <h3 className="text-xl font-serif italic text-ink">The Harvest Menu</h3>
              </div>
              
              {categories.map((category, idx) => {
                const Icon = CATEGORY_ICONS[category] || LayoutGrid;
                const isActive = selectedCategory === category;

                return (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(category as Category);
                      setView('category');
                      document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
                      if (window.innerWidth < 1024) setIsExpanded(false);
                    }}
                    className={`relative flex items-center gap-4 p-4 w-full rounded-2xl transition-all duration-500 group/btn ${
                      isActive 
                        ? 'bg-ink text-white shadow-2xl translate-x-2' 
                        : 'text-ink/40 hover:bg-paper hover:text-ink hover:translate-x-1'
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-accent/20 text-accent' : 'bg-transparent'}`}>
                      <Icon size={18} className={isActive ? 'stroke-[3px]' : 'stroke-[2px]'} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                      {category}
                    </span>
                    {isActive && (
                      <motion.div layoutId="active-tick" className="ml-auto">
                        <ChevronRight size={14} className="text-accent" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Helper Label - Enhanced for Mobile */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ 
              opacity: 1, 
              x: [0, 10, 0], // Sync with sidebar dragging
              scale: [1, 1.05, 1]
            }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ 
              x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="md:hidden pointer-events-none"
          >
            <div className="relative group/label">
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
              <div className="relative bg-ink text-white text-[10px] font-black uppercase tracking-[0.4em] px-6 py-3.5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 flex items-center gap-4">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 bg-accent rounded-full animate-ping absolute" />
                  <div className="w-2 h-2 bg-accent rounded-full relative" />
                </div>
                <span>Browse Menu</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
