import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Custom green marker icon
const foodIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const ServiceArea = () => {
  const serviceLocations = [
    {
      id: 1,
      name: 'Mohammadpur Kitchen Hub',
      position: [23.7603, 90.3625],
      description: 'Primary distribution center serving 200+ meals daily',
    },
    {
      id: 2,
      name: 'Mirpur Food Bank',
      position: [23.8, 90.3685],
      description: 'Donation collection point open Mon-Fri',
    },
    {
      id: 3,
      name: 'Dhanmondi Community Center',
      position: [23.7457, 90.37],
      description: 'Weekly food redistribution hub',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Our <span className="text-green-600 dark:text-green-400">Service Coverage</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 flex justify-center"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
          </motion.div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Currently serving key areas in Dhaka with plans to expand
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={12}
            style={{ height: '500px', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {serviceLocations.map((location) => (
              <Marker key={location.id} position={location.position} icon={foodIcon}>
                <Popup className="custom-popup font-sans">
                  <div className="dark:text-gray-800">
                    <h3 className="font-bold text-green-700 text-lg">{location.name}</h3>
                    <p className="text-gray-600 mt-1">{location.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="block">
                        📍 {location.position[0].toFixed(4)}, {location.position[1].toFixed(4)}
                      </span>
                      <button className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition">
                        View Schedule
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {serviceLocations.map((location) => (
            <motion.div
              key={location.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <FaMapMarkerAlt className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {location.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{location.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceArea;
