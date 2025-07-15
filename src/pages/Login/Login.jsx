import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import { AuthContext } from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const { email, password } = data;

    Swal.fire({
      title: "Logging In...",
      text: "Please wait.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await signIn(email, password);
      Swal.fire("Success", "Login successfully", "success").then(() => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleForgotPassword = () => {
    navigate("/auth/forgot-password", {
      state: { email: document.querySelector('input[name="email"]').value },
    });
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 md:w-7/12 mx-auto">
      <Helmet>
        <title>Login to Your Account</title>
      </Helmet>
      <div className="mt-7 rounded-xl shadow shadow-gray-200 w-full ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold ">Sign in</h1>
            <p className="mt-2 text-sm ">
              Don't have an account yet?
              <Link
                className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium ml-1"
                to="/register"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <SocialLogin />

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2 ">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    aria-describedby="email-error"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex flex-wrap justify-between items-center gap-2 ">
                  <label htmlFor="password" className="block text-sm mb-2">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="inline-flex items-center gap-x-1 text-sm text-blue-600  hover:underline focus:outline-hidden focus:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="py-2.5  sm:py-3 px-4 block w-full border border-gray-300  rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500  disabled:pointer-events-none"
                    aria-describedby="password-error"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600 mt-2">
                      {errors.password.message}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 end-0 pe-3 flex items-center "
                  >
                    {showPassword ? (
                      <IoIosEye size={20} />
                    ) : (
                      <IoIosEyeOff size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center ">
                <div className="flex">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ms-3">
                  <label htmlFor="remember-me" className="text-sm">
                    Remember me
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
