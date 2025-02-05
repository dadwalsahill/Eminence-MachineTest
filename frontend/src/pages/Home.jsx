import React from "react";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4">
      <div className="w-1/6 border border-gray-500 rounded-xl p-4 bg-gray-800">
        <Sidebar />
      </div>
      <div className="w-5/6 border border-gray-500 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
