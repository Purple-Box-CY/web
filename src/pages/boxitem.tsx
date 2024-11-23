import Menu from "../components/menu/menu";
import React from "react";
import { useParams } from "react-router-dom";

const BoxItem = () => {
  const params = useParams();
  console.log("### params", params);

  return (
    <div className={"h-svh bg-white"}>
      <h2>Purple Box</h2>
      <Menu />
    </div>
  );
};

export default BoxItem;
