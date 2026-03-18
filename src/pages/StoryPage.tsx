import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Award, Users, Globe, Heart } from 'lucide-react';

interface StoryPageProps {
  setView: (view: string) => void;
}

export default function StoryPage({ setView }: StoryPageProps) {
  const timeline = [
    {
      year: "2018",
      title: "Our Beginning",
      description: "Started as a small family market with a vision to bring authentic African foods to the community.",
      image: "/meat.png"
    },
    {
      year: "2020",
      title: "Growing Strong",
      description: "Expanded our product range and partnered with local farmers across Africa.",
      image: "/plantain.jpeg"
    },
    {
      year: "2022",
      title: "Digital Transformation",
      description: "Launched our online platform to serve customers nationwide with fresh deliveries.",
      image: "/garri.jpeg"
    },
    {
      year: "2024",
      title: "Community Leader",
      description: "Became the trusted source for African groceries, serving thousands of families.",
      image: "/provision.png"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Family Values",
      description: "Every product is selected with the same care we'd use for our own family."
    },
    {
      icon: Globe,
      title: "Authentic Sources",
      description: "Direct partnerships with farmers and producers across Africa."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building connections through food and cultural heritage."
    },
    {
      icon: Award,
      title: "Quality Promise",
      description: "Rigorous standards ensure only the finest products reach your table."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/meat.png"
            alt="Our Story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
        </div>
        
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-6 text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
              From a small family market to your trusted source for authentic African foods
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setView('store')}
                className="bg-white text-ink px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform"
              >
                Shop Our Story
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white hover:text-ink transition-all">
                Watch Video
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6 bg-[#FAF6F0]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black tracking-tighter mb-6">More Than Just Food</h2>
            <p className="text-lg text-ink/70 leading-relaxed">
              F2 Protein 'n' Groceries began with a simple mission: to bring the authentic tastes of Africa to families 
              who crave connection to their heritage. What started as a small corner store has grown into a community 
              landmark, but our values remain unchanged.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-black tracking-tighter mb-4">Our Mission</h3>
              <p className="text-ink/70 leading-relaxed mb-6">
                To preserve and share African culinary traditions by providing access to authentic, high-quality 
                ingredients that connect families to their roots and create new memories around the dinner table.
              </p>
              <h3 className="text-2xl font-black tracking-tighter mb-4">Our Vision</h3>
              <p className="text-ink/70 leading-relaxed">
                To be the bridge between African producers and global communities, ensuring that every kitchen can 
                experience the rich flavors and cultural significance of African cuisine.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src="/provision.png"
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black tracking-tighter mb-4">Our Journey</h2>
            <p className="text-ink/60 text-lg">Milestones that shaped our story</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-ink/20" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="w-1/2" />
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white" />
                
                <div className="w-1/2 px-8">
                  <div className={`bg-[#FAF6F0] rounded-2xl p-8 ${
                    index % 2 === 0 ? 'ml-auto mr-8' : 'mr-auto ml-8'
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-2xl font-black text-accent">{item.year}</span>
                      <h3 className="text-xl font-black tracking-tighter">{item.title}</h3>
                    </div>
                    <p className="text-ink/70 leading-relaxed mb-4">{item.description}</p>
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black tracking-tighter mb-4">Our Values</h2>
            <p className="text-ink/60 text-lg">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-ink text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black tracking-tighter mb-4">{value.title}</h3>
                <p className="text-ink/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-ink text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black tracking-tighter mb-6">Join Our Story</h2>
            <p className="text-xl mb-8 opacity-90">
              Become part of a community that celebrates African culinary heritage every day.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setView('store')}
                className="bg-white text-ink px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-2"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setView('contact')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white hover:text-ink transition-all"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
