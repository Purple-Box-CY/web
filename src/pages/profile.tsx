import Menu from "../components/menu/menu";
import React from "react";

const ProfilePage = () => {
  return (
    <div className={"h-svh bg-white"}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center justify-center">
            <img
              src="https://via.placeholder.com/80"
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4"
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-800">Jane Doe</h2>
            <p className="text-gray-500 text-sm">Eco Warrior</p>
          </div>
          <div className="mt-6 flex justify-between items-center p-4 rounded-lg">
            <div className="text-center">
              <p className="text-lg font-bold">128</p>
              <p className="text-sm text-gray-600">save trees</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">50</p>
              <p className="text-sm text-gray-600">kg recycled</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">15</p>
              <p className="text-sm text-gray-600">eco tasks done</p>
            </div>
          </div>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default ProfilePage;
