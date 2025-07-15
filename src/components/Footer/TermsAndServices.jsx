import React from "react";
import {
  FiFileText,
  FiAlertTriangle,
  FiLock,
  FiUser,
  FiShield,
} from "react-icons/fi";
import { Link } from "react-router";

const TermsAndServices = () => {

      const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <FiFileText className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-4">
            By accessing or using the{" "}
            <strong className="text-green-600">FoodCycle</strong> platform, you
            agree to be bound by these Terms of Service. If you do not agree to
            all terms, you may not access or use our services.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r">
            <p className="text-yellow-700 dark:text-yellow-300">
              <strong>Important:</strong> These terms contain provisions that
              limit our liability and govern how disputes are resolved.
            </p>
          </div>
        </>
      ),
    },
    {
      title: "Service Description",
      icon: <FiFileText className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-4">
            FoodCycle provides a platform that connects food donors
            (restaurants, grocery stores, individuals) with charitable
            organizations and individuals in need of food assistance.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-5 marker:text-green-500">
            <li>
              We facilitate food donations but are not responsible for food
              quality
            </li>
            <li>All food transactions are between donors and recipients</li>
            <li>We do not guarantee availability of donations</li>
          </ul>
        </>
      ),
    },
    {
      title: "User Responsibilities",
      icon: <FiUser className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-3">As a FoodCycle user, you agree to:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                For Donors
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Provide accurate descriptions of donated food</li>
                <li>Ensure food is safe and properly stored</li>
                <li>Comply with all food safety regulations</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                For Recipients
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Use food only for intended purposes</li>
                <li>Pick up food at agreed times</li>
                <li>Provide accurate information about needs</li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Prohibited Conduct",
      icon: <FiAlertTriangle className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-3">You may not use FoodCycle to:</p>
          <ul className="list-disc list-inside space-y-2 pl-5 marker:text-red-500">
            <li>Post false or misleading information</li>
            <li>Resell donated food for profit</li>
            <li>Harass other users</li>
            <li>Violate any laws or regulations</li>
            <li>Damage our platform or services</li>
          </ul>
        </>
      ),
    },
    {
      title: "Liability Limitations",
      icon: <FiShield className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-4">
            FoodCycle acts as a connection platform only. We are not responsible
            for:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Aspect
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Limitation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Food Quality
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    We do not inspect or guarantee food safety
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Transactions
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    We are not party to food exchanges
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Service Availability
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    We don't guarantee uninterrupted service
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },
    {
      title: "Account Termination",
      icon: <FiLock className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-4">
            We reserve the right to suspend or terminate accounts that violate
            these terms. You may terminate your account at any time by
            contacting us.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
            <p className="text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> Certain provisions (like liability
              limitations) survive account termination.
            </p>
          </div>
        </>
      ),
    },
    {
      title: "Changes to Terms",
      content: (
        <>
          <p className="mb-4">
            We may update these terms periodically. Continued use after changes
            constitutes acceptance. We'll notify you of significant changes via
            email or platform notification.
          </p>
          <p>
            The "Last Updated" date at the top of this page indicates when terms
            were last revised.
          </p>
        </>
      ),
    },
    {
      title: "Governing Law",
      content: (
        <>
          <p>
            These terms are governed by the laws of [Your Jurisdiction]. Any
            disputes will be resolved in the courts located in [Your
            Jurisdiction].
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Terms of Service
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Last updated: July 14, 2025
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Please read these terms carefully before using FoodCycle services.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {sections.map((section, index) => (
          <section
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
          >
            <div className="flex items-center mb-6">
              {section.icon && (
                <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg mr-4">
                  {section.icon}
                </div>
              )}
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h2>
            </div>
            <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {section.content}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 underline hover:text-green-600 duration-300">
            <Link onClick={handleScrollToTop} to='/contact'>Contact Us</Link>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            For questions about these Terms of Service, please contact:
          </p>
          <p className="font-medium text-gray-900 dark:text-white">
            contact@foodcycle.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndServices;
