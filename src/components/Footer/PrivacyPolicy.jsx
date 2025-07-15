import React from "react";
import { FiShield, FiDatabase, FiKey, FiMail, FiUser } from "react-icons/fi";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      icon: <FiShield className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-4">
            At <strong className="text-green-600">FoodCycle</strong>, we are committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use our platform.
          </p>
          <p>
            By accessing or using FoodCycle, you agree to the terms of this Privacy Policy. If you do not agree with our policies, please do not use our services.
          </p>
        </>
      )
    },
    {
      title: "Information We Collect",
      icon: <FiDatabase className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-3">We collect several types of information to provide and improve our services:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Personal Information</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Full name and contact details</li>
                <li>Email address and phone number</li>
                <li>Organization information (if applicable)</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Usage Data</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and interactions</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      title: "How We Use Your Information",
      icon: <FiUser className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-3">We use the collected data for various purposes:</p>
          <ul className="list-disc list-inside space-y-2 pl-5 marker:text-green-500">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </>
      )
    },
    {
      title: "Data Security",
      icon: <FiKey className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to maintain the safety of your personal data, including encryption, access controls, and regular security assessments.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
            <p className="text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </div>
        </>
      )
    },
    {
      title: "Your Rights",
      content: (
        <>
          <p className="mb-3">You have certain rights regarding your personal data:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Right</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Access</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Request copies of your personal data</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Rectification</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Request correction of inaccurate data</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Erasure</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Request deletion of your personal data</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Restriction</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Request restriction of processing</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Portability</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Request transfer of your data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      title: "Contact Us",
      icon: <FiMail className="w-5 h-5" />,
      content: (
        <>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact our Data Protection Officer:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-w-md">
            <p className="font-medium text-gray-900 dark:text-white mb-1">FoodCycle Privacy Team</p>
            <p className="text-gray-600 dark:text-gray-400 mb-1">Email: privacy@foodcycle.org</p>
            <p className="text-gray-600 dark:text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Last updated: July 14, 2025
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            This policy describes how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {sections.map((section, index) => (
          <section key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
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

    
    </div>
  );
};

export default PrivacyPolicy;