import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentForm from "../Payment/PaymentForm";
import { FaPrint } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const RequestCharity = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [requestInfo, setRequestInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/charity-requests/${user.email}`)
        .then((res) => {
          if (res.data.length > 0) {
            setAlreadyRequested(true);
            setRequestInfo(res.data[0]);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

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
        // Refresh to show updated state
        window.location.reload();
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

  const handlePrint = () => {
    const printContent = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="text-align: center; color: #333;">Charity Request Details</h1>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${requestInfo.userName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${requestInfo.userEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Organization Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${requestInfo.organizationName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mission Statement:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${requestInfo.mission}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Status:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${requestInfo.status.charAt(0).toUpperCase() + requestInfo.status.slice(1)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Payment Method ID:</td>
            <td style="padding: 8px; border: 1px solid #ddd; word-break: break-all;">${requestInfo.paymentMethod}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Requested On:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date(requestInfo.createdAt).toLocaleString()}</td>
          </tr>
        </table>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
  return <loading/>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Request Charity Role
      </h2>

      {alreadyRequested && requestInfo ? (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center text-green-600 dark:text-green-400">
            ✅ You have submitted a charity role request
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div>
              <p className="text-gray-600 dark:text-gray-300">Name</p>
              <h4 className="font-semibold dark:text-white">
                {requestInfo.userName}
              </h4>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300">Email</p>
              <h4 className="font-semibold dark:text-white">
                {requestInfo.userEmail}
              </h4>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Organization Name
              </p>
              <h4 className="font-semibold dark:text-white">
                {requestInfo.organizationName}
              </h4>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Mission Statement
              </p>
              <h4 className="font-semibold dark:text-white">
                {requestInfo.mission}
              </h4>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300">Status</p>
              <h4
                className={`font-semibold ${
                  requestInfo.status === "pending"
                    ? "text-yellow-500"
                    : requestInfo.status === "approved"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {requestInfo.status.charAt(0).toUpperCase() +
                  requestInfo.status.slice(1)}
              </h4>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Payment Method ID
              </p>
              <h4 className="font-semibold text-gray-700 dark:text-gray-200 break-all">
                {requestInfo.paymentMethod}
              </h4>
            </div>

            <div >
              <p className="text-gray-600 dark:text-gray-300">Requested On</p>
              <h4 className="font-semibold dark:text-white">
                {new Date(requestInfo.createdAt).toLocaleString()}
              </h4>
            </div>

            <div>
              <button onClick={handlePrint} className="btn btn-sm btn-soft"> <FaPrint />  Print</button>
            </div>
          </div>
        </div>
      ) : (
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
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800/75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg md:w-3xl w-full">
            <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={25}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </Elements>
            <button onClick={() => setIsModalOpen(false)} className="btn mt-4">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCharity;
