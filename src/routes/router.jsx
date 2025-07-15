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
import UpdateDonation from "../pages/RestaurantPage/UpdateDonation";
import DonationDetails from "../pages/Home/Donation/DonationsDetails/DonationDetails";
import AdminRoute from "./AdminRoute";
import RestaurentRoute from "./RestaurentRoute";
import CharityRoute from "./CharityRoute";
import UserRoutes from "./UserRoutes";
import HowItWorks from "../components/Footer/HowItWorks";
import ErrorPage from "../pages/Forbidden/ErrorPage";
import PrivacyPolicy from "../components/Footer/PrivacyPolicy";
import TermsAndServices from "../components/Footer/TermsAndServices";


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
        path:"/how-it-works",
        Component:HowItWorks
      },
      {
        path: "/contact",
        Component: ContactUs,
      },
      {
        path: "/privacy",
        Component: PrivacyPolicy,
      },
      {
        path: "/terms",
        Component: TermsAndServices,
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
      {
        path: "/donationDetails/:id",
        Component: () => (
          <PrivateRoute>
            <DonationDetails />
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
        element: (
          <UserRoutes>
            <UserProfile />
          </UserRoutes>
        ),
      },
      {
        path: "/dashboard/paymentHistory",
        element: (
          <UserRoutes>
            <UserTransectionHistory />
          </UserRoutes>
        ),
      },
      {
        path: "/dashboard/requestCharity",
        element: (
          <UserRoutes>
            <RequestCharity />
          </UserRoutes>
        ),
      },
      {
        path: "/dashboard/favorite",
        element: (
          <UserRoutes>
            <FavoriteItem />
          </UserRoutes>
        ),
      },
      {
        path: "/dashboard/reviews",
        element: (
          <UserRoutes>
            <UserReviews />
          </UserRoutes>
        ),
      },

      // restaurant Dashbard Route
      {
        path: "/dashboard/restaurant-profile",
        element: (
          <RestaurentRoute>
            <RestaurantProfile />
          </RestaurentRoute>
        ),
      },
      {
        path: "/dashboard/add-donation",
        element: (
          <RestaurentRoute>
            <AddDonation />
          </RestaurentRoute>
        ),
      },
      {
        path: "/dashboard/my-donations",
        element: (
          <RestaurentRoute>
            <MyDonations />
          </RestaurentRoute>
        ),
      },
      {
        path: "/dashboard/requested-donations",
        element: (
          <RestaurentRoute>
            <RequestedDonations />
          </RestaurentRoute>
        ),
      },
      {
        path: "/dashboard/update-donation/:id",
        element: (
          <RestaurentRoute>
            <UpdateDonation />
          </RestaurentRoute>
        ),
      },

      // Admin Dashboaed Route
      {
        path: "/dashboard/admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-donations",
        element: (
          <AdminRoute>
            <ManageDonations />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-role-requests",
        element: (
          <AdminRoute>
            <ManageRoleRequests />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-requests",
        element: (
          <AdminRoute>
            <ManageRequests />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/feature-donations",
        element: (
          <AdminRoute>
            <FeatureDonationsAdd />
          </AdminRoute>
        ),
      },

      // Charity Dashbord Route
      {
        path: "/dashboard/charity-profile",
        element: (
          <CharityRoute>
            <CharityProfile />
          </CharityRoute>
        ),
      },
      {
        path: "/dashboard/my-requests",
        element: (
          <CharityRoute>
            <MyRequests />
          </CharityRoute>
        ),
      },
      {
        path: "/dashboard/my-pickups",
        element: (
          <CharityRoute>
            <MyPickups />
          </CharityRoute>
        ),
      },
      {
        path: "/dashboard/received-donations",
        element: (
          <CharityRoute>
            <ReceivedDonations />
          </CharityRoute>
        ),
      },
      {
        path: "/dashboard/charity-transactions",
        element: (
          <CharityRoute>
            <CharityTransactionHistory />
          </CharityRoute>
        ),
      },
    ],
  },
  {
    path:"*",
    Component:ErrorPage
  }
]);

export default router;
