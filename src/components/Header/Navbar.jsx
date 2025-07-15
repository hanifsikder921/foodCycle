// import React, { useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";
import FoodCycleLogo from "../shared/FoodCycleLogo";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "No, stay logged in",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            localStorage.removeItem("token");
            Swal.fire(
              "Logged Out!",
              "You have been logged out successfully.",
              "success"
            );
            navigate("/login");
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  const menu = (
    <div className="flex flex-col md:flex-row md:gap-10 gap-3 md:items-center">
      {[
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "contact" },
        { path: "/allDonation", label: "All Donation" },
        ...(user ? [{ path: "/dashboard", label: "Dashboard" }] : []),
      ].map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `font-semibold transition-colors duration-300 text-base-content relative z-10 ${
              isActive
                ? "px-4 py-2 rounded-md border dark:border-amber-300"
                : " hover:text-blue-500"
            } dark:text-amber-50`
          }
        >
          {label}
        </NavLink>
      ))}
      {user ? (
        <div className="flex items-center justify-center gap-2">
          <button onClick={handleLogout} className="btn btn-warning">
            Logout
          </button>
          <img title={user?.displayName} src={user?.photoURL} className="w-12 h-12 rounded-full"></img>
        </div>
      ) : (
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      )}
    </div>
  );

  return loading ? (
    <Loading />
  ) : (
    <div className="navbar w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown relative  ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
            <IoMdMenu className="text-2xl text-black dark:text-white   hover:text-black" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow z-50 bg-white dark:bg-gray-800 dark:text-white"
          >
            {menu}
          </ul>
        </div>
        <FoodCycleLogo />
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">{menu}</ul>
      </div>
    </div>
  );
};

export default Navbar;
