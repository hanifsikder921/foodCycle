import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import moment from "moment";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import {
  FaMapMarkerAlt,
  FaUtensils,
  FaBalanceScale,
  FaCheckCircle,
} from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { MdRestaurant } from "react-icons/md";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import useUserRole from "../../../../hooks/useUserRole";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";

const DonationDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useUserRole();
  const [donation, setDonation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  const {
    title,
    foodType,
    quantity,
    restaurantName,
    location,
    image,
    status,
    pickupTime,
    pickupDate,
  } = donation || {};



  // React Hook Form for request donation
  const {
    register: registerRequest,
    handleSubmit: handleSubmitRequest,
    reset: resetRequest,
    setValue: setRequestValue,
    formState: { errors: requestErrors },
  } = useForm();

  // React Hook Form for reviews
  const {
    register: registerReview,
    handleSubmit: handleSubmitReview,
    reset: resetReview,
    formState: { errors: reviewErrors },
    setValue: setReviewValue,
  } = useForm();
  useEffect(() => {
    if (user && donation && role === "charity") {
      axiosSecure
        .get(`/donationRequests/check/${donation._id}/${user.email}`)
        .then((res) => {
          setHasRequested(res.data.hasRequested);
        })
        .catch((error) => {
          console.error("Error checking donation request status:", error);
          setHasRequested(false);
        });
    }
  }, [user, donation, role, axiosSecure]);

  useEffect(() => {
    if (donation) {
      setRequestValue("donationTitle", donation.title);
      setRequestValue("restaurantName", donation.restaurantName);
    }
    if (user) {
      setRequestValue("charityName", user.displayName);
      setRequestValue("charityEmail", user.email);
    }
  }, [donation, user, setRequestValue]);

  const onSubmitRequest = async (data) => {
    try {
      const result = await axiosSecure.post("/donationRequests", {
        donationId: donation._id,
        donationTitle: donation.title,
        restaurantName: donation.restaurantName,
        charityName: user.displayName,
        charityEmail: user.email,
        charityImage: user?.photoURL,
        restaurantEmail: donation.restaurantEmail,
        foodType: donation.foodType,
        quantity: donation.quantity,
        location: donation.location,
        requestDescription: data.requestDescription,
        pickupTime: data.pickupTime,
        status: "pending",
      });

      if (result.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Submitted!",
          text: "Your request has been sent successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("requestModal").close();
        setDonation({ ...donation, status: "Requested" });
        resetRequest();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: error.response?.data?.message || "Failed to submit request",
      });
    }
  };

  const onSubmitReview = async (data) => {
    try {
      const result = await axiosSecure.post("/reviews", {
        donationId: donation._id,
        reviewer: user.displayName,
        reviewerEmail: user.email,
        description: data.description,
        rating: data.rating,
      });

      if (result.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          showConfirmButton: false,
          timer: 1500,
        });
        setReviewModal(false);
        resetReview();
        // Refresh reviews
        const res = await axios.get(`/reviews/${id}`);
        setReviews(res.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Review Failed",
        text: error.response?.data?.message || "Failed to submit review",
      });
    }
  };

  useEffect(() => {
    axios.get(`/donations/${id}`).then((res) => setDonation(res.data));
    axios.get(`/reviews/${id}`).then((res) => setReviews(res.data));
  }, [id, axios]);

  const handleAddToFavorites = async () => {
    try {
      if (isFavorited) {
        // Remove from favorites
        await axios.delete(`/favorites/${donation._id}`, {
          data: { userEmail: user.email },
        });
        setIsFavorited(false);
        Swal.fire({
          icon: "success",
          title: "Removed from Favorites!",
          text: "Donation removed from your favorites.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Add to favorites
        await axios.post("/favorites", {
          donationId: donation._id,
          userEmail: user.email,
        });
        setIsFavorited(true);
        Swal.fire({
          icon: "success",
          title: "Added to Favorites!",
          text: "Donation saved to your favorites.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: error.response?.data?.message || "Failed to update favorites",
      });
    }
  };
  const handleConfirmPickup = () => {
    axios.patch(`/donations/${id}`, { status: "Picked Up" }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Pickup Confirmed!",
        text: "Thank you for confirming the pickup.",
        showConfirmButton: false,
        timer: 1500,
      });
      setDonation({ ...donation, status: "Picked Up" });
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

  if (roleLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <Helmet>
        <title> Details</title>
      </Helmet>
      {/* Donation Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow flex items-center">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                status === "Verified"
                  ? "bg-green-500"
                  : status === "Requested"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            ></span>
            <span className="text-sm font-medium dark:text-white">
              {status}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">
            {title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-3">
                <MdRestaurant className="text-blue-600 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Restaurant
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {restaurantName}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-3">
                <FaMapMarkerAlt className="text-green-600 dark:text-green-300 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Location
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{location}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-3">
                <FaUtensils className="text-purple-600 dark:text-purple-300 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Food Type
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{foodType}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-3">
                <FaBalanceScale className="text-yellow-600 dark:text-yellow-300 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Quantity
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{quantity}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full mr-3">
                <IoIosTime className="text-red-600 dark:text-red-300 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Pickup Time
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {moment(pickupDate).format("LL")} • {pickupTime}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {(role === "user" || role === "charity") && (
              <button
                onClick={handleAddToFavorites}
                className="btn  btn-primary gap-2 bg-yellow-500 text-black"
              >
                Save to Favorites
              </button>
            )}

            {role === "charity" && status !== "Picked Up" && (
              <button
                onClick={() =>
                  document.getElementById("requestModal").showModal()
                }
                className="btn btn-warning gap-2"
                disabled={hasRequested}
              >
                {hasRequested ? "Already Requested" : "Request Donation"}
              </button>
            )}

            {user?.role === "charity" && status === "Accepted" && (
              <button
                onClick={handleConfirmPickup}
                className="btn btn-success gap-2"
              >
                <FaCheckCircle /> Confirm Pickup
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Review Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Reviews</h2>
          {(role === "user" || role === "charity") && (
            <button
              onClick={() => setReviewModal(true)}
              className="btn btn-primary btn-sm"
            >
              Add Review
            </button>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg dark:text-white">
                    {review.reviewer}
                  </h4>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {review.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {moment(review.createdAt).fromNow()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center border border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No reviews yet. Be the first to review!
            </p>
          </div>
        )}
      </div>
      {/* Request Donation Modal */}
      <dialog id="requestModal" className="modal">
        <div className="modal-box max-w-2xl dark:bg-gray-700">
          <h3 className="font-bold text-2xl mb-4 dark:text-white">
            Request Donation
          </h3>
          <form
            onSubmit={handleSubmitRequest(onSubmitRequest)}
            className="space-y-4"
          >
            {/* Read-only fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300">
                    Donation Title
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                  readOnly
                  {...registerRequest("donationTitle")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300">
                    Restaurant
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                  readOnly
                  {...registerRequest("restaurantName")}
                />
              </div>
            </div>

            {/* Charity info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300">
                    Your Organization
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                  readOnly
                  {...registerRequest("charityName")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
                  readOnly
                  {...registerRequest("charityEmail")}
                />
              </div>
            </div>

            {/* Editable fields */}
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">
                  Request Description
                </span>
                <span className="label-text-alt text-red-500">*</span>
              </label>
              <textarea
                className={`textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white ${
                  requestErrors.requestDescription ? "textarea-error" : ""
                }`}
                placeholder="Explain why you need this donation and how it will be used..."
                {...registerRequest("requestDescription", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description should be at least 20 characters",
                  },
                  maxLength: {
                    value: 500,
                    message: "Description should not exceed 500 characters",
                  },
                })}
              />
              {requestErrors.requestDescription && (
                <span className="text-red-500 text-sm">
                  {requestErrors.requestDescription.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">
                  Proposed Pickup Time
                </span>
                <span className="label-text-alt text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="time"
                  className={`input input-bordered w-full dark:bg-gray-700 dark:text-white ${
                    requestErrors.pickupTime ? "input-error" : ""
                  }`}
                  {...registerRequest("pickupTime", {
                    required: "Pickup time is required",
                    validate: (value) => {
                      const donationDateTime = new Date(
                        `${pickupDate} ${pickupTime}`
                      );
                      const proposedDateTime = new Date(
                        `${pickupDate} ${value}`
                      );

                      // Check if proposed time is within ±2 hours of donation time
                      const minTime = new Date(donationDateTime);
                      minTime.setHours(minTime.getHours() - 2);

                      const maxTime = new Date(donationDateTime);
                      maxTime.setHours(maxTime.getHours() + 2);

                      if (
                        proposedDateTime < minTime ||
                        proposedDateTime > maxTime
                      ) {
                        return "Pickup time should be within 2 hours of the donation's specified time";
                      }
                      return true;
                    },
                  })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <IoIosTime className="text-gray-400" />
                </div>
              </div>
              {requestErrors.pickupTime && (
                <span className="text-red-500 text-sm">
                  {requestErrors.pickupTime.message}
                </span>
              )}
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  document.getElementById("requestModal").close();
                  resetRequest();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Review Modal */}
      <dialog className={`modal ${reviewModal ? "modal-open" : ""}`}>
        <div className="modal-box max-w-md dark:bg-gray-700">
          <h3 className="font-bold text-2xl mb-4 dark:text-white">
            Add Review
          </h3>
          <form
            onSubmit={handleSubmitReview(onSubmitReview)}
            className="space-y-4"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">
                  Your Rating
                </span>
              </label>
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    onClick={() => setReviewValue("rating", star)}
                  />
                ))}
              </div>
              {reviewErrors.rating && (
                <span className="text-red-500 text-sm">Rating is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">Review</span>
              </label>
              <textarea
                className={`textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white ${
                  reviewErrors.description ? "textarea-error" : ""
                }`}
                placeholder="Share your experience with this donation..."
                {...registerReview("description", {
                  required: "Review description is required",
                })}
              ></textarea>
              {reviewErrors.description && (
                <span className="text-red-500 text-sm">
                  {reviewErrors.description.message}
                </span>
              )}
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
              <button
                type="button"
                className="btn btn-ghost dark:text-gray-200 dark:hover:bg-gray-600"
                onClick={() => {
                  setReviewModal(false);
                  resetReview();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DonationDetails;
