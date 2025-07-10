import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const UserReviews = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (user?.email) {
    fetchReviews();
  }
}, [user?.email]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/user-reviews?userEmail=${user.email}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load your reviews",
      });
    } finally {
      setLoading(false);
    }
  };



  const handleDelete = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/reviews/${reviewId}`, {
            data: { userEmail: user.email }
          });
          
          setReviews(reviews.filter(review => review._id !== reviewId));
          
          Swal.fire(
            "Deleted!",
            "Your review has been deleted.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Error!",
            error.response?.data?.message || "Failed to delete review",
            "error"
          );
        }
      }
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<BsStarFill key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<BsStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<BsStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold mb-8 dark:text-white text-center">📝 My Reviews</h2>

  {reviews.length === 0 ? (
    <div className="text-center py-10">
      <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
        You haven't submitted any reviews yet.
      </p>
      <Link 
        to="/allDonation" 
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Browse Donations
      </Link>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl border dark:border-gray-700"
        >
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold dark:text-white">
                  {review.donationTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Restaurant:</strong> {review.restaurantName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(review._id)}
                className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-800 transition"
                title="Delete Review"
              >
                <FaTrash className="text-red-600 hover:text-red-800 text-lg" />
              </button>
            </div>

            <div>
              <div className="flex mb-2">{renderStars(review.rating)}</div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{review.description}</p>
            </div>

            <div className="text-right">
              <Link
                to={`/donationDetails/${review.donationId}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View Donation
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default UserReviews;