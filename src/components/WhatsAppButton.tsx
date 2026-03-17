import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, MousePointer2 } from 'lucide-react';

export default function WhatsAppButton() {
  const [hasInteracted, setHasInteracted] = useState(false);

  // Scroll logic for helper visibility
  const { scrollY } = useScroll();
  // Only show when scrolled down (> 200px)
  const opacity = useTransform(scrollY, [150, 300], [0, 1]);
  const display = useTransform(scrollY, [150, 300], ['none', 'flex']);

  // Phone number: +234 706 424 1751 -> 2347064241751
  const phoneNumber = "2347064241751";
  const message = "Hello F2 Protein, I'd like to make an inquiry.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed right-0 top-[78%] -translate-y-1/2 z-[1005] pr-4 flex flex-row items-center gap-4">
      {/* Floating "Chat with us" Helper - Only shown when scrolled down */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            style={{ opacity, display }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-2xl border border-ink/10 pointer-events-none"
          >
            <motion.div
              animate={{ x: [0, -8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MousePointer2 size={18} className="text-[#075E54] rotate-[135deg] fill-[#075E54]/10" />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ink whitespace-nowrap">Chat with us</span>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  );
}
