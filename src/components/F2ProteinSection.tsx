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
          <h2 className="text-5xl md:text-7xl font-black text-amber-900 mb-6 tracking-tighter">
            F2 Protein 'n' Groceries
          </h2>
          <div className="text-3xl md:text-5xl font-black text-orange-600 mb-8 uppercase tracking-widest">
            African Market
          </div>
          <p className="text-xl lg:text-2xl text-amber-900/80 max-w-4xl mx-auto leading-relaxed font-serif italic mb-12">
            Your #1 Destination for Egusi, Garri, Yam, and All Authentic African & Caribbean Groceries – Delivered to Your Doorstep Across the UK
          </p>
          <button className="px-12 py-5 bg-ink text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-accent transform hover:-translate-y-1 transition-all duration-700 border-2 border-ink">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default F2ProteinSection;
