import React from "react";
import { Helmet } from "react-helmet-async";
import {
  FaLeaf,
  FaHandsHelping,
  FaUsers,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Helmet>
        <title> About || FoodCycle</title>
      </Helmet>
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          About <span className="text-green-600">FoodCycle</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            <span className="font-semibold text-green-600">FoodCycle</span> is
            revolutionizing food sustainability by connecting surplus to need.
            We're building a future where no edible food goes to waste while
            hunger persists in our communities.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-green-50 dark:bg-gray-800 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <FaLeaf className="text-4xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Our Core Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            To create an efficient, transparent network that redistributes
            surplus food from businesses and individuals to communities in need,
            reducing both food waste and food insecurity through innovative
            technology and community partnerships.
          </p>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <FaHandsHelping className="text-2xl text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Who We Serve
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Partnering with restaurants, caterers, grocery stores, and food
            producers on one end, and charities, shelters, and community
            organizations on the other. We verify all participants to ensure
            food safety and proper distribution.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-2xl text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              How It Works
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Our platform enables real-time food listings, intelligent matching,
            and logistics coordination. Donors post available surplus,
            recipients request what they need, and our system facilitates
            efficient pickup and delivery.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <FaLightbulb className="text-2xl text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Our Vision
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            To become the national standard for food recovery, creating
            measurable environmental impact through waste reduction while
            addressing food insecurity in every community we serve.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Our Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-green-600">250+</p>
            <p className="text-gray-600 dark:text-gray-300">
              Partner Organizations
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">50K+</p>
            <p className="text-gray-600 dark:text-gray-300">Meals Redirected</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">75+</p>
            <p className="text-gray-600 dark:text-gray-300">Cities Served</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">100K+</p>
            <p className="text-gray-600 dark:text-gray-300">Pounds Saved</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Join the Movement
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Whether you're a business with surplus food, an organization serving
          those in need, or an individual who wants to make a difference — your
          participation creates real change.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Become a Donor
          </button>
          <button className="bg-white hover:bg-gray-100 text-green-600 font-medium py-2 px-6 border border-green-600 rounded-lg transition-colors">
            Partner With Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
