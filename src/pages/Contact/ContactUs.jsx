import React from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // TODO: Replace with actual API integration
    console.log("Form Data:", data);
    Swal.fire({
      title: "Response Recorded",
      icon: "success",
      draggable: true,
    });
    reset();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Helmet>
        <title> Contact || FoodCycle</title>
      </Helmet>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Get in <span className="text-green-600">Touch</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions about FoodCycle? Want to partner with us? We're here to
          help and would love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <FiMail className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    Email Address
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    support@foodcycle.org
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    partners@foodcycle.org
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <FiPhone className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    Phone Numbers
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +880-123-456-7890 (Support)
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    +880-987-654-3210 (Partnerships)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <FiMapPin className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    Our Headquarters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    FoodCycle HQ, Dhanmondi 27
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-10">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <FaFacebook className="text-gray-700 dark:text-gray-300 text-xl" />
                </a>
                <a
                  href="#"
                  className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <FaTwitter className="text-gray-700 dark:text-gray-300 text-xl" />
                </a>
                <a
                  href="#"
                  className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <FaLinkedin className="text-gray-700 dark:text-gray-300 text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-green-50 dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Office Hours
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                {...register("name", { required: "Name is required" })}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                {...register("subject")}
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
                {...register("message", { required: "Message is required" })}
                placeholder="Write your message here..."
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FiSend />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
