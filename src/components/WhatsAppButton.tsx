import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MousePointer2 } from 'lucide-react';

export default function WhatsAppButton() {
  const [hasInteracted, setHasInteracted] = useState(false);

  const phoneNumber = "07064241751";
  const message = "Hello F2 Protein, I'd like to make an inquiry.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[1005] pr-4 flex flex-row-reverse items-center gap-4">
      {/* Permanent WhatsApp Toggle */}
      <motion.a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setHasInteracted(true)}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-[#075E54] text-[#E5C285] shadow-[0_15px_40px_rgba(7,94,84,0.4)] group/wa overflow-hidden"
      >
        {/* Liquid background effect */}
        <motion.div 
          animate={{ 
            y: [0, 5, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-b from-[#128C7E] to-transparent opacity-50"
        />
        
        <div className="relative z-10">
          <MessageCircle size={28} strokeWidth={1.5} className="group-hover/wa:rotate-12 transition-transform duration-500" />
          {/* Visual anchor point */}
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-3 bg-[#E5C285]/20 rounded-full -z-10"
          />
        </div>
      </motion.a>

      {/* Floating "Chat with us" Helper */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-2xl border border-ink/10 pointer-events-none"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink whitespace-nowrap">Chat with us</span>
            <motion.div
              animate={{ x: [0, -8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MousePointer2 size={18} className="text-[#075E54] rotate-[135deg] fill-[#075E54]/10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
