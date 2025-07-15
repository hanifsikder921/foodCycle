import React from "react";
import { FiSearch, FiClipboard, FiTruck, FiSmile } from "react-icons/fi";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "Browse Donations",
      description:
        "Explore available food donations in your area from restaurants and donors. Filter by location, type, or availability.",
      color: "text-green-500",
      bgColor: "bg-green-50",
      delay: 0.1,
    },
    {
      icon: <FiClipboard className="w-8 h-8" />,
      title: "Request Food",
      description:
        "Found a match? Submit a quick request explaining your need. Our system will notify the donor instantly.",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      delay: 0.2,
    },
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Schedule Pickup",
      description:
        "If approved, schedule a convenient pickup time. Ensure you arrive within the agreed window to collect your food.",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      delay: 0.3,
    },

    {
      icon: <FiSmile className="w-8 h-8" />,
      title: "Reduce Waste",
      description:
        "Enjoy the meal or distribute to those in need. You're actively reducing food waste and feeding communities.",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      delay: 0.4,
    },
  ];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          How <span className="text-green-600">FoodCycle</span> Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Our simple 4-step process connects surplus food with those who need it
          most, creating sustainable communities.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            custom={step.delay}
            whileHover={{ y: -5 }}
            className="flex flex-col h-full"
          >
            <div
              className={`${step.bgColor} dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full`}
            >
              <div>
                <div
                  className={`w-16 h-16 ${step.bgColor} dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto`}
                >
                  <div className={`${step.color} dark:text-white`}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {step.description}
                </p>
              </div>
            </div>

            {index < steps.length  && (
              <div className="hidden lg:flex items-center justify-center mt-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg
                    className={`w-5 h-5 ${step.color} dark:text-gray-400`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center"
      >
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Ready to make a difference?
        </h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-colors">
            Join as a Donor
          </button>
          <button className="px-8 py-3 bg-white hover:bg-gray-100 text-green-600 font-medium border border-green-600 rounded-full transition-colors">
            Request Food
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
