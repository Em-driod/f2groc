import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, User, Heart } from 'lucide-react';

interface JournalPageProps {
  setView: (view: string) => void;
}

export default function JournalPage({ setView }: JournalPageProps) {
  const posts = [
    {
      id: 1,
      title: "Traditional Jollof Rice: A Complete Guide",
      excerpt: "Master the art of perfect Jollof rice with our step-by-step guide passed down through generations.",
      image: "/meat.png",
      category: "Recipes",
      date: "March 15, 2024",
      readTime: "8 min read",
      author: "Chef Amara",
      featured: true
    },
    {
      id: 2,
      title: "The Health Benefits of African Superfoods",
      excerpt: "Discover the nutritional powerhouse of traditional African ingredients and their modern health benefits.",
      image: "/plantain.jpeg",
      category: "Health",
      date: "March 12, 2024",
      readTime: "5 min read",
      author: "Dr. Kofi"
    },
    {
      id: 3,
      title: "Sourcing Authentic African Spices",
      excerpt: "Behind the scenes: How we source the finest spices directly from local farmers across Africa.",
      image: "/freshscotchpepper.jpeg",
      category: "Sourcing",
      date: "March 10, 2024",
      readTime: "6 min read",
      author: "Team F2"
    },
    {
      id: 4,
      title: "Meal Prep Sunday: African Edition",
      excerpt: "Plan your week with delicious and nutritious African-inspired meal prep ideas.",
      image: "/garri.jpeg",
      category: "Lifestyle",
      date: "March 8, 2024",
      readTime: "10 min read",
      author: "Chef Ngozi"
    }
  ];

  const categories = ["All", "Recipes", "Health", "Sourcing", "Lifestyle"];

  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-ink">
              Our Journal
            </h1>
            <p className="text-xl md:text-2xl text-ink/60 mb-8 max-w-2xl mx-auto">
              Stories, recipes, and insights from the heart of African cuisine
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {posts[0].featured && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    Featured
                  </span>
                  <span className="text-ink/60 text-sm">{posts[0].category}</span>
                </div>
                <h2 className="text-4xl font-black tracking-tighter mb-4">{posts[0].title}</h2>
                <p className="text-ink/70 leading-relaxed mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center gap-6 mb-6 text-sm text-ink/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {posts[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {posts[0].readTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {posts[0].author}
                  </div>
                </div>
                <button className="bg-ink text-white px-6 py-3 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-2">
                  Read Full Story
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-wider transition-all ${
                  category === "All"
                    ? "bg-ink text-white"
                    : "bg-white text-ink border border-ink/20 hover:bg-ink hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-accent text-xs font-black uppercase tracking-wider">
                      {post.category}
                    </span>
                    <button className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-white transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-xl font-black tracking-tighter mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-ink/70 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-ink/60">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-ink text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform">
              Load More Stories
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-ink text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black tracking-tighter mb-6">Stay Connected</h2>
            <p className="text-xl mb-8 opacity-90">
              Get weekly recipes, stories, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-ink placeholder:text-ink/40"
              />
              <button className="bg-white text-ink px-6 py-3 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
