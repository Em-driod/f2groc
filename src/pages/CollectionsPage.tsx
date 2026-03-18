import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Heart } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';

interface CollectionsPageProps {
  setView: (view: string) => void;
  addToCart: (product: any, quantity?: number) => void;
  openProductDetails: (product: any) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
}

export default function CollectionsPage({ setView, addToCart, openProductDetails, cartCount, setIsCartOpen }: CollectionsPageProps) {
  const featuredCollections = [
    {
      id: 1,
      name: "Premium Meats",
      description: "Hand-selected cuts from trusted farms",
      image: "/meat.png",
      productCount: 24,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Fresh Produce",
      description: "Locally sourced fruits and vegetables",
      image: "/plantain.jpeg",
      productCount: 48,
      badge: "Organic"
    },
    {
      id: 3,
      name: "Artisanal Grains",
      description: "Traditional grains and flours",
      image: "/garri.jpeg",
      productCount: 16,
      badge: "Heritage"
    },
    {
      id: 4,
      name: "Exotic Spices",
      description: "Authentic African seasonings",
      image: "/freshscotchpepper.jpeg",
      productCount: 32,
      badge: "Rare"
    }
  ];

  const newArrivals = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-6"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-ink">
              Our Collections
            </h1>
            <p className="text-xl md:text-2xl text-ink/60 mb-8 max-w-2xl mx-auto">
              Curated selections of the finest African foods, hand-picked for quality and authenticity
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setView('store')}
                className="bg-ink text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform"
              >
                Shop All
              </button>
              <button className="border-2 border-ink text-ink px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-ink hover:text-white transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black tracking-tighter mb-4">Featured Collections</h2>
            <p className="text-ink/60 text-lg">Discover our carefully curated product categories</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setView('store')}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-6">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {collection.badge && (
                    <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                      {collection.badge}
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-black mb-1">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.productCount} Products</p>
                  </div>
                </div>
                <h3 className="text-xl font-black tracking-tighter mb-2 group-hover:text-accent transition-colors">
                  {collection.name}
                </h3>
                <p className="text-ink/60 mb-4">{collection.description}</p>
                <div className="flex items-center text-accent font-black text-sm uppercase tracking-wider">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black tracking-tighter mb-4">New Arrivals</h2>
            <p className="text-ink/60 text-lg">Fresh additions to our collection</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openProductDetails(product)}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-6 bg-[#F5F5F5]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.discount && (
                    <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                      -{product.discount}%
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-ink text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-lg font-black tracking-tighter mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-ink/60 text-sm mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black">${product.price}</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 border border-ink/20 rounded-full flex items-center justify-center hover:bg-ink hover:text-white transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setView('store')}
              className="bg-ink text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
