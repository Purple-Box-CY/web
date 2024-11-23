import Menu from "../components/menu/menu";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "../assets/back_icon.svg";

const BoxItem = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className={"h-svh bg-white"}>
      <div className={"h-svh bg-white relative"}>
        <header className={"flex justify-center min-h-[30px] p-2"}>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="absolute left-2 active:opacity-[0.8] w-[24px] h-[24px]"
          >
            <BackIcon />
          </button>

          <h2 className={"text-[#222] font-bold text-[20px]"}>
            {/*{article?.title}*/}
            Purple Box
          </h2>
        </header>

        {/*<article className={"p-2"}>{article?.description}</article>*/}

        <Menu />
      </div>
      <Menu />
    </div>
  );
};

export default BoxItem;
