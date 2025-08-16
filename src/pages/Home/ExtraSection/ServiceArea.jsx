import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Custom marker icon
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
  // Multiple locations with real FoodCycle service areas in Dhaka
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
    <section className="py-16 bg-gray-50 dark:bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Our Service Coverage</h2>
          <p className="mt-4 text-xl text-gray-100 max-w-3xl mx-auto">
            Currently serving key areas in Dhaka with plans to expand.
            <span className="block mt-2 text-orange-400 font-medium">
              <FaMapMarkerAlt className="inline mr-1" /> 3 active locations | 500+ meals served
              weekly
            </span>
          </p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={12}
            style={{ height: '500px', width: '100%' }}
            scrollWheelZoom={true}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {serviceLocations.map((location) => (
              <Marker key={location.id} position={location.position} icon={foodIcon}>
                <Popup className="custom-popup">
                  <div className="font-sans">
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
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceLocations.map((location) => (
            <div
              key={location.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{location.name}</h3>
                  <p className="text-gray-500">{location.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
