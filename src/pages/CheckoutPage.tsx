import React from 'react';
import { ChevronRight, Clock, ShieldCheck } from 'lucide-react';
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
  return (
    <div className="flex-1 bg-paper py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setView('store')}
          className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink mb-12 transition-colors flex items-center gap-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Return to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-24">
            {/* Delivery Address */}
            <section>
              <div className="label-f2proteinsandgroceries mb-8 text-highlight">01 — Destination</div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Shipping.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="label-f2proteinsandgroceries">Street Address</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 123 Market Street"
                    className="input-f2proteinsandgroceries text-2xl font-black uppercase tracking-tighter"
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="label-f2proteinsandgroceries">City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. San Francisco"
                    className="input-f2proteinsandgroceries text-2xl font-black uppercase tracking-tighter"
                    value={checkoutData.city}
                    onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                  />
                </div>
              </div>
            </section>

            {/* Delivery Zone */}
            <section>
              <div className="label-f2proteinsandgroceries mb-8 text-highlight">02 — Logistics</div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Zone.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {deliveryZones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setCheckoutData({...checkoutData, zoneId: zone.id})}
                    className={`p-10 border transition-all text-left flex flex-col justify-between gap-6 ${
                      checkoutData.zoneId === zone.id 
                        ? 'border-ink bg-white shadow-2xl ring-1 ring-ink' 
                        : 'border-line hover:border-ink/30'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-black uppercase tracking-tighter text-2xl">{zone.name}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-highlight">${zone.fee.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-black flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {zone.estimatedTime}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Delivery Time */}
            <section>
              <div className="label-f2proteinsandgroceries mb-8 text-highlight">03 — Schedule</div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Time.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setCheckoutData({...checkoutData, timeSlot: slot})}
                    className={`px-10 py-8 border transition-all text-left flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-black ${
                      checkoutData.timeSlot === slot 
                        ? 'border-ink bg-white shadow-2xl text-ink ring-1 ring-ink' 
                        : 'border-line hover:border-ink/30 text-ink/40'
                    }`}
                  >
                    {slot}
                    {checkoutData.timeSlot === slot && <ShieldCheck className="w-4 h-4 text-highlight" />}
                  </button>
                ))}
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <div className="label-f2proteinsandgroceries mb-8 text-highlight">04 — Settlement</div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Payment.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setCheckoutData({...checkoutData, paymentMethod: method.id})}
                    className={`p-10 border transition-all flex items-center gap-8 ${
                      checkoutData.paymentMethod === method.id 
                        ? 'border-ink bg-white shadow-2xl ring-1 ring-ink' 
                        : 'border-line hover:border-ink/30'
                    }`}
                  >
                    <span className="text-4xl">{method.icon}</span>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-[0.2em] font-black mb-1">{method.name}</div>
                      <div className="text-[8px] opacity-30 uppercase tracking-[0.2em] font-black">Secure Gateway</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-ink p-12 sticky top-32 bg-white shadow-2xl">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10">Summary.</h2>
              <div className="space-y-8 mb-10 max-h-64 overflow-y-auto pr-4 no-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-paper overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-black uppercase tracking-tighter text-lg">{item.name}</div>
                        <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <span className="font-black tracking-tighter text-xl">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-line mb-10">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-ink/40">
                  <span>Subtotal</span>
                  <span className="text-ink">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-ink/40">
                  <span>Logistics</span>
                  <span className="text-highlight">
                    ${(deliveryZones.find(z => z.id === checkoutData.zoneId)?.fee || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-5xl font-black tracking-tighter text-ink pt-8 border-t border-line">
                  <span>Total</span>
                  <span>${(cartTotal + (deliveryZones.find(z => z.id === checkoutData.zoneId)?.fee || 0)).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={!checkoutData.address || !checkoutData.timeSlot}
                className="w-full btn-elite py-8 text-sm font-black"
              >
                Complete Order
              </button>
              <p className="text-center text-[8px] text-ink/20 mt-6 font-black uppercase tracking-[0.2em]">
                Secure checkout powered by Elite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
