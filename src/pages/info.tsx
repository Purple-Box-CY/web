import Menu from "../components/menu/menu";
import React from "react";
import exampleImg from "../assets/purplebox-example.png";
import { NavLink } from "react-router";

const InfoPage = () => {
  return (
    <div className={"h-svh bg-white flex flex-col items-center"}>
      <NavLink
        to={"/info/first"}
        className="p-4 rounded overflow-hidden shadow-lg cursor-pointer hover:opacity-[0.9]"
      >
        <img
          className="w-full"
          src={exampleImg}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </NavLink>
      <Menu />
    </div>
  );
};

export default InfoPage;
