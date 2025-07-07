import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const password = watch("password");

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        const userInfo = {
          email: data.email,
          name: data.name, 
          role: "user",
          image: profilePic, 
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes);

        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imagUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="shadow shadow-gray-200 rounded-xl w-7/12 mx-auto">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold">Sign up</h1>
            <p className="mt-2 text-sm">
              Already have an account?
              <Link
                to="/auth/login"
                className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium ml-1"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <SocialLogin />

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
              Or
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "Full Name is required",
                      })}
                      className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:outline-none focus:border-violet-500"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: "Email is required" })}
                      className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:outline-none focus:border-violet-500"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label htmlFor="photo" className="block text-sm mb-2">
                    Profile Photo
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="input"
                      placeholder="Your Profile picture"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                        pattern: {
                          value: /(?=.*[A-Z])(?=.*[a-z])/,
                          message:
                            "Password must contain at least one uppercase and one lowercase letter",
                        },
                      })}
                      className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:outline-none focus:border-violet-500"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 cursor-pointer"
                    >
                      {showPassword ? (
                        <IoIosEye size={20} />
                      ) : (
                        <IoIosEyeOff size={20} />
                      )}
                    </span>
                    {errors.password && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "The passwords do not match",
                      })}
                      className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:outline-none focus:border-violet-500"
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <IoIosEye size={20} />
                      ) : (
                        <IoIosEyeOff size={20} />
                      )}
                    </span>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-600 mt-2">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="terms"
                      {...register("terms", {
                        required: "Please accept the terms and conditions",
                      })}
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-sm focus:ring-blue-500"
                    />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="terms" className="text-sm">
                      I accept the{" "}
                      <a
                        className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-xs text-red-600 mt-2">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
