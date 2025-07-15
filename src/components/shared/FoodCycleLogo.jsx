import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router";

const FoodCycleLogo = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link to="/" onClick={handleScrollToTop}>
      <div className="h-15 flex items-center ">
        <div className="w-18 p-2">
          <img className="rotate-25" src={Logo} alt="" />
        </div>
        <span className="dark:text-white text-3xl font-semibold -ml-5 hidden md:flex">
          Food Cycle
        </span>
      </div>
    </Link>
  );
};

export default FoodCycleLogo;
