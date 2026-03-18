import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Clock, ShieldCheck, MapPin, CreditCard, Calendar, Truck, ArrowLeft } from 'lucide-react';
import { CartItem, DeliveryZone } from '../types';

interface CheckoutPageProps {
  checkoutData: {
    address: string;
    city: string;
    timeSlot: string;
    paymentMethod: string;
    zoneId: string;
  };
  setCheckoutData: (data: any) => void;
  cart: CartItem[];
  cartTotal: number;
  deliveryZones: DeliveryZone[];
  timeSlots: string[];
  paymentMethods: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  handlePlaceOrder: () => void;
  setView: (view: string) => void;
}

export default function CheckoutPage({
  checkoutData,
  setCheckoutData,
  cart,
  cartTotal,
  deliveryZones,
  timeSlots,
  paymentMethods,
  handlePlaceOrder,
  setView
}: CheckoutPageProps) {
  const selectedZone = deliveryZones.find(z => z.id === checkoutData.zoneId);
  const deliveryFee = selectedZone?.fee || 0;
  const totalWithDelivery = cartTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-white to-[#F8F9FA]">
      {/* Elite Header */}
      <div className="bg-white border-b border-ink/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setView('store')}
            className="group flex items-center gap-2 text-ink/60 hover:text-ink transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-medium uppercase tracking-[0.3em]">Back to Collection</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Secure <span className="text-accent">Checkout</span>
          </h1>
          <p className="text-lg text-ink/50 max-w-xl mx-auto">
            Complete your order with our premium delivery service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Delivery Information */}
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Delivery Information</h2>
                  <p className="text-sm text-ink/60">Where should we deliver your order?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-ink/70 block mb-2">
                    Street Address
                  </label>
                  <input 
                    type="text" 
                    placeholder="123 Market Street"
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-ink/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-300 text-base font-medium"
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-ink/70 block mb-2">
                    City
                  </label>
                  <input 
                    type="text" 
                    placeholder="San Francisco"
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-ink/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-300 text-base font-medium"
                    value={checkoutData.city}
                    onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                  />
                </div>
              </div>
            </motion.section>

            {/* Step 2: Delivery Zone */}
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Delivery Zone</h2>
                  <p className="text-sm text-ink/60">Select your delivery area</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deliveryZones.map((zone) => (
                  <motion.button
                    key={zone.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCheckoutData({...checkoutData, zoneId: zone.id})}
                    className={`relative p-4 border rounded-xl transition-all duration-300 text-left group ${
                      checkoutData.zoneId === zone.id 
                        ? 'border-accent bg-accent/5 shadow-md' 
                        : 'border-ink/10 hover:border-ink/30 bg-[#FAFAFA]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-base font-semibold mb-1">{zone.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-ink/60">
                          <Clock className="w-3 h-3" />
                          {zone.estimatedTime}
                        </div>
                      </div>
                      <div className={`text-lg font-semibold transition-colors ${
                        checkoutData.zoneId === zone.id ? 'text-accent' : 'text-ink/40'
                      }`}>
                        ${zone.fee.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.1em] text-ink/50">
                      Delivery Fee
                    </div>
                    {checkoutData.zoneId === zone.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-accent" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.section>

            {/* Step 3: Delivery Time */}
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Delivery Time</h2>
                  <p className="text-sm text-ink/60">Choose your preferred time slot</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCheckoutData({...checkoutData, timeSlot: slot})}
                    className={`relative p-4 border rounded-xl transition-all duration-300 text-left group ${
                      checkoutData.timeSlot === slot 
                        ? 'border-accent bg-accent/5 shadow-md' 
                        : 'border-ink/10 hover:border-ink/30 bg-[#FAFAFA]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold">{slot}</span>
                      {checkoutData.timeSlot === slot && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-accent"
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.section>

            {/* Step 4: Payment Method */}
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Payment Method</h2>
                  <p className="text-sm text-ink/60">Select your payment option</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCheckoutData({...checkoutData, paymentMethod: method.id})}
                    className={`relative p-4 border rounded-xl transition-all duration-300 text-left group ${
                      checkoutData.paymentMethod === method.id 
                        ? 'border-accent bg-accent/5 shadow-md' 
                        : 'border-ink/10 hover:border-ink/30 bg-[#FAFAFA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <h3 className="text-base font-semibold mb-1">{method.name}</h3>
                        <p className="text-xs uppercase tracking-[0.1em] text-ink/50">
                          Secure Processing
                        </p>
                      </div>
                    </div>
                    {checkoutData.paymentMethod === method.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-accent" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-ink/5 p-6 lg:sticky lg:top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Order Summary</h2>
                  <p className="text-sm text-ink/60">{cart.length} items</p>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex gap-3 p-3 bg-[#FAFAFA] rounded-xl"
                  >
                    <div className="w-12 h-12 bg-ink/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold mb-1 truncate">{item.name}</h4>
                      <p className="text-xs text-ink/50">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-base font-semibold flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 pt-4 border-t border-ink/10">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink/60">Subtotal</span>
                  <span className="text-base font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink/60">Delivery</span>
                  <span className="text-base font-semibold text-accent">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-ink/10">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-accent">
                    ${totalWithDelivery.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Complete Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={!checkoutData.address || !checkoutData.city || !checkoutData.zoneId || !checkoutData.timeSlot || !checkoutData.paymentMethod}
                className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                  !checkoutData.address || !checkoutData.city || !checkoutData.zoneId || !checkoutData.timeSlot || !checkoutData.paymentMethod
                    ? 'bg-ink/10 text-ink/30 cursor-not-allowed'
                    : 'bg-ink text-white hover:bg-accent shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Complete Secure Order
                </div>
              </motion.button>

              <p className="text-center text-xs text-ink/30 mt-4 uppercase tracking-[0.1em]">
                Protected by 256-bit SSL encryption
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
