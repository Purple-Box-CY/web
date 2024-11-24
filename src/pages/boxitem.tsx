import Menu from "../components/menu/menu";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "../assets/back_icon.svg";
import { service } from "../api/services";
import { IBox } from "../interfaces";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { CustomMarker } from "../components/map/customMarker";
import { CollectionCategory } from "../data/map";
import { articles, IArticle } from "./info";
import { NavLink } from "react-router";

const getArticleByType = (type: CollectionCategory): IArticle => {
  return articles.find((art) => art.type === type) as IArticle;
};

const BoxItem = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [box, setBox] = useState<IBox | null>();

  const article = box && getArticleByType(box?.type);

  useEffect(() => {
    id &&
      service.getMarkerItem(id).then((res) => {
        setBox(res.data);
      });
  }, [id]);

  return (
    <div className={"bg-white pb-16"}>
      <header className={"flex justify-center min-h-[30px] p-2"}>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="absolute left-2 active:opacity-[0.8] w-[24px] h-[24px]"
        >
          <BackIcon />
        </button>

        <h2 className={"text-[#222] font-bold text-[20px]"}>{box?.name}</h2>
      </header>

      {process.env.REACT_APP_GOOGLE_MAP_KEY && box && (
        <APIProvider
          apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
          version={"beta"}
        >
          <Map
            className={"h-[300px]"}
            defaultCenter={{
              lat: box?.location.lat ?? 34.686488571566,
              lng: box?.location.lng ?? 33.03550530741,
            }}
            defaultZoom={14}
            mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
            disableDefaultUI
            disableDoubleClickZoom
          >
            {box && (
              <CustomMarker
                key={box?.uid}
                mapItem={{
                  uid: box.uid,
                  location: box?.location,
                  name: box?.name,
                  type: box?.type,
                  description: box?.description,
                }}
                onClick={() => {}}
                setMarkerRef={() => {}}
              />
            )}
          </Map>
        </APIProvider>
      )}

      {box?.imageUrl && <img src={box?.imageUrl} alt="" />}

      {box?.description && (
        <div
          className={"p-2"}
          dangerouslySetInnerHTML={{ __html: box?.description }}
        />
      )}

      {article && (
        <NavLink
          to={`/info/${article.alias}`}
          className="p-4 rounded overflow-hidden shadow-lg cursor-pointer hover:opacity-[0.9] block m-2 bg-[#A531B510]"
        >
          <div className="py-4">
            <div className="font-bold text-xl mb-2"> {article.title}</div>
            <p className="text-gray-700 text-base">{article.description}</p>
          </div>

          <img className="w-full" src={article.img} alt="box image" />
        </NavLink>
      )}

      <Menu />
    </div>
  );
};

export default BoxItem;
