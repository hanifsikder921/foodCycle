import React from 'react';
import { Link } from 'react-router';

const FeaturedDonationsCard = ({ donation }) => {
    const { _id, image, foodType, title, restaurantName, location, status } = donation;

    return (
        <div className="rounded-xl shadow-md bg-white dark:bg-gray-800 p-4 hover:shadow-lg transition">
            <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Food Type:</span> {foodType}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Restaurant:</span> {restaurantName} ({location})
            </p>
            <p className={`text-sm font-semibold mb-3 ${
                status === 'Available' ? 'text-green-600' : 'text-red-500'
            }`}>
                Status: {status}
            </p>
            <Link
                to={`/donations/${_id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
                View Details
            </Link>
        </div>
    );
};

export default FeaturedDonationsCard;
