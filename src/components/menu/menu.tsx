import { ReactComponent as MapItem } from "../../assets/map_off.svg";
import { ReactComponent as InfoItem } from "../../assets/info_off.svg";
import { ReactComponent as CameraItem } from "../../assets/camera_off.svg";
import { ReactComponent as CameraItemOn } from "../../assets/camera_on.svg";
import { ReactComponent as ProfileItem } from "../../assets/profile_off.svg";
import { NavLink, useMatch } from "react-router";

interface MenuProps {}

const Menu = (props: MenuProps) => {
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
      <NavLink
        to={"/camera"}
        className={` flex flex-col justify-center items-center rounded-[12px] w-[50px] h-[50px] ${isScanItemActive && "bg-[#A531B5]"}`}
      >
        {isScanItemActive ? <CameraItemOn /> : <CameraItem />}
        <h3
          className={`text-[10px] font-bold ${isScanItemActive ? "text-[#fff]" : "text-[#222]"}`}
        >
          SCAN
        </h3>
      </NavLink>
    </div>
  );
};

export default Menu;
