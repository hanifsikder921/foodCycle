import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-700">
      <header className=" dark:bg-gray-800 sticky top-0 z-40 bg-base-300">
        <Navbar />
      </header>

      <main className=" w-11/12 mx-auto flex-grow md:my-8 my-2">
        <section>
          <Outlet />
        </section>
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default MainLayout;
