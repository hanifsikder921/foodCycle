import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Header/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-base-300  dark:bg-gray-800">
        <Navbar />
      </header>

      <main className=" w-11/12 mx-auto flex-grow md:my-8 my-2">
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
