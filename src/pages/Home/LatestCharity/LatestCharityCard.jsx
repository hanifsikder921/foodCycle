import React from 'react';

const LatestCharityCard = ({ request }) => {
    const { charityName, charityImage, description, donationTitle } = request;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-3">
                <img
                    src={charityImage}
                    alt={charityName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{charityName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">Requested for: <span className="font-medium">{donationTitle}</span></p>
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
    );
};

export default LatestCharityCard;
