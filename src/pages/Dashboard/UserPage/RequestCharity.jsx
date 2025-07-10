import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentForm from "../Payment/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const RequestCharity = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = async (paymentMethod) => {
    try {
      const charityRequest = {
        ...formData,
        userName: user.displayName,
        userEmail: user.email,
        paymentMethod: paymentMethod.id,
      };

      const res = await axiosSecure.post("/charity-requests", charityRequest);
      if (res.data.insertedId) {
        setIsModalOpen(false);
        Swal.fire({
          title: "Success!",
          text: "Your request has been submitted for review.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error submitting charity request:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error submitting your request. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Request Charity Role
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block font-semibold dark:text-white mb-1">
            Name
          </label>
          <input
            type="text"
            {...register("userName")}
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-semibold dark:text-white mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("userEmail")}
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-semibold dark:text-white mb-1">
            Organization Name
          </label>
          <input
            type="text"
            {...register("organizationName", {
              required: "Organization name is required",
            })}
            className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
          />
          {errors.organizationName && (
            <p className="text-red-500 text-sm">
              {errors.organizationName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold dark:text-white mb-1">
            Mission Statement
          </label>
          <textarea
            rows="4"
            {...register("mission", {
              required: "Mission statement is required",
            })}
            className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white"
          ></textarea>
          {errors.mission && (
            <p className="text-red-500 text-sm">{errors.mission.message}</p>
          )}
        </div>

        <div className="text-right mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            Payment Amount: <strong>$25</strong>
          </p>
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Pay & Submit Request
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800/75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg md:w-3xl w-full">
            <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={25}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </Elements>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn  mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCharity;
