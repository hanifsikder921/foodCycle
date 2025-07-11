import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const {
    register: registerReview,
    handleSubmit: handleSubmitReview,
    reset: resetReview,
    setValue: setReviewValue,
    formState: { errors: reviewErrors },
  } = useForm();

  // Fetch received donations that are picked up
  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["receivedDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donationRequests?email=${user.email}&status=Picked Up`
      );
      return res.data;
    },
  });

  const handleOpenReviewModal = (donation) => {
    setSelectedDonation(donation);
    setReviewModal(true);
  };

  const onSubmitReview = async (data) => {
    if (!selectedDonation) return;

    try {
      const reviewData = {
        donationId: selectedDonation.donationId,
        reviewer: user.displayName,
        reviewerEmail: user.email,
        description: data.description,
        rating: data.rating,
        createdAt: new Date(),
        donationTitle: selectedDonation.donationTitle,
        restaurantName: selectedDonation.restaurantName,
      };

      const result = await axiosSecure.post("/reviews", reviewData);

      if (result.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          showConfirmButton: false,
          timer: 1500,
        });
        setReviewModal(false);
        resetReview();
        refetch(); // Refresh the donations list
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Review Failed",
        text: error.response?.data?.message || "Failed to submit review",
      });
      setReviewModal(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading your donations...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Received Donations</h2>

      {donations.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            You haven't received any donations yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="border p-4 rounded-xl shadow-md dark:bg-gray-800 dark:text-white hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2">
                {donation.donationTitle}
              </h3>

              <div className="space-y-2">
                <p>
                  <span className="font-medium">Restaurant:</span>{" "}
                  {donation.restaurantName}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {donation.location}
                </p>
                <p>
                  <span className="font-medium">Food Type:</span>{" "}
                  {donation.foodType}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span>{" "}
                  {donation.quantity}
                </p>
                <p>
                  <span className="font-medium">Pickup Time:</span>{" "}
                  {donation.pickupTime}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="badge badge-success">Picked Up</span>

                <button
                  onClick={() => handleOpenReviewModal(donation)}
                  className="btn btn-sm btn-primary"
                >
                  Add Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <dialog className={`modal ${reviewModal ? "modal-open" : ""}`}>
        <div className="modal-box max-w-md dark:bg-gray-700">
          <h3 className="font-bold text-2xl mb-4 dark:text-white">
            Review for {selectedDonation?.donationTitle}
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
                <span className="text-red-500 text-sm">
                  Please select a rating
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">
                  Review Details
                </span>
              </label>
              <textarea
                className={`textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white ${
                  reviewErrors.description ? "textarea-error" : ""
                }`}
                placeholder="Share your experience with this donation..."
                rows={4}
                {...registerReview("description", {
                  required: "Review description is required",
                  minLength: {
                    value: 10,
                    message: "Review should be at least 10 characters",
                  },
                })}
              />
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
                className="btn btn-ghost"
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

export default ReceivedDonations;
