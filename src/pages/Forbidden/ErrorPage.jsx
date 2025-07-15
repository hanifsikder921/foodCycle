import React from "react";
import { Link } from "react-router";
import { FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl text-center"
      >
        <div className="inline-flex items-center justify-center bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-100 rounded-full p-4 mb-6">
          <FiAlertTriangle className="text-4xl" />
        </div>

        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
          404 - Page Not Found
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
