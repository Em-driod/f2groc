import React from 'react';
import { 
  X, 
  ChevronRight, 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Truck, 
  Users, 
  Settings,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import { Order, Product, User } from '../types';

interface AdminPageProps {
  adminTab: string;
  setAdminTab: (tab: string) => void;
  setView: (view: string) => void;
  salesData: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    lowStockProducts: Product[];
  };
  orders: Order[];
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddProduct: () => void;
}

export default function AdminPage({
  adminTab,
  setAdminTab,
  setView,
  salesData,
  orders,
  products,
  onEditProduct,
  onDeleteProduct,
  onAddProduct
}: AdminPageProps) {
  return (
    <div className="flex-1 bg-paper min-h-screen flex flex-col">
      {/* Admin Header - Mobile First */}
      <header className="bg-ink text-white p-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black uppercase tracking-tighter">F2G</span>
            <div className="text-[8px] uppercase tracking-[0.2em] font-black text-white/60">Admin</div>
          </div>
          <button 
            onClick={() => setView('store')}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-80 bg-ink text-white flex flex-col">
          <div className="hidden md:block p-12 border-b border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-black uppercase tracking-tighter">f2proteinsandgroceries</span>
              <div className="label-f2proteinsandgroceries border-highlight text-highlight">Admin</div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">System Control</div>
          </div>
          
          <nav className="flex-1 p-4 md:p-8 space-y-2">
            {[
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'products', label: 'Inventory', icon: Package },
              { id: 'logistics', label: 'Logistics', icon: Truck },
              { id: 'users', label: 'Personnel', icon: Users },
              { id: 'settings', label: 'System', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                className={`w-full flex items-center gap-3 md:gap-4 px-4 md:px-8 py-3 md:py-5 transition-all ${
                  adminTab === item.id 
                    ? 'bg-highlight text-paper' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-black">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 md:p-8 border-t border-white/10">
            <button 
              onClick={() => setView('store')}
              className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-8 py-3 md:py-5 text-white/40 hover:text-white transition-all group"
            >
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-2 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">Exit Portal</span>
            </button>
          </div>
        </aside>

        {/* Admin Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-24 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {adminTab === 'dashboard' ? (
              <div className="space-y-16 md:space-y-24">
                <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-line pb-8 md:pb-12">
                  <div>
                    <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-ink mb-4">System.</h1>
                    <p className="text-sm font-medium text-ink/40">Operational status: Optimal</p>
                  </div>
                  <div className="label-f2proteinsandgroceries text-highlight">March 12, 2026</div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                  {[
                    { label: 'Total Revenue', value: `$${salesData.totalRevenue.toFixed(2)}`, icon: BarChart3 },
                    { label: 'Total Orders', value: salesData.totalOrders, icon: Package },
                    { label: 'Total Customers', value: salesData.totalCustomers, icon: Users },
                    { label: 'Low Stock', value: salesData.lowStockProducts.length, icon: AlertCircle }
                  ].map((stat, idx) => (
                    <div key={idx} className="border border-line p-6 md:p-10 bg-white group hover:border-highlight transition-all">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-ink flex items-center justify-center mb-6 md:mb-8 group-hover:bg-highlight transition-colors">
                        <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-paper" />
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/30 mb-2">{stat.label}</div>
                      <div className="text-3xl md:text-5xl font-black tracking-tighter text-ink">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Orders Table */}
                <section>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-4 mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-ink">Recent Transactions</h2>
                    <button onClick={() => setAdminTab('orders')} className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight hover:tracking-[0.3em] transition-all underline underline-offset-8">View All</button>
                  </div>
                  <div className="bg-white border border-line rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/30 border-b border-line">
                            <th className="p-4 md:pb-8">Identifier</th>
                            <th className="p-4 md:pb-8">Entity</th>
                            <th className="p-4 md:pb-8">Timestamp</th>
                            <th className="p-4 md:pb-8">Value</th>
                            <th className="p-4 md:pb-8">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {orders.slice(0, 5).map((order) => (
                            <tr key={order.id} className="group hover:bg-gray-50 transition-colors">
                              <td className="p-4 md:py-10 font-mono text-[10px] font-black text-ink">{order.id}</td>
                              <td className="p-4 md:py-10 font-black uppercase tracking-tighter text-sm md:text-lg text-ink">Private Client</td>
                              <td className="p-4 md:py-10 text-[10px] uppercase tracking-widest font-black text-ink/40">{order.date}</td>
                              <td className="p-4 md:py-10 font-black tracking-tighter text-lg md:text-2xl text-ink">${order.total.toFixed(2)}</td>
                              <td className="p-4 md:py-10">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border ${
                                  order.status === 'delivered' ? 'border-line text-ink/20' : 'border-highlight text-highlight'
                                }`}>
                                  {order.status.replace('-', ' ')}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            ) : adminTab === 'products' ? (
              <div className="space-y-24">
                <header className="flex justify-between items-end border-b border-line pb-12">
                  <div>
                    <h1 className="text-7xl font-black uppercase tracking-tighter text-ink mb-4">Inventory.</h1>
                    <p className="text-sm font-medium text-ink/40">Manage your curated collection and stock levels.</p>
                  </div>
                  <button 
                    onClick={onAddProduct}
                    className="btn-f2proteinsandgroceries px-12 py-6"
                  >
                    Add Selection
                  </button>
                </header>

                <div className="border border-line bg-white overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/30 border-b border-line bg-paper/50">
                          <th className="p-10">Product Selection</th>
                          <th className="p-10">Classification</th>
                          <th className="p-10">Valuation</th>
                          <th className="p-10">Stock Status</th>
                          <th className="p-10 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {products.map((product) => (
                          <tr key={product.id} className="group hover:bg-paper transition-colors">
                            <td className="p-10">
                              <div className="flex items-center gap-8">
                                <div className="w-20 h-20 bg-paper overflow-hidden">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="font-black uppercase tracking-tighter text-2xl text-ink mb-1">{product.name}</div>
                                  <div className="text-[10px] uppercase tracking-widest font-black text-ink/30">{product.unit}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-10">
                              <span className="text-[10px] uppercase tracking-widest font-black text-ink/40 px-3 py-1 bg-line">
                                {product.category}
                              </span>
                            </td>
                            <td className="p-10 font-black tracking-tighter text-2xl text-ink">${product.price.toFixed(2)}</td>
                            <td className="p-10">
                              <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 ${product.stock > 10 ? 'bg-ink' : 'bg-highlight'}`} />
                                <span className="text-[10px] uppercase tracking-widest font-black text-ink/40">{product.stock} Units</span>
                              </div>
                            </td>
                            <td className="p-10 text-right">
                              <div className="flex justify-end gap-8">
                                <button 
                                  onClick={() => onEditProduct(product)}
                                  className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/40 hover:text-ink transition-colors"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => onDeleteProduct(product.id)}
                                  className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight/40 hover:text-highlight transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-32">
                <div className="label-f2proteinsandgroceries mb-8">Coming Soon</div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-ink mb-8">{adminTab} Module</h2>
                <p className="text-sm font-medium text-ink/40">This section is under development.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
