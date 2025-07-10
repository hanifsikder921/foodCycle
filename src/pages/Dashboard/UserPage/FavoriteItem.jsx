import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // Changed from react-router to react-router-dom
import Swal from "sweetalert2";
import useAxios from './../../../hooks/useAxios';
import useAuth from './../../../hooks/useAuth';
import Loading from './../../../components/Loading/Loading';

const FavoriteItem = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios.get(`/favorites?userEmail=${user.email}`)
        .then((res) => {
          setFavorites(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching favorites:", err);
          setLoading(false);
        });
    }
  }, [user, axios]);

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will be removed from your favorites.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/favorites/${id}`, {
          data: { userEmail: user?.email } 
        })
        .then(() => {
          Swal.fire("Removed!", "Item has been removed.", "success");
          setFavorites(favorites.filter((item) => item._id !== id));
        })
        .catch((err) => {
          Swal.fire("Error", err.response?.data?.message || "Failed to remove favorite", "error");
        });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        My Favorite Donations
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            You haven't added any donations to favorites yet.
          </p>
          <Link 
            to="/available-foods" 
            className="mt-4 inline-block btn btn-primary"
          >
            Browse Donations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                alt={item.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Restaurant:</span> {item.restaurantName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Location:</span> {item.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Food Type:</span> {item.foodType}
                </p>
                <p className="text-sm mt-1 dark:text-gray-200">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`font-medium ${
                      item.status === "Picked Up"
                        ? "text-green-500"
                        : item.status === "Requested"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
                <p className="text-sm mt-1 dark:text-gray-200">
                  <span className="font-medium">Quantity:</span> {item.quantity}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/donationDetails/${item.donationId}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-error btn-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteItem;