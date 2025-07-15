import { useEffect, useState } from 'react';
import { FaUtensils, FaClock, FaCheckCircle, FaTimesCircle, FaTruck, FaUser } from 'react-icons/fa';
import useAxios from './../../../hooks/useAxios';

const LatestCharityRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchLatestRequests = async () => {
      try {
        const response = await axios.get('/latestRequest', {
          params: {
            limit: 3,
            sort: 'createdAt',
            order: 'desc'
          }
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching charity requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRequests();
  }, [axios]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Picked Up':
        return <FaTruck className="text-green-500" />;
      case 'Accepted':
        return <FaCheckCircle className="text-blue-500" />;
      case 'Rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-gray-400 dark:text-gray-500 mb-4">
          <FaUtensils className="inline-block text-4xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
          No recent charity requests
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Check back later for new donation requests
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Recent Food Requests
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Latest food donation requests from charitable organizations in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div 
              key={request._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                {/* Header with charity info and image */}
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0">
                    {request.charityImage ? (
                      <img 
                        src={request.charityImage} 
                        alt={request.charityName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-2 border-blue-200 dark:border-blue-700">
                        <FaUser className="text-2xl text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {request.charityName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(request.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Food details */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <FaUtensils className="mr-1.5" />
                    <span>Requesting food</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {request.donationTitle}
                  </h4>
                  <div className="mt-1 flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">
                      {request.quantity} servings
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      • {request.foodType}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {request.requestDescription}
                  </p>
                </div>

                {/* Footer with status and location */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center">
                    {getStatusIcon(request.status)}
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {request.status.toLowerCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {request.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCharityRequests;