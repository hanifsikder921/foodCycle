import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rahim Khan',
      role: 'Local Restaurant Owner',
      content:
        'FoodCycle helped us redistribute over 200kg of excess food last month. Their platform is incredibly efficient and their team is very professional.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      name: 'Fatima Begum',
      role: 'Community Center Director',
      content:
        'We receive regular donations through FoodCycle that help us feed 50+ homeless people daily. The process is seamless and reliable.',
      rating: 4,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 3,
      name: 'Arif Hasan',
      role: 'Food Donor',
      content:
        'As a catering business, we often have leftover food. FoodCycle makes it so easy to connect with organizations that can use it rather than wasting it.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    {
      id: 4,
      name: 'Nusrat Jahan',
      role: 'Volunteer',
      content:
        "I've been volunteering with FoodCycle for 6 months. Seeing the impact we make in reducing food waste and helping people is incredibly rewarding.",
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="text-green-600 dark:text-green-400">Community Says</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hear from donors, recipients, and volunteers about their FoodCycle experience
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 flex justify-center"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full object-cover border-2 border-green-100 dark:border-green-900/50"
                    src={review.image}
                    alt={review.name}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {review.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{review.role}</p>
                </div>
              </div>

              <div className="mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`inline ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>

              <div className="relative">
                <FaQuoteLeft className="absolute -top-2 left-0 text-green-100 dark:text-green-900/20 text-3xl" />
                <p className="text-gray-600 dark:text-gray-300 pl-8 relative z-10">
                  {review.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg">
            Share Your Experience
          </button>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Over 200+ positive reviews from our community
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
