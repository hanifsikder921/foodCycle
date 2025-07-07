import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { AuthContext } from '../../provider/AuthProvider';




const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { createUser, updateDetails, setUser, googleSignin } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = e.target;
            const name = form.name.value;
            const email = form.email.value;
            const photoURL = form.photo.value;
            const password = form.password.value;
            const confirmPassword = form['confirm-password'].value;

            if (password !== confirmPassword) {
                setLoading(false);
                return Swal.fire("Error", "Passwords do not match", "error");
            }

            const uppercase = /[A-Z]/;
            const lowercase = /[a-z]/;

            if (!uppercase.test(password)) {
                setLoading(false);
                return Swal.fire("Error", "Password must contain at least one uppercase letter", "error");
            }
            if (!lowercase.test(password)) {
                setLoading(false);
                return Swal.fire("Error", "Password must contain at least one lowercase letter", "error");
            }
            if (password.length < 6) {
                setLoading(false);
                return Swal.fire("Error", "Password must be at least 6 characters", "error");
            }

            const result = await createUser(email, password);
            const currentUser = result.user;
            await updateDetails(currentUser, {
                displayName: name,
                photoURL: photoURL
            });

            setLoading(false);
            await Swal.fire("Success", "Account created successfully", "success");
            navigate("/");
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", error.message, "error");
        }
    };

    const handleGoogleSignin = async () => {
        try {
            setLoading(true);
            const result = await googleSignin();
            const loggedInUser = result.user;
            const updatedUser = {
                displayName: loggedInUser.displayName || '',
                photoURL: loggedInUser.photoURL || '',
                email: loggedInUser.email
            };
            setUser(updatedUser);
            setLoading(false);
            await Swal.fire("Success", "Successfully Logged In With Google", "success");
            navigate("/");
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
   
            <div className=" flex items-center justify-center p-4">
        
                <div className="shadow shadow-gray-200 rounded-xl  w-7/12 mx-auto ">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold ">Sign up</h1>
                            <p className="mt-2 text-sm ">
                                Already have an account?
                                <Link to="/auth/login" className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium ml-1">
                                    Sign in here
                                </Link>
                            </p>
                        </div>

                        <div className="mt-5">
                            <button
                                onClick={handleGoogleSignin}
                                type="button"
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                            <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                                            <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                                            <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                                            <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                                        </svg>
                                        Sign up with Google
                                    </>
                                )}
                            </button>

                            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">Or</div>

                            <form onSubmit={handleRegister}>
                                <div className="grid gap-y-4">
                                    {/* Name Field */}
                                    <div>
                                        <label htmlFor="name" className="block  text-sm mb-2">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="py-2.5 sm:py-3 px-4 block w-full  border border-gray-300 rounded-lg sm:text-sm focus:outline-none focus:border-violet-500 "
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block   text-sm mb-2">Email address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="py-2.5 sm:py-3 px-4 block w-full  border border-gray-300 rounded-lg sm:text-sm focus:outline-none focus:border-violet-500 "
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Photo URL Field */}
                                    <div>
                                        <label htmlFor="photo" className="block  text-sm mb-2">Photo URL</label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                id="photo"
                                                name="photo"
                                                className="py-2.5 sm:py-3 px-4 block w-full  border border-gray-300 rounded-lg sm:text-sm focus:outline-none focus:border-violet-500 "
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="password" className="block   text-sm mb-2">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                className="py-2.5 sm:py-3 px-4 block w-full  border border-gray-300 rounded-lg sm:text-sm focus:outline-none focus:border-violet-500 "
                                                required
                                                disabled={loading}
                                            />
                                            <span
                                                onClick={() => !loading && setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3 cursor-pointer"
                                            >
                                                {showPassword ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div>
                                        <label htmlFor="confirm-password" className="block   text-sm mb-2">Confirm Password</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirm-password"
                                                name="confirm-password"
                                                className="py-2.5 sm:py-3 px-4 block w-full  border border-gray-300 rounded-lg sm:text-sm focus:outline-none focus:border-violet-500 "
                                                required
                                                disabled={loading}
                                            />
                                            <span
                                                onClick={() => !loading && setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-3  cursor-pointer"
                                            >
                                                {showConfirmPassword ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Terms Checkbox */}
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <input
                                                id="terms"
                                                name="terms"
                                                type="checkbox"
                                                className="shrink-0 mt-0.5 border-gray-200 rounded-sm  focus:ring-blue-500"
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="ms-3">
                                            <label htmlFor="terms" className="text-sm  ">I accept the <a className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="#">Terms and Conditions</a></label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            "Sign up"
                                        )}
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