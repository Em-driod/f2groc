import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 lg:py-24 bg-ink text-white overflow-hidden relative">
      {/* Cinematic Light Pools */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 hidden lg:block"
      />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, backgroundSize: '200px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col space-y-12 lg:space-y-20">
          {/* Massive Branding Header */}
          <div className="border-b border-white/5 pb-8 lg:pb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl lg:text-8xl leading-[0.75] font-black tracking-[-0.06em] text-white uppercase select-none"
            >
              F2 <span className="text-accent underline decoration-[2px] underline-offset-[1vw] decoration-accent/20">Protein.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-5 space-y-12">
              <p className="max-w-md text-white/40 font-serif italic text-xl lg:text-2xl leading-relaxed">
                "Transmitting the vibrant essence of African culinary heritage to the global table."
              </p>

              <div className="pt-6">
                <div className="flex flex-col gap-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent">Heritage Presence</p>
                  <div className="flex gap-12 items-center">
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

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
              <div>
                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-4">
                  <div className="w-8 h-px bg-accent/30" />
                  Collection
                </h4>
                <ul className="space-y-6">
                  {['Shop All', 'New Arrivals', 'Best Sellers', 'Limited'].map(item => (
                    <li key={item}>
                      <a href="#" className="text-base text-white/60 hover:text-white transition-all duration-700 tracking-[0.2em] font-bold">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-4">
                  <div className="w-8 h-px bg-accent/30" />
                  Support
                </h4>
                <ul className="space-y-6">
                  {['Contact', 'Delivery', 'Privacy', 'Gift Cards'].map(item => (
                    <li key={item}>
                      <a href="#" className="text-base text-white/60 hover:text-white transition-all duration-700 tracking-[0.2em] font-bold">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-4">
                  <div className="w-8 h-px bg-accent/30" />
                  Mailing List
                </h4>
                <p className="text-sm text-white/30 mb-8 font-serif italic opacity-60">Join our inner circle for exclusive harvest updates.</p>
                <div className="flex border-b-[3px] border-white/20 pb-6 group focus-within:border-accent transition-colors duration-1000">
                  <input
                    type="text"
                    placeholder="SIGNATURE EMAIL"
                    className="bg-transparent border-none focus:ring-0 text-[11px] w-full placeholder:text-white/20 font-black tracking-[0.3em]"
                  />
                  <ChevronRight className="w-6 h-6 text-accent group-hover:translate-x-3 transition-transform duration-700 stroke-[3px] flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 pt-8 lg:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-12">
          <p className="text-[10px] font-black text-white/5 uppercase tracking-[0.5em]">© 2026 F2 Protein Group. Masterpiece Design v10.</p>
          <div className="flex gap-16 text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">
            <motion.a href="#" whileHover={{ color: "white", scale: 1.1 }} className="transition-all">Legal</motion.a>
            <motion.a href="#" whileHover={{ color: "white", scale: 1.1 }} className="transition-all">Privacy</motion.a>
            <motion.a href="#" whileHover={{ color: "white", scale: 1.1 }} className="transition-all">Terms</motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
