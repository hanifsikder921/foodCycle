import React from "react";
import { Link, Outlet } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import Eating from "../assets/eating.svg";

const AuthencationLayout = () => {
  return (
    <div className=" md:w-11/12 mx-auto">
      <div className="mt-5 w-11/12 mx-auto md:w-full">
        <Link
          to="/"
          className="flex items-center text-xl gap-2 hover:font-semibold duration-300  w-fit p-2"
        >
          <IoArrowBack size={25} /> Back to Home
        </Link>
      </div>

      <div className="flex justify-around items-center rounded-lg md:shadow-2xl border border-gray-200">
        <section className="flex-1">
          <Outlet></Outlet>
        </section>
        <section className="flex-1 hidden md:flex ">
          <img className="w-7/12 mx-auto" src={Eating} alt="" />
        </section>
      </div>
    </div>
  );
};

export default AuthencationLayout;
