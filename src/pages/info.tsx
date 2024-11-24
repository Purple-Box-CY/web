import Menu from "../components/menu/menu";
import React from "react";
import { NavLink } from "react-router";
import blue from "../assets/03_blue.png";
import green from "../assets/05_green.png";
import brown from "../assets/02_brown.png";
import purple from "../assets/01_purple.png";
import white_electronics from "../assets/08_white.png";
import white_bataries from "../assets/07_white.png";
import green_point from "../assets/09_green.png";
import red from "../assets/06_red.png";
import { CollectionCategory } from "../data/map";

export interface IArticle {
  type: CollectionCategory;
  alias: string;
  img: string;
  title: string;
  description: string;
}

export const articles = [
  {
    type: CollectionCategory.Paper,
    alias: "paper-box",
    img: brown,
    title: "This category can be identified by its BROWN Bins",
    description:
      "Please use those bins for disposing Paper material.\n" +
      "If your area is part of the recycling program and recycling material is picked up every week, then please dispose the Paper material into brown garbage bags.",
  },
  {
    type: CollectionCategory.Plastic,
    alias: "blue-box",
    img: blue,
    title: "This category can be identified by its BLUE Bins",
    description:
      "Please use those bins for disposing PMD material.\n" +
      "If your area is part of the recycling program and recycling material is picked up every week, then please dispose the PMD material into transparent garbage bags.",
  },
  {
    type: CollectionCategory.Glass,
    alias: "green-box",
    img: green,
    title: "Green Box",
    description:
      "The Green Recycling Bin in Cyprus is part of the city’s initiative to promote sustainable waste management by encouraging the proper disposal of glass materials.",
  },
  {
    type: CollectionCategory.Cloth,
    alias: "purple-box",
    img: purple,
    title: "Purple box",
    description:
      "The Purple Recycling Bins in Cyprus are dedicated to the collection of textiles and clothing, providing an eco-friendly solution for disposing of unwanted garments and fabrics.",
  },
  {
    type: CollectionCategory.Electronic,
    alias: "white-box",
    img: white_electronics,
    title: "White box",
    description:
      "The Recycling Bins for Electrical and Electronic Equipment (EEE) in Cyprus are designated for the proper disposal of unwanted or non-functional electronic devices and appliances.",
  },
  {
    type: CollectionCategory.Battery,
    alias: "batteries-box",
    img: white_bataries,
    title: "Batteries box",
    description:
      "The Battery Recycling Bins in Cyprus are designed for the safe collection and disposal of used batteries.",
  },
  {
    type: CollectionCategory.GreenPoint,
    alias: "green-points",
    img: green_point,
    title: "Green Points",
    description:
      "Green Points in Cyprus are specialized waste collection facilities designed to handle materials that are not suitable for regular waste bins or traditional recycling programs.",
  },
  {
    type: CollectionCategory.Multibox,
    alias: "multi-boxes",
    img: red,
    title: "Multiboxes",
    description: "Multibox is set of any boxes",
  },
];

const InfoPage = () => {
  return (
    <div className={"min-h-svh bg-white flex flex-col items-center pb-[80px]"}>
      {articles.map((articleItem, index) => {
        return (
          <NavLink
            key={index}
            to={`/info/${articleItem.alias}`}
            className="p-4 rounded overflow-hidden shadow-lg cursor-pointer hover:opacity-[0.9]"
          >
            <div className="py-4">
              <div className="font-bold text-xl mb-2"> {articleItem.title}</div>
              <p className="text-gray-700 text-base">
                {articleItem.description}
              </p>
            </div>

            <img className="w-full" src={articleItem.img} alt="box image" />
          </NavLink>
        );
      })}
      <Menu />
    </div>
  );
};

export default InfoPage;
