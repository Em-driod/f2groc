import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Send } from 'lucide-react';

interface ContactPageProps {
  setView: (view: string) => void;
}

export default function ContactPage({ setView }: ContactPageProps) {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            <div className="flex items-center gap-8 lg:gap-12">
              <div 
                className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                onClick={() => setView('store')}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-ink flex items-center justify-center group-hover:bg-highlight transition-colors">
                  <span className="text-paper font-black text-sm sm:text-base font-bold">F2</span>
                </div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-serif italic font-bold tracking-tight text-ink">Protein & Groceries</span>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
              <button 
                onClick={() => setView('store')}
                className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/60 hover:text-ink transition-colors"
              >
                Store
              </button>
              <button 
                onClick={() => setView('about')}
                className="text-[10px] uppercase tracking-[0.2em] font-black text-ink/60 hover:text-ink transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => setView('contact')}
                className="text-[10px] uppercase tracking-[0.2em] font-black text-highlight"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-paper via-paper to-highlight/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.85] mb-8 tracking-tighter uppercase text-ink">
              Get in <span className="text-highlight">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-ink/60 font-serif italic leading-relaxed mb-12">
              Visit our store or contact us for your authentic African grocery needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            {/* Store Information */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-ink">
                Store <span className="text-highlight">Location</span>
              </h2>
              
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className="w-12 h-12 bg-highlight/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-highlight" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-ink">Address</h3>
                    <p className="text-ink/60 font-serif leading-relaxed">
                      117B Dorchester Road<br />
                      Weymouth, DT4 7LA<br />
                      United Kingdom
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-start gap-6"
                >
                  <div className="w-12 h-12 bg-highlight/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-highlight" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-ink">Service Area</h3>
                    <p className="text-ink/60 font-serif leading-relaxed">
                      We serve customers locally in Weymouth and also online for delivery orders throughout the UK.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-start gap-6"
                >
                  <div className="w-12 h-12 bg-highlight/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-highlight" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-ink">Phone</h3>
                    <p className="text-ink/60 font-serif leading-relaxed">
                      +44 (0) 1305 123456<br />
                      <span className="text-sm">Store hours: Mon-Sat 9AM-7PM</span>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-start gap-6"
                >
                  <div className="w-12 h-12 bg-highlight/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-highlight" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-ink">Email</h3>
                    <p className="text-ink/60 font-serif leading-relaxed">
                      info@f2proteinsandgroceries.co.uk<br />
                      <span className="text-sm">We respond within 24 hours</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-highlight/20 to-ink/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-highlight mx-auto mb-4" />
                    <p className="text-xl font-black uppercase tracking-tighter text-ink">F2 Protein & Groceries</p>
                    <p className="text-ink/60 font-serif">117B Dorchester Road, Weymouth</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-paper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-ink">
              Send us a <span className="text-highlight">Message</span>
            </h2>
            <p className="text-lg text-ink/60 font-serif italic leading-relaxed">
              Have questions about our products or need help with your order? We're here to help!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-line rounded-2xl p-12 shadow-lg"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="label-f2proteinsandgroceries mb-4 block">Name</label>
                  <input
                    type="text"
                    className="input-f2proteinsandgroceries"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="label-f2proteinsandgroceries mb-4 block">Email</label>
                  <input
                    type="email"
                    className="input-f2proteinsandgroceries"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="label-f2proteinsandgroceries mb-4 block">Subject</label>
                <input
                  type="text"
                  className="input-f2proteinsandgroceries"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label className="label-f2proteinsandgroceries mb-4 block">Message</label>
                <textarea
                  rows={6}
                  className="input-f2proteinsandgroceries resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="btn-f2proteinsandgroceries group flex items-center gap-4 mx-auto"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-ink">
              Follow <span className="text-highlight">Us</span>
            </h2>
            <p className="text-lg text-ink/60 font-serif italic leading-relaxed mb-12">
              Stay updated with our latest products and special offers
            </p>
            
            <div className="flex justify-center gap-8">
              <motion.a
                href="https://www.instagram.com/f2proteinsandgroceries"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white border border-line p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 block"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">IG</span>
                  </div>
                  <p className="text-sm font-black uppercase tracking-wider text-ink">@f2proteinsandgroceries</p>
                </div>
              </motion.a>

              <motion.a
                href="https://www.tiktok.com/@f2proteinngroceries_uk"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white border border-line p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 block"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">TT</span>
                  </div>
                  <p className="text-sm font-black uppercase tracking-wider text-ink">@f2proteinngroceries_uk</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-paper py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-ink/20 text-[10px] font-bold uppercase tracking-widest mb-8">
              © 2026 F2 Protein & Groceries. All rights reserved.
            </p>
            <div className="flex justify-center gap-12">
              <a href="https://www.instagram.com/f2proteinsandgroceries" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@f2proteinngroceries_uk" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
