import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen px-3 sm:px-4 md:px-6 lg:px-8">
        <Outlet />
      </div>
    </>
  );
}