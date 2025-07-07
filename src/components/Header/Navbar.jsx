// import React, { useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { useContext } from "react";

const Navbar = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const dropdownRef = useRef(null);

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
        logoutUser()
          .then(() => {
            localStorage.removeItem("token");
            Swal.fire(
              "Logged Out!",
              "You have been logged out successfully.",
              "success"
            );
            navigate("/auth/login");
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  // const toggleDropdown = () => {
  //   setDropdownOpen((prev) => !prev);
  // };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const menu = (
    <div className="flex flex-col md:flex-row md:gap-10 gap-3 md:items-center">
      {[
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "contact" },
      ].map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `font-semibold transition-colors duration-300 text-base-content relative z-10 ${
              isActive ? "px-4 py-2 rounded-md border" : " hover:text-blue-500"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
      {user ? (
        <button onClick={handleLogout} className="btn btn-warning">
          Logout
        </button>
      ) : (
        <Link to="/auth/login" className="btn btn-primary">
          Login
        </Link>
      )}
    </div>
  );

  return loading ? (
    <Loading />
  ) : (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menu}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">FoodCycle </a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menu}</ul>
      </div>
    </div>
  );
};

export default Navbar;
