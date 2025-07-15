import React from 'react';
import { FaLeaf, FaUtensils, FaUsers, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 }
  }
};

const gradientVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

const CommunitySection = () => {
  const stories = [
    {
      title: "Fresh Eats Diner",
      quote: "We've reduced our food waste by 75% while feeding 200+ people weekly through the platform.",
      stat: "450 kg donated last month",
      icon: <FaUtensils className="h-16 w-16 text-orange-400 dark:text-orange-300" />,
      gradient: "from-orange-100 to-pink-100 dark:from-gray-700 dark:to-gray-600"
    },
    {
      title: "Hope Community Kitchen",
      quote: "This platform helps us serve 300 nutritious meals daily to homeless shelters across the city.",
      stat: "1,200+ meals served weekly",
      icon: <FaUsers className="h-16 w-16 text-blue-400 dark:text-blue-300" />,
      gradient: "from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600"
    },
    {
      title: "Green Valley Restaurant",
      quote: "We've achieved zero food waste while building meaningful connections with local charities.",
      stat: "100% waste reduction",
      icon: <FaLeaf className="h-16 w-16 text-green-400 dark:text-green-300" />,
      gradient: "from-green-100 to-teal-100 dark:from-gray-700 dark:to-gray-600"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Community Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Inspiring stories from our partners and beneficiaries
          </p>
          <div className="mt-6 flex justify-center">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stories.map((story, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
            >
              <motion.div
                variants={gradientVariants}
                className={`h-48 bg-gradient-to-r ${story.gradient} flex items-center justify-center`}
              >
                {story.icon}
              </motion.div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {story.title}
                </h3>
                <motion.p 
                  whileHover={{ color: "#4b5563" }}
                  className="text-gray-600 dark:text-gray-300 mb-4"
                >
                  "{story.quote}"
                </motion.p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FaChartLine className="mr-2 text-green-500" />
                  </motion.div>
                  <span>{story.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;