import React from 'react';
import { motion } from 'motion/react';
import { DeliveryZone } from '../types';

interface SuccessPageProps {
  deliveryZones: DeliveryZone[];
  checkoutData: {
    zoneId: string;
  };
  orders: any[];
  setSelectedOrder: (order: any) => void;
  setView: (view: string) => void;
  setCart: (cart: any[]) => void;
}

export default function SuccessPage({
  deliveryZones,
  checkoutData,
  orders,
  setSelectedOrder,
  setView,
  setCart
}: SuccessPageProps) {
  return (
    <div className="flex-1 bg-paper flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center"
      >
        <div className="label-f2proteinsandgroceries mb-12 text-highlight">Order Confirmed</div>
        <h1 className="text-8xl font-black uppercase tracking-tighter mb-12">Provisions Secured.</h1>
        <p className="text-sm font-medium text-ink/40 mb-16 leading-relaxed">
          Your selection has been curated and is now being prepared for transit. 
          Expect arrival in approximately {deliveryZones.find(z => z.id === checkoutData.zoneId)?.estimatedTime || '30 minutes'}.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => {
              setSelectedOrder(orders[0]);
              setView('tracking');
              setCart([]);
            }}
            className="btn-elite px-12 py-6"
          >
            Track Transit
          </button>
          <button 
            onClick={() => { setView('store'); setCart([]); }}
            className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors"
          >
            Return to Store
          </button>
        </div>
      </motion.div>
    </div>
  );
}
