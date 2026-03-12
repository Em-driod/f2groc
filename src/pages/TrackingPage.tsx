import React from 'react';
import { motion } from 'motion/react';
import { Star, Users, Truck } from 'lucide-react';
import { Order, Rider } from '../types';

interface TrackingPageProps {
  selectedOrder: Order;
  riders: Rider[];
  setView: (view: string) => void;
}

export default function TrackingPage({
  selectedOrder,
  riders,
  setView
}: TrackingPageProps) {
  return (
    <div className="flex-1 bg-paper py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline mb-24 border-b border-line pb-12">
          <div>
            <div className="label-f2proteinsandgroceries mb-4 text-highlight">Tracking ID: {selectedOrder.id}</div>
            <h1 className="text-6xl font-black uppercase tracking-tighter">In Transit.</h1>
          </div>
          <button 
            onClick={() => setView('store')}
            className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors"
          >
            Exit Tracking
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Status Timeline */}
          <div className="lg:col-span-1 space-y-12">
            <div className="label-f2proteinsandgroceries">Logistics Status</div>
            <div className="space-y-12 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
              {[
                { label: 'Order Confirmed', time: '10:30 AM', status: 'completed' },
                { label: 'Provisions Curated', time: '10:35 AM', status: 'completed' },
                { label: 'Transit Initiated', time: '10:42 AM', status: 'current' },
                { label: 'Final Delivery', time: 'Estimated 11:00 AM', status: 'pending' },
              ].map((step, i) => (
                <div key={i} className="flex gap-8 relative">
                  <div className={`w-4 h-4 z-10 ${
                    step.status === 'completed' ? 'bg-ink' : 
                    step.status === 'current' ? 'bg-highlight animate-pulse' : 
                    'bg-white border border-line'
                  }`} />
                  <div>
                    <div className={`text-[10px] uppercase tracking-widest font-black mb-1 ${
                      step.status === 'pending' ? 'text-ink/20' : 'text-ink'
                    }`}>{step.label}</div>
                    <div className="text-[10px] font-mono font-black text-ink/30">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Driver & Map */}
          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="border border-line p-12 bg-white shadow-2xl">
                <div className="label-f2proteinsandgroceries mb-8 text-highlight">Courier Personnel</div>
                {selectedOrder.riderId ? (
                  <>
                    <div className="flex items-center gap-8 mb-10">
                      <div className="w-24 h-24 bg-paper overflow-hidden border border-line">
                        <img 
                          src={riders.find(r => r.id === selectedOrder.riderId)?.avatar || "https://i.pravatar.cc/100?img=12"} 
                          alt="Driver" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <div className="font-black uppercase tracking-tighter text-3xl mb-1">
                          {riders.find(r => r.id === selectedOrder.riderId)?.name || "Assigning..."}
                        </div>
                        <div className="flex items-center gap-2 text-highlight">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {riders.find(r => r.id === selectedOrder.riderId)?.rating || "5.0"} Rating
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-4 border-b border-line">
                        <span className="text-[10px] uppercase tracking-widest font-black text-ink/30">Current Range</span>
                        <span className="text-[10px] font-mono font-black text-ink">2.4 KM</span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b border-line">
                        <span className="text-[10px] uppercase tracking-widest font-black text-ink/30">Destination</span>
                        <span className="text-[10px] font-mono font-black text-ink">Residence</span>
                      </div>
                    </div>
                    <button className="w-full btn-elite mt-10 py-6 text-[10px] font-black">
                      Secure Contact
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 border border-line flex items-center justify-center mb-6 animate-pulse">
                      <Users className="w-6 h-6 text-ink/20" />
                    </div>
                    <div className="font-black uppercase tracking-tighter text-2xl mb-2">Assigning Courier</div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-ink/30">Optimizing logistics path...</p>
                  </div>
                )}
              </div>

              <div className="border border-line bg-paper overflow-hidden relative min-h-[400px] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" 
                  alt="Map" 
                  className="w-full h-full object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white border border-ink px-8 py-4 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-highlight animate-ping" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black">Courier in Motion</span>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  animate={{ x: [0, 50, 20, 80], y: [0, -30, 10, -50] }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="bg-ink p-4 shadow-2xl">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
