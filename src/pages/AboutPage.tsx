import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface AboutPageProps {
  setView: (view: string) => void;
}

export default function AboutPage({ setView }: AboutPageProps) {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            <div className="flex items-center gap-8 lg:gap-12">
              <div 
                className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                onClick={() => setView('store')}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-ink flex items-center justify-center group-hover:bg-highlight transition-colors">
                  <span className="text-paper font-black text-sm sm:text-base font-bold">F2</span>
                </div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-serif italic font-bold tracking-tight text-ink">Protein & Groceries</span>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
              <button 
                onClick={() => setView('store')}
                className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/60 hover:text-ink transition-colors"
              >
                Store
              </button>
              <button 
                onClick={() => setView('about')}
                className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight"
              >
                About
              </button>
              <button 
                onClick={() => setView('contact')}
                className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/60 hover:text-ink transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-paper via-paper to-highlight/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] mb-8 tracking-tighter uppercase text-ink">
              About <span className="text-highlight">F2</span>
            </h1>
            <p className="text-lg sm:text-xl text-ink/60 font-serif italic leading-relaxed mb-12">
              F2 Connect Ltd., trading as F2 Protein and Groceries
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-ink">
                Our <span className="text-highlight">Story</span>
              </h2>
              <div className="space-y-6 text-ink/60 font-serif text-lg leading-relaxed">
                <p>
                  F2 Protein and Groceries is an African grocery store dedicated to providing authentic African food products to the community. Our goal is to make it easy for customers to find quality African ingredients needed to prepare traditional meals.
                </p>
                <p>
                  We focus on freshness, affordability, and friendly customer service to ensure our community has access to the authentic ingredients they need to create delicious African cuisine.
                </p>
                <p>
                  Located in Weymouth, we serve customers locally in our store and online for delivery orders throughout the UK.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80" 
                alt="African Grocery Store" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-ink">
              Our <span className="text-highlight">Products</span>
            </h2>
            <p className="text-lg text-ink/60 font-serif italic leading-relaxed max-w-3xl mx-auto">
              We sell a wide range of African food products including:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Dried African foodstuffs',
              'Frozen foods',
              'Fresh vegetables',
              'African spices and ingredients',
              'Protein products such as meat and fish',
              'Other essential groceries used in African cooking'
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-line p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-ink">
                  {product.split(' ').slice(0, 2).join(' ')}
                </h3>
                <p className="text-ink/60 font-serif leading-relaxed">
                  {product}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Selling Points */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-ink">
              What Makes Us <span className="text-highlight">Different</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Fresh & Authentic', desc: 'Fresh and authentic African foods sourced directly from trusted suppliers' },
              { title: 'Affordable Prices', desc: 'Affordable and friendly prices for our community' },
              { title: 'Friendly Staff', desc: 'Friendly and helpful staff ready to assist you' },
              { title: 'Wide Selection', desc: 'Complete African meal ingredients in one place' }
            ].map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center p-8 rounded-2xl border border-line hover:border-highlight transition-all duration-300"
              >
                <div className="w-16 h-16 bg-highlight/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-highlight rounded-full" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-ink">
                  {point.title}
                </h3>
                <p className="text-ink/60 font-serif leading-relaxed">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Customers */}
      <section className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-ink">
              Our <span className="text-highlight">Community</span>
            </h2>
            <p className="text-lg text-ink/60 font-serif italic leading-relaxed mb-12">
              Our main customers are members of the African community in the UK, as well as anyone interested in African cuisine. We serve both walk-in customers and online shoppers with the same dedication to quality and service.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('store')}
              className="btn-f2proteinsandgroceries group flex items-center gap-4 mx-auto"
            >
              Shop Our Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-ink/20 text-[10px] font-bold uppercase tracking-widest mb-8">
              © 2026 F2 Protein & Groceries. All rights reserved.
            </p>
            <div className="flex justify-center gap-12">
              <a href="https://www.instagram.com/f2proteinsandgroceries" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@f2proteinngroceries_uk" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
