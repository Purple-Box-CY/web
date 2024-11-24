import { ReactComponent as MapItem } from "../../assets/map_off.svg";
import { ReactComponent as InfoItem } from "../../assets/info_off.svg";
import { ReactComponent as CameraItem } from "../../assets/camera_off.svg";
import { ReactComponent as CameraItemOn } from "../../assets/camera_on.svg";
import { ReactComponent as ProfileItem } from "../../assets/profile_off.svg";
import {ReactComponent as RecogniteIcon} from '../../assets/recognite.svg';
import {ReactComponent as CheckSmallIcon} from '../../assets/close_small.svg';

import { NavLink, useMatch } from "react-router";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

interface MenuProps {}

const Menu = (props: MenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  const isProfileItemActive = useMatch({
    path: `/profile/*`,
    caseSensitive: false,
  });

  const isInfoItemActive = useMatch({
    path: `/info/*`,
    caseSensitive: false,
  });

  const isScanItemActive = useMatch({
    path: `/camera/*`,
    caseSensitive: false,
  });

  const isMapItemActive = useMatch({
    path: `/`,
    caseSensitive: false,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNavigateToBoxInfo = () => {
    setIsModalOpen(false);
    navigate("/camera");
  };

  const handleNavigateToWasteGuide = () => {
    setIsModalOpen(false);
    navigate("/trash");
  };

  return (
    <div
      className={
        "max-w-[500px] w-full h-[60px] fixed bottom-0 bg-white flex flex-row justify-around items-center"
      }
    >
      <NavLink
        to={"/"}
        className={` flex flex-col justify-center items-center rounded-[12px] w-[50px] h-[50px] ${isMapItemActive && "bg-[#A531B5]"}`}
      >
        <MapItem fill={isMapItemActive ? "#fff" : "#222"} />
        <h3
          className={`text-[10px] font-bold ${isMapItemActive ? "text-[#fff]" : "text-[#222]"}`}
        >
          MAP
        </h3>
      </NavLink>
      <NavLink
        to={"/info"}
        className={` flex flex-col justify-center items-center rounded-[12px] w-[50px] h-[50px] ${isInfoItemActive && "bg-[#A531B5]"}`}
      >
        <InfoItem fill={isInfoItemActive ? "#fff" : "#222"} />
        <h3
          className={`text-[10px] font-bold ${isInfoItemActive ? "text-[#fff]" : "text-[#222]"}`}
        >
          INFO
        </h3>
      </NavLink>
      <NavLink
        to={"/profile"}
        className={` flex flex-col justify-center items-center rounded-[12px] w-[50px] h-[50px] ${isProfileItemActive && "bg-[#A531B5]"}`}
      >
        <ProfileItem fill={isProfileItemActive ? "#fff" : "#222"} />
        <h3
          className={`text-[10px] font-bold ${isProfileItemActive ? "text-[#fff]" : "text-[#222]"}`}
        >
          PROFILE
        </h3>
      </NavLink>
      <div
        onClick={toggleModal}
        className={` flex flex-col justify-center items-center rounded-[12px] w-[50px] h-[50px] ${isScanItemActive && "bg-[#A531B5]"}`}
      >
        {isScanItemActive ? <CameraItemOn /> : <CameraItem />}
        <h3
          className={`text-[10px] font-bold ${isScanItemActive ? "text-[#fff]" : "text-[#222]"}`}
        >
          SCAN
        </h3>
      </div>
      {isModalOpen && (
          <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end" // Центровка по горизонтали и прижатие к низу
              onClick={toggleModal}
          >
            <div
                className="bg-white rounded-t-[32px] p-6 w-full max-w-[500px] text-center relative sm:w-[90%]" // Ширина 500px на ПК, 90% на мобильных
                onClick={(e) => e.stopPropagation()} // Остановка всплытия
            >
              <button
                  onClick={toggleModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <CheckSmallIcon width="24px" height="24px" />
              </button>

              <div className="flex justify-center mb-4 mt-3">
                <div className="rounded-full flex items-center justify-center">
                  <RecogniteIcon width="60px" height="60px" />
                </div>
              </div>
              <div className="mb-7">
                <div className="text-2xl font-bold mb-2">How can I help you?</div>
              </div>
              <button
                  className="bg-[#A531B5] text-white font-bold py-5 px-6 rounded-[64px] mb-3 w-full text-[14px]"
                  onClick={handleNavigateToBoxInfo}
              >
                WHAT IS THIS BOX FOR?
              </button>
              <button
                  className="bg-[#222] text-white font-bold py-5 px-6 rounded-[64px] w-full text-[14px]"
                  onClick={handleNavigateToWasteGuide}
              >
                HOW DO I RECYCLE OR DISPOSE OF THIS
              </button>
            </div>
          </div>
      )}




    </div>
  );
};

export default Menu;
