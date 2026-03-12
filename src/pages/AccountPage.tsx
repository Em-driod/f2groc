import React from 'react';
import { ChevronRight, Package, MapPin, CreditCard, Heart, Settings, LogOut, Star } from 'lucide-react';
import { User, Order } from '../types';

interface AccountPageProps {
  user: User;
  orders: Order[];
  setView: (view: string) => void;
  setSelectedOrder: (order: Order) => void;
}

export default function AccountPage({
  user,
  orders,
  setView,
  setSelectedOrder
}: AccountPageProps) {
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
        <div className="flex flex-col md:flex-row gap-24">
          {/* Sidebar */}
          <div className="md:w-1/4 space-y-12">
            <div className="text-center">
              <div className="w-40 h-40 bg-paper overflow-hidden mx-auto mb-8 border border-line">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-ink mb-2">{user.name}</h2>
              <p className="text-[10px] uppercase tracking-widest font-black text-ink/30">{user.email}</p>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'orders', label: 'Order History', icon: Package },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
                { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                { id: 'wishlist', label: 'Wishlist', icon: Heart },
                { id: 'settings', label: 'Account Settings', icon: Settings }
              ].map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink hover:bg-white transition-all group"
                >
                  <item.icon className="w-4 h-4 opacity-30 group-hover:opacity-100" />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => setView('store')}
                className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-black text-highlight hover:bg-white transition-all group mt-8"
              >
                <LogOut className="w-4 h-4 opacity-30 group-hover:opacity-100" />
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-24">
            <section>
              <div className="flex justify-between items-baseline mb-16 border-b border-line pb-8">
                <h2 className="text-5xl font-black uppercase tracking-tighter text-ink">Order History.</h2>
                <div className="label-f2proteinsandgroceries text-highlight">
                  {orders.length} Records
                </div>
              </div>

              <div className="space-y-12">
                {orders.map((order) => (
                  <div key={order.id} className="border border-line p-10 hover:border-ink transition-all bg-white group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 pb-10 border-b border-line">
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-ink flex items-center justify-center">
                          <Package className="w-8 h-8 text-paper" />
                        </div>
                        <div>
                          <div className="font-black uppercase tracking-tighter text-2xl text-ink mb-1">{order.id}</div>
                          <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">{order.date}</div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <span className={`text-[10px] font-black uppercase tracking-widest mb-4 px-3 py-1 border ${
                          order.status === 'delivered' ? 'border-line text-ink/40' : 'border-highlight text-highlight'
                        }`}>
                          {order.status.replace('-', ' ')}
                        </span>
                        <span className="text-4xl font-black tracking-tighter text-ink">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 mb-10">
                      {order.items.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="w-24 h-24 bg-paper overflow-hidden relative group/item">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover/item:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-[10px] font-black">x{item.quantity}</span>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 4 && (
                        <div className="w-24 h-24 bg-paper flex items-center justify-center text-ink/20 font-black text-[10px] uppercase tracking-widest border border-line">
                          +{order.items.length - 4}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-8">
                      <button 
                        onClick={() => {
                          setSelectedOrder(order);
                          setView('tracking');
                        }}
                        className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight hover:tracking-[0.3em] transition-all"
                      >
                        Track Transit
                      </button>
                      <button className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors">
                        Order Details
                      </button>
                      <button className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors">
                        Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
