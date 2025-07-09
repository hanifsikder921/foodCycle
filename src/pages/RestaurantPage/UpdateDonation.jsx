import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateDonation = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [itemImage, setItemImage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axiosSecure.get(`/donations/${id}`).then((res) => {
      const fetched = res.data;
      setDonation(fetched);
      reset({
        ...fetched,
        pickupDate: new Date(fetched.pickupDate), // ensure date object
      });
      setItemImage(fetched.image);

      // Parse pickup time string to Date object
      if (fetched.pickupTime) {
        const [time, modifier] = fetched.pickupTime.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        const newTime = new Date();
        newTime.setHours(hours, minutes, 0);
        setPickupTime(newTime);
      }
    });
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    try {
      const { _id, ...rest } = data;

      const donationData = {
        ...rest,
        image: itemImage,
        pickupDate: pickupDate.toISOString(), // ISO string
        pickupTime: pickupTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const res = await axiosSecure.put(`/donations/${id}`, donationData);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Donation updated successfully",
        });
        navigate("/dashboard/my-donations");
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes were made",
        });
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to update donation",
        text: error.response?.data?.error || "Something went wrong",
      });
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imgUploadUrl, formData);
    setItemImage(res.data.data.url);
  };

  if (!donation)
    return <p className="text-center mt-10">Loading donation data...</p>;

  return (
   <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
  <h2 className="text-3xl font-extrabold mb-8 text-center dark:text-white">
    Update Your Donation
  </h2>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    {/* Title */}
    <div>
      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
        Donation Title
      </label>
      <input
        {...register("title", { required: true })}
        type="text"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        defaultValue={donation.title}
      />
      {errors.title && (
        <p className="text-red-500 text-sm mt-1">Title is required</p>
      )}
    </div>

    {/* Food Type and Quantity */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
          Food Type
        </label>
        <input
          {...register("foodType", { required: true })}
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          defaultValue={donation.foodType}
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
          Quantity
        </label>
        <input
          {...register("quantity", { required: true })}
          type="number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          defaultValue={donation.quantity}
        />
      </div>
    </div>

    {/* Pickup Date and Time */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
          Pickup Date
        </label>
        <DatePicker
          selected={pickupDate}
          onChange={(date) => setPickupDate(date)}
          dateFormat="MM/dd/yyyy"
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
          Pickup Time
        </label>
        <DatePicker
          selected={pickupTime}
          onChange={(date) => setPickupTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>

    {/* Location */}
    <div>
      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
        Location
      </label>
      <input
        {...register("location", { required: true })}
        type="text"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        defaultValue={donation.location}
      />
    </div>

    {/* Image Upload */}
    <div>
      <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
        Upload New Image (optional)
      </label>
      <input
        type="file"
        onChange={handleImageUpload}
        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
      />
      {itemImage && (
        <img
          src={itemImage}
          alt="Preview"
          className="mt-3 w-32 h-24 object-cover rounded-lg shadow"
        />
      )}
    </div>

    {/* Submit */}
    <div className="text-center pt-4">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition duration-300"
      >
        Update Donation
      </button>
    </div>
  </form>
</div>

  );
};

export default UpdateDonation;
