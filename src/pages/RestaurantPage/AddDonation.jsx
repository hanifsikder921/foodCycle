import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const AddDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [itemImage, setItemImage] = useState("");
  const [pickupTime, setPickupTime] = useState(new Date());
  const [pickupDate, setPickupDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const donationData = {
      ...data,
      image: itemImage,
      status: "Pending",
      pickupTime: pickupTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      pickupDate: pickupDate.toISOString(),
    };

    try {
      const res = await axiosSecure.post("/donations", donationData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Donation added successfully",
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to add donation",
      });
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imagUploadUrl, formData);
    setItemImage(res.data.data.url);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Add Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Donation Title */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">
            Donation Title
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="e.g. Surplus Pastries"
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        {/* Food Type */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">Food Type</label>
          <input
            {...register("foodType", { required: true })}
            type="text"
            placeholder="e.g. Bakery, Produce"
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
          {errors.foodType && (
            <p className="text-red-500 text-sm">Food type is required</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">
            Quantity (kg or portions)
          </label>
          <input
            {...register("quantity", { required: true })}
            type="number"
            placeholder="e.g. 10"
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">Quantity is required</p>
          )}
        </div>

        {/* Pickup Date and Time Window */}
        <div className="md:flex md:space-x-4 flex-col md:flex-row justify-between ">
          <div className="w-full">
            <label className="text-gray-700 dark:text-gray-300">
              Pickup Date
            </label>
            <br />
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              dateFormat="MM/dd/yyyy"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            {errors.pickupDate && (
              <p className="text-red-500 text-sm">Pickup date is required</p>
            )}
          </div>

          <div className="w-full mt-4 md:mt-0">
            <label className="text-gray-700 dark:text-gray-300">
              Pickup Time Window
            </label>
            <br />
            <DatePicker
              selected={pickupTime}
              onChange={(date) => setPickupTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            {errors.pickupTime && (
              <p className="text-red-500 text-sm">Pickup time is required</p>
            )}
          </div>
        </div>

        {/* Restaurant Name (Read-only) */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">
            Restaurant Name
          </label>
          <input
            type="text"
            readOnly
            defaultValue={user?.displayName || ""}
            {...register("restaurantName")}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white"
          />
        </div>

        {/* Restaurant Email (Read-only) */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">
            Restaurant Email
          </label>
          <input
            type="email"
            readOnly
            defaultValue={user?.email || ""}
            {...register("restaurantEmail")}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">Location</label>
          <input
            {...register("location", { required: true })}
            type="text"
            placeholder="e.g. 123 Main St, City"
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">Location is required</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-gray-700 dark:text-gray-300">Image URL</label>
          <input
            {...register("image", { required: true })}
            type="file"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Image URL is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Add Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDonation;
