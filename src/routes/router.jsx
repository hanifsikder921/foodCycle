import { createBrowserRouter } from "react-router";
import MainLayout from "./../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthencationLayout from "./../layouts/AuthencationLayout";
import Login from "./../pages/Login/Login";
import Register from "./../pages/Register/Register";
import About from "../pages/About/About";
import ContactUs from "../pages/Contact/ContactUs";
import DashboardLayout from "../layouts/DashboardLayout";
import Forbidden from "../pages/Forbidden/Forbidden";
import AllDonation from "../pages/AllDonation/AllDonation";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UserProfile from "../pages/Dashboard/UserPage/UserProfile";
import UserTransectionHistory from "../pages/Dashboard/UserPage/UserTransectionHistory";
import RequestCharity from "../pages/Dashboard/UserPage/RequestCharity";
import FavoriteItem from "../pages/Dashboard/UserPage/FavoriteItem";
import UserReviews from "../pages/Dashboard/UserPage/UserReviews";
import RestaurantProfile from "../pages/RestaurantPage/RestaurantProfile";
import AddDonation from "../pages/RestaurantPage/AddDonation";
import MyDonations from "../pages/RestaurantPage/MyDonations";
import RequestedDonations from "../pages/RestaurantPage/RequestedDonations";
import ManageDonations from "./../pages/AdminPage/ManageDonations";
import ManageUsers from "./../pages/AdminPage/ManageUsers";
import ManageRoleRequests from "./../pages/AdminPage/ManageRoleRequests";
import ManageRequests from "./../pages/AdminPage/ManageRequests";
import FeatureDonationsAdd from "./../pages/AdminPage/FeatureDonationsAdd";
import AdminProfile from "./../pages/AdminPage/AdminProfile";
import CharityProfile from "../pages/CharityPage/CharityProfile";
import MyRequests from "../pages/CharityPage/MyRequests";
import MyPickups from "../pages/CharityPage/MyPickups";
import ReceivedDonations from "../pages/CharityPage/ReceivedDonations";
import CharityTransactionHistory from "../pages/CharityPage/CharityTransactionHistory";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: ContactUs,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: "/allDonation",
        Component: () => (
          <PrivateRoute>
            <AllDonation />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    Component: AuthencationLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: () => (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/my-profile",
        Component: UserProfile,
      },
      {
        path: "/dashboard/paymentHistory",
        Component: UserTransectionHistory,
      },
      {
        path: "/dashboard/requestCharity",
        Component: RequestCharity,
      },
      {
        path: "/dashboard/favorite",
        Component: FavoriteItem,
      },
      {
        path: "/dashboard/reviews",
        Component: UserReviews,
      },

      // restaurant Dashbard Route
      {
        path: "/dashboard/restaurant-profile",
        Component: RestaurantProfile,
      },
      {
        path: "/dashboard/add-donation",
        Component: AddDonation,
      },
      {
        path: "/dashboard/my-donations",
        Component: MyDonations,
      },
      {
        path: "/dashboard/requested-donations",
        Component: RequestedDonations,
      },

      // Admin Dashboaed Route
      {
        path: "/dashboard/admin-profile",
        Component: AdminProfile,
      },
      {
        path: "/dashboard/manage-donations",
        Component: ManageDonations,
      },
      {
        path: "/dashboard/manage-users",
        Component: ManageUsers,
      },
      {
        path: "/dashboard/manage-role-requests",
        Component: ManageRoleRequests,
      },
      {
        path: "/dashboard/manage-requests",
        Component: ManageRequests,
      },
      {
        path: "/dashboard/feature-donations",
        Component: FeatureDonationsAdd,
      },

      // Charity Dashbord Route
      {
        path: "/dashboard/charity-profile",
        Component: CharityProfile,
      },
      {
        path: "/dashboard/my-requests",
        Component: MyRequests,
      },
      {
        path: "/dashboard/my-pickups",
        Component: MyPickups,
      },
      {
        path: "/dashboard/received-donations",
        Component: ReceivedDonations,
      },
      {
        path: "/dashboard/charity-transactions",
        Component: CharityTransactionHistory,
      },
    ],
  },
]);

export default router;
