import React from 'react';
import { FaLeaf, FaUsers } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import { motion } from "framer-motion";

const ImpactSection = () => {
  const stats = [
    {
      icon: <GiMeal className="h-8 w-8" />,
      value: "12,540+",
      label: "Meals Saved",
      color: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400"
      },
      animation: {
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }
    },
    {
      icon: <IoFastFoodOutline className="h-8 w-8" />,
      value: "8,250+",
      label: "Kg Food Donated",
      color: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400"
      },
      animation: {
        y: [0, -5, 5, 0]
      }
    },
    {
      icon: <FaLeaf className="h-8 w-8" />,
      value: "3,120+",
      label: "Kg CO₂ Reduced",
      color: {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-600 dark:text-yellow-400"
      },
      animation: {
        scale: [1, 1.1, 1],
        transition: { duration: 2 }
      }
    },
    {
      icon: <FaUsers className="h-8 w-8" />,
      value: "240+",
      label: "Partners",
      color: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400"
      },
      animation: {
        rotate: [0, 3, -3, 0],
        transition: { duration: 3 }
      }
    }
  ];

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
            Our Collective Impact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Measuring the difference we're making together
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center hover:shadow-lg"
            >
              <motion.div
                animate={stat.animation}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${stat.color.bg} ${stat.color.text} mb-4`}
              >
                {stat.icon}
              </motion.div>
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </h3>
              <motion.p 
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 dark:text-gray-300"
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;