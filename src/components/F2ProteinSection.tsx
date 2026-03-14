import React from 'react';

const F2ProteinSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-800/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-amber-800 mb-2">
            F2 Protein 'n' Groceries
          </h2>
          <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
            African Market
          </div>
          <p className="text-xl text-amber-600 max-w-4xl mx-auto leading-relaxed">
            Your #1 Destination for Egusi, Garri, Yam, and All Authentic African & Caribbean Groceries – Delivered to Your Doorstep Across the UK
          </p>
          <button className="mt-8 px-8 py-4 bg-gradient-to-r from-amber-800 to-orange-500 text-white font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default F2ProteinSection;
