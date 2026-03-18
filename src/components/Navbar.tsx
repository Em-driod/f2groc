import React from 'react';
import { motion } from 'motion/react';
import { Search, User, ShoppingCart, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  setView: (view: any) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  variant?: 'main' | 'simple';
  backLabel?: string;
  transparent?: boolean;
}

export default function Navbar({
  setView,
  cartCount,
  setIsCartOpen,
  setIsMobileMenuOpen,
  searchQuery,
  setSearchQuery,
  variant = 'main',
  backLabel = 'Back to Store',
  transparent = false
}: NavbarProps) {
  if (variant === 'simple') {
    return (
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/80 backdrop-blur-3xl border-b border-ink/5">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex justify-between items-center">
          <button 
            onClick={() => setView('store')}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-ink/40 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {backLabel}
          </button>

          <div className="flex items-center gap-8">
            <button onClick={() => setIsCartOpen(true)} className="relative group p-2">
              <ShoppingCart className="w-5 h-5 text-ink" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[8px] font-black flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setView('account')} className="text-ink/40 hover:text-ink transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] ${transparent ? 'bg-white/40' : 'bg-white/95'} backdrop-blur-3xl border-b border-white/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}>
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
                <button 
                  key={item} 
                  onClick={() => {
                    if (item === 'Shop') setView('store');
                    if (item === 'About') setView('about');
                    if (item === 'Journal') setView('store'); // Assuming Journal is on StorePage
                  }}
                  className="text-[11px] uppercase tracking-[0.3em] font-black text-ink/60 hover:text-ink transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            {setSearchQuery && (
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
            )}

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
  );
}
