import React from "react";
import { NavLink, Outlet } from "react-router";
import { TbTruckDelivery } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { ImUserCheck } from "react-icons/im";
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaSearchLocation,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
  FaMotorcycle,
  FaTasks,
  FaCheckCircle,
  FaWallet,
  FaHeart,
  FaStar,
  FaHistory,
  FaUser,
  FaRegCheckCircle,
} from "react-icons/fa";
import FoodCycleLogo from "../components/shared/FoodCycleLogo";
import Navbar from "../components/Header/Navbar";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/Loading/Loading";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 mt-2 rounded-lg font-medium transition-colors  ${
      isActive
        ? "bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    }`;

  if (roleLoading) {
    return <Loading />;
  }

  return (
    <div>
      <header className="sticky top-0 z-50 bg-white border-b border-base-300 dark:bg-gray-800 hidden md:flex">
        <Navbar />
      </header>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col ">
          {/* Navbar */}
          <div className="navbar  dark:bg-gray-800 w-full lg:hidden sticky top-0 z-10 bg-white">
            <div className="flex-none ">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 dark:text-white flex-1 px-2 lg:hidden">
              Dashboard
            </div>
          </div>
          {/* Page content here */}
          <div className="p-5 dark:bg-gray-700 min-h-full ">
            <Outlet></Outlet>
          </div>
          {/* Page content here */}
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 dark:bg-gray-800 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <div className="md:hidden">
              <FoodCycleLogo />
            </div>

            {/* user  link */}
            {!roleLoading && role === "user" && (
              <>
                <div>
                  <NavLink to="/dashboard" end className={navLinkClass}>
                    <FaHome className="inline-block mr-2" />
                    Dashboard Home
                  </NavLink>
                  <NavLink to="/dashboard/my-profile" className={navLinkClass}>
                    <FaUser className="inline-block mr-2" />
                    My Profile
                  </NavLink>

                  <NavLink
                    to="/dashboard/requestCharity"
                    className={navLinkClass}
                  >
                    <FaMotorcycle className="inline-block mr-2" />
                    Request Charity Role
                  </NavLink>

                  <NavLink to="/dashboard/favorite" className={navLinkClass}>
                    <FaHeart className="inline-block mr-2" />
                    Favorites
                  </NavLink>

                  <NavLink to="/dashboard/reviews" className={navLinkClass}>
                    <FaStar className="inline-block mr-2" />
                    My Reviews
                  </NavLink>

                  <NavLink
                    to="/dashboard/paymentHistory"
                    className={navLinkClass}
                  >
                    <FaHistory className="inline-block mr-2" />
                    Transaction History
                  </NavLink>
                </div>
              </>
            )}

            {/* restaurant link */}
            {!roleLoading && role === "restaurant" && (
              <>
                <div>
                  <NavLink to="/dashboard" end className={navLinkClass}>
                    <FaHome className="inline-block mr-2" />
                    Dashboard Home
                  </NavLink>

                  <NavLink
                    to="/dashboard/restaurant-profile"
                    className={navLinkClass}
                  >
                    <FaUserEdit className="inline-block mr-2" />
                    Restaurant Profile
                  </NavLink>

                  <NavLink
                    to="/dashboard/add-donation"
                    className={navLinkClass}
                  >
                    <FaBoxOpen className="inline-block mr-2" />
                    Add Donation
                  </NavLink>

                  <NavLink
                    to="/dashboard/my-donations"
                    className={navLinkClass}
                  >
                    <FaTasks className="inline-block mr-2" />
                    My Donations
                  </NavLink>

                  <NavLink
                    to="/dashboard/requested-donations"
                    className={navLinkClass}
                  >
                    <FaRegCheckCircle className="inline-block mr-2" />
                    Requested Donations
                  </NavLink>
                </div>
              </>
            )}

            {/* admin link */}
            {!roleLoading && role === "admin" && (
              <>
                <div>
                  <NavLink to="/dashboard" end className={navLinkClass}>
                    <FaHome className="inline-block mr-2" />
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/dashboard/admin-profile"
                    className={navLinkClass}
                  >
                    <FaUserShield className="inline-block mr-2" />
                    Admin Profile
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-donations"
                    className={navLinkClass}
                  >
                    <FaBoxOpen className="inline-block mr-2" />
                    Manage Donations
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-users"
                    className={navLinkClass}
                  >
                    <FaUserEdit className="inline-block mr-2" />
                    Manage Users
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-role-requests"
                    className={navLinkClass}
                  >
                    <FaUserClock className="inline-block mr-2" />
                    Manage Role Requests
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-requests"
                    className={navLinkClass}
                  >
                    <FaTasks className="inline-block mr-2" />
                    Manage Requests
                  </NavLink>

                  <NavLink
                    to="/dashboard/feature-donations"
                    className={navLinkClass}
                  >
                    <FaStar className="inline-block mr-2" />
                    Feature Donations
                  </NavLink>
                </div>
              </>
            )}

            {/* charity link */}
            {!roleLoading && role === "charity" && (
              <>
                <div>
                  <NavLink to="/dashboard" end className={navLinkClass}>
                    <FaHome className="inline-block mr-2" />
                    Dashboard Home
                  </NavLink>

                  <NavLink
                    to="/dashboard/charity-profile"
                    className={navLinkClass}
                  >
                    <ImUserCheck className="inline-block mr-2" />
                    Charity Profile
                  </NavLink>

                  <NavLink to="/dashboard/my-requests" className={navLinkClass}>
                    <FaTasks className="inline-block mr-2" />
                    My Requests
                  </NavLink>

                  <NavLink to="/dashboard/my-pickups" className={navLinkClass}>
                    <TbTruckDelivery className="inline-block mr-2" />
                    My Pickups
                  </NavLink>

                  <NavLink
                    to="/dashboard/received-donations"
                    className={navLinkClass}
                  >
                    <GiReceiveMoney className="inline-block mr-2" />
                    Received Donations
                  </NavLink>

                  <NavLink
                    to="/dashboard/charity-transactions"
                    className={navLinkClass}
                  >
                    <FaHistory className="inline-block mr-2" />
                    Transaction History
                  </NavLink>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
